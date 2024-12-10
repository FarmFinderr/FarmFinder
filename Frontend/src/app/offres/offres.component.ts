import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { Post } from '../models/post.model';  // Importation du modèle Post
import { PostService } from '../services/post/post.service';  // Service pour récupérer les posts
import { FormsModule } from '@angular/forms';  // Importation du module Forms
import { NavbarComponent } from '../accueil/navbar/navbar.component';

@Component({
  selector: 'app-offres',
  standalone: true,
  imports: [NavbarComponent, CommonModule, CurrencyPipe, NgForOf, NgIf, FormsModule],  // Importation des modules nécessaires
  templateUrl: './offres.component.html',  // Le template HTML
  styleUrls: ['./offres.component.css'],  // Le fichier CSS
})
export class OffresComponent implements OnInit {
  annonces: Post[] = []; // Tableau pour stocker les annonces récupérées
  filteredAnnonces: any[] = []; // Annonces filtrées selon les critères
  searchRegion: string = ''; // Région à rechercher
  searchPrice: number | null = null; // Prix à rechercher

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadAnnonces(); 
  }

  // Méthode pour récupérer les annonces via le service
  loadAnnonces(): void {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.annonces = data;  // Affecter les annonces récupérées à la variable 'annonces'
        this.filteredAnnonces = data; // Par défaut, afficher toutes les annonces
        console.log('Annonces chargées :', this.annonces);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des annonces :', err);  // Gérer les erreurs de récupération
      },
    });
  }

  // Fonction de recherche par prix ou région
  onSearch(): void {
    console.log("Recherche en cours...");
  
    this.filteredAnnonces = this.annonces.filter(annonce => {
      // Si un prix est spécifié, filtrer par prix
      const matchesPrice = this.searchPrice ? annonce.price === this.searchPrice : true;
  
      // Si une région est spécifiée, filtrer par région
      const matchesRegion = this.searchRegion
        ? annonce.localisation && annonce.localisation.toLowerCase().includes(this.searchRegion.toLowerCase())
        : true;
  
      // Si au moins un des critères (prix ou région) correspond, retourner l'annonce
      return matchesPrice && matchesRegion;
    });
  }
  
}
