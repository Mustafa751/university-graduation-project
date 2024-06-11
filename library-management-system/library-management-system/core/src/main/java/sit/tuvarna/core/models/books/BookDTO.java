package sit.tuvarna.core.models.books;

import java.util.Base64;

public class BookDTO {
    public Long id;
    public String name;
    public int quantity;
    public String mainImage;
    public String price;
    public String knowledgeArea;
    public String language;

    public BookDTO(Long id, String name, int quantity, String mainImage, String price, String knowledgeArea, String language) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.mainImage = mainImage;
        this.price = price;
        this.knowledgeArea = knowledgeArea;
        this.language = language;
    }

    public static BookDTO fromBook(Book book) {
        String base64Image = book.mainImage != null ? Base64.getEncoder().encodeToString(book.mainImage) : null;
        String price = book.getPrice();
        String knowledgeArea = book.getKnowledgeArea().toString();
        String language = book.getLanguage();

        return new BookDTO(book.id, book.name, book.quantity, base64Image, price, knowledgeArea, language);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getMainImage() {
        return mainImage;
    }

    public void setMainImage(String mainImage) {
        this.mainImage = mainImage;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getKnowledgeArea() {
        return knowledgeArea;
    }

    public void setKnowledgeArea(String knowledgeArea) {
        this.knowledgeArea = knowledgeArea;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
