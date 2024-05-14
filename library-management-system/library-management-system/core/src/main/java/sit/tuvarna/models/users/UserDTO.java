package sit.tuvarna.models.users;

public class UserDTO {
    public Long id;
    public String name;

    public UserDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}