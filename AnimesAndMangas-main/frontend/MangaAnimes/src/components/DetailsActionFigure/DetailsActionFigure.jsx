/*import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllActionFigures } from "../../reduces/actionFigureRedux";
import {
  isActionFigureLoading,
  allActionFigures,
  errorActionFigure,
} from "../../reduces/actionFigureRedux";
import ProductDescription from "../Context/ProductDescription";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import ProductComments from "../../components/ProductComments/ProductComments"; // Import del nuovo componente

const DetailsActionFigure = () => {
  const { _id, productType } = useParams();
  const dispatch = useDispatch();

  const actionFigures = useSelector(allActionFigures);
  const isLoading = useSelector(isActionFigureLoading);
  const error = useSelector(errorActionFigure);

  useEffect(() => {
    dispatch(getAllActionFigures());
  }, [dispatch]);

  const actionFigure = actionFigures.find(
    (actionFigure) => actionFigure._id === _id
  );

  if (isLoading) return <div>Caricamento...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      {actionFigure ? (
        <div className="row">
          <div className="col-md-6">
            <img
              src={actionFigure.file?.url || "https://via.placeholder.com/150"}
              alt={actionFigure.name}
              className="w-100"
            />
          </div>
          <div className="col-md-6">
            <h2>{actionFigure.name}</h2>
            <p>€{actionFigure.price}</p>
            <p>
              Disponibilità:{" "}
              {actionFigure.availability > 0 ? "Disponibile" : "Esaurito"}
            </p>
          </div>
        </div>
      ) : (
        <p>Action figure non trovata.</p>
      )}
      {actionFigure && (
        <ProductDescription description={actionFigure.description} />
      )}
      {actionFigure && <RelatedProducts category={actionFigure.category} />}
      {actionFigure && (
        <ProductComments
          productId={product._id}
          productType={productType} // Passa il tipo di prodotto dinamicamente
          userRole="user"
        />
        // <ProductComments productId={actionFigure._id} userRole="user" />
      )}
    </div>
  );
};

export default DetailsActionFigure;
*/

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllActionFigures } from "../../reduces/actionFigureRedux";
import {
  isActionFigureLoading,
  allActionFigures,
  errorActionFigure,
} from "../../reduces/actionFigureRedux";
import ProductDescription from "../Context/ProductDescription";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import ProductComments from "../../components/ProductComments/ProductComments"; // Import del nuovo componente
import NavbarComponent from "../Navbar/Navbar";
import "./DetailsProducts.css"; // Importa il file CSS
import Footer from "../Footer/Footer";
const DetailsActionFigure = () => {
  const { _id, productType } = useParams(); // Ottieni il parametro della route
  const dispatch = useDispatch();

  const actionFigures = useSelector(allActionFigures);
  const isLoading = useSelector(isActionFigureLoading);
  const error = useSelector(errorActionFigure);

  useEffect(() => {
    dispatch(getAllActionFigures());
  }, [dispatch]);

  const actionFigure = actionFigures.find(
    (actionFigure) => actionFigure._id === _id
  );

  if (isLoading) return <div>Caricamento...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <NavbarComponent />
      <div className="action-figure-details-up" />
      <div className="container">
        {actionFigure ? (
          <div className="row">
            <div className="col-md-6">
              <img
                src={
                  actionFigure.file?.url || "https://via.placeholder.com/150"
                }
                alt={actionFigure.name}
                className="w-100"
              />
            </div>
            <div className="col-md-6">
              <h2>{actionFigure.name}</h2>
              <p>€{actionFigure.price}</p>
              <p>
                Disponibilità:{" "}
                {actionFigure.availability > 0 ? "Disponibile" : "Esaurito"}
              </p>
            </div>
          </div>
        ) : (
          <p>Action figure non trovata.</p>
        )}
        {actionFigure && (
          <ProductDescription description={actionFigure.description} />
        )}
        {actionFigure && <RelatedProducts category={actionFigure.category} />}
        {actionFigure && (
          <ProductComments
            productId={actionFigure._id} // Passa il _id dinamicamente
            productType={productType} // Passa il tipo di prodotto dinamicamente
            userRole="user"
          />
        )}
      </div>
      <div className="action-figure-details-down" />
      <Footer />
    </>
  );
};

export default DetailsActionFigure;
