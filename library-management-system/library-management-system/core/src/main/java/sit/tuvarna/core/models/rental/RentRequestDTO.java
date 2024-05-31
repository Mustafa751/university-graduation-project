package sit.tuvarna.core.models.rental;

public class RentRequestDTO {
    public Long bookId;
    public Long userId;
    public String returnDate;

    // Constructors, getters, setters
    public RentRequestDTO(Long bookId, Long userId, String returnDate) {
        this.bookId = bookId;
        this.userId = userId;
        this.returnDate = returnDate;
    }
}
