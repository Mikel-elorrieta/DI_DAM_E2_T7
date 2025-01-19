import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { HomeService } from '../../home/home.service';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-header',
  imports: [TranslateModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor (private translateService: TranslateService, private home : HomeService, private router : Router) {}

  /**
   * Hautatutako hizkuntza lortzen du HTMLSelectElement-etik eta itzulpen zerbitzua erabiltzen du hizkuntza hori aplikatzeko.
   *
   * @param event - HTMLSelectElement elementutik datorren gertaera.
   */
  translatetext (event: Event) {

  const lang = (event.target as HTMLSelectElement).value
	this.translateService.use(lang);
  }




  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }


}
