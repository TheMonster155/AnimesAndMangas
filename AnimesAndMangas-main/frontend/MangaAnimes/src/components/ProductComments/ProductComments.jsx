/*import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import useSession from "../../hohcks/useSession"; // Assicurati che il nome del file sia corretto
import {
  fetchAllReviews,
  addReview,
  deleteReview,
  updateReview,
  selectAllReviews,
  selectLoading,
  selectError,
} from "../../reduces/commentsRedux";
const ProductComments = ({ productId, userRole, productType }) => {
  const dispatch = useDispatch();
  const sessionData = useSession();
  const reviews = useSelector(selectAllReviews); // Carica i commenti dal Redux state
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(1);
  const [editingComment, setEditingComment] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [message, setMessage] = useState(null);

  // Carica i commenti ogni volta che cambia l'ID del prodotto o il tipo
  useEffect(() => {
    if (!productId || !productType) {
      setMessage({
        text: "Errore: ID del prodotto o tipo di prodotto non specificato.",
        type: "error",
      });
      return;
    }
    dispatch(fetchAllReviews()); // Recupera tutti i commenti all'inizio
  }, [dispatch, productId, productType]);

  // Funzione per mostrare messaggi di errore o successo
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  // Funzione per aggiungere un commento
  const handleAddComment = () => {
    if (!newComment.trim() || rating < 1 || rating > 5) {
      showMessage(
        "Inserisci un commento valido e seleziona un voto tra 1 e 5.",
        "error"
      );
      return;
    }
    if (!sessionData) {
      showMessage("Devi essere loggato per aggiungere un commento!", "error");
      return;
    }

    const commentData = {
      rate: rating,
      comment: newComment,
      productType: {
        [productType]: productId, // Utilizza dinamicamente il tipo di prodotto
      },
      user: sessionData.userId,
    };

    dispatch(addReview(commentData))
      .unwrap()
      .then(() => {
        showMessage("Commento aggiunto con successo!", "success");
        setNewComment("");
        setRating(1);
      })
      .catch(() => {
        showMessage("Errore nell'aggiunta del commento.", "error");
      });
  };

  // Filtra i commenti per prodotto e tipo
  const filteredComments = reviews.filter(
    (review) =>
      review.productType[productType] &&
      review.productType[productType] === productId
  );

  return (
    <div className="product-comments">
      <h3>Commenti</h3>

      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
      {isLoading && <div>Caricamento in corso...</div>}
      {error && <div className="error">{error}</div>}

      {sessionData && (
        <div className="add-comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Lascia un commento..."
          />
          <div>
            <span>Voto: </span>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleAddComment}>Aggiungi commento</button>
        </div>
      )}

      <div className="comments-list">
        {filteredComments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <div className="comment-details">
              <p>
                <strong>Voto:</strong> {comment.rate}
              </p>
              <p>{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComments;
*/
/*import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import useSession from "../../hohcks/useSession"; // Assicurati che il nome del file sia corretto
import {
  createComment,
  getAllComments,
  deleteComment,
  updateComment,
  selectAllComments,
  selectIsLoading,
  selectError,
} from "../../reduces/commentsRedux";

// Funzione per filtrare i commenti in base al tipo di prodotto e ID
const filterCommentsByProduct = (comments, productType, productId) =>
  comments.filter(
    (comment) => comment[productType] && comment[productType]._id === productId
  );

// Componente per visualizzare ogni singolo commento
const CommentItem = ({
  comment,
  sessionData,
  userRole,
  productType,
  onEdit,
  onDelete,
}) => (
  <div className="comment-item">
    <div className="comment-details">
      <p>
        <strong>Voto:</strong> {comment.rate} ⭐
      </p>
      <p>{comment.comment}</p>
    </div>

    {sessionData &&
      (userRole === "admin" ||
        comment.user._id === sessionData.userId ||
        (userRole === "seller" &&
          comment[productType] &&
          comment[productType]._id === comment.productId)) && (
        <div className="comment-actions">
          <button onClick={() => onEdit(comment)}>
            <FaEdit /> Modifica
          </button>
          <button onClick={() => onDelete(comment._id)}>
            <FaTrash /> Elimina
          </button>
        </div>
      )}
  </div>
);

// Componente principale per gestire i commenti di un prodotto
const ProductComments = ({ productId, userRole, productType }) => {
  const dispatch = useDispatch();
  const sessionData = useSession();
  const comments = useSelector(selectAllComments);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(1);
  const [editingComment, setEditingComment] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [message, setMessage] = useState(null);

  // Carica i commenti ogni volta che cambia l'ID del prodotto o il tipo
  useEffect(() => {
    if (!productId || !productType) {
      setMessage({
        text: "Errore: ID del prodotto o tipo di prodotto non specificato.",
        type: "error",
      });
      return;
    }
    dispatch(getAllComments());
  }, [dispatch, productId, productType]);

  // Funzione per mostrare messaggi di errore o successo
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  // Funzione per aggiungere un commento
  const handleAddComment = () => {
    if (!newComment.trim() || rating < 1 || rating > 5) {
      showMessage(
        "Inserisci un commento valido e seleziona un voto tra 1 e 5.",
        "error"
      );
      return;
    }
    if (!sessionData) {
      showMessage("Devi essere loggato per aggiungere un commento!", "error");
      return;
    }

    const commentData = {
      manga: productId,
      actionFigure: productId,
      comment: newComment,
      rate: rating,
      user: sessionData.userId,
    };

    dispatch(createComment(commentData))
      .unwrap()
      .then(() => {
        showMessage("Commento aggiunto con successo!", "success");
        setNewComment("");
        setRating(1);
      })
      .catch(() => showMessage("Errore nell'aggiunta del commento.", "error"));
  };

  // Funzione per eliminare un commento
  const handleDeleteComment = (commentId) => {
    if (window.confirm("Sei sicuro di voler eliminare questo commento?")) {
      dispatch(deleteComment(commentId))
        .unwrap()
        .then(() => showMessage("Commento eliminato con successo!", "success"))
        .catch(() =>
          showMessage("Errore nell'eliminazione del commento.", "error")
        );
    }
  };

  // Funzione per aggiornare un commento
  const handleUpdateComment = () => {
    if (!editingText.trim() || rating < 1 || rating > 5) {
      showMessage(
        "Inserisci un commento valido e seleziona un voto tra 1 e 5.",
        "error"
      );
      return;
    }

    const updatedData = {
      comment: editingText,
      rate: rating,
    };

    dispatch(updateComment({ id: editingComment._id, updatedData }))
      .unwrap()
      .then(() => {
        showMessage("Commento aggiornato con successo!", "success");
        setEditingComment(null);
        setEditingText("");
      })
      .catch(() =>
        showMessage("Errore nell'aggiornamento del commento.", "error")
      );
  };

  // Filtra i commenti in base al prodotto
  const filteredComments = filterCommentsByProduct(
    comments,
    productType,
    productId
  );

  return (
    <div className="product-comments">
      <h3>Commenti</h3>

      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
      {isLoading && <div>Caricamento in corso...</div>}
      {error && <div className="error">{error}</div>}

      {sessionData && (
        <div className="add-comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Lascia un commento..."
          />
          <div>
            <span>Voto: </span>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleAddComment}>Aggiungi commento</button>
        </div>
      )}

      <div className="comments-list">
        {filteredComments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            sessionData={sessionData}
            userRole={userRole}
            productType={productType}
            onEdit={(comment) => {
              setEditingComment(comment);
              setEditingText(comment.comment);
            }}
            onDelete={handleDeleteComment}
          />
        ))}

        {editingComment && (
          <div className="edit-comment-form">
            <textarea
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              placeholder="Modifica il tuo commento..."
            />
            <div>
              <span>Voto: </span>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleUpdateComment}>Aggiorna commento</button>
            <button onClick={() => setEditingComment(null)}>Annulla</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductComments;
*/
/*import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import useSession from "../../hohcks/useSession";
import {
  createComment,
  getAllComments,
  deleteComment,
  updateComment,
  selectAllComments,
  selectIsLoading,
  selectError,
} from "../../reduces/commentsRedux";

const filterCommentsByProduct = (comments, productType, productId) =>
  comments.filter(
    (comment) => comment[productType] && comment[productType]._id === productId
  );

const CommentItem = ({
  comment,
  sessionData,
  userRole,
  productType,
  onEdit,
  onDelete,
}) => (
  <div className="comment-item">
    <div className="comment-details">
      <p>
        <strong>Voto:</strong> {comment.rate} ⭐
      </p>
      <p>{comment.comment}</p>
    </div>

    {sessionData &&
      (userRole === "admin" ||
        comment.user._id === sessionData.userId ||
        (userRole === "seller" &&
          comment[productType] &&
          comment[productType]._id === comment.productId)) && (
        <div className="comment-actions">
          <button onClick={() => onEdit(comment)}>
            <FaEdit /> Modifica
          </button>
          <button onClick={() => onDelete(comment._id)}>
            <FaTrash /> Elimina
          </button>
        </div>
      )}
  </div>
);

const ProductComments = ({ productId, userRole, productType }) => {
  const dispatch = useDispatch();
  const sessionData = useSession();
  const comments = useSelector(selectAllComments);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(1);
  const [editingComment, setEditingComment] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!productId || !productType) {
      setMessage({
        text: "Errore: ID del prodotto o tipo di prodotto non specificato.",
        type: "error",
      });
      return;
    }

    dispatch(getAllComments());
  }, [dispatch, productId, productType]);

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || rating < 1 || rating > 5) {
      showMessage(
        "Inserisci un commento valido e seleziona un voto tra 1 e 5.",
        "error"
      );
      return;
    }
    if (!sessionData) {
      showMessage("Devi essere loggato per aggiungere un commento!", "error");
      return;
    }

    const commentData = {
      [productType]: productId,
      comment: newComment,
      rate: rating,
      user: sessionData.userId,
    };

    dispatch(createComment(commentData))
      .unwrap()
      .then(() => {
        showMessage("Commento aggiunto con successo!", "success");
        setNewComment("");
        setRating(1);
      })
      .catch(() => showMessage("Errore nell'aggiunta del commento.", "error"));
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm("Sei sicuro di voler eliminare questo commento?")) {
      dispatch(deleteComment(commentId))
        .unwrap()
        .then(() => showMessage("Commento eliminato con successo!", "success"))
        .catch(() =>
          showMessage("Errore nell'eliminazione del commento.", "error")
        );
    }
  };

  const handleUpdateComment = () => {
    if (!editingText.trim() || rating < 1 || rating > 5) {
      showMessage(
        "Inserisci un commento valido e seleziona un voto tra 1 e 5.",
        "error"
      );
      return;
    }

    const updatedData = {
      comment: editingText,
      rate: rating,
    };

    dispatch(updateComment({ id: editingComment._id, updatedData }))
      .unwrap()
      .then(() => {
        showMessage("Commento aggiornato con successo!", "success");
        setEditingComment(null);
        setEditingText("");
      })
      .catch(() =>
        showMessage("Errore nell'aggiornamento del commento.", "error")
      );
  };

  const filteredComments = filterCommentsByProduct(
    comments,
    productType,
    productId
  );

  return (
    <div className="product-comments">
      <h3>Commenti</h3>

      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
      {isLoading && <div>Caricamento in corso...</div>}
      {error && <div className="error">{error}</div>}

      {sessionData && (
        <div className="add-comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Lascia un commento..."
          />
          <div>
            <span>Voto: </span>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleAddComment}>Aggiungi commento</button>
        </div>
      )}

      <div className="comments-list">
        {filteredComments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            sessionData={sessionData}
            userRole={userRole}
            productType={productType}
            onEdit={(comment) => {
              setEditingComment(comment);
              setEditingText(comment.comment);
            }}
            onDelete={handleDeleteComment}
          />
        ))}

        {editingComment && (
          <div className="edit-comment-form">
            <textarea
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              placeholder="Modifica il tuo commento..."
            />
            <div>
              <span>Voto: </span>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleUpdateComment}>Aggiorna commento</button>
            <button onClick={() => setEditingComment(null)}>Annulla</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductComments;
*/

