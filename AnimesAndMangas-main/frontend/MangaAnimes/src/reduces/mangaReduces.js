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
        `${import.meta.env.VITE_SERVER_BASE_URL}/manga/create`,
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

// Azione per ottenere i titoli dei manga
export const getMangaTitles = createAsyncThunk(
  "mangas/getMangaTitles",
  async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/manga/titles`
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

// Azione per ottenere i dettagli di un manga
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
      })
      // Gestione di getMangaTitles
      .addCase(getMangaTitles.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getMangaTitles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mangas = action.payload;
      })
      .addCase(getMangaTitles.rejected, (state) => {
        state.isLoading = false;
        state.error = "Impossibile recuperare i titoli dei manga";
      })
      // Gestione di getMangaById
      .addCase(getMangaById.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getMangaById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mangas = action.payload;
      })
      .addCase(getMangaById.rejected, (state) => {
        state.isLoading = false;
        state.error = "Impossibile recuperare il manga";
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
  isUpdating: false, // Stato di caricamento per l'aggiornamento di un manga
  errorUpdating: "", // Stato per l'errore di aggiornamento del manga
  isDeleting: false, // Stato di caricamento per la cancellazione di un manga
  errorDeleting: "", // Stato per l'errore di cancellazione del manga
  mangaTitles: [], // Stato per i titoli dei manga
  isLoadingTitles: false, // Stato di caricamento per i titoli dei manga
  errorTitles: "", // Stato per l'errore dei titoli dei manga
  mangaDetail: {}, // Stato per i dettagli di un manga specifico
  isLoadingDetail: false, // Stato di caricamento per i dettagli di un manga
  errorDetail: "", // Stato per l'errore dei dettagli del manga
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
        `${import.meta.env.VITE_SERVER_BASE_URL}/manga/create`,
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

// Azione per ottenere i titoli dei manga
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

// Azione per ottenere i dettagli di un manga
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

// Azione per aggiornare un manga
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

// Azione per cancellare un manga
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
      })
      // Gestione di getMangaTitles
      .addCase(getMangaTitles.pending, (state) => {
        state.isLoadingTitles = true;
        state.errorTitles = "";
      })
      .addCase(getMangaTitles.fulfilled, (state, action) => {
        state.isLoadingTitles = false;
        state.mangaTitles = action.payload; // Salva i titoli dei manga
      })
      .addCase(getMangaTitles.rejected, (state) => {
        state.isLoadingTitles = false;
        state.errorTitles = "Impossibile recuperare i titoli dei manga";
      })
      // Gestione di getMangaById
      .addCase(getMangaById.pending, (state) => {
        state.isLoadingDetail = true;
        state.errorDetail = "";
      })
      .addCase(getMangaById.fulfilled, (state, action) => {
        state.isLoadingDetail = false;
        state.mangaDetail = action.payload; // Salva i dettagli del manga
      })
      .addCase(getMangaById.rejected, (state) => {
        state.isLoadingDetail = false;
        state.errorDetail = "Impossibile recuperare i dettagli del manga";
      })
      // Gestione di updateManga
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
          state.mangas[index] = updatedManga; // Sostituisci il manga aggiornato
        }
      })
      .addCase(updateManga.rejected, (state, action) => {
        state.isUpdating = false;
        state.errorUpdating = action.payload;
      })
      // Gestione di deleteManga
      .addCase(deleteManga.pending, (state) => {
        state.isDeleting = true;
        state.errorDeleting = "";
      })
      .addCase(deleteManga.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.mangas = state.mangas.filter(
          (manga) => manga._id !== action.payload._id
        ); // Rimuovi il manga cancellato
      })
      .addCase(deleteManga.rejected, (state, action) => {
        state.isDeleting = false;
        state.errorDeleting = action.payload;
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

// Selettori specifici per updateManga
export const isUpdatingManga = (state) => state.mangas.isUpdating;
export const errorUpdatingManga = (state) => state.mangas.errorUpdating;

// Selettori specifici per deleteManga
export const isDeletingManga = (state) => state.mangas.isDeleting;
export const errorDeletingManga = (state) => state.mangas.errorDeleting;

// Selettori specifici per getMangaTitles
export const mangaTitles = (state) => state.mangas.mangaTitles;
export const isLoadingTitles = (state) => state.mangas.isLoadingTitles;
export const errorTitles = (state) => state.mangas.errorTitles;

// Selettori specifici per getMangaById
export const mangaDetail = (state) => state.mangas.mangaDetail;
export const isLoadingDetail = (state) => state.mangas.isLoadingDetail;
export const errorDetail = (state) => state.mangas.errorDetail;

// Esportiamo il reducer
export default mangaSlice.reducer;
