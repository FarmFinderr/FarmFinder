package com.example.Back_End.entities;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Materiel extends Publication {
    private Long materiel_id;
    private String materiel_name;
    private String materiel_etat;
    private String materiel_defauts;

}
