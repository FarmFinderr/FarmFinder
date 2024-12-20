package com.user.keycloak;

import com.user.entities.User;
import jakarta.ws.rs.core.Response;
import com.user.security.beans.*;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class keycloakusersserviceImp implements  keycloakuserservices{

    @Autowired
    private Keycloak keycloak;

    private static final String SERVER_URL = "http://localhost:8050";
    private static final String REALM = "FarmFinder";
    private static final String CLIENT_ID = "admin-cli";
    private static final String CLIENT_SECRET = "mwJSVcHdDVxaXcOcnUdqXEP9g0j4jUBJ";
    @Override
    public User createUser(User user) {
        /*log.info("Starting user creation for: {}", user.getEmailAddress());*/
        UserRepresentation newUser = new UserRepresentation();
        newUser.setEnabled(true);
        newUser.setLastName(user.getLastName());
        newUser.setUsername(user.getName());
        newUser.setFirstName(user.getName());
        newUser.setEmail(user.getEmailAddress());

        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setValue(user.getPassword());
        credentialRepresentation.setTemporary(false);
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);

        newUser.setCredentials(List.of(credentialRepresentation));

        RealmResource realmResource = keycloak.realm(REALM);
        UsersResource usersResource = realmResource.users();

        var response = usersResource.create(newUser);
        if (response.getStatus() == 201) {
            String locationHeader = response.getHeaderString("Location");
            if (locationHeader != null) {
                String userId = locationHeader.substring(locationHeader.lastIndexOf('/') + 1);
                user.setId(userId);
                /*log.info("User created successfully with ID: {}", userId);*/
                var roleRepresentation = realmResource.roles().get("user").toRepresentation();
                usersResource.get(userId).roles().realmLevel().add(Collections.singletonList(roleRepresentation));
                /*log.info("Role 'user' assigned to user: {}", userId);*/
            }
            return user;
        } else {
            /*log.error("Failed to create user. Status: {}, Reason: {}", response.getStatus(), response.getStatusInfo());*/
            throw new RuntimeException("Failed to create user: " + response.getStatusInfo());
        }
    }

    @Override
    public AccessTokenResponse login(String username, String password) {
        try {
            /*log.info("Attempting to login user: {}", username);*/
            Keycloak keycloakLogin = KeycloakBuilder.builder()
                    .serverUrl(SERVER_URL)
                    .realm(REALM)
                    .clientId(CLIENT_ID)
                    .clientSecret(CLIENT_SECRET)
                    .username(username)
                    .password(password)
                    .grantType("password")
                    .build();

            AccessTokenResponse token = keycloakLogin.tokenManager().getAccessToken();
            /*log.info("User logged in successfully:{}", username);*/
            return token;
        } catch (Exception e) {
            /*log.error("Failed to login user: {}", username, e);*/
            throw new RuntimeException("Failed to login: " + e.getMessage(), e);
        }
    }


}
