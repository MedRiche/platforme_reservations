
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Routes } from '@angular/router';
import { ReservationFormComponent } from './reservation/reservation-form/reservation-form.component';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';
import { EspaceListComponent } from './espace/espace-list/espace-list.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { EspaceFormComponent } from './espace/espace-form/espace-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EspaceService } from './services/espace.service';
import { UpdateEspaceComponent } from './admin/espaces_admin/update-espace/update-espace.component';
import { ListAdminComponent } from './admin/espaces_admin/list-admin/list-admin.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EspaceFormComponent,
    EspaceListComponent,
    ReservationFormComponent,
    ReservationListComponent,
    DashboardComponent,
    UsersComponent,
    HeaderComponent,
    SidebarComponent, 
    UpdateEspaceComponent,
    ListAdminComponent,


    
  ],
  imports: [
     BrowserModule,
    FormsModule, // <- Ajoute ceci si absent
    HttpClientModule,
    AppRoutingModule,
    CommonModule ,
     ReactiveFormsModule,
     BrowserAnimationsModule,
    MatSnackBarModule,
    CommonModule,

    
  ],
 providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }