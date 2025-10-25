import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

interface MenuItem {
  title: string;
  icon: string;
  route: string;
  requiredRole?: string[];
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isSidebarOpen = true;
  currentUser: any;
  
  menuItems: MenuItem[] = [
    { title: 'Tableau de bord', icon: 'dashboard', route: '/dashboard' },
    { title: 'Clients', icon: 'people', route: '/customers' },
    { title: 'Produits', icon: 'inventory_2', route: '/products' },
    { title: 'Factures', icon: 'receipt', route: '/bills' },
    { title: 'Paramètres', icon: 'settings', route: '/settings' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // TODO: Récupérer les informations de l'utilisateur connecté
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(): void {
    this.authService.logout();
  }
}
