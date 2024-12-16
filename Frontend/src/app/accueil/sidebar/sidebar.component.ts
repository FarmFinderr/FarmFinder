import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for form handling
import { CommonModule } from '@angular/common'; // Import CommonModule for directives like *ngIf
import { ReclamationService } from '../../services/reclamation/reclamation.service';
import { UserService } from '../../services/user/user.service';


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

  user:any=null;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  constructor(private reclamationService: ReclamationService,private userservice:UserService,) { }




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


  showModal: boolean = false;
  reclamationText: string = '';
  selectedFile: string = ''; // Store selected file

  recherche() {

  }
  openReclamationModal() {
    this.showModal = true;
  }

  closeReclamationModal() {
    this.showModal = false;
  }

 

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
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
      formData.append("reclamation", this.reclamationText);
      formData.append("userId", this.userId.toString());

      // Assuming `this.selectedFile` contains the base64 string, e.g., 'data:image/png;base64,...'
      if (this.selectedFile) {
        formData.append("image", this.selectedFile);
      }
      formData.forEach((value, key) => {
        console.log(key + ": " + value);
      });

      this.reclamationService.addReclamation(formData).subscribe(
        {
          next: (response) => {
            console.log('Reclamation submitted successfully:', response);
            alert('Réclamation soumise avec succès!');
            this.reclamationText = ''; // Clear the input
            this.selectedFile = ''; // Clear the base64 string
            this.showModal = false; // Close the modal
          },
          error: (err) => {
            console.error('Error submitting reclamation:', err);
            alert('Une erreur est survenue. Veuillez réessayer.');
          }
        }
      );
    } else {
      alert('Veuillez saisir une réclamation avant de soumettre.');
    }
  }


  logout() { }
}
