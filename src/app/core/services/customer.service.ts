import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Customer, CustomerResponse } from '../models/customer.model';

export type { Customer };

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private apiService: ApiService) {}

  getCustomers(page: number = 0, size: number = 10, search: string = ''): Observable<CustomerResponse> {
    const params = {
      page: page.toString(),
      size: size.toString(),
      search: search
    };
    return this.apiService.get<CustomerResponse>('/customer-service/customers', params);
  }

  getCustomer(id: string): Observable<Customer> {
    return this.apiService.get<Customer>(`/customer-service/customers/${id}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.apiService.post<Customer>('/customer-service/customers', customer);
  }

  updateCustomer(id: string, customer: Customer): Observable<Customer> {
    return this.apiService.put<Customer>(`/customer-service/customers/${id}`, customer);
  }

  deleteCustomer(id: string): Observable<void> {
    return this.apiService.delete<void>(`/customer-service/customers/${id}`);
  }
}
