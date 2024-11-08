import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';



@Component({
  selector: 'app-map',
  standalone: true,
  imports: [RouterOutlet,GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  // Coordonnées de la carte (par exemple, centré sur Bizerte)
  center = { lat: 37.2746, lng: 9.8739 };
  zoom = 8;

  // Liste des emplacements des terrains à vendre
  terrains = [
    { lat: 37.2746, lng: 9.8739, label: 'Terrain 1' },
    { lat: 37.2946, lng: 9.8839, label: 'Terrain 2' },
    { lat: 37.3146, lng: 9.8939, label: 'Terrain 3' },
  ];
}
