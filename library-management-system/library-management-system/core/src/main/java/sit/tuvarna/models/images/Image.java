package sit.tuvarna.models.images;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Base64;

@Entity
public class Image extends PanacheEntity {
    @Column(name = "data", columnDefinition = "bytea")
    private byte[] data;

    public Image() {
    }

    public Image(byte[] data) {
        this.data = data;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getBase64Data() {
        return Base64.getEncoder().encodeToString(data);
    }
}