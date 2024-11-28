package com.example.demo.services;


import com.example.demo.entities.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name ="GATEWAY-SERVICE")
public interface PersonneService {

    @GetMapping("/users/{id}")
    User findCustomerById(@PathVariable("id") Long id);
}
