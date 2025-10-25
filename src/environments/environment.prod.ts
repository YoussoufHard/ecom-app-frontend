/**
 * Configuration de l'environnement de production.
 * Ce fichier est automatiquement utilisé lors de la construction pour l'environnement de production.
 */

export const environment = {
  production: true,
  
  // URL de base de l'API backend en production
  apiUrl: 'https://api.votredomaine.com',
  
  // Configuration des endpoints de l'API
  endpoints: {
    // Service d'authentification
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      refresh: '/auth/refresh',
      me: '/auth/me'
    },
    
    // Service des clients
    customers: {
      base: '/customer-service/customers',
      search: '/customer-service/customers/search'
    },
    
    // Service des produits
    products: {
      base: '/product-service/products',
      categories: '/product-service/categories',
      search: '/product-service/products/search'
    },
    
    // Service de facturation
    bills: {
      base: '/billing-service/bills',
      generateInvoice: '/billing-service/bills/{id}/invoice',
      stats: '/billing-service/stats'
    },
    
    // Service de stock
    inventory: {
      base: '/inventory-service/items',
      movements: '/inventory-service/movements',
      alerts: '/inventory-service/alerts'
    }
  },
  
  // Configuration de l'authentification
  auth: {
    tokenKey: 'prod_auth_token',
    userKey: 'prod_current_user',
    tokenExpiration: 86400 // 24 heures
  },
  
  // Paramètres de pagination par défaut
  pagination: {
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50, 100]
  },
  
  // Configuration du thème
  theme: {
    primaryColor: '#3f51b5',
    accentColor: '#ff4081',
    warnColor: '#f44336',
    successColor: '#4caf50',
    infoColor: '#2196f3',
    warningColor: '#ff9800'
  },
  
  // Paramètres de débogage (désactivés en production)
  debug: {
    enabled: false,
    level: 0
  },
  
  // Paramètres de l'application
  app: {
    name: 'E-Commerce App',
    version: '1.0.0',
    defaultLanguage: 'fr',
    availableLanguages: ['fr', 'en'],
    inactivityTimeout: 30 // minutes
  }
};
