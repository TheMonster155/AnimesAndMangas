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
da usare
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
/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allMangas } from "../../reduces/mangaReduces"; // Assicurati di importare la funzione di selezione giusta
import { Row, Col, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import NavbarComponent from "../Navbar/Navbar";

const RelatedProducts = ({ category }) => {
  const { _id } = useParams(); // Prendi l'ID del prodotto selezionato dalla URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ottieni tutti i prodotti dallo store
  const mangas = useSelector(allMangas);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  // Filtra i prodotti per la stessa categoria ma escludendo il prodotto corrente
  useEffect(() => {
    if (mangas.length > 0 && category) {
      const filteredProducts = mangas.filter(
        (product) => product.category === category && product._id !== _id // Filtra per categoria ed escludi il prodotto selezionato
      );
      setRelatedProducts(filteredProducts);

      // Se non ci sono prodotti correlati, seleziona prodotti casuali
      if (filteredProducts.length === 0) {
        const randomSelection = mangas
          .filter(
            (product) =>
              ["Manga", "Figure"].includes(product.type) && product._id !== _id
          )
          .sort(() => 0.5 - Math.random()) // Ordina casualmente
          .slice(0, 4); // Prendi i primi 4 risultati
        setRandomProducts(randomSelection);
      }
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
        {relatedProducts.length > 0 ? (
          relatedProducts.slice(0, 4).map((product) => (
            <Col md={3} key={product._id}>
              <Card
                className="mb-4"
                onClick={() => handleDetailsProducts(product._id)}
              >
                <Card.Img
                  variant="top"
                  src={getImageUrl(product.file)}
                  alt={product.name}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>€{product.price}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>
                      {product.availability > 0 ? (
                        <FaCheckCircle color="green" />
                      ) : (
                        <FaTimesCircle color="red" />
                      )}
                    </span>
                    <span className="price-with-icon">€{product.price}</span>
                  </div>
                  <div className="product-description">
                    <p>
                      {product.description.length > 100
                        ? product.description.substring(0, 100) + "..."
                        : product.description}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : randomProducts.length > 0 ? (
          randomProducts.map((product) => (
            <Col md={3} key={product._id}>
              <Card
                className="mb-4"
                onClick={() => handleDetailsProducts(product._id)}
              >
                <Card.Img
                  variant="top"
                  src={getImageUrl(product.file)}
                  alt={product.name}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>€{product.price}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>
                      {product.availability > 0 ? (
                        <FaCheckCircle color="green" />
                      ) : (
                        <FaTimesCircle color="red" />
                      )}
                    </span>
                    <span className="price-with-icon">€{product.price}</span>
                  </div>
                  <div className="product-description">
                    <p>
                      {product.description.length > 100
                        ? product.description.substring(0, 100) + "..."
                        : product.description}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Nessun prodotto disponibile.</p>
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

// Set di immagini casuali per tipo di prodotto
const randomImagesByType = {
  Manga: [
    "https://via.placeholder.com/150?text=Manga+1",
    "https://via.placeholder.com/150?text=Manga+2",
    "https://via.placeholder.com/150?text=Manga+3",
    "https://via.placeholder.com/150?text=Manga+4",
  ],
  Figure: [
    "https://via.placeholder.com/150?text=Figure+1",
    "https://via.placeholder.com/150?text=Figure+2",
    "https://via.placeholder.com/150?text=Figure+3",
    "https://via.placeholder.com/150?text=Figure+4",
  ],
  default: [
    "https://via.placeholder.com/150?text=Default+1",
    "https://via.placeholder.com/150?text=Default+2",
    "https://via.placeholder.com/150?text=Default+3",
  ],
};

const RelatedProducts = ({ category }) => {
  const { _id } = useParams(); // Prendi l'ID del prodotto selezionato dalla URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ottieni tutti i prodotti dallo store
  const mangas = useSelector(allMangas);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  // Filtra i prodotti per la stessa categoria ma escludendo il prodotto corrente
  useEffect(() => {
    if (mangas.length > 0 && category) {
      const filteredProducts = mangas.filter(
        (product) => product.category === category && product._id !== _id // Filtra per categoria ed escludi il prodotto selezionato
      );
      setRelatedProducts(filteredProducts);

      // Se non ci sono prodotti correlati, seleziona prodotti casuali
      if (filteredProducts.length === 0) {
        const randomSelection = mangas
          .filter(
            (product) =>
              ["Manga", "Figure"].includes(product.type) && product._id !== _id
          )
          .sort(() => 0.5 - Math.random()) // Ordina casualmente
          .slice(0, 4); // Prendi i primi 4 risultati
        setRandomProducts(randomSelection);
      }
    }
  }, [mangas, category, _id]); // Aggiungi _id alle dipendenze per ricalcolare se cambia

  const handleDetailsProducts = (_id) => {
    navigate(`/details/${_id}`);
  };

  // Funzione per ottenere l'URL dell'immagine, con fallback per le immagini casuali in base al tipo
  const getImageUrl = (file, type) => {
    if (file?.url) {
      return file.url;
    } else {
      // Se non c'è un'immagine, scegli una random dall'elenco in base al tipo
      const randomImages =
        randomImagesByType[type] || randomImagesByType.default;
      const randomIndex = Math.floor(Math.random() * randomImages.length);
      return randomImages[randomIndex];
    }
  };

  return (
    <div className="text-center mt-5">
      <h3>Prodotti Correlati</h3>
      <Row>
        {relatedProducts.length > 0 ? (
          relatedProducts.slice(0, 4).map((product) => (
            <Col md={3} key={product._id}>
              <Card
                className="mb-4"
                onClick={() => handleDetailsProducts(product._id)}
              >
                <Card.Img
                  variant="top"
                  src={getImageUrl(product.file, product.type)} // Passiamo anche il tipo per determinare l'immagine casuale
                  alt={product.name}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>€{product.price}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>
                      {product.availability > 0 ? (
                        <FaCheckCircle color="green" />
                      ) : (
                        <FaTimesCircle color="red" />
                      )}
                    </span>
                    <span className="price-with-icon">€{product.price}</span>
                  </div>
                  <div className="product-description">
                    <p>
                      {product.description.length > 100
                        ? product.description.substring(0, 100) + "..."
                        : product.description}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : randomProducts.length > 0 ? (
          randomProducts.map((product) => (
            <Col md={3} key={product._id}>
              <Card
                className="mb-4"
                onClick={() => handleDetailsProducts(product._id)}
              >
                <Card.Img
                  variant="top"
                  src={getImageUrl(product.file, product.type)} // Passiamo anche il tipo per determinare l'immagine casuale
                  alt={product.name}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>€{product.price}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>
                      {product.availability > 0 ? (
                        <FaCheckCircle color="green" />
                      ) : (
                        <FaTimesCircle color="red" />
                      )}
                    </span>
                    <span className="price-with-icon">€{product.price}</span>
                  </div>
                  <div className="product-description">
                    <p>
                      {product.description.length > 100
                        ? product.description.substring(0, 100) + "..."
                        : product.description}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Nessun prodotto disponibile.</p>
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
  const { _id } = useParams(); // Prendi l'ID del prodotto selezionato dalla URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ottieni tutti i prodotti dallo store
  const mangas = useSelector(allMangas);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  // Filtra i prodotti per la stessa categoria ma escludendo il prodotto corrente
  useEffect(() => {
    if (mangas.length > 0 && category) {
      const filteredProducts = mangas.filter(
        (product) => product.category === category && product._id !== _id // Filtra per categoria ed escludi il prodotto selezionato
      );
      setRelatedProducts(filteredProducts);

      // Se non ci sono prodotti correlati, seleziona prodotti casuali in base al tipo
      if (filteredProducts.length === 0) {
        const randomSelection = mangas
          .filter(
            (product) =>
              ["Manga", "Figure"].includes(product.type) && product._id !== _id
          )
          .sort(() => 0.5 - Math.random()) // Ordina casualmente
          .slice(0, 4); // Prendi i primi 4 risultati
        setRandomProducts(randomSelection);
      }
    }
  }, [mangas, category, _id]); // Aggiungi _id alle dipendenze per ricalcolare se cambia

  const handleDetailsProducts = (_id) => {
    navigate(`/details/${_id}`);
  };

  const getImageUrl = (file) => {
    return file?.url || "https://via.placeholder.com/150"; // Restituisce l'immagine o una di default
  };

  // Funzione per mostrare i prodotti correlati o random in base alla disponibilità
  const renderProducts = (products) => {
    if (products.length === 0) {
      return <p>Nessun prodotto disponibile.</p>;
    }

    return products.map((product) => (
      <Col md={3} key={product._id}>
        <Card
          className="mb-4"
          onClick={() => handleDetailsProducts(product._id)}
        >
          <Card.Img
            variant="top"
            src={getImageUrl(product.file)}
            alt={product.name}
          />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>€{product.price}</Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                {product.availability > 0 ? (
                  <FaCheckCircle color="green" />
                ) : (
                  <FaTimesCircle color="red" />
                )}
              </span>
              <span className="price-with-icon">€{product.price}</span>
            </div>
            <div className="product-description">
              <p>
                {product.description.length > 100
                  ? product.description.substring(0, 100) + "..."
                  : product.description}
              </p>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <div className="text-center mt-5">
      <h3>Prodotti Correlati</h3>
      <Row>
        {relatedProducts.length > 0
          ? renderProducts(relatedProducts.slice(0, 4)) // Mostra i prodotti correlati
          : renderProducts(
              randomProducts.length > 0 ? randomProducts : mangas.slice(0, 4)
            )}
      </Row>
    </div>
  );
};

export default RelatedProducts;
