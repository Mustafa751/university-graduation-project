package sit.tuvarna.core.models.users;

public class LoginRequest {
    public String fakNumber;
    public String egn;

        // Constructors, getters, setters
    public LoginRequest(String fakNumber, String egn) {
        this.fakNumber = fakNumber;
        this.egn = egn;
    }

    public String getFakNumber() {
        return fakNumber;
    }

    public void setFakNumber(String fakNumber) {
        this.fakNumber = fakNumber;
    }

    public String getEgn() {
        return egn;
    }

    public void setEgn(String egn) {
        this.egn = egn;
    }

    // Getters and setters if needed, or keep it simple for Jakarta to use direct field access
}