import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {  RouterLink, RouterOutlet } from '@angular/router';
import { HomeService } from '../home.service';
import { IUser } from '../../interfaces/IUser';
import { ErabiltzaileListComponent } from "../../erabiltzaile/erabiltzaile-list/erabiltzaile-list.component";

@Component({
  selector: 'app-god',
  imports: [RouterModule, CommonModule, FormsModule, TranslateModule, MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, RouterOutlet, ErabiltzaileListComponent],
  templateUrl: './god.component.html',
  styleUrl: './god.component.css'
})
export class GodComponent {


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private home : HomeService) {
  }



}
