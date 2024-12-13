/*import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
*/

/*
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

// Selettore per ottenere tutti i manga
export const allMangas = (state) => state.mangas.mangas;

// Selettore per ottenere i manga di tipo "figure"
export const selectFigures = (state) =>
  state.mangas.mangas.filter((manga) => manga.type === "figure");

export const isMangaLoading = (state) => state.mangas.isLoading;
export const errorManga = (state) => state.mangas.error;

export default mangaSlice.reducer;
*/
/*
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Stato iniziale
const initialState = {
  isLoading: false,
  mangas: [],
  error: "",
  mangasByType: [], // Stato per i manga filtrati per tipo
  isLoadingByType: false, // Stato di caricamento per il thunk getMangasByType
  errorByType: "", // Stato per l'errore relativo a getMangasByType
};

// Azione per ottenere tutti i manga
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

// Azione per ottenere i manga in base al tipo
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

const mangaSlice = createSlice({
  name: "mangas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Gestione di getAllMangas
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
      // Gestione di getMangasByType
      .addCase(getMangasByType.pending, (state) => {
        state.isLoadingByType = true;
        state.errorByType = "";
      })
      .addCase(getMangasByType.fulfilled, (state, action) => {
        state.isLoadingByType = false;
        state.mangasByType = action.payload; // Salva i manga filtrati per tipo
      })
      .addCase(getMangasByType.rejected, (state) => {
        state.isLoadingByType = false;
        state.errorByType = "Impossibile recuperare i manga per questo tipo";
      });
  },
});

// Selettori per ottenere i manga
export const allMangas = (state) => state.mangas.mangas;

// Selettore per ottenere i manga di tipo "figure"
export const selectFigures = (state) =>
  state.mangas.mangas.filter((manga) => manga.type === "Figure");

// Selettore per verificare lo stato di caricamento
export const isMangaLoading = (state) => state.mangas.isLoading;

// Selettore per ottenere l'errore di caricamento dei manga
export const errorManga = (state) => state.mangas.error;

// Selettori specifici per getMangasByType
export const mangasByType = (state) => state.mangas.mangasByType;
export const isMangasByTypeLoading = (state) => state.mangas.isLoadingByType;
export const errorMangasByType = (state) => state.mangas.errorByType;

// Esportiamo il reducer
export default mangaSlice.reducer;
*/
/*
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Stato iniziale
const initialState = {
  isLoading: false,
  mangas: [],
  error: "",
  mangasByType: [], // Stato per i manga filtrati per tipo
  isLoadingByType: false, // Stato di caricamento per il thunk getMangasByType
  errorByType: "", // Stato per l'errore relativo a getMangasByType
  isCreating: false, // Stato di caricamento per la creazione di un nuovo manga
  errorCreating: "", // Stato per l'errore di creazione del manga
};

// Azione per ottenere tutti i manga
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

// Azione per ottenere i manga in base al tipo
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

// Azione per creare un nuovo manga
export const createManga = createAsyncThunk(
  "mangas/createManga",
  async (mangaData, thunkAPI) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/manga`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Assumendo che il server accetti JSON
          },
          body: JSON.stringify(mangaData), // Manga data sarà l'oggetto contenente il manga da creare
        }
      );
      if (!response.ok) {
        throw new Error("Errore nella creazione del manga");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore durante la creazione del manga:", error.message);
      return thunkAPI.rejectWithValue(error.message); // Utilizziamo rejectWithValue per passare l'errore
    }
  }
);

const mangaSlice = createSlice({
  name: "mangas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Gestione di getAllMangas
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
      // Gestione di getMangasByType
      .addCase(getMangasByType.pending, (state) => {
        state.isLoadingByType = true;
        state.errorByType = "";
      })
      .addCase(getMangasByType.fulfilled, (state, action) => {
        state.isLoadingByType = false;
        state.mangasByType = action.payload; // Salva i manga filtrati per tipo
      })
      .addCase(getMangasByType.rejected, (state) => {
        state.isLoadingByType = false;
        state.errorByType = "Impossibile recuperare i manga per questo tipo";
      })
      // Gestione di createManga
      .addCase(createManga.pending, (state) => {
        state.isCreating = true;
        state.errorCreating = "";
      })
      .addCase(createManga.fulfilled, (state, action) => {
        state.isCreating = false;
        state.mangas.push(action.payload); // Aggiungi il nuovo manga alla lista
      })
      .addCase(createManga.rejected, (state, action) => {
        state.isCreating = false;
        state.errorCreating =
          action.payload || "Errore nella creazione del manga";
      });
  },
});

// Selettori per ottenere i manga
export const allMangas = (state) => state.mangas.mangas;

// Selettore per ottenere i manga di tipo "figure"
export const selectFigures = (state) =>
  state.mangas.mangas.filter((manga) => manga.type === "Figure");

// Selettore per verificare lo stato di caricamento
export const isMangaLoading = (state) => state.mangas.isLoading;

// Selettore per ottenere l'errore di caricamento dei manga
export const errorManga = (state) => state.mangas.error;

// Selettori specifici per getMangasByType
export const mangasByType = (state) => state.mangas.mangasByType;
export const isMangasByTypeLoading = (state) => state.mangas.isLoadingByType;
export const errorMangasByType = (state) => state.mangas.errorByType;

// Selettori specifici per la creazione di un manga
export const isCreatingManga = (state) => state.mangas.isCreating;
export const errorCreatingManga = (state) => state.mangas.errorCreating;

// Esportiamo il reducer
export default mangaSlice.reducer;
*/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Azioni per ottenere tutti i manga
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

// Azioni per ottenere i manga per tipo
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

// Azioni per ottenere i titoli dei manga
export const getMangaTitles = createAsyncThunk(
  "mangas/getMangaTitles",
  async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/manga/titles`
      );
      if (!response.ok) {
        throw new Error("Errore nella richiesta al server");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore durante il fetch:", error.message);
      throw new Error("Errore nel recupero dei titoli dei manga");
    }
  }
);

const mangaSlice = createSlice({
  name: "mangas",
  initialState: {
    mangas: [],
    titles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Gestione stato per tutti i manga
      .addCase(getAllMangas.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMangas.fulfilled, (state, action) => {
        state.loading = false;
        state.mangas = action.payload;
      })
      .addCase(getAllMangas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Gestione stato per i manga per tipo
      .addCase(getMangasByType.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMangasByType.fulfilled, (state, action) => {
        state.loading = false;
        state.mangas = action.payload;
      })
      .addCase(getMangasByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Gestione stato per i titoli dei manga
      .addCase(getMangaTitles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMangaTitles.fulfilled, (state, action) => {
        state.loading = false;
        state.titles = action.payload;
      })
      .addCase(getMangaTitles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default mangaSlice.reducer;
