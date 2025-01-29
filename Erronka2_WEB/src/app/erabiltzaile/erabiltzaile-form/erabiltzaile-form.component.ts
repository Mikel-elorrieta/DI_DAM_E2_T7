import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { IUser } from '../../interfaces/IUser';
import { ErabiltzaileService } from '../erabiltzaile.service';



@Component({
  selector: 'app-erabiltzaile-form',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './erabiltzaile-form.component.html',
  styleUrl: './erabiltzaile-form.component.css'
})
export class ErabiltzaileFormComponent {



  _ikasleak : IUser[] = [];
  usuario: IUser = {
    id: undefined,
    email: '',
    username: '',
    password: '',
    nombre: '',
    apellidos: '',
    dni: '',
    direccion: '',
    telefono1: undefined,
    telefono2: undefined,
    tipo_id: undefined,
    argazkia: null
  };

  matriculacion : string = '';
  curso : string = '';

  constructor(private service : ErabiltzaileService) { }

  onSubmit() {

      this.addUser(this.usuario);

  }
//REGISTRO DE USUARIO


addUser(user: IUser) {
  this.service.getUsers().subscribe({
    next: (response) => {
      console.log(response);
      this._ikasleak = response;
    },
    error: (error) => {
      console.log(error);
    }
  });

  // Asegúrate de que el objeto 'user' esté completo
  console.log('Usuario a agregar:', user);

  if (!user.id) {
    const maxId = this._ikasleak.reduce((max, item) => Math.max(max, item.id || 0), 0);
    user.id = maxId + 1;
  }

  const existingUser = this._ikasleak.find((u) => u.id === user.id);

  if (existingUser) {
    console.log("El usuario con ese ID ya existe.");
    alert("El usuario con este ID ya existe.");
    return;
  }

  this.service.addUser(user);

}


// ACTUALIZA EL IF DE USUARIO
actuID(event: Event) {
  const id = (event.target as HTMLSelectElement).value;
  this.usuario.tipo_id = parseInt(id);
}






}
