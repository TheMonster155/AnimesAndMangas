import React, { useState, useEffect, useRef } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaTachometerAlt,
  FaSearch,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Login from "../../pages/Login/Login";
import "./Navbar.css";

const NavbarComponent = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false); // Stato per la visibilità della barra di ricerca
  const [searchQuery, setSearchQuery] = useState(""); // Stato per la query di ricerca

  const dashboardRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (dashboardRef.current && !dashboardRef.current.contains(event.target)) {
      setDashboardVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const handleLogin = (user) => {
    console.log("Utente loggato:", user);
    setShowLoginModal(false);
  };

  const navigateToCategory = (type) => {
    navigate(`/MangaList/${type}`);
  };

  const toggleDashboard = () => {
    setDashboardVisible(!dashboardVisible);
  };

  const handleSearchToggle = () => {
    setSearchVisible(!searchVisible); // Toggle visibilità della barra di ricerca
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Aggiorna la query di ricerca
    // Aggiungi qui la logica per inviare la query al server per la ricerca dei prodotti
    // Esempio:
    // fetchProductsByQuery(event.target.value);
  };

  // Funzione per eseguire la ricerca (se necessario)
  const fetchProductsByQuery = async (query) => {
    if (query.trim() === "") return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/products/search/${query}`
      );
      const data = await response.json();
      if (response.ok) {
        // Gestisci i risultati della ricerca
        console.log(data);
      } else {
        console.error("Errore nella ricerca:", data.message);
      }
    } catch (error) {
      console.error("Errore nella richiesta di ricerca:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src="/path/to/your/logo.png" alt="Logo" className="logo-img" />
        </Link>

        <div className="navbar-nav mx-auto d-flex justify-content-center">
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => navigateToCategory("Manga")}
              >
                Manga
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => navigateToCategory("Figure")}
              >
                Figure
              </button>
            </li>
            <li className="nav-item">
              <Link to="/mangacreate" className="nav-link">
                Create
              </Link>
            </li>
          </ul>
        </div>

        {/* Navbar Icons */}
        <div className="d-flex align-items-center ms-auto gap-3 navbar-icons">
          {/* Icona di ricerca */}
          <button
            onClick={handleSearchToggle}
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaSearch size={24} />
          </button>

          {/* Barra di ricerca */}
          {searchVisible && (
            <input
              type="text"
              className="search-input"
              placeholder="Cerca..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          )}

          <button
            onClick={toggleLoginModal}
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaUser size={24} />
          </button>

          <Link
            to="/cart"
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaShoppingCart size={24} />
          </Link>

          {/* Dashboard Button */}
          <button
            onClick={toggleDashboard}
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaTachometerAlt size={24} />
          </button>

          {/* Dashboard Dropdown */}
          {dashboardVisible && (
            <div className="dashboard-dropdown" ref={dashboardRef}>
              <Link to="/registationUser" className="nav-link">
                Registrazione
              </Link>
              <Link to="/sellerpage" className="nav-link">
                Venditori
              </Link>
              <Link to="/contact" className="nav-link">
                Contatti
              </Link>
            </div>
          )}
        </div>
      </div>

      <Modal show={showLoginModal} onHide={toggleLoginModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Accedi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login onLogin={handleLogin} />
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default NavbarComponent;

/*import React, { useState, useEffect, useRef } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaTachometerAlt,
  FaSearch,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Login from "../../pages/Login/Login";
import "./Navbar.css";

const NavbarComponent = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false); // Stato per la visibilità della barra di ricerca
  const [searchQuery, setSearchQuery] = useState(""); // Stato per la query di ricerca

  const dashboardRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (dashboardRef.current && !dashboardRef.current.contains(event.target)) {
      setDashboardVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const handleLogin = (user) => {
    console.log("Utente loggato:", user);
    setShowLoginModal(false);
  };

  const navigateToCategory = (type) => {
    navigate(`/MangaList/${type}`);
  };

  const toggleDashboard = () => {
    setDashboardVisible(!dashboardVisible);
  };

  const handleSearchToggle = () => {
    setSearchVisible(!searchVisible); // Toggle visibilità della barra di ricerca
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Aggiorna la query di ricerca
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src="/path/to/your/logo.png" alt="Logo" className="logo-img" />
        </Link>

        <div className="navbar-nav mx-auto d-flex justify-content-center">
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => navigateToCategory("Manga")}
              >
                Manga
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => navigateToCategory("Figure")}
              >
                Figure
              </button>
            </li>
            <li className="nav-item">
              <Link to="/mangacreate" className="nav-link">
                Create
              </Link>
            </li>
          </ul>
        </div>

       
        <div className="d-flex align-items-center ms-auto gap-3 navbar-icons">
     
          <button
            onClick={handleSearchToggle}
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaSearch size={24} />
          </button>

   
          {searchVisible && (
            <input
              type="text"
              className="search-input"
              placeholder="Cerca..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          )}

          <button
            onClick={toggleLoginModal}
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaUser size={24} />
          </button>

          <Link
            to="/cart"
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaShoppingCart size={24} />
          </Link>

        
          <button
            onClick={toggleDashboard}
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaTachometerAlt size={24} />
          </button>

       
          {dashboardVisible && (
            <div className="dashboard-dropdown" ref={dashboardRef}>
              <Link to="/registationUser" className="nav-link">
                Registrazione
              </Link>
              <Link to="/sellerpage" className="nav-link">
                Venditori
              </Link>
              <Link to="/contact" className="nav-link">
                Contatti
              </Link>
            </div>
          )}
        </div>
      </div>

      <Modal show={showLoginModal} onHide={toggleLoginModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Accedi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login onLogin={handleLogin} />
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default NavbarComponent;
*/

/*import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaUser, FaTachometerAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Login from "../../pages/Login/Login";
import "./Navbar.css";

const NavbarComponent = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [dashboardVisible, setDashboardVisible] = useState(false);

  const dashboardRef = useRef(null); // Riferimento per il dropdown della dashboard
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (dashboardRef.current && !dashboardRef.current.contains(event.target)) {
      setDashboardVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const handleLogin = (user) => {
    console.log("Utente loggato:", user);
    setShowLoginModal(false);
  };

  const navigateToCategory = (type) => {
    navigate(`/MangaList/${type}`);
  };

  const toggleDashboard = () => {
    setDashboardVisible(!dashboardVisible);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src="/path/to/your/logo.png" alt="Logo" className="logo-img" />
        </Link>

        <div className="navbar-nav mx-auto d-flex justify-content-center">
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => navigateToCategory("Manga")}
              >
                Manga
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => navigateToCategory("Figure")}
              >
                Figure
              </button>
            </li>
            <li className="nav-item">
              <Link to="/mangacreate" className="nav-link">
                Create
              </Link>
            </li>
          </ul>
        </div>

        
        <div className="d-flex align-items-center ms-auto gap-3 navbar-icons">
          <button
            onClick={toggleLoginModal}
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaUser size={24} />
          </button>

          <Link
            to="/cart"
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaShoppingCart size={24} />
          </Link>

        
          <button
            onClick={toggleDashboard}
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaTachometerAlt size={24} />
          </button>

         
          {dashboardVisible && (
            <div className="dashboard-dropdown" ref={dashboardRef}>
              <Link to="/registationUser" className="nav-link">
                Registrazione
              </Link>
              <Link to="/sellerpage" className="nav-link">
                Venditori
              </Link>
              <Link to="/contact" className="nav-link">
                Contatti
              </Link>
            </div>
          )}
        </div>
      </div>

      <Modal show={showLoginModal} onHide={toggleLoginModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Accedi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login onLogin={handleLogin} />
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default NavbarComponent;
*/

/*import React, { useState, useEffect, useRef } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaTachometerAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Login from "../../pages/Login/Login";
import "./Navbar.css";

const NavbarComponent = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [dashboardVisible, setDashboardVisible] = useState(false);

  const searchBarRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const handleLogin = (user) => {
    console.log("Utente loggato:", user);
    setShowLoginModal(false);
  };

  const navigateToCategory = (type) => {
    navigate(`/MangaList/${type}`);
  };

  const toggleDashboard = () => {
    setDashboardVisible(!dashboardVisible);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src="/path/to/your/logo.png" alt="Logo" className="logo-img" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => navigateToCategory("Manga")}
              >
                Manga
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => navigateToCategory("Figure")}
              >
                Figure
              </button>
            </li>

            <li className="nav-item">
              <Link to="/mangacreate" className="nav-link">
                Create
              </Link>
            </li>
          </ul>
        </div>

        
        <div className="d-flex align-items-center ms-auto gap-3 navbar-icons d-none d-lg-flex">
          {!searchVisible && (
            <button
              onClick={toggleSearch}
              className="btn btn-link p-0 d-flex align-items-center text-black"
            >
              <FaSearch size={24} />
            </button>
          )}

          {searchVisible && (
            <div className="search-bar position-absolute" ref={searchBarRef}>
              <input
                type="text"
                className="form-control search-input"
                placeholder="Cerca..."
              />
            </div>
          )}

          <button
            onClick={toggleLoginModal}
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaUser size={24} />
          </button>

          <Link
            to="/cart"
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaShoppingCart size={24} />
          </Link>

          
          <button
            onClick={toggleDashboard}
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaTachometerAlt size={24} />
          </button>

       
          {dashboardVisible && (
            <div className="dashboard-dropdown">
              <Link to="/registration" className="nav-link">
                Registrazione
              </Link>
              <Link to="/sellers" className="nav-link">
                Venditori
              </Link>
              <Link to="/contacts" className="nav-link">
                Contatti
              </Link>
            </div>
          )}
        </div>

    
        <div className="d-flex align-items-center ms-auto gap-3 d-flex d-lg-none">
          {!searchVisible && (
            <button
              onClick={toggleSearch}
              className="btn btn-link p-0 d-flex align-items-center text-black"
            >
              <FaSearch size={24} />
            </button>
          )}

          {searchVisible && (
            <div className="search-bar position-absolute" ref={searchBarRef}>
              <input
                type="text"
                className="form-control search-input"
                placeholder="Cerca..."
              />
            </div>
          )}

          <button
            onClick={toggleLoginModal}
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaUser size={24} />
          </button>

          <Link
            to="/cart"
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaShoppingCart size={24} />
          </Link>

         
          <button
            onClick={toggleDashboard}
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaTachometerAlt size={24} />
          </button>

      
          {dashboardVisible && (
            <div className="dashboard-dropdown">
              <Link to="/registration" className="nav-link">
                Registrazione
              </Link>
              <Link to="/sellers" className="nav-link">
                Venditori
              </Link>
              <Link to="/contacts" className="nav-link">
                Contatti
              </Link>
            </div>
          )}
        </div>
      </div>

      <Modal show={showLoginModal} onHide={toggleLoginModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Accedi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login onLogin={handleLogin} />
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default NavbarComponent;
*/

/*import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Login from "../../pages/Login/Login";
import "./Navbar.css";

const NavbarComponent = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const searchBarRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const handleLogin = (user) => {
    console.log("Utente loggato:", user);
    setShowLoginModal(false);
  };

  const navigateToCategory = (type) => {
    navigate(`/MangaList/${type}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src="/path/to/your/logo.png" alt="Logo" className="logo-img" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => navigateToCategory("Manga")}
              >
                Manga
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => navigateToCategory("Figure")}
              >
                Figure
              </button>
            </li>

            <li className="nav-item">
              <Link to="/mangacreate" className="nav-link">
                Create
              </Link>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center ms-auto gap-3 navbar-icons d-none d-lg-flex">
          {!searchVisible && (
            <button
              onClick={toggleSearch}
              className="btn btn-link p-0 d-flex align-items-center text-black"
            >
              <FaSearch size={24} />
            </button>
          )}

          {searchVisible && (
            <div className="search-bar position-absolute" ref={searchBarRef}>
              <input
                type="text"
                className="form-control search-input"
                placeholder="Cerca..."
              />
            </div>
          )}

          <button
            onClick={toggleLoginModal}
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaUser size={24} />
          </button>

          <Link
            to="/cart"
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaShoppingCart size={24} />
          </Link>
        </div>

        <div className="d-flex align-items-center ms-auto gap-3 d-flex d-lg-none">
          {!searchVisible && (
            <button
              onClick={toggleSearch}
              className="btn btn-link p-0 d-flex align-items-center text-black"
            >
              <FaSearch size={24} />
            </button>
          )}

          {searchVisible && (
            <div className="search-bar position-absolute" ref={searchBarRef}>
              <input
                type="text"
                className="form-control search-input"
                placeholder="Cerca..."
              />
            </div>
          )}

          <button
            onClick={toggleLoginModal}
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaUser size={24} />
          </button>

          <Link
            to="/cart"
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaShoppingCart size={24} />
          </Link>
        </div>
      </div>

      <Modal show={showLoginModal} onHide={toggleLoginModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Accedi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login onLogin={handleLogin} />
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default NavbarComponent;
*/
/**/
