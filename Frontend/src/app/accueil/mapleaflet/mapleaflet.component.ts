import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapleaflet',
  standalone: true,
  imports: [],
  templateUrl: './mapleaflet.component.html',
  styleUrl: './mapleaflet.component.css'
})
export class MapleafletComponent implements AfterViewInit{
  @Input() location: string = ''; // Localisation en entrée

  private map: L.Map | undefined;

  constructor() {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    // Initialiser la carte avec un emplacement par défaut
    this.map = L.map('map').setView([36.81897, 10.16579], 10); // Tunis par défaut

    // Ajouter une couche OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  ngOnChanges(): void {
    if (this.location && this.map) {
      this.geocodeLocation(this.location);
    }
  }

  private geocodeLocation(location: string): void {
    if (!this.map) {
      console.error('La carte n\'est pas encore initialisée.');
      return;
    }
  
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
  
    fetch(geocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const lat = data[0].lat;
          const lon = data[0].lon;
          this.map!.setView([lat, lon], 15); // Utilisation sûre de `!`
  
          // Ajouter un marqueur à l'emplacement
          L.marker([lat, lon]).addTo(this.map!).bindPopup(location).openPopup();
        } else {
          console.error('Aucune localisation trouvée pour:', location);
        }
      })
      .catch((error) => console.error('Erreur lors du géocodage:', error));
  }
  

}
