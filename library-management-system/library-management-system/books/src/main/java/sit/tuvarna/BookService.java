package sit.tuvarna;

import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import sit.tuvarna.models.books.Book;
import sit.tuvarna.models.books.BookDTO;
import sit.tuvarna.models.books.BookDetailsDTO;
import sit.tuvarna.models.books.BookMapper;
import sit.tuvarna.models.images.Image;

import java.util.List;

@Singleton
public class BookService {
    @Inject
    EntityManager em;

    @Transactional
    public void addBook(Book book) {
        book.persist();
    }

    public List<BookDTO> getBooks(int page, int limit) {
        List<Book> books = Book.find("order by id").page(page - 1, limit).list();
        return BookMapper.toDTOs(books);
    }

    public BookDetailsDTO detailsBook(Long id) {
        Book book = Book.findById(id);
        return BookMapper.toDetailsDTO(book);
    }
}
