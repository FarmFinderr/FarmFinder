import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardAdmin } from './dashboard-admin/dashboard-admin.component'
import { AccueilComponent } from './accueil/accueil.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TableDashboard } from './table-dashboard/table-dashboard.component'
import { OffresComponent } from './offres/offres.component';
import { EventsComponent } from './events/events.component';
import { DashboardReclamationComponent } from './dashboard-admin/dashboard-reclamation/dashboard-reclamation.component';

import { EventsAdminComponent } from './events-admin/events-admin.component';
import { EventdetailsComponent } from './eventdetails/eventdetails.component';



export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'accueil', component: AccueilComponent },

  { path: 'dashboard', component: DashboardAdmin },
  {path:'ReclamationDashboard', component:DashboardReclamationComponent},
  
  { path: 'tableusers', component: TableDashboard },
  { path: 'offres', component: OffresComponent },
  { path: 'events', component: EventsComponent },
  { path: 'events-admin', component: EventsAdminComponent },
  { path: 'event_details/:id', component: EventdetailsComponent },

];





