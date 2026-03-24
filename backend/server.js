const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config(); // Pour charger les variables d'environnement depuis le .env

// Importation de la base de données et des modèles Sequelize (depuis db.js)
const { Artisan, Specialite, Categorie } = require('./db');

// Initialisation de l'application Express
const app = express();

// ==========================================
// MIDDLEWARES DE SÉCURITÉ (Étape 4 du dossier)
// ==========================================

// Helmet protège l'application de certaines vulnérabilités web en configurant les en-têtes HTTP
app.use(helmet());

// CORS autorise le futur front-end React à communiquer avec cette API
app.use(cors({
    origin: '*', // Permet à tout le monde de s'y connecter en développement
    methods: ['GET', 'POST']
}));

// Permet à l'API de lire le format JSON envoyé dans le corps des requêtes (ex: formulaire de contact)
app.use(express.json());

// ==========================================
// ROUTES DE L'API (Récupération des données)
// ==========================================

// Route de test pour vérifier que l'API fonctionne à la racine
app.get('/', (req, res) => {
    res.json({ message: "Bienvenue sur l'API de Trouve ton Artisan !" });
});

// 1. Récupérer TOUS les artisans (avec le nom de leur spécialité et de leur catégorie)
app.get('/api/artisans', async (req, res) => {
    try {
        const artisans = await Artisan.findAll({
            include: [{
                model: Specialite,
                include: [Categorie]
            }]
        });
        res.json(artisans);
    } catch (error) {
        console.error("Erreur lors de la récupération des artisans :", error);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des données." });
    }
});

// 2. Récupérer uniquement les "Artisans du mois" (pour la page d'accueil)
app.get('/api/artisans/top', async (req, res) => {
    try {
        const topArtisans = await Artisan.findAll({
            where: { est_top_artisan: true },
            include: [{
                model: Specialite,
                include: [Categorie]
            }]
        });
        res.json(topArtisans);
    } catch (error) {
        console.error("Erreur lors de la récupération des tops artisans :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

// 3. Récupérer UN artisan spécifique par son ID (pour la page Fiche Artisan)
app.get('/api/artisans/:id', async (req, res) => {
    try {
        const artisan = await Artisan.findByPk(req.params.id, {
            include: [{
                model: Specialite,
                include: [Categorie]
            }]
        });
        if (artisan) {
            res.json(artisan);
        } else {
            res.status(404).json({ message: "Artisan non trouvé dans la base de données." });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'artisan :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

// ==========================================
// DÉMARRAGE DU SERVEUR
// ==========================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré avec succès sur http://localhost:${PORT}`);
});