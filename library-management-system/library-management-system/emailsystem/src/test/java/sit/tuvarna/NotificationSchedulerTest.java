package sit.tuvarna;

import jakarta.persistence.EntityManager;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.Invocation;
import jakarta.ws.rs.client.WebTarget;
import jakarta.ws.rs.core.GenericType;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sit.tuvarna.models.users.EmailSchedulerDTO;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NotificationSchedulerTest {

    @Mock
    private EmailSystemService mockMailerService;
    @Mock
    private EntityManager mockEm;
    @Mock
    private Client mockClient;
    @Mock
    private WebTarget mockWebTarget;
    @Mock
    private Invocation.Builder mockInvocationBuilder;
    @Mock
    private Response mockResponse;

    @InjectMocks
    private NotificationScheduler notificationSchedulerUnderTest;

    @BeforeEach
    void setUp() {
        notificationSchedulerUnderTest.mailerService = mockMailerService;
        notificationSchedulerUnderTest.em = mockEm;
        notificationSchedulerUnderTest.setClient(mockClient);
    }

    @Test
    void testSendReminderEmails() {
        // Setup
        when(mockClient.target("http://localhost:8089/api/users/due-soon")).thenReturn(mockWebTarget);
        when(mockWebTarget.request(MediaType.APPLICATION_JSON)).thenReturn(mockInvocationBuilder);
        when(mockInvocationBuilder.get()).thenReturn(mockResponse);
        when(mockResponse.getStatus()).thenReturn(200);
        when(mockResponse.readEntity(any(GenericType.class))).thenReturn(List.of(new EmailSchedulerDTO()));

        // Run the test
        notificationSchedulerUnderTest.sendReminderEmails(null);

        // Verify the results
        verify(mockMailerService).sendReminderEmail(any(EmailSchedulerDTO.class));
    }

    @Test
    void testGetUsersWithBooksDueInLessThanTwoDays() {
        // Setup
        when(mockClient.target("http://localhost:8089/api/users/due-soon")).thenReturn(mockWebTarget);
        when(mockWebTarget.request(MediaType.APPLICATION_JSON)).thenReturn(mockInvocationBuilder);
        when(mockInvocationBuilder.get()).thenReturn(mockResponse);
        when(mockResponse.getStatus()).thenReturn(200);
        when(mockResponse.readEntity(any(GenericType.class))).thenReturn(List.of(new EmailSchedulerDTO()));

        // Run the test
        final List<EmailSchedulerDTO> result = notificationSchedulerUnderTest.getUsersWithBooksDueInLessThanTwoDays();

        // Verify the results
        assertNotNull(result);
    }
}
