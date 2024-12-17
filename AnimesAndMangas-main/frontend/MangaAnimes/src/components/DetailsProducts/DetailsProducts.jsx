import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllMangas } from "../../reduces/mangaReduces";
import {
  isMangaLoading,
  allMangas,
  errorManga,
} from "../../reduces/mangaReduces";
import ProductDescription from "../Context/ProductDescription";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import ProductComments from "../../components/ProductComments/ProductComments";
import NavbarComponent from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./DetailsProducts.css";
import { CartContext } from "../Context/CartContext";

const DetailsProducts = () => {
  const { addToCart } = useContext(CartContext);
  const { _id, productType } = useParams();
  const dispatch = useDispatch();
  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  useEffect(() => {
    if (productType === "manga") {
      dispatch(getAllMangas());
    }
  }, [dispatch, productType]);
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const product = mangas.find((manga) => manga._id === _id);

  if (isLoading) return <div>Caricamento...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <NavbarComponent />
      <div className="manga-space-up" />
      <div className="container mt-5">
        <div className="details_container">
          {product ? (
            <div className="row">
              <div className="col-md-6 product-image-container">
                <img
                  src={product.file?.url || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="product-image_details"
                />
              </div>
              <div className="col-md-6 product-details">
                <h1>{product.name}</h1>
                <p>€{product.price}</p>
                <p className="text-red">
                  Disponibilità:{" "}
                  {product.availability > 0 ? "Disponibile" : "Esaurito"}
                </p>
                <p className="text-red">Categoria: {product.category}</p>
                <p className="text-red">
                  Generi: {product.genres?.join(", ") || "N/A"}
                </p>
                <p className="text-red">Lingua: {product.language || "N/A"}</p>
                <p className="text-red">Autore: {product.author || "N/A"}</p>
                <p className="text-red">
                  Editore: {product.publisher || "N/A"}
                </p>

                <button
                  className="custom-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  Aggiungi al carrello
                </button>
              </div>
            </div>
          ) : (
            <p>Prodotto non trovato.</p>
          )}
        </div>
        {product && (
          <>
            <ProductDescription description={product.description} />
            <div className="related-comments-container">
              <RelatedProducts category={product.category} />

              <ProductComments
                productId={product._id}
                productType={productType}
                userRole="user"
              />
            </div>
          </>
        )}
      </div>
      <div className="manga-space-down" />
      <Footer />
    </>
  );
};

export default DetailsProducts;
