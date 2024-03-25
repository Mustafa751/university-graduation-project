package sit.tuvarna.books;


import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
@Path("/jwt")
public class BooksJWTResource {
    @Inject
    BooksJWTService booksJWTService;

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public Response getJwt() {
        String jwt = booksJWTService.generateJwt();
        return Response.ok(jwt).build();
    }
}
