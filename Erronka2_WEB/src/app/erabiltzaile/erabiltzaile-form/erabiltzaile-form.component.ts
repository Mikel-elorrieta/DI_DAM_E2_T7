import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../interfaces/IUser';
import { ErabiltzaileService } from '../erabiltzaile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../auth/auth.service';



@Component({
  selector: 'app-erabiltzaile-form',
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './erabiltzaile-form.component.html',
  styleUrl: './erabiltzaile-form.component.css'
})
export class ErabiltzaileFormComponent {


  _ikasleak: IUser[] = [];
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

  matriculacion: number = 0;
  curso: number = 0;

  constructor(private service: ErabiltzaileService, private route: ActivatedRoute, private auths : AuthService,private router : Router) { }

  onSubmit() {
    console.log('Usuario:', this.usuario.id);


    if (this.usuario.id === undefined) {
      this.guardar(this.usuario);
    } else {
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
    this.service.crearUsuario(user, this.curso, this.matriculacion).subscribe(() => {

      alert('Usuario creado correctamente');
      if(this.auths.logeatutaDago()){
        switch(this.auths.auth?.tipo_id){
          case 1:
            this.router.navigate(['god/home']);
            break;
          case 2:
            this.router.navigate(['admin/home']);
            break;
        }
      }
    }, (error: any) => {
      alert('Hubo un error al crear el usuario');
    });
  }
  editar(user: IUser) {
    this.service.editarUsuario(user).subscribe(response => {

      if(this.auths.logeatutaDago()){
        switch(this.auths.auth?.tipo_id){
          case 1:
            this.router.navigate(['god/home']);
            break;
          case 2:
            this.router.navigate(['admin/home']);
            break;
        }
      }

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
