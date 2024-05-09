package sit.tuvarna.books;


import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import sit.tuvarna.models.JwtResponse;

@ApplicationScoped
@Path("/jwt")
public class BooksJWTResource {
    @Inject
    BooksJWTService booksJWTService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJwt() {
        String jwt = booksJWTService.generateJwt();
        JwtResponse jwtResponse = new JwtResponse(jwt);
        return Response.ok(jwtResponse).build();
    }

    @POST
    @Path("/check")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public boolean checkJWTTokenValidity(String jwtToken){
        return booksJWTService.checkJwtValidity(jwtToken);
    }
}
