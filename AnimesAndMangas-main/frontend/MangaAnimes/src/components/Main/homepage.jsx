/*import React, { useContext, useEffect, useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllMangas } from "../../reduces/mangaReduces";
import {
  isMangaLoading,
  allMangas,
  errorManga,
} from "../../reduces/mangaReduces";
import "./homepage.css";

const HomePage = () => {
  const [actionFigures, setActionFigures] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  useEffect(() => {
    // Caricamento dei manga e action figures
    dispatch(getAllMangas());

    fetch("http://localhost:3050/actionFigure")
      .then((response) => response.json())
      .then((data) => setActionFigures(data || []))
      .catch((error) => console.error("Errore fetch action figure:", error));
  }, [dispatch]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const getImageUrl = (file) => {
    return file?.url || "https://via.placeholder.com/150";
  };

  const handleDetailsProducts = (_id, type) => {
    const path =
      type === "actionFigure"
        ? `/details/actionfigure/${_id}`
        : `/details/manga/${_id}`;
    navigate(path);
  };

  return (
    <div>
      <div className="text-center mt-5">
        <h2>Ultime Uscite</h2>
        <div className="container">
          <div className="row">
            {isLoading ? (
              <p>Caricamento...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              mangas.length > 0 &&
              mangas.slice(0, 5).map((manga) => (
                <div className="col-md-4 mb-4" key={manga._id}>
                  <div
                    className="card-custom"
                    onClick={() => handleDetailsProducts(manga._id, "manga")}
                  >
                    <img
                      className="w-100"
                      src={getImageUrl(manga.file)}
                      alt={manga.name}
                    />
                    <div className="card-body-custom">
                      <h5>{manga.name}</h5>
                      <p>€{manga.price}</p>
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
                        <Button
                          variant="primary"
                          onClick={() => handleAddToCart(manga)}
                        >
                          Aggiungi al carrello
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <h2>Carosello Manga</h2>
        <Carousel>
          {chunkArray(mangas, 3).map((chunk, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                {chunk.map((manga) => (
                  <div
                    key={manga._id}
                    className="card-custom"
                    style={{ margin: "0 10px" }}
                    onClick={() => handleDetailsProducts(manga._id, "manga")}
                  >
                    <img
                      className="w-100"
                      src={getImageUrl(manga.file)}
                      alt={manga.name}
                    />
                    <div className="card-body-custom">
                      <h5>{manga.name}</h5>
                      <p>€{manga.price}</p>
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
                        <Button
                          variant="primary"
                          onClick={() => handleAddToCart(manga)}
                        >
                          Aggiungi al carrello
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="text-center mt-5">
        <h2>Action Figures</h2>
        <Carousel>
          {chunkArray(actionFigures, 3).map((chunk, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                {chunk.map((actionFigure) => (
                  <div
                    key={actionFigure._id}
                    className="card-custom"
                    style={{ margin: "0 10px" }}
                    onClick={() =>
                      handleDetailsProducts(actionFigure._id, "actionFigure")
                    }
                  >
                    <img
                      className="w-100"
                      src={getImageUrl(actionFigure.file)}
                      alt={actionFigure.name}
                    />
                    <div className="card-body-custom">
                      <h5>{actionFigure.name}</h5>
                      <p>€{actionFigure.price}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span
                          className={`text-${
                            actionFigure.availability > 0 ? "success" : "danger"
                          }`}
                        >
                          {actionFigure.availability > 0 ? (
                            <FaCheckCircle color="green" />
                          ) : (
                            <FaTimesCircle color="red" />
                          )}
                          {actionFigure.availability > 0
                            ? "Disponibile"
                            : "Esaurito"}
                        </span>
                        <Button
                          variant="primary"
                          onClick={() => handleAddToCart(actionFigure)}
                        >
                          Aggiungi al carrello
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HomePage;
*/
/*
import React, { useContext, useEffect, useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllMangas } from "../../reduces/mangaReduces";
import {
  isMangaLoading,
  allMangas,
  errorManga,
} from "../../reduces/mangaReduces";
import "./homepage.css";

const HomePage = () => {
  const [actionFigures, setActionFigures] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  useEffect(() => {
    // Caricamento dei manga e action figures
    dispatch(getAllMangas());

    fetch("http://localhost:3050/actionFigure")
      .then((response) => response.json())
      .then((data) => setActionFigures(data || []))
      .catch((error) => console.error("Errore fetch action figure:", error));
  }, [dispatch]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Funzione per mescolare gli elementi in un array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const getImageUrl = (file) => {
    return file?.url || "https://via.placeholder.com/150";
  };

  const handleDetailsProducts = (_id, type) => {
    const path =
      type === "actionFigure"
        ? `/details/actionfigure/${_id}`
        : `/details/manga/${_id}`;
    navigate(path);
  };

  // Unire e mescolare i manga e le action figures
  const combinedItems = shuffleArray([...mangas, ...actionFigures]);

  return (
    <div>
 
      <div className="text-center mt-5">
       
        <Carousel>
          {chunkArray(combinedItems.slice(0, 6), 3).map((chunk, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                {chunk.map((item) => (
                  <div
                    key={item._id}
                    className="card-custom"
                    style={{ margin: "0 10px" }}
                    onClick={() =>
                      handleDetailsProducts(item._id, item.type || "manga")
                    }
                  >
                    <img
                      className="w-100"
                      src={getImageUrl(item.file)}
                      alt={item.name}
                    />
                    <div className="card-body-custom">
                      <h5>{item.name}</h5>
                      <p>€{item.price}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span
                          className={`text-${
                            item.availability > 0 ? "success" : "danger"
                          }`}
                        >
                          {item.availability > 0 ? (
                            <FaCheckCircle color="green" />
                          ) : (
                            <FaTimesCircle color="red" />
                          )}
                          {item.availability > 0 ? "Disponibile" : "Esaurito"}
                        </span>
                        <Button
                          variant="primary"
                          onClick={() => handleAddToCart(item)}
                        >
                          Aggiungi al carrello
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="text-center mt-5">
        <h2>Ultime Uscite</h2>
        <div className="container">
          <div className="row">
            {isLoading ? (
              <p>Caricamento...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              mangas.length > 0 &&
              mangas.slice(0, 3).map((manga) => (
                <div className="col-md-4 mb-4" key={manga._id}>
                  <div
                    className="card-custom"
                    onClick={() => handleDetailsProducts(manga._id, "manga")}
                  >
                    <img
                      className="w-100"
                      src={getImageUrl(manga.file)}
                      alt={manga.name}
                    />
                    <div className="card-body-custom">
                      <h5>{manga.name}</h5>
                      <p>€{manga.price}</p>
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
                        <Button
                          variant="primary"
                          onClick={() => handleAddToCart(manga)}
                        >
                          Aggiungi al carrello
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>


      <div className="text-center mt-5">
        <h2>Carosello Manga</h2>
        <Carousel>
          {chunkArray(mangas, 3).map((chunk, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                {chunk.map((manga) => (
                  <div
                    key={manga._id}
                    className="card-custom"
                    style={{ margin: "0 10px" }}
                    onClick={() => handleDetailsProducts(manga._id, "manga")}
                  >
                    <img
                      className="w-100"
                      src={getImageUrl(manga.file)}
                      alt={manga.name}
                    />
                    <div className="card-body-custom">
                      <h5>{manga.name}</h5>
                      <p>€{manga.price}</p>
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
                        <Button
                          variant="primary"
                          onClick={() => handleAddToCart(manga)}
                        >
                          Aggiungi al carrello
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="text-center mt-5">
        <h2>Carosello Action Figures</h2>
        <Carousel>
          {chunkArray(actionFigures, 3).map((chunk, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                {chunk.map((actionFigure) => (
                  <div
                    key={actionFigure._id}
                    className="card-custom"
                    style={{ margin: "0 10px" }}
                    onClick={() =>
                      handleDetailsProducts(actionFigure._id, "actionFigure")
                    }
                  >
                    <img
                      className="w-100"
                      src={getImageUrl(actionFigure.file)}
                      alt={actionFigure.name}
                    />
                    <div className="card-body-custom">
                      <h5>{actionFigure.name}</h5>
                      <p>€{actionFigure.price}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span
                          className={`text-${
                            actionFigure.availability > 0 ? "success" : "danger"
                          }`}
                        >
                          {actionFigure.availability > 0 ? (
                            <FaCheckCircle color="green" />
                          ) : (
                            <FaTimesCircle color="red" />
                          )}
                          {actionFigure.availability > 0
                            ? "Disponibile"
                            : "Esaurito"}
                        </span>
                        <Button
                          variant="primary"
                          onClick={() => handleAddToCart(actionFigure)}
                        >
                          Aggiungi al carrello
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HomePage;
*/

