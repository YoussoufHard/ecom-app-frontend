import { Routes } from '@angular/router';

export const BILL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./bill-list/bill-list.component').then(m => m.BillListComponent),
    data: {
      title: 'Factures',
      icon: 'receipt'
    }
  },
  {
    path: 'new',
    loadComponent: () => import('./bill-form/bill-form.component').then(m => m.BillFormComponent),
    data: {
      title: 'Nouvelle facture',
      breadcrumb: 'Nouvelle'
    }
  },
  {
    path: ':id',
    loadComponent: () => import('./bill-details/bill-details.component').then(m => m.BillDetailsComponent),
    data: {
      title: 'Détails de la facture',
      breadcrumb: 'Détails'
    }
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./bill-form/bill-form.component').then(m => m.BillFormComponent),
    data: {
      title: 'Modifier la facture',
      breadcrumb: 'Modifier'
    }
  }
];