package sit.tuvarna;

import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sit.tuvarna.models.books.Book;
import sit.tuvarna.models.books.BookDTO;
import sit.tuvarna.models.books.BookDetailsDTO;
import sit.tuvarna.models.books.BookRentDTO;
import sit.tuvarna.models.rental.RentRequestDTO;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookResourceTest {

    @Mock
    private BookService mockBookService;

    private BookResource bookResourceUnderTest;

    @BeforeEach
    void setUp() {
        bookResourceUnderTest = new BookResource();
        bookResourceUnderTest.bookService = mockBookService;
    }

    @Test
    void testAddBook() throws Exception {
        // Setup
        MultipartFormDataInput input = mock(MultipartFormDataInput.class);
        InputPart isbnPart = mock(InputPart.class);
        InputPart titlePart = mock(InputPart.class);
        InputPart authorPart = mock(InputPart.class);
        InputPart descriptionPart = mock(InputPart.class);
        InputPart datePart = mock(InputPart.class);
        InputPart quantityPart = mock(InputPart.class);
        InputPart mainImagePart = mock(InputPart.class);

        Map<String, List<InputPart>> formDataMap = new HashMap<>();
        formDataMap.put("isbn", List.of(isbnPart));
        formDataMap.put("title", List.of(titlePart));
        formDataMap.put("author", List.of(authorPart));
        formDataMap.put("description", List.of(descriptionPart));
        formDataMap.put("date", List.of(datePart));
        formDataMap.put("quantity", List.of(quantityPart));
        formDataMap.put("mainImage", List.of(mainImagePart));

        when(input.getFormDataMap()).thenReturn(formDataMap);
        when(isbnPart.getBodyAsString()).thenReturn("1234567890");
        when(titlePart.getBodyAsString()).thenReturn("Test Title");
        when(authorPart.getBodyAsString()).thenReturn("Test Author");
        when(descriptionPart.getBodyAsString()).thenReturn("Test Description");
        when(datePart.getBodyAsString()).thenReturn("2024-05-21");
        when(quantityPart.getBodyAsString()).thenReturn("10");

        // Create a ByteArrayInputStream with some bytes for the mainImage
        ByteArrayInputStream mainImageInputStream = new ByteArrayInputStream(new byte[]{1, 2, 3});
        when(mainImagePart.getBody(InputStream.class, null)).thenReturn(mainImageInputStream);

        // Run the test
        final Response result = bookResourceUnderTest.addBook(input);

        // Verify the results
        verify(mockBookService, times(1)).addBook(any(Book.class));
    }

    @Test
    void testDeleteBook() {
        // Setup
        // Run the test
        final Response result = bookResourceUnderTest.deleteBook(0L);

        // Verify the results
        // You might want to verify some interaction with mockBookService if needed
    }

    @Test
    void testDetailsBook() {
        // Setup
        // Configure BookService.detailsBook(...).
        final BookDetailsDTO bookDetailsDTO = new BookDetailsDTO(0L, "name", 0, "isbn", "author",
                new GregorianCalendar(2020, Calendar.JANUARY, 1).getTime(), "description", List.of("value"));
        when(mockBookService.detailsBook(0L)).thenReturn(bookDetailsDTO);

        // Run the test
        final Response result = bookResourceUnderTest.detailsBook(0L);

        // Verify the results
        verify(mockBookService, times(1)).detailsBook(0L);
    }

    @Test
    void testGetBooks1() {
        // Setup
        // Configure BookService.getBooks(...).
        final List<BookDTO> bookDTOS = List.of(new BookDTO(0L, "name", 0, "mainImage"));
        when(mockBookService.getBooks(0, 0)).thenReturn(bookDTOS);

        // Run the test
        final Response result = bookResourceUnderTest.getBooks(0, 0);

        // Verify the results
        verify(mockBookService, times(1)).getBooks(0, 0);
    }

    @Test
    void testGetBooks1_BookServiceReturnsNoItems() {
        // Setup
        when(mockBookService.getBooks(0, 0)).thenReturn(Collections.emptyList());

        // Run the test
        final Response result = bookResourceUnderTest.getBooks(0, 0);

        // Verify the results
        verify(mockBookService, times(1)).getBooks(0, 0);
    }

    @Test
    void testGetBooks2() {
        // Setup
        when(mockBookService.getRentBooks()).thenReturn(List.of(new BookRentDTO(0L, "name")));

        // Run the test
        final Response result = bookResourceUnderTest.getBooks();

        // Verify the results
        verify(mockBookService, times(1)).getRentBooks();
    }

    @Test
    void testGetBooks2_BookServiceReturnsNoItems() {
        // Setup
        when(mockBookService.getRentBooks()).thenReturn(Collections.emptyList());

        // Run the test
        final Response result = bookResourceUnderTest.getBooks();

        // Verify the results
        verify(mockBookService, times(1)).getRentBooks();
    }

    @Test
    void testRentBook() {
        // Setup
        final RentRequestDTO rentRequest = new RentRequestDTO(0L, 0L, "returnDate");

        // Run the test
        final Response result = bookResourceUnderTest.rentBook(rentRequest);

        // Verify the results
        // You might want to verify some interaction with mockBookService if needed
    }
}
