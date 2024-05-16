package sit.tuvarna.models.users;

public class EmailSchedulerDTO {
    private String facultyNumber;
    private String email;

    public EmailSchedulerDTO(String facultyNumber, String email) {
        this.facultyNumber = facultyNumber;
        this.email = email;
    }
    public EmailSchedulerDTO() {
    }

    // Getters and Setters

    public String getFacultyNumber() {
        return facultyNumber;
    }

    public void setFacultyNumber(String facultyNumber) {
        this.facultyNumber = facultyNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
