import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allMangas } from "../../reduces/mangaReduces";
import { Row, Col, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import NavbarComponent from "../Navbar/Navbar";

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
  const handleDetailsProducts = (_id) => {
    navigate(`/details/${_id}`);
  };

  const getImageUrl = (file) => {
    return file?.url || "https://via.placeholder.com/150";
  };

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
          ? renderProducts(relatedProducts.slice(0, 4))
          : renderProducts(
              randomProducts.length > 0 ? randomProducts : mangas.slice(0, 4)
            )}
      </Row>
    </div>
  );
};

export default RelatedProducts;
