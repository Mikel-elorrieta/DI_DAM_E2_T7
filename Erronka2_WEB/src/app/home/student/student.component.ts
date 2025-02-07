import { Component } from '@angular/core';
import { OrdutegiComponent } from "../../ordutegi/ordutegi.component";
import { BileraComponent } from "../../bilera/bilera.component";
@Component({
  selector: 'app-student',
  imports: [OrdutegiComponent, BileraComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {

  constructor() { }



}

