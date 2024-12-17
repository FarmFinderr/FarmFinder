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
  // Existing user data
  userId: number = 1; // Set userId to 1 for testing purposes
  userName = 'Kahweji Syrina';
  userEmail = 'Syrinekahweji5@gmail.com';

  // Fake first and last name
  name = 'Lyna';
  lastName = 'Moujahed';

  showModal: boolean = false;
  reclamationText: string = '';

  constructor(private reclamationService: ReclamationService) {}

  // Function to handle reclamation submission
  addReclamation() {
    if (this.reclamationText.trim()) {
      const reclamationPayload = {
        reclamation: this.reclamationText,
        userId: this.userId,  // Add userId here
        name: this.name,  // Add first name
        lastName: this.lastName   // Add last name
      };

      this.reclamationService.addReclamation(reclamationPayload).subscribe(
        (response) => {
          console.log('Reclamation submitted successfully:', response);
          alert('Réclamation soumise avec succès!');
          this.reclamationText = ''; // Clear the input
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

  // Other functions like open/close modal
  openReclamationModal() {
    this.showModal = true;
  }

  closeReclamationModal() {
    this.showModal = false;
  }

  logout() {
    // Logout logic here
  }
}
