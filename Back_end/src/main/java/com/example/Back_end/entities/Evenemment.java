package com.example.Back_end.entities;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Evenemment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private bool status;
    private Long price;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Personne getP() {
        return p;
    }

    public void setP(Personne p) {
        this.p = p;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public bool getStatus() {
        return status;
    }

    public void setStatus(bool status) {
        this.status = status;
    }

    @ManyToOne
    @JsonProperty(access =JsonProperty.Access.WRITE_ONLY)
    private Personne p ;

}
