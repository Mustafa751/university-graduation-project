package sit.tuvarna.models.rental;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import sit.tuvarna.models.books.Book;
import sit.tuvarna.models.users.User;

import java.time.LocalDateTime;

@Entity
@Table(name = "rentals")
public class Rental extends PanacheEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Column(name = "rental_start_date", nullable = false)
    private LocalDateTime rentalStartDate;

    @Column(name = "rental_end_date")
    private LocalDateTime rentalEndDate;

    // Constructors
    public Rental() {
    }

    // Getter and Setter for user
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // Getter and Setter for book
    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    // Getter and Setter for rentalStartDate
    public LocalDateTime getRentalStartDate() {
        return rentalStartDate;
    }

    public void setRentalStartDate(LocalDateTime rentalStartDate) {
        this.rentalStartDate = rentalStartDate;
    }

    // Getter and Setter for rentalEndDate
    public LocalDateTime getRentalEndDate() {
        return rentalEndDate;
    }

    public void setRentalEndDate(LocalDateTime rentalEndDate) {
        this.rentalEndDate = rentalEndDate;
    }
}
