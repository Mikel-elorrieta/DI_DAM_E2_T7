import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/IUser';
import { environment } from '../../environments/environment';


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
}