/*import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSession from "../../hohcks/useSession";
import {
  createComment,
  getAllComments,
  deleteComment,
  updateComment,
  selectAllComments,
} from "../..//reduces/commentsRedux";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductComments = ({ productId, userRole, productType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comments = useSelector(selectAllComments);

  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(1);
  const [editingComment, setEditingComment] = useState(null);
  const [editingText, setEditingText] = useState("");

  const sessionData = useSession();

  useEffect(() => {
    dispatch(getAllComments()); // Recupera tutti i commenti
  }, [dispatch]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      if (!sessionData) {
        alert("Devi essere loggato per aggiungere un commento!");
        return;
      }

      const commentData = {
        productId, // Usa solo productId
        comment: newComment,
        rate: rating,
        user: sessionData.userId,
        admin: userRole === "admin" ? sessionData.userId : undefined,
        seller: userRole === "seller" ? sessionData.userId : undefined,
        //[productType]: productId, // Associa il commento al tipo di prodotto (manga o action figure)
      };

      dispatch(createComment(commentData));
      setNewComment("");
      setRating(1);
    }
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm("Sei sicuro di voler eliminare questo commento?")) {
      dispatch(deleteComment(commentId));
    }
  };

  const handleUpdateComment = () => {
    if (editingText.trim()) {
      const updatedData = {
        comment: editingText,
        rate: rating,
      };
      dispatch(updateComment({ id: editingComment._id, updatedData }));
      setEditingComment(null);
      setEditingText("");
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setEditingText(comment.comment);
  };

  return (
    <div className="product-comments">
      <h3>Commenti</h3>

      {sessionData && (
        <div className="add-comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Lascia un commento..."
          />
          <div>
            <span>Voto: </span>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleAddComment}>Aggiungi commento</button>
        </div>
      )}

      <div className="comments-list">
        {comments
          .filter(
            (comment) =>
              comment[productType] && comment[productType]._id === productId // Filtra per tipo di prodotto e ID
          )
          .map((comment) => (
            <div key={comment._id} className="comment-item">
              <div className="comment-details">
                <p>
                  <strong>Voto:</strong> {comment.rate} ⭐
                </p>
                <p>{comment.comment}</p>
              </div>

              {sessionData &&
                (userRole === "admin" ||
                  comment.user._id === sessionData.userId ||
                  (userRole === "seller" &&
                    comment[productType]._id === productId)) && (
                  <div className="comment-actions">
                    <button onClick={() => handleEditComment(comment)}>
                      <FaEdit /> Modifica
                    </button>
                    <button onClick={() => handleDeleteComment(comment._id)}>
                      <FaTrash /> Elimina
                    </button>
                  </div>
                )}
            </div>
          ))}

        {editingComment && (
          <div className="edit-comment-form">
            <textarea
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              placeholder="Modifica il tuo commento..."
            />
            <div>
              <span>Voto: </span>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleUpdateComment}>Aggiorna commento</button>
            <button onClick={() => setEditingComment(null)}>Annulla</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductComments;
*/

