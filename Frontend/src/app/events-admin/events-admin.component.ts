import { UserService } from './../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { RouterModule } from '@angular/router';
import { event } from '../models/event.model';
import { EventService } from '../services/event/event.service';
import {NavbarComponent} from '../accueil/navbar/navbar.component'

@Component({
  selector: 'app-events-admin',
  standalone: true,
  imports: [NavbarAdminComponent, RouterModule, CommonModule,NavbarComponent],  // Include CommonModule here
  templateUrl: './events-admin.component.html',
  styleUrls: ['./events-admin.component.css']
})
export class EventsAdminComponent implements OnInit {
  events: event[] = [];
  user: any = null;
  userId: string = '';
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private eventService: EventService,private UserService:UserService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') ?? '';
    console.log('UserId:', this.userId);
    this.getuser(this.userId);
    this.loadevents();
  }

  getuser(userId:string):void{
    this.user=this.UserService.getUser(userId);

    this.UserService.getUser(userId).subscribe({
      next: (data) => {
        console.log('Fetched user:', data)
        this.user = data;
        console.log('user act',this.user);
        this.isLoading = false; 
      },
      error: (err) => {
        console.error('Error fetching user:', err);  
        this.errorMessage = 'Failed to load user';  
        this.isLoading = false;  
      },
    });

  }

  loadevents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (err) => {
        console.log("Error: ", err);
      }
    });
  }
}
