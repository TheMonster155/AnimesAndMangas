import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
    return commentId;
  }
);

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

export const selectAllReviews = (state) => state.reviewsSlice.reviews;
export const selectLoading = (state) => state.reviewsSlice.loading;
export const selectError = (state) => state.reviewsSlice.error;

export default reviewsSlice.reducer;
