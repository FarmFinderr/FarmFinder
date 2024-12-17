package com.user.security;

import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.keycloak.admin.client.Keycloak;

@Configuration
public class beans {
    @Bean
    public Keycloak keycloak(){
        return KeycloakBuilder.builder()
                .serverUrl("http://localhost:8080")
                .realm("FarmFinder")
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .clientId("admin-cli")
                .username("admin")
                .password("123")
                .clientSecret("Kcs0uaQIIRW9tUJnzbW5iQlozTRdsXlo")
                .build();
    }



}
