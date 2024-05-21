package sit.tuvarna;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sit.tuvarna.models.books.Book;
import sit.tuvarna.models.books.BookDTO;
import sit.tuvarna.models.books.BookDetailsDTO;
import sit.tuvarna.models.books.BookRentDTO;
import sit.tuvarna.models.images.Image;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookServiceTest {

    @Mock
    private BookRepository mockBookRepository;

    @InjectMocks
    private BookService bookServiceUnderTest;

    private Book book;

    @BeforeEach
    void setUp() {
        book = new Book();
        book.setName("name");
        book.setQuantity(10);
        book.setIsbn("isbn");
        book.setAuthor("author");
        book.setProductionDate(new GregorianCalendar(2020, Calendar.JANUARY, 1).getTime());
        book.setDescription("description");
        book.setMainImage("content".getBytes());
        Image image = new Image();
        image.setData("content".getBytes());
        book.setImages(List.of(image));
    }

    @Test
    void testAddBook() {
        // Run the test
        bookServiceUnderTest.addBook(book);

        // Verify that BookRepository.persist() was called with the correct book
        ArgumentCaptor<Book> bookCaptor = ArgumentCaptor.forClass(Book.class);
        verify(mockBookRepository).persist(bookCaptor.capture());
        Book persistedBook = bookCaptor.getValue();

        assertEquals("name", persistedBook.getName());
        assertEquals(10, persistedBook.getQuantity());
        assertEquals("isbn", persistedBook.getIsbn());
        assertEquals("author", persistedBook.getAuthor());
        assertEquals("description", persistedBook.getDescription());
        assertArrayEquals("content".getBytes(), persistedBook.getMainImage());
    }

    @Test
    void testGetBooks() {
        // Setup mock PanacheQuery
        PanacheQuery<Book> mockQuery = mock(PanacheQuery.class);
        when(mockBookRepository.find("order by id")).thenReturn(mockQuery);
        when(mockQuery.page(anyInt(), anyInt())).thenReturn(mockQuery);
        when(mockQuery.list()).thenReturn(List.of(book));

        // Run the test
        List<BookDTO> result = bookServiceUnderTest.getBooks(1, 10);

        // Verify the results
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("name", result.get(0).getName());
    }

    @Test
    void testDetailsBook() {
        // Setup
        when(mockBookRepository.findById(0L)).thenReturn(book);

        // Run the test
        BookDetailsDTO result = bookServiceUnderTest.detailsBook(0L);

        // Verify the results
        assertNotNull(result);
        assertEquals("name", result.getName());
        assertEquals("isbn", result.getIsbn());
        assertEquals("author", result.getAuthor());
    }

    @Test
    void testGetRentBooks() {
        // Setup mock PanacheQuery
        PanacheQuery<Book> mockQuery = mock(PanacheQuery.class);
        when(mockBookRepository.find("quantity > 1")).thenReturn(mockQuery);
        when(mockQuery.list()).thenReturn(List.of(book));

        // Run the test
        List<BookRentDTO> result = bookServiceUnderTest.getRentBooks();

        // Verify the results
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("name", result.get(0).getName());
    }
}
