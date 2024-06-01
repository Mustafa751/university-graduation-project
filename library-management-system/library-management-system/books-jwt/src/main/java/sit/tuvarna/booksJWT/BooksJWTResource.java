package sit.tuvarna.booksJWT;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import sit.tuvarna.core.models.JwtResponse;
import sit.tuvarna.core.models.roles.Roles;

import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@ApplicationScoped
@Path("/jwt")
public class BooksJWTResource {

    private static final Logger LOGGER = Logger.getLogger(BooksJWTResource.class.getName());

    @Inject
    BooksJWTService booksJWTService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJwt(@QueryParam("userId") String userId,
                           @QueryParam("email") String email,
                           @QueryParam("role") Roles role) {
        try {
            String jwt = booksJWTService.generateJwt(userId, email, role);
            JwtResponse jwtResponse = new JwtResponse(jwt);
            return Response.ok(jwtResponse).build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Failed to generate JWT", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Failed to generate JWT").build();
        }
    }

    @POST
    @Path("/check")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response checkJWTTokenValidity(String jwtToken) {
        try {
            boolean isValid = booksJWTService.checkJwtValidity(jwtToken);
            return Response.ok(isValid).build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Failed to check JWT validity", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Failed to check JWT validity").build();
        }
    }

    @POST
    @Path("/parse")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response parseJwt(String jwtToken) {
        try {
            Map<String, Object> userDetails = booksJWTService.parseJwt(jwtToken);
            if (userDetails != null) {
                return Response.ok(userDetails).build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).entity("Invalid token").build();
            }
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Failed to parse JWT", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Failed to parse JWT").build();
        }
    }
}
