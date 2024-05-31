package sit.tuvarna.userpackage;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import sit.tuvarna.core.models.rental.Rental;

@ApplicationScoped
public class RentalRepository implements PanacheRepository<Rental> {
}
