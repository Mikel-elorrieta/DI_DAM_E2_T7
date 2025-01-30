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

     // this.addUser(this.usuario);
this.guardar(this.usuario);
  }
//REGISTRO DE USUARIO


addUser(user: IUser) {

  this.service.addUser(user);

}
guardar(user: IUser) {
  this.service.crearUsuario(user).subscribe(response => {
    console.log('Usuario creado:', response);
    alert('Usuario creado correctamente');
  }, error => {
    console.error('Error al crear usuario:', error);
    alert('Hubo un error al crear el usuario');
  });
}

// ACTUALIZA EL IF DE USUARIO
actuID(event: Event) {
  const id = (event.target as HTMLSelectElement).value;
  this.usuario.tipo_id = parseInt(id);
}






}
