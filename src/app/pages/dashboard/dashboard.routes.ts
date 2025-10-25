import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Tableau de bord',
      icon: 'dashboard'
    }
  }
];
