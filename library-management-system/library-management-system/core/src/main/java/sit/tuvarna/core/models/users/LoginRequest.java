package sit.tuvarna.core.models.users;

public class LoginRequest {
    public String email;
    public String fakNumber;

        // Constructors, getters, setters
    public LoginRequest(String email,String fakNumber) {
        this.email = email;
        this.fakNumber = fakNumber;
    }

    public String getFakNumber() {
        return fakNumber;
    }

    public void setFakNumber(String fakNumber) {
        this.fakNumber = fakNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getters and setters if needed, or keep it simple for Jakarta to use direct field access
}