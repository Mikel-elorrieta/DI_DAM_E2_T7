import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { IReuniones } from '../interfaces/IReuniones';
import { AuthService } from '../auth/auth.service';
import { HomeService } from '../home/home.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { ImagenPipePipe } from '../auth/pipes/Imagen.pipe';

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
    ImagenPipePipe
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
    this.lortuBilera();
    this.bilera;
  }

  ngOnInit(): void {
    console.log('Bilera details component');
    this.lortuBilera();
  }

  mostrarSnackbar(mensaje: string) {
    this.snackBar.open(mensaje, 'cerrar', { duration: 2000 });
  }

  lortuBilera() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.mostrarSnackbar('ID ez da aurkitu');
        return;
      }

      console.log('ID de la bilera:', id);
      this.homeS.getBileraByID(id).subscribe({
        next: (bilera) => {
          setTimeout(() => {
            this._bilera = bilera; // Asignamos la bilera después del retraso
          }, 1000); // Retraso de 1 segundo
        },
        error: () => {
          this.mostrarSnackbar('Ez da bilera aurkitu');
        }
      });
    }
    );
  }
  get bilera(): IReuniones {
    return this._bilera!;
  }
}
