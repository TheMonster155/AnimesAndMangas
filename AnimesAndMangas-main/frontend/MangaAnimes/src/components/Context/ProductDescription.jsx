/*// src/components/ProductDescription.js
import React from "react";

const ProductDescription = ({ description }) => {
  return (
    <div className="product-description">
      <h3>Descrizione del prodotto</h3>
      <p>{description}</p>
    </div>
  );
};

export default ProductDescription;
*/
import React from "react";
import "./ProductDescription.css"; // Importa il file CSS
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
