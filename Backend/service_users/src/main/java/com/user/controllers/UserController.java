package com.user.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.user.entities.User;
import com.user.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository repository;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return repository.save(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return repository.findAll();
    }

   
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = repository.findById(id);
        return user.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return repository.findById(id)
                .map(existingUser -> {
                    existingUser.setNom(updatedUser.getNom());
                    existingUser.setPrenom(updatedUser.getPrenom());
                    existingUser.setAge(updatedUser.getAge());
                    existingUser.setSexe(updatedUser.isSexe());
                    existingUser.setAddresse(updatedUser.getAddresse());
                    existingUser.setEmail(updatedUser.getEmail());
                    existingUser.setPhoto(updatedUser.getPhoto());
                    existingUser.setRole(updatedUser.getRole());
                    User savedUser = repository.save(existingUser);
                    return ResponseEntity.ok(savedUser);
                })
                .orElse(ResponseEntity.notFound().build());
    }

   
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
