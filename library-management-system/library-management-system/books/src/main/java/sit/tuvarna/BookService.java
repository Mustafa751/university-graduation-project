package sit.tuvarna;

import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;
import sit.tuvarna.models.books.*;

import java.util.List;

@Singleton
public class BookService {

    @Inject
    BookRepository bookRepository;

    @Transactional
    public void addBook(Book book) {
        bookRepository.persist(book);
    }

    public List<BookDTO> getBooks(int page, int limit) {
        List<Book> books = bookRepository.find("order by id").page(page - 1, limit).list();
        return BookMapper.toDTOs(books);
    }

    public BookDetailsDTO detailsBook(Long id) {
        Book book = bookRepository.findById(id);
        return BookMapper.toDetailsDTO(book);
    }

    public List<BookRentDTO> getRentBooks() {
        List<Book> books = bookRepository.find("quantity > 1").list();
        return books.stream()
                .map(book -> new BookRentDTO(book.id, book.name)).toList();
    }
}
