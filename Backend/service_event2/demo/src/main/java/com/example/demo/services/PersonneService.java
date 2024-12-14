package com.example.demo.services;


import com.example.demo.entities.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name ="USER-SERVICE",url="http://localhost:8880")
public interface PersonneService {

    @GetMapping("/users/{id}")
    User findCustomerById(@PathVariable("id") Long id);
}
