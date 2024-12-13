import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  actionFigures: [],
  error: "",
};

export const getAllActionFigures = createAsyncThunk(
  "actionFigures/getAllActionFigures",
  async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/actionFigure`
      );
      if (!response.ok) {
        throw new Error("Errore nella richiesta al server");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore durante il fetch:", error.message);
      throw new Error("Errore nel recupero delle action figures");
    }
  }
);

const actionFigureSlice = createSlice({
  name: "actionFigures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllActionFigures.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getAllActionFigures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.actionFigures = action.payload;
      })
      .addCase(getAllActionFigures.rejected, (state) => {
        state.isLoading = false;
        state.error = "Impossibile recuperare le action figures";
      });
  },
});

export const allActionFigures = (state) => state.actionFigures.actionFigures;
export const isActionFigureLoading = (state) => state.actionFigures.isLoading;
export const errorActionFigure = (state) => state.actionFigures.error;

export default actionFigureSlice.reducer;
