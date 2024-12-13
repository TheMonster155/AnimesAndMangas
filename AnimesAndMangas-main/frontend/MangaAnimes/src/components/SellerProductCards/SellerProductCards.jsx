import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allMangas,
  deleteManga,
  updateManga,
  getAllMangas,
  isMangaLoading,
  errorManga,
} from "../../reduces/mangaReduces";
import { useNavigate } from "react-router-dom";

const MangaListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedManga, setSelectedManga] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    publisher: "",
    author: "",
    type: "",
    category: "",
    genres: "",
    language: "",
    price: "",
    availability: "",
    description: "",
  });

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
      } else {
        dispatch(getAllMangas());
      }
    }
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo manga?")) {
      dispatch(deleteManga(id))
        .unwrap()
        .then(() => {
          alert("Manga eliminato con successo.");
        })
        .catch(() => {
          alert("Errore nell'eliminazione del manga.");
        });
    }
  };

  const handleEdit = (manga) => {
    setSelectedManga(manga);
    setFormData({
      name: manga.name || "",
      publisher: manga.publisher || "",
      author: manga.author || "",
      type: manga.type || "",
      category: manga.category || "",
      genres: manga.genres.join(", ") || "",
      language: manga.language || "",
      price: manga.price || "",
      availability: manga.availability || "",
      description: manga.description || "",
    });
    setShowEditForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedManga = {
      ...formData,
      genres: formData.genres.split(",").map((genre) => genre.trim()), // Converte la stringa di generi in un array
    };

    dispatch(updateManga({ id: selectedManga._id, mangaData: updatedManga }))
      .unwrap()
      .then(() => {
        alert("Manga aggiornato con successo.");
        setShowEditForm(false);
      })
      .catch(() => {
        alert("Errore nell'aggiornamento del manga.");
      });
  };

  if (isLoading) return <p>Caricamento in corso...</p>;
  if (error) return <p>Errore: {error}</p>;

  return (
    <div className="container mt-5">
      <h2>Lista Manga</h2>
      <div className="row">
        {mangas.map((manga) => (
          <div className="col-md-4" key={manga._id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{manga.name}</h5> {/* Solo nome */}
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(manga)}
                  >
                    Modifica
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(manga._id)}
                  >
                    Elimina
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showEditForm && selectedManga && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifica Manga</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowEditForm(false)}
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Editore</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.publisher}
                      onChange={(e) =>
                        setFormData({ ...formData, publisher: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Autore</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Tipo</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Categoria</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Generi (separati da virgola)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.genres}
                      onChange={(e) =>
                        setFormData({ ...formData, genres: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Lingua</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.language}
                      onChange={(e) =>
                        setFormData({ ...formData, language: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Prezzo</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Disponibilità</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.availability}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          availability: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Descrizione</label>
                    <textarea
                      className="form-control"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditForm(false)}
                  >
                    Annulla
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Aggiorna
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MangaListPage;
