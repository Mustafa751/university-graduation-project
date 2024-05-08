package sit.tuvarna.models.users;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import sit.tuvarna.models.books.Book;
import sit.tuvarna.models.roles.Roles;

import java.util.List;

@Entity
@Table(name = "users")
public class User extends PanacheEntity {
    @Column(unique = true)
    private String fakNumber;

    private String egn;

    @Enumerated(EnumType.STRING)
    private Roles role;

    private String email;

    private String phoneNumber;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(
            name = "user_books",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    private List<Book> rentedBooks;

    // Getters and Setters

    public String getFakNumber() {
        return fakNumber;
    }

    public void setFakNumber(String fakNumber) {
        this.fakNumber = fakNumber;
    }

    public String getEgn() {
        return egn;
    }

    public void setEgn(String egn) {
        this.egn = egn;
    }

    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<Book> getRentedBooks() {
        return rentedBooks;
    }

    public void setRentedBooks(List<Book> rentedBooks) {
        this.rentedBooks = rentedBooks;
    }
}
