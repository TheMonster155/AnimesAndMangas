import React, { useState, useEffect, useRef } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaTachometerAlt,
  FaSearch,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Login from "../../pages/Login/Login";
import "./Navbar.css";

const NavbarComponent = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const dashboardRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
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
    setShowLoginModal(false);
  };

  const navigateToCategory = (type) => {
    navigate(`/MangaList/${type}`);
  };

  const toggleDashboard = () => {
    setDashboardVisible(!dashboardVisible);
  };

  const handleSearchToggle = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleNavigate = () => {
    navigate("/dashboard");
  };

  const fetchProductsByQuery = async (query) => {
    if (query.trim() === "") return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/products/search/${query}`
      );
      const data = await response.json();
      if (response.ok) {
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
          <img
            src="https://res.cloudinary.com/dzdxelv4m/image/upload/v1738780402/logo2_vtx71x.jpg"
            alt="Logo"
            className="logo-img"
          />
        </Link>

        <div className="navbar-nav mx-auto d-flex justify-content-center">
          <ul className="navbar-nav d-flex flex-row  justify-content-center align-items-center ">
            <li className="nav-item  me-2 mt-2">
              <button
                className="nav-link btn btn-link    "
                onClick={() => navigateToCategory("Manga")}
              >
                Manga
              </button>
            </li>
            <li className="nav-item ms-2">
              <button
                className="nav-link btn btn-link "
                onClick={() => navigateToCategory("Figure")}
              >
                Figure
              </button>
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
              <Button
                variant="link"
                className="nav-link"
                onClick={handleNavigate}
              >
                Venditori
              </Button>
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
