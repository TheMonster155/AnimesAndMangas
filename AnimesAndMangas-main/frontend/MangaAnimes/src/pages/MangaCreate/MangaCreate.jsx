import React, { useState, useEffect } from "react";
import NavbarComponent from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./MangaCreate.css";

const CreateManga = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    file: null,
    description: "",
    type: "", //
    availability: "",
    genres: [],
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
    const token = localStorage.getItem("Authorization");
    if (!token) {
      alert("Token non trovato. Effettua nuovamente il login.");
      window.location.href = "/login";
    } else {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      if (decodedToken.role !== "seller") {
        alert("Non hai i permessi per accedere a questa pagina.");
        window.location.href = "/";
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

  const handleCheckboxChange = (e, genre) => {
    if (e.target.checked) {
      setFormData((prevData) => ({
        ...prevData,
        genres: [...prevData.genres, genre],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        genres: prevData.genres.filter((g) => g !== genre),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validtoken = localStorage.getItem("Authorization");
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
          Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        },
      });
      const data = await response.json();
      alert("Creazione avvenuta con successo!");
    } catch (error) {
      console.error("Errore nella creazione del manga:", error);
      alert("Errore nella creazione");
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="mangaCreate-up" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h1 className="text-center mb-4">Crea un nuovo Manga o Figura</h1>
            <form onSubmit={handleSubmit}>
              {formData.type && (
                <p className="text-muted">Stai creando un {formData.type}.</p>
              )}

              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="type" className="form-label">
                    Tipo
                  </label>
                  <select
                    className="form-select"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleziona Tipo</option>
                    <option value="Manga">Manga</option>
                    <option value="Figure">Figura</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="name" className="form-label">
                    Nome del Manga/Figura
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

              {formData.type === "Manga" && (
                <>
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
                      <div id="genres">
                        {genresList.map((genre, index) => (
                          <div className="form-check" key={index}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`genre-${index}`}
                              name="genres"
                              value={genre}
                              checked={formData.genres.includes(genre)}
                              onChange={(e) => handleCheckboxChange(e, genre)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`genre-${index}`}
                            >
                              {genre}
                            </label>
                          </div>
                        ))}
                      </div>
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
                </>
              )}

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
                  <label htmlFor="description" className="form-label">
                    Descrizione
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="file" className="form-label">
                    Carica immagine
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="file"
                    name="file"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Crea
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateManga;
