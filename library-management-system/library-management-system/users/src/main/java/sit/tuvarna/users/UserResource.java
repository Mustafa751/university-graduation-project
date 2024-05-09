package sit.tuvarna.users;


import io.quarkus.security.Authenticated;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import sit.tuvarna.models.users.LoginRequest;
import sit.tuvarna.models.users.User;

import java.util.List;

@ApplicationScoped
@Authenticated
@Path("/api/users")
public class UserResource {

    @Inject
    UserService userService;

    @GET
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/login")
    public boolean login(LoginRequest loginRequest){
        return userService.login(loginRequest);
    }

}
