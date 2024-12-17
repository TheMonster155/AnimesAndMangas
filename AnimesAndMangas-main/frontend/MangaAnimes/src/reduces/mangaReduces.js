import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  mangas: [],
  error: "",
  mangasByType: [],
  isLoadingByType: false,
  errorByType: "",
  isCreating: false,
  errorCreating: "",
  isUpdating: false,
  errorUpdating: "",
  isDeleting: false,
  errorDeleting: "",
  mangaTitles: [],
  isLoadingTitles: false,
  errorTitles: "",
  mangaDetail: {},
  isLoadingDetail: false,
  errorDetail: "",
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

export const getMangasByType = createAsyncThunk(
  "mangas/getMangasByType",
  async (type) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/manga/${type}`
      );
      if (!response.ok) {
        throw new Error("Errore nella richiesta al server");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore durante il fetch:", error.message);
      throw new Error("Errore nel recupero dei manga per questo tipo");
    }
  }
);

export const createManga = createAsyncThunk(
  "mangas/createManga",
  async (mangaData, thunkAPI) => {
    try {
      const formData = new FormData();

      for (let key in mangaData) {
        if (Array.isArray(mangaData[key])) {
          mangaData[key].forEach((value) => formData.append(key, value));
        } else {
          formData.append(key, mangaData[key]);
        }
      }

      for (let pair of formData.entries()) {
      }

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/manga/create`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Errore nella creazione del manga");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore durante la creazione del manga:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getMangaTitles = createAsyncThunk(
  "mangas/getMangaTitles",
  async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/manga/title/:title`
      );
      if (!response.ok) {
        throw new Error("Errore nella richiesta dei titoli");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore durante il fetch dei titoli:", error.message);
      throw new Error("Errore nel recupero dei titoli dei manga");
    }
  }
);

export const getMangaById = createAsyncThunk(
  "mangas/getMangaById",
  async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/manga/${id}`
      );
      if (!response.ok) {
        throw new Error("Errore nella richiesta del manga");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore durante il fetch del manga:", error.message);
      throw new Error("Errore nel recupero del manga");
    }
  }
);

export const updateManga = createAsyncThunk(
  "mangas/updateManga",
  async ({ id, mangaData }, thunkAPI) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/manga/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mangaData),
        }
      );
      if (!response.ok) {
        throw new Error("Errore nell'aggiornamento del manga");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore durante l'aggiornamento del manga:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteManga = createAsyncThunk(
  "mangas/deleteManga",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/manga/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Errore nella cancellazione del manga");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "Errore durante la cancellazione del manga:",
        error.message
      );
      return thunkAPI.rejectWithValue(error.message);
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
      })

      .addCase(getMangasByType.pending, (state) => {
        state.isLoadingByType = true;
        state.errorByType = "";
      })
      .addCase(getMangasByType.fulfilled, (state, action) => {
        state.isLoadingByType = false;
        state.mangasByType = action.payload;
      })
      .addCase(getMangasByType.rejected, (state) => {
        state.isLoadingByType = false;
        state.errorByType = "Impossibile recuperare i manga per questo tipo";
      })

      .addCase(createManga.pending, (state) => {
        state.isCreating = true;
        state.errorCreating = "";
      })
      .addCase(createManga.fulfilled, (state, action) => {
        state.isCreating = false;
        state.mangas.push(action.payload);
      })
      .addCase(createManga.rejected, (state, action) => {
        state.isCreating = false;
        state.errorCreating =
          action.payload || "Errore nella creazione del manga";
      })

      .addCase(getMangaTitles.pending, (state) => {
        state.isLoadingTitles = true;
        state.errorTitles = "";
      })
      .addCase(getMangaTitles.fulfilled, (state, action) => {
        state.isLoadingTitles = false;
        state.mangaTitles = action.payload;
      })
      .addCase(getMangaTitles.rejected, (state) => {
        state.isLoadingTitles = false;
        state.errorTitles = "Impossibile recuperare i titoli dei manga";
      })

      .addCase(getMangaById.pending, (state) => {
        state.isLoadingDetail = true;
        state.errorDetail = "";
      })
      .addCase(getMangaById.fulfilled, (state, action) => {
        state.isLoadingDetail = false;
        state.mangaDetail = action.payload;
      })
      .addCase(getMangaById.rejected, (state) => {
        state.isLoadingDetail = false;
        state.errorDetail = "Impossibile recuperare i dettagli del manga";
      })

      .addCase(updateManga.pending, (state) => {
        state.isUpdating = true;
        state.errorUpdating = "";
      })
      .addCase(updateManga.fulfilled, (state, action) => {
        state.isUpdating = false;
        const updatedManga = action.payload;
        const index = state.mangas.findIndex(
          (manga) => manga._id === updatedManga._id
        );
        if (index !== -1) {
          state.mangas[index] = updatedManga;
        }
      })
      .addCase(updateManga.rejected, (state, action) => {
        state.isUpdating = false;
        state.errorUpdating = action.payload;
      })

      .addCase(deleteManga.pending, (state) => {
        state.isDeleting = true;
        state.errorDeleting = "";
      })
      .addCase(deleteManga.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.mangas = state.mangas.filter(
          (manga) => manga._id !== action.payload._id
        );
      })
      .addCase(deleteManga.rejected, (state, action) => {
        state.isDeleting = false;
        state.errorDeleting = action.payload;
      });
  },
});

export const allMangas = (state) => state.mangas.mangas;

export const selectFigures = (state) =>
  state.mangas.mangas.filter((manga) => manga.type === "Figure");

export const isMangaLoading = (state) => state.mangas.isLoading;

export const errorManga = (state) => state.mangas.error;

export const mangasByType = (state) => state.mangas.mangasByType;
export const isMangasByTypeLoading = (state) => state.mangas.isLoadingByType;
export const errorMangasByType = (state) => state.mangas.errorByType;

export const isCreatingManga = (state) => state.mangas.isCreating;
export const errorCreatingManga = (state) => state.mangas.errorCreating;

export const isUpdatingManga = (state) => state.mangas.isUpdating;
export const errorUpdatingManga = (state) => state.mangas.errorUpdating;

export const isDeletingManga = (state) => state.mangas.isDeleting;
export const errorDeletingManga = (state) => state.mangas.errorDeleting;

export const mangaTitles = (state) => state.mangas.mangaTitles;
export const isLoadingTitles = (state) => state.mangas.isLoadingTitles;
export const errorTitles = (state) => state.mangas.errorTitles;

export const mangaDetail = (state) => state.mangas.mangaDetail;
export const isLoadingDetail = (state) => state.mangas.isLoadingDetail;
export const errorDetail = (state) => state.mangas.errorDetail;

export default mangaSlice.reducer;
