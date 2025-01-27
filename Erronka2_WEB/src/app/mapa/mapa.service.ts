import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iikastetxeak } from '../models/ikastetxeak.model'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  constructor(private http : HttpClient) { }

  private _jatetxeak: Iikastetxeak[] = [];

// Get jatetxeak via api Json localhost3000/Ikatetxeak
  get jatetxeak() : Iikastetxeak[] {

      this.http.get<Iikastetxeak[]>('http://localhost:3000/Ikatetxeak').subscribe({
        next: (data) => { this._jatetxeak = data; },
        error: (err) => { console.error(err); },
        complete: () => { console.log(this._jatetxeak); }
      });

    return this._jatetxeak;

  }

}
