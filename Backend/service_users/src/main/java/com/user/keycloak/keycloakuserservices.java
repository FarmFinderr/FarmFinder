package com.user.keycloak;

import com.user.entities.User;
import org.keycloak.representations.AccessTokenResponse;

public interface keycloakuserservices {

    User createUser(User user);
    AccessTokenResponse login(String username, String password);


}
