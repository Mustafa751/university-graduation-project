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
import sit.tuvarna.core.models.enums.BookKnowledgeArea;
import sit.tuvarna.core.models.images.Image;

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

    /*@Test
    void testAddBook() throws Exception {
        // Mock input parts for each field
        InputPart isbnPart = mock(InputPart.class);
        InputPart titlePart = mock(InputPart.class);
        InputPart authorPart = mock(InputPart.class);
        InputPart descriptionPart = mock(InputPart.class);
        InputPart datePart = mock(InputPart.class);
        InputPart quantityPart = mock(InputPart.class);
        InputPart mainImagePart = mock(InputPart.class);
        InputPart subtitlePart = mock(InputPart.class);
        InputPart parallelTitlePart = mock(InputPart.class);
        InputPart editionPart = mock(InputPart.class);
        InputPart placeOfPublicationPart = mock(InputPart.class);
        InputPart publisherPart = mock(InputPart.class);
        InputPart languagePart = mock(InputPart.class);
        InputPart sourceTitlePart = mock(InputPart.class);
        InputPart volumePart = mock(InputPart.class);
        InputPart issueNumberPart = mock(InputPart.class);
        InputPart pagesPart = mock(InputPart.class);
        InputPart addresses = mock(InputPart.class);
        InputPart publicationYearPart = mock(InputPart.class);
        InputPart notesPart = mock(InputPart.class);
        InputPart pricePart = mock(InputPart.class);
        InputPart keywordsPart = mock(InputPart.class);
        InputPart classificationIndexPart = mock(InputPart.class);
        InputPart knowledgeAreaPart = mock(InputPart.class);
        InputPart documentTypePart = mock(InputPart.class);

        // Add the mocked parts to the formDataMap
        Map<String, List<InputPart>> formDataMap = new HashMap<>();
        formDataMap.put("isbn", List.of(isbnPart));
        formDataMap.put("title", List.of(titlePart));
        formDataMap.put("author", List.of(authorPart));
        formDataMap.put("description", List.of(descriptionPart));
        formDataMap.put("date", List.of(datePart));
        formDataMap.put("quantity", List.of(quantityPart));
        formDataMap.put("mainImage", List.of(mainImagePart));
        formDataMap.put("subtitle", List.of(subtitlePart));
        formDataMap.put("parallelTitle", List.of(parallelTitlePart));
        formDataMap.put("edition", List.of(editionPart));
        formDataMap.put("placeOfPublication", List.of(placeOfPublicationPart));
        formDataMap.put("publisher", List.of(publisherPart));
        formDataMap.put("language", List.of(languagePart));
        formDataMap.put("addresses", List.of(addresses));
        formDataMap.put("sourceTitle", List.of(sourceTitlePart));
        formDataMap.put("volume", List.of(volumePart));
        formDataMap.put("issueNumber", List.of(issueNumberPart));
        formDataMap.put("pages", List.of(pagesPart));
        formDataMap.put("publicationYear", List.of(publicationYearPart));
        formDataMap.put("notes", List.of(notesPart));
        formDataMap.put("price", List.of(pricePart));
        formDataMap.put("keywords", List.of(keywordsPart));
        formDataMap.put("classificationIndex", List.of(classificationIndexPart));
        formDataMap.put("knowledgeArea", List.of(knowledgeAreaPart));
        formDataMap.put("documentType", List.of(documentTypePart));

        when(input.getFormDataMap()).thenReturn(formDataMap);
        when(isbnPart.getBodyAsString()).thenReturn("1234567890");
        when(titlePart.getBodyAsString()).thenReturn("Test Title");
        when(authorPart.getBodyAsString()).thenReturn("Test Author");
        when(descriptionPart.getBodyAsString()).thenReturn("Test Description");
        when(datePart.getBodyAsString()).thenReturn("2024-05-21");
        when(quantityPart.getBodyAsString()).thenReturn("10");
        when(subtitlePart.getBodyAsString()).thenReturn("Test Subtitle");
        when(parallelTitlePart.getBodyAsString()).thenReturn("Test Parallel Title");
        when(editionPart.getBodyAsString()).thenReturn("1st Edition");
        when(placeOfPublicationPart.getBodyAsString()).thenReturn("Test City");
        when(publisherPart.getBodyAsString()).thenReturn("Test Publisher");
        when(languagePart.getBodyAsString()).thenReturn("English");
        when(sourceTitlePart.getBodyAsString()).thenReturn("Test Source Title");
        when(addresses.getBodyAsString()).thenReturn("Test address");
        when(volumePart.getBodyAsString()).thenReturn("1");
        when(issueNumberPart.getBodyAsString()).thenReturn("1");
        when(pagesPart.getBodyAsString()).thenReturn("100");
        when(publicationYearPart.getBodyAsString()).thenReturn("2024");
        when(notesPart.getBodyAsString()).thenReturn("Test Notes");
        when(pricePart.getBodyAsString()).thenReturn("100");
        when(keywordsPart.getBodyAsString()).thenReturn("Test Keywords");
        when(classificationIndexPart.getBodyAsString()).thenReturn("001.234");
        when(knowledgeAreaPart.getBodyAsString()).thenReturn("Book");
        when(documentTypePart.getBodyAsString()).thenReturn("Book");

        ByteArrayInputStream mainImageInputStream = new ByteArrayInputStream(new byte[]{1, 2, 3});
        when(mainImagePart.getBody(InputStream.class, null)).thenReturn(mainImageInputStream);

        bookService.addBook(formDataMap);

        verify(bookRepository, times(1)).persist(any(Book.class));
    }

     */
}
