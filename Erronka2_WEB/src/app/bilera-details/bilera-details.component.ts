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
    MatDialogModule

  ],
  templateUrl: './bilera-details.component.html',
  styleUrls: ['./bilera-details.component.css']
})
export class BileraDetailsComponent implements OnInit {

  _bilera: IReuniones | undefined;

  constructor(
    private snackBar: MatSnackBar,
    private homeS: HomeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {

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

  mostrarSnackbar(mensaje: string) {
    this.snackBar.open(mensaje, 'cerrar', { duration: 2000 });
  }

  get bilera(): IReuniones {
    return this._bilera!;
  }
}
