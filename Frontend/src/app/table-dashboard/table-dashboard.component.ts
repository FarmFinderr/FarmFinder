import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service'; 
import {NavbarAdminComponent} from  '../navbar-admin/navbar-admin.component'
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-table-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarAdminComponent],
  templateUrl: './table-dashboard.component.html',
  styleUrl: './table-dashboard.component.css'
})
export class TableDashboard implements OnInit {
  users: any[] = []; 
  isLoading: boolean = true; 

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data; 
        console.log('Users fetched:', data);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.isLoading = false;
      },
      complete: () => {
        console.log('User data fetch complete.');
      },
    });
  }
  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== userId); 
          console.log(`User with ID ${userId} deleted successfully.`);
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        },
      });
    }
  }
  
}
