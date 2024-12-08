import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { RouterModule } from '@angular/router';
import { event } from '../models/event.model';
import { EventService } from '../services/event/event.service';

@Component({
  selector: 'app-events-admin',
  standalone: true,
  imports: [NavbarAdminComponent, RouterModule, CommonModule],  // Include CommonModule here
  templateUrl: './events-admin.component.html',
  styleUrls: ['./events-admin.component.css']
})
export class EventsAdminComponent implements OnInit {
  events: event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadevents();
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
