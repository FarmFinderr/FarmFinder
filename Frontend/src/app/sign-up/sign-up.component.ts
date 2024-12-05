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
  styleUrls: ['./sign-up.component.css']
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
    image: '',
  };
  image:String="";
  imageError:String=""

  passwordsMatch: boolean = true;  // This will track if the passwords match

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    this.checkPasswordsMatch();

    if (!this.passwordsMatch) {
      alert('Passwords do not match.');
      return;
    }

    if (!this.user.image) {
      this.imageError = 'You must upload an image';
      return;
    }

    this.userService.createUser(this.user).subscribe({
      next: (response) => {
        console.log('User created successfully', response);
        alert('Account created successfully!');
        this.router.navigate(['/sign-in']);
      },
      error: (error) => {
        console.error('Error creating user', error);
        alert('Error creating account. Please try again.');
      }
    });
  }
  
  onFileChanged(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.user.image = reader.result as string;
        this.imageError = ''; // Clear error if image is successfully loaded
      };
      reader.onerror = () => {
        this.imageError = 'Error reading file. Please try again.';
      };
    }
  }

  // This method checks if the passwords match
  checkPasswordsMatch(): void {
    this.passwordsMatch = this.user.password === this.user.confirmPassword;
  }
}
