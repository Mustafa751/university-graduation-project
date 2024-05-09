package sit.tuvarna.users;

import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;
import sit.tuvarna.models.users.LoginRequest;
import sit.tuvarna.models.users.User;

import java.util.List;

@Singleton
public class UserService {
    public List<User> getUsers() {
        return User.listAll();
    }

    @Transactional
    public boolean login(LoginRequest loginRequest) {
        User user = User.find("fakNumber = ?1 and egn = ?2", loginRequest.fakNumber, loginRequest.egn).firstResult();
        return user != null;
    }
}