/*import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSession from "../../hohcks/useSession"; // Assicurati di avere questa hook per ottenere la sessione dell'utente
import {
  createComment,
  getAllComments,
  deleteComment,
  updateComment,
  selectAllComments,
} from "../../reduces/commentsRedux"; // Importa le azioni
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Per le icone di modifica ed eliminazione

const ProductComments = ({ productId, userRole }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comments = useSelector(selectAllComments);

  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(1);
  const [editingComment, setEditingComment] = useState(null);
  const [editingText, setEditingText] = useState("");

  const sessionData = useSession(); // Ottieni i dati della sessione

  useEffect(() => {
    console.log("Caricamento commenti per il prodotto", productId);
    dispatch(getAllComments(productId)); // Carica i commenti per il prodotto
  }, [dispatch, productId]);

  console.log("Commenti caricati:", comments); // Aggiungi un log per vedere i commenti recuperati

  const handleAddComment = () => {
    if (newComment.trim()) {
      if (!sessionData) {
        alert("Devi essere loggato per aggiungere un commento!");
        return;
      }

      const commentData = {
        productId,
        comment: newComment, // Cambia 'text' in 'comment' per aderire al modello
        rate: rating, // Usa il voto (rating)
        user: sessionData.userId, // Usa l'ID dell'utente dalla sessione
        admin: userRole === "admin" ? sessionData.userId : undefined, // Se è admin, assegna l'ID dell'admin
        seller: userRole === "seller" ? sessionData.userId : undefined, // Assegna l'ID del venditore se è un venditore
        manga: productId ? productId : undefined, // Aggiungi un campo manga se il prodotto è un manga
        actionFigure: productId ? productId : undefined, // Aggiungi un campo actionFigure se il prodotto è un action figure
      };

      console.log("Aggiungendo commento:", commentData); // Logga i dati del nuovo commento

      dispatch(createComment(commentData)); // Crea il commento
      setNewComment(""); // Resetta il valore del commento
      setRating(1); // Resetta il valore del voto
    }
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm("Sei sicuro di voler eliminare questo commento?")) {
      console.log("Eliminando commento con ID:", commentId); // Logga l'ID del commento da eliminare
      dispatch(deleteComment(commentId)); // Elimina il commento
    }
  };

  const handleUpdateComment = () => {
    if (editingText.trim()) {
      const updatedData = {
        comment: editingText, // Cambia 'text' in 'comment'
        rate: rating, // Usa il voto
      };
      console.log(
        "Aggiornando commento con ID:",
        editingComment._id,
        "dati aggiornati:",
        updatedData
      );
      dispatch(updateComment({ id: editingComment._id, updatedData })); // Aggiorna il commento
      setEditingComment(null);
      setEditingText("");
    }
  };

  const handleEditComment = (comment) => {
    console.log("Modifica commento con ID:", comment._id); // Logga l'ID del commento in modifica
    setEditingComment(comment);
    setEditingText(comment.comment); // Imposta il testo per l'editing
  };

  return (
    <div className="product-comments">
      <h3>Commenti</h3>

      {sessionData && (
        <div className="add-comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Lascia un commento..."
          ></textarea>
          <div>
            <span>Voto: </span>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleAddComment}>Aggiungi commento</button>
        </div>
      )}

      <div className="comments-list">
        {comments
          .filter((comment) => comment.productId === productId) // Filtra i commenti per prodotto
          .map((comment) => (
            <div key={comment._id} className="comment-item">
              <div className="comment-details">
                <p>
                  <strong>Voto:</strong> {comment.rate} ⭐
                </p>
                <p>{comment.comment}</p>
              </div>

            
              {sessionData && // Verifica se l'utente è loggato
                (userRole === "admin" || // Admin può modificare ed eliminare
                  comment.user === sessionData.userId || // L'autore del commento può modificare ed eliminare
                  (userRole === "seller" &&
                    comment.productId === productId)) && ( // Il venditore può modificare ed eliminare se il commento riguarda il prodotto
                  <div className="comment-actions">
                    <button onClick={() => handleEditComment(comment)}>
                      <FaEdit /> Modifica
                    </button>
                    <button onClick={() => handleDeleteComment(comment._id)}>
                      <FaTrash /> Elimina
                    </button>
                  </div>
                )}
            </div>
          ))}

        
        {editingComment && (
          <div className="edit-comment-form">
            <textarea
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              placeholder="Modifica il tuo commento..."
            ></textarea>
            <div>
              <span>Voto: </span>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleUpdateComment}>Aggiorna commento</button>
            <button onClick={() => setEditingComment(null)}>Annulla</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductComments;
*/

