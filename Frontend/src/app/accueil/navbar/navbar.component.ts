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


}
