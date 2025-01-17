import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { TarjetaComponent } from "../tarjeta/tarjeta.component";
import { ErabiltzaileService } from '../erabiltzaile.service';
import { IUser } from '../../interfaces/IUser';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-erabiltzaile-list',
  imports: [CommonModule, MatDivider, TarjetaComponent],
  templateUrl: './erabiltzaile-list.component.html',
  styleUrls: ['./erabiltzaile-list.component.css']
})
export class ErabiltzaileListComponent implements OnInit {
  private _ikasleak: IUser[] = [];

  constructor(private erabiltzaileService: ErabiltzaileService, private authS: AuthService) {}

  get auth() {
    return this.authS.auth!;
  }

  ngOnInit() {
    this.fetchUserList();
  }

  // Función para agregar usuarios a la lista
  private addUsersToList(response: IUser | IUser[]) {
    if (Array.isArray(response)) {
      this._ikasleak = [...this._ikasleak, ...response];
    } else {
      this._ikasleak.push(response);
    }
  }

  fetchUserList() {
    // Primero, comprobamos si el rol es 1 o 2 (se obtiene "Irakas")
    if (this.auth.tipo_id === 1 || this.auth.tipo_id === 2) {
      this.erabiltzaileService.getIrakas().subscribe({
        next: (response) => {
          console.log('Irakas:', response);
          this.addUsersToList(response); // Usamos la función para agregar los usuarios
        },
        error: (error) => {
          console.log(error);
        }
      });
    }

    // Si el rol es 1, 2 o 3, se obtiene "Users"
    if (this.auth.tipo_id === 1 || this.auth.tipo_id === 2 || this.auth.tipo_id === 3) {
      this.erabiltzaileService.getUsers().subscribe({
        next: (response) => {
          console.log('Users:', response);
          this.addUsersToList(response); // Usamos la función para agregar los usuarios
        },
        error: (error) => {
          console.log(error);
        }
      });
    }

    // Si el rol es 1, se obtiene "Admin"
    if (this.auth.tipo_id === 1) {
      this.erabiltzaileService.getAdmin().subscribe({
        next: (response) => {
          console.log('Admin:', response);
          this.addUsersToList(response); // Usamos la función para agregar los usuarios
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  // Propiedad para obtener la lista de usuarios
  get userList(): IUser[] {
    return this._ikasleak;
  }
}
