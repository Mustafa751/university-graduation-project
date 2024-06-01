package sit.tuvarna.books;

import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import sit.tuvarna.core.models.books.Book;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class BookServiceTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookService bookService;

    private MultipartFormDataInput input;

    @BeforeEach
    void setUp() {
        input = mock(MultipartFormDataInput.class);
    }

    @Test
    void testAddBook() throws Exception {
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

        bookService.addBook(formDataMap);

        verify(bookRepository, times(1)).persist(any(Book.class));
    }
}
