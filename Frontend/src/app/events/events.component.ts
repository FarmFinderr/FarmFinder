import { Component,OnInit } from '@angular/core';
import { NavbarComponent } from '../accueil/navbar/navbar.component';
import { CommonModule, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { event } from '../models/event.model';
import { EventService } from '../services/event/event.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [NavbarComponent, CommonModule, CurrencyPipe,
    NgForOf,
    NgIf,
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {

  annonces: event[] = [];
  constructor(private eventService:EventService) {

  }

  ngOnInit(): void {
    this.eventService.getPosts().subscribe({
      next:(data) => {
        this.annonces = data;
       // console.log("this data ",data);

      },
      error:(err) =>{
            console.log("error : ",err);
      }
    })
  }
}

