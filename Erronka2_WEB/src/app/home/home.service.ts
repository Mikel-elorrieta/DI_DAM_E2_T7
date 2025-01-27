import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/IUser';
import { environment } from '../environments/environment';
import { IReuniones } from '../interfaces/IReuniones';
import { IHorarios } from '../interfaces/IHorarios';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private _auth: IUser | undefined;
  constructor(private http: HttpClient, private router: Router) { }


  getUsers() {

    return this.http.get<IUser[]>(`${environment.baseUrl}/ikasleak`);

  }
  getIrakas() {

    return this.http.get<IUser[]>(`${environment.baseUrl}/irakasleak`);

  }

  getGaurkoBilerak() {
    return this.http.get<IReuniones[]>(`${environment.baseUrl}/gaurkoBilerak`);

  }
  getGaurkoBilerakByID() {

    return this.http.get<IReuniones[]>(`${environment.baseUrl}/gaurkoBilerak/${this._auth?.id}`);

  }

  getOrdutegiaByID(id?: number) {


    return this.http.get<IHorarios[]>(`${environment.baseUrl}/ordutegia/${id}`);
  }
  //Erabiltzaile baten bilerak
    getBilerakByID(id?: number) {

      return this.http.get<IReuniones[]>(`${environment.baseUrl}/bilerak/${id}`);



    }

    //Bilera id baten bilerak
    getBileraByID(id?: string) {

      return this.http.get<IReuniones>(`${environment.baseUrl}/bilera/${id}`);

    }
}
