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
import CommentSection from "./Comment/CommentSection";

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
      user: sessionData._id,
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
    <CommentSection
      reviews={reviews}
      isLoading={isLoading}
      error={error}
      message={message}
      sessionData={sessionData}
      newComment={newComment}
      setNewComment={setNewComment}
      rating={rating}
      setRating={setRating}
      handleAddComment={handleAddComment}
      handleEditComment={handleEditComment}
      handleDeleteComment={handleDeleteComment}
    />
  );
};

export default ProductComments;
