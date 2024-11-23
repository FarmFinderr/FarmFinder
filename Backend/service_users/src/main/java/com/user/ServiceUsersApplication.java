package com.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.user.entities.User;
import com.user.repository.UserRepository;

import java.sql.Date; 

@SpringBootApplication
public class ServiceUsersApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceUsersApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(UserRepository repository) {
        return args -> {
            repository.save(new User(null, "Jean", "Dupont", "123456789", Date.valueOf("1990-01-15"), true, 
                "123 Rue Principale", "jean.dupont@example.com", "photo1.jpg", 1, "password123"));
            repository.save(new User(null, "Marie", "Martin", "987654321", Date.valueOf("1998-03-22"), false, 
                "456 Avenue des Champs", "marie.martin@example.com", "photo2.jpg", 2, "password456"));
            repository.save(new User(null, "John", "Doe", "456123789", Date.valueOf("1995-07-10"), true, 
                "789 Boulevard Central", "john.doe@example.com", "photo3.jpg", 1, "password789"));
        };
    }
}
