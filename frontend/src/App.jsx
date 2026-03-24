import React, { useState, useEffect } from 'react';

// ==========================================
// COMPOSANT HEADER
// ==========================================
const Header = ({ navigate, handleSearch, handleCategory, searchQuery }) => (
  <header className="border-bottom py-3 bg-white sticky-top shadow-sm">
    <div className="container d-flex align-items-center justify-content-between">
      <a href="#" onClick={(e) => { e.preventDefault(); navigate('accueil'); }} style={{ cursor: 'pointer' }}>
        <img src="/Logo.png" alt="Logo" height="90" onError={(e) => e.target.src='https://via.placeholder.com/150x50?text=Logo'} />
      </a>
      <nav className="d-none d-lg-flex gap-4">
        <a href="#" onClick={(e) => { e.preventDefault(); handleCategory('Bâtiment'); }} className="text-dark fw-bold text-decoration-none" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#0074c7'} onMouseOut={(e) => e.target.style.color = '#212529'}>Bâtiment</a>
        <a href="#" onClick={(e) => { e.preventDefault(); handleCategory('Services'); }} className="text-dark fw-bold text-decoration-none">Services</a>
        <a href="#" onClick={(e) => { e.preventDefault(); handleCategory('Fabrication'); }} className="text-dark fw-bold text-decoration-none">Fabrication</a>
        <a href="#" onClick={(e) => { e.preventDefault(); handleCategory('Alimentation'); }} className="text-dark fw-bold text-decoration-none">Alimentation</a>
      </nav>
      <div className="input-group" style={{ width: '300px' }}>
        <input 
          type="text" 
          className="form-control rounded-pill bg-light border-0 px-4 py-2" 
          placeholder="Rechercher un artisan..." 
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  </header>
);

// ==========================================
// COMPOSANT FOOTER
// ==========================================
const Footer = () => (
  <footer className="text-white py-5 mt-auto" style={{ backgroundColor: '#384050' }}>
    <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
      <address className="small mb-0 fst-normal text-light mb-4 mb-md-0">
        <strong className="text-white d-block mb-2 fs-6">Trouve ton artisan</strong>
        101 cours Charlemagne, CS 20033<br />
        69269 LYON CEDEX 02, France<br />
        <span className="d-block mt-2 fw-bold">+33 (0)4 26 73 40 00</span>
      </address>
      <ul className="list-inline mb-0 d-flex gap-4 text-white-50">
        <li className="list-inline-item"><a href="#" className="text-white text-decoration-none">Mentions légales</a></li>
        <li className="list-inline-item"><a href="#" className="text-white text-decoration-none">Données personnelles</a></li>
        <li className="list-inline-item"><a href="#" className="text-white text-decoration-none">Accessibilité</a></li>
        <li className="list-inline-item"><a href="#" className="text-white text-decoration-none">Cookies</a></li>
      </ul>
    </div>
  </footer>
);

// ==========================================
// COMPOSANT ÉTOILES (Notation)
// ==========================================
const StarRating = ({ note }) => {
  const stars = [];
  const fullStars = Math.floor(note);
  const hasHalfStar = note - fullStars >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<i key={i} className="bi bi-star-half text-warning"></i>);
    } else {
      stars.push(<i key={i} className="bi bi-star text-warning"></i>);
    }
  }
  return <div className="mb-3">{stars} <span className="text-muted ms-2 fs-6">({note}/5)</span></div>;
};

