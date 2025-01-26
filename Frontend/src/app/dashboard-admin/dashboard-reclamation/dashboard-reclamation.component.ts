import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReclamationService } from '../../services/reclamation-admin/reclamation.service'; // Correct import path
import { NavbarAdminComponent } from '../../navbar-admin/navbar-admin.component'; // If using this navbar component
import { Reclamation } from '../../models/reclamation.model';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { NavbarComponent } from '../../accueil/navbar/navbar.component';

@Component({
  selector: 'app-dashboard-reclamation',
  standalone: true,
  imports: [NavbarAdminComponent, CommonModule, FormsModule,RouterModule,NavbarComponent], // Keep imports organized
  templateUrl: './dashboard-reclamation.component.html',
  styleUrls: ['./dashboard-reclamation.component.css']
})
export class DashboardReclamationComponent implements OnInit {

  reclamations: Reclamation[] = [];
  editingReclamation: Reclamation | null = null;

  constructor(private reclamationService: ReclamationService,private userService: UserService,) {}
  userId: string = '';
  ngOnInit(): void {
    this.getReclamations();
    this.userId = localStorage.getItem('userId') ?? '';
    this.getuser(this.userId);
  }
  user: any = null;
  getuser(userId:string):void{
    this.user=this.userService.getUser(userId);

    this.userService.getUser(userId).subscribe({
      next: (data) => {
        console.log('Fetched user:', data)
        this.user = data;
        console.log('user act',this.user);
         
      },
      error: (err) => {
        console.error('Error fetching user:', err);  
        
      },
    });

  }
  // Fetch all reclamations from the service
  getReclamations(): void {
    this.reclamationService.getReclamations().subscribe(
      (data) => {
        console.log('Received data:', data); // Logs the data you get from the API
        this.reclamations = data.map((reclamation: any) => ({
          ...reclamation,
          userName: `${reclamation.name} ${reclamation.lastName}`  // Combining first and last name
        }));
      },
      (error) => {
        console.error('Error fetching reclamations:', error);
      }
    );
  }

  deleteReclamation(reclamation: Reclamation): void {
    // Use _id (MongoDB identifier) instead of id
    this.reclamationService.deleteReclamation(reclamation._id).subscribe(() => {
      this.reclamations = this.reclamations.filter(r => r._id !== reclamation._id);
    });
  }

}
