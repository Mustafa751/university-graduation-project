package sit.tuvarna.books;

import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import sit.tuvarna.core.models.books.Book;
import sit.tuvarna.core.models.books.BookDetailsDTO;
import sit.tuvarna.core.models.enums.BookKnowledgeArea;
import sit.tuvarna.core.models.rental.RentRequestDTO;

import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@Path("/api/books")
@ApplicationScoped
public class BookResource {

    private static final Logger LOGGER = Logger.getLogger(BookResource.class.getName());

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
            bookService.addBook(formParts);
            return Response.ok().build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error processing input data", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error processing input data: " + e.getMessage()).build();
        }
    }

    @Path("{id}")
    @RolesAllowed("admin")
    @DELETE
    public Response deleteBook(@PathParam("id") Long id) {
        try {
            bookService.deleteBook(id);
            return Response.ok().build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error deleting book", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error deleting book: " + e.getMessage()).build();
        }
    }

    @Path("{id}")
    @GET
    public Response detailsBook(@PathParam("id") Long id) {
        try {
            BookDetailsDTO bookDetailsDTO = bookService.detailsBook(id);
            return Response.ok(bookDetailsDTO).build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error retrieving book details", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error retrieving book details: " + e.getMessage()).build();
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBooks(@QueryParam("page") @DefaultValue("1") int page,
                             @QueryParam("limit") @DefaultValue("10") int limit) {
        try {
            return Response.ok(bookService.getBooks(page, limit)).build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error retrieving books", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error retrieving books: " + e.getMessage()).build();
        }
    }

    @GET
    @Path("/rent-books")
    @RolesAllowed("*")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRentableBooks() {
        try {
            return Response.ok(bookService.getRentBooks()).build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error retrieving rentable books", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error retrieving rentable books: " + e.getMessage()).build();
        }
    }

    @GET
    @Path("/search")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchBooks(@QueryParam("query") String query) {
        try {
            List<Book> books = bookService.searchBooks(query);
            return Response.ok(books).build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error searching for books", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error searching for books: " + e.getMessage()).build();
        }
    }

    @POST
    @Path("/rent")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response rentBook(RentRequestDTO rentRequest) {
        try {
            bookService.rentBook(rentRequest);
            return Response.ok().build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error renting book", e);
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBookById(@PathParam("id") Long id) {
        try {
            Book book = bookService.getBookById(id);
            if (book == null) {
                return Response.status(Response.Status.NOT_FOUND).entity("Book not found").build();
            }
            return Response.ok(book).build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error retrieving book", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error retrieving book: " + e.getMessage()).build();
        }
    }

    @PUT
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response updateBook(@PathParam("id") Long id, MultipartFormDataInput input) {
        try {
            Map<String, List<InputPart>> formParts = input.getFormDataMap();
            bookService.updateBook(id, formParts);
            return Response.ok().build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error updating book", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error updating book: " + e.getMessage()).build();
        }
    }
    @GET
    @Path("/search")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchBooks(@QueryParam("knowledgeArea") BookKnowledgeArea knowledgeArea,
                                @QueryParam("query")@DefaultValue("") String query,
                                @QueryParam("page") @DefaultValue("1") int page,
                                @QueryParam("limit") @DefaultValue("10") int limit) {
        try {
            List<Book> books = bookService.searchBooks(knowledgeArea, query, page, limit);
            return Response.ok(books).build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error searching books", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error searching books: " + e.getMessage())
                    .build();
        }
    }
}
