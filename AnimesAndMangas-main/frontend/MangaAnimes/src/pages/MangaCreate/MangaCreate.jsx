import React, { useState, useEffect } from "react";
import NavbarComponent from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./MangaCreate.css";

const CreateManga = () => {
  const [formData, setFormData] = useState({
    name: "",
    publisher: "",
    author: "",
    category: "",
    genres: [],
    language: "",
    price: "",
    releaseDate: "",
    file: null,
    description: "",
  });

  const genresList = [
    "Action",
    "Adventure",
    "Fantasy",
    "Isekai",
    "Drama",
    "Romance",
    "Comedy",
    "Slice of Life",
    "Horror",
    "Mystery",
    "Sci-Fi",
    "Mecha",
    "Sport",
    "Historical",
    "Supernatural",
    "Psychological",
    "Thriller",
    "Martial Arts",
    "School",
    "Music",
    "Game",
  ];

  useEffect(() => {
    // Verifica il ruolo dell'utente dal token
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token non trovato. Effettua nuovamente il login.");
      window.location.href = "/login"; // Reindirizza se il token non esiste
    } else {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodifica il JWT per ottenere il payload
      if (decodedToken.role !== "seller") {
        alert("Non hai i permessi per accedere a questa pagina.");
        window.location.href = "/"; // Reindirizza se non è un seller
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, file: files[0] });
    } else if (type === "checkbox" || type === "radio") {
      const checked = e.target.checked;
      setFormData({ ...formData, [name]: checked ? value : "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleMultiSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedGenres = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, genres: selectedGenres });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validtoken = localStorage.getItem("token");
    if (!validtoken) {
      alert("Token non trovato. Effettua nuovamente il login.");
      return;
    }

    const mangaData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "file" && formData[key]) {
        mangaData.append(key, formData[key]);
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach((value) => mangaData.append(key, value));
      } else {
        mangaData.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("http://localhost:3051/manga/create", {
        method: "POST",
        body: mangaData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      alert("Manga creato con successo!");
    } catch (error) {
      console.error("Errore nella creazione del manga:", error);
      alert("Errore nella creazione del manga");
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="mangaCreate-up" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h1 className="text-center mb-4">Crea un nuovo Manga</h1>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="name" className="form-label">
                    Nome del Manga
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="publisher" className="form-label">
                    Editore
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="publisher"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="author" className="form-label">
                    Autore
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="category" className="form-label">
                    Categoria
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleziona Categoria</option>
                    <option value="Shonen">Shonen</option>
                    <option value="Shojo">Shojo</option>
                    <option value="Seinen">Seinen</option>
                    <option value="Josei">Josei</option>
                    <option value="Kodomo">Kodomo</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="genres" className="form-label">
                    Generi
                  </label>
                  <select
                    className="form-select"
                    id="genres"
                    name="genres"
                    value={formData.genres}
                    onChange={handleMultiSelectChange}
                    multiple
                    required
                  >
                    {genresList.map((genre, index) => (
                      <option key={index} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="language" className="form-label">
                    Lingua
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="price" className="form-label">
                    Prezzo
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="releaseDate" className="form-label">
                    Data di Uscita
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="releaseDate"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="file" className="form-label">
                    Carica immagine (opzionale)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="file"
                    name="file"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="description" className="form-label">
                    Descrizione
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Crea Manga
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
      <div className="mangaCreate-down" />
      <Footer />
    </>
  );
};

export default CreateManga;

/*import React, { useState, useEffect } from "react";
import NavbarComponent from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./MangaCreate.css";

const CreateManga = () => {
  const [formData, setFormData] = useState({
    name: "",
    publisher: "",
    author: "",
    category: "",
    genres: [],
    language: "",
    price: "",
    releaseDate: "",
    file: null,
    description: "",
  });

  useEffect(() => {
    // Verifica il ruolo dell'utente dal token
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token non trovato. Effettua nuovamente il login.");
      window.location.href = "/login"; // Reindirizza se il token non esiste
    } else {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodifica il JWT per ottenere il payload
      if (decodedToken.role !== "seller") {
        alert("Non hai i permessi per accedere a questa pagina.");
        window.location.href = "/"; // Reindirizza se non è un seller
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, file: files[0] });
    } else if (type === "checkbox" || type === "radio") {
      const checked = e.target.checked;
      setFormData({ ...formData, [name]: checked ? value : "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleMultiSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedGenres = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, genres: selectedGenres });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validtoken = localStorage.getItem("token");
    if (!validtoken) {
      alert("Token non trovato. Effettua nuovamente il login.");
      return;
    }

    const mangaData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "file" && formData[key]) {
        mangaData.append(key, formData[key]);
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach((value) => mangaData.append(key, value));
      } else {
        mangaData.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("http://localhost:3050/manga/create", {
        method: "POST",
        body: mangaData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      alert("Manga creato con successo!");
    } catch (error) {
      console.error("Errore nella creazione del manga:", error);
      alert("Errore nella creazione del manga");
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="mangaCreate-up" />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Crea un nuovo Manga</h1>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                Nome del Manga
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="publisher" className="form-label">
                Editore
              </label>
              <input
                type="text"
                className="form-control"
                id="publisher"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="author" className="form-label">
                Autore
              </label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="category" className="form-label">
                Categoria
              </label>
              <select
                className="form-select"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Seleziona Categoria</option>
                <option value="Shonen">Shonen</option>
                <option value="Shojo">Shojo</option>
                <option value="Seinen">Seinen</option>
                <option value="Josei">Josei</option>
                <option value="Kodomo">Kodomo</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="genres" className="form-label">
                Generi
              </label>
              <select
                className="form-select"
                id="genres"
                name="genres"
                value={formData.genres}
                onChange={handleMultiSelectChange}
                multiple
                required
              >
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Isekai">Isekai</option>
                <option value="Drama">Drama</option>
                <option value="Romance">Romance</option>
                <option value="Comedy">Comedy</option>
                <option value="Slice of Life">Slice of Life</option>
                <option value="Horror">Horror</option>
                <option value="Mystery">Mystery</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Mecha">Mecha</option>
                <option value="Sport">Sport</option>
                <option value="Historical">Historical</option>
                <option value="Supernatural">Supernatural</option>
                <option value="Psychological">Psychological</option>
                <option value="Thriller">Thriller</option>
                <option value="Martial Arts">Martial Arts</option>
                <option value="School">School</option>
                <option value="Music">Music</option>
                <option value="Game">Game</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="language" className="form-label">
                Lingua
              </label>
              <input
                type="text"
                className="form-control"
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="price" className="form-label">
                Prezzo
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="releaseDate" className="form-label">
                Data di Uscita
              </label>
              <input
                type="date"
                className="form-control"
                id="releaseDate"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="file" className="form-label">
                Carica immagine (opzionale)
              </label>
              <input
                type="file"
                className="form-control"
                id="file"
                name="file"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="description" className="form-label">
                Descrizione
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Crea Manga
            </button>
          </div>
        </form>
      </div>
      <div className="mangaCreate-down" />
      <Footer />
    </>
  );
};

export default CreateManga;
*/

/*import React, { useState } from "react";
import NavbarComponent from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./MangaCreate.css";
const CreateManga = () => {
  const [formData, setFormData] = useState({
    name: "",
    publisher: "",
    author: "",
    category: "",
    genres: [],
    language: "",
    price: "",
    releaseDate: "",
    file: null,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, file: files[0] });
    } else if (type === "checkbox" || type === "radio") {
      const checked = e.target.checked;
      setFormData({ ...formData, [name]: checked ? value : "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleMultiSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedGenres = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, genres: selectedGenres });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validtoken = localStorage.getItem("token");
    if (!validtoken) {
      alert("Token non trovato. Effettua nuovamente il login.");
      return;
    }

    const mangaData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "file" && formData[key]) {
        mangaData.append(key, formData[key]);
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach((value) => mangaData.append(key, value));
      } else {
        mangaData.append(key, formData[key]);
      }
    });

    const token = localStorage.getItem("token");
    console.log("Token inviato:", token);

    try {
      const response = await fetch("http://localhost:3050/manga/create", {
        method: "POST",
        body: mangaData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      alert("Manga creato con successo!");
    } catch (error) {
      console.error("Errore nella creazione del manga:", error);
      alert("Errore nella creazione del manga");
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="mangaCreate-up" />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Crea un nuovo Manga</h1>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                Nome del Manga
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="publisher" className="form-label">
                Editore
              </label>
              <input
                type="text"
                className="form-control"
                id="publisher"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="author" className="form-label">
                Autore
              </label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="category" className="form-label">
                Categoria
              </label>
              <select
                className="form-select"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Seleziona Categoria</option>
                <option value="Shonen">Shonen</option>
                <option value="Shojo">Shojo</option>
                <option value="Seinen">Seinen</option>
                <option value="Josei">Josei</option>
                <option value="Kodomo">Kodomo</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="genres" className="form-label">
                Generi
              </label>
              <select
                className="form-select"
                id="genres"
                name="genres"
                value={formData.genres}
                onChange={handleMultiSelectChange}
                multiple
                required
              >
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Isekai">Isekai</option>
                <option value="Drama">Drama</option>
                <option value="Romance">Romance</option>
                <option value="Comedy">Comedy</option>
                <option value="Slice of Life">Slice of Life</option>
                <option value="Horror">Horror</option>
                <option value="Mystery">Mystery</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Mecha">Mecha</option>
                <option value="Sport">Sport</option>
                <option value="Historical">Historical</option>
                <option value="Supernatural">Supernatural</option>
                <option value="Psychological">Psychological</option>
                <option value="Thriller">Thriller</option>
                <option value="Martial Arts">Martial Arts</option>
                <option value="School">School</option>
                <option value="Music">Music</option>
                <option value="Game">Game</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="language" className="form-label">
                Lingua
              </label>
              <input
                type="text"
                className="form-control"
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="price" className="form-label">
                Prezzo
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="releaseDate" className="form-label">
                Data di Uscita
              </label>
              <input
                type="date"
                className="form-control"
                id="releaseDate"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="file" className="form-label">
                Carica immagine (opzionale)
              </label>
              <input
                type="file"
                className="form-control"
                id="file"
                name="file"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="description" className="form-label">
                Descrizione
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Crea Manga
            </button>
          </div>
        </form>
      </div>
      <div className="mangaCreate-down" />
      <Footer />
    </>
  );
};

export default CreateManga;
*/
/*
  const handleSubmit = async (e) => {
    e.preventDefault();

    const mangaData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "file" && formData[key]) {
        mangaData.append(key, formData[key]);
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach((value) => mangaData.append(key, value));
      } else {
        mangaData.append(key, formData[key]);
      }
    });

    // Usa direttamente 'validtoken' per l'header Authorization
    try {
      const response = await fetch("http://localhost:3050/manga/create", {
        method: "POST",
        body: mangaData,
        headers: {
          Authorization: `Bearer ${validtoken}`, // Usa il token già recuperato
        },
      });
      const data = await response.json();
      if (response.ok) {
        alert("Manga creato con successo!");
      } else {
        alert("Errore nella creazione del manga: " + data.message);
      }
    } catch (error) {
      console.error("Errore nella creazione del manga:", error);
      alert("Errore nella creazione del manga");
    }
  };
*/
