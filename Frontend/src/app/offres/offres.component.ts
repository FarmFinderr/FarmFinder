import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { Post } from '../models/post.model';  
import { PostService } from '../services/post/post.service';  
import { FormsModule } from '@angular/forms';  
import { NavbarComponent } from '../accueil/navbar/navbar.component';
import { OffreDetailsComponent} from '../offre-details/offre-details.component';
@Component({
  selector: 'app-offres',
  standalone: true,
  imports: [NavbarComponent, CommonModule, CurrencyPipe, NgForOf, NgIf, FormsModule,OffreDetailsComponent],
  templateUrl: './offres.component.html',  
  styleUrls: ['./offres.component.css'],  
})
export class OffresComponent implements OnInit {
  annonces: Post[] = []; 
  filteredAnnonces: any[] = []; 
  searchRegion: string = ''; 
  searchType: string = ''; 
  searchPrice: number | null = null; 


  selectedAnnonce: any = null;
  openModal(annonce: any) {
    this.selectedAnnonce = annonce;
  }
  closeModal() {
    this.selectedAnnonce = null;
  }

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadAnnonces(); 
  }

  loadAnnonces(): void {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.annonces = data;  
        this.filteredAnnonces = data; 
        console.log('Annonces chargées :', this.annonces);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des annonces :', err);  
      },
    });
  }

  onSearch(): void {
    console.log("Recherche en cours...");
    console.log(this.searchPrice , this.searchRegion ,this.searchType);

  
    this.filteredAnnonces = this.annonces.filter(annonce => {
      const matchesPrice = this.searchPrice ? annonce.price === this.searchPrice : true;
  
      const matchesRegion = this.searchRegion
        ? annonce.localisation && annonce.localisation.toLowerCase().includes(this.searchRegion.toLowerCase())
        : true;
  
      const matchesType = this.searchType ? annonce.type === this.searchType : true;

      return matchesPrice && matchesRegion && matchesType;    
    });
  }
  
}