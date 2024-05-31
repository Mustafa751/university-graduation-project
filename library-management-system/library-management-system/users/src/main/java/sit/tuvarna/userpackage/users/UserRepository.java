package sit.tuvarna.userpackage.users;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import sit.tuvarna.core.models.users.User;

@ApplicationScoped
public class UserRepository implements PanacheRepository<User> {
}
