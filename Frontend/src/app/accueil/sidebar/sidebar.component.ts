import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for form handling
import { CommonModule } from '@angular/common'; // Import CommonModule for directives like *ngIf
import { ReclamationService } from '../../services/reclamation/reclamation.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  userId: number = 1; // Set userId to 1 for testing purposes
  userName = 'Kahweji Syrina';
  userEmail = 'Syrinekahweji5@gmail.com';

  showModal: boolean = false;
  reclamationText: string = '';
  selectedFile: string = '' ; // Store selected file

  constructor(private reclamationService: ReclamationService) {}
  recherche(){

  }
  openReclamationModal() {
    this.showModal = true;
  }

  closeReclamationModal() {
    this.showModal = false;
  }

  // File selection handler
  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files[0]) {
  //     this.selectedFile = input.files[0];
  //   }
  // }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile =file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFile = reader.result as string;
      console.log(this.selectedFile);
    };



  }

  addReclamation() {
    if (this.reclamationText.trim()) {
      const formData = new FormData();
      formData.append('reclamation', this.reclamationText);
      formData.append('userId', this.userId.toString());
      formData.append('image', this.selectedFile.toString()); // Append file if selected


      this.reclamationService.addReclamation(formData).subscribe(
        (response) => {
          console.log('Reclamation submitted successfully:', response);
          alert('Réclamation soumise avec succès!');
          this.reclamationText = ''; // Clear the input
          this.selectedFile = ''; // Clear the file input
          this.showModal = false;   // Close the modal
        },
        (error) => {
          console.error('Error submitting reclamation:', error);
          alert('Une erreur est survenue. Veuillez réessayer.');
        }
      );
    } else {
      alert('Veuillez saisir une réclamation avant de soumettre.');
    }
  }

  logout() {}
}
