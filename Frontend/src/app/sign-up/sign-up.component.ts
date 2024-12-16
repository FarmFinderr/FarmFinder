import { Component } from '@angular/core';
import { Navbar2Component } from '../navbar2/navbar2.component';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [Navbar2Component, CommonModule, FormsModule],
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
    sexe: ''
  };

  uploadedImageUrl: string = '';
  imageError = "";
  files: File[] = [];
  passwordsMatch: boolean = true;

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

    if (!this.user.name || !this.user.lastName || !this.user.emailAddress || !this.user.phoneNumber || 
        !this.user.password || !this.user.confirmPassword || !this.user.date || !this.user.address) {
      Swal.fire('Error', 'All fields are required!', 'error');
      return;
    }

    this.checkPasswordsMatch();
    if (!this.passwordsMatch) {
      Swal.fire('Error', 'Passwords do not match.', 'error');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(this.user.emailAddress)) {
      Swal.fire('Error', 'Please enter a valid Gmail address.', 'error');
      return;
    }

    const birthDate = new Date(this.user.date);
    const currentDate = new Date();
    if (birthDate >= currentDate) {
      Swal.fire('Error', 'Birth date cannot be in the future.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.user.name);
    formData.append('lastName', this.user.lastName);
    formData.append('emailAddress', this.user.emailAddress);
    formData.append('phoneNumber', this.user.phoneNumber);
    formData.append('password', this.user.password);
    formData.append('date', this.user.date);
    formData.append('address', this.user.address);
    formData.append('sexe', this.user.sexe);
    formData.append('photo', this.user.photo);

    this.userService.createUser(formData).subscribe({
      next: (response) => {
        console.log('User created successfully', response);
        this.router.navigate(['/sign-in']);
      },
      error: (error) => {
        console.error('Error creating user', error);
        Swal.fire('Error', 'Error creating account. Please try again.', 'error');
      },
    });
  }

  checkPasswordsMatch(): void {
    this.passwordsMatch = this.user.password === this.user.confirmPassword;
  }
}
