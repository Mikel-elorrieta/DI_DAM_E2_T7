import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/IUser';
import { environment } from '../environments/environment';
import { IReuniones } from '../interfaces/IReuniones';
import { IHorarios } from '../interfaces/IHorarios';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _auth: IUser | undefined;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authS: AuthService
  ) {}

  getUsers() {
    return this.http.get<IUser[]>(`${environment.baseUrl}/ikasleak`);
  }
  getIrakas() {
    return this.http.get<IUser[]>(`${environment.baseUrl}/irakasleak`);
  }
  getAdmins() {
    return this.http.get<IUser[]>(`${environment.baseUrl}/admins`);
  }

  getGaurkoBilerak() {
    return this.http.get<IReuniones[]>(`${environment.baseUrl}/gaurkoBilerak`);
  }
  getGaurkoBilerakByID() {
    return this.http.get<IReuniones[]>(
      `${environment.baseUrl}/gaurkoBilerak/${this._auth?.id}`
    );
  }

  getOrdutegiaByID(id?: number) {
    if (this.authS.auth?.tipo_id == 4) {
      return this.http.get<IHorarios[]>(
        `${environment.baseUrl}/ordutegia/${id}`
      );
    } else {
      return this.http.get<IHorarios[]>(
        `${environment.baseUrl}/ordutegiaIrakasle/${id}`
      );
    }
  }

  getBilerakByID(id?: number) {
    return this.http.get<IReuniones[]>(`${environment.baseUrl}/bilerak/${id}`);
  }

  getBileraByID(id?: string) {
    return this.http.get<IReuniones>(`${environment.baseUrl}/bilera/${id}`);
  }

  getBileraUsers(profe_id: number , alumno_id : number) {
    return this.http.post<string[]>(`${environment.baseUrl}/bileraUsers`, {profe_id, alumno_id});
  }
}