/*
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSession from "../../hohcks/useSession"; // Assicurati di avere questa hook per ottenere la sessione dell'utente
import {
  createComment,
  getAllComments,
  deleteComment,
  updateComment,
  selectAllComments,
} from "../../reduces/commentsRedux"; // Importa le azioni
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Per le icone di modifica ed eliminazione

const ProductComments = ({ productId, userRole }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comments = useSelector(selectAllComments);

  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(1);
  const [editingComment, setEditingComment] = useState(null);
  const [editingText, setEditingText] = useState("");

  const sessionData = useSession(); // Ottieni i dati della sessione

  useEffect(() => {
    dispatch(getAllComments(productId)); // Carica i commenti per il prodotto
  }, [dispatch, productId]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      if (!sessionData) {
        alert("Devi essere loggato per aggiungere un commento!");
        return;
      }

      const commentData = {
        productId,
        comment: newComment, // Cambia 'text' in 'comment' per aderire al modello
        rate: rating, // Usa il voto (rating)
        user: sessionData.userId, // Usa l'ID dell'utente dalla sessione
        admin: userRole === "admin" ? sessionData.userId : undefined, // Se è admin, assegna l'ID dell'admin
        seller: userRole === "seller" ? sessionData.userId : undefined, // Assegna l'ID del venditore se è un venditore
        manga: productId ? productId : undefined, // Aggiungi un campo manga se il prodotto è un manga
        actionFigure: productId ? productId : undefined, // Aggiungi un campo actionFigure se il prodotto è un action figure
      };

      dispatch(createComment(commentData)); // Crea il commento
      setNewComment(""); // Resetta il valore del commento
      setRating(1); // Resetta il valore del voto
    }
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm("Sei sicuro di voler eliminare questo commento?")) {
      dispatch(deleteComment(commentId)); // Elimina il commento
    }
  };

  const handleUpdateComment = () => {
    if (editingText.trim()) {
      const updatedData = {
        comment: editingText, // Cambia 'text' in 'comment'
        rate: rating, // Usa il voto
      };
      dispatch(updateComment({ id: editingComment._id, updatedData })); // Aggiorna il commento
      setEditingComment(null);
      setEditingText("");
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setEditingText(comment.comment); // Imposta il testo per l'editing
  };

  return (
    <div className="product-comments">
      <h3>Commenti</h3>

     
      <div className="add-comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Lascia un commento..."
        ></textarea>
        <div>
          <span>Voto: </span>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleAddComment}>Aggiungi commento</button>
      </div>

      
      <div className="comments-list">
        {comments
          .filter((comment) => comment.productId === productId) // Filtra i commenti per prodotto
          .map((comment) => (
            <div key={comment._id} className="comment-item">
              <div className="comment-details">
                <p>
                  <strong>Voto:</strong> {comment.rate} ⭐
                </p>
                <p>{comment.comment}</p>
              </div>

             
              {(userRole === "admin" ||
                comment.user === sessionData.userId || // Permette la modifica/eliminazione solo se l'utente è admin o ha scritto il commento
                (userRole === "seller" && comment.productId === productId)) && (
                <div className="comment-actions">
                  <button onClick={() => handleEditComment(comment)}>
                    <FaEdit /> Modifica
                  </button>
                  <button onClick={() => handleDeleteComment(comment._id)}>
                    <FaTrash /> Elimina
                  </button>
                </div>
              )}
            </div>
          ))}

       
        {editingComment && (
          <div className="edit-comment-form">
            <textarea
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              placeholder="Modifica il tuo commento..."
            ></textarea>
            <div>
              <span>Voto: </span>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleUpdateComment}>Aggiorna commento</button>
            <button onClick={() => setEditingComment(null)}>Annulla</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductComments;
*/

