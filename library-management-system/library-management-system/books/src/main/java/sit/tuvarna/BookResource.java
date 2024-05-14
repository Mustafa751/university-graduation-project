package sit.tuvarna;


import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.apache.commons.io.IOUtils;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import sit.tuvarna.models.books.Book;
import sit.tuvarna.models.books.BookDetailsDTO;
import sit.tuvarna.models.books.BookRentDTO;
import sit.tuvarna.models.images.Image;
import sit.tuvarna.models.rental.RentRequestDTO;
import sit.tuvarna.models.rental.Rental;
import sit.tuvarna.models.users.User;

import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Path("/api/books")
@ApplicationScoped
public class BookResource {
    List<Book> books = new ArrayList<>();

    @Inject
    BookService bookService;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response addBook(MultipartFormDataInput input) {
        try {
            Map<String, List<InputPart>> formParts = input.getFormDataMap();
            if (!formParts.containsKey("isbn") || !formParts.containsKey("title")) {
                return Response.status(Response.Status.BAD_REQUEST).entity("Missing required fields.").build();
            }
            Book book = new Book();
            book.setIsbn(getFormData(formParts, "isbn"));
            book.setName(getFormData(formParts, "title"));
            book.setAuthor(getFormData(formParts, "author"));
            book.setDescription(getFormData(formParts, "description"));
            book.setProductionDate(new SimpleDateFormat("yyyy-MM-dd").parse(getFormData(formParts, "date")));
            book.setQuantity(Integer.parseInt(getFormData(formParts, "quantity")));
            book.setMainImage(extractBytes(formParts.get("mainImage").get(0)));

            processImages(formParts, book);
            bookService.addBook(book);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error processing input data: " + e.getMessage()).build();
        }
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
        InputStream inputStream = part.getBody(InputStream.class, null);
        return IOUtils.toByteArray(inputStream);
    }

    private String getFormData(Map<String, List<InputPart>> formParts, String key) throws IOException {
        return formParts.get(key).get(0).getBodyAsString();
    }


    @Path("{id}")
    @RolesAllowed("admin")
    @DELETE
    public Response deleteBook(@PathParam("id")  Long id){
        books.removeIf(book -> book.id.equals(id));
        return Response.ok(books).build();
    }
    @Path("{id}")
    @GET
    public Response detailsBook(@PathParam("id")  Long id){
        BookDetailsDTO bookDetailsDTO = bookService.detailsBook(id);
        return Response.ok(bookDetailsDTO).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBooks(@QueryParam("page") @DefaultValue("1") int page,
                             @QueryParam("limit") @DefaultValue("10") int limit) {
        return Response.ok(bookService.getBooks(page, limit)).build();
    }

    @GET
    @Path("/rent-books")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBooks() {
        return Response.ok(bookService.getRentBooks()).build();
    }

    @POST
    @Path("/rent")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response rentBook(RentRequestDTO rentRequest) {
        try {
            Book book = Book.findById(rentRequest.bookId);
            User user = User.findById(rentRequest.userId);
            if (book == null || user == null || book.quantity <= 0) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }

            book.quantity -= 1;
            book.persist();

            Rental rental = new Rental();
            rental.setBook(book);
            rental.setUser(user);
            rental.setRentalStartDate(LocalDate.now().atStartOfDay());
            rental.setRentalEndDate(LocalDate.parse(rentRequest.returnDate).atStartOfDay());
            rental.persist();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }

        return Response.ok().build();
    }

}
