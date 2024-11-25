import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EventEmitter, Output } from '@angular/core';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,RouterOutlet,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Output() openAssistantModal = new EventEmitter<void>();

openModalIA() {
  this.openAssistantModal.emit();
}

isModalOpenIA = false;


closeModalIA() {
  this.isModalOpenIA = false;
}

isNotificationModalOpen = false;
// This data simulates user interactions
notificationData = [
  {
    image: '../../../assets/accueil/lyna.jpg',
    name: 'Lyna Moujahed',
    interaction: 'reacted',
    content: '👍 on your post'
  },
  {
    image: '../../../assets/accueil/wassim.jpg',
    name: 'Mohamed wessim saidani',
    interaction: 'commented',
    content: '"Great post! Keep it up!" on your post'
  },
  {
    image: '../../../assets/sirineKahweji_ISETBizerte.jpg',
    name: 'sirine kahweji',
    interaction: 'messaged',
    content: 'you about your post'
  }
];

openNotificationModal() {
  this.isNotificationModalOpen = true;
}

closeNotificationModal() {
  this.isNotificationModalOpen = false;
}

}
