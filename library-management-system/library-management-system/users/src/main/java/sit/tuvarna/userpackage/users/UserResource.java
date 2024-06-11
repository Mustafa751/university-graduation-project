package sit.tuvarna.userpackage.users;

import io.quarkus.security.Authenticated;
import jakarta.annotation.security.PermitAll;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import sit.tuvarna.core.models.JwtResponse;
import sit.tuvarna.core.models.users.LoginRequest;
import sit.tuvarna.core.models.users.UserDTO;
import sit.tuvarna.core.models.users.UserStateManagementDTO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/api/users")
@ApplicationScoped
public class UserResource {

    private static final Logger LOG = Logger.getLogger(UserResource.class);

    @Inject
    UserService userService;

    @GET
    public List<UserDTO> getUsers() {
        return userService.getUsers();
    }

    @GET
    @Path("/rent-users")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRentUsers() {
        List<UserDTO> userDTOs = userService.getRentUsers();
        return Response.ok(userDTOs).build();
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response login(LoginRequest loginRequest) {
        try {
            UserStateManagementDTO user = userService.login(loginRequest);
            String jwt = userService.generateJwt(user);
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("user", user);
            responseBody.put("jwt", jwt);

            return Response.ok()
                    .entity(responseBody)
                    .header("X-Custom-Token", "Bearer " + jwt)
                    .type(MediaType.APPLICATION_JSON)
                    .build();
        } catch (WebApplicationException e) {
            return Response.status(e.getResponse().getStatus()).entity(e.getMessage()).build();
        } catch (Exception e) {
            LOG.error("Login failed", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Login failed").build();
        }
    }

    @GET
    @Path("/summary")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUsersSummary() {
        return Response.ok(userService.getUsersSummary()).build();
    }

    @GET
    @Path("/{userId}/unreturned-books")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUnreturnedBooks(@PathParam("userId") Long userId) {
        return Response.ok(userService.getUnreturnedBooks(userId)).build();
    }

    @POST
    @Path("/{userId}/return-book/{bookId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response returnBook(@PathParam("userId") Long userId, @PathParam("bookId") Long bookId) {
        userService.returnBook(userId, bookId);
        return Response.ok().build();
    }

    @GET
    @Path("/{userId}/books")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllBooks(@PathParam("userId") Long userId) {
        return Response.ok(userService.getAllBooks(userId)).build();
    }

    @GET
    @Path("/due-soon")
    @PermitAll
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUsersWithBooksDueInLessThanTwoDays() {
        return Response.ok(userService.getUsersWithBooksDueInLessThanTwoDays()).build();
    }
}
