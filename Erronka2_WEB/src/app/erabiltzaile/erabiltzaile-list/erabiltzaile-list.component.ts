import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { TarjetaComponent } from "../tarjeta/tarjeta.component";
import { ErabiltzaileService } from '../erabiltzaile.service';
import { IUser } from '../../interfaces/IUser';
import { AuthService } from '../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-erabiltzaile-list',
  imports: [MatInputModule, CommonModule, MatDivider, TarjetaComponent, MatAutocompleteModule, CommonModule, FormsModule, MatFormField, MatLabel,],
  templateUrl: './erabiltzaile-list.component.html',
  styleUrls: ['./erabiltzaile-list.component.css']
})
export class ErabiltzaileListComponent implements OnInit {
  private _ikasleak: IUser[] = [];
  filteredUsers: IUser[] = [];
  termino: string = '';

  constructor(private erabiltzaileService: ErabiltzaileService, private authS: AuthService,  private router : Router) {}

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

    // Inicialmente, mostramos todos los usuarios
    this.filteredUsers = [...this._ikasleak];
  }

  fetchUserList() {
    if (this.auth.tipo_id === 1 || this.auth.tipo_id === 2) {
      this.erabiltzaileService.getIrakas().subscribe({
        next: (response) => {
          this.addUsersToList(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }

    if (this.auth.tipo_id === 1 || this.auth.tipo_id === 2 || this.auth.tipo_id === 3) {
      this.erabiltzaileService.getUsers().subscribe({
        next: (response) => {
          this.addUsersToList(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }

    if (this.auth.tipo_id === 1) {
      this.erabiltzaileService.getAdmin().subscribe({
        next: (response) => {
          this.addUsersToList(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  buscar() {
    this.filteredUsers = this._ikasleak.filter((ikasle) =>
      ikasle.nombre?.toLowerCase().includes(this.termino.toLowerCase()) || ikasle.apellidos?.toLowerCase().includes(this.termino.toLowerCase()) ||  ikasle.dni?.toLowerCase().includes(this.termino.toLowerCase())
    );
  }

  optionSelected(selectedName: string) {
    this.filteredUsers = this._ikasleak.filter((ikasle) => ikasle.nombre === selectedName);

    this.termino = selectedName;
  }

  createUser() {
    if (this.auth.tipo_id === 1){
      this.router.navigate([`god/addUser`]);
    }
    else{
      this.router.navigate([`admin/addUser`]);
    }
  }



}
