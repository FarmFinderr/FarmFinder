package com.example.demo.repositories;


import com.example.demo.entities.Participation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipationRepository extends JpaRepository<Participation,Long> {
    Participation findByPersonIdAndEventId(Long personId, Long eventId);
}
