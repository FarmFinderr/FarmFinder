import { Injectable } from '@angular/core';
import keycloak from 'keycloak-js'

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: keycloak | undefined;
  constructor() { }
  get keycloak(){
    if(!this._keycloak){
      this._keycloak= new keycloak({

        url:'http://localhost:8080/',
        realm:'FarmFinder',
        clientId:'AngularFrontEnd'

      }
      );

    }
    return this._keycloak;

  }
  async init(){
    console.log("authenticated the userr ");
    const authenticated = await this.keycloak?.init({
      onLoad:'login-required'

    });
    if(authenticated){
      console.log("succces")
    }

  }
}
