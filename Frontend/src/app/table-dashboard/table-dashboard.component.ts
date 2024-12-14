import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
 
  searchQuery: string = '';
  originalUser: any = {};
  


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
        this.users = this.users.map(user =>
          user.id === updatedUser.id ? updatedUser : user
        );
          
          
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
        this.users = this.users.filter(user => user.id !== this.deleted); 
        console.log(`User with ID ${this.deleted} deleted successfully.`);
        this.deleteU = false;
      },
    
       });
    }
  
  

  showDetails(user: any): void {
    this.selectedUser = { ...user };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.edit = false;
    this.selectedUser = null; 
    this.originalUser = null; 
    this.deleteU = false;
  }
  searchUsers() {
    const searchValue = this.searchQuery.trim(); 
    
  
    if (searchValue === '') {
      this.userService.getUsers().subscribe(
        (data: any) => {
          this.users = data; 
        },
        (error: any) => {
          console.error('Error fetching all users:', error);
        }
      );
    } else {
      this.userService.search(searchValue).subscribe(
        (data: any) => {
          this.users = data; 
        },
        (error: any) => {
          console.error('Error searching users:', error);
        }
      );
    }
  }

  downloadPDF(): void {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Liste des Utilisateurs', 10, 10);

    const headers = ['NCIN', 'Nom', 'Prenom', 'Gmail', 'Date de naissance', 'Adresse'];

    const rows = this.users.map(user => [
      user.id,
      user.name,
      user.lastName,
      user.emailAddress,
      user.date,
      user.address,
    ]);

    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 20,
    });

    doc.save('Liste_Utilisateurs.pdf');
  }
  imprimer(): void {
    const printableContent = `
      <html>
        <head>
          <title>Liste des Utilisateurs</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f4f4f4;
            }
          </style>
        </head>
        <body>
          <h1>Liste des Utilisateurs</h1>
          <table>
            <thead>
              <tr>
                <th>NCIN</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Date de Naissance</th>
                <th>Adresse</th>
              </tr>
            </thead>
            <tbody>
              ${this.users
                .map(
                  (user) => `
                    <tr>
                      <td>${user.id}</td>
                      <td>${user.name}</td>
                      <td>${user.lastName}</td>
                      <td>${user.emailAddress}</td>
                      <td>${user.date}</td>
                      <td>${user.address}</td>
                    </tr>
                  `
                )
                .join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
  
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(printableContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print(); 
      printWindow.close(); 
    }
  }
  
  
  
}