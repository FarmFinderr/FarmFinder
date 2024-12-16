import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../accueil/navbar/navbar.component';
import { CommonModule, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { event } from '../models/event.model';
import { EventService } from '../services/event/event.service';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user/user.service';
import { Participation } from '../models/Participation.model';
import { RegistrationService } from '../services/paticipation/registration.service';
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

  Owner!: User;

  curr_users!: Participation[];

  SelectedEvent: event = {
    id: -1,
    status: false,
    description: '',
    title: '',
    price: 0,
    owner_id: 0,
    photo: '',
    date_debut: '',
    date_fin: '',
    owner: this.Owner,
    users: [],
  }
  value  = 0 ;
  isModalOpenDetailsEvent:boolean=false;
  event_created = {
    status: false, description: "", title: "", price: 0,
    photo: "", date_debut: '', date_fin: '', owner_id: 1, owners: '', users: []
  };
  annonces: event[] = [];
  constructor(private eventService: EventService , private registrationService:RegistrationService , private userService:UserService) {

  }
  userId: string =''; 
  user:any=null;

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') ?? ''; 
    this.load_events();
    this.get_user(this.user);


  }
  get_user(id:string)
  {
    this.userService.getUser(id).subscribe({
      next:(res) =>{
        this.Owner = res;
        console.log(res);

      },
      error:(err)=>{
        console.log("error getting user",err);

      }
    })
  }

  openModelDetailsEvent(Ev:event):void
  {
    this.SelectedEvent = Ev;
    const formData =  new FormData();
    formData.append("event_id",Ev.id?.toString());
    this.registrationService.getRegistratedUsers(Ev.id).subscribe({
      next:(res)=>{
        this.curr_users = res;
        console.log(res);
      },
      error:(err)=>{
        console.log("error getting registrated users ",err);

      }
    })

    this.isModalOpenDetailsEvent= true;

  }
  closeModalDetailsEvent():void{
    this.isModalOpenDetailsEvent=false;
  }
  load_events() {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.annonces = data;

      },
      error: (err) => {
        console.log("error : ", err);
      }
    })
  }
  onFileChanged(event: any) {
    const file = event.target.files[0];
    this.event_created.photo = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.event_created.photo = reader.result as string;
    };

  }
  RegisterForEvent() {
    const formData = new FormData();

    formData.append("price", this.value.toString());
    formData.append("person_id", this.Owner.id.toString());
    formData.append("event_id", this.SelectedEvent.id.toString());

    this.registrationService.register(formData).subscribe({
        next: (response) => {
            console.log("Registration successful", response);
        },
        error: (err) => {
            console.error("Error during registration", err);
        }
    });
}


  CreateEvent(): void {

    const formData = new FormData();
    formData.append("photo", this.event_created.photo.toString()); // Either the base64 or the file
    formData.append("title", this.event_created.title);
    formData.append("description", this.event_created.description);
    formData.append("price", this.event_created.price.toString());
    formData.append("date_debut", this.event_created.date_debut);
    formData.append("date_fin", this.event_created.date_fin);
    formData.append("owner_id", "1");
    formData.forEach((value, key) => {
      console.log(key + ": " + value);
    });
    this.eventService.addEvent(formData).subscribe({
      next: (response) => {
        console.log("Event created successfully:", response);
        this.load_events();
      },
      error: (error) => {
        console.error("Error creating event:", error);
      },
    });
  }
}
