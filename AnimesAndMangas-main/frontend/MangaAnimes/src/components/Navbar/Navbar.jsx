/*import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaUser, FaSearch, FaCaretDown } from "react-icons/fa";
import "./Navbar.css";

const NavbarComponent = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const searchBarRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target) &&
      !dropdownRef.current.contains(event.target)
    ) {
      setSearchVisible(false);
      setDropdownVisible(false);
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
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="row w-100 align-items-center">
    
          <div className="col-6 col-md-3">
            <a className="logo" href="#home">
              <img src="/path/to/your/logo.png" alt="Logo" />
            </a>
          </div>

      
          <div className="col-6 col-md-6 d-flex justify-content-center">
            <div className="navbar-links">
              <a href="#manga" className="navbar-link">
                Manga
              </a>
              <a href="#figure" className="navbar-link">
                Figure
              </a>
              <a href="#novita" className="navbar-link">
                Novità
              </a>
            </div>
          </div>

         
          <div className="col-6 col-md-3 d-flex justify-content-end">
            <div className="navbar-icons">
              {!searchVisible && (
                <button onClick={toggleSearch} className="search-btn">
                  <FaSearch size={24} />
                </button>
              )}

              {searchVisible && (
                <div className="search-bar" ref={searchBarRef}>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Cerca..."
                  />
                </div>
              )}

              {searchVisible && (
                <div className="dropdown" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="dropdown-btn"
                  ></button>
                </div>
              )}

              <a href="#login" className="navbar-icon">
                <FaUser size={24} />
              </a>

              <a href="#cart" className="navbar-icon">
                <FaShoppingCart size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
*/
/*
import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import Login from "../../pages/Login"; // Import del componente Login
import "./Navbar.css";

const NavbarComponent = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // Stato per il modale di login

  const searchBarRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target) &&
      !dropdownRef.current.contains(event.target)
    ) {
      setSearchVisible(false);
      setDropdownVisible(false);
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
    setDropdownVisible(false);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal); // Alterna la visibilità del modale
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="row w-100 align-items-center">
          
          <div className="col-6 col-md-3">
            <a className="logo" href="#home">
              <img src="/path/to/your/logo.png" alt="Logo" />
            </a>
          </div>

          <div className="col-6 col-md-6 d-flex justify-content-center">
            <div className="navbar-links">
              <a href="#manga" className="navbar-link">
                Manga
              </a>
              <a href="#figure" className="navbar-link">
                Figure
              </a>
              <a href="#novita" className="navbar-link">
                Novità
              </a>
            </div>
          </div>

       
          <div className="col-6 col-md-3 d-flex justify-content-end">
            <div className="navbar-icons">
              {!searchVisible && (
                <button onClick={toggleSearch} className="search-btn">
                  <FaSearch size={24} />
                </button>
              )}

              {searchVisible && (
                <div className="search-bar" ref={searchBarRef}>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Cerca..."
                  />
                </div>
              )}

              <button
                onClick={toggleLoginModal}
                className="navbar-icon login-btn"
              >
                <FaUser size={24} />
              </button>

              <a href="#cart" className="navbar-icon">
                <FaShoppingCart size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

    
      <Modal show={showLoginModal} onHide={toggleLoginModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Accedi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login
            onLogin={(user) => console.log("Utente loggato:", user)}
            handleCloseLogin={toggleLoginModal} // Chiude il modale dopo il login
          />
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default NavbarComponent;
*/

/*    
          <div className="col-6 col-md-6 d-flex justify-content-center">
            <div className="navbar-links">
              <a href="#manga" className="navbar-link">
                Manga
              </a>
              <a href="#figure" className="navbar-link">
                Figure
              </a>
              <a href="#novita" className="navbar-link">
                Novità
              </a>
            </div>
          </div>
*/

