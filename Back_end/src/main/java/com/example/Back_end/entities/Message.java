package com.example.Back_end.entities;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    public String getContenue() {
        return contenue;
    }

    public void setContenue(String contenue) {
        this.contenue = contenue;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Personne getReceiver() {
        return receiver;
    }

    public void setReceiver(Personne receiver) {
        this.receiver = receiver;
    }

    public Personne getSender() {
        return sender;
    }

    public void setSender(Personne sender) {
        this.sender = sender;
    }

    private String  contenue;

    @OneToOne
    @JsonProperty(access =JsonProperty.Access.WRITE_ONLY)
    private Personne sender  ;
    @OneToOne
    @JsonProperty(access =JsonProperty.Access.WRITE_ONLY)
    private Personne  receiver ;

}
