import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ErabiltzaileListComponent } from './erabiltzaile/erabiltzaile-list/erabiltzaile-list.component';
import { ErabiltzaileFormComponent } from './erabiltzaile/erabiltzaile-form/erabiltzaile-form.component';
import { ErabiltzaileDetailsComponent } from './erabiltzaile/erabiltzaile-details/erabiltzaile-details.component';
import { BileraComponent } from './bilera/bilera.component';
import { loginGuard } from './auth/login.guard';
import { roleGuard } from './auth/role.guard';
import { HomeComponent } from './home/home.component';
import { BileraDetailsComponent } from './bilera-details/bilera-details.component';

export const routes: Routes = [
  {
    path: '', component: LoginComponent,
  },
  {
    path: 'admin',
    canActivate: [loginGuard, roleGuard],
    data: { role: 2 },
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'users', component: ErabiltzaileListComponent },
      { path: 'addUser', component: ErabiltzaileFormComponent },
      { path: 'userDetails/:id', component: ErabiltzaileDetailsComponent },
      { path: 'bilera', component: BileraComponent },
      { path: '**', redirectTo: 'home' }
    ]
  },
  {
    path: 'god',
    canActivate: [loginGuard, roleGuard],
    data: { role: 1 },
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'users', component: ErabiltzaileListComponent },
      { path: 'addUser', component: ErabiltzaileFormComponent },
      { path: 'userDetails/:id', component: ErabiltzaileDetailsComponent },
      { path: '**', redirectTo: 'home' }
    ],
  },
  {
    path: 'ikasle',
    canActivate: [loginGuard, roleGuard],
    data: { role: 4 },
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'bilera/:id', component: BileraDetailsComponent },
      { path: '**', redirectTo: 'home' }
    ]
  }
,
  {
    path: 'irakasle',
    canActivate: [loginGuard, roleGuard],
    data: { role: 3 },
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'bilerak', component: BileraComponent },
      { path: 'list', component: ErabiltzaileListComponent },
      { path: '**', redirectTo: 'home' }
    ]
  },

  { path: '**', redirectTo: '' }
];
