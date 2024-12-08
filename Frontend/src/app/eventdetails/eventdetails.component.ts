import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { RouterModule } from '@angular/router';
import { event } from '../models/event.model'; // Ensure the correct naming convention for the model
import { EventService } from '../services/event/event.service';
import { ActivatedRoute } from '@angular/router';
import { Participation } from '../models/Participation.model';
import { RegistrationService } from '../services/paticipation/registration.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-eventdetails',
  standalone: true,
  imports: [NavbarAdminComponent, RouterModule, CommonModule],
  templateUrl: './eventdetails.component.html',
  styleUrls: ['./eventdetails.component.css'] // Corrected "styleUrl" to "styleUrls"
})
export class EventdetailsComponent implements OnInit {

  eventId: string | null = null; // Allow eventId to be null initially
  Event?: event ; // Use correct capitalization and consistent naming
  curr_users!: Participation[];
  Owner? : User;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,private registrationService:RegistrationService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) { // Ensure eventId is not null
      this.eventService.getEvent(this.eventId).subscribe({
        next: (data) => {
          this.Event = data;
          this.Owner = this.Event?.owner;
          console.log("hhhelo",this.Owner);

        },
        error: (err) => {
          console.error("Error fetching event: ", err);
        }
      });

      this.registrationService.getRegistratedUsers(this.eventId).subscribe({
        next:(res)=>{
          this.curr_users = res;
          console.log(res);
        },
        error:(err)=>{
          console.log("error getting registrated users ",err);

        }
      })




    } else {
      console.error("No event ID found in route parameters.");
    }

  }
}
