package sit.tuvarna.users;

import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import sit.tuvarna.BookRepository;
import sit.tuvarna.RentalRepository;
import sit.tuvarna.models.books.Book;
import sit.tuvarna.models.books.UnreturnedBookDTO;
import sit.tuvarna.models.books.UserBooksDTO;
import sit.tuvarna.models.rental.Rental;
import sit.tuvarna.models.users.*;

import java.time.LocalDateTime;
import java.util.List;

@Singleton
public class UserService {
    @Inject
    UserRepository userRepository;

    @Inject
    BookRepository bookRepository;

    @Inject
    RentalRepository rentalRepository;

    public List<User> getUsers() {
        return userRepository.listAll();
    }

    @Transactional
    public UserStateManagementDTO login(LoginRequest loginRequest) {
        try {
            UserStateManagementDTO user = userRepository.find("facultyNumber = ?1 and egn = ?2", loginRequest.getFakNumber(), loginRequest.getEgn())
                    .project(UserStateManagementDTO.class)
                    .firstResult();
            return user;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    public List<UserSummaryDTO> getUsersSummary() {
        List<User> users = userRepository.listAll();
        return users.stream()
                .map(user -> new UserSummaryDTO(user.id, user.getFacultyNumber(), user.getEmail(), user.getPhoneNumber())).toList();
    }

    @Transactional
    public void getBook(Long userId, Long bookId) {
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
            e.getMessage();
        }
    }

    public List<UnreturnedBookDTO> getUnreturnedBooks(Long userId) {
        User user = userRepository.findById(userId);
        return user.getRentals().stream()
                .filter(rental -> rental.getRentalEndDate().isAfter(LocalDateTime.now()))
                .map(rental -> new UnreturnedBookDTO(rental.getBook().id, rental.getBook().name, rental.getRentalEndDate())).toList();
    }

    public List<UserBooksDTO> getAllBooks(Long userId) {
        User user = userRepository.findById(userId);
        return user.getRentals().stream()
                .map(rental -> new UserBooksDTO(
                        rental.getBook().id,
                        rental.getBook().name,
                        rental.getRentalEndDate().isAfter(LocalDateTime.now()) // Determine if the book is returned
                ))
                .toList();
    }

    public List<EmailSchedulerDTO> getUsersWithBooksDueInLessThanTwoDays() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime twoDaysFromNow = now.plusDays(2);

        List<Rental> rentals = rentalRepository.find("rentalEndDate BETWEEN ?1 AND ?2", now, twoDaysFromNow).list();
        return rentals.stream()
                .map(rental -> new EmailSchedulerDTO(rental.getUser().getFacultyNumber(), rental.getUser().getEmail()))
                .distinct()
                .toList();
    }
}
