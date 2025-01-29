import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImagenPipePipe } from '../../auth/pipes/Imagen.pipe';
import { IUser } from '../../interfaces/IUser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tarjeta',
  imports: [MatCardModule, MatButtonModule, ImagenPipePipe,RouterModule],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css'
})
export class TarjetaComponent {
  @Input() user!: IUser;

  constructor(private SnackBar: MatSnackBar, private router : Router) { }


   erabiDetails() {
    this.router.navigate([`god/userDetails/${this.user.id}`]);
    console.log('Navigated to:', this.router.url);
    this.mostrarSnackbar('Bilera details');
  }
  mostrarSnackbar(mensaje: string) {

    this.SnackBar.open(mensaje, 'cerrar', { duration: 2000 });


  }

}
