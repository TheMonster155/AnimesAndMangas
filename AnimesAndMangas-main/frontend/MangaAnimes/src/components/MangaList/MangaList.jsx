import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllMangas,
  allMangas,
  isMangaLoading,
  errorManga,
} from "../../reduces/mangaReduces";
import "./MangaList.css";
import Footer from "../Footer/Footer";
import NavbarComponent from "../Navbar/Navbar";

const MangaList = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    dispatch(getAllMangas());
  }, [dispatch]);

  const handleNavigate = (id) => {
    navigate(`/details/${type}/${id}`);
  };

  const filteredMangas = mangas
    .filter((manga) => manga.type === type)
    .filter(
      (manga) =>
        (minPrice ? manga.price >= minPrice : true) &&
        (maxPrice ? manga.price <= maxPrice : true)
    )
    .filter((manga) =>
      selectedCategories.length > 0
        ? selectedCategories.includes(manga.category)
        : true
    )
    .filter((manga) =>
      selectedGenres.length > 0
        ? selectedGenres.some((genre) => manga.genres.includes(genre))
        : true
    )
    .sort((a, b) => {
      if (sortOption === "name_asc") return a.name.localeCompare(b.name);
      if (sortOption === "name_desc") return b.name.localeCompare(a.name);
      if (sortOption === "price_asc") return a.price - b.price;
      if (sortOption === "price_desc") return b.price - a.price;
      return 0;
    });

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  return (
    <>
      <NavbarComponent />
      <div className="manga-list-space-up" />
      <div className="container w-100">
        <div className="row">
          <div className="col-md-3 mb-3  filter-container_list">
            <div className="mb-3">
              <h5>Ordina per</h5>
              <select
                className="form-select"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="">Seleziona Ordinamento</option>
                <option value="name_asc">Nome, da A a Z</option>
                <option value="name_desc">Nome, da Z a A</option>
                <option value="price_asc">
                  Prezzo, da meno caro a più caro
                </option>
                <option value="price_desc">
                  Prezzo, da più caro a meno caro
                </option>
              </select>
            </div>

            <div className="mb-3">
              <h5>Filtra per Prezzo</h5>
              <input
                type="number"
                className="form-control"
                placeholder="Minimo"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
              <input
                type="number"
                className="form-control mt-2"
                placeholder="Massimo"
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </div>

            {type === "Manga" && (
              <>
                <div className="mb-3">
                  <h5>Filtra per Categoria</h5>
                  {["Shonen", "Shojo", "Seinen", "Josei", "Kodomo"].map(
                    (category) => (
                      <div key={category} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={category}
                          value={category}
                          onChange={handleCategoryChange}
                          checked={selectedCategories.includes(category)}
                        />
                        <label className="form-check-label" htmlFor={category}>
                          {category}
                        </label>
                      </div>
                    )
                  )}
                </div>

                <div className="mb-3">
                  <h5>Filtra per Genere</h5>
                  {[
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
                  ].map((genre) => (
                    <div key={genre} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={genre}
                        value={genre}
                        onChange={handleGenreChange}
                        checked={selectedGenres.includes(genre)}
                      />
                      <label className="form-check-label" htmlFor={genre}>
                        {genre}
                      </label>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="col-md-9">
            {isLoading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <div className="row">
                {filteredMangas.map((manga) => (
                  <div
                    className="col-lg-4 col-md-6 col-sm-12 mb-4"
                    key={manga._id}
                    onClick={() => handleNavigate(manga._id)}
                  >
                    <div className="card-custom">
                      <img
                        src={manga.file?.url || "default-image.jpg"}
                        className="card-img-top"
                        alt={manga.name}
                      />
                      <div className="card-body-custom">
                        <h5 className="card-title">{manga.name}</h5>
                        <div className="price-container">
                          <p className="card-text fs-2">€ {manga.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="manga-list-space-down" />
      <Footer />
    </>
  );
};

export default MangaList;
