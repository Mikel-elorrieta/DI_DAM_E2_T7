import { Component } from '@angular/core';
import { IHorarios } from '../interfaces/IHorarios';
import { HomeService } from '../home/home.service';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ordutegi',
  imports: [CommonModule, TranslateModule],
  templateUrl: './ordutegi.component.html',
  styleUrl: './ordutegi.component.css'
})
export class OrdutegiComponent {

  ordutegia: IHorarios[] = [];

  egunak = ['L/A', 'M/A', 'X', 'J/O', 'V/O'];
  orduak = [1, 2, 3, 4, 5];

  constructor(private home: HomeService, private auth: AuthService, private translate: TranslateService) {
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
        this.ordutegia = response;


      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  getIdioma(): string {
    return this.translate.currentLang;
  }
  getModulo(dia: string, hora: number): IHorarios[] {
    return this.ordutegia.filter((element) => element.Dia === dia && +element.Hora === hora);
  }

}
