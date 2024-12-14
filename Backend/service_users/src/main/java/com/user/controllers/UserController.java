package com.user.controllers;

import com.user.keycloak.keycloakusersserviceImp;
import org.keycloak.representations.AccessTokenResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import com.user.entities.User;
import com.user.repository.UserRepository;
import com.user.services.FileStorageService;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository repository;
    @Autowired
    private FileStorageService fileStorageService;
    @Autowired
    private keycloakusersserviceImp keycloakservice;


    public User createUserInKeycloak(User user) {
        return keycloakservice.createUser(user);
    }

    @PostMapping("/login")
    public AccessTokenResponse login(@RequestParam String username, @RequestParam String password) {
        return keycloakservice.login(username, password);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createUser(

            @RequestParam("name") String name,
            @RequestParam("lastName") String lastName,
            @RequestParam("emailAddress") String emailAddress,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam("password") String password,
            @RequestParam("date") String date,
            @RequestParam("address") String address,
            @RequestParam("sexe") String sexe, // Add sexe here
            @RequestParam(value = "photo", required = false) MultipartFile photo
    ) {
        try {
            User user = new User();
            user.setName(name);
            user.setLastName(lastName);
            user.setEmailAddress(emailAddress);
            user.setPhoneNumber(phoneNumber);
            user.setPassword(password);
            user.setDate(Date.valueOf(date)); // Convert the date string to Date type
            user.setAddress(address);
            user.setSexe(sexe);
            User newuserkeycloak=new User();
            newuserkeycloak=createUserInKeycloak(user);
            user.setId(newuserkeycloak.getId());
            repository.save(user);
            return ResponseEntity.ok("User created successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error creating user: " + e.getMessage());
        }
    }



    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = repository.findAll();
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(
            @RequestParam(required = false, defaultValue = "") String search) {
        List<User> users;

        if (search.isEmpty() ) {
            // Return all users if search and userId are not provided
            users = repository.findAll();
        } else {
            // Perform search based on parameters
            users = repository.searchUsers(search);
        }

        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }

    

    /*public List<User> getAllUsers() {
        return repository.findAll();}*/
    // Retrieve a user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        Optional<User> user = repository.findById(id);
        return user.map(ResponseEntity::ok)
                   
                   .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Update an existing user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User updatedUser) {
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
                    existingUser.setSexe(updatedUser.isSexe()); 
                    existingUser.setAddress(updatedUser.getAddress());
                    existingUser.setEmailAddress(updatedUser.getEmailAddress());
                    existingUser.setPhoto(updatedUser.getPhoto());
                    existingUser.setRole(updatedUser.getRole());
                    existingUser.setPassword(updatedUser.getPassword());

                    User savedUser = repository.save(existingUser); // Save updated user
                    return ResponseEntity.ok(savedUser);
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    // Delete a user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        
    }
    
}
   
}