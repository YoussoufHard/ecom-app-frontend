import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { Customer, CustomerService } from '../../../core/services/customer.service';
import { BreadcrumbService } from '../../../core/services/breadcrumb.service';

interface DetailItem {
  icon: string;
  label: string;
  value: string;
  type?: 'text' | 'email' | 'phone' | 'date';
  copyable?: boolean;
}

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  customer: Customer | null = null;
  isLoading = true;
  activeTabIndex = 0;
  
  // Données pour les onglets
  details: DetailItem[] = [];
  
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    const customerId = this.route.snapshot.paramMap.get('id');
    
    if (customerId) {
      this.loadCustomer(customerId);
    } else {
      this.router.navigate(['/customers']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCustomer(id: string): void {
    this.isLoading = true;
    
    this.customerService.getCustomer(id).subscribe({
      next: (customer) => {
        this.customer = customer;
        this.prepareDetails(customer);
        this.isLoading = false;
        
        // Mettre à jour le fil d'Ariane
        this.breadcrumbService.setBreadcrumb([
          { label: 'Clients', url: '/customers' },
          { label: `${customer.firstName} ${customer.lastName}`, url: `/customers/${customer.id}` }
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

  private prepareDetails(customer: Customer): void {
    this.details = [
      { 
        icon: 'person', 
        label: 'Nom complet', 
        value: `${customer.firstName} ${customer.lastName}`,
        copyable: true
      },
      { 
        icon: 'email', 
        label: 'Email', 
        value: customer.email,
        type: 'email',
        copyable: true
      }
    ];

    if (customer.phone) {
      this.details.push({
        icon: 'phone',
        label: 'Téléphone',
        value: customer.phone,
        type: 'phone',
        copyable: true
      });
    }

    if (customer.address) {
      this.details.push({
        icon: 'location_on',
        label: 'Adresse',
        value: customer.address,
        copyable: true
      });
    }

    if (customer.company) {
      this.details.push({
        icon: 'business',
        label: 'Société',
        value: customer.company,
        copyable: true
      });
    }

    if (customer.notes) {
      this.details.push({
        icon: 'notes',
        label: 'Notes',
        value: customer.notes
      });
    }

    // Ajouter la date de création
    if (customer.createdAt) {
      const createdAt = new Date(customer.createdAt);
      this.details.push({
        icon: 'event',
        label: 'Date de création',
        value: createdAt.toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        type: 'date'
      });
    }
  }

  onEdit(): void {
    if (this.customer) {
      this.router.navigate(['/customers', this.customer.id, 'edit']);
    }
  }

  onDelete(): void {
    // Implémentez la logique de suppression ici
    // Vous pouvez utiliser un dialogue de confirmation
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.snackBar.open('Copié dans le presse-papier', 'OK', {
        duration: 2000,
        panelClass: ['success-snackbar']
      });
    }).catch(err => {
      console.error('Erreur lors de la copie dans le presse-papier', err);
    });
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  }
}
