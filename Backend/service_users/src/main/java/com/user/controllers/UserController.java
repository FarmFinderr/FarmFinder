package com.user.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import com.user.entities.User;
import com.user.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
//@CrossOrigin(origins = "http://localhost:4200")

public class UserController {

    @Autowired
    private UserRepository repository;


    @PostMapping
    
    public ResponseEntity<User> createUser(@RequestBody User user) {
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }
        User savedUser = repository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }


    @GetMapping
    
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = repository.findAll();
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }

    /*public List<User> getAllUsers() {
        return repository.findAll();}*/
    // Retrieve a user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = repository.findById(id);
        return user.map(ResponseEntity::ok)
                   
                   .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Update an existing user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        if (updatedUser == null) {
            return ResponseEntity.badRequest().build();
        }

        return repository.findById(id)
                .map(existingUser -> {
                    // Update fields
                    existingUser.setName(updatedUser.getName());
                    existingUser.setLastName(updatedUser.getLastName());
                    existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
                    existingUser.setDate(updatedUser.getDate()); 
                    existingUser.setDate(updatedUser.getDate());
                    existingUser.setSexe(updatedUser.isSexe());
                    existingUser.setAddress(updatedUser.getAddress());
                    existingUser.setEmailAddress(updatedUser.getEmailAddress());
                    existingUser.setPhoto(updatedUser.getPhoto());
                    existingUser.setRole(updatedUser.getRole());
                    existingUser.setPassword(updatedUser.getPassword());

                    User savedUser = repository.save(existingUser);
                    return ResponseEntity.ok(savedUser);
                })
                
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Delete a user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        
    }
}
    
}