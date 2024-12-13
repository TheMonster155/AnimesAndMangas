import React from "react";
import "./ProductDescription.css";
const ProductDescription = ({ description }) => {
  return (
    <div className="product-description">
      <h3>Descrizione del prodotto</h3>
      <div className="description-box">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ProductDescription;
