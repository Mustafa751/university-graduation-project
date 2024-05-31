package sit.tuvarna.books;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import sit.tuvarna.core.models.books.Book;

@ApplicationScoped
public class BookRepository implements PanacheRepository<Book> {
}
