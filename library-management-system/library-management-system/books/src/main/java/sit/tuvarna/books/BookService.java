package sit.tuvarna.books;

import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;
import org.apache.commons.io.IOUtils;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import sit.tuvarna.core.models.books.*;
import sit.tuvarna.core.models.images.Image;
import sit.tuvarna.core.models.rental.RentRequestDTO;
import sit.tuvarna.core.models.rental.Rental;
import sit.tuvarna.core.models.users.User;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@Singleton
public class BookService {

    private static final Logger LOGGER = Logger.getLogger(BookService.class.getName());

    @Inject
    BookRepository bookRepository;

    @Transactional
    public void addBook(Map<String, List<InputPart>> formParts) throws Exception {
        Book book = new Book();
        book.setIsbn(getFormData(formParts, "isbn"));
        book.setName(getFormData(formParts, "title"));
        book.setAuthor(getFormData(formParts, "author"));
        book.setDescription(getFormData(formParts, "description"));
        book.setProductionDate(new SimpleDateFormat("yyyy-MM-dd").parse(getFormData(formParts, "date")));
        book.setQuantity(Integer.parseInt(getFormData(formParts, "quantity")));
        book.setMainImage(extractBytes(formParts.get("mainImage").get(0)));

        processImages(formParts, book);
        bookRepository.persist(book);
    }

    private void processImages(Map<String, List<InputPart>> formParts, Book book) throws IOException {
        List<InputPart> imageParts = formParts.get("images");
        if (imageParts != null) {
            for (InputPart part : imageParts) {
                byte[] imageData = extractBytes(part);
                Image image = new Image();
                image.setData(imageData);
                book.addImage(image);
            }
        }
    }

    private byte[] extractBytes(InputPart part) throws IOException {
        try (InputStream inputStream = part.getBody(InputStream.class, null)) {
            return IOUtils.toByteArray(inputStream);
        }
    }

    private String getFormData(Map<String, List<InputPart>> formParts, String key) throws IOException {
        return formParts.get(key).get(0).getBodyAsString();
    }

    public List<BookDTO> getBooks(int page, int limit) {
        try {
            List<Book> books = bookRepository.find("order by id").page(page - 1, limit).list();
            return BookMapper.toDTOs(books);
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error retrieving books", e);
            throw e;
        }
    }

    public BookDetailsDTO detailsBook(Long id) {
        try {
            Book book = bookRepository.findById(id);
            return BookMapper.toDetailsDTO(book);
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error retrieving book details", e);
            throw e;
        }
    }

    public List<BookRentDTO> getRentBooks() {
        try {
            List<Book> books = bookRepository.find("quantity > 1").list();
            return books.stream()
                    .map(book -> new BookRentDTO(book.id, book.name)).toList();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error retrieving rentable books", e);
            throw e;
        }
    }

    @Transactional
    public void deleteBook(Long id) {
        try {
            boolean deleted = bookRepository.deleteById(id);
            if (!deleted) {
                LOGGER.log(Level.WARNING, "Book with id {0} not found for deletion", id);
            }
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error deleting book", e);
            throw e;
        }
    }

    @Transactional
    public void rentBook(RentRequestDTO rentRequest) throws Exception {
        Book book = Book.findById(rentRequest.bookId);
        User user = User.findById(rentRequest.userId);
        if (book == null || user == null || book.quantity <= 0) {
            throw new IllegalArgumentException("Invalid book or user, or insufficient quantity.");
        }

        book.quantity -= 1;
        book.persist();

        Rental rental = new Rental();
        rental.setBook(book);
        rental.setUser(user);
        rental.setRentalStartDate(LocalDate.now().atStartOfDay());
        rental.setRentalEndDate(LocalDate.parse(rentRequest.returnDate).atStartOfDay());
        rental.persist();
    }
}
