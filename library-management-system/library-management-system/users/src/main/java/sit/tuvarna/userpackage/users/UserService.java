package sit.tuvarna.userpackage.users;

import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import sit.tuvarna.books.BookRepository;
import sit.tuvarna.core.models.JwtResponse;
import sit.tuvarna.userpackage.RentalRepository;
import sit.tuvarna.core.models.books.Book;
import sit.tuvarna.core.models.books.UnreturnedBookDTO;
import sit.tuvarna.core.models.books.UserBooksDTO;
import sit.tuvarna.core.models.rental.Rental;
import sit.tuvarna.core.models.users.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Singleton
public class UserService {

    private static final Logger LOG = Logger.getLogger(UserService.class);

    @Inject
    UserRepository userRepository;

    @Inject
    BookRepository bookRepository;

    @Inject
    RentalRepository rentalRepository;

    private final Client client = ClientBuilder.newClient();

    public List<UserDTO> getUsers() {
        return userRepository.listAll().stream()
                .map(user -> new UserDTO(user.id, user.getFacultyNumber()))
                .collect(Collectors.toList());
    }

    public List<UserDTO> getRentUsers() {
        return userRepository.listAll().stream()
                .map(user -> new UserDTO(user.id, user.getFacultyNumber()))
                .collect(Collectors.toList());
    }

    @Transactional
    public UserStateManagementDTO login(LoginRequest loginRequest) {
        UserStateManagementDTO isValidUser = findUserByCredentials(loginRequest);

        if (isValidUser == null) {
            throw new WebApplicationException("Invalid credentials", Response.Status.UNAUTHORIZED);
        }

        return isValidUser;
    }

    private UserStateManagementDTO findUserByCredentials(LoginRequest loginRequest) {
        try {
            return userRepository.find("email = ?1 and facultyNumber = ?2", loginRequest.getEmail(), loginRequest.getFakNumber())
                    .project(UserStateManagementDTO.class)
                    .firstResult();
        } catch (Exception e) {
            LOG.error("Login error", e);
            throw new WebApplicationException("Internal server error", Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    public String generateJwt(UserStateManagementDTO user) {
        Response serviceResponse = client.target("http://localhost:8083/jwt")
                .queryParam("userId", String.valueOf(user.getId()))
                .queryParam("email", user.getEmail())
                .queryParam("role", user.getRole())
                .request(MediaType.APPLICATION_JSON)
                .get();

        if (serviceResponse.getStatusInfo().getFamily() != Response.Status.Family.SUCCESSFUL) {
            throw new WebApplicationException("Failed to generate token", Response.Status.BAD_GATEWAY);
        }

        return serviceResponse.readEntity(JwtResponse.class).getJwt();
    }

    @Transactional
    public List<UserSummaryDTO> getUsersSummary() {
        return userRepository.listAll().stream()
                .map(user -> new UserSummaryDTO(user.id, user.getFacultyNumber(), user.getEmail(), user.getPhoneNumber()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void returnBook(Long userId, Long bookId) {
        User user = userRepository.findById(userId);
        Book book = bookRepository.findById(bookId);
        Rental rental = rentalRepository.find("user.id = ?1 and book.id = ?2", userId, bookId).firstResult();

        if (user == null || book == null || rental == null) {
            return;
        }

        book.quantity += 1;
        book.persist();

        try {
            rental.delete();
        } catch (Exception e) {
            LOG.error("Failed to delete rental", e);
        }
    }

    public List<UnreturnedBookDTO> getUnreturnedBooks(Long userId) {
        User user = userRepository.findById(userId);
        return user.getRentals().stream()
                .filter(rental -> rental.getRentalEndDate().isAfter(LocalDateTime.now()))
                .map(rental -> new UnreturnedBookDTO(
                        rental.getBook().id,
                        rental.getBook().name,
                        rental.getBook().author,
                        rental.getBook().inventoryNumber,
                        rental.getBook().signature,
                        rental.getRentalStartDate(),
                        rental.getRentalEndDate()
                ))
                .collect(Collectors.toList());
    }

    public List<UserBooksDTO> getAllBooks(Long userId) {
        User user = userRepository.findById(userId);
        return user.getRentals().stream()
                .map(rental -> new UserBooksDTO(
                        rental.getBook().id,
                        rental.getBook().name,
                        rental.getRentalEndDate().isAfter(LocalDateTime.now())
                ))
                .collect(Collectors.toList());
    }

    public List<EmailSchedulerDTO> getUsersWithBooksDueInLessThanTwoDays() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime twoDaysFromNow = now.plusDays(2);

        List<Rental> rentals = rentalRepository.find("rentalEndDate BETWEEN ?1 AND ?2", now, twoDaysFromNow).list();
        return rentals.stream()
                .map(rental -> new EmailSchedulerDTO(rental.getUser().getFacultyNumber(), rental.getUser().getEmail()))
                .distinct()
                .collect(Collectors.toList());
    }

    public List<User> getUserStatistics() {
        return userRepository.listAll();
    }

    @Transactional
        public Object deleteUser(Long userId){
        User user = userRepository.findById(userId);
        userRepository.delete(user);
        return null;
    }
}
