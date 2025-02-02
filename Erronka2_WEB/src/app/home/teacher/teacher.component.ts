import { Component } from '@angular/core';
import { ErabiltzaileListComponent } from '../../erabiltzaile/erabiltzaile-list/erabiltzaile-list.component';
import { OrdutegiComponent } from "../../ordutegi/ordutegi.component";
import { BileraComponent } from "../../bilera/bilera.component";
@Component({
  selector: 'app-teacher',
  imports: [ErabiltzaileListComponent,OrdutegiComponent, BileraComponent ],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {

}
