import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // component: LandingPageRedesigned,
    loadComponent: () => import('./app.component').then(m => m.AppComponent),
    canActivate: [ ]
  },
];
