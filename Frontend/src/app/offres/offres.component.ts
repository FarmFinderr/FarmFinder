import { Component } from '@angular/core';
import { NavbarComponent } from '../accueil/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offres',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './offres.component.html',
  styleUrl: './offres.component.css'
})
export class OffresComponent {
  annonces = [
    {
      titre: 'Ferme à Vendre',
      location: ' à Tunis',
      prix: '5700,000 TND',
      description:
        ' Opportunité dacquérir une ferme dans la région verdoyante de Tunis avec un terrain fertile et un système dirrigation moderne. Idéale pour lagriculture ou lélevage, la propriété dispose de bâtiments et infrastructures adaptées. Un cadre naturel et un accès facile pour développer votre projet. résidence gardée ',
      surface: 300,
      image: '../../assets/accueil/post1.jpg',
    },
    {
      titre: 'Ferme à Vendre',
      location: 'Ferme à Vendre à Nabeul',
      prix: '4000,000 TND',
      description:
        'Belle ferme située dans la région verdoyante de Nabeul, avec un terrain fertile et bien équipé pour lagriculture et lélevage. Comprenant des bâtiments agricoles et un système dirrigation efficace, cette propriété offre un excellent potentiel pour un projet agricole dans un cadre naturel agréable.',
      surface: 100,
      image: '../../assets/accueil/terrain2.jpg',
    },
  ];
}
