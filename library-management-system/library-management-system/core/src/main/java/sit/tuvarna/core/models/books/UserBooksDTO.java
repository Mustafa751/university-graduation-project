package sit.tuvarna.core.models.books;

import java.time.LocalDateTime;

public class UserBooksDTO {
    public Long id;
    public String name;
    public LocalDateTime date;
    public boolean isReturned;

    public UserBooksDTO(Long id, String name,LocalDateTime date, boolean isReturned) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.isReturned = isReturned;
    }
}
