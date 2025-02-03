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

    TranslateModule
],
  templateUrl: './bilera-details.component.html',
  styleUrls: ['./bilera-details.component.css']
})
export class BileraDetailsComponent implements OnInit {

  _bilera = <IReuniones>{ id_reunion: 0, estado: '', estado_eus: null, profesor_id: 0, alumno_id: 0, id_centro: '', titulo: '', asunto: '', aula: '', fecha: new Date()};

  private r1 : string = '';
  private r2 : string = '';

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
        this.bilerareUser();

      },
      (error) => {
        console.error('Errorea bilera lortzean:', error);
      }
    );

  }
  //RECUPERA UN ARRAY DE DOS STRINGS CON LOS NOMBRES DE LOS USUARIOS QUE PARTICIPAN EN LA REUNION EL PRIMERO ES EL PROFESOR Y EL SEGUNDO EL ALUMNO
  bilerareUser(): void {
    console.log('Solicitando nombres con IDs:', this._bilera.profesor_id, this._bilera.alumno_id);

    this.homeS.getBileraUsers(this._bilera.profesor_id, this._bilera.alumno_id).subscribe({
      next: (response) => {
        console.log('Respuesta recibida:', response);
        if (response.length === 2) {
          this.r1 = response[0];
          this.r2 = response[1];
        } else {
          console.warn('Formato inesperado en la respuesta:', response);
        }
      },
      error: (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    });
  }

  get user1(): string {
    return this.r1;
  }

  get user2(): string {
    return this.r2;
  }

}
