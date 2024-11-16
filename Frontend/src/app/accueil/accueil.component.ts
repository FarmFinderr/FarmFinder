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
   posts = [
    {
      image: "../../assets/accueil/post1.jpg",
      name: "Syrine Kahweji",
      date: "7 Février 2021",
      content: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",
      price: "150 000 €",
      location: "Bizerte",
      area: "20 hectares",
      defects: "Aucun défaut majeur identifié",
      imagePost: "../../assets/accueil/post1.jpg"
    },
    {
      image: "../../assets/accueil/post1.jpg",
      name: "Syrine Kahweji",
      date: "7 Février 2021",
      content: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",
      price: "150 000 €",
      location: "Bizerte",
      area: "20 hectares",
      defects: "Aucun défaut majeur identifié",
      imagePost: "../../assets/accueil/post1.jpg"
    },
    {
      image: "../../assets/accueil/post1.jpg",
      name: "Syrine Kahweji",
      date: "7 Février 2021",
      content: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",
      price: "150 000 €",
      location: "Bizerte",
      area: "20 hectares",
      defects: "Aucun défaut majeur identifié",
      imagePost: "../../assets/accueil/post1.jpg"
    }
  ];

  comments = [
    {
      userImage: '../../assets/accueil/lyna.jpg',
      userName: ' Lyna moujehed',
      content: 'Super article, dispo !',
      date: '7 Février 2024'
    },
    {
      userImage: '../../assets/accueil/lyna.jpg',
      userName: ' Lyna moujehed',
      content: 'Super article, dispo !',
      date: '7 Février 2024'
    },
    {
      userImage: '../../assets/accueil/wassim.jpg',
      userName: 'Wassim saidani',
      content: 'prix negociable ??.',
      date: '8 Février 2024'
    },
    {
      userImage: '../../assets/sirineKahweji_ISETBizerte.jpg',
      userName: 'syrine syrina',
      content: 'Très bien expliqué !',
      date: '10 Février 2024'
    },
    {
      userImage: '../../assets/accueil/lyna.jpg',
      userName: ' Lyna moujehed',
      content: 'Super article, dispo !',
      date: '7 Février 2024'
    },
    {
      userImage: '../../assets/accueil/wassim.jpg',
      userName: 'Wassim saidani',
      content: 'prix negociable ??.',
      date: '8 Février 2024'
    },
    {
      userImage: '../../assets/sirineKahweji_ISETBizerte.jpg',
      userName: 'syrine syrina',
      content: 'Très bien expliqué !',
      date: '10 Février 2024'
    },
    {
      userImage: '../../assets/accueil/lyna.jpg',
      userName: ' Lyna moujehed',
      content: 'Super article, dispo !',
      date: '7 Février 2024'
    },
    {
      userImage: '../../assets/accueil/wassim.jpg',
      userName: 'Wassim saidani',
      content: 'prix negociable ??.',
      date: '8 Février 2024'
    },
    {
      userImage: '../../assets/sirineKahweji_ISETBizerte.jpg',
      userName: 'syrine syrina',
      content: 'Très bien expliqué !',
      date: '10 Février 2024'
    }
  ];

  events = [
    {
      id:1,
      image: '../../assets/accueil/event1.jpg',
      title: 'Ferme de 13 ha à Ain Draham',
      price: '5,400,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:2,
      image: '../../assets/accueil/event1.jpg',
      title: 'Terrain avec vue sur la mer Bizerte CapZbib',
      price: '1,200,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:3,
      image: '../../assets/accueil/event2.jpg',
      title: 'Petit Terrain a Tunis',
      price: '850,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:4,
      image: '../../assets/accueil/event1.jpg',
      title: 'Ferme de 13 ha à Ain Draham',
      price: '5,400,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:5,
      image: '../../assets/accueil/event2.jpg',
      title: 'Ferme avec vue sur la mer',
      price: '1,200,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:6,
      image: '../../assets/accueil/event3.jpg',
      title: 'Appartement au centre-ville',
      price: '850,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:7,
      image: '../../assets/accueil/event1.jpg',
      title: 'Ferme de 13 ha à Ain Draham',
      price: '5,400,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:8,
      image: '../../assets/accueil/event2.jpg',
      title: 'Villa avec vue sur la mer',
      price: '1,200,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:9,
      image: '../../assets/accueil/event3.jpg',
      title: 'Appartement au centre-ville',
      price: '850,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:10,
      image: '../../assets/accueil/event1.jpg',
      title: 'Ferme de 13 ha à Ain Draham',
      price: '5,400,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:11,
      image: '../../assets/accueil/event2.jpg',
      title: 'Villa avec vue sur la mer',
      price: '1,200,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    }
  ];

   showDetails = false; 
   isModalOpen = false;
   isModalOpenDetailsEvent = false;
   eventDetails: any = null;



  openModal() {
    this.isModalOpen = true;
    console.log("modal opened ");
  }

  closeModal() {
    this.isModalOpen = false;
    this.eventDetails = null;

    console.log("modal closed ");

  }

   toggleDetails() {
     this.showDetails = !this.showDetails;
   }

   openModalDetailsEvent(eventId:number) {
    this.eventDetails = this.events[eventId];
    this.isModalOpenDetailsEvent = true;
    console.log("ModalDetailsEvent opened ");
  }

  closeModalDetailsEvent() {
    this.isModalOpenDetailsEvent = false;
    console.log("ModalDetailsEvent closed ");

  }

}