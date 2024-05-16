package sit.tuvarna.models.books;

import java.time.LocalDateTime;

public class UserBooksDTO {
    public Long id;
    public String name;
    public boolean isReturned;

    public UserBooksDTO(Long id, String name, boolean isReturned) {
        this.id = id;
        this.name = name;
        this.isReturned = isReturned;
    }
}
