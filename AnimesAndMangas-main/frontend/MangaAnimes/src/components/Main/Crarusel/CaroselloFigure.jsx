import React from "react";
import { Carousel } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const CaroselloFigure = ({
  figures,
  handleAddToCart,
  handleDetailsProducts,
}) => {
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
      <h2>Carosello Figure</h2>

      <div className="d-none d-md-block">
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
                        </span>
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

      <div className="d-block d-md-none">
        <div className="row justify-content-center">
          {figures
            .filter((figure) => figure.type === "Figure")
            .slice(0, 4)
            .map((figure) => (
              <div
                key={figure._id}
                className="col-6 col-sm-4 col-md-3 mb-3 d-flex justify-content-center"
              >
                <div
                  className="card-custom"
                  onClick={() =>
                    handleDetailsProducts(figure._id, "actionFigure")
                  }
                >
                  <img
                    className="card-img-top"
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
                      </span>
                    </p>
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
      </div>
    </div>
  );
};

export default CaroselloFigure;
