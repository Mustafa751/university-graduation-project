package sit.tuvarna.UserToBeCreated;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import sit.tuvarna.models.roles.Roles;
import sit.tuvarna.models.users.UserToBeCreated;

import java.util.List;

@ApplicationScoped
@Path("/api/usersCreate")
public class UserToBeCreatedResource {

    @Inject
    UserToBeCreatedService userToBeCreatedService;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void createUserToBeCreated(UserToBeCreated userToBeCreated){
        userToBeCreatedService.createUserToBeCreated(userToBeCreated);
    }

    @GET
    public List<UserToBeCreated> getUsersToBeCreated(){
        return userToBeCreatedService.getUsersToBeCreated();
    }

    @POST
    @Path("/{role}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void createUser(@PathParam("role") Roles role, UserToBeCreated userToBeCreated){
        userToBeCreatedService.createUserWithRole(userToBeCreated, role);
    }

}