/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReviewsForProduct,
  addReview,
  selectAllReviews,
  selectLoading,
  selectError,
} from "../../reduces/commentsRedux";
import useSession from "../../hohcks/useSession"; // Hook personalizzato per la sessione

const ProductComments = ({ productId, productType, userRole }) => {
  const dispatch = useDispatch();
  const sessionData = useSession();
  const reviews = useSelector(selectAllReviews);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState(null);

  // Carica i commenti per prodotto al primo render
  useEffect(() => {
    if (productId) {
      dispatch(fetchReviewsForProduct(productId));
    }
  }, [dispatch, productId]);

  // Funzione per mostrare un messaggio
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  // Funzione per aggiungere un commento
  const handleAddComment = () => {
    if (!newComment.trim() || rating < 1 || rating > 5) {
      showMessage(
        "Inserisci un commento valido e seleziona un voto tra 1 e 5.",
        "error"
      );
      return;
    }
    if (!sessionData) {
      showMessage("Devi essere loggato per aggiungere un commento!", "error");
      return;
    }

    const commentData = {
      rate: rating,
      comment: newComment,
      productType: productId, // Usa direttamente l'ID prodotto
      user: sessionData.userId, // Usa l'utente dalla sessione
    };

    dispatch(addReview(commentData))
      .unwrap()
      .then(() => {
        showMessage("Commento aggiunto con successo!", "success");
        setNewComment("");
        setRating(1);
        dispatch(fetchReviewsForProduct(productId)); // Aggiorna la lista commenti
      })
      .catch(() => {
        showMessage("Errore nell'aggiunta del commento.", "error");
      });
  };

  return (
    <div className="product-comments">
      <h3>Commenti</h3>
      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
      {isLoading && <div>Caricamento in corso...</div>}
      {error && <div className="error">{error}</div>}

      {sessionData && (
        <div className="add-comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Scrivi un commento..."
          />

          <div>
            <span>Voto: </span>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleAddComment}>Aggiungi commento</button>
        </div>
      )}

      <div className="comments-list">
        {reviews.length > 0 ? (
          reviews.map((comment) => (
            <div key={comment._id} className="comment-item">
              <p>Author: {comment.user.username}</p>
              <p>
                <strong>Voto:</strong> {comment.rate}
              </p>
              <p>{comment.comment}</p>
            </div>
          ))
        ) : (
          <p>Nessun commento disponibile.</p>
        )}
      </div>
    </div>
  );
};

