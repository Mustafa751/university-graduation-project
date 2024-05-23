package sit.tuvarna.users;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import sit.tuvarna.models.users.User;

@ApplicationScoped
public class UserRepository implements PanacheRepository<User> {
}
