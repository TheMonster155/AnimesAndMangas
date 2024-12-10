import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allActionFigures } from "../../reduces/actionFigureRedux"; // Importa la funzione di selezione giusta per le action figures
import { Row, Col, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const RelatedActionFigures = ({ category }) => {
  const { _id } = useParams(); // Prendi l'ID dell'action figure selezionata dalla URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ottieni tutte le action figures dallo store
  const actionFigures = useSelector(allActionFigures);
  const [relatedActionFigures, setRelatedActionFigures] = useState([]);

  // Filtra le action figures per la stessa categoria ma escludendo quella corrente
  useEffect(() => {
    if (actionFigures.length > 0 && category) {
      const filteredActionFigures = actionFigures.filter(
        (actionFigure) =>
          actionFigure.category === category && actionFigure._id !== _id // Filtra per categoria ed escludi l'action figure selezionata
      );
      setRelatedActionFigures(filteredActionFigures);
    }
  }, [actionFigures, category, _id]); // Aggiungi _id alle dipendenze per ricalcolare se cambia

  const handleDetailsProducts = (_id) => {
    navigate(`/details/${_id}`);
  };

  const getImageUrl = (file) => {
    return file?.url || "https://via.placeholder.com/150"; // Utilizza una URL predefinita se non c'è immagine
  };

  return (
    <div className="text-center mt-5">
      <h3>Action Figures Correlate</h3>
      <Row>
        {relatedActionFigures.length > 0 ? (
          relatedActionFigures.slice(0, 4).map((actionFigure) => (
            <Col md={3} key={actionFigure._id}>
              <Card
                className="mb-4"
                onClick={() => handleDetailsProducts(actionFigure._id)}
              >
                <Card.Img
                  variant="top"
                  src={getImageUrl(actionFigure.file)}
                  alt={actionFigure.name}
                />
                <Card.Body>
                  <Card.Title>{actionFigure.name}</Card.Title>
                  <Card.Text>€{actionFigure.price}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span
                      className={`text-${
                        actionFigure.availability > 0 ? "success" : "danger"
                      }`}
                    >
                      {actionFigure.availability > 0 ? (
                        <FaCheckCircle color="green" />
                      ) : (
                        <FaTimesCircle color="red" />
                      )}
                      {actionFigure.availability > 0
                        ? "Disponibile"
                        : "Esaurito"}
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Non ci sono action figures correlate in questa categoria.</p>
        )}
      </Row>
    </div>
  );
};

export default RelatedActionFigures;
