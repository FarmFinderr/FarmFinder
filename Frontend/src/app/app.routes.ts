import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';


export const routes: Routes = [
    { path: '', component: HomeComponent}
    
  ];

  

@NgModule({
  
})
export class AppRoutingModule { }
