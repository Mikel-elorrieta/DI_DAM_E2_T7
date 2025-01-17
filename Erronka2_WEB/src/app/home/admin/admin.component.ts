import { Component } from '@angular/core';
import { ErabiltzaileListComponent } from '../../erabiltzaile/erabiltzaile-list/erabiltzaile-list.component';

@Component({
  selector: 'app-admin',
  imports: [ErabiltzaileListComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
