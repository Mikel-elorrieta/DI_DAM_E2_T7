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

  constructor(private home: HomeService, private auth: AuthService) {
    this.ordutegiaLortu();
  }

  ordutegiaLortu() {
    this.home.getOrdutegiaByID(this.auth.auth?.id).subscribe({
      next: (response) => {
        console.log(response);
        this.ordutegia = response;


        if (this.ordutegia.length > 1) {
          console.log(this.ordutegia[1].hora);
        } else {
          console.log('No hay suficientes elementos en ordutegia');
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
