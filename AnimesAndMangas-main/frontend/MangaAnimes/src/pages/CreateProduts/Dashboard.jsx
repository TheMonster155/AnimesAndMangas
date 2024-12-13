import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import NavbarComponent from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  // Se l'utente non è autenticato o non è admin o seller, reindirizza
  useEffect(() => {
    const storedAuthData = JSON.parse(localStorage.getItem("Authorization"));

    if (
      !storedAuthData ||
      (storedAuthData.role !== "admin" && storedAuthData.role !== "seller")
    ) {
      navigate("/"); // Reindirizza alla home o alla pagina di login
    } else {
      setUserInfo(storedAuthData);
    }
  }, [navigate]);

  return (
    <>
      <NavbarComponent />
      <div className="dashboard-up" />
      <Container className="mt-5">
        {userInfo ? (
          <div className="dashboard-up">
            <h2>
              Benvenuto, {userInfo.role === "admin" ? "Admin" : "Venditore"}{" "}
              {userInfo.userId}
            </h2>

            <div className="mt-4">
              <h3>Cosa vuoi fare oggi?</h3>

              <div className="my-3">
                <h4>1. Crea Manga</h4>
                <p>Qui puoi creare nuovi manga.</p>
                <Button
                  variant="primary"
                  onClick={() => navigate("/createManga")}
                >
                  Crea Manga
                </Button>
              </div>

              <div className="my-3">
                <h4>2. Crea Action Figure</h4>
                <p>Qui puoi creare nuove action figure.</p>
                <Button
                  variant="primary"
                  onClick={() => navigate("/createActionFigure")}
                >
                  Crea Action Figure
                </Button>
              </div>

              <div className="my-3">
                <h4>3. I tuoi Dati e Prodotti</h4>
                <p>
                  Qui puoi vedere i tuoi dati e i prodotti che stai vendendo.
                </p>
                <Button
                  variant="primary"
                  onClick={() => navigate("/yourProducts")}
                >
                  Visualizza i tuoi prodotti
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
      <div className="dashboard-down" />
      <Footer />
    </>
  );
};

export default Dashboard;
