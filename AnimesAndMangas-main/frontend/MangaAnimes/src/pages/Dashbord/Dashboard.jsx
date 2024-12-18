import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import NavbarComponent from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import useSession from "../../hohcks/useSession";
import "./Dashboard.css";
const Dashboard = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const sessionData = useSession();

  useEffect(() => {
    if (sessionData) {
      if (sessionData.role !== "seller") {
        navigate("/dashboard");
      } else {
        setUserInfo(sessionData);
      }
    } else {
      navigate("/dashboard");
    }
  }, [sessionData, navigate]);

  return (
    <>
      <NavbarComponent />
      <div className="dashboard-up" />
      <Container className="mt-5">
        {userInfo ? (
          <div>
            <h2>Benvenuto, Venditore {userInfo.userId}</h2>

            <div className="mt-4">
              <h3>Cosa vuoi fare oggi?</h3>

              <div className="my-3">
                <h4>1. Crea Manga</h4>
                <p>Qui puoi creare nuovi manga.</p>
                <Button
                  variant="primary"
                  onClick={() => navigate("/mangacreate")}
                >
                  Crea Manga
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
