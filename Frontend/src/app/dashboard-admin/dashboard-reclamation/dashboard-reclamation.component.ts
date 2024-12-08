import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReclamationService } from '../../services/reclamation-admin/reclamation.service'; // Correct import path
import { NavbarAdminComponent } from '../dashboard-admin.component'; // If using this navbar component
import { Reclamation } from '../../models/reclamation.model';

@Component({
  selector: 'app-dashboard-reclamation',
  standalone: true,
  imports: [NavbarAdminComponent, CommonModule, FormsModule], // Keep imports organized
  templateUrl: './dashboard-reclamation.component.html',
  styleUrls: ['./dashboard-reclamation.component.css']
})
export class DashboardReclamationComponent implements OnInit {

  reclamations: Reclamation[] = [];
  editingReclamation: Reclamation | null = null;

  constructor(private reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.getReclamations();
  }
  

  // Fetch all reclamations from the service
  getReclamations(): void {
    this.reclamationService.getReclamations().subscribe(
      (data) => {
        console.log('Received data:', data); // Logs the data you get from the API
        this.reclamations = data;  // Assign the data to the component's array
      },
      (error) => {
        console.error('Error fetching reclamations:', error);
      }
    );
  }

  // Edit a specific reclamation
  editReclamation(reclamation: Reclamation): void {
    this.editingReclamation = { ...reclamation };  // For editing
  }

  // Delete a specific reclamation
  deleteReclamation(reclamation: Reclamation): void {
    this.reclamationService.deleteReclamation(reclamation.id).subscribe(() => {
      this.reclamations = this.reclamations.filter(r => r.id !== reclamation.id);
    });
  }
}
