package com.example.demo.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Personne {
    private Long id ;
    private String nom ;
    private String prenom ;
    private int age   ;
    private Boolean  sexe ;
    private String addresse;
    private String Email  ;
    private String photo ;
    private int role ;
}
