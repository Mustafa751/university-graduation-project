package sit.tuvarna.books;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import sit.tuvarna.models.JwtResponse;
import sit.tuvarna.models.roles.Roles;

import java.util.Map;

@ApplicationScoped
@Path("/jwt")
public class BooksJWTResource {
    @Inject
    BooksJWTService booksJWTService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJwt(@QueryParam("userId") String userId,
                           @QueryParam("email") String email,
                           @QueryParam("role") Roles role) {
        String jwt = booksJWTService.generateJwt(userId, email, role);
        JwtResponse jwtResponse = new JwtResponse(jwt);
        return Response.ok(jwtResponse).build();
    }

    @POST
    @Path("/check")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public boolean checkJWTTokenValidity(String jwtToken) {
        return booksJWTService.checkJwtValidity(jwtToken);
    }

    @POST
    @Path("/parse")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response parseJwt(String jwtToken) {
        Map<String, Object> userDetails = booksJWTService.parseJwt(jwtToken);
        if (userDetails != null) {
            return Response.ok(userDetails).build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity("Invalid token").build();
        }
    }
}
