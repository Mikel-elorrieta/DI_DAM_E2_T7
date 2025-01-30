import { Component, OnInit } from '@angular/core';
import { ErabiltzaileService } from '../erabiltzaile.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ImagenPipePipe } from '../../auth/pipes/Imagen.pipe';
import { IUser } from '../../interfaces/IUser';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({

  selector: 'app-erabiltzaile-details',

  imports: [RouterModule, MatCardModule, MatButtonModule, CommonModule, FormsModule, TranslateModule, ImagenPipePipe],

  templateUrl: './erabiltzaile-details.component.html',

  styleUrl: './erabiltzaile-details.component.css'

})

export class ErabiltzaileDetailsComponent implements OnInit {

  private _user : IUser =  {}  ;
  private _id: number = 0;


  constructor(private snackBar: MatSnackBar, private erabiltzaileService: ErabiltzaileService, private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {

      this._id = this.route.snapshot.params['id'];
      this._user = this.getuserBYID( this._id);
      console.log('Usuario:', this._user);

    }







  mostrarSnackbar(message: string) {


    this.snackBar.open(message, 'Close', {

      duration: 2000,

    });

  }

  get user(){

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
