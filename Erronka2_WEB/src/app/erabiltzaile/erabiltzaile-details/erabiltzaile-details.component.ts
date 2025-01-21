
import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';

import { MatSnackBar } from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { ImagenPipePipe } from '../../auth/pipes/Imagen.pipe';
import { IUser } from '../../interfaces/IUser';

@Component({

  selector: 'app-erabiltzaile-details',

  imports: [MatCardModule, MatButtonModule, CommonModule, FormsModule, TranslateModule, ImagenPipePipe],

  templateUrl: './erabiltzaile-details.component.html',

  styleUrl: './erabiltzaile-details.component.css'

})

export class ErabiltzaileDetailsComponent {

  private _user?: IUser ;



  constructor(private snackBar: MatSnackBar) {}



  mostrarSnackbar(message: string) {

    this.snackBar.open(message, 'Close', {

      duration: 2000,

    });

  }

  get user(){
    return this._user;
  }

}
