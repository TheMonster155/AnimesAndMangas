import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allMangas } from "../../reduces/mangaReduces";
import { Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./RelatedProducts.css";

const RelatedProducts = ({ category }) => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mangas = useSelector(allMangas);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    if (mangas.length > 0 && category) {
      const filteredProducts = mangas.filter(
        (product) => product.category === category && product._id !== _id
      );
      setRelatedProducts(filteredProducts);

      if (filteredProducts.length === 0) {
        const randomSelection = mangas
          .filter(
            (product) =>
              ["Manga", "Figure"].includes(product.type) && product._id !== _id
          )
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setRandomProducts(randomSelection);
      }
    }
  }, [mangas, category, _id]);

  const handleDetailsProducts = (productId, productType) => {
    navigate(`/details/${productType}/${productId}`);
  };

  const getImageUrl = (file) => {
    return file?.url || "https://via.placeholder.com/150";
  };

  const renderProducts = (products) => {
    if (products.length === 0) {
      return <p>Nessun prodotto disponibile.</p>;
    }

    return products.map((product) => (
      <Col
        xs={6}
        sm={4}
        md={3}
        key={product._id}
        className="d-flex justify-content-center mb-4"
      >
        <div
          className="card-custom"
          onClick={() => handleDetailsProducts(product._id, product.type)}
        >
          <img className="card-custom-img" src={getImageUrl(product.file)} />
          <div className="card-body-custom">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">€{product.price}</p>
            <p>
              {product.description.length > 100
                ? product.description.substring(0, 100) + "..."
                : product.description}
            </p>
          </div>
        </div>
      </Col>
    ));
  };

  return (
    <div className="text-center mt-5">
      <h3>Prodotti Correlati</h3>
      <Row className="d-flex justify-content-center">
        {relatedProducts.length > 0
          ? renderProducts(relatedProducts.slice(0, 4))
          : renderProducts(
              randomProducts.length > 0 ? randomProducts : mangas.slice(0, 4)
            )}
      </Row>
    </div>
  );
};

export default RelatedProducts;
