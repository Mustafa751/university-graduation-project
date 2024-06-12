package sit.tuvarna.core.models.rental;

public class RentRequestDTO {
    public Long bookId;
    public Long userId;
    public String rentalStartDate;
    public String returnDate;

    // Constructors, getters, setters
    public RentRequestDTO(Long bookId, Long userId, String rentalStartDate, String returnDate) {
        this.bookId = bookId;
        this.userId = userId;
        this.rentalStartDate = rentalStartDate;
        this.returnDate = returnDate;
    }

    // Getters and setters
    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getRentalStartDate() {
        return rentalStartDate;
    }

    public void setRentalStartDate(String rentalStartDate) {
        this.rentalStartDate = rentalStartDate;
    }

    public String getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(String returnDate) {
        this.returnDate = returnDate;
    }
}
