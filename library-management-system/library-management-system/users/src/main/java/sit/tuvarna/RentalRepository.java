package sit.tuvarna;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import sit.tuvarna.models.rental.Rental;

@ApplicationScoped
public class RentalRepository implements PanacheRepository<Rental> {
}
