package sit.tuvarna.models.books;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

public class BookMapper {
    public static BookDTO toDTO(Book book) {
        return new BookDTO(
                book.id,
                book.name,
                book.quantity,
                book.mainImage != null ? Base64.getEncoder().encodeToString(book.mainImage) : null
        );
    }

    public static List<BookDTO> toDTOs(List<Book> books) {
        return books.stream().map(BookMapper::toDTO).collect(Collectors.toList());
    }

    public static BookDetailsDTO toDetailsDTO(Book book) {
        return BookDetailsDTO.fromBook(book);
    }
}
