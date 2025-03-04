import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login/login.component';
import { RegisterComponent } from './features/register/register/register.component';
import { HomeComponent } from './features/home/home/home.component';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: '', component: LayoutComponent,
        children: [
            {path: '',component: HomeComponent}
        ]
    },
  ];