export default ProductComments;
/*

/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReviewsForProduct,
  addReview,
  selectAllReviews,
  selectLoading,
  selectError,
} from "../../reduces/commentsRedux";
import useSession from "../../hohcks/useSession"; // Hook personalizzato per la sessione

const ProductComments = ({ productId, productType, userRole }) => {
  const dispatch = useDispatch();
  const sessionData = useSession();
  const reviews = useSelector(selectAllReviews);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (productId) {
      dispatch(fetchReviewsForProduct(productId));
    }
  }, [dispatch, productId]);

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || rating < 1 || rating > 5) {
      showMessage(
        "Inserisci un commento valido e seleziona un voto tra 1 e 5.",
        "error"
      );
      return;
    }
    if (!sessionData) {
      showMessage("Devi essere loggato per aggiungere un commento!", "error");
      return;
    }

    const commentData = {
      rate: rating,
      comment: newComment,
      productType: productId,
      user: sessionData.userId,
    };

    dispatch(addReview(commentData))
      .unwrap()
      .then(() => {
        showMessage("Commento aggiunto con successo!", "success");
        setNewComment("");
        setRating(1);
        dispatch(fetchReviewsForProduct(productId));
      })
      .catch(() => {
        showMessage("Errore nell'aggiunta del commento.", "error");
      });
  };

  return (
    <div className="product-comments container mt-4">
      <h3 className="text-primary mb-3">Commenti</h3>
      {message && (
        <div className={`alert alert-${message.type} fade show`} role="alert">
          {message.text}
        </div>
      )}
      {isLoading && <div>Caricamento in corso...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {sessionData && (
        <div className="add-comment-form card p-3 mb-4 shadow-sm">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Scrivi un commento..."
            className="form-control mb-3"
          />
          <div className="d-flex align-items-center mb-3">
            <label className="me-2 fw-bold">Voto:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="form-select w-auto"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleAddComment} className="btn btn-primary w-100">
            Aggiungi commento
          </button>
        </div>
      )}

      <div className="comments-list">
        {reviews.length > 0 ? (
          reviews.map((comment) => (
            <div key={comment._id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <p>
                  <strong>Autore:</strong> {comment.user.username}
                </p>
                <p>
                  <strong>Voto:</strong> {comment.rate}
                </p>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">Nessun commento disponibile.</p>
        )}
      </div>
    </div>
  );
};

export default ProductComments;
*/
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReviewsForProduct,
  addReview,
  selectAllReviews,
  selectLoading,
  selectError,
} from "../../reduces/commentsRedux";
import useSession from "../../hohcks/useSession"; // Hook personalizzato per la sessione

