import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import  { DashboardAdmin } from './dashboard-admin/dashboard-admin.component'

export const routes: Routes = [
    { path: '', component: DashboardAdmin}
    
  ];

  

@NgModule({
  
})
export class AppRoutingModule { }
