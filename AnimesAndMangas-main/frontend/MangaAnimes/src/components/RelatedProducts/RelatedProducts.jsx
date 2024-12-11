/*import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allMangas } from "../../reduces/mangaReduces"; // Assicurati di importare la funzione di selezione giusta
import { Row, Col, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import NavbarComponent from "../Navbar/Navbar";

const RelatedProducts = ({ category }) => {
  const { _id } = useParams(); // Prendi l'ID del manga selezionato dalla URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ottieni tutti i manga dallo store
  const mangas = useSelector(allMangas);
  const [relatedMangas, setRelatedMangas] = useState([]);

  // Filtra i manga per la stessa categoria ma escludendo il manga corrente
  useEffect(() => {
    if (mangas.length > 0 && category) {
      const filteredMangas = mangas.filter(
        (manga) => manga.category === category && manga._id !== _id // Filtra per categoria ed escludi il manga selezionato
      );
      setRelatedMangas(filteredMangas);
    }
  }, [mangas, category, _id]); // Aggiungi _id alle dipendenze per ricalcolare se cambia

  const handleDetailsProducts = (_id) => {
    navigate(`/details/${_id}`);
  };

  const getImageUrl = (file) => {
    return file?.url || "https://via.placeholder.com/150";
  };

  return (
    <div className="text-center mt-5">
      

      <h3>Prodotti Correlati</h3>
      <Row>
        {relatedMangas.length > 0 ? (
          relatedMangas.slice(0, 4).map((manga) => (
            <Col md={3} key={manga._id}>
              <Card
                className="mb-4"
                onClick={() => handleDetailsProducts(manga._id)}
              >
                <Card.Img
                  variant="top"
                  src={getImageUrl(manga.file)}
                  alt={manga.name}
                />
                <Card.Body>
                  <Card.Title>{manga.name}</Card.Title>
                  <Card.Text>€{manga.price}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span
                      className={`text-${
                        manga.availability > 0 ? "success" : "danger"
                      }`}
                    >
                      {manga.availability > 0 ? (
                        <FaCheckCircle color="green" />
                      ) : (
                        <FaTimesCircle color="red" />
                      )}
                      {manga.availability > 0 ? "Disponibile" : "Esaurito"}
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Non ci sono prodotti correlati in questa categoria.</p>
        )}
      </Row>
    </div>
  );
};

export default RelatedProducts;
*/
/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allMangas } from "../../reduces/mangaReduces"; // Assicurati di importare la funzione di selezione giusta
import { Row, Col, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import NavbarComponent from "../Navbar/Navbar";

const RelatedProducts = ({ category }) => {
  const { _id } = useParams(); // Prendi l'ID del manga selezionato dalla URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ottieni tutti i manga dallo store
  const mangas = useSelector(allMangas);
  const [relatedMangas, setRelatedMangas] = useState([]);

  // Filtra i manga per la stessa categoria ma escludendo il manga corrente
  useEffect(() => {
    if (mangas.length > 0 && category) {
      const filteredMangas = mangas.filter(
        (manga) => manga.category === category && manga._id !== _id // Filtra per categoria ed escludi il manga selezionato
      );
      setRelatedMangas(filteredMangas);
    }
  }, [mangas, category, _id]); // Aggiungi _id alle dipendenze per ricalcolare se cambia

  const handleDetailsProducts = (_id) => {
    navigate(`/details/${_id}`);
  };

  const getImageUrl = (file) => {
    return file?.url || "https://via.placeholder.com/150";
  };

  return (
    <div className="text-center mt-5">
      <h3>Prodotti Correlati</h3>
      <Row>
        {relatedMangas.length > 0 ? (
          relatedMangas.slice(0, 4).map((manga) => (
            <Col md={3} key={manga._id}>
              <Card
                className="mb-4"
                onClick={() => handleDetailsProducts(manga._id)}
              >
                <Card.Img
                  variant="top"
                  src={getImageUrl(manga.file)}
                  alt={manga.name}
                />
                <Card.Body>
                  <Card.Title>{manga.name}</Card.Title>
                  <Card.Text>€{manga.price}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>
                      {manga.availability > 0 ? (
                        <FaCheckCircle color="green" />
                      ) : (
                        <FaTimesCircle color="red" />
                      )}
                    </span>
                    <span className="price-with-icon">€{manga.price}</span>
                  </div>
                  <div className="manga-description">
                    <p>
                      {manga.description.length > 100
                        ? manga.description.substring(0, 100) + "..."
                        : manga.description}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Non ci sono prodotti correlati in questa categoria.</p>
        )}
      </Row>
    </div>
  );
};

export default RelatedProducts;
*/

/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allMangas } from "../../reduces/mangaReduces"; // Assicurati di importare la funzione di selezione giusta
import { Row, Col, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import NavbarComponent from "../Navbar/Navbar";

const RelatedProducts = ({ category }) => {
  const { _id } = useParams(); // Prendi l'ID del manga selezionato dalla URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ottieni tutti i manga dallo store
  const mangas = useSelector(allMangas);
  const [relatedMangas, setRelatedMangas] = useState([]);

  // Filtra i manga per la stessa categoria ma escludendo il manga corrente
  useEffect(() => {
    if (mangas.length > 0 && category) {
      const filteredMangas = mangas.filter(
        (manga) => manga.category === category && manga._id !== _id // Filtra per categoria ed escludi il manga selezionato
      );
      setRelatedMangas(filteredMangas);
    }
  }, [mangas, category, _id]); // Aggiungi _id alle dipendenze per ricalcolare se cambia

  const handleDetailsProducts = (_id) => {
    navigate(`/details/${_id}`);
  };

  const getImageUrl = (file) => {
    return file?.url || "https://via.placeholder.com/150";
  };

  return (
    <div className="text-center mt-5">
      <h3>Prodotti Correlati</h3>
      <Row>
        {relatedMangas.length > 0 ? (
          relatedMangas.slice(0, 4).map((manga) => (
            <Col md={3} key={manga._id}>
              <Card
                className="mb-4"
                onClick={() => handleDetailsProducts(manga._id)}
              >
                <Card.Img
                  variant="top"
                  src={getImageUrl(manga.file)}
                  alt={manga.name}
                />
                <Card.Body>
                  <Card.Title>{manga.name}</Card.Title>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="d-flex align-items-center">
                      {manga.availability > 0 ? (
                        <FaCheckCircle color="green" />
                      ) : (
                        <FaTimesCircle color="red" />
                      )}
                      <span className="price">€{manga.price}</span>
                    </span>
                  </div>
                  <div className="manga-description">
                    <p>
                      {manga.description.length > 100
                        ? manga.description.substring(0, 100) + "..."
                        : manga.description}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Non ci sono prodotti correlati in questa categoria.</p>
        )}
      </Row>
    </div>
  );
};

export default RelatedProducts;
*/

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allMangas } from "../../reduces/mangaReduces"; // Assicurati di importare la funzione di selezione giusta
import { Row, Col, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import NavbarComponent from "../Navbar/Navbar";

const RelatedProducts = ({ category }) => {
  const { _id } = useParams(); // Prendi l'ID del manga selezionato dalla URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ottieni tutti i manga dallo store
  const mangas = useSelector(allMangas);
  const [relatedMangas, setRelatedMangas] = useState([]);

  // Filtra i manga per la stessa categoria ma escludendo il manga corrente
  useEffect(() => {
    if (mangas?.length > 0 && category) {
      const filteredMangas = mangas.filter(
        (manga) => manga.category === category && manga._id !== _id // Filtra per categoria ed escludi il manga selezionato
      );
      setRelatedMangas(filteredMangas);
    }
  }, [mangas, category, _id]); // Aggiungi _id alle dipendenze per ricalcolare se cambia

  const handleDetailsProducts = (_id) => {
    navigate(`/details/${_id}`);
  };

  const getImageUrl = (file) => {
    return file?.url || "https://via.placeholder.com/150";
  };

  return (
    <div className="text-center mt-5">
      <h3>Prodotti Correlati</h3>
      <Row>
        {relatedMangas?.length > 0 ? (
          relatedMangas.slice(0, 4).map((manga) => (
            <Col md={3} key={manga._id}>
              <Card
                className="mb-4"
                onClick={() => handleDetailsProducts(manga._id)}
              >
                <Card.Img
                  variant="top"
                  src={getImageUrl(manga.file)}
                  alt={manga.name}
                />
                <Card.Body>
                  <Card.Title>{manga.name}</Card.Title>
                  <div className="d-flex justify-content-center align-items-center">
                    <span className="price m-3">€{manga.price}</span>
                    <span className="availability-icon">
                      {manga.availability > 0 ? (
                        <FaCheckCircle color="green" />
                      ) : (
                        <FaTimesCircle color="red" />
                      )}
                    </span>
                  </div>
                  <div className="manga-description">
                    <p>
                      {manga.description && manga.description.length > 100
                        ? manga.description.substring(0, 100) + "..."
                        : manga.description || "Descrizione non disponibile"}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Non ci sono prodotti correlati in questa categoria.</p>
        )}
      </Row>
    </div>
  );
};

export default RelatedProducts;
