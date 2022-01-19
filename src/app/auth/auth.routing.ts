import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const authRouting: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'register', component: RegisterComponent }
];
