package sit.tuvarna.models.users;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import sit.tuvarna.models.books.Book;
import sit.tuvarna.models.roles.Roles;

import java.util.List;

@Entity
@Table(name = "user_to_be_created")
public class UserToBeCreated extends PanacheEntity {
    @Column(unique = true)
    private String fakNumber;

    private String egn;

    private String email;

    private String phoneNumber;

    public String getFakNumber() {
        return fakNumber;
    }

    public void setFakNumber(String fakNumber) {
        this.fakNumber = fakNumber;
    }

    public String getEgn() {
        return egn;
    }

    public void setEgn(String egn) {
        this.egn = egn;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

}