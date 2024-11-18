package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.example.entities.User;
import com.example.repository.UserRepository;


@SpringBootApplication
@EntityScan(basePackages = "com.example.demo.entities")
@EnableJpaRepositories(basePackages = "com.example.demo.repository")
public class UserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(UserRepository repository) {
        return args -> {
            repository.save(new User(null, "Dupont", "Jean", 30, true, "123 Rue Principale", "jean.dupont@example.com", "photo1.jpg", 1));
            repository.save(new User(null, "Martin", "Marie", 25, false, "456 Avenue des Champs", "marie.martin@example.com", "photo2.jpg", 2));
            repository.save(new User(null, "Doe", "John", 28, true, "789 Boulevard Central", "john.doe@example.com", "photo3.jpg", 1));
        };
    }
}
