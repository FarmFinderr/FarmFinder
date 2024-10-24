package com.example.Back_end.entities;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Notification {
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContenue() {
        return contenue;
    }

    public void setContenue(String contenue) {
        this.contenue = contenue;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String contenue ;

}
