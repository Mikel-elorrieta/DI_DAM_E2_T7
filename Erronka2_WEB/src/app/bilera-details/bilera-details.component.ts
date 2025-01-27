import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HomeService } from '../home/home.service';
import { IReuniones } from '../interfaces/IReuniones';
import { MapaComponent } from '../mapa/mapa.component';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-bilera-details',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule,
    MatSelectModule,
    FormsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatDialogModule,
    MapaComponent,
    HeaderComponent,
    FooterComponent
],
  templateUrl: './bilera-details.component.html',
  styleUrls: ['./bilera-details.component.css']
})
export class BileraDetailsComponent implements OnInit {

  _bilera = <IReuniones>{ id_reunion: 0, estado: '', estado_eus: null, profesor_id: 0, alumno_id: 0, id_centro: '', titulo: '', asunto: '', aula: '', fecha: new Date()};



  constructor(
    private snackBar: MatSnackBar,
    private homeS: HomeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }
  id: Number = 0;
ngOnInit(): void {
    this.bileraLortu();
  }


  mostrarSnackbar(mensaje: string) {
    this.snackBar.open(mensaje, 'cerrar', { duration: 2000 });
  }

  get bilera(): IReuniones {
    return this._bilera;
  }


  bileraLortu() {
    this.homeS.getBileraByID(this.route.snapshot.paramMap.get('id')!).subscribe(
      (response) => {
        console.log('Bilera lortu da:', response);
        this._bilera = response;
      },
      (error) => {
        console.error('Errorea bilera lortzean:', error);
      }
    );
  }




  //EL ID DEL CENTRO ES EL CCEN = bilera.id_centro



  //MAPA DE

}
