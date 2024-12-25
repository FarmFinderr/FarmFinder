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

	public Participation(Long id, Long price, String person_id, Event event, User user) {
		super();
		this.id = id;
		this.price = price;
		this.person_id = person_id;
		this.event = event;
		this.user = user;
	}

	public Participation() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPrice() {
		return price;
	}

	public void setPrice(Long price) {
		this.price = price;
	}

	public String getPerson_id() {
		return person_id;
	}

	public void setPerson_id(String person_id) {
		this.person_id = person_id;
	}

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
    
    

}