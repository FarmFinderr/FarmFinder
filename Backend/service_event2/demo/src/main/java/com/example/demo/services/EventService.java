package com.example.demo.services;


import com.example.demo.entities.Event;
import com.example.demo.entities.Participation;
import com.example.demo.entities.User;
import com.example.demo.repositories.EventRepository;
import com.example.demo.repositories.ParticipationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static java.lang.Math.max;

@RestController
@RequestMapping("/events")
public class EventService {

    @Autowired
    private PersonneService personneService ;
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private ParticipationRepository participationRepository;

    @GetMapping("/GetAll")
    public List<Event> GetAllevents()
    {
        List<Event> e=  eventRepository.findAll();
        for(Event tmp :e)
        {
            User p = personneService.findCustomerById(tmp.getOwner_id());
            tmp.setOwner(p);
        }
        return  e ;
    }
    @GetMapping("/Event/{id}")
    public ResponseEntity<Event> GetEvent(@PathVariable(name = "id") Long id) {
        Event event = eventRepository.findById(id).orElse(null);

        if (event == null) {
            return ResponseEntity.notFound().build();
        }

        User owner = personneService.findCustomerById(event.getOwner_id());

        if (owner == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        event.setOwner(owner);
        return ResponseEntity.ok(event);
    }

    @GetMapping("/Event/max_price/")
    public Long GetMaxPrice()
    {
        List<Event> all_events =  eventRepository.findAll();
        Long mx = 0L;
        for(Event p :  all_events)
        {
            mx = max(mx,p.getPrice());
        }
        return mx ;
    }

    @PostMapping("/EventCreation/")
    public ResponseEntity<?> registerEventUser( @RequestParam("photo") String photo,
                                                @RequestParam("title") String title,
                                                @RequestParam("description") String description,
                                                @RequestParam("price") Long price,
                                                @RequestParam("date_debut")  @DateTimeFormat(pattern = "yyyy-MM-dd")Date dateDebut,
                                                @RequestParam("date_fin")  @DateTimeFormat(pattern = "yyyy-MM-dd")Date dateFin,
                                                @RequestParam("owner_id") String ownerId) {

        Event newEvent = new Event(false,description,title,price,ownerId,dateDebut,photo,dateFin);
        eventRepository.save(newEvent);
        User user =  personneService.findCustomerById(ownerId);

        if (newEvent != null) {
            return ResponseEntity.ok(newEvent);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/EventResgistration/")
    public ResponseEntity<?> EventRegistration(@RequestParam("price") Long price,
                                               @RequestParam("person_id") String person_id,  // Change Long to String
                                               @RequestParam("event_id") Long eventId) {
        try {
            User Registrated_User = personneService.findCustomerById(person_id);  // Use String here
            if (Registrated_User == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            Event event = eventRepository.findById(eventId).orElse(null);
            if (event == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
            }

            Participation p = new Participation(price, person_id, event);
            p.setEvent(event);
            p.setUser(Registrated_User);
            participationRepository.save(p);

            return ResponseEntity.ok(p);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }


    @GetMapping("/UsersRegistrated/{id}")
    public ResponseEntity<?> GetRegistratedUsers(@PathVariable(name="id") Long event_id)
    {
        List<Participation>p =  participationRepository.findAllByEventId(event_id);
        for(Participation tmp : p)
        {
            User user =  personneService.findCustomerById(tmp.getPerson_id());
            tmp.setUser(user);
        }
        if (p != null) {
            return ResponseEntity.ok(p);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/updateBidding")
    public ResponseEntity<Participation> biddingUpdate(@RequestBody Participation p) {

        List<Participation> potential = new ArrayList<Participation>();

        List<Participation>allParticipants    =  participationRepository.findAll();
        for(Participation ex : allParticipants)
        {
            if(ex.getPerson_id()== p.getPerson_id())
            {
                potential.add(ex);
            }
        }

        Participation ex = null;
        for(Participation f : potential)
        {
            if(ex.getEvent().getId() == p.getEvent().getId())
            {
                ex = f;
                break ;
            }
        }

        if (ex == null) {
            return ResponseEntity.notFound().build();
        }
        User user = personneService.findCustomerById(p.getPerson_id());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        ex.setPrice(p.getPrice());

        participationRepository.save(ex);

        return ResponseEntity.ok(ex);
    }

    @GetMapping("/totalEvents")
    public Long getTotalEvents() {
        return eventRepository.count();
    }




}