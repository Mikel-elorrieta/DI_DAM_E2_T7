import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {

  // requpera como input una id :
  @Input() id: string = '';


  url: string = '';
  title = 'mapa';
  map!: mapboxgl.Map;
  private lat: number = 43.26271;
  private lon: number = -2.92528;


  constructor(private route: ActivatedRoute) {

  }


  ngOnInit() {


    this.mapaHasi(this.lon, this.lat);
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
          .setHTML(
            `<h3>${lat} ${lon} </h3>`)
      )
      .addTo(this.map);
  }
//Hace una llamada a la api para obtener la longitud y latitud de una dirección con una id a JSON SERVER
  getLonAndLat() {

  }

}


