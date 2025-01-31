import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../auth/auth.service';
import { TarjetaComponent } from '../erabiltzaile/tarjeta/tarjeta.component';
import { IReuniones } from '../interfaces/IReuniones';
import { IUser } from '../interfaces/IUser';
import { AdminComponent } from './admin/admin.component';
import { GodComponent } from './god/god.component';
import { HomeService } from './home.service';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';


@Component({
  selector: 'app-home-admin',
  imports: [TranslateModule, TarjetaComponent, AdminComponent, GodComponent, StudentComponent, TeacherComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  _ikasleak : IUser[] = [];
  _irakasle : IUser[] = [];
  _admin : IUser[] = [];
  private _gaurkoBilerak: IReuniones[] = [];



  get gaurkoBilerak() {
    return this._gaurkoBilerak;
  }

  constructor(private home : HomeService ,private router: Router, private auth: AuthService, private homeS : HomeService) {

}

ngOnInit() {
this.bilerakLortu();
this.getikasleakKopuru();
this.getirakasleKopuru();
this.getAdminKopuru();
}


bilerakLortu() {
  this.homeS.getGaurkoBilerak().subscribe({
    next: (response) => {
      console.log(response);
      this._gaurkoBilerak = response;
    },
    error: (error) => {
      console.log(error);
    }
  });

}

 getRole() {
    return this.auth.auth?.tipo_id;
  }


  get user() : IUser {

    return this.auth.auth!;
  }
  getikasleakKopuru(){

    this.home.getUsers().subscribe({
      next: (response) => {
        console.log(response);
        this._ikasleak = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getirakasleKopuru(){

    this.home.getIrakas().subscribe({
      next: (response) => {
        console.log(response);
        this._irakasle = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  getAdminKopuru(){

      this.home.getAdmins().subscribe({
        next: (response) => {
          console.log(response);
          this._admin = response;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }

}
