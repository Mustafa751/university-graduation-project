package sit.tuvarna.models.books;

import java.util.Base64;
import java.util.Date;

public class BookDTO {
    public Long id;
    public String name;
    public int quantity;
    public String mainImage;

    public BookDTO(Long id, String name, int quantity, String mainImage) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.mainImage = mainImage;
    }

    public static BookDTO fromBook(Book book) {
        String base64Image = book.mainImage != null ? Base64.getEncoder().encodeToString(book.mainImage) : null;
        return new BookDTO(book.id, book.name, book.quantity, base64Image);
    }
}
