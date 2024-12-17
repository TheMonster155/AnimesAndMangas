import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const UltimeUscite = ({
  mangas,
  isLoading,
  error,
  handleAddToCart,
  handleDetailsProducts,
}) => {
  const getImageUrl = (file) => file?.url || "https://via.placeholder.com/150";

  return (
    <div className="text-center mt-5">
      <h2>Ultime Uscite</h2>
      <div className="container">
        <div className="row">
          {isLoading ? (
            <p>Caricamento...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            mangas.slice(0, 3).map((manga) => (
              <div
                className="col-6 col-sm-4 col-md-3 mb-3 d-flex justify-content-center"
                key={manga._id}
              >
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
  );
};

export default UltimeUscite;
