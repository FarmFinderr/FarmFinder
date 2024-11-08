import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AddpostComponent } from './addpost/addpost.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EventslistComponent } from './eventslist/eventslist.component';
import { ModalAddPostComponent } from './modal-add-post/modal-add-post.component';

import { MapComponent } from './map/map.component';


import { GoogleMapsModule } from '@angular/google-maps';
import { imageOverlay } from 'leaflet';

import { OpenmapComponent } from '../accueil/openmap/openmap.component';





@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [OpenmapComponent,CommonModule,MapComponent,GoogleMapsModule,AddpostComponent ,ModalAddPostComponent,EventslistComponent,SidebarComponent,RouterOutlet, RouterLink, RouterLinkActive,NavbarComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
   posts=[];
   showDetails = false; 

   toggleDetails() {
     this.showDetails = !this.showDetails;
   }

}
