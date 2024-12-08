package com.example.demo.repositories;


import com.example.demo.entities.Participation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {
    List<Participation> findAllByEventId(Long eventId);
}

