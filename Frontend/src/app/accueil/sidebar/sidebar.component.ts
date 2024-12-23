import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for form handling
import { CommonModule } from '@angular/common'; // Import CommonModule for directives like *ngIf
import { ReclamationService } from '../../services/reclamation/reclamation.service';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent  implements OnInit {
  //userId: number = 1;
  userId: string ='';
  //userName = 'Kahweji Syrina';
  //userEmail = 'Syrinekahweji5@gmail.com';
   // Fake first and last name
   name = 'Lyna';
   lastName = 'Moujahed';

   showModal: boolean = false;
   reclamationText: string = '';

  user:any=null;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  constructor(private reclamationService: ReclamationService,private userservice:UserService,private router: Router) { }




  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') ?? '';
    console.log("userid",this.userId)
    console.log("user actuelle",this.user);
    console.log("userid",this.userId)
    this.getuser(this.userId);
    console.log("user actuelle",this.user);
  }
  getuser(userId:string):void{
    this.user=this.userservice.getUser(userId);

    this.userservice.getUser(userId).subscribe({
      next: (data: any) => {
        console.log('Fetched user:', data)
        this.user = data;
        console.log('user act',this.user);
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching user:', err);
        this.errorMessage = 'Failed to load user';
        this.isLoading = false;
      },
    });

  }





  // Function to handle reclamation submission
  addReclamation() {
    if (this.reclamationText.trim()) {
      const reclamationPayload = {
        reclamation: this.reclamationText,
        userId: this.userId,  
        name: this.user.name,  
        lastName: this.user.lastName   
      };
  
      this.reclamationService.addReclamation(reclamationPayload).subscribe(
        (response) => {
          console.log('Reclamation submitted successfully:', response);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Reclamation submitted successfully!',
            confirmButtonColor: '#3085d6',
          });
          this.reclamationText = ''; 
          this.showModal = false;   
        },
        (error) => {
          console.error('Error submitting reclamation:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred. Please try again.',
            confirmButtonColor: '#d33',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please enter a reclamation before submitting.',
        confirmButtonColor: '#f39c12',
      });
    }
  }

  // Other functions like open/close modal
  openReclamationModal() {
    this.showModal = true;
  }

  closeReclamationModal() {
    this.showModal = false;
  }
  Dashboard() {
    this.router.navigate(['/dashboard']);
  }


  logout():void {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log me out',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          this.router.navigate(['/sign-in']);
        }
      });


  }

}
