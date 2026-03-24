-- ==========================================================
-- Projet : Trouve ton artisan - Région Auvergne-Rhône-Alpes
-- Description : Script de création de la base de données
-- ==========================================================

-- Création de la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS trouve_ton_artisan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE trouve_ton_artisan;

-- Suppression des tables si elles existent (pour pouvoir relancer le script)
-- L'ordre est important à cause des clés étrangères
DROP TABLE IF EXISTS artisan;
DROP TABLE IF EXISTS specialite;
DROP TABLE IF EXISTS categorie;

-- --------------------------------------------------------
-- Table : categorie
-- --------------------------------------------------------
CREATE TABLE categorie (
    id_categorie INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table : specialite
-- (Une spécialité est rattachée à une seule catégorie)
-- --------------------------------------------------------
CREATE TABLE specialite (
    id_specialite INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    id_categorie INT NOT NULL,
    CONSTRAINT fk_specialite_categorie 
        FOREIGN KEY (id_categorie) 
        REFERENCES categorie(id_categorie) 
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table : artisan
-- (Un artisan n'apparaît que dans une seule spécialité)
-- --------------------------------------------------------
CREATE TABLE artisan (
    id_artisan INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    note DECIMAL(2,1) NOT NULL, -- Format X.X (ex: 4.5)
    localisation VARCHAR(100) NOT NULL,
    a_propos TEXT NOT NULL,
    email VARCHAR(150) NOT NULL,
    site_web VARCHAR(255) DEFAULT NULL,
    est_top_artisan BOOLEAN DEFAULT FALSE, -- Gère la notion "Top" du CSV
    id_specialite INT NOT NULL,
    CONSTRAINT fk_artisan_specialite 
        FOREIGN KEY (id_specialite) 
        REFERENCES specialite(id_specialite) 
        ON DELETE RESTRICT
) ENGINE=InnoDB;