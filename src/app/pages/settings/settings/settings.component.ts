import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface Settings {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  currency: string;
  language: string;
  theme: string;
  notifications: boolean;
  autoBackup: boolean;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  isLoading = false;

  currencyOptions = [
    { value: 'EUR', viewValue: 'Euro (€)' },
    { value: 'USD', viewValue: 'Dollar ($)' },
    { value: 'GBP', viewValue: 'Livre Sterling (£)' }
  ];

  languageOptions = [
    { value: 'fr', viewValue: 'Français' },
    { value: 'en', viewValue: 'English' },
    { value: 'es', viewValue: 'Español' }
  ];

  themeOptions = [
    { value: 'light', viewValue: 'Clair' },
    { value: 'dark', viewValue: 'Sombre' },
    { value: 'auto', viewValue: 'Automatique' }
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.settingsForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.maxLength(100)]],
      companyEmail: ['', [Validators.required, Validators.email]],
      companyPhone: ['', [Validators.pattern('^[0-9+\-\s()]*$'), Validators.maxLength(20)]],
      companyAddress: ['', Validators.maxLength(200)],
      currency: ['EUR', Validators.required],
      language: ['fr', Validators.required],
      theme: ['light', Validators.required],
      notifications: [true],
      autoBackup: [false]
    });
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    // TODO: Implement settings service call
    // For now, using default values
    const defaultSettings: Settings = {
      companyName: 'Ma Société',
      companyEmail: 'contact@masociete.com',
      companyPhone: '+33 1 23 45 67 89',
      companyAddress: '123 Rue de la Paix, 75001 Paris, France',
      currency: 'EUR',
      language: 'fr',
      theme: 'light',
      notifications: true,
      autoBackup: false
    };

    this.settingsForm.patchValue(defaultSettings);
  }

  onSubmit(): void {
    if (this.settingsForm.invalid) {
      this.settingsForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const settingsData = this.settingsForm.value;

    // TODO: Implement save functionality
    setTimeout(() => {
      console.log('Saving settings:', settingsData);
      this.isLoading = false;
      this.snackBar.open('Paramètres sauvegardés avec succès', 'Fermer', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    }, 1000);
  }

  onReset(): void {
    this.loadSettings();
    this.snackBar.open('Paramètres remis à zéro', 'Fermer', {
      duration: 2000
    });
  }

  get f() { return this.settingsForm.controls; }
}