/*
import React, { useContext, useEffect, useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllMangas } from "../../reduces/mangaReduces";
import {
  isMangaLoading,
  allMangas,
  errorManga,
} from "../../reduces/mangaReduces";
import "./homepage.css";

const HomePage = () => {
  const [actionFigures, setActionFigures] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  useEffect(() => {
    // Caricamento dei manga e action figures
    dispatch(getAllMangas());

    fetch("http://localhost:3051/actionFigure")
      .then((response) => response.json())
      .then((data) => setActionFigures(data || []))
      .catch((error) => console.error("Errore fetch action figure:", error));
  }, [dispatch]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Funzione per mescolare gli elementi in un array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const getImageUrl = (file) => {
    return file?.url || "https://via.placeholder.com/150";
  };

  const handleDetailsProducts = (_id, type) => {
    const path =
      type === "actionFigure"
        ? `/details/actionfigure/${_id}`
        : `/details/manga/${_id}`;
    navigate(path);
  };

  // Unire e mescolare i manga e le action figures
  const combinedItems = shuffleArray([...mangas, ...actionFigures]);

  return (
    <div>
      <div>
        <div className="text-center mt-5">
          <Carousel>
            {chunkArray(combinedItems.slice(0, 3), 1).map((chunk, index) => (
              <Carousel.Item key={index}>
                <div className="d-flex justify-content-center">
                  {chunk.map((item) => (
                    <img
                      key={item._id}
                      className="w-75" // Applicato direttamente alla immagine
                      src={getImageUrl(item.file)}
                      alt={item.name}
                      onClick={() =>
                        handleDetailsProducts(item._id, item.type || "manga")
                      }
                    />
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>

      <div className="text-center mt-5">
        <h2>Ultime Uscite</h2>
        <div className="container">
          <div className="row">
            {isLoading ? (
              <p>Caricamento...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              mangas.length > 0 &&
              mangas.slice(0, 3).map((manga) => (
                <div className="col-md-4 mb-4" key={manga._id}>
                  <div
                    className="card-custom"
                    onClick={() => handleDetailsProducts(manga._id, "manga")}
                  >
                    <img
                      className="w-100"
                      src={getImageUrl(manga.file)}
                      alt={manga.name}
                    />
                    <div className="card-body-custom">
                      <h5>{manga.name}</h5>
                      <p>€{manga.price}</p>
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
                        <Button
                          variant="primary"
                          onClick={(event) => {
                            event.stopPropagation(); // Previene la propagazione del click
                            handleAddToCart(manga);
                          }}
                        >
                          Aggiungi al carrello
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <h2>Carosello Manga</h2>
        <Carousel>
          {chunkArray(mangas, 3).map((chunk, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                {chunk.map((manga) => (
                  <div
                    key={manga._id}
                    className="card-custom"
                    style={{ margin: "0 10px" }}
                    onClick={() => handleDetailsProducts(manga._id, "manga")}
                  >
                    <img
                      className="w-100"
                      src={getImageUrl(manga.file)}
                      alt={manga.name}
                    />
                    <div className="card-body-custom">
                      <h5>{manga.name}</h5>
                      <p>€{manga.price}</p>
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
                        <Button
                          variant="primary"
                          onClick={() => handleAddToCart(manga)}
                        >
                          Aggiungi al carrello
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="text-center mt-5">
        <h2>Carosello Action Figures</h2>
        <Carousel>
          {chunkArray(actionFigures, 3).map((chunk, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                {chunk.map((actionFigure) => (
                  <div
                    key={actionFigure._id}
                    className="card-custom"
                    style={{ margin: "0 10px" }}
                    onClick={() =>
                      handleDetailsProducts(actionFigure._id, "actionFigure")
                    }
                  >
                    <img
                      className="w-100"
                      src={getImageUrl(actionFigure.file)}
                      alt={actionFigure.name}
                    />
                    <div className="card-body-custom">
                      <h5>{actionFigure.name}</h5>
                      <p>€{actionFigure.price}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span
                          className={`text-${
                            actionFigure.availability > 0 ? "success" : "danger"
                          }`}
                        >
                          {actionFigure.availability > 0 ? (
                            <FaCheckCircle color="green" />
                          ) : (
                            <FaTimesCircle color="red" />
                          )}
                          {actionFigure.availability > 0
                            ? "Disponibile"
                            : "Esaurito"}
                        </span>
                        <Button
                          variant="primary"
                          onClick={() => handleAddToCart(actionFigure)}
                        >
                          Aggiungi al carrello
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HomePage;
*/

