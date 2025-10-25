import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./product-list/product-list').then(m => m.ProductListComponent),
    title: 'Products - Ecom App'
  },
  {
    path: 'new',
    loadComponent: () => import('./product-form/product-form').then(m => m.ProductFormComponent),
    title: 'New Product - Ecom App'
  },
  {
    path: ':id',
    loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent),
    title: 'Product Details - Ecom App'
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./product-form/product-form').then(m => m.ProductFormComponent),
    title: 'Edit Product - Ecom App'
  }
];
