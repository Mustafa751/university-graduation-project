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
import sit.tuvarna.core.models.JwtResponse;
import sit.tuvarna.core.models.users.LoginRequest;
import sit.tuvarna.core.models.users.User;
import sit.tuvarna.core.models.users.UserDTO;
import sit.tuvarna.core.models.users.UserStateManagementDTO;

import java.util.List;
import java.util.stream.Collectors;

@Path("/api/users")
@ApplicationScoped
public class UserResource {

    @Inject
    UserService userService;

    private Client client = ClientBuilder.newClient(); // Create a JAX-RS client

    @GET
    @Authenticated // Requires authentication to access user list
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @GET
    @Path("/rent-users")
    @Authenticated
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRentUsers() {
        List<User> users = User.listAll();
        List<UserDTO> userDTOs = users.stream()
                .map(user -> new UserDTO(user.id, user.getFacultyNumber()))
                .collect(Collectors.toList());
        return Response.ok(userDTOs).build();
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response login(LoginRequest loginRequest) {
        UserStateManagementDTO isValidUser = userService.login(loginRequest);

        if (isValidUser != null) {
            Client client = ClientBuilder.newClient();
            Response serviceResponse = client.target("http://localhost:8083/jwt")
                    .queryParam("userId", String.valueOf(isValidUser.getId()))
                    .queryParam("email", isValidUser.getEmail())
                    .queryParam("role", isValidUser.getRole())
                    .request(MediaType.APPLICATION_JSON)
                    .get();

            if (serviceResponse.getStatusInfo().getFamily() == Response.Status.Family.SUCCESSFUL) {
                String token = serviceResponse.readEntity(JwtResponse.class).getJwt();
                // Return JSON object with isValidUser status and token
                return Response.ok()
                        .entity(isValidUser)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .type(MediaType.APPLICATION_JSON)
                        .build();
            } else {
                return Response.status(Response.Status.BAD_GATEWAY).entity("Failed to generate token").build();
            }
        } else {
            // Return JSON object with isValidUser status
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("{\"isValidUser\": false}")
                    .type(MediaType.APPLICATION_JSON)
                    .build();
        }
    }

    @GET
    @Path("/summary")
    @Authenticated
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUsersSummary() {
        return Response.ok(userService.getUsersSummary()).build();
    }

    @GET
    @Path("/{userId}/unreturned-books")
    @Authenticated
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUnreturnedBooks(@PathParam("userId") Long userId) {
        return Response.ok(userService.getUnreturnedBooks(userId)).build();
    }

    @POST
    @Path("/{userId}/return-book/{bookId}")
    @Authenticated
    @Produces(MediaType.APPLICATION_JSON)
    public Response returnBook(@PathParam("userId") Long userId, @PathParam("bookId") Long bookId) {
        userService.getBook(userId, bookId);
        return Response.ok().build();
    }

    @GET
    @Path("/{userId}/books")
    @Authenticated
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