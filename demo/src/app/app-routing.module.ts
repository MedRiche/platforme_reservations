import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReservationFormComponent } from './reservation/reservation-form/reservation-form.component';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';
import { EspaceListComponent } from './espace/espace-list/espace-list.component';
import { EspaceFormComponent } from './espace/espace-form/espace-form.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { AuthGuard } from './guards/auth.guard';

import { EspaceService } from './services/espace.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'reservation', component: ReservationFormComponent, canActivate: [AuthGuard] },
  { path: 'reservation', component: ReservationListComponent, canActivate: [AuthGuard] },
 { path: 'espaces', component: EspaceListComponent },
 { path: 'espaces/ajouter', component: EspaceFormComponent },
  { path: 'espaces/modifier/:id', component: EspaceFormComponent },
  {path: 'admin/dashboard', component: DashboardComponent,},
 { path: 'admin/espaces', component: EspaceFormComponent }, // réservé aux admins
  { path: 'espaces', component: EspaceListComponent }, // réservé aux utilisateurs
  { path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'admin/espaces/add', component: EspaceFormComponent },
{ path: 'admin/espaces/edit/:id', component: EspaceFormComponent },
{path: 'admin/espaces', component: EspaceListComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }