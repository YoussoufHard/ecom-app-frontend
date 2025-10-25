import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      },
      {
        path: 'customers',
        loadChildren: () => import('./pages/customers/customers.routes').then(m => m.CUSTOMER_ROUTES)
      },
      {
        path: 'products',
        loadChildren: () => import('./pages/products/products.routes').then(m => m.PRODUCT_ROUTES)
      },
      {
        path: 'bills',
        loadChildren: () => import('./pages/bills/bills.routes').then(m => m.BILL_ROUTES)
      },
      {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.routes').then(m => m.SETTINGS_ROUTES)
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];
