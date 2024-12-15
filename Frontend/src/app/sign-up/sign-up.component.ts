import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  user = {
    name: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    date: '',
    address: '',
    photo: '',
    sexe: ""
  };

  uploadedImageUrl: string = '';
  imageError = "";
  files: File[] = [];
  passwordsMatch: boolean = true; // This will track if the passwords match

  constructor(private userService: UserService, private router: Router) { }



  onFileChanged(event: any) {
    const file = event.target.files[0];
    this.user.photo = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.user.photo = reader.result as string;
    };
    console.log(this.user.photo);


  }

  onSubmit(): void {
    // Ensure the passwords match before submitting
    this.checkPasswordsMatch();
    if (!this.passwordsMatch) {
      alert('Passwords do not match.');
      return;
    }

    // Create FormData object to send form data and image
    const formData = new FormData();
    formData.append('name', this.user.name);
    formData.append('lastName', this.user.lastName);
    formData.append('emailAddress', this.user.emailAddress);
    formData.append('phoneNumber', this.user.phoneNumber);
    formData.append('password', this.user.password);
    formData.append('date', this.user.date);
    formData.append('address', this.user.address);
    formData.append('sexe', this.user.sexe);

    // Append the selected file (if any) to the FormData

    formData.append('photo', this.user.photo); // Only take the first file
    console.log(this.user.photo);

    this.userService.createUser(formData).subscribe({
      next: (response) => {
        console.log('User created successfully', response);
        this.router.navigate(['/sign-in']);
      },
      error: (error) => {
        console.error('Error creating user', error);
        alert('Error creating account. Please try again.');
      },
    });
  }
  // onSubmit(): void {
  //   this.checkPasswordsMatch();
  //   if (!this.passwordsMatch) {
  //     alert('Passwords do not match.');
  //     return;
  //   }

  //   if (this.files.length > 0) {
  //    this.imageError = "";
  //    this.userService.AddPhoto(this.files).subscribe((res: any) => {
  //       // After photo upload, create the user
  //       const formData = new FormData();
  //       formData.append('name', this.user.name);
  //       formData.append('lastName', this.user.lastName);
  //       formData.append('emailAddress', this.user.emailAddress);
  //       formData.append('phoneNumber', this.user.phoneNumber);
  //       formData.append('password', this.user.password);
  //       formData.append('date', this.user.date);
  //       formData.append('address', this.user.address);
  //       formData.append('sexe', this.user.sexe);
  //       //formData.append('photo', this.user.photo);

  //       //Assuming the response contains the URL of the uploaded image
  //       this.uploadedImageUrl = res['photoUrl']; // Store the image URL
  //       formData.append('photo', this.uploadedImageUrl); // You can append the image URL here too if needed

  //       this.userService.createUser(formData).subscribe({
  //         next: (response) => {
  //           console.log('User created successfully', response);
  //           this.router.navigate(['/sign-in']);
  //         },
  //         error: (error) => {
  //           console.error('Error creating user', error);
  //           alert('Error creating account. Please try again.');
  //         },
  //       });
  //    }, (err) => {
  //      this.imageError = "Error uploading image. Please try again.";
  //      console.error(err);
  //    });
  //   } else {
  //    this.imageError = "You must upload an image";
  //  }
  // }






  // This method checks if the passwords match
  checkPasswordsMatch(): void {
    this.passwordsMatch = this.user.password === this.user.confirmPassword;
  }

  /*onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.files = Array.from(target.files);
      if (this.files.length != 0) {
        console.log('Selected files:', this.files);
      }
    }
  }*/
}