// ==========================================
// PAGE : ACCUEIL
// ==========================================
const Accueil = ({ navigate }) => {
  const [topArtisans, setTopArtisans] = useState([]);
  const [error, setError] = useState(false);

  // Récupération des données depuis TON API Node.js locale
  useEffect(() => {
    fetch('http://localhost:3000/api/artisans/top')
      .then(res => res.json())
      .then(data => setTopArtisans(data))
      .catch(err => {
        console.error("Erreur de connexion à l'API:", err);
        setError(true);
      });
  }, []);

  return (
    <main className="flex-grow-1">
      <section className="py-5 border-bottom" style={{ backgroundColor: '#f1f8fc' }}>
        <div className="container">
          <h1 className="h3 fw-bold text-center mb-5" style={{ color: '#00497c' }}>Comment trouver mon artisan ?</h1>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {['Choisir la catégorie dans le menu', 'Choisir un artisan', 'Le contacter via le formulaire', 'Une réponse sera apportée sous 48h'].map((step, index) => (
              <div key={index} className="col">
                <div className="card h-100 border-0 shadow-sm p-3 text-center" style={{ borderTop: '4px solid #0074c7' }}>
                  <h2 className="h1 mb-2" style={{ color: '#0074c7', opacity: 0.5 }}>{index + 1}</h2>
                  <div className="card-body p-0 fw-bold text-dark">{step}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="h3 fw-bold mb-4" style={{ color: '#00497c' }}>Les artisans du mois</h2>
          
          {error ? (
            <div className="alert alert-danger">Impossible de se connecter à la base de données. Vérifie que ton serveur backend (port 3000) est bien lancé !</div>
          ) : (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {topArtisans.length === 0 ? <p>Chargement des artisans...</p> : topArtisans.map(artisan => (
                <div className="col" key={artisan.id_artisan}>
                  <div 
                    className="card h-100 shadow-sm border-0 bg-light p-3" 
                    style={{ borderTop: '4px solid #0074c7', cursor: 'pointer', transition: 'transform 0.2s' }}
                    onClick={() => navigate('fiche', artisan.id_artisan)}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div className="card-body">
                      <h3 className="h5 fw-bold mb-2">{artisan.nom}</h3>
                      <StarRating note={artisan.note} />
                      <div className="fw-semibold mb-2" style={{ color: '#0074c7' }}><i className="bi bi-tools me-2"></i>{artisan.Specialite?.nom || 'Artisan'}</div>
                      <div className="text-secondary"><i className="bi bi-geo-alt-fill me-2"></i>{artisan.localisation}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

// ==========================================
// PAGE : LISTE DES ARTISANS
// ==========================================
const Liste = ({ navigate, categoryFilter, searchQuery }) => {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/artisans')
      .then(res => res.json())
      .then(data => setArtisans(data))
      .catch(err => console.error("Erreur API:", err));
  }, []);

  // Filtrage des artisans dynamique (Barre de recherche + Catégories)
  const filteredArtisans = artisans.filter(artisan => {
    // 1. Filtre par catégorie
    const matchCategory = categoryFilter ? artisan.Specialite?.Categorie?.nom === categoryFilter : true;
    
    // 2. Filtre par recherche texte (nom, spécialité, ville)
    const searchLower = searchQuery.toLowerCase();
    const matchSearch = searchQuery ? (
      artisan.nom.toLowerCase().includes(searchLower) ||
      artisan.localisation.toLowerCase().includes(searchLower) ||
      (artisan.Specialite?.nom || '').toLowerCase().includes(searchLower)
    ) : true;

    return matchCategory && matchSearch;
  });

  // Détermination du titre de la page
  let titrePage = "Tous nos artisans";
  if (categoryFilter) titrePage = `Artisans de la catégorie "${categoryFilter}"`;
  if (searchQuery) titrePage = `Recherche : "${searchQuery}"`;

  return (
    <main className="flex-grow-1 py-5" style={{ backgroundColor: '#f1f8fc' }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-3 border-secondary border-opacity-25">
          <div>
            <h1 className="h2 fw-bold mb-2" style={{ color: '#00497c' }}>{titrePage}</h1>
            <p className="text-muted fs-5 mb-0">Découvrez les professionnels près de chez vous.</p>
          </div>
          <span className="badge bg-white text-dark border p-2 px-3 rounded-pill">{filteredArtisans.length} résultats</span>
        </div>
        
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {filteredArtisans.length === 0 ? (
            <div className="col-12 text-center py-5">
              <p className="fs-5 text-muted">Aucun artisan ne correspond à votre recherche.</p>
            </div>
          ) : (
            filteredArtisans.map(artisan => (
              <div className="col" key={artisan.id_artisan}>
                <div 
                  className="card shadow-sm border-0 bg-white h-100 p-3 rounded-4"
                  style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                  onClick={() => navigate('fiche', artisan.id_artisan)}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <h2 className="h5 fw-bold mb-2">{artisan.nom}</h2>
                  <StarRating note={artisan.note} />
                  <div className="fw-semibold mb-2" style={{ color: '#0074c7' }}><i className="bi bi-tools me-2"></i>{artisan.Specialite?.nom || 'Artisan'}</div>
                  <div className="text-secondary"><i className="bi bi-geo-alt-fill me-2"></i>{artisan.localisation}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

// ==========================================
// PAGE : FICHE DÉTAIL D'UN ARTISAN
// ==========================================
const Fiche = ({ artisanId }) => {
  const [artisan, setArtisan] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/artisans/${artisanId}`)
      .then(res => res.json())
      .then(data => setArtisan(data))
      .catch(err => console.error("Erreur API:", err));
  }, [artisanId]);

  if (!artisan) return <div className="container py-5 text-center"><h2>Chargement...</h2></div>;

  return (
    <main className="flex-grow-1 py-5">
      <div className="container">
        <div className="row gx-5">
          <div className="col-lg-5 mb-4 mb-lg-0">
            <img src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80" className="img-fluid rounded-4 shadow-sm mb-4 w-100" alt="Artisan au travail" style={{ objectFit: 'cover', height: '300px' }} />
            <h1 className="h2 fw-bold mb-2" style={{ color: '#00497c' }}>{artisan.nom}</h1>
            <StarRating note={artisan.note} />
            <div className="fw-semibold fs-5 mb-2" style={{ color: '#0074c7' }}><i className="bi bi-tools me-3"></i>{artisan.Specialite?.nom || 'Artisan'}</div>
            <div className="text-secondary fs-5 mb-4"><i className="bi bi-geo-alt-fill me-3"></i>{artisan.localisation}</div>
            {artisan.site_web && (
              <a href={artisan.site_web} target="_blank" rel="noreferrer" className="btn btn-outline-primary w-100 py-3 fw-bold rounded-pill">
                <i className="bi bi-globe me-2"></i>Visiter le site web officiel
              </a>
            )}
          </div>

          <div className="col-lg-7">
            <div className="bg-white p-5 rounded-4 shadow-sm border border-light h-100">
              <h2 className="h4 fw-bold mb-3 pb-2 border-bottom" style={{ color: '#00497c' }}>À propos de l'artisan</h2>
              <p className="text-muted mb-5 lh-lg">{artisan.a_propos}</p>

              <div className="p-4 rounded-4" style={{ backgroundColor: '#f1f8fc' }}>
                <h2 className="h5 fw-bold mb-4" style={{ color: '#00497c' }}><i className="bi bi-envelope-paper me-2"></i>Contacter cet artisan</h2>
                <form onSubmit={(e) => { e.preventDefault(); alert("Formulaire envoyé avec succès (simulation) !"); }}>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6"><input type="text" className="form-control py-2 border-0" placeholder="Votre nom complet" required /></div>
                    <div className="col-md-6"><input type="email" className="form-control py-2 border-0" placeholder="Votre adresse email" required /></div>
                  </div>
                  <div className="mb-3"><input type="text" className="form-control py-2 border-0" placeholder="Objet de votre demande" required /></div>
                  <div className="mb-4"><textarea className="form-control py-2 border-0" rows="5" placeholder="Détaillez votre projet..." required></textarea></div>
                  <button type="submit" className="btn text-white w-100 fw-bold py-3 rounded-pill" style={{ backgroundColor: '#0074c7' }}>
                    <i className="bi bi-send me-2"></i>Envoyer le message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

// ==========================================
// COMPOSANT PRINCIPAL (App) + ROUTEUR
// ==========================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('accueil');
  const [currentArtisanId, setCurrentArtisanId] = useState(null);
  
  // Nouveaux états pour gérer la recherche et les catégories
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Injection de Bootstrap
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
    document.head.appendChild(link);
    
    const icons = document.createElement('link');
    icons.rel = 'stylesheet';
    icons.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css';
    document.head.appendChild(icons);
  }, []);

  const navigate = (page, artisanId = null) => {
    setCurrentPage(page);
    setCurrentArtisanId(artisanId);
    // On réinitialise la recherche si on retourne à l'accueil
    if (page === 'accueil') {
      setSearchQuery('');
      setCategoryFilter('');
    }
    window.scrollTo(0, 0);
  };

  // Gestionnaires pour la recherche et les catégories
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCategoryFilter(''); // Efface la catégorie si on tape une recherche manuelle
    if (currentPage !== 'liste') setCurrentPage('liste');
  };

  const handleCategory = (category) => {
    setCategoryFilter(category);
    setSearchQuery(''); // Efface la recherche si on clique sur une catégorie
    if (currentPage !== 'liste') setCurrentPage('liste');
  };

  let PageContent;
  switch (currentPage) {
    case 'accueil':
      PageContent = <Accueil navigate={navigate} />;
      break;
    case 'liste':
      PageContent = <Liste navigate={navigate} categoryFilter={categoryFilter} searchQuery={searchQuery} />;
      break;
    case 'fiche':
      PageContent = <Fiche artisanId={currentArtisanId} />;
      break;
    default:
      PageContent = <Accueil navigate={navigate} />;
  }

  return (
    <div className="d-flex flex-column min-vh-100" style={{ fontFamily: "'Graphik', system-ui, sans-serif", backgroundColor: '#f8f9fa' }}>
      <Header navigate={navigate} handleSearch={handleSearch} handleCategory={handleCategory} searchQuery={searchQuery} />
      {PageContent}
      <Footer />
    </div>
  );
}