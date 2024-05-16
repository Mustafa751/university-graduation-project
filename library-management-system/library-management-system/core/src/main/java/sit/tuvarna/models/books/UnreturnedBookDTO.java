package sit.tuvarna.models.books;

import java.time.LocalDateTime;

public class UnreturnedBookDTO {
    public Long bookId;
    public String bookName;
    public LocalDateTime rentalEndDate;

    public UnreturnedBookDTO(Long bookId, String bookName, LocalDateTime rentalEndDate) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.rentalEndDate = rentalEndDate;
    }
}
