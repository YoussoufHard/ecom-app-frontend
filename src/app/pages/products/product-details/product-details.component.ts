import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.loadProduct(id);
    } else {
      this.error = 'Identifiant de produit non fourni';
      this.isLoading = false;
    }
  }

  loadProduct(id: string): void {
    this.productService.getProduct(id).pipe(first()).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement du produit';
        this.isLoading = false;
        console.error('Error loading product', error);
      }
    });
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

  onEdit(): void {
    if (this.product?.id) {
      this.router.navigate(['/products', this.product.id, 'edit']);
    }
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
