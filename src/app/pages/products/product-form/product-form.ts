import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product, ProductStatus } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  error = '';
  productId: string | null = null;
  statusOptions = [
    { value: 'IN_STOCK', viewValue: 'En stock' },
    { value: 'LOW_STOCK', viewValue: 'Stock faible' },
    { value: 'OUT_OF_STOCK', viewValue: 'Rupture de stock' }
  ];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required, Validators.maxLength(50)]],
      sku: ['', [Validators.required, Validators.maxLength(50)]],
      status: ['IN_STOCK', Validators.required],
      lowStockThreshold: [0, Validators.min(0)],
      imageUrl: ['', Validators.pattern('https?://.+')]
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    
    if (this.productId) {
      this.isEditMode = true;
      this.loadProduct(this.productId);
    }
  }

  loadProduct(id: string): void {
    this.isLoading = true;
    this.productService.getProduct(id).pipe(first()).subscribe({
      next: (product) => {
        this.productForm.patchValue(product);
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement du produit';
        this.isLoading = false;
        console.error('Error loading product', error);
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    this.isLoading = true;
    const productData = this.productForm.value;

    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, productData).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.error = 'Erreur lors de la mise à jour du produit';
          this.isLoading = false;
          console.error('Error updating product', error);
        }
      });
    } else {
      this.productService.createProduct(productData).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.error = 'Erreur lors de la création du produit';
          this.isLoading = false;
          console.error('Error creating product', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }

  // Helper pour accéder facilement aux contrôles du formulaire
  get f() { return this.productForm.controls; }
}
