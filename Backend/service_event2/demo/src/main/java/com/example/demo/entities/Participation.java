package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Participation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long price;
    private String person_id;
    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    public Participation(Long price,String person_id, Event event)
    {
        this.price= price;
        this.person_id = person_id;
        this.event = event;
    }
    @Setter
    @Getter
    @Transient
    private User user;

}