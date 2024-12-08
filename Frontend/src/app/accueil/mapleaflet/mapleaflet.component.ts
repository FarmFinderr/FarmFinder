import * as L from 'leaflet';
import { Component, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { GeocodingService } from '../../services/geocoding/geocoding.service';

@Component({
  selector: 'app-mapleaflet',
  standalone: true,
  imports: [],
  templateUrl: './mapleaflet.component.html',
  styleUrls: ['./mapleaflet.component.css']
})
export class MapleafletComponent implements AfterViewInit, OnDestroy {
  @Input() location: string = ''; // Expects location as a string (e.g., "City Name")
  @Input() mapId: string = 'map'; // Allows dynamic map ID
  map: L.Map | undefined;

  constructor(private geocodingService: GeocodingService) {}

  ngAfterViewInit(): void {
    this.ngOnDestroy()
    this.initializeMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove(); 
      if (this.map) {
        this.map.remove(); // Détruit l'instance de carte
        this.map = undefined; // Réinitialise la référence
        console.log(`Map with ID ${this.mapId} destroyed.`);
      }
    }
  }

  initializeMap(): void {
    this.ngOnDestroy()
  
    const mapContainer = document.getElementById(this.mapId);
  
    // Clear the container to remove any existing Leaflet DOM artifacts
    if (mapContainer) {
      mapContainer.innerHTML = '';
    }
  
    this.geocodingService.geocode(this.location).subscribe({
      next: (response) => {
        if (response.length > 0) {
          const { lat, lon } = response[0]; // Extract latitude and longitude
          this.map = L.map(this.mapId, {
            center: [parseFloat(lat), parseFloat(lon)],
            zoom: 13,
          });
  
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
          }).addTo(this.map);
        }
      },
      error: (err) => {
        console.error('Error in geocoding:', err);
      },
    });
  }

  private initializeFallbackMap(): void {
    this.ngOnDestroy()
    this.map = L.map(this.mapId, {
      center: [36.8065, 10.1815], // Default to Tunis if geocoding fails
      zoom: 6,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);
  }
}
