package sit.tuvarna.models.books;


import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import sit.tuvarna.models.images.Image;
import sit.tuvarna.models.users.User;

import java.util.Date;
import java.util.List;

@Entity
public class Book extends PanacheEntity {

    public String name;
    public int quantity;
    public String isbn;
    public String author;

    @Temporal(TemporalType.DATE)
    public Date productionDate;

    @Column(length = 2000)
    public String description;

    @Lob
    public byte[] mainImage; // For storing the main image as a binary large object

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Image> images;

    @ManyToMany(mappedBy = "rentedBooks", fetch = FetchType.LAZY)
    private List<User> users; // Users that have rented this book

    // Constructors, getters, and setters for images
    public Book() {
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}