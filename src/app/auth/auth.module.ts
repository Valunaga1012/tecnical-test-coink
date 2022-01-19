import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authRouting } from './auth.routing';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { PasoUnoComponent } from './register/paso-uno/paso-uno.component';
import { PasoDosComponent } from './register/paso-dos/paso-dos.component';
import { PasoTresComponent } from './register/paso-tres/paso-tres.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent, 
    PasoUnoComponent, 
    PasoDosComponent, 
    PasoTresComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRouting),
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    ReactiveFormsModule,FormsModule
  ]
})
export class AuthModule { }
