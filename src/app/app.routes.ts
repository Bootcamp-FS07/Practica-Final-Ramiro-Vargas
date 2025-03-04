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
    /*{
      path: '',
      component: LayoutComponent,
      children: [
        { path: '', component: ProfileComponent },
        {
          path: 'cosmic-latte',
          component: CosmicLatteComponent,
          canActivate: [authGuard],
        },
        {
          path: 'heat-map',
          component: HeatMapComponent,
          canActivate: [authGuard],
        },
        {
          path: 'import-answers',
          component: ImportAnswersComponent,
          canActivate: [authGuard],
        },
        {
          path: 'list-polls-by-cohort',
          component: ListPollsByCohortComponent,
          canActivate: [authGuard],
        },
        {
          path: 'import-students',
          component: ImportStudentsComponent,
          canActivate: [authGuard],
        },
        {
          path: 'list-students-by-poll',
          component: ListStudentsByPollComponent,
          canActivate: [authGuard],
        },
        {
          path: 'list-polls-by-lastDays',
          component: ListPollInstancesByLastDaysComponent,
          canActivate: [authGuard],
        },
        //Example to use guard with role
        {
          path: 'forbidden',
          component: ProfileComponent,
          canActivate: [canActivateAuthRole],
          data: { role: 'admin' },
        },
      ],
    },*/
  ];
