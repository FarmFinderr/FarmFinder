import { Component ,NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ModalAddPostComponent } from "../modal-add-post/modal-add-post.component";
@Component({
  selector: 'app-addpost',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule],
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent {
  isModalOpen = false;
  isModalOpenDetailsEvent = false;
  messageSuccess = false;
  selectedType: string = '';

  openModal() {
    this.isModalOpen = true;
    console.log("modal opened ");
  }

  closeModal() {
    this.isModalOpen = false;
    console.log("modal closed ");

  }
  openModalDetailsEvent() {
    this.isModalOpenDetailsEvent = true;
    console.log("ModalDetailsEvent opened ");
  }

  closeModalDetailsEvent() {
    this.isModalOpenDetailsEvent = false;
    console.log("ModalDetailsEvent closed ");

  }

  submitForm(form: any) {
    if (form.valid) {
      this.messageSuccess = true;

      setTimeout(() => {
        this.messageSuccess = false;
        this.closeModal();
      }, 1500);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      // Add your file handling logic here (e.g., upload or preview)
    }
}

}
