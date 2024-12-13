import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReviewsForProduct,
  addReview,
  deleteReview,
  updateReview,
  selectAllReviews,
  selectLoading,
  selectError,
} from "../../reduces/commentsRedux";
import useSession from "../../hohcks/useSession";

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

  const handleDeleteComment = (commentId) => {
    if (window.confirm("Sei sicuro di voler eliminare questo commento?")) {
      dispatch(deleteReview(commentId))
        .unwrap()
        .then(() => {
          showMessage("Commento eliminato con successo!", "success");
          dispatch(fetchReviewsForProduct(productId));
        })
        .catch(() => {
          showMessage("Errore nell'eliminazione del commento.", "error");
        });
    }
  };

  const handleEditComment = (commentId) => {
    const comment = reviews.find((rev) => rev._id === commentId);
    setNewComment(comment.comment);
    setRating(comment.rate);
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

              {sessionData && sessionData.userId === comment.user._id && (
                <div className="comment-actions">
                  <button onClick={() => handleEditComment(comment._id)}>
                    Modifica
                  </button>
                  <button onClick={() => handleDeleteComment(comment._id)}>
                    Elimina
                  </button>
                </div>
              )}
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
