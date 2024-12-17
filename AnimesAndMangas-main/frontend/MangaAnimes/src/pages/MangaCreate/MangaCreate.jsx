import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createManga,
  isCreatingManga,
  errorCreatingManga,
} from "../../reduces/mangaReduces";
import NavbarComponent from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MangaForm from "./MangaForm/MangaForm";

const CreateManga = () => {
  const dispatch = useDispatch();
  const isCreating = useSelector(isCreatingManga);
  const createError = useSelector(errorCreatingManga);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    file: null,
    description: "",
    type: "",
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
    if (submitted && !isCreating) {
      if (createError) {
        alert(`Errore nella creazione del manga: ${createError}`);
      } else {
        if (formData.name !== "" && formData.price !== "") {
          alert("Creazione avvenuta con successo!");
        }
      }
      setSubmitted(false);
    }
  }, [createError, isCreating, formData, submitted]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("Tipo di file non supportato. Carica un'immagine.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(
          "Il file è troppo grande. Carica un'immagine di dimensioni inferiori a 5 MB."
        );
        return;
      }
      setFormData({ ...formData, file });
    } else if (type === "checkbox") {
      const checked = e.target.checked;
      setFormData((prev) => ({
        ...prev,
        genres: checked
          ? [...prev.genres, value]
          : prev.genres.filter((g) => g !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (e, genre) => {
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      genres: checked
        ? [...prev.genres, genre]
        : prev.genres.filter((g) => g !== genre),
    }));
  };

  const handleSubmit = (event) => {
    const price = parseFloat(formData.price);
    if (isNaN(price)) {
      alert("Il prezzo deve essere un numero valido.");
      return;
    }

    if (!formData.name || !formData.name.trim()) {
      alert("Il nome è obbligatorio.");
      return;
    }

    dispatch(createManga(formData));
    setSubmitted(true);
  };

  return (
    <>
      <NavbarComponent />
      <MangaForm
        formData={formData}
        genresList={genresList}
        handleChange={handleChange}
        handleCheckboxChange={handleCheckboxChange}
        handleSubmit={handleSubmit}
      />
      <Footer />
    </>
  );
};

export default CreateManga;