const ProductComments = ({ productId, productType, userRole }) => {
  const dispatch = useDispatch();
  const sessionData = useSession();
  const reviews = useSelector(selectAllReviews);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (productId) {
      dispatch(fetchReviewsForProduct(productId));
    }
  }, [dispatch, productId]);

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || rating < 1 || rating > 5) {
      showMessage(
        "Inserisci un commento valido e seleziona un voto tra 1 e 5.",
        "error"
      );
      return;
    }
    if (!sessionData) {
      showMessage("Devi essere loggato per aggiungere un commento!", "error");
      return;
    }

    const commentData = {
      rate: rating,
      comment: newComment,
      productType: productId,
      user: sessionData.userId,
    };

    dispatch(addReview(commentData))
      .unwrap()
      .then(() => {
        showMessage("Commento aggiunto con successo!", "success");
        setNewComment("");
        setRating(1);
        dispatch(fetchReviewsForProduct(productId));
      })
      .catch(() => {
        showMessage("Errore nell'aggiunta del commento.", "error");
      });
  };

  return (
    <div className="product-comments container mt-4">
      <h3 className="text-primary mb-3">Commenti</h3>
      {message && (
        <div className={`alert alert-${message.type} fade show`} role="alert">
          {message.text}
        </div>
      )}
      {isLoading && <div>Caricamento in corso...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {sessionData && (
        <div className="add-comment-form card p-3 mb-4 shadow-sm">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Scrivi un commento..."
            className="form-control mb-3"
          />
          <div className="d-flex align-items-center mb-3">
            <label className="me-2 fw-bold">Voto:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="form-select w-auto"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleAddComment} className="btn btn-primary w-100">
            Aggiungi commento
          </button>
        </div>
      )}

      <div className="comments-list">
        {reviews.length > 0 ? (
          reviews.map((comment) => (
            <div key={comment._id} className="card mb-3 shadow-sm">
              <div className="card-body bg-dark ">
                <p className="author text-light ">
                  Autore: {comment.user.username}
                </p>
                <p className="rating text-light">Voto: {comment.rate}</p>
                <p className="bg-white">{comment.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">Nessun commento disponibile.</p>
        )}
      </div>
    </div>
  );
};

export default ProductComments;
