import { AfterViewInit, Component, OnInit } from '@angular/core';
import { icon, Map, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements AfterViewInit {

  constructor() { }


  //MAPA
  ngAfterViewInit(): void {
    const map = new Map('map28').setView([-14.086702, -75.757159], 15);

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const customIcon = icon({
        iconUrl: '../../../assets/Login.webp',
        iconSize: [25, 25],
        iconAnchor: [12, 8]
    });

    const markerInstance = marker([-14.086702, -75.757159], { icon: customIcon }).addTo(map);

    markerInstance.bindPopup('<span style="color: purple;">Eva Club Ica</span>').openPopup();
}

}
