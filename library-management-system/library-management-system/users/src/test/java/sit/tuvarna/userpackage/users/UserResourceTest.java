package sit.tuvarna.userpackage.users;

import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sit.tuvarna.core.models.JwtResponse;
import sit.tuvarna.core.models.books.UnreturnedBookDTO;
import sit.tuvarna.core.models.books.UserBooksDTO;
import sit.tuvarna.core.models.roles.Roles;
import sit.tuvarna.core.models.users.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

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
        final UserDTO userDTO = new UserDTO(1L, "facultyNumber");
        final List<UserDTO> users = List.of(userDTO);
        when(mockUserService.getUsers()).thenReturn(users);

        final List<UserDTO> result = userResourceUnderTest.getUsers();
        assertEquals(users, result);
    }

    @Test
    void testGetUsers_UserServiceReturnsNoItems() {
        when(mockUserService.getUsers()).thenReturn(Collections.emptyList());

        final List<UserDTO> result = userResourceUnderTest.getUsers();
        assertEquals(Collections.emptyList(), result);
    }

    @Test
    void testLogin() {
        final LoginRequest loginRequest = new LoginRequest("email", "fakNumber");
        final UserStateManagementDTO userStateManagementDTO = new UserStateManagementDTO(1L, "email", "facultyNumber", "phoneNumber", Roles.STUDENT);
        when(mockUserService.login(any(LoginRequest.class))).thenReturn(userStateManagementDTO);
        when(mockUserService.generateJwt(any(UserStateManagementDTO.class))).thenReturn("jwtToken");

        final Response result = userResourceUnderTest.login(loginRequest);
        assertEquals(Response.Status.OK.getStatusCode(), result.getStatus());
    }

    @Test
    void testLogin_UserServiceReturnsNull() {
        final LoginRequest loginRequest = new LoginRequest("email", "fakNumber");
        when(mockUserService.login(any(LoginRequest.class))).thenThrow(new WebApplicationException("Invalid credentials", Response.Status.UNAUTHORIZED));

        final Response result = userResourceUnderTest.login(loginRequest);
        assertEquals(Response.Status.UNAUTHORIZED.getStatusCode(), result.getStatus());
    }

    @Test
    void testGetUsersSummary() {
        final UserSummaryDTO userSummaryDTO = new UserSummaryDTO(1L, "facultyNumber", "email", "phoneNumber");
        final List<UserSummaryDTO> userSummaryDTOS = List.of(userSummaryDTO);
        when(mockUserService.getUsersSummary()).thenReturn(userSummaryDTOS);

        final Response result = userResourceUnderTest.getUsersSummary();
        assertEquals(Response.Status.OK.getStatusCode(), result.getStatus());
    }

    @Test
    void testGetUsersSummary_UserServiceReturnsNoItems() {
        when(mockUserService.getUsersSummary()).thenReturn(Collections.emptyList());

        final Response result = userResourceUnderTest.getUsersSummary();
        assertEquals(Response.Status.OK.getStatusCode(), result.getStatus());
    }

    @Test
    void testGetUnreturnedBooks_UserServiceReturnsNoItems() {
        when(mockUserService.getUnreturnedBooks(1L)).thenReturn(Collections.emptyList());

        final Response result = userResourceUnderTest.getUnreturnedBooks(1L);
        assertEquals(Response.Status.OK.getStatusCode(), result.getStatus());
    }

    @Test
    void testReturnBook() {
        final Response result = userResourceUnderTest.returnBook(1L, 1L);
        assertEquals(Response.Status.OK.getStatusCode(), result.getStatus());
        verify(mockUserService).returnBook(1L, 1L);
    }

    @Test
    void testGetAllBooks() {
        final UserBooksDTO userBooksDTO = new UserBooksDTO(1L, "bookName", LocalDateTime.now(),true);
        final List<UserBooksDTO> userBooksDTOS = List.of(userBooksDTO);
        when(mockUserService.getAllBooks(1L)).thenReturn(userBooksDTOS);

        final Response result = userResourceUnderTest.getAllBooks(1L);
        assertEquals(Response.Status.OK.getStatusCode(), result.getStatus());
    }

    @Test
    void testGetAllBooks_UserServiceReturnsNoItems() {
        when(mockUserService.getAllBooks(1L)).thenReturn(Collections.emptyList());

        final Response result = userResourceUnderTest.getAllBooks(1L);
        assertEquals(Response.Status.OK.getStatusCode(), result.getStatus());
    }

    @Test
    void testGetUsersWithBooksDueInLessThanTwoDays() {
        final EmailSchedulerDTO emailSchedulerDTO = new EmailSchedulerDTO("facultyNumber", "email");
        final List<EmailSchedulerDTO> emailSchedulerDTOS = List.of(emailSchedulerDTO);
        when(mockUserService.getUsersWithBooksDueInLessThanTwoDays()).thenReturn(emailSchedulerDTOS);

        final Response result = userResourceUnderTest.getUsersWithBooksDueInLessThanTwoDays();
        assertEquals(Response.Status.OK.getStatusCode(), result.getStatus());
    }

    @Test
    void testGetUsersWithBooksDueInLessThanTwoDays_UserServiceReturnsNoItems() {
        when(mockUserService.getUsersWithBooksDueInLessThanTwoDays()).thenReturn(Collections.emptyList());

        final Response result = userResourceUnderTest.getUsersWithBooksDueInLessThanTwoDays();
        assertEquals(Response.Status.OK.getStatusCode(), result.getStatus());
    }
}
