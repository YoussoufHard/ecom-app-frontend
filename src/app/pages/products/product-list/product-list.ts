import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product, ProductResponse } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'price', 'stockQuantity', 'category', 'status', 'actions'];
  products: Product[] = [];
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;
  searchTerm = '';
  isLoading = true;
  error: string | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts(this.pageIndex, this.pageSize, this.searchTerm)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response) => {
          this.products = response.content;
          this.totalItems = response.totalElements;
        },
        error: (err) => {
          this.error = 'Erreur lors du chargement des produits';
          console.error('Error loading products', err);
        }
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  onSearch(): void {
    this.pageIndex = 0;
    this.loadProducts();
  }

  deleteProduct(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => {
          console.error('Error deleting product', err);
          this.error = 'Erreur lors de la suppression du produit';
        }
      });
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'IN_STOCK':
        return 'badge-success';
      case 'LOW_STOCK':
        return 'badge-warning';
      case 'OUT_OF_STOCK':
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'IN_STOCK':
        return 'En stock';
      case 'LOW_STOCK':
        return 'Stock faible';
      case 'OUT_OF_STOCK':
        return 'Rupture de stock';
      default:
        return 'Inconnu';
    }
  }
}
