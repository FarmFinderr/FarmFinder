import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarAdminComponent, FormsModule],
  templateUrl: './table-dashboard.component.html',
  styleUrl: './table-dashboard.component.css'
})
export class TableDashboard implements OnInit { // Corrected class name
  users: any[] = [];
  isLoading = true;
  isModalOpen = false;
  selectedUser: any;
  edit = false;
  deleted = 0;
  deleteU=false;
  originalUser: any; // Store original user data for editing


  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  // if(this.image.length>0){
  //   this.imageError="";
  //   this.PythonServiceService.AddPhoto(this.imageCin).subscribe((res:any)=>{
  //   this.AuthServiceService.AdddUser(
  //       {
  //         "password": "empty",
  //         "photoCin": this.image,
  //         "lastName": this.SignUpForm.value['LastName'],
  //         "cin": res['Number'],
  //         "email": this.SignUpForm.value['Email'],
  //         "numTlf":this.SignUpForm.value['NumTlf'],
  //         "sexe":this.SignUpForm.value['Sex'],
  //         "firstName":this.SignUpForm.value['FirstName'],
  //         "photo":null,
  //         "role":this.SignUpForm.value['RoleFor'],
  //         "keycloak_id":this.user._id
  //       }
  //     ).subscribe((res:any)=>{
  //       this.MatSnackBar.open(res.data,'',{
  //          duration:2000,
  //        })
  //        setTimeout(()=>{
  //         this.store.dispatch(new Logout());
  //         this.keycloakService.logout();
  //         this.router.navigate(['/']);
  //        },2000)
  //     },(error)=>{
  //       this.MatSnackBar.open(error.error.error,'',{
  //         duration:2000,
  //       })
  //     })
  //   },(err)=>{
  //     this.MatSnackBar.open(err.error.error,'',{
  //       duration:2000,
  //     })
  //   })
  // }else{
  //   this.imageError="You must upload an image";
  // }
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.isLoading = false;
      },
    });
  }

  editUser(user: any): void {
    this.originalUser = { ...user }; 
    this.edit = true;
  }
  


  updateUser() {
    
    if (this.originalUser && this.originalUser.id) {
      console.log(this.originalUser);
      
      this.userService.updateUser(this.originalUser.id, this.originalUser).subscribe((updatedUser:any) => {
          console.log( updatedUser);
          
          
          this.closeModal(); 
        },(error:any) => {
          console.error('Error updating user:', error);
          
        })
     
    } else {
      console.error("Cannot update user: Missing user or ID");
    }
  }



  cancelEdit() {
    if (this.originalUser) {
      
      const index = this.users.findIndex(u => u.id === this.selectedUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.originalUser };
      }
    }
    this.closeModal();
  }
  deleteconfirme(userId: number): void {
    this.deleteU = true;
    this.deleted = userId;
  }

  
  deleteUser(): void {
    this.userService.deleteUser(this.deleted).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== this.deleted); // Remove user from list
        console.log(`User with ID ${this.deleted} deleted successfully.`);
        this.deleteU = false;
      },
    // if (confirm('Are you sure you want to delete this user?')) {
      
    //     error: (error) => {
    //       console.error('Error deleting user:', error);
    //       alert('Failed to delete the user. Please try again later.');
    //     },
       });
    }
  
  

  showDetails(user: any): void {
    this.selectedUser = { ...user }; // Create a copy to avoid direct modification
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.edit = false;
    this.selectedUser = null; // Reset selectedUser
    this.originalUser = null; // Reset originalUser
    this.deleteU = false;
  }
}