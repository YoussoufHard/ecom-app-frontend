import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface Bill {
  id?: string;
  billNumber: string;
  customerId: string;
  customerName: string;
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  issueDate: Date;
  dueDate: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Component({
  selector: 'app-bill-details',
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
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.scss']
})
export class BillDetailsComponent implements OnInit {
  bill: Bill | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadBill(id);
    } else {
      this.error = 'Identifiant de facture non fourni';
      this.isLoading = false;
    }
  }

  loadBill(id: string): void {
    // TODO: Implement bill service call
    // For now, using mock data
    setTimeout(() => {
      const mockBill: Bill = {
        id: id,
        billNumber: 'INV-001',
        customerId: '1',
        customerName: 'John Doe',
        totalAmount: 150.00,
        status: 'PENDING',
        issueDate: new Date('2024-01-15'),
        dueDate: new Date('2024-02-15'),
        notes: 'Facture pour services informatiques',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      };

      this.bill = mockBill;
      this.isLoading = false;
    }, 1000);
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'PAID':
        return 'badge-success';
      case 'PENDING':
        return 'badge-warning';
      case 'OVERDUE':
        return 'badge-danger';
      case 'CANCELLED':
        return 'badge-secondary';
      default:
        return 'badge-secondary';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'PAID':
        return 'Payée';
      case 'PENDING':
        return 'En attente';
      case 'OVERDUE':
        return 'En retard';
      case 'CANCELLED':
        return 'Annulée';
      default:
        return 'Inconnu';
    }
  }

  onEdit(): void {
    if (this.bill?.id) {
      this.router.navigate(['/bills', this.bill.id, 'edit']);
    }
  }

  onBack(): void {
    this.router.navigate(['/bills']);
  }
}