export interface Customer {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  company?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomerResponse {
  content: Customer[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
