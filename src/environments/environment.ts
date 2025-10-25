/**
 * Configuration de l'environnement de développement.
 * Cette configuration est utilisée pendant le développement local.
 */

export const environment = {
  production: false,
  
  // URL de base de l'API backend en développement
  apiUrl: 'http://localhost:8888',
  
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
      base: '/inventory-service/products',
      categories: '/inventory-service/categories',
      search: '/inventory-service/products/search'
    },
    
    // Service de facturation
    bills: {
      base: '/billing-service/bills',
      generateInvoice: (id: string) => `/billing-service/bills/${id}/invoice`,
      stats: '/billing-service/stats',
      customerBills: (customerId: string) => `/billing-service/customers/${customerId}/bills`
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
    tokenKey: 'dev_auth_token',
    userKey: 'dev_current_user',
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
  
  // Paramètres de débogage (activés en développement)
  debug: {
    enabled: true,
    level: 3 // 0: error, 1: warning, 2: info, 3: debug
  },
  
  // Paramètres de l'application
  app: {
    name: 'E-Commerce App (Dev)',
    version: '1.0.0-dev',
    defaultLanguage: 'fr',
    availableLanguages: ['fr', 'en'],
    inactivityTimeout: 30 // minutes
  }
};
