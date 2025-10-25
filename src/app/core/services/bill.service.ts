import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Bill, BillResponse, CreateBillRequest } from '../models/bill.model';

type BillFilter = {
  customerId?: string;
  status?: 'PENDING' | 'PAID' | 'CANCELLED';
  startDate?: string;
  endDate?: string;
  search?: string;
};

@Injectable({
  providedIn: 'root'
})
export class BillService {
  constructor(private apiService: ApiService) {}

  getBills(
    page: number = 0,
    size: number = 10,
    filter: BillFilter = {}
  ): Observable<BillResponse> {
    const params: any = {
      page: page.toString(),
      size: size.toString(),
      ...filter
    };
    
    return this.apiService.get<BillResponse>('/billing-service/bills', params);
  }

  getBill(id: string): Observable<Bill> {
    return this.apiService.get<Bill>(`/billing-service/bills/${id}`);
  }

  createBill(bill: CreateBillRequest): Observable<Bill> {
    return this.apiService.post<Bill>('/billing-service/bills', bill);
  }

  updateBillStatus(id: string, status: 'PENDING' | 'PAID' | 'CANCELLED'): Observable<Bill> {
    return this.apiService.put<Bill>(`/billing-service/bills/${id}/status`, { status });
  }

  deleteBill(id: string): Observable<void> {
    return this.apiService.delete<void>(`/billing-service/bills/${id}`);
  }

  getCustomerBills(customerId: string, page: number = 0, size: number = 10): Observable<BillResponse> {
    return this.apiService.get<BillResponse>(
      `/billing-service/customers/${customerId}/bills`,
      { page: page.toString(), size: size.toString() }
    );
  }
}
