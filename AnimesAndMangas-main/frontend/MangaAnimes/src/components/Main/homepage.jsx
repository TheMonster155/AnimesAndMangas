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
  selectFigures,
} from "../../reduces/mangaReduces";
import "./homepage.css";

const HomePage = () => {
  const [actionFigures, setActionFigures] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mangas = useSelector(allMangas);
  const figures = useSelector(selectFigures);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  useEffect(() => {
    dispatch(getAllMangas());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

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
        ? `/details/Figure/${_id}`
        : `/details/manga/${_id}`;
    navigate(path);
  };

  const combinedItems = shuffleArray([...mangas, ...actionFigures]);

  return (
    <div>
      <div>
        <div className="text-center mt-5">
          <Carousel className="carousel-large">
            {chunkArray(
              [
                "https://res.cloudinary.com/dzdxelv4m/image/upload/v1734066026/33419_d4sims.jpg",
                "https://res-console.cloudinary.com/dzdxelv4m/thumbnails/v1/image/upload/v1734067067/MzMyNDRfeWVvcmZp/drilldown",
                "https://res-console.cloudinary.com/dzdxelv4m/thumbnails/v1/image/upload/v1734076610/bmluamEtNzcwMTEyNl8xOTIwX21veWZzYQ==/drilldown",
              ],
              1
            ).map((chunk, index) => (
              <Carousel.Item key={index}>
                <div className="d-flex justify-content-center position-relative">
                  {chunk.map((item, itemIndex) => (
                    <img
                      key={itemIndex}
                      src={item}
                      alt={`carousel-image-${itemIndex + 1}`}
                      onClick={() => handleDetailsProducts(item, "image")}
                    />
                  ))}

                  {index === 1 && (
                    <div className="carousel-text text-start position-absolute top-0 start-0 opacity-100">
                      Benvenuti in MangasAndAnimes
                    </div>
                  )}
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
                      <h5 className="product-name ">{manga.name}</h5>
                      <p>
                        €{manga.price}
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
                        </span>
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          className="custom-button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleAddToCart(manga);
                          }}
                        >
                          Aggiungi al carrello
                        </button>
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
        <Carousel
          responsive={{
            superLargeDesktop: {
              breakpoint: { max: 4000, min: 1024 },
              items: 4,
            },
            desktop: {
              breakpoint: { max: 1024, min: 768 },
              items: 2,
            },
            tablet: {
              breakpoint: { max: 768, min: 576 },
              items: 1,
            },
            mobile: {
              breakpoint: { max: 576, min: 0 },
              items: 1,
            },
          }}
        >
          {chunkArray(
            mangas.filter((manga) => manga.type === "Manga"),
            4
          ).map((chunk, index) => (
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
                      <h5 className="product-name ">{manga.name}</h5>
                      <p>
                        €{manga.price}{" "}
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
                        </span>
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          className="custom-button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleAddToCart(manga);
                          }}
                        >
                          Aggiungi al carrello
                        </button>
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
        <h2>Carosello Figure</h2>
        <Carousel className="carousel-large">
          {chunkArray(
            figures.filter((figure) => figure.type === "Figure"),
            4
          ).map((chunk, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                {chunk.map((figure) => (
                  <div
                    key={figure._id}
                    className="card-custom"
                    style={{ margin: "0 10px" }}
                    onClick={() =>
                      handleDetailsProducts(figure._id, "actionFigure")
                    }
                  >
                    <img
                      className="w-100"
                      src={getImageUrl(figure.file)}
                      alt={figure.name}
                    />
                    <div className="card-body-custom">
                      <h5 className="product-name">{figure.name}</h5>
                      <p>
                        €{figure.price}{" "}
                        <span
                          className={`text-${
                            figure.availability > 0 ? "success" : "danger"
                          }`}
                        >
                          {figure.availability > 0 ? (
                            <FaCheckCircle color="green" />
                          ) : (
                            <FaTimesCircle color="red" />
                          )}
                        </span>{" "}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          className="custom-button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleAddToCart(figure);
                          }}
                        >
                          Aggiungi al carrello
                        </button>
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
