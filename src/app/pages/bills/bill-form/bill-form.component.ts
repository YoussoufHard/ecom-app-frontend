import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
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
}

@Component({
  selector: 'app-bill-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss']
})
export class BillFormComponent implements OnInit {
  billForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  error = '';
  billId: string | null = null;
  statusOptions = [
    { value: 'PENDING', viewValue: 'En attente' },
    { value: 'PAID', viewValue: 'Payée' },
    { value: 'OVERDUE', viewValue: 'En retard' },
    { value: 'CANCELLED', viewValue: 'Annulée' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.billForm = this.fb.group({
      billNumber: ['', [Validators.required, Validators.maxLength(50)]],
      customerId: ['', Validators.required],
      customerName: ['', Validators.required],
      totalAmount: [0, [Validators.required, Validators.min(0.01)]],
      status: ['PENDING', Validators.required],
      issueDate: [new Date(), Validators.required],
      dueDate: ['', Validators.required],
      notes: ['', Validators.maxLength(500)]
    });
  }

  ngOnInit(): void {
    this.billId = this.route.snapshot.paramMap.get('id');

    if (this.billId) {
      this.isEditMode = true;
      this.loadBill(this.billId);
    } else {
      // Generate bill number for new bills
      this.generateBillNumber();
    }
  }

  generateBillNumber(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const billNumber = `INV-${year}${month}-${random}`;

    this.billForm.patchValue({ billNumber });
  }

  loadBill(id: string): void {
    this.isLoading = true;
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
        notes: 'Facture pour services informatiques'
      };

      this.billForm.patchValue(mockBill);
      this.isLoading = false;
    }, 1000);
  }

  onSubmit(): void {
    if (this.billForm.invalid) {
      return;
    }

    this.isLoading = true;
    const billData = this.billForm.value;

    // TODO: Implement save functionality
    setTimeout(() => {
      console.log('Saving bill:', billData);
      this.isLoading = false;
      this.router.navigate(['/bills']);
    }, 1000);
  }

  onCancel(): void {
    this.router.navigate(['/bills']);
  }

  get f() { return this.billForm.controls; }
}