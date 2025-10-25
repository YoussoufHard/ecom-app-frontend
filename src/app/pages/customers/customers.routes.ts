import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';

export const CUSTOMER_ROUTES: Routes = [
  {
    path: '',
    component: CustomerListComponent,
    data: {
      title: 'Clients',
      icon: 'people'
    }
  },
  {
    path: 'new',
    loadComponent: () => import('./customer-form/customer-form.component').then(m => m.CustomerFormComponent),
    data: {
      title: 'Nouveau client',
      breadcrumb: 'Nouveau'
    }
  },
  {
    path: ':id',
    loadComponent: () => import('./customer-details/customer-details.component').then(m => m.CustomerDetailsComponent),
    data: {
      title: 'Détails du client',
      breadcrumb: 'Détails'
    }
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./customer-form/customer-form.component').then(m => m.CustomerFormComponent),
    data: {
      title: 'Modifier le client',
      breadcrumb: 'Modifier'
    }
  }
];
