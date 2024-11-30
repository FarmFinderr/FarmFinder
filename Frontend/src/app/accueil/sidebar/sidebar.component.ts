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

constructor(private reclamationService: ReclamationService) {}

  userId: number = 1; // Set userId to 1 for testing purposes
  userName = 'Kahweji Syrina';
  userEmail = 'Syrinekahweji5@gmail.com';

  showModal: boolean = false;
  reclamationText: string = '';


  recherche(){
  }

  // Function to show the modal
  openReclamationModal() {
    this.showModal = true;
  }

  // Function to hide the modal
  closeReclamationModal() {
    this.showModal = false;
  }

  // Function to handle reclamation submission
  addReclamation() {
    if (this.reclamationText.trim()) {
      const reclamationPayload = {
        reclamation: this.reclamationText,
        userId: this.userId  // Add userId here
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



  logout() {
  }
}
