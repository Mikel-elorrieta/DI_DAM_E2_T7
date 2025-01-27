import { Iikastetxeak } from './../interfaces/Iikastetxeak';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import * as mapboxgl from 'mapbox-gl';
import { MapaService } from './mapa.service';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {

  @Input() id: Number = 0;
  title = 'mapa';
  map!: mapboxgl.Map;
  private lat: number = 43.26271;
  private lon: number = -2.92528;
  private _ikastetxe: Iikastetxeak | undefined;

  constructor(private route: ActivatedRoute, private service: MapaService) {}

  ngOnInit() {
    console.log("Mapa " + this.id);
    this.getLonAndLat();
  }

  async getLonAndLat() {
    try {
      this._ikastetxe = await this.service.findIkastetxeById(this.id);
      console.log(this._ikastetxe);

      this.lat = this._ikastetxe?.LATITUD || 43.26271;
      this.lon = this._ikastetxe?.LONGITUD || -2.92528;

      this.mapaHasi( this.lat, this.lon);
    } catch (error) {
      console.error('Error al obtener la latitud y longitud:', error);
    }
  }

  mapaHasi(lon: number, lat: number) {
    this.map = new mapboxgl.Map({
      container: 'mapa',
      accessToken: 'pk.eyJ1IjoiaXR6aS1hciIsImEiOiJjbTR0cnJvbmgwOG1xMmpyOXphYnk2YXA3In0.nvbObADvRjZvchA9t_gJog',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lon, lat],
      zoom: 10
    });

    this.addMarker(lon, lat);
  }

  addMarker(lon: number, lat: number) {
    const micolor = "#xxxxxx".replace(/x/g, (y) => (Math.random() * 16 | 0).toString(16));
    new mapboxgl.Marker({ color: micolor })
      .setLngLat([lon, lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h3 style="margin: 0; color: #007BFF;">${this._ikastetxe?.NOM}</h3>
          <p style="margin: 0;">Municipio: ${this._ikastetxe?.DMUNIC}</p>
          <p style="margin: 0;">Dirección: ${this._ikastetxe?.DOMI}</p>
          <p style="margin: 0;">Código Postal: ${this._ikastetxe?.CPOS}</p>
          <p style="margin: 0;">Teléfono: ${this._ikastetxe?.TEL1}</p>
          <p style="margin: 0;">Email: <a href="mailto:${this._ikastetxe?.EMAIL}">${this._ikastetxe?.EMAIL}</a></p>
          <p style="margin: 0;">Página Web: <a href="${this._ikastetxe?.PAGINA}" target="_blank">${this._ikastetxe?.PAGINA}</a></p>
        </div>
        `)
      )
      .addTo(this.map);
  }
}
