import { Component } from '@angular/core';
import { ErabiltzaileListComponent } from '../../erabiltzaile/erabiltzaile-list/erabiltzaile-list.component';
import { IReuniones } from '../../interfaces/IReuniones';
import { HomeService } from '../home.service';
@Component({
  selector: 'app-admin',
  imports: [ErabiltzaileListComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private homeS : HomeService) { }


}
