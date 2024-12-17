import React, { useState } from "react";
import "./ProductReviews.css";
const CommentSection = ({
  reviews,
  isLoading,
  error,
  message,
  sessionData,
  newComment,
  setNewComment,
  rating,
  setRating,
  handleAddComment,
  handleEditComment,
  handleDeleteComment,
}) => {
  return (
    <div className="product-comments">
      <h3>Commenti</h3>
      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
      {isLoading && <div>Caricamento in corso...</div>}

      {sessionData && (
        <div className="add-comment-container">
          <div className="add-comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Scrivi un commento..."
              className="review-textarea"
            />

            <div className="rating-select">
              <span>Voto: </span>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="rating-select-input"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleAddComment} className="add-button">
              Aggiungi commento
            </button>
          </div>
        </div>
      )}

      <div className="comments-list">
        {reviews.length > 0 ? (
          reviews.map((comment) => (
            <div key={comment._id} className="comment-item">
              <p>
                <strong>Autore:</strong> {comment.user.username}
              </p>
              <p>
                <strong>Voto:</strong> {comment.rate}
              </p>
              <p>{comment.comment}</p>

              {sessionData && sessionData.userId === comment.user._id && (
                <div className="comment-actions">
                  <button
                    onClick={() => handleEditComment(comment._id)}
                    className="edit-button"
                  >
                    Modifica
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="delete-button"
                  >
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

export default CommentSection;
