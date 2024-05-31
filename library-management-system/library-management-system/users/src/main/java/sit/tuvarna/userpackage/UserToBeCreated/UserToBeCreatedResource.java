package sit.tuvarna.userpackage.UserToBeCreated;

import io.quarkus.security.Authenticated;
import jakarta.annotation.security.PermitAll;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import sit.tuvarna.core.models.roles.Roles;
import sit.tuvarna.core.models.users.UserToBeCreated;

import java.util.List;

@Path("/api/usersCreate")
@ApplicationScoped
public class UserToBeCreatedResource {

    @Inject
    UserToBeCreatedService userToBeCreatedService;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @PermitAll // Allow creating a user without authentication
    public void createUserToBeCreated(UserToBeCreated userToBeCreated){
        userToBeCreatedService.createUserToBeCreated(userToBeCreated);
    }

    @GET
    @Authenticated // Requires authentication to see the list
    public List<UserToBeCreated> getUsersToBeCreated(){
        return userToBeCreatedService.getUsersToBeCreated();
    }

    @POST
    @Path("/{role}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Authenticated // Requires authentication to create a user with specific roles
    public Response createUser(@PathParam("role") Roles role, UserToBeCreated userToBeCreated){
        userToBeCreatedService.createUserWithRole(userToBeCreated, role);
        return Response.ok().build();
    }
}