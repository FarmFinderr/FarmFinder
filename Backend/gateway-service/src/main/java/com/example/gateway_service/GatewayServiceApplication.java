package com.example.gateway_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.ReactiveDiscoveryClient;
import org.springframework.cloud.gateway.discovery.DiscoveryClientRouteDefinitionLocator;
import org.springframework.cloud.gateway.discovery.DiscoveryLocatorProperties;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin
public class GatewayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayServiceApplication.class, args);
	}


	/*@Bean
	DiscoveryClientRouteDefinitionLocator dynamicRoutes(ReactiveDiscoveryClient rdc,DiscoveryLocatorProperties dlp) {
		//return new DiscoveryClientRouteDefinitionLocator(rdc,dlp);
	}*/

	@Bean
	RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {

		return builder.routes()
				.route("r1", r -> r.path("/users/**").uri("http://localhost:8083/"))
				//.route("r2", r -> r.path("/events/**").uri("http://localhost:8081/"))
				.route("r3", r -> r.path("/posts/**").uri("http://localhost:5000/"))
				.route("r4", r -> r.path("/chats/**").uri("http://localhost:8081/"))
				.build();

		/*return builder.routes()
				.route("r1", r -> r.path("/customers/**").uri("lb://TP3CUSTOMER-SERVICE"))
				.route("r2", r -> r.path("/products/**").uri("lb://POSTS-SERVICE"))
				.build();*/

	/*@Bean
	DiscoveryClientRouteDefinitionLocator dynamicRoutes(ReactiveDiscoveryClient rdc, DiscoveryLocatorProperties dlp) {
		return new DiscoveryClientRouteDefinitionLocator(rdc,dlp);
	}*/


	}
	}





