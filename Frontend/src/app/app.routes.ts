import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import  { DashboardAdmin } from './dashboard-admin/dashboard-admin.component'
import { AccueilComponent } from './accueil/accueil.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TableDashboard} from  './table-dashboard/table-dashboard.component'


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'accueil', component: AccueilComponent },
   { path: '', component: DashboardAdmin},
   {path:'tableusers',component:TableDashboard}

  ];






