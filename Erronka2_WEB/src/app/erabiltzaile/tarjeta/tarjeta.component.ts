import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImagenPipePipe } from '../../auth/pipes/Imagen.pipe';
import { IUser } from '../../interfaces/IUser';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-tarjeta',
  imports: [MatCardModule, MatButtonModule, ImagenPipePipe,RouterModule],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css'
})
export class TarjetaComponent {
  @Input() user!: IUser;

  constructor(private SnackBar: MatSnackBar, private router : Router, private auths : AuthService) { }


   erabiDetails() {


    if (this.auths.auth?.tipo_id === 1){
      this.router.navigate([`god/userDetails/${this.user.id}`]);
    }
    else{
      this.router.navigate([`admin/userDetails/${this.user.id}`]);
    }
    this.mostrarSnackbar('Bilera details');
  }
  mostrarSnackbar(mensaje: string) {

    this.SnackBar.open(mensaje, 'cerrar', { duration: 2000 });


  }


}
