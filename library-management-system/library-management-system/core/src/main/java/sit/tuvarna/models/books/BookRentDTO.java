package sit.tuvarna.models.books;

public class BookRentDTO {
    public Long id;
    public String name;

    public BookRentDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
