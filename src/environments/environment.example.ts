/**
 * Fichier d'exemple pour la configuration d'environnement.
 * Copiez ce fichier vers `environment.ts` et mettez à jour les valeurs selon votre configuration.
 */

export const environment = {
  production: false,
  
  // URL de base de l'API backend
  apiUrl: 'http://localhost:8080',
  
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
    // Clé pour stocker le token dans le localStorage
    tokenKey: 'auth_token',
    // Clé pour stocker les informations utilisateur dans le localStorage
    userKey: 'current_user',
    // Durée de validité du token en secondes (1 jour par défaut)
    tokenExpiration: 86400
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
  
  // Paramètres de débogage
  debug: {
    // Activer les logs de débogage
    enabled: true,
    // Niveau de log (0: erreur, 1: avertissement, 2: info, 3: debug)
    level: 3
  },
  
  // Paramètres de l'application
  app: {
    name: 'E-Commerce App',
    version: '1.0.0',
    defaultLanguage: 'fr',
    availableLanguages: ['fr', 'en'],
    // Délai d'inactivité avant déconnexion (en minutes)
    inactivityTimeout: 30
  }
};

/**
 * Pour utiliser cette configuration dans votre application :
 * 
 * import { environment } from '../environments/environment';
 * 
 * // Exemple d'utilisation
 * const apiUrl = environment.apiUrl;
 * const loginEndpoint = environment.endpoints.auth.login;
 */
