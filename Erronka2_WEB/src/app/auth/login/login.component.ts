import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../interfaces/IUser';
import { TranslateModule } from '@ngx-translate/core';



@Component({
  selector: 'app-login',
  imports: [TranslateModule, MatDialogModule, CommonModule, FormsModule, MatDividerModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule, MatOptionModule, MatButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  Username: string = '';
  Pass: string = '';
  _User!: IUser;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,

  ) {}

ngOnInit() {
  this.authService.logout();
}

  login() {
    if (!this.Username || !this.Pass) {
      this.mostrarSnackbar('Introduce usuario y contraseña');
      return;
    }

    this.authService.login(this.Username, this.Pass).subscribe(
      (response) => {
        this._User = response.user;

        if (this._User) {
          this.authService.guardar(this._User);

          this.mostrarSnackbar('Inicio de sesión exitoso: ' + this._User.nombre);

          this.gohome();
        } else {
          this.Username = '';
          this.Pass = '';
          this.mostrarSnackbar('Credenciales incorrectas');
        }
      },
      (error) => {
        console.error('Error en la solicitud de login', error);
        this.mostrarSnackbar('Ocurrió un error al intentar iniciar sesión');
      }
    );
  }

  gohome() {
    switch (this._User.tipo_id) {
      case 1:
        this.router.navigate(['god/home']);
        break;
      case 2:
        this.router.navigate(['admin/home']);
        break;
      case 3:
        this.router.navigate(['irakasle/home']);
        break;
      case 4:
        this.router.navigate(['ikasle/home']);
        break;

    }
  }

 mostrarSnackbar(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', { duration: 2500 });
  }
}
