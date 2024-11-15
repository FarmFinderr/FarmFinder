package com.example.demo.services;


import com.example.demo.entities.Event;
import com.example.demo.entities.Participation;
import com.example.demo.entities.Personne;
import com.example.demo.repositories.EventRepository;
import com.example.demo.repositories.ParticipationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.lang.Math.max;

@RestController
public class EventService {

    @Autowired
    private PersonneService personneService ;
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private ParticipationRepository participationRepository;


    @GetMapping("/Event/{id}")
    public Event GetEvent (@PathVariable(name="id") Long id)
    {
        Event  event =  eventRepository.findById(id).orElse(null);
        Personne p = personneService.findCustomerById(event.getOwner_id());
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
    public Event RegisterEventUser(@RequestBody Event event)
    {
        return eventRepository.save(event);
    }
    @PostMapping("/EventResgistration/")
    public Participation EventRegistration(@RequestBody Participation p )
    {
        Personne Registrated_User = personneService.findCustomerById(p.getPerson_id());
        p.setPersonne(Registrated_User);
        participationRepository.save(p);
        return  p ;
    }
    @@PutMapping("/UpdateBiding ")
    public Participation BiddingUpdate(@RequestParam Participation p )
    {
        Participation ex =  participationRepository.findByPersonIdAndEventId(p.getPerson_id(),p.getEvent().getId());
        ex.setPrice(p.getPrice());
        participationRepository.save(ex);
        return  ex ;
    }


}
