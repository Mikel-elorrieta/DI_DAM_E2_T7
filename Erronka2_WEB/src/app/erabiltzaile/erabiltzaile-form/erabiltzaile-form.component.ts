import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../interfaces/IUser';
import { ErabiltzaileService } from '../erabiltzaile.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-erabiltzaile-form',
  imports: [CommonModule, FormsModule ],
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

  constructor(private service : ErabiltzaileService, private route : ActivatedRoute) { }

  onSubmit() {
    console.log('Usuario:', this.usuario.id);


    if (this.usuario.id === undefined) {
      this.guardar(this.usuario);
    }else{
      this.editar(this.usuario);
    }
  }
//REGISTRO DE USUARIO
ngOnInit(): void {


this.route.params.subscribe(params => {
  const id = params['id'];
  if (id) {
    this.service.getErabiltzaileByID(id).subscribe(response => {
      this.usuario = response;
    });
  }

});

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
editar(user: IUser) {
  this.service.editarUsuario(user).subscribe(response => {
    console.log('Usuario editado:', response);
    alert('Usuario editado correctamente');
  }, error => {
    console.error('Error al editar usuario:', error);
    alert('Hubo un error al editar el usuario');
  });
}

// ACTUALIZA EL IF DE USUARIO
actuID(event: Event) {
  const id = (event.target as HTMLSelectElement).value;
  this.usuario.tipo_id = parseInt(id);
}

}
