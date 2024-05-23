package sit.tuvarna.users;

import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sit.tuvarna.models.books.UnreturnedBookDTO;
import sit.tuvarna.models.books.UserBooksDTO;
import sit.tuvarna.models.roles.Roles;
import sit.tuvarna.models.users.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserResourceTest {

    @Mock
    private UserService mockUserService;

    private UserResource userResourceUnderTest;

    @BeforeEach
    void setUp() {
        userResourceUnderTest = new UserResource();
        userResourceUnderTest.userService = mockUserService;
    }

    @Test
    void testGetUsers() {
        // Setup
        // Configure UserService.getUsers(...).
        final User user = new User();
        user.setFacultyNumber("name");
        user.setEgn("egn");
        user.setRole(Roles.STUDENT);
        user.setEmail("email");
        user.setPhoneNumber("phoneNumber");
        final List<User> users = List.of(user);
        when(mockUserService.getUsers()).thenReturn(users);

        // Run the test
        final List<User> result = userResourceUnderTest.getUsers();

        // Verify the results
    }

    @Test
    void testGetUsers_UserServiceReturnsNoItems() {
        // Setup
        when(mockUserService.getUsers()).thenReturn(Collections.emptyList());

        // Run the test
        final List<User> result = userResourceUnderTest.getUsers();

        // Verify the results
        assertEquals(Collections.emptyList(), result);
    }

    @Test
    void testLogin() {
        // Setup
        final LoginRequest loginRequest = new LoginRequest("fakNumber", "egn");

        // Configure UserService.login(...).
        final UserStateManagementDTO userStateManagementDTO = new UserStateManagementDTO(0L, "email", "facultyNumber",
                "phoneNumber", Roles.STUDENT);
        when(mockUserService.login(any(LoginRequest.class))).thenReturn(userStateManagementDTO);

        // Run the test
        final Response result = userResourceUnderTest.login(loginRequest);

        // Verify the results
    }

    @Test
    void testLogin_UserServiceReturnsNull() {
        // Setup
        final LoginRequest loginRequest = new LoginRequest("fakNumber", "egn");
        when(mockUserService.login(any(LoginRequest.class))).thenReturn(null);

        // Run the test
        final Response result = userResourceUnderTest.login(loginRequest);

        // Verify the results
    }

    @Test
    void testGetUsersSummary() {
        // Setup
        // Configure UserService.getUsersSummary(...).
        final List<UserSummaryDTO> userSummaryDTOS = List.of(
                new UserSummaryDTO(0L, "facultyNumber", "email", "phoneNumber"));
        when(mockUserService.getUsersSummary()).thenReturn(userSummaryDTOS);

        // Run the test
        final Response result = userResourceUnderTest.getUsersSummary();

        // Verify the results
    }

    @Test
    void testGetUsersSummary_UserServiceReturnsNoItems() {
        // Setup
        when(mockUserService.getUsersSummary()).thenReturn(Collections.emptyList());

        // Run the test
        final Response result = userResourceUnderTest.getUsersSummary();

        // Verify the results
    }

    @Test
    void testGetUnreturnedBooks() {
        // Setup
        // Configure UserService.getUnreturnedBooks(...).
        final List<UnreturnedBookDTO> unreturnedBookDTOS = List.of(
                new UnreturnedBookDTO(0L, "bookName", LocalDateTime.of(2020, 1, 1, 0, 0, 0)));
        when(mockUserService.getUnreturnedBooks(0L)).thenReturn(unreturnedBookDTOS);

        // Run the test
        final Response result = userResourceUnderTest.getUnreturnedBooks(0L);

        // Verify the results
    }

    @Test
    void testGetUnreturnedBooks_UserServiceReturnsNoItems() {
        // Setup
        when(mockUserService.getUnreturnedBooks(0L)).thenReturn(Collections.emptyList());

        // Run the test
        final Response result = userResourceUnderTest.getUnreturnedBooks(0L);

        // Verify the results
    }

    @Test
    void testReturnBook() {
        // Setup
        // Run the test
        final Response result = userResourceUnderTest.returnBook(0L, 0L);

        // Verify the results
        verify(mockUserService).getBook(0L, 0L);
    }

    @Test
    void testGetAllBooks() {
        // Setup
        // Configure UserService.getAllBooks(...).
        final List<UserBooksDTO> userBooksDTOS = List.of(new UserBooksDTO(0L, "name", false));
        when(mockUserService.getAllBooks(0L)).thenReturn(userBooksDTOS);

        // Run the test
        final Response result = userResourceUnderTest.getAllBooks(0L);

        // Verify the results
    }

    @Test
    void testGetAllBooks_UserServiceReturnsNoItems() {
        // Setup
        when(mockUserService.getAllBooks(0L)).thenReturn(Collections.emptyList());

        // Run the test
        final Response result = userResourceUnderTest.getAllBooks(0L);

        // Verify the results
    }

    @Test
    void testGetUsersWithBooksDueInLessThanTwoDays() {
        // Setup
        // Configure UserService.getUsersWithBooksDueInLessThanTwoDays(...).
        final List<EmailSchedulerDTO> emailSchedulerDTOS = List.of(new EmailSchedulerDTO("facultyNumber", "email"));
        when(mockUserService.getUsersWithBooksDueInLessThanTwoDays()).thenReturn(emailSchedulerDTOS);

        // Run the test
        final Response result = userResourceUnderTest.getUsersWithBooksDueInLessThanTwoDays();

        // Verify the results
    }

    @Test
    void testGetUsersWithBooksDueInLessThanTwoDays_UserServiceReturnsNoItems() {
        // Setup
        when(mockUserService.getUsersWithBooksDueInLessThanTwoDays()).thenReturn(Collections.emptyList());

        // Run the test
        final Response result = userResourceUnderTest.getUsersWithBooksDueInLessThanTwoDays();

        // Verify the results
    }
}
