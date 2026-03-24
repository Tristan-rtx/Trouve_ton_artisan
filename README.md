🛠️ Trouve ton artisan - Région Auvergne-Rhône-Alpes

Bienvenue sur le dépôt du projet Trouve ton artisan. Il s'agit d'un annuaire web Full-Stack développé pour répertorier et rechercher facilement des artisans qualifiés dans la région Auvergne-Rhône-Alpes.

📋 Description du projet

Ce projet a été réalisé dans le cadre d'une évaluation. L'objectif est de proposer une plateforme numérique centralisée où les utilisateurs peuvent :

Découvrir les "Artisans du mois".

Rechercher un artisan par nom, ville ou spécialité en temps réel.

Filtrer les artisans par grande catégorie (Bâtiment, Services, Fabrication, Alimentation).

Consulter une fiche détaillée pour chaque professionnel (description, note, site web) et le contacter via un formulaire.

💻 Technologies utilisées

Front-end : React.js (Vite), Bootstrap 5, CSS personnalisé

Back-end : Node.js, Express.js, Sequelize (ORM), Cors, Helmet (Sécurité)

Base de données : MySQL

📁 Structure du dépôt

Le projet est divisé en 3 dossiers distincts :

sql/ : Scripts SQL pour la création de l'architecture de la base de données (creation.sql) et l'insertion des données de test (alimentation.sql).

backend/ : Code source de l'API REST Node.js chargée de faire le lien entre la base de données et l'interface.

frontend/ : Code source de l'application cliente en React offrant l'interface utilisateur.

🚀 Installation et exécution en local

Pour faire tourner ce projet sur votre machine, suivez ces étapes dans l'ordre :

1. Base de données

Importez et exécutez le script sql/creation.sql dans votre SGBD (ex: MySQL Workbench, phpMyAdmin, DBeaver) pour créer la structure.

Exécutez ensuite sql/alimentation.sql pour y insérer le jeu de données initial.

2. Back-end (API)

Ouvrez un terminal dans le dossier backend/.

Installez les dépendances avec la commande :

npm install


Créez un fichier .env à la racine de ce dossier avec vos identifiants MySQL (modifiez selon votre configuration) :

DB_NAME=trouve_ton_artisan
DB_USER=root
DB_PASSWORD=votre_mdp
DB_HOST=localhost
PORT=3000


Lancez le serveur avec :

npx nodemon server.js


3. Front-end (Application Web)

Ouvrez un second terminal dans le dossier frontend/.

Installez les dépendances avec la commande :

npm install


Lancez l'application avec :

npm run dev


Ouvrez l'URL locale fournie dans le terminal (généralement http://localhost:5173) dans votre navigateur web.