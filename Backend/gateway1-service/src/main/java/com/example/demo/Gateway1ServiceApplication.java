package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication

public class Gateway1ServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(Gateway1ServiceApplication.class, args);
	}
	@Bean
	RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {

		return builder.routes()
				.route("r1", r -> r.path("/users/**").uri("http://localhost:8083/"))
				.route("r2", r -> r.path("/events/**").uri("http://localhost:8081/"))
				.route("r3", r -> r.path("/posts/**").uri("http://localhost:5000/"))
				.build();
		}

}