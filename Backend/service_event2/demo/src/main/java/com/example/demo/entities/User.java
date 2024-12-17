package com.example.demo.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {
    private Long id;
    private String name;
    private String lastName;
    private String phoneNumber;
    private Date date;
    private int sexe;
    private String address;
    private String emailAddress;
    private String photo;
    private int role;
    private String password;


}
