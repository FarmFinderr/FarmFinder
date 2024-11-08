import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ModalAddPostComponent } from "../modal-add-post/modal-add-post.component";
@Component({
  selector: 'app-addpost',
  standalone: true,
  imports: [RouterOutlet, ModalAddPostComponent],
  templateUrl: './addpost.component.html',
  styleUrl: './addpost.component.css'
})
export class AddpostComponent {
  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
    console.log("modal opened");
  }
  
  closeModal() {
    this.isModalOpen = false;
    console.log("modal closed");
  }
}
