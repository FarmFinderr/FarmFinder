package com.example.Back_end.entities;



@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Reclamation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String message ;
    @OneToOne
    @JsonProperty(access =JsonProperty.Access.WRITE_ONLY)
    private Personne sender  ;
    @OneToOne
    @JsonProperty(access =JsonProperty.Access.WRITE_ONLY)
    private Personne  receiver ;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Personne getSender() {
        return sender;
    }

    public void setSender(Personne sender) {
        this.sender = sender;
    }

    public Personne getReceiver() {
        return receiver;
    }

    public void setReceiver(Personne receiver) {
        this.receiver = receiver;
    }
}
