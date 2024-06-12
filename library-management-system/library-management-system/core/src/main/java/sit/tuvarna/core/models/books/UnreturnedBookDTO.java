package sit.tuvarna.core.models.books;

import java.time.LocalDateTime;

public class UnreturnedBookDTO {
    public Long bookId;
    public String bookName;
    public String author;
    public String inventoryNumber;
    public String signature;
    public LocalDateTime rentalStartDate;
    public LocalDateTime rentalEndDate;

    public UnreturnedBookDTO(Long bookId, String bookName, String author, String inventoryNumber, String signature, LocalDateTime rentalStartDate, LocalDateTime rentalEndDate) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.author = author;
        this.inventoryNumber = inventoryNumber;
        this.signature = signature;
        this.rentalStartDate = rentalStartDate;
        this.rentalEndDate = rentalEndDate;
    }
}
