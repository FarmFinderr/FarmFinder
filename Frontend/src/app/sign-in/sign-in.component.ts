import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [NavbarComponent,CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    if (this.username && this.password) {
      console.log("email",this.username);
      console.log("password",this.password);
      this.userService.login(this.username, this.password).subscribe({
        next: (response) => {

          localStorage.setItem('token', response.token);
          console.log('Connexion réussie', response);

          // Redirigez l'utilisateur vers une page protégée
          this.router.navigate(['/accueil']);
        },
        error: (err) => {
          console.error('Erreur de connexion', err);
          alert('Email ou mot de passe incorrect');
        },
      });
    } else {
      alert('Veuillez remplir tous les champs');
    }
  }

}
