import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapleafletComponent } from '../accueil/mapleaflet/mapleaflet.component';

@Component({
  selector: 'app-offre-details',
  standalone: true,
  imports: [CommonModule,MapleafletComponent],
  templateUrl: './offre-details.component.html',
  styleUrl: './offre-details.component.css'
})
export class OffreDetailsComponent {
  @Input() annonce: any; 
  @Output() close = new EventEmitter<void>();
  closeModal() {
    this.close.emit();
  }

}
