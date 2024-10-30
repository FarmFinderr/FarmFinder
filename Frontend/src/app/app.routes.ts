import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccueilComponent } from './accueil/accueil.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'accueil', component: AccueilComponent }
];
