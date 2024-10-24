package com.example.Back_End.entities;

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

    @ManyToOne
    @JsonProperty(access =JsonProperty.Access.WRITE_ONLY)
    private Publication publication;

}
