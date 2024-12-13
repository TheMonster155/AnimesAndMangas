/*import React, { useEffect } from "react";
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
import Swal from "sweetalert2";

const MangaListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  useEffect(() => {
    // Controlla il token e fetch dei manga
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
        dispatch(getAllMangas()); // Fetch dei manga
      }
    }
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Sei sicuro?",
      text: "Questa azione non può essere annullata!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sì, elimina!",
      cancelButtonText: "Annulla",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteManga(id))
          .unwrap()
          .then(() => {
            Swal.fire("Eliminato!", "Il manga è stato eliminato.", "success");
          })
          .catch(() => {
            Swal.fire("Errore", "Impossibile eliminare il manga.", "error");
          });
      }
    });
  };

  const handleEdit = (id, currentTitle) => {
    Swal.fire({
      title: "Modifica il titolo del manga",
      input: "text",
      inputValue: currentTitle,
      showCancelButton: true,
      confirmButtonText: "Aggiorna",
      cancelButtonText: "Annulla",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateManga({ id, mangaData: { title: result.value } }))
          .unwrap()
          .then(() => {
            Swal.fire("Aggiornato!", "Il manga è stato aggiornato.", "success");
          })
          .catch(() => {
            Swal.fire("Errore", "Impossibile aggiornare il manga.", "error");
          });
      }
    });
  };

  if (isLoading) return <p>Caricamento in corso...</p>;
  if (error) return <p>Errore: {error}</p>;

  // Recupera l'utente dal token per filtrare i manga
  const token = localStorage.getItem("Authorization");
  const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userId = decodedToken?.userId;

  const filteredMangas = mangas;

  return (
    <div className="container mt-5">
      <h2>Lista Manga</h2>
      <div className="row">
        {filteredMangas.map((manga) => (
          <div className="col-md-4" key={manga._id}>
            <div className="card mb-4">
              <img
                src={manga.imageUrl}
                className="card-img-top"
                alt={manga.title}
              />
              <div className="card-body">
                <h5 className="card-title">{manga.title}</h5>
                <p className="card-text">{manga.description}</p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(manga._id, manga.name)}
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
    </div>
  );
};

export default MangaListPage;
*/
/*
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
      genres: formData.genres.split(",").map((genre) => genre.trim()),
    };

    dispatch(updateManga({ id: selectedManga._id, mangaData: updatedManga }))
      .unwrap()
      .then(() => {
        alert("Manga aggiornato con successo.");
        setShowEditForm(false); // Close the form
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
                <h5 className="card-title">{manga.name}</h5> 
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

      {showEditForm && (
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
*/
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
    // Imposta i dati del manga nel form
    setSelectedManga(manga);
    setFormData({
      name: manga.name || "",
      publisher: manga.publisher || "",
      author: manga.author || "",
      type: manga.type || "",
      category: manga.category || "",
      genres: manga.genres.join(", ") || "", // Precompila i generi come stringa separata da virgole
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
        setShowEditForm(false); // Chiude il modulo dopo l'aggiornamento
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
