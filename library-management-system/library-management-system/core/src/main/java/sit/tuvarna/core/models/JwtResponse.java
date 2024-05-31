package sit.tuvarna.core.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class JwtResponse {
    private String jwt;

    // Jackson requires a no-args constructor for deserialization
    public JwtResponse() {
    }

    @JsonCreator
    public JwtResponse(@JsonProperty("jwt") String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
}
