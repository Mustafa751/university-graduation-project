package sit.tuvarna.UserToBeCreated;

import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;
import sit.tuvarna.models.roles.Roles;
import sit.tuvarna.models.users.User;
import sit.tuvarna.models.users.UserToBeCreated;

import java.util.List;

@Singleton
public class UserToBeCreatedService {
    @Transactional
    public void createUserWithRole(UserToBeCreated userToBeCreated, Roles role) {
        User newUser = new User();
        newUser.setFacultyNumber(userToBeCreated.getFakNumber());
        newUser.setEgn(userToBeCreated.getEgn());
        newUser.setEmail(userToBeCreated.getEmail());
        newUser.setPhoneNumber(userToBeCreated.getPhoneNumber());
        newUser.setRole(role);

        newUser.persist();  // Persist the new User
        userToBeCreated.delete();  // Delete the UserToBeCreated record
    }

    public List<UserToBeCreated> getUsersToBeCreated() {
        return UserToBeCreated.listAll();
    }

    @Transactional
    public void createUserToBeCreated(UserToBeCreated userToBeCreated) {
        userToBeCreated.persist();
    }
}
