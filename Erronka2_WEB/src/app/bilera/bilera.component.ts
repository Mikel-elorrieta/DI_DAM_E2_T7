import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from '../interfaces/IUser';
import { TranslateModule } from '@ngx-translate/core';
import { IReuniones } from '../interfaces/IReuniones';
import { AuthService } from '../auth/auth.service';
import { HomeService } from '../home/home.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bilera',
  imports: [CommonModule, MatCardModule, MatButtonModule, TranslateModule],
  templateUrl: './bilera.component.html',
  styleUrl: './bilera.component.css'
})
export class BileraComponent {
  @Input() user!: IUser;

  bilerak : IReuniones[] = [];

  constructor(private SnackBar: MatSnackBar, private auth : AuthService, private homeS : HomeService, private router : Router) { }


  ngOnInit(): void {
   this.bilerakLortu();

  }


  mostrarSnackbar(mensaje: string) {


    this.SnackBar.open(mensaje, 'cerrar', { duration: 2000 });


  }

  bileraDetails(id: number) {
    this.router.navigate([`ikasle/bilera/${id}`]);
    console.log('Navigated to:', this.router.url);
    this.mostrarSnackbar('Bilera details');
  }





  bilerakLortu() {
    const userId = this.auth.auth?.id;
    if (!userId) {
      console.log('User ID is undefined');
      return;
    }
    this.homeS.getBilerakByID(userId).subscribe({
      next: (response) => {
        console.log('Bilerak lortu');
        this.bilerak = response;
        console.log(this.bilerak);
      },
      error: (error) => {
        console.log(error);
      }
    });



}
}