/*
import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import corretto di Link
import { Modal } from "react-bootstrap";
import Login from "../../pages/Login/Login"; // Import del componente Login
import "./Navbar.css";

const NavbarComponent = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // Stato per il modale di login

  const searchBarRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setSearchVisible(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
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
    setDropdownVisible(false);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal); // Alterna la visibilità del modale
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="row w-100 align-items-center">
        
          <div className="col-6 col-md-3">
            <a className="logo" href="#home">
              <img src="/path/to/your/logo.png" alt="Logo" />
            </a>
          </div>

        
          <div className="col-6 col-md-6 d-flex justify-content-center">
            <div className="navbar-links">
            
              <Link to="/mangacreate" className="navbar-link">
                Manga
              </Link>
              <a href="#figure" className="navbar-link">
                Figure
              </a>
              <a href="#novita" className="navbar-link">
                Novità
              </a>
            </div>
          </div>

          <div className="col-6 col-md-3 d-flex justify-content-end">
            <div className="navbar-icons">
              {!searchVisible && (
                <button onClick={toggleSearch} className="search-btn">
                  <FaSearch size={24} />
                </button>
              )}

              {searchVisible && (
                <div className="search-bar" ref={searchBarRef}>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Cerca..."
                  />
                </div>
              )}

              <button
                onClick={toggleLoginModal}
                className="navbar-icon login-btn"
              >
                <FaUser size={24} />
              </button>

              <a href="#cart" className="navbar-icon">
                <FaShoppingCart size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

    
      <Modal show={showLoginModal} onHide={toggleLoginModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Accedi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login
            onLogin={(user) => console.log("Utente loggato:", user)}
            handleCloseLogin={toggleLoginModal} // Chiude il modale dopo il login
          />
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default NavbarComponent;
*/
/*
import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Login from "../../pages/Login/Login";
import { useAuth } from "../../pages/Login/AuthContext"; // Importa il contesto
import "./Navbar.css";

const NavbarComponent = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { authData } = useAuth(); // Ottiene i dati dell'utente dal contesto
  const searchBarRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setSearchVisible(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
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
    setDropdownVisible(false);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="row w-100 align-items-center">
        
          <div className="col-6 col-md-3">
            <a className="logo" href="#home">
              <img src="/path/to/your/logo.png" alt="Logo" />
            </a>
          </div>

       
          <div className="col-6 col-md-6 d-flex justify-content-center">
            <div className="navbar-links">
              <Link to="/mangacreate" className="navbar-link">
                Manga
              </Link>
              <a href="#figure" className="navbar-link">
                Figure
              </a>
              <a href="#novita" className="navbar-link">
                Novità
              </a>

              
              {(authData?.role === "admin" || authData?.role === "seller") && (
                <Link to="/create" className="navbar-link">
                  Create
                </Link>
              )}
            </div>
          </div>

          <div className="col-6 col-md-3 d-flex justify-content-end">
            <div className="navbar-icons">
              {!searchVisible && (
                <button onClick={toggleSearch} className="search-btn">
                  <FaSearch size={24} />
                </button>
              )}

              {searchVisible && (
                <div className="search-bar" ref={searchBarRef}>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Cerca..."
                  />
                </div>
              )}

              <button
                onClick={toggleLoginModal}
                className="navbar-icon login-btn"
              >
                <FaUser size={24} />
              </button>

              <a href="#cart" className="navbar-icon">
                <FaShoppingCart size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

   
      <Modal show={showLoginModal} onHide={toggleLoginModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Accedi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login
            onLogin={(user) => {
              console.log("Utente loggato:", user);
              setShowLoginModal(false); // Chiude il modale dopo il login
            }}
          />
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default NavbarComponent;
*/
/*
import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Login from "../../pages/Login/Login";
import { useAuth } from "../../pages/Login/AuthContext";
import "./Navbar.css";

const NavbarComponent = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { authData } = useAuth(); // Ottiene i dati dell'utente dal contesto
  const searchBarRef = useRef(null);
  const dropdownRef = useRef(null);

  // Debug: verifica cosa arriva nel contesto
  console.log("Dati utente nel contesto:", authData);

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setSearchVisible(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log("Ruolo utente aggiornato:", authData?.role);
  }, [authData]);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    setDropdownVisible(false);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="row w-100 align-items-center">
          <div className="col-6 col-md-3">
            <a className="logo" href="#home">
              <img src="/path/to/your/logo.png" alt="Logo" />
            </a>
          </div>

          <div className="col-6 col-md-6 d-flex justify-content-center">
            <div className="navbar-links">
              <Link to="/mangacreate" className="navbar-link">
                Manga
              </Link>
              <a href="#figure" className="navbar-link">
                Figure
              </a>
              <a href="#novita" className="navbar-link">
                Novità
              </a>

              {(authData?.role === "admin" || authData?.role === "seller") && (
                <Link to="/create" className="navbar-link">
                  Create
                </Link>
              )}
            </div>
          </div>

          <div className="col-6 col-md-3 d-flex justify-content-end">
            <div className="navbar-icons">
              {!searchVisible && (
                <button onClick={toggleSearch} className="search-btn">
                  <FaSearch size={24} />
                </button>
              )}

              {searchVisible && (
                <div className="search-bar" ref={searchBarRef}>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Cerca..."
                  />
                </div>
              )}

              <button
                onClick={toggleLoginModal}
                className="navbar-icon login-btn"
              >
                <FaUser size={24} />
              </button>

              <a href="#cart" className="navbar-icon">
                <FaShoppingCart size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showLoginModal} onHide={toggleLoginModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Accedi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login
            onLogin={(user) => {
              console.log("Utente loggato:", user);
              setShowLoginModal(false); // Chiude il modale dopo il login
            }}
          />
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default NavbarComponent;
*/
/*
import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Login from "../../pages/Login/Login";
import "./Navbar.css";

const NavbarComponent = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Gestisci lo stato di autenticazione

  const searchBarRef = useRef(null);
  const dropdownRef = useRef(null);

  // Debug: verifica lo stato di autenticazione
  console.log("Autenticato:", isAuthenticated);

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setSearchVisible(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
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
    setDropdownVisible(false);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const handleLogin = (user) => {
    console.log("Utente loggato:", user);
    setIsAuthenticated(true); // Imposta lo stato come autenticato
    setShowLoginModal(false); // Chiude il modale dopo il login
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="row w-100 align-items-center">
          <div className="col-6 col-md-3">
            <a className="logo" href="#home">
              <img src="/path/to/your/logo.png" alt="Logo" />
            </a>
          </div>

          <div className="col-6 col-md-6 d-flex justify-content-center">
            <div className="navbar-links">
              <Link to="/mangacreate" className="navbar-link">
                Manga
              </Link>
              <a href="#figure" className="navbar-link">
                Figure
              </a>
              <a href="#novita" className="navbar-link">
                Novità
              </a>

              {isAuthenticated && (
                <Link to="/create" className="navbar-link">
                  Create
                </Link>
              )}
            </div>
          </div>

          <div className="col-6 col-md-3 d-flex justify-content-end">
            <div className="navbar-icons">
              {!searchVisible && (
                <button onClick={toggleSearch} className="search-btn">
                  <FaSearch size={24} />
                </button>
              )}

              {searchVisible && (
                <div className="search-bar" ref={searchBarRef}>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Cerca..."
                  />
                </div>
              )}

              <button
                onClick={toggleLoginModal}
                className="navbar-icon login-btn"
              >
                <FaUser size={24} />
              </button>

              <a href="/cart" className="navbar-icon">
                <FaShoppingCart size={24} />
              </a>
            </div>
          </div>
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
/*
import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Login from "../../pages/Login/Login";
import "./Navbar.css";

const NavbarComponent = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const searchBarRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setSearchVisible(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
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
    setDropdownVisible(false);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const handleLogin = (user) => {
    console.log("Utente loggato:", user);
    setShowLoginModal(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="row w-100 align-items-center">
          <div className="col-6 col-md-3">
            <a className="logo" href="#home">
              <img src="/path/to/your/logo.png" alt="Logo" />
            </a>
          </div>

          <div className="col-6 col-md-6 d-flex justify-content-center">
            <div className="navbar-links">
              <Link to="/mangacreate" className="navbar-link">
                Manga
              </Link>
              <a href="#figure" className="navbar-link">
                Figure
              </a>
              <a href="#novita" className="navbar-link">
                Novità
              </a>

              <Link to="/create" className="navbar-link">
                Create
              </Link>
            </div>
          </div>

          <div className="col-6 col-md-3 d-flex justify-content-end">
            <div className="navbar-icons">
              {!searchVisible && (
                <button onClick={toggleSearch} className="search-btn">
                  <FaSearch size={24} />
                </button>
              )}

              {searchVisible && (
                <div className="search-bar" ref={searchBarRef}>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Cerca..."
                  />
                </div>
              )}

              <button
                onClick={toggleLoginModal}
                className="navbar-icon login-btn"
              >
                <FaUser size={24} />
              </button>

              <Link
                to="/cart"
                className="navbar-icon"
                onClick={() => console.log("Navigazione verso /cart")}
              >
                <FaShoppingCart size={24} />
              </Link>
            </div>
          </div>
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
/*
import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Login from "../../pages/Login/Login";
import "./Navbar.css";

const NavbarComponent = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const searchBarRef = useRef(null);

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

  return (
    <nav className="navbar">
      <div className="container">
        <div className="row w-100 align-items-center">
          <div className="col-6 col-md-3">
            <a className="logo" href="#home">
              <img src="/path/to/your/logo.png" alt="Logo" />
            </a>
          </div>

          <div className="col-6 col-md-6 d-flex justify-content-center">
            <div className="navbar-links">
              <Link to="/mangacreate" className="navbar-link">
                Manga
              </Link>
              <a href="#figure" className="navbar-link">
                Figure
              </a>
              <a href="#novita" className="navbar-link">
                Novità
              </a>

              <Link to="/create" className="navbar-link">
                Create
              </Link>
            </div>
          </div>

          <div className="col-6 col-md-3 d-flex justify-content-end">
            <div className="navbar-icons">
              {!searchVisible && (
                <button onClick={toggleSearch} className="search-btn">
                  <FaSearch size={24} />
                </button>
              )}

              {searchVisible && (
                <div className="search-bar" ref={searchBarRef}>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Cerca..."
                  />
                </div>
              )}

              <button
                onClick={toggleLoginModal}
                className="navbar-icon login-btn"
              >
                <FaUser size={24} />
              </button>

              <Link
                to="/cart"
                className="navbar-icon"
                onClick={() => console.log("Navigazione verso /cart")}
              >
                <FaShoppingCart size={24} />
              </Link>
            </div>
          </div>
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
/*
import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Login from "../../pages/Login/Login";
import "./Navbar.css";

const NavbarComponent = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const searchBarRef = useRef(null);

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

  return (
    <nav className="navbar">
      <div className="container">
        <div className="row w-100 align-items-center">
          <div className="col-6 col-md-3">
            <a className="logo" href="#home">
              <img src="/path/to/your/logo.png" alt="Logo" />
            </a>
          </div>

          <div className="col-6 col-md-6 d-flex justify-content-center">
            <div className="navbar-links">
              <Link to="/mangacreate" className="navbar-link">
                Manga
              </Link>
              <a href="#figure" className="navbar-link">
                Figure
              </a>
              <a href="#novita" className="navbar-link">
                Novità
              </a>

              <Link to="/create" className="navbar-link">
                Create
              </Link>
            </div>
          </div>

          <div className="col-6 col-md-3 d-flex justify-content-end">
            <div className="navbar-icons">
              {!searchVisible && (
                <button onClick={toggleSearch} className="search-btn">
                  <FaSearch size={24} />
                </button>
              )}

              {searchVisible && (
                <div className="search-bar" ref={searchBarRef}>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Cerca..."
                  />
                </div>
              )}

              <button
                onClick={toggleLoginModal}
                className="navbar-icon login-btn"
              >
                <FaUser size={24} />
              </button>

              <Link
                to="/cart"
                className="navbar-icon"
                onClick={() => console.log("Navigazione verso /cart")}
              >
                <FaShoppingCart size={24} />
              </Link>
            </div>
          </div>
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
/*
import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Login from "../../pages/Login/Login";
import "./Navbar.css";

const NavbarComponent = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const searchBarRef = useRef(null);

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
              <Link to="/mangacreate" className="nav-link">
                Manga
              </Link>
            </li>
            <li className="nav-item">
              <a href="#figure" className="nav-link">
                Figure
              </a>
            </li>
            <li className="nav-item">
              <a href="#novita" className="nav-link">
                Novità
              </a>
            </li>
            <li className="nav-item">
              <Link to="/create" className="nav-link">
                Create
              </Link>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center gap-3">
          {!searchVisible && (
            <button
              onClick={toggleSearch}
              className="btn btn-link p-0 search-btn"
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
            className="btn btn-link p-0 login-btn"
          >
            <FaUser size={24} />
          </button>

          <Link
            to="/cart"
            className="btn btn-link p-0 cart-btn"
            onClick={() => console.log("Navigazione verso /cart")}
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
/*
import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Login from "../../pages/Login/Login";
import "./Navbar.css";

const NavbarComponent = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const searchBarRef = useRef(null);

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
              <Link to="/mangacreate" className="nav-link">
                Manga
              </Link>
            </li>
            <li className="nav-item">
              <a href="#figure" className="nav-link">
                Figure
              </a>
            </li>
            <li className="nav-item">
              <a href="#novita" className="nav-link">
                Novità
              </a>
            </li>
            <li className="nav-item">
              <Link to="/create" className="nav-link">
                Create
              </Link>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center ms-auto gap-3 navbar-icons">
          {!searchVisible && (
            <button
              onClick={toggleSearch}
              className="btn btn-link p-0 t-5 text-black search-btn"
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
            className="btn btn-link p-0  b-5 text-black login-btn"
          >
            <FaUser size={24} />
          </button>

          <Link
            to="/cart"
            className="btn btn-link p-0  b-5 text-black cart-btn"
            onClick={() => console.log("Navigazione verso /cart")}
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

import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Login from "../../pages/Login/Login";
import "./Navbar.css";

const NavbarComponent = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const searchBarRef = useRef(null);

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

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow fixed-top">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src="/path/to/your/logo.png" alt="Logo" className="logo-img" />
        </Link>

        {/* Navbar Toggle (per dispositivi mobili) */}
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

        {/* Navbar Links */}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/MangaList" className="nav-link">
                Manga
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ActionFigureList" className="nav-link">
                Figure
              </Link>
            </li>
            <li className="nav-item">
              <a href="#novita" className="nav-link">
                Novità
              </a>
            </li>
            <li className="nav-item">
              <Link to="/mangacreate" className="nav-link">
                Create
              </Link>
            </li>
          </ul>
        </div>

        {/* Icons */}
        <div className="d-flex align-items-center ms-auto gap-3 navbar-icons">
          {/* Search */}
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

          {/* Login */}
          <button
            onClick={toggleLoginModal}
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaUser size={24} />
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className="btn btn-link p-0 d-flex align-items-center text-black"
          >
            <FaShoppingCart size={24} />
          </Link>
        </div>
      </div>

      {/* Login Modal */}
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
