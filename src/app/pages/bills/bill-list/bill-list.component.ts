import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

interface Bill {
  id?: string;
  billNumber: string;
  customerName: string;
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  issueDate: Date;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

@Component({
  selector: 'app-bill-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {
  displayedColumns: string[] = ['billNumber', 'customerName', 'totalAmount', 'status', 'dueDate', 'actions'];
  dataSource: MatTableDataSource<Bill>;
  isLoading = true;
  searchText = '';
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Bill>([]);
  }

  ngOnInit(): void {
    this.loadBills();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadBills(): void {
    this.isLoading = true;
    // TODO: Implement bill service call
    // For now, using mock data
    setTimeout(() => {
      const mockBills: Bill[] = [
        {
          id: '1',
          billNumber: 'INV-001',
          customerName: 'John Doe',
          totalAmount: 150.00,
          status: 'PAID',
          issueDate: new Date('2024-01-15'),
          dueDate: new Date('2024-02-15')
        },
        {
          id: '2',
          billNumber: 'INV-002',
          customerName: 'Jane Smith',
          totalAmount: 275.50,
          status: 'PENDING',
          issueDate: new Date('2024-01-20'),
          dueDate: new Date('2024-02-20')
        }
      ];

      this.dataSource.data = mockBills;
      this.totalItems = mockBills.length;
      this.isLoading = false;
    }, 1000);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchText = filterValue.trim().toLowerCase();
    this.pageIndex = 0;
    this.loadBills();
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadBills();
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

  viewBill(bill: Bill): void {
    this.router.navigate(['/bills', bill.id]);
  }

  editBill(bill: Bill): void {
    this.router.navigate(['/bills', bill.id, 'edit']);
  }

  deleteBill(bill: Bill): void {
    // TODO: Implement delete functionality
    this.snackBar.open('Fonctionnalité de suppression à implémenter', 'Fermer', {
      duration: 3000
    });
  }

  createNewBill(): void {
    this.router.navigate(['/bills/new']);
  }
}