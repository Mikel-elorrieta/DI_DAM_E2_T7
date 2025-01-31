import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ImagenPipePipe } from '../../auth/pipes/Imagen.pipe';
import { IUser } from '../../interfaces/IUser';
import { ErabiltzaileService } from '../erabiltzaile.service';
import { AuthService } from '../../auth/auth.service';


@Component({

  selector: 'app-erabiltzaile-details',

  imports: [RouterModule, MatCardModule, MatButtonModule, CommonModule, FormsModule, TranslateModule, ImagenPipePipe],

  templateUrl: './erabiltzaile-details.component.html',

  styleUrl: './erabiltzaile-details.component.css'

})

export class ErabiltzaileDetailsComponent implements OnInit {

  private _user: IUser = {};
  private _id: number = 0;


  constructor(private snackBar: MatSnackBar, private erabiltzaileService: ErabiltzaileService, private route: ActivatedRoute, private router: Router, private auths : AuthService
  ) { }

  private _auth !: IUser | undefined;

  ngOnInit(): void {

    this._id = this.route.snapshot.params['id'];
    this._user = this.getuserBYID(this._id);
    this.auths.auth;

  }


  mostrarSnackbar(message: string) {


    this.snackBar.open(message, 'Close', {

      duration: 2000,

    });

  }

  get auth()  {
    return this.auths.auth!;
  }
  editarUsuario() {
    this.mostrarSnackbar(this.user?.nombre + ' aukeratu duzu')
    this.router.navigate([`god/editUser/${this.user.id}`]);

  }
  borrarUsuario() {
    if (!this.user?.id) {
      this.mostrarSnackbar('Error: No hay usuario seleccionado');
      return;
    }

    this.erabiltzaileService.borrarUsuario(this.user.id).subscribe(
      (response) => {
        this.mostrarSnackbar(this.user.nombre + ' ha sido eliminado');
        this.router.navigate([`home`]);
      },
      (error) => {
        console.error('Error al borrar el usuario:', error);
        this.mostrarSnackbar('Error al borrar el usuario');
      }
    );
}



  get user() {

    return this._user;
  }

  getuserBYID(id: number) {

    this.erabiltzaileService.getErabiltzaileByID(id).subscribe((user) => {

      this._user = user;

    }, (error) => {
      console.error('Error al obtener el usuario:', error);
      this.mostrarSnackbar('Error al obtener el usuario');
    });

    return this._user;
  }

}
