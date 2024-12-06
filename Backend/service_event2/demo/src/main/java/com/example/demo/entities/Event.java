package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean status;
    @Column(name="description",length=99999999)
    private String description;
    private String title  ;
    private Long price;
    private Long owner_id;
    private Date date_debut ;
    @Column(name="photo",length=99999999)
    private String photo;

    public Event(boolean b, String description, String title, Long price, Long ownerId, Date dateDebut, String photo, Date dateFin) {
        this.status = b;
        this.description = description;
        this.title = title;
        this.price =  price;
        this.owner_id = ownerId;
        this.date_debut = dateDebut;
        this.photo = photo;
        this.date_fin=dateFin;
    }

    public Long getOwner_id() {
        return owner_id;
    }

    public void setOwner_id(Long owner_id) {
        this.owner_id = owner_id;
    }

    private Date date_fin;

    @Transient
    private User owner;
    @Transient
    private List<User> users;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }




}
