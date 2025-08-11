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
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';





import { EspaceService } from './services/espace.service';
import { UpdateEspaceComponent } from './admin/espaces_admin/update-espace/update-espace.component';
import { ListAdminComponent } from './admin/espaces_admin/list-admin/list-admin.component';

import { ProfilComponent } from './profil/profil/profil.component';
import { ReservationAdminListComponent } from './admin/reservation/reservation-admin-list/reservation-admin-list.component';

const routes: Routes = [
    // Auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Utilisateur normal
  { path: 'espaces', component: EspaceListComponent },
  { path: 'reservation', component: ReservationFormComponent, canActivate: [AuthGuard] },
  { path: 'reservation', component: ReservationListComponent, canActivate: [AuthGuard] },

   // Admin
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'admin/dashboard', component: DashboardComponent,},
  { path: 'espaces', component: EspaceListComponent }, // réservé aux utilisateurs
{ path: 'admin/espaces/add', component: EspaceFormComponent },
{ path: 'admin/espaces/edit/:id', component: UpdateEspaceComponent },
{path: 'admin/espaces', component: EspaceListComponent },
{path : 'admin/update-espace/:id', component: UpdateEspaceComponent},
{ path : 'admin/espace-form', component: EspaceFormComponent },
{ path: 'admin/esp', component: ListAdminComponent},
{path: 'admin/list-espaces', component: ListAdminComponent , canActivate: [AuthGuard]},
{path: 'admin/users', component: UsersComponent, canActivate: [AuthGuard]},
{path: 'admin/reservations', component: ReservationAdminListComponent, canActivate: [AuthGuard]},

{ path: 'profil', component: ProfilComponent },
{ path: 'mes-reservations', component: ReservationListComponent },


 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
