import { Component } from '@angular/core';
import { Navbar2Component } from '../navbar2/navbar2.component';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [Navbar2Component, CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    if (this.username && this.password) {
      console.log("email", this.username);
      console.log("password", this.password);
      this.userService.login(this.username, this.password).subscribe({
        next: (response) => {

          localStorage.setItem('token', response.access_token);
          console.log('Connexion réussie', response.access_token);
          const decodedToken: any = jwtDecode(response.access_token);
          const userId = decodedToken.sub;  
          console.log('ID de l\'utilisateur :', userId);
          
          localStorage.setItem('userId', userId);
          console.log('Connexion réussie', response);

          this.router.navigate(['/accueil']);
        },
        error: (err) => {
          console.error('Erreur de connexion', err);
          Swal.fire('Error', 'Invalid credentials', 'error');
        },
      });
    } else {
      alert('Veuillez remplir tous les champs');
    }
  }
}
