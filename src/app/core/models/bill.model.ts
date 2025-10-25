import { Customer } from './customer.model';

export interface BillItem {
  id?: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Bill {
  id?: string;
  customerId: string;
  customer?: Customer;
  items: BillItem[];
  totalAmount: number;
  date?: Date;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  paymentMethod: 'CASH' | 'CARD' | 'BANK_TRANSFER';
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateBillRequest {
  customerId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  paymentMethod: 'CASH' | 'CARD' | 'BANK_TRANSFER';
  notes?: string;
}

export interface BillResponse {
  content: Bill[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
