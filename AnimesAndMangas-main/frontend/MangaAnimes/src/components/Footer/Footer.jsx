import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <footer className="bg-secondary text-light py-4 w-100 mb-0">
      <Container fluid>
        <Row>
          <Col className="col-12 col-md-3 mb-3">
            <img
              src="https://res-console.cloudinary.com/dzdxelv4m/thumbnails/v1/image/upload/v1734462695/YmdfZjhmOGY4LWZsYXRfNzUweF8wNzVfZi1wYWRfNzUweDEwMDBfZjhmOGY4X29tdWY1eA==/drilldown"
              alt="Logo"
              className="footer-logo-img"
            />
          </Col>

          <Col className="col-12 col-md-3 mb-3">
            <h5 className="fw-bold">Prodotti</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#novità" className="text-light text-decoration-none">
                  Novità
                </a>
              </li>
              <li>
                <a href="#manga" className="text-light text-decoration-none">
                  Manga
                </a>
              </li>
            </ul>
          </Col>

          <Col className="col-12 col-md-3 mb-3">
            <h5 className="fw-bold">Informazioni</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#termini" className="text-light text-decoration-none">
                  Termini e Condizioni
                </a>
                <p>
                  Alcune immagini utilizzate in questo sito potrebbero essere
                  protette da copyright e sono utilizzate solo a scopo didattico
                  e non commerciale.
                </p>
              </li>
              <li>
                <a href="#docente" className="text-light text-decoration-none">
                  Carta del Docente
                </a>
              </li>
              <li>
                <a
                  href="#spedizioni"
                  className="text-light text-decoration-none"
                >
                  Spedizioni e Resi
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-light text-decoration-none">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#cookie" className="text-light text-decoration-none">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#faq" className="text-light text-decoration-none">
                  Domande Frequenti
                </a>
              </li>
              <li>
                <a
                  href="#contattaci"
                  className="text-light text-decoration-none"
                >
                  Contattaci
                </a>
              </li>
            </ul>
          </Col>

          <Col className="col-12 col-md-3 mb-3">
            <h5 className="fw-bold">Il tuo Account</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="#informazioni-personali"
                  className="text-light text-decoration-none"
                >
                  Informazioni Personali
                </a>
              </li>
              <li>
                <a href="#ordini" className="text-light text-decoration-none">
                  Ordini
                </a>
              </li>
              <li>
                <a
                  href="#note-credito"
                  className="text-light text-decoration-none"
                >
                  Note di Credito
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
