import React from "react";
import { Carousel } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const CaroselloManga = ({ mangas, handleAddToCart, handleDetailsProducts }) => {
  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const getImageUrl = (file) => file?.url || "https://via.placeholder.com/150";

  return (
    <div className="text-center mt-5">
      <h2>Carosello Manga</h2>

      <div className="d-none d-md-block">
        <Carousel>
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
                      <h5 className="product-name">{manga.name}</h5>
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
                        </span>{" "}
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

      <div className="d-block d-md-none">
        <div className="row">
          {mangas
            .filter((manga) => manga.type === "Manga")
            .slice(0, 4)
            .map((manga) => (
              <div
                key={manga._id}
                className="col-6 col-sm-4 col-md-3 mb-3 d-flex justify-content-center"
              >
                <div
                  className="card-custom"
                  onClick={() => handleDetailsProducts(manga._id, "manga")}
                >
                  <img
                    className="card-img-top"
                    src={getImageUrl(manga.file)}
                    alt={manga.name}
                  />
                  <div className="card-body-custom">
                    <h5 className="product-name">{manga.name}</h5>
                    <p>
                      €{manga.price}{" "}
                      <span
                        className={`text-${
                          manga.availability > 0 ? "success" : "danger"
                        }`}
                      ></span>
                    </p>
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
      </div>
    </div>
  );
};

export default CaroselloManga;
