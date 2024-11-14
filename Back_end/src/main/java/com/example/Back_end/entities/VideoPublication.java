package com.example.Back_End.entities;

import com.example.Back_end.entities.Publication;
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
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID_vd;
    private String title;


    @ManyToOne
    @JoinColumn(name = "ID_pub")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
   private Publication publication;

}
