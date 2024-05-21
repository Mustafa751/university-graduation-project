package sit.tuvarna.models.books;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import sit.tuvarna.models.images.Image;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Book extends PanacheEntity {

    // Existing fields and annotations
    public String name;
    public int quantity;
    public String isbn;
    public String author;
    @Temporal(TemporalType.DATE)
    public Date productionDate;
    @Column(length = 2000)
    public String description;
    @Column(name = "data", columnDefinition = "bytea")
    public byte[] mainImage;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    public List<Image> images;

    // Constructors
    public Book() {
        this.images = new ArrayList<>();
    }

    // Setters for all fields
    public void setName(String name) {
        this.name = name;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setProductionDate(Date productionDate) {
        this.productionDate = productionDate;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setMainImage(byte[] mainImage) {
        this.mainImage = mainImage;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public void addImage(Image image) {
        this.images.add(image);
    }

    public String getName() {
        return name;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getIsbn() {
        return isbn;
    }

    public String getAuthor() {
        return author;
    }

    public Date getProductionDate() {
        return productionDate;
    }

    public String getDescription() {
        return description;
    }

    public List<Image> getImages() {
        return images;
    }

    public byte[] getMainImage() {
        return mainImage;
    }
}
