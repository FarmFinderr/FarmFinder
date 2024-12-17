import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapleafletComponent } from '../accueil/mapleaflet/mapleaflet.component';


@Component({
  selector: 'app-offer-details',
  standalone: true,
  imports: [CommonModule,MapleafletComponent],
  templateUrl: './offer-details.component.html',
  styleUrl: './offer-details.component.css'
})
export class OfferDetailsComponent {
  @Input() annonce: any; 
  @Output() close = new EventEmitter<void>();


  closeModal() {
    this.close.emit();
  }

}



