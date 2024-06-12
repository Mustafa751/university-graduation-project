package sit.tuvarna.books;

import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import sit.tuvarna.core.models.books.BookDTO;
import sit.tuvarna.core.models.books.BookDetailsDTO;
import sit.tuvarna.core.models.books.BookRentDTO;
import sit.tuvarna.core.models.rental.RentRequestDTO;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
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
        ByteArrayInputStream mainImageInputStream = new ByteArrayInputStream(new byte[]{1, 2, 3});
        when(mainImagePart.getBody(InputStream.class, null)).thenReturn(mainImageInputStream);

        final Response result = bookResourceUnderTest.addBook(input);

        verify(mockBookService, times(1)).addBook(any(Map.class));
        assertEquals(Response.Status.OK.getStatusCode(), result.getStatus());
    }

    @Test
    void testDeleteBook() {
        final Response result = bookResourceUnderTest.deleteBook(0L);

        verify(mockBookService, times(1)).deleteBook(0L);
        assertEquals(Response.Status.OK.getStatusCode(), result.getStatus());
    }

    @Test
    void testDetailsBook() {
        final BookDetailsDTO bookDetailsDTO = new BookDetailsDTO(0L, "name", 0, "isbn", "author",
                new GregorianCalendar(2020, Calendar.JANUARY, 1).getTime(), "description", List.of("value"));
        when(mockBookService.detailsBook(0L)).thenReturn(bookDetailsDTO);

        final Response result = bookResourceUnderTest.detailsBook(0L);

        verify(mockBookService, times(1)).detailsBook(0L);
        assertEquals(Response.Status.OK.getStatusCode(), result.getStatus());
        assertEquals(bookDetailsDTO, result.getEntity());
    }

    @Test
    void testGetBooks1() {
        final List<BookDTO> bookDTOS = List.of(new BookDTO(0L, "name", 0, "mainImage", "price", "knowledgeArea", "language"));
        when(mockBookService.getBooks(0, 0)).thenReturn(bookDTOS);

        final Response result = bookResourceUnderTest.getBooks(0, 0);

        verify(mockBookService, times(1)).getBooks(0, 0);
        assertEquals(Response.Status.OK.getStatusCode(), result.getStatus());
        assertEquals(bookDTOS, result.getEntity());
    }

    @Test
    void testGetBooks1_BookServiceReturnsNoItems() {
        when(mockBookService.getBooks(0, 0)).thenReturn(Collections.emptyList());

        final Response result = bookResourceUnderTest.getBooks(0, 0);

        verify(mockBookService, times(1)).getBooks(0, 0);
        assertEquals(Response.Status.OK.getStatusCode(), result.getStatus());
        assertEquals(Collections.emptyList(), result.getEntity());
    }

    @Test
    void testGetBooks2() {
        when(mockBookService.getRentBooks()).thenReturn(List.of(new BookRentDTO(0L, "name")));

        final Response result = bookResourceUnderTest.getRentableBooks();

        verify(mockBookService, times(1)).getRentBooks();
        assertEquals(Response.Status.OK.getStatusCode(), result.getStatus());
    }

    @Test
    void testGetBooks2_BookServiceReturnsNoItems() {
        when(mockBookService.getRentBooks()).thenReturn(Collections.emptyList());

        final Response result = bookResourceUnderTest.getRentableBooks();

        verify(mockBookService, times(1)).getRentBooks();
        assertEquals(Response.Status.OK.getStatusCode(), result.getStatus());
        assertEquals(Collections.emptyList(), result.getEntity());
    }

    @Test
    void testRentBook() throws Exception {
        final RentRequestDTO rentRequest = new RentRequestDTO(0L, 0L, "startDate","returnDate");

        final Response result = bookResourceUnderTest.rentBook(rentRequest);

        verify(mockBookService, times(1)).rentBook(any(RentRequestDTO.class));
        assertEquals(Response.Status.OK.getStatusCode(), result.getStatus());
    }
}
