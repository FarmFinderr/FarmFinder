package com.example.demo.entities;

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
public class Participation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long price;
    private Long person_id;
    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    public Participation(Long price,Long person_id, Event event)
    {
        this.price= price;
        this.person_id = person_id;
        this.event = event;
    }
    @Transient
    private User user;
}