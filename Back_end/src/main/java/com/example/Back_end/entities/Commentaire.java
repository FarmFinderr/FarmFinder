package com.example.Back_end.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Commentaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID_com;
    private String Contenue;

    public String getContenue() {
        return Contenue;
    }

    public void setContenue(String contenue) {
        Contenue = contenue;
    }

    public Long getID_com() {
        return ID_com;
    }

    public void setID_com(Long ID_com) {
        this.ID_com = ID_com;
    }

    public Publication getPublication() {
        return publication;
    }

    public void setPublication(Publication publication) {
        this.publication = publication;
    }

    @ManyToOne
    @JoinColumn(name = "ID_pub")
    @JsonProperty(access =JsonProperty.Access.WRITE_ONLY)
    private Publication publication;

}
