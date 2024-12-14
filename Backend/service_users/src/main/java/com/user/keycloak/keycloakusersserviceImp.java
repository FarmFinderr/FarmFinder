package com.user.keycloak;

import com.user.entities.User;
import jakarta.ws.rs.core.Response;
import com.user.security.beans.*;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.core.Response;


import java.util.*;

@Service
@Slf4j
public class keycloakusersserviceImp implements  keycloakuserservices{

    @Autowired
    private Keycloak keycloak;
    @Override
    public User createUser(User user) {
        UserRepresentation newuser = new UserRepresentation();
        newuser.setEnabled(true);
        newuser.setLastName(user.getLastName());
        newuser.setUsername(user.getName());
        newuser.setFirstName(user.getName());
        newuser.setEmail(user.getEmailAddress());

        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setValue(user.getPassword());
        credentialRepresentation.setTemporary(false);
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);

        newuser.setCredentials(List.of(credentialRepresentation));


        RealmResource realmResource = keycloak.realm("FarmFinder");
        UsersResource usersResource = realmResource.users();
        var response = usersResource.create(newuser);

        if (response.getStatus() == 201) {
            return user;
        } else {
            throw new RuntimeException("Failed to create user: " + response.getStatusInfo());
        }
    }
}
