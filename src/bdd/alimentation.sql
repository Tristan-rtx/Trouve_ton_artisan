-- ==========================================================
-- Projet : Trouve ton artisan - Région Auvergne-Rhône-Alpes
-- Description : Script d'alimentation de la base de données
-- ==========================================================

USE trouve_ton_artisan;

-- 1. Insertion des CATÉGORIES
INSERT INTO categorie (nom) VALUES 
('Alimentation'),
('Bâtiment'),
('Fabrication'),
('Services');

-- 2. Insertion des SPÉCIALITÉS
-- (On lie chaque spécialité à l'ID de sa catégorie : 1=Alimentation, 2=Bâtiment, 3=Fabrication, 4=Services)
INSERT INTO specialite (nom, id_categorie) VALUES 
('Boucher', 1),
('Boulanger', 1),
('Chocolatier', 1),
('Traiteur', 1),
('Chauffagiste', 2),
('Charpentier', 2),
('Électricien', 2),
('Maçon', 2),
('Menuisier', 2),
('Peintre', 2),
('Plombier', 2),
('Bijoutier', 3),
('Couturier', 3),
('Ébéniste', 3),
('Verrier', 3),
('Carrossier', 4),
('Coiffeur', 4),
('Fleuriste', 4),
('Serrurier', 4),
('Toiletteur', 4),
('Webdesign', 4);

-- 3. Insertion des ARTISANS (Liste complète issue du CSV)
-- (On lie l'artisan à l'ID de sa spécialité)
INSERT INTO artisan (nom, id_specialite, note, localisation, a_propos, email, site_web, est_top_artisan) VALUES 
('Boucherie Dumont', 1, 4.5, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'boucherie.dumond@gmail.com', NULL, FALSE),
('Au pain chaud', 2, 4.8, 'Montélimar', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'aupainchaud@hotmail.com', NULL, TRUE),
('Chocolaterie Labbé', 3, 4.9, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', TRUE),
('Traiteur Truchon', 4, 4.1, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', FALSE),
('Orville Salmons', 5, 5.0, 'Evian', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'o-salmons@live.com', NULL, TRUE),
('Charpente 2000', 6, 4.2, 'Grenoble', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'contact@charpente2000.fr', NULL, FALSE),
('Élec Pro Solutions', 7, 4.7, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'elec.pro@gmail.com', NULL, FALSE),
('Maçonnerie Générale', 8, 4.0, 'Saint-Étienne', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'maconnerie-gen@hotmail.fr', NULL, FALSE),
('Menuiserie Dubois', 9, 4.6, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'dubois.menuiserie@gmail.com', 'https://menuiseriedubois.fr', FALSE),
('Bâti-Peintre', 10, 3.8, 'Annecy', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'bati-peintre@gmail.com', NULL, FALSE),
('Plomberie Express', 11, 4.3, 'Villeurbanne', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'plomb.express@yahoo.com', NULL, FALSE),
('Bijouterie Éclat', 12, 4.9, 'Clermont-Ferrand', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'contact@bijouterie-eclat.fr', 'https://bijouterie-eclat.fr', FALSE),
('Ernestine', 13, 5.0, 'Villeurbanne', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'ernestine@hotmail.fr', NULL, FALSE),
('Le bois d''antan', 14, 4.8, 'Bourg-en-Bresse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'leboisdantan@gmail.com', NULL, FALSE),
('Verrerie d''art', 15, 4.7, 'Annecy', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'verrerie.art@live.fr', NULL, FALSE),
('Carrosserie Auto', 16, 4.2, 'Roanne', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'carrosserie.auto@gmail.com', NULL, FALSE),
('Léa Coiffure', 17, 3.8, 'Chambéry', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr', FALSE),
('C''est sup''hair', 17, 4.1, 'Romans-sur-Isère', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'sup-hair@gmail.com', 'https://sup-hair.fr', FALSE),
('Le monde des fleurs', 18, 4.6, 'Annonay', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', FALSE),
('Serrurerie Dépannage', 19, 4.0, 'Vénissieux', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'serrurerie.dep@gmail.com', NULL, FALSE),
('Valérie Laderoute', 20, 4.5, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'v-laredoute@gmail.com', NULL, FALSE),
('CM Graphisme', 21, 4.4, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec.', 'contact@cm-graphisme.fr', 'https://cm-graphisme.fr', FALSE);