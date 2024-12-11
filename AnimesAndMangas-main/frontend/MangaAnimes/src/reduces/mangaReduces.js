import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  mangas: [],
  error: "",
};

export const getAllMangas = createAsyncThunk(
  "mangas/getAllMangas",
  async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/manga`
      );
      if (!response.ok) {
        throw new Error("Errore nella richiesta al server");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore durante il fetch:", error.message);
      throw new Error("Errore nel recupero dei manga");
    }
  }
);

const mangaSlice = createSlice({
  name: "mangas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMangas.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getAllMangas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mangas = action.payload;
      })
      .addCase(getAllMangas.rejected, (state) => {
        state.isLoading = false;
        state.error = "Impossibile recuperare i manga";
      });
  },
});

export const allMangas = (state) => state.mangas.mangas;
export const isMangaLoading = (state) => state.mangas.isLoading;
export const errorManga = (state) => state.mangas.error;

export default mangaSlice.reducer;
