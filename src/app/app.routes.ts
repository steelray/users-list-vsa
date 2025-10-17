import { Routes } from '@angular/router';
import { USER_PORT, UserMockAdapter } from '@libs/user';

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.routes').then(m => m.UsersRoutes),
    providers: [
      {
        provide: USER_PORT,
        useClass: UserMockAdapter // switch to http adapter when http client configed and api integrated
      }
    ]
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  }
];
