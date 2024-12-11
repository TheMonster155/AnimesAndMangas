/*// reviewsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Creazione di thunk per recuperare tutte le recensioni
export const fetchAllReviews = createAsyncThunk(
  "reviews/fetchAll",
  async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/comments`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    return response.json();
  }
);

// Creazione di thunk per recuperare le recensioni per prodotto
export const fetchReviewsForProduct = createAsyncThunk(
  "reviews/fetchByProduct",
  async (productId) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/comments/product/${productId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch reviews for this product");
    }
    return response.json();
  }
);

// Creazione di thunk per aggiungere una recensione
export const addReview = createAsyncThunk("reviews/add", async (reviewData) => {
  console.log(reviewData);
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/comments/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to add review");
  }
  return response.json();
});

// Creazione di thunk per eliminare una recensione
export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (commentId) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/comments/delete/${commentId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete review");
    }
    return commentId; // Restituire l'ID del commento per rimuoverlo dallo stato
  }
);

// Creazione di thunk per aggiornare una recensione
export const updateReview = createAsyncThunk(
  "reviews/update",
  async ({ commentId, updatedData }) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/comments/update/${commentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update review");
    }
    return response.json();
  }
);

const reviewsSlice = createSlice({
  name: "reviewsSlice", // Cambiato in "reviewsSlice"
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all reviews
      .addCase(fetchAllReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
      })
      .addCase(fetchAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch reviews for a specific product
      .addCase(fetchReviewsForProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsForProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
      })
      .addCase(fetchReviewsForProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add a new review
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload.review);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete a review
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update a review
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.reviews.findIndex(
          (review) => review._id === action.payload.review._id
        );
        if (index !== -1) {
          state.reviews[index] = action.payload.review;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Selettori
export const selectAllReviews = (state) => state.reviewsSlice.reviews; // Modifica qui per 'reviewsSlice'
export const selectLoading = (state) => state.reviewsSlice.loading; // Modifica qui per 'reviewsSlice'
export const selectError = (state) => state.reviewsSlice.error; // Modifica qui per 'reviewsSlice'

export default reviewsSlice.reducer;
*/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Creazione di thunk per recuperare tutte le recensioni
export const fetchAllReviews = createAsyncThunk(
  "reviews/fetchAll",
  async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/comments`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    return response.json();
  }
);

// Creazione di thunk per recuperare le recensioni per prodotto
export const fetchReviewsForProduct = createAsyncThunk(
  "reviews/fetchByProduct",
  async (productId) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/comments/product/${productId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch reviews for this product");
    }
    return response.json();
  }
);

// Creazione di thunk per aggiungere una recensione
export const addReview = createAsyncThunk("reviews/add", async (reviewData) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/comments/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to add review");
  }
  return response.json();
});

// Creazione di thunk per eliminare una recensione
export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (commentId) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/comments/delete/${commentId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete review");
    }
    return commentId; // Restituire l'ID del commento per rimuoverlo dallo stato
  }
);

// Creazione di thunk per aggiornare una recensione
export const updateReview = createAsyncThunk(
  "reviews/update",
  async ({ commentId, updatedData }) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/comments/update/${commentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update review");
    }
    return response.json();
  }
);

const reviewsSlice = createSlice({
  name: "reviewsSlice",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all reviews
      .addCase(fetchAllReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
      })
      .addCase(fetchAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch reviews for a specific product
      .addCase(fetchReviewsForProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsForProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
      })
      .addCase(fetchReviewsForProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add a new review
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload.review);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete a review
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update a review
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.reviews.findIndex(
          (review) => review._id === action.payload.review._id
        );
        if (index !== -1) {
          state.reviews[index] = action.payload.review;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Selettori
export const selectAllReviews = (state) => state.reviewsSlice.reviews;
export const selectLoading = (state) => state.reviewsSlice.loading;
export const selectError = (state) => state.reviewsSlice.error;

export default reviewsSlice.reducer;
