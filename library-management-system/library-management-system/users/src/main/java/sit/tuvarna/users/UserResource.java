package sit.tuvarna.users;


import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import sit.tuvarna.models.users.User;

import java.util.List;

@ApplicationScoped
@Path("/api/users")
public class UserResource {

    @Inject
    UserService userService;

    @GET
    public List<User> getUsers(){
        return userService.getUsers();
    }

}
