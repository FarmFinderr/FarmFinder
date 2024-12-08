import { Component ,NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../../services/post/post.service';
import { ImageService } from '../../services/image/image.service';
import { AddpostService } from '../../services/post/addpost.service';
import { Router } from '@angular/router';
import { FormsModule ,FormGroup,NgForm} from '@angular/forms'; 
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ModalAddPostComponent } from "../modal-add-post/modal-add-post.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addpost',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule],
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent {

  isModalOpen = false;
  messageSuccess = false;
  selectedType: string = '';
  files: File[] = [];
  userId='1';
  constructor(private http: HttpClient,private imageService: ImageService,
    private AddpostService: AddpostService,private router: Router, 
  ) {}


  openModal() {
    this.isModalOpen = true;
    console.log("modal opened ");
  }

  closeModal() {
    this.isModalOpen = false;
    console.log("modal closed ");

  }

  submitForm(form: NgForm): void {
    if (form.invalid) return; 
    const userId = this.userId; 
  
    const formData = {
      _id: "",
      userId: userId,  
      price: form.value.price,
      description: form.value.description,
      type: form.value.type,
      localisation: form.value.localisation,
      air: form.value.air,
      etat: form.value.etat,
      defaut: form.value.defauts
    };
  
    console.log("form Data", formData);
  
    this.http.post('http://localhost:8880/posts', formData).subscribe({
      next: (response: any) => {
        const postId = response?.post?._id || response?._id;
        console.log('Post ID:', postId);
        
        if (this.files.length > 0) {
          this.files.forEach((file: File) => {
            console.log('Uploading file:', file, 'for postId:', postId);
            this.imageService.uploadImage(file, postId).subscribe({
              next: (imgResponse) => {
                console.log('Image added successfully:', imgResponse);
              },
              error: (imgErr) => {
                console.error('Error adding image:', imgErr);
              }
            });
          });
        }
        
        this.messageSuccess = true;
        this.AddpostService.notifyPostAdded();
        
          const currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });
        
        form.resetForm();
        this.files = []; 
        this.isModalOpen = false;
  
        Swal.fire({
          icon: 'success',
          title: 'Votre offre a été ajoutée avec succès!',
          showConfirmButton: false,
          timer: 3000,
          width: '300px', 
          padding: '10px', 
          customClass: {
          title: 'swal-title', 
           popup: 'swal-popup' 
          }
        });
  
        setTimeout(() => {
          this.messageSuccess = false;
          this.closeModal();
        }, 3000); 
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout de la publication :', err);
        this.isModalOpen = false;
  
        Swal.fire({
          icon: 'error',
          title: 'Une erreur est survenue!',
          text: 'Veuillez réessayer.',
          showConfirmButton: true
        });
      }
    });
  }
  
    onFileSelected(event: Event): void {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.files = Array.from(target.files);
        if (this.files.length!=0) {
          console.log('Selected files:', this.files);
        }
      }
    }

}