import React, { useContext, useEffect, useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllMangas } from "../../reduces/mangaReduces";
import {
  isMangaLoading,
  allMangas,
  errorManga,
} from "../../reduces/mangaReduces";
import "./homepage.css";

const HomePage = () => {
  const [actionFigures, setActionFigures] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  useEffect(() => {
    // Caricamento dei manga e action figures
    dispatch(getAllMangas());

    fetch("http://localhost:3051/actionFigure")
      .then((response) => response.json())
      .then((data) => setActionFigures(data || []))
      .catch((error) => console.error("Errore fetch action figure:", error));
  }, [dispatch]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Funzione per mescolare gli elementi in un array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const getImageUrl = (file) => {
    return file?.url || "https://via.placeholder.com/150";
  };

  const handleDetailsProducts = (_id, type) => {
    const path =
      type === "actionFigure"
        ? `/details/actionfigure/${_id}`
        : `/details/manga/${_id}`;
    navigate(path);
  };

  // Unire e mescolare i manga e le action figures
  const combinedItems = shuffleArray([...mangas, ...actionFigures]);

  return (
    <div>
      <div>
        <div className="text-center mt-5">
          <Carousel>
            {chunkArray(combinedItems.slice(0, 3), 1).map((chunk, index) => (
              <Carousel.Item key={index}>
                <div className="d-flex justify-content-center">
                  {chunk.map((item) => (
                    <img
                      key={item._id}
                      className="w-75" // Applicato direttamente alla immagine
                      src={getImageUrl(item.file)}
                      alt={item.name}
                      onClick={() =>
                        handleDetailsProducts(item._id, item.type || "manga")
                      }
                    />
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>

      <div className="text-center mt-5">
        <h2>Ultime Uscite</h2>
        <div className="container">
          <div className="row">
            {isLoading ? (
              <p>Caricamento...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              mangas.length > 0 &&
              mangas.slice(0, 3).map((manga) => (
                <div className="col-md-4 mb-4" key={manga._id}>
                  <div
                    className="card-custom"
                    onClick={() => handleDetailsProducts(manga._id, "manga")}
                  >
                    <img
                      className="w-100"
                      src={getImageUrl(manga.file)}
                      alt={manga.name}
                    />
                    <div className="card-body-custom">
                      <h5>{manga.name}</h5>
                      <p>€{manga.price}</p>
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
                        <Button
                          variant="primary"
                          onClick={(event) => {
                            event.stopPropagation(); // Previene la propagazione del click
                            handleAddToCart(manga);
                          }}
                        >
                          Aggiungi al carrello
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <h2>Carosello Manga</h2>
        <Carousel>
          {chunkArray(mangas, 6).map((chunk, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                {chunk.map((manga) => (
                  <div
                    key={manga._id}
                    className="card-custom"
                    style={{ margin: "0 10px" }}
                    onClick={() => handleDetailsProducts(manga._id, "manga")}
                  >
                    <img
                      className="w-100"
                      src={getImageUrl(manga.file)}
                      alt={manga.name}
                    />
                    <div className="card-body-custom">
                      <h5>{manga.name}</h5>
                      <p>€{manga.price}</p>
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
                        <Button
                          variant="primary"
                          onClick={() => handleAddToCart(manga)}
                        >
                          Aggiungi al carrello
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="text-center mt-5">
        <h2>Carosello Action Figures</h2>
        <Carousel>
          {chunkArray(actionFigures, 6).map((chunk, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                {chunk.map((actionFigure) => (
                  <div
                    key={actionFigure._id}
                    className="card-custom"
                    style={{ margin: "0 10px" }}
                    onClick={() =>
                      handleDetailsProducts(actionFigure._id, "actionFigure")
                    }
                  >
                    <img
                      className="w-100"
                      src={getImageUrl(actionFigure.file)}
                      alt={actionFigure.name}
                    />
                    <div className="card-body-custom">
                      <h5>{actionFigure.name}</h5>
                      <p>€{actionFigure.price}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span
                          className={`text-${
                            actionFigure.availability > 0 ? "success" : "danger"
                          }`}
                        >
                          {actionFigure.availability > 0 ? (
                            <FaCheckCircle color="green" />
                          ) : (
                            <FaTimesCircle color="red" />
                          )}
                          {actionFigure.availability > 0
                            ? "Disponibile"
                            : "Esaurito"}
                        </span>
                        <Button
                          variant="primary"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleAddToCart(actionFigure);
                          }}
                        >
                          Aggiungi al carrello
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HomePage;
