package sit.tuvarna.core.models.users;

import sit.tuvarna.core.models.roles.Roles;

public class UserStateManagementDTO {
    private Long id;
    private String email;
    private String facultyNumber;
    private String phoneNumber;
    private Roles role;

    public UserStateManagementDTO(Long id, String email, String facultyNumber, String phoneNumber, Roles role) {
        this.id = id;
        this.email = email;
        this.facultyNumber = facultyNumber;
        this.phoneNumber = phoneNumber;
        this.role = role;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFacultyNumber() {
        return facultyNumber;
    }

    public void setFacultyNumber(String facultyNumber) {
        this.facultyNumber = facultyNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
    }
}
