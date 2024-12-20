package com.example.demo.repositories;


import com.example.demo.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventRepository   extends JpaRepository<Event,Long> {
    @Query("SELECT e FROM Event e WHERE e.title LIKE %?1% OR e.description LIKE %?1%")
    List<Event> findByTitleOrDescriptionContaining(String pattern);
}