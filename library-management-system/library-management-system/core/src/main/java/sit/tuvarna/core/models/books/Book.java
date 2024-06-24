package sit.tuvarna.core.models.books;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import sit.tuvarna.core.models.enums.BookKnowledgeArea;
import sit.tuvarna.core.models.enums.BookTopic;
import sit.tuvarna.core.models.images.Image;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Book extends PanacheEntity {

    // Existing fields and annotations
    public String name;
    public int quantity;
    public String isbn;
    public String author;
    @Temporal(TemporalType.DATE)
    public Date productionDate;
    @Column(length = 2000)
    public String description;
    @Column(name = "data", columnDefinition = "bytea")
    public byte[] mainImage;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    public List<Image> images;

    public String inventoryNumber; // New field
    public String signature; // New field
    // New fields
    public String subtitle;
    public String parallelTitle;
    public String edition;
    public String placeOfPublication;
    public String publisher;
    public String language;
    public String sourceTitle;
    public String volume;
    public String issueNumber;
    public String pages;
    public String publicationYear;
    @Column(length = 5000)
    public String notes;
    public String price;
    public String keywords;
    public String classificationIndex;
    @Enumerated(EnumType.STRING)
    private BookKnowledgeArea knowledgeArea;

    @Enumerated(EnumType.STRING)
    private BookKnowledgeArea documentType;

    @Enumerated(EnumType.STRING)
    private BookTopic topic; // New field

    public String locationInLibrary; // New field

    // Constructors
    public Book() {
        this.images = new ArrayList<>();
    }

    // Setters for all fields
    public void setName(String name) {
        this.name = name;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setProductionDate(Date productionDate) {
        this.productionDate = productionDate;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setMainImage(byte[] mainImage) {
        this.mainImage = mainImage;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public void addImage(Image image) {
        this.images.add(image);
    }

    // New setters
    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public void setInventoryNumber(String inventoryNumber) {
        this.inventoryNumber = inventoryNumber;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public String getInventoryNumber() {
        return inventoryNumber;
    }

    public String getSignature() {
        return signature;
    }

    public void setParallelTitle(String parallelTitle) {
        this.parallelTitle = parallelTitle;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public void setPlaceOfPublication(String placeOfPublication) {
        this.placeOfPublication = placeOfPublication;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public void setSourceTitle(String sourceTitle) {
        this.sourceTitle = sourceTitle;
    }

    public void setVolume(String volume) {
        this.volume = volume;
    }

    public void setIssueNumber(String issueNumber) {
        this.issueNumber = issueNumber;
    }

    public void setPages(String pages) {
        this.pages = pages;
    }

    public void setPublicationYear(String publicationYear) {
        this.publicationYear = publicationYear;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public void setClassificationIndex(String classificationIndex) {
        this.classificationIndex = classificationIndex;
    }

    public void setKnowledgeArea(BookKnowledgeArea knowledgeArea) {
        this.knowledgeArea = knowledgeArea;
    }

    public void setDocumentType(BookKnowledgeArea documentType) {
        this.documentType = documentType;
    }

    public void setTopic(BookTopic topic) {
        this.topic = topic;
    }

    public void setLocationInLibrary(String locationInLibrary) {
        this.locationInLibrary = locationInLibrary;
    }

    // Getters for all fields
    public String getName() {
        return name;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getIsbn() {
        return isbn;
    }

    public String getAuthor() {
        return author;
    }

    public Date getProductionDate() {
        return productionDate;
    }

    public String getDescription() {
        return description;
    }

    public byte[] getMainImage() {
        return mainImage;
    }

    public List<Image> getImages() {
        return images;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public String getParallelTitle() {
        return parallelTitle;
    }

    public String getEdition() {
        return edition;
    }

    public String getPlaceOfPublication() {
        return placeOfPublication;
    }

    public String getPublisher() {
        return publisher;
    }

    public String getLanguage() {
        return language;
    }

    public String getSourceTitle() {
        return sourceTitle;
    }

    public String getVolume() {
        return volume;
    }

    public String getIssueNumber() {
        return issueNumber;
    }

    public String getPages() {
        return pages;
    }

    public String getPublicationYear() {
        return publicationYear;
    }

    public String getNotes() {
        return notes;
    }

    public String getPrice() {
        return price;
    }

    public String getKeywords() {
        return keywords;
    }

    public String getClassificationIndex() {
        return classificationIndex;
    }

    public BookKnowledgeArea getKnowledgeArea() {
        return knowledgeArea;
    }

    public BookKnowledgeArea getDocumentType() {
        return documentType;
    }

    public BookTopic getTopic() {
        return topic;
    }

    public String getLocationInLibrary() {
        return locationInLibrary;
    }
}
