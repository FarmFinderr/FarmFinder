package com.example.Back_end.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Collection;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Publication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID_pub;
    private Date publication_date;
    private String description;
    private double price;

    @OneToMany(mappedBy = "Publication")
    private Collection<Commentaire> commentaire;

    @OneToMany(mappedBy = "Publication")
    private Collection<Image> image;

    @OneToMany(mappedBy = "Publication")
    private Collection<Reaction> reaction;

    @OneToMany(mappedBy = "Publication")
    private Collection<Video> video;




}
