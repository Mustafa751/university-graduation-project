package sit.tuvarna.users;


import io.quarkus.security.Authenticated;
import jakarta.annotation.security.PermitAll;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import sit.tuvarna.models.JwtResponse;
import sit.tuvarna.models.users.LoginRequest;
import sit.tuvarna.models.users.User;
import sit.tuvarna.models.users.UserDTO;

import java.util.List;
import java.util.jar.JarEntry;
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
                .map(user -> new UserDTO(user.id, user.getFakNumber()))
                .collect(Collectors.toList());
        return Response.ok(userDTOs).build();
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @PermitAll // No authentication needed for login
    public Response login(LoginRequest loginRequest) {
        boolean isValidUser = userService.login(loginRequest);

        if (isValidUser) {
            try (Response serviceResponse = client.target("http://localhost:8083/jwt")
                    .request(MediaType.APPLICATION_JSON)
                    .get()) {

                if (serviceResponse.getStatusInfo().getFamily() == Response.Status.Family.SUCCESSFUL) {
                    String token = serviceResponse.readEntity(JwtResponse.class).getJwt();
                    // Return JSON object with isValidUser status and token
                    return Response.ok()
                            .entity("{\"isValidUser\": true}")
                            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                            .type(MediaType.APPLICATION_JSON)
                            .build();
                } else {
                    return Response.status(Response.Status.BAD_GATEWAY).entity("Failed to generate token").build();
                }
            }
        } else {
            // Return JSON object with isValidUser status
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("{\"isValidUser\": false}")
                    .type(MediaType.APPLICATION_JSON)
                    .build();
        }
    }
}