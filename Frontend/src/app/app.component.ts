import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import  { DashboardAdmin } from './dashboard-admin/dashboard-admin.component'
import {NavbarAdminComponent} from  './navbar-admin/navbar-admin.component'
import {TableDashboard} from './table-dashboard/table-dashboard.component'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NavbarComponent,DashboardAdmin,NavbarAdminComponent,TableDashboard],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
 
})
export class AppComponent {
  title = 'Frontend';
}
