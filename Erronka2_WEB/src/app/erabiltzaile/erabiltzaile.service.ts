import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/IUser';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ErabiltzaileService {
  constructor(private http: HttpClient, private router: Router) { }
  private _ikasleak: IUser[] = [];
  getUsers() {
    return this.http.get<IUser[]>(`${environment.baseUrl}/ikasleak`);
  }
  getIrakas() {
    return this.http.get<IUser[]>(`${environment.baseUrl}/irakasleak`);
  }
  getAdmin() {
    return this.http.get<IUser[]>(`${environment.baseUrl}/admins`);
  }
  getErabiltzaileByID(id?: number) {

    return this.http.get<IUser>(`${environment.baseUrl}/user/${id}`);
  }
  crearUsuario(user: any, curso: number , ciclo_id: number ): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/addUser`, {
      user,
      curso,
      ciclo_id
    });
  }

  editarUsuario(user: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/updateUser`, user);
  }
  borrarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/deleteUser/${id}`);
  }
}
