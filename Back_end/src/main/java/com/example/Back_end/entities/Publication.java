package com.example.Back_End.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Publication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID_pub;
    private Date publication_date;
    private String description;
    private double price;

    @OneToMany(mappedBy = "publication")
    private List<Commentaire>  commentaire;

    @OneToMany(mappedBy = "publication")
    private List<Image> images;

    @OneToMany(mappedBy = "publication")
    private List<Reaction> reactions ;

    @OneToMany(mappedBy = "publication")
    private List<Video> videos ;




}
