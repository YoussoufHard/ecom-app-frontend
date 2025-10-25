# E-Commerce Microservices Application

Application de gestion commerciale basée sur une architecture microservices avec une interface Angular moderne.

## Fonctionnalités

- Gestion des clients (CRUD)
- Gestion des produits (CRUD)
- Gestion des factures
- Tableau de bord avec indicateurs clés
- Interface utilisateur réactive et moderne
- Authentification et autorisation

## Prérequis

- Node.js 18+ et npm 9+
- Angular CLI 15+
- Java 17+ (pour le backend)
- Maven 3.8+
- PostgreSQL 13+

## Installation du frontend

1. Cloner le dépôt
```bash
git clone https://github.com/votre-utilisateur/ecom-microservices-app.git
cd ecom-microservices-app/frontend/ecom-app-frontend
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer l'environnement
Créer un fichier `src/environments/environment.ts` basé sur `environment.example.ts`

4. Démarrer le serveur de développement
```bash
ng serve
```

L'application sera disponible à l'adresse `http://localhost:4200`

## Installation du backend

1. Se déplacer dans le dossier du backend
```bash
cd ../../backend
```

2. Configurer la base de données
- Créer une base de données PostgreSQL
- Mettre à jour les paramètres de connexion dans `src/main/resources/application.yml`

3. Construire et démarrer les services
```bash
mvn clean install
java -jar target/ecom-microservices-app.jar
```

## Structure du projet

```
ecom-microservices-app/
├── frontend/                 # Application Angular
│   ├── ecom-app-frontend/    # Code source du frontend
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── core/           # Services, intercepteurs, guards
│   │   │   │   ├── pages/          # Composants de page
│   │   │   │   └── shared/         # Composants partagés
│   │   │   └── environments/       # Configurations d'environnement
│   │   └── ...
│   └── ...
└── backend/                  # Services backend
    ├── customer-service/     # Service de gestion des clients
    ├── product-service/      # Service de gestion des produits
    ├── billing-service/      # Service de facturation
    └── ...
```

## Variables d'environnement

Créez un fichier `src/environments/environment.ts` avec le contenu suivant :

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080', // URL de l'API backend
  endpoints: {
    auth: '/auth',
    customers: '/customer-service/customers',
    products: '/product-service/products',
    bills: '/billing-service/bills'
  }
};
```

## Déploiement

Pour construire l'application pour la production :

```bash
ng build --configuration=production
```

Les fichiers générés seront disponibles dans le dossier `dist/`.

## Tests

Pour exécuter les tests unitaires :
```bash
ng test
```

Pour exécuter les tests e2e :
```bash
ng e2e
```

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
