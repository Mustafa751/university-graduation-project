package sit.tuvarna;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import org.jboss.logging.Logger;
import sit.tuvarna.models.users.EmailSchedulerDTO;
import sit.tuvarna.models.users.User;


@Singleton
public class EmailSystemService{

    private static final Logger LOG = Logger.getLogger(EmailSystemService.class);

    @Inject
    Mailer mailer;

    public void sendReminderEmail(EmailSchedulerDTO user) {
        String subject = "Reminder: Book Return Due Soon";
        String body = "Dear " + user.getFacultyNumber() + ",\n\nYou have books that are due for return in less than 2 days. Please return them on time to avoid penalties.\n\nBest regards,\nLibrary Team";

        Mail mail = Mail.withText(user.getEmail(), subject, body);

        mailer.send(mail);

        LOG.infof("Sent reminder email to %s", user.getEmail());
    }
}
