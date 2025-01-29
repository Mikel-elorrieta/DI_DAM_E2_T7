import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/IUser';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ErabiltzaileService {

  constructor(private http : HttpClient,  private router: Router) { }


  private _ikasleak : IUser[] = [];



    getUsers() {

      return this.http.get<IUser[]>(`${environment.baseUrl}/ikasleak`);



    }


    getIrakas() {

      return this.http.get<IUser[]>(`${environment.baseUrl}/irakasleak`);



    }
    getAdmin() {

      return this.http.get<IUser[]>(`${environment.baseUrl}/admin`);



    }
    getErabiltzaileByID(id?: number) {

      return this.http.get<IUser>(`${environment.baseUrl}/user/${id}`);
    }


    addUser(user : IUser) {
      console.log('User:', user);

      return this.http.post<IUser>(`${environment.baseUrl}/addUser`, user);

    }





}
