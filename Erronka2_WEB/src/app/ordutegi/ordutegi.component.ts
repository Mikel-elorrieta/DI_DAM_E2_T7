import { Component } from '@angular/core';
import { IHorarios } from '../interfaces/IHorarios';
import { HomeService } from '../home/home.service';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ordutegi',
  imports: [CommonModule],
  templateUrl: './ordutegi.component.html',
  styleUrl: './ordutegi.component.css'
})
export class OrdutegiComponent {

  ordutegia: IHorarios[] = [];

  egunak = ['L/A', 'M/A', 'X', 'J/O', 'V/O'];
  orduak = [1, 2, 3, 4, 5];

  constructor(private home: HomeService, private auth: AuthService) {
    this.ordutegiaLortu();
  }



  ordutegiaLortu() {
    const userId = this.auth.auth?.id;
    if (!userId) {
      console.log('User ID is undefined');
      return;
    }
    this.home.getOrdutegiaByID(userId).subscribe({
      next: (response) => {
        console.log(response);
        this.ordutegia = response;
        console.log(this.ordutegia);

        if (this.ordutegia.length > 1) {
          console.log(this.ordutegia[0].Profesor);
        } else {
          console.log('No hay suficientes elementos en ordutegia');
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getModulo(dia: string, hora: number): IHorarios[] {

    return this.ordutegia.filter((element) => element.Dia === dia && +element.Hora === hora);
  }

}
