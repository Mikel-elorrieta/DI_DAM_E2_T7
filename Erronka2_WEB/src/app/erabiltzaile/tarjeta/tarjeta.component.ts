import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ImagenPipePipe } from '../../auth/pipes/Imagen.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-tarjeta',
  imports: [MatCardModule, MatButtonModule, ImagenPipePipe, RouterLink,],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css'
})
export class TarjetaComponent {
  @Input() user!: IUser;

  constructor(private SnackBar: MatSnackBar) { }



  mostrarSnackbar(mensaje: string) {

    this.SnackBar.open(mensaje, 'cerrar', { duration: 2000 });


  }

}
