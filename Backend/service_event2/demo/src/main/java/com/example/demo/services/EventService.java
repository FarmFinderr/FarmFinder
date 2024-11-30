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
@CrossOrigin(origins = "http://localhost:4200")
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
        return  e ;
    }
    @GetMapping("/Event/{id}")
    public Event GetEvent (@PathVariable(name="id") Long id)
    {
        Event  event =  eventRepository.findById(id).orElse(null);
        User p = personneService.findCustomerById(event.getOwner_id());
        event.setOwner(p);
        return  event;
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
        if (newEvent != null) {
            return ResponseEntity.ok(newEvent);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/EventResgistration/")
    public Participation EventRegistration(@RequestBody Participation p )
    {
        User Registrated_User = personneService.findCustomerById(p.getPerson_id());
        p.setUser(Registrated_User);
        participationRepository.save(p);
        return  p ;
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



}
