import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iikastetxeak } from '../interfaces/Iikastetxeak';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapaService {
  constructor(private http: HttpClient) {}

  async getIkastetxeak(): Promise<Iikastetxeak[]> {
    try {
      return await lastValueFrom(this.http.get<Iikastetxeak[]>('http://localhost:3000/IKASTETXEAK'));
    } catch (error) {
      console.error('Error al obtener ikastetxeak:', error);
      return [];
    }
  }

  async findIkastetxeById(id: Number): Promise<Iikastetxeak | undefined> {
    try {
      const ikastetxeak = await this.getIkastetxeak();
      return ikastetxeak.find((ikastetxe) => ikastetxe.CCEN === id);
    } catch (error) {
      console.error('Error al buscar el ikastetxe:', error);
      return undefined;
    }
  }
}
