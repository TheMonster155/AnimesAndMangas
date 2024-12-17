import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import "./MangaCreate.css";
const MangaForm = ({
  formData,
  genresList,
  handleChange,
  handleCheckboxChange,
  handleSubmit,
}) => {
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (typeof handleSubmit === "function") {
        await handleSubmit();
        navigate("/");
      } else {
        console.error("handleSubmit non è una funzione valida.");
      }
    } catch (error) {
      console.error("Errore durante la creazione:", error);
      alert("Si è verificato un errore durante la creazione del manga/figura.");
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="mangaCreate-up container" />
      <div className=" my-5 px-3 manga-form-container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="p-4 rounded shadow bg-white">
              <h1 className="text-center mb-4">Crea un nuovo Manga o Figura</h1>
              <form onSubmit={handleFormSubmit}>
                {formData.type && (
                  <p className="text-muted text-center">
                    Stai creando un {formData.type}.
                  </p>
                )}

                <div className="mb-3">
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

                <div className="mb-3">
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

                {formData.type === "Manga" && (
                  <>
                    <div className="mb-3">
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

                    <div className="mb-3">
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

                    <div className="mb-3">
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

                    <div className="mb-3">
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

                    <div className="mb-3">
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
                  </>
                )}

                <div className="mb-3">
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
                    min="1"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="availability" className="form-label">
                    Disponibilità (quantità)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                    min="1"
                  />
                </div>

                <div className="mb-3">
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

                <div className="mb-3">
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

                <button type="submit" className="btn btn-primary w-100">
                  Crea
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MangaForm;
