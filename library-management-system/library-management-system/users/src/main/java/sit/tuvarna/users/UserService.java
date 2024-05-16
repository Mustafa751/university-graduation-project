package sit.tuvarna.users;

import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.jose4j.jwk.Use;
import sit.tuvarna.models.books.Book;
import sit.tuvarna.models.books.UnreturnedBookDTO;
import sit.tuvarna.models.books.UserBooksDTO;
import sit.tuvarna.models.rental.Rental;
import sit.tuvarna.models.users.EmailSchedulerDTO;
import sit.tuvarna.models.users.LoginRequest;
import sit.tuvarna.models.users.User;
import sit.tuvarna.models.users.UserSummaryDTO;

import java.time.LocalDateTime;
import java.util.List;

@Singleton
public class UserService {
    public List<User> getUsers() {
        return User.listAll();
    }
    @Inject
    EntityManager em;
    @Transactional
    public User login(LoginRequest loginRequest) {
      try {
          User user = User.find("facultyNumber = ?1 and egn = ?2", loginRequest.fakNumber, loginRequest.egn).firstResult();
          return user;
      }catch (Exception e) {
      e.getMessage();
      }
return null;
    }

    @Transactional
    public List<UserSummaryDTO> getUsersSummary() {
        List<User> users = User.listAll();
        return users.stream()
                .map(user -> new UserSummaryDTO(user.id, user.getFacultyNumber(), user.getEmail(), user.getPhoneNumber())).toList();
    }

    @Transactional
    public void getBook(Long userId, Long bookId) {
        User user = User.findById(userId);
        Book book = Book.findById(bookId);
        Rental rental = Rental.find("user.id = ?1 and book.id = ?2", userId, bookId).firstResult();

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
        User user = User.findById(userId);

        return user.getRentals().stream()
                .filter(rental -> rental.getRentalEndDate().isAfter(LocalDateTime.now()))
                .map(rental -> new UnreturnedBookDTO(rental.getBook().id, rental.getBook().name, rental.getRentalEndDate())).toList();

    }

    public List<UserBooksDTO> getAllBooks(Long userId) {
        User user = User.findById(userId);

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

        TypedQuery<User> query = em.createQuery(
                "SELECT DISTINCT r.user FROM Rental r WHERE r.rentalEndDate BETWEEN :now AND :twoDaysFromNow", User.class);
        query.setParameter("now", now);
        query.setParameter("twoDaysFromNow", twoDaysFromNow);

        List<User> users = query.getResultList();
        return users.stream().map(user -> new EmailSchedulerDTO(user.getFacultyNumber(), user.getEmail())).toList();
    }
}
