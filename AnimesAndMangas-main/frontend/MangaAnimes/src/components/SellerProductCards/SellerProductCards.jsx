import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllMangas } from "../redux/mangaSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MangaCards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mangas, loading, error } = useSelector((state) => state.mangas);
  const userRole = sessionStorage.getItem("role"); // Controlla il ruolo salvato nella sessione (seller, admin, user)

  useEffect(() => {
    // Ottieni tutti i manga dal server
    dispatch(getAllMangas());
  }, [dispatch]);

  const handleDelete = (mangaId) => {
    // Funzione per eliminare manga
    // Puoi aggiungere la logica per eliminare il manga dal database
    console.log(`Manga ${mangaId} eliminato`);
  };

  const handleEdit = (mangaId) => {
    // Funzione per modificare manga
    // Puoi aggiungere la logica per redirigere a una pagina di modifica
    console.log(`Modifica del manga ${mangaId}`);
  };

  const handleAccessDenied = () => {
    // Gestisce l'accesso negato per gli utenti non venditori
    Swal.fire({
      title: "Devi essere un venditore!",
      text: "Per accedere alla pagina diventa un venditore.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Diventa un venditore",
      cancelButtonText: "Annulla",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/registationSeller"); // Naviga alla registrazione venditore
      } else {
        navigate("/"); // Naviga alla home
      }
    });
  };

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>Errore nel recupero dei manga: {error}</div>;

  return (
    <div className="container">
      {userRole === "user" ? (
        handleAccessDenied()
      ) : (
        <div className="row">
          {mangas
            .filter(
              (manga) =>
                userRole === "admin" ||
                manga.sellerId === sessionStorage.getItem("userId")
            )
            .map((manga) => (
              <div key={manga._id} className="col-md-4 mb-4">
                <div className="card">
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
                        className="btn btn-warning"
                        onClick={() => handleEdit(manga._id)}
                      >
                        Modifica
                      </button>
                      {userRole !== "user" && (
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(manga._id)}
                        >
                          Elimina
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MangaCards;
