package com.example.demo.repositories;


import com.example.demo.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository   extends JpaRepository<Event,Long> {

}
