import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, takeUntil } from 'rxjs';

import { Customer, CustomerService } from '../../../core/services/customer.service';
import { BreadcrumbService } from '../../../core/services/breadcrumb.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit, OnDestroy {
  customerForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  customerId: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private breadcrumbService: BreadcrumbService
  ) {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['', [Validators.pattern('^[0-9+\-\s()]*$'), Validators.maxLength(20)]],
      address: ['', Validators.maxLength(200)],
      company: ['', Validators.maxLength(100)],
      notes: ['', Validators.maxLength(500)]
    });
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.customerId;

    if (this.isEditMode) {
      this.loadCustomer();
    } else {
      this.breadcrumbService.setBreadcrumb([
        { label: 'Clients', url: '/customers' },
        { label: 'Nouveau client', url: '/customers/new' }
      ]);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCustomer(): void {
    if (!this.customerId) return;

    this.isLoading = true;
    this.customerService.getCustomer(this.customerId).subscribe({
      next: (customer) => {
        this.customerForm.patchValue(customer);
        this.isLoading = false;
        
        this.breadcrumbService.setBreadcrumb([
          { label: 'Clients', url: '/customers' },
          { label: customer.firstName + ' ' + customer.lastName, url: `/customers/${this.customerId}` },
          { label: 'Modifier', url: `/customers/${this.customerId}/edit` }
        ]);
      },
      error: (error) => {
        console.error('Error loading customer', error);
        this.isLoading = false;
        this.snackBar.open('Erreur lors du chargement du client', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.router.navigate(['/customers']);
      }
    });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const customerData: Partial<Customer> = this.customerForm.value;

    const request = this.isEditMode && this.customerId
      ? this.customerService.updateCustomer(this.customerId, customerData as Customer)
      : this.customerService.createCustomer(customerData as Customer);

    request.subscribe({
      next: (customer) => {
        this.isLoading = false;
        const message = this.isEditMode 
          ? 'Client mis à jour avec succès' 
          : 'Client créé avec succès';
        
        this.snackBar.open(message, 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

        this.router.navigate(['/customers', customer.id]);
      },
      error: (error) => {
        console.error('Error saving customer', error);
        this.isLoading = false;
        
        let errorMessage = 'Une erreur est survenue lors de la sauvegarde du client';
        if (error.status === 409) {
          errorMessage = 'Un client avec cet email existe déjà';
        }
        
        this.snackBar.open(errorMessage, 'Fermer', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  get formTitle(): string {
    return this.isEditMode ? 'Modifier le client' : 'Nouveau client';
  }

  get submitButtonText(): string {
    return this.isLoading 
      ? (this.isEditMode ? 'Mise à jour...' : 'Création...') 
      : (this.isEditMode ? 'Mettre à jour' : 'Créer le client');
  }
}
