package sit.tuvarna.emailsystem;

import io.quarkus.scheduler.Scheduled;
import io.quarkus.scheduler.ScheduledExecution;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.core.GenericType;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import sit.tuvarna.core.models.users.EmailSchedulerDTO;

import java.util.List;

@ApplicationScoped
public class NotificationScheduler {

    private static final Logger LOG = Logger.getLogger(NotificationScheduler.class);

    @Inject
    EmailSystemService mailerService;

    @Scheduled(every = "24h") // Every day at midnight
    @Transactional
    public void sendReminderEmails(ScheduledExecution execution) {
        LOG.info("Executing scheduled task to send reminder emails");

        List<EmailSchedulerDTO> usersToNotify = getUsersWithBooksDueInLessThanTwoDays();

        for (EmailSchedulerDTO user : usersToNotify) {
            mailerService.sendReminderEmail(user);
        }
    }

    @Inject
    EntityManager em;

    private Client client = ClientBuilder.newClient();

    // Setter method for testing purposes
    public void setClient(Client client) {
        this.client = client;
    }

    public List<EmailSchedulerDTO> getUsersWithBooksDueInLessThanTwoDays() {
        Response response = client.target("http://localhost:8089/api/users/due-soon")
                .request(MediaType.APPLICATION_JSON)
                .get();

        if (response.getStatus() == 200) {
            return response.readEntity(new GenericType<>() {
            });
        } else {
            throw new RuntimeException("Failed to fetch users with books due soon");
        }
    }
}
