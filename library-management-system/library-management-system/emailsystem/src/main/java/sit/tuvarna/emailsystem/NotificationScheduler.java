package sit.tuvarna.emailsystem;

import io.quarkus.scheduler.Scheduled;
import io.quarkus.scheduler.ScheduledExecution;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.WebTarget;
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

    @Inject
    EntityManager em;

    @Inject
    Client client;

    @Scheduled(every = "24h")
    @Transactional
    public void sendReminderEmails(ScheduledExecution execution) {
        LOG.info("Executing scheduled task to send reminder emails");

        try {
            List<EmailSchedulerDTO> usersToNotify = getUsersWithBooksDueInLessThanTwoDays();
            for (EmailSchedulerDTO user : usersToNotify) {
                mailerService.sendReminderEmail(user);
            }
        } catch (Exception e) {
            LOG.error("Failed to send reminder emails: " + e.getMessage(), e);
        }
    }

    public List<EmailSchedulerDTO> getUsersWithBooksDueInLessThanTwoDays() {
        WebTarget target = client.target("http://localhost:8089/api/users/due-soon");
        Response response = target.request(MediaType.APPLICATION_JSON).get();

        if (response.getStatus() == 200) {
            return response.readEntity(new GenericType<>() {});
        } else {
            LOG.errorf("Failed to fetch users with books due soon: %d %s", response.getStatus(), response.getStatusInfo().getReasonPhrase());
            throw new RuntimeException("Failed to fetch users with books due soon");
        }
    }
}
