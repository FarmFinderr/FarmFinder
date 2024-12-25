package com.example.demo.entities;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean status;

    @Column(name = "description", length = 99999999)
    private String description;

    private String title;
    private Long price;
    private String owner_id;
    private Date date_debut;

    @Column(name = "photo", length = 99999999)
    private String photo;

    private Date date_fin;

    @Transient
    private User owner;

    @Transient
    private List<User> users;

    // Default constructor
    public Event() {}

    // All-arguments constructor
    public Event(Long id, boolean status, String description, String title, Long price, String owner_id, Date date_debut, String photo, Date date_fin, User owner, List<User> users) {
        this.id = id;
        this.status = status;
        this.description = description;
        this.title = title;
        this.price = price;
        this.owner_id = owner_id;
        this.date_debut = date_debut;
        this.photo = photo;
        this.date_fin = date_fin;
        this.owner = owner;
        this.users = users;
    }

    // Partial constructor
    public Event(boolean status, String description, String title, Long price, String owner_id, Date date_debut, String photo, Date date_fin) {
        this.status = status;
        this.description = description;
        this.title = title;
        this.price = price;
        this.owner_id = owner_id;
        this.date_debut = date_debut;
        this.photo = photo;
        this.date_fin = date_fin;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getOwner_id() {
        return owner_id;
    }

    public void setOwner_id(String owner_id) {
        this.owner_id = owner_id;
    }

    public Date getDate_debut() {
        return date_debut;
    }

    public void setDate_debut(Date date_debut) {
        this.date_debut = date_debut;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Date getDate_fin() {
        return date_fin;
    }

    public void setDate_fin(Date date_fin) {
        this.date_fin = date_fin;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    // toString method
    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", status=" + status +
                ", description='" + description + '\'' +
                ", title='" + title + '\'' +
                ", price=" + price +
                ", owner_id='" + owner_id + '\'' +
                ", date_debut=" + date_debut +
                ", photo='" + photo + '\'' +
                ", date_fin=" + date_fin +
                ", owner=" + owner +
                ", users=" + users +
                '}';
    }
}