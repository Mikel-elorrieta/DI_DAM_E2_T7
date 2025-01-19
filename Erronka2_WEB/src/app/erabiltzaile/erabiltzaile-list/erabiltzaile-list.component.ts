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

  private addUsersToList(response: IUser | IUser[]) {
    if (Array.isArray(response)) {
      this._ikasleak = [...this._ikasleak, ...response];
    } else {
      this._ikasleak.push(response);
    }
  }

  fetchUserList() {

    if (this.auth.tipo_id === 1 || this.auth.tipo_id === 2) {
      this.erabiltzaileService.getIrakas().subscribe({
        next: (response) => {
          console.log('Irakas:', response);
          this.addUsersToList(response);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }

    if (this.auth.tipo_id === 1 || this.auth.tipo_id === 2 || this.auth.tipo_id === 3) {
      this.erabiltzaileService.getUsers().subscribe({
        next: (response) => {
          console.log('Users:', response);
          this.addUsersToList(response);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }

    if (this.auth.tipo_id === 1) {
      this.erabiltzaileService.getAdmin().subscribe({
        next: (response) => {
          console.log('Admin:', response);
          this.addUsersToList(response);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  get userList(): IUser[] {
    return this._ikasleak;
  }
}
