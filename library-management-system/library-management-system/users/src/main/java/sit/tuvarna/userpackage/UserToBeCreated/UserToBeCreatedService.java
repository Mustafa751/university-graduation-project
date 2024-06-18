package sit.tuvarna.userpackage.UserToBeCreated;

import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;
import sit.tuvarna.core.models.roles.Roles;
import sit.tuvarna.core.models.users.User;
import sit.tuvarna.core.models.users.UserToBeCreated;

import java.util.List;

@Singleton
public class UserToBeCreatedService {
    @Transactional
    public void createUserWithRole(UserToBeCreated userToBeCreated, Roles role) {
        User newUser = new User();
        newUser.setFacultyNumber(userToBeCreated.getFakNumber());
        newUser.setFirstName(userToBeCreated.getFirstName());
        newUser.setMiddleName(userToBeCreated.getMiddleName());
        newUser.setLastName(userToBeCreated.getLastName());
        newUser.setGender(userToBeCreated.getGender());
        newUser.setAddresses(userToBeCreated.getAddresses()); // Multiple addresses
        newUser.setEmail(userToBeCreated.getEmail());
        newUser.setPhoneNumber(userToBeCreated.getPhoneNumber());
        newUser.setCategory(userToBeCreated.getCategory());
        newUser.setEducation(userToBeCreated.getEducation());
        newUser.setFaculty(userToBeCreated.getFaculty());
        newUser.setSpecialty(userToBeCreated.getSpecialty());
        newUser.setCourse(userToBeCreated.getCourse());
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
