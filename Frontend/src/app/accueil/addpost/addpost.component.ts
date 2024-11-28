import { Component ,NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../../services/post/post.service';
import { FormsModule ,FormGroup,NgForm} from '@angular/forms'; 
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ModalAddPostComponent } from "../modal-add-post/modal-add-post.component";
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
  constructor(private http: HttpClient) {}
  //constructor(private postService: PostService) {} 


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
      _id:"",
      userId: userId,  
      price: form.value.price,
      description: form.value.description,
      type: form.value.type,
      localisation: form.value.localisation,
      air: form.value.air,
      etat: form.value.etat ,
      defaut:form.value.defauts
    };


 
   console.log("form Data",formData)

 
    this.http.post('http://localhost:5000/posts', formData).subscribe({
      next: (response: any) => {
        //console.log('Response:', response);
        const postId = response?.post?._id || response?._id;
        //console.log('Post ID:', postId);
        this.messageSuccess = true;
        form.resetForm();
        this.files = []; 
        this.isModalOpen = false;

        setTimeout(() => {
          this.messageSuccess = false;
          this.closeModal();
        }, 3000); 
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout de la publication :', err);
        this.isModalOpen = false;

      },
    });
  }

 /* submitForm(form: NgForm): void {
      if (form.invalid) return;
      
      const formData = {
        userId: this.userId,
        price: form.value.price,
        description: form.value.description,
        type: form.value.type,
        localisation: form.value.localisation,
        air: form.value.air,
        etat: form.value.etat,
        defaut: form.value.defauts
      };
  
      // Ajouter les fichiers si nécessaire
      // this.files.forEach(file => {
      //   formData.append('files', file);
      // });
  
      console.log("form Data", formData);
  
      // Utiliser le service PostService pour ajouter la publication
      this.postService.addPost(formData).subscribe({
        next: () => {
          this.messageSuccess = true;
          form.resetForm();
          this.files = [];
          setTimeout(() => {
            this.messageSuccess = false;
            this.closeModal();
          }, 3000);
        },
        error: (err) => {
          console.error('Erreur lors de l’ajout de la publication :', err);
        },
      });
    }*/


 

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
