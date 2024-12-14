import { KeycloakService } from './services/keycloak/keycloak.service';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),
               provideRouter(routes)/*,
               {provide: APP_INITIALIZER,
                deps:[KeycloakService],
                useFactory:ksFactory,
                multi:true},*/
               ],
               
};

/*export function ksFactory(ksService :KeycloakService){
  return()=> ksService.init();
}*/