// src/redux/actionFigureSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  actionFigures: [],
  error: "",
};

// Azione asincrona per ottenere tutte le Action Figures
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

// Creazione dello slice per gestire lo stato delle Action Figures
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

// Selezionatori
export const allActionFigures = (state) => state.actionFigures.actionFigures; // Correzione qui
export const isActionFigureLoading = (state) => state.actionFigures.isLoading; // Correzione qui
export const errorActionFigure = (state) => state.actionFigures.error; // Correzione qui

export default actionFigureSlice.reducer;

/*// src/redux/actionFigureSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  actionFigures: [],
  error: "",
};

// Azione asincrona per ottenere tutte le Action Figures
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

// Creazione dello slice per gestire lo stato delle Action Figures
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

// Selezionatori
export const allActionFigures = (state) =>
  state.actionFiguresSlice.actionFigures;
export const isActionFigureLoading = (state) =>
  state.actionFiguresSice.isLoading;
export const errorActionFigure = (state) => state.actionFiguresSlice.error;

export default actionFigureSlice.reducer;
*/

/*
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
      console.log("Dati ricevuti:", data);
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
        state.actionFigures = action.payload || [];
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
*/
