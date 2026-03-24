const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// ==========================================
// 1. CONNEXION À LA BASE DE DONNÉES
// ==========================================
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false // Passe à console.log si tu veux voir les requêtes SQL dans le terminal
    }
);

// ==========================================
// 2. DÉFINITION DES MODÈLES (Correspondance avec tes tables SQL)
// ==========================================

const Categorie = sequelize.define('Categorie', {
    id_categorie: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING(100), allowNull: false, unique: true }
}, { 
    tableName: 'categorie', 
    timestamps: false // Désactive les colonnes createdAt et updatedAt par défaut
});

const Specialite = sequelize.define('Specialite', {
    id_specialite: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING(100), allowNull: false, unique: true }
}, { 
    tableName: 'specialite', 
    timestamps: false 
});

const Artisan = sequelize.define('Artisan', {
    id_artisan: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING(150), allowNull: false },
    note: { type: DataTypes.DECIMAL(2,1), allowNull: false },
    localisation: { type: DataTypes.STRING(100), allowNull: false },
    a_propos: { type: DataTypes.TEXT, allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false },
    site_web: { type: DataTypes.STRING(255), allowNull: true },
    est_top_artisan: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { 
    tableName: 'artisan', 
    timestamps: false 
});

// ==========================================
// 3. DÉFINITION DES RELATIONS
// ==========================================

// Une catégorie possède plusieurs spécialités (1:N)
Categorie.hasMany(Specialite, { foreignKey: 'id_categorie' });
Specialite.belongsTo(Categorie, { foreignKey: 'id_categorie' });

// Une spécialité regroupe plusieurs artisans (1:N)
Specialite.hasMany(Artisan, { foreignKey: 'id_specialite' });
Artisan.belongsTo(Specialite, { foreignKey: 'id_specialite' });

// ==========================================
// 4. TEST DE CONNEXION ET EXPORT
// ==========================================
sequelize.authenticate()
    .then(() => console.log('✅ Connexion à la base de données MySQL réussie.'))
    .catch(err => console.error('❌ Erreur de connexion à la base de données :', err));

module.exports = { sequelize, Categorie, Specialite, Artisan };