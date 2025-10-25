import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Components
// import { CustomerListComponent } from './customer-list/customer-list.component';
// import { CustomerFormComponent } from './customer-form/customer-form.component';
// import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CUSTOMER_ROUTES } from './customers.routes';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    // CustomerListComponent,
    // CustomerFormComponent,
    // CustomerDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CUSTOMER_ROUTES),
    ReactiveFormsModule,
    SharedModule,
    // Material Modules
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
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class CustomersModule { }
