import { Component,OnInit } from '@angular/core';
import { NavbarComponent } from '../accueil/navbar/navbar.component';
import { CommonModule, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { event } from '../models/event.model';
import { EventService } from '../services/event/event.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-events',
  standalone: true,
  imports: [NavbarComponent, CommonModule, CurrencyPipe,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {

  event_created={status:false,description:"",title:"",price:0,
    photo:"",date_debut:'',date_fin:'',owner_id:1,owners:'',users:[]
  } ;
  annonces: event[] = [];
  constructor(private eventService:EventService) {

  }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next:(data) => {
        this.annonces = data;

      },
      error:(err) =>{
            console.log("error : ",err);
      }
    })
  }
  onFileChanged(event: any) {
    const file = event.target.files[0];
    this.event_created.photo =file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.event_created.photo = reader.result as string;
    };

  }
  CreateEvent(): void {

  const formData = new FormData();
    formData.append("photo", this.event_created.photo.toString()); // Either the base64 or the file
    formData.append("title", this.event_created.title);
    formData.append("description", this.event_created.description);
    formData.append("price", this.event_created.price.toString());
    formData.append("date_debut", this.event_created.date_debut);
    formData.append("date_fin", this.event_created.date_fin);
    formData.append("owner_id","1");
    formData.forEach((value, key) => {
      console.log(key + ": " + value);
    });
    this.eventService.addEvent(formData).subscribe({
      next: (response) => {
        console.log("Event created successfully:", response);
      },
      error: (error) => {
        console.error("Error creating event:", error);
      },
    });
  }
}

