package sit.tuvarna.models.users;

public class UserSummaryDTO {
    public Long id;
    public String facultyNumber;
    public String email;
    public String phoneNumber;

    public UserSummaryDTO(Long id, String facultyNumber, String email, String phoneNumber) {
        this.id = id;
        this.facultyNumber = facultyNumber;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}
