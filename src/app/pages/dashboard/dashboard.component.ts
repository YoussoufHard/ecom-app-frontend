import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

interface StatCard {
  title: string;
  value: number | string;
  icon: string;
  color: string;
  isLoading: boolean;
  link?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: StatCard[] = [
    { 
      title: 'Total Clients', 
      value: '0', 
      icon: 'people', 
      color: 'primary',
      isLoading: true,
      link: '/customers'
    },
    { 
      title: 'Total Produits', 
      value: '0', 
      icon: 'inventory_2', 
      color: 'accent',
      isLoading: true,
      link: '/products'
    },
    { 
      title: 'Factures ce mois', 
      value: '0', 
      icon: 'receipt', 
      color: 'warn',
      isLoading: true,
      link: '/bills'
    },
    { 
      title: 'Chiffre d\'affaires', 
      value: '0 €', 
      icon: 'euro', 
      color: 'success',
      isLoading: true,
      link: '/bills'
    }
  ];

  recentActivities: any[] = [];
  isLoadingActivities = true;

  constructor() {}

  ngOnInit(): void {
    // Simuler un chargement de données
    setTimeout(() => {
      this.stats = this.stats.map(stat => ({
        ...stat,
        value: stat.title === 'Chiffre d\'affaires' ? '12,450 €' : '42',
        isLoading: false
      }));
      
      this.recentActivities = [
        { id: 1, type: 'facture', description: 'Nouvelle facture #1001', date: 'Il y a 5 minutes', amount: '450 €' },
        { id: 2, type: 'client', description: 'Nouveau client enregistré', date: 'Il y a 1 heure', amount: null },
        { id: 3, type: 'produit', description: 'Stock mis à jour - Produit #P100', date: 'Il y a 2 heures', amount: null },
        { id: 4, type: 'facture', description: 'Paiement reçu - Facture #1000', date: 'Il y a 1 jour', amount: '1,200 €' },
      ];
      this.isLoadingActivities = false;
    }, 1500);
  }

  getActivityIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'facture': 'receipt',
      'client': 'person_add',
      'produit': 'inventory_2',
      'paiement': 'euro'
    };
    return icons[type] || 'notifications';
  }

  getActivityColor(type: string): string {
    const colors: { [key: string]: string } = {
      'facture': 'primary',
      'client': 'accent',
      'produit': 'warn',
      'paiement': 'success'
    };
    return colors[type] || '';
  }
}
