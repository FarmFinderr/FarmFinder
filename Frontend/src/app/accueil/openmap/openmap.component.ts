import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


// Corrige les icônes par défaut de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  iconUrl: 'assets/leaflet/marker-icon.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png',
});


@Component({
  selector: 'app-openmap',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './openmap.component.html',
  styleUrl: './openmap.component.css'
})
export class OpenmapComponent  implements OnInit {

  private map: any;

  ngOnInit(): void {
    this.map = L.map('map').setView([37.2746, 9.8739], 8);  // Centré sur Bizerte

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 8,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Ajouter un marqueur
    L.marker([37.2746, 9.8739]).addTo(this.map).bindPopup('Terrain 1').openPopup();
  }

}

