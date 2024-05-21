package sit.tuvarna.models.books;

import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class BookDetailsDTO {
    public Long id;
    public String name;
    public int quantity;
    public String isbn;
    public String author;
    public Date productionDate;
    public String description;
    public List<String> images;

    public BookDetailsDTO(Long id, String name, int quantity, String isbn, String author, Date productionDate, String description, List<String> images) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.isbn = isbn;
        this.author = author;
        this.productionDate = productionDate;
        this.description = description;
        this.images = images;
    }

    public static BookDetailsDTO fromBook(Book book) {
        List<String> imageBase64Strings = book.images.stream()
                .map(image -> Base64.getEncoder().encodeToString(image.getData()))
                .collect(Collectors.toList());
        return new BookDetailsDTO(
                book.id,
                book.name,
                book.quantity,
                book.isbn,
                book.author,
                book.productionDate,
                book.description,
                imageBase64Strings
        );
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Date getProductionDate() {
        return productionDate;
    }

    public void setProductionDate(Date productionDate) {
        this.productionDate = productionDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }
}
