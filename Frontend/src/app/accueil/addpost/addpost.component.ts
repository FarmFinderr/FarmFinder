import { Component ,NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  userId=1;
  constructor(private http: HttpClient) {}


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
    const formData = new FormData();
    const userId = this.userId; 
    formData.append('userId', userId.toString());

    // Ajouter les champs du formulaire
    Object.entries(form.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
  

    // Ajouter les fichiers (images/vidéos)
    /*this.files.forEach((file) => {
      formData.append('files', file);
    });*/
 
   //console.log("form Data",formData)

   console.log('Contenu du FormData :');
  formData.forEach((value, key) => {
    console.log(`${key}:`, value);
  });
    this.http.post('http://localhost:5000/posts', formData).subscribe({
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
