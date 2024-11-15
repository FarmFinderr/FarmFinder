package com.example.demo.services;


import com.example.demo.entities.Personne;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="PERSONNE-SERVICE")
public interface PersonneService {
    @GetMapping("/personnes/{id}")
    public Personne findCustomerById(@PathVariable(name="id")Long id) ;
}
