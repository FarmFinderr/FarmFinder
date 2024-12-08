import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import  { DashboardAdmin } from './dashboard-admin/dashboard-admin.component'
import {NavbarAdminComponent} from  './navbar-admin/navbar-admin.component'
import { DashboardReclamationComponent } from '../app/dashboard-admin/dashboard-reclamation/dashboard-reclamation.component';
import {TableDashboard} from './table-dashboard/table-dashboard.component'
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EventsComponent } from './events/events.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, FormsModule,HomeComponent, NavbarComponent,DashboardAdmin,NavbarAdminComponent,TableDashboard,SignInComponent,EventsComponent, SignUpComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FarmFinder';
}
