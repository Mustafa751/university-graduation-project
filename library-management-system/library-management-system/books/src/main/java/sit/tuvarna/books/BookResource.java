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
import sit.tuvarna.core.models.books.BookDetailsDTO;
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
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRentableBooks() {
        try {
            return Response.ok(bookService.getRentBooks()).build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error retrieving rentable books", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error retrieving rentable books: " + e.getMessage()).build();
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
}
