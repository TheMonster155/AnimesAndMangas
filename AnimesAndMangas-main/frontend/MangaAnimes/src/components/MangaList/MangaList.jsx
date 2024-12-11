/*import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllMangas,
  allMangas,
  isMangaLoading,
  errorManga,
} from "../../reduces/mangaReduces";
import { Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";

const MangaList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [genre, setGenre] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    console.log("Fetching mangas...");
    dispatch(getAllMangas());
  }, [dispatch]);

  const handleSortChange = (e) => {
    console.log("Sorting by:", e.target.value);
    setSortOption(e.target.value);
  };

  const handleNavigate = (_id) => {
    console.log("Navigating to details of manga with id:", _id);
    navigate(`/details/manga/${_id}`);
  };

  const filteredMangas = mangas
    .filter(
      (manga) =>
        (minPrice ? manga.price >= minPrice : true) &&
        (maxPrice ? manga.price <= maxPrice : true)
    )
    .filter((manga) => (category ? manga.category === category : true))
    .filter((manga) => (genre ? manga.genre === genre : true))
    .sort((a, b) => {
      console.log("Sorting mangas...");
      if (sortOption === "name_asc") return a.name.localeCompare(b.name);
      if (sortOption === "name_desc") return b.name.localeCompare(a.name);
      if (sortOption === "price_asc") return a.price - b.price;
      if (sortOption === "price_desc") return b.price - a.price;
      return 0;
    });

  console.log("Filtered Mangas:", filteredMangas);

  return (
    <div className="container mt-4">
      <Row>
        <Col md={3}>
          <div className="mb-3">
            <h5>Filtra per Prezzo</h5>
            <Form.Control
              type="number"
              placeholder="Minimo"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Form.Control
              type="number"
              placeholder="Massimo"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="mt-2"
            />
          </div>

          <div className="mb-3">
            <h5>Filtra per Categoria</h5>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Seleziona Categoria</option>
              <option value="Shonen">Shonen</option>
              <option value="Shojo">Shojo</option>
              <option value="Seinen">Seinen</option>
              <option value="Josei">Josei</option>
              <option value="Kodomo">Kodomo</option>
            </Form.Select>
          </div>

          <div className="mb-3">
            <h5>Filtra per Genere</h5>
            <Form.Select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">Seleziona Genere</option>
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
            </Form.Select>
          </div>
        </Col>

        <Col md={9}>
          <div className="mb-3">
            <h5>Ordina per</h5>
            <Form.Select value={sortOption} onChange={handleSortChange}>
              <option value="">Seleziona Ordinamento</option>
              <option value="name_asc">Nome, da A a Z</option>
              <option value="name_desc">Nome, da Z a A</option>
              <option value="price_asc">Prezzo, da meno caro a più caro</option>
              <option value="price_desc">
                Prezzo, da più caro a meno caro
              </option>
            </Form.Select>
          </div>

          {isLoading ? (
            <Spinner animation="border" />
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <Row>
              {filteredMangas.map((manga) => (
                <Col md={4} key={manga._id} className="mb-4">
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src={manga.file?.url || "default-image.jpg"} // Usa manga.file.url per l'immagine
                      style={{ height: "200px", objectFit: "cover" }}
                      alt={manga.name} // Usa name invece di title
                    />
                    <Card.Body>
                      <Card.Title>{manga.name}</Card.Title>
                      <Card.Text>€ {manga.price}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => handleNavigate(manga._id)}
                      >
                        Aggiungi al carrello
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MangaList;
*/ /*
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllMangas,
  allMangas,
  isMangaLoading,
  errorManga,
} from "../../reduces/mangaReduces";
import { Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";

const MangaList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]); // Stato per i generi selezionati
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    console.log("Fetching mangas...");
    dispatch(getAllMangas());
  }, [dispatch]);

  const handleSortChange = (e) => {
    console.log("Sorting by:", e.target.value);
    setSortOption(e.target.value);
  };

  const handleNavigate = (_id) => {
    console.log("Navigating to details of manga with id:", _id);
    navigate(`/details/manga/${_id}`);
  };

  // Filtra per più generi e categorie
  const filteredMangas = mangas
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
      console.log("Sorting mangas...");
      if (sortOption === "name_asc") return a.name.localeCompare(b.name);
      if (sortOption === "name_desc") return b.name.localeCompare(a.name);
      if (sortOption === "price_asc") return a.price - b.price;
      if (sortOption === "price_desc") return b.price - a.price;
      return 0;
    });

  console.log("Filtered Mangas:", filteredMangas);

  // Gestisce la selezione dei generi
  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((item) => item !== genre)
        : [...prevGenres, genre]
    );
  };

  // Gestisce la selezione delle categorie
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((item) => item !== category)
        : [...prevCategories, category]
    );
  };

  return (
    <div className="container mt-4">
      <Row>
        
        <Col md={3}>
          <div className="mb-3">
            <h5>Filtra per Prezzo</h5>
            <Form.Control
              type="number"
              placeholder="Minimo"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Form.Control
              type="number"
              placeholder="Massimo"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="mt-2"
            />
          </div>

          <div className="mb-3">
            <h5>Filtra per Categoria</h5>
            <div>
              {["Shonen", "Shojo", "Seinen", "Josei", "Kodomo"].map(
                (category) => (
                  <Form.Check
                    key={category}
                    type="checkbox"
                    label={category}
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={handleCategoryChange}
                  />
                )
              )}
            </div>
          </div>

          <div className="mb-3">
            <h5>Filtra per Genere</h5>
            <div>
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
                <Form.Check
                  key={genre}
                  type="checkbox"
                  label={genre}
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={handleGenreChange}
                />
              ))}
            </div>
          </div>
        </Col>

   
        <Col md={9}>
          <div className="mb-3">
            <h5>Ordina per</h5>
            <Form.Select value={sortOption} onChange={handleSortChange}>
              <option value="">Seleziona Ordinamento</option>
              <option value="name_asc">Nome, da A a Z</option>
              <option value="name_desc">Nome, da Z a A</option>
              <option value="price_asc">Prezzo, da meno caro a più caro</option>
              <option value="price_desc">
                Prezzo, da più caro a meno caro
              </option>
            </Form.Select>
          </div>

          {isLoading ? (
            <Spinner animation="border" />
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <Row>
              {filteredMangas.map((manga) => (
                <Col md={4} key={manga._id} className="mb-4">
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src={manga.file?.url || "default-image.jpg"}
                      style={{ height: "200px", objectFit: "cover" }}
                      alt={manga.name}
                    />
                    <Card.Body>
                      <Card.Title>{manga.name}</Card.Title>
                      <Card.Text>€ {manga.price}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => handleNavigate(manga._id)}
                      >
                        Aggiungi al carrello
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MangaList;
*/
/*
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllMangas,
  allMangas,
  isMangaLoading,
  errorManga,
} from "../../reduces/mangaReduces";
import { Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";

const MangaList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]); // Stato per i generi selezionati
  const [sortOption, setSortOption] = useState("");

  // Calcolare automaticamente min e max prezzo dai manga
  useEffect(() => {
    dispatch(getAllMangas());
  }, [dispatch]);

  const handleSortChange = (e) => {
    console.log("Sorting by:", e.target.value);
    setSortOption(e.target.value);
  };

  const handleNavigate = (_id) => {
    console.log("Navigating to details of manga with id:", _id);
    navigate(`/details/manga/${_id}`);
  };

  // Calcola il minimo e massimo prezzo tra tutti i manga
  const allPrices = mangas.map((manga) => manga.price);
  const autoMinPrice = Math.min(...allPrices);
  const autoMaxPrice = Math.max(...allPrices);

  // Filtra per più generi e categorie
  const filteredMangas = mangas
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
      console.log("Sorting mangas...");
      if (sortOption === "name_asc") return a.name.localeCompare(b.name);
      if (sortOption === "name_desc") return b.name.localeCompare(a.name);
      if (sortOption === "price_asc") return a.price - b.price;
      if (sortOption === "price_desc") return b.price - a.price;
      return 0;
    });

  // Gestisce la selezione dei generi
  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((item) => item !== genre)
        : [...prevGenres, genre]
    );
  };

  // Gestisce la selezione delle categorie
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((item) => item !== category)
        : [...prevCategories, category]
    );
  };

  // Imposta i valori min e max prezzo in modo dinamico
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    if (!e.target.value) {
      setMaxPrice(autoMaxPrice); // Se il min è vuoto, impostiamo il max come valore massimo
    }
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    if (!e.target.value) {
      setMinPrice(autoMinPrice); // Se il max è vuoto, impostiamo il min come valore minimo
    }
  };

  return (
    <div className="container mt-4">
      <Row>
        
        <Col md={3}>
          <div className="mb-3">
            <h5>Filtra per Prezzo</h5>
            <Form.Control
              type="numeric"
              placeholder="Minimo"
              value={minPrice || ""}
              onChange={handleMinPriceChange}
            />
            <Form.Control
              type="numeric"
              placeholder="Massimo"
              value={maxPrice || ""}
              onChange={handleMaxPriceChange}
              className="mt-2"
            />
          </div>

          <div className="mb-3">
            <h5>Filtra per Categoria</h5>
            <div>
              {["Shonen", "Shojo", "Seinen", "Josei", "Kodomo"].map(
                (category) => (
                  <Form.Check
                    key={category}
                    type="checkbox"
                    label={category}
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={handleCategoryChange}
                  />
                )
              )}
            </div>
          </div>

          <div className="mb-3">
            <h5>Filtra per Genere</h5>
            <div>
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
                <Form.Check
                  key={genre}
                  type="checkbox"
                  label={genre}
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={handleGenreChange}
                />
              ))}
            </div>
          </div>
        </Col>

 
        <Col md={9}>
          <div className="mb-3">
            <h5>Ordina per</h5>
            <Form.Select value={sortOption} onChange={handleSortChange}>
              <option value="">Seleziona Ordinamento</option>
              <option value="name_asc">Nome, da A a Z</option>
              <option value="name_desc">Nome, da Z a A</option>
              <option value="price_asc">Prezzo, da meno caro a più caro</option>
              <option value="price_desc">
                Prezzo, da più caro a meno caro
              </option>
            </Form.Select>
          </div>

          {isLoading ? (
            <Spinner animation="border" />
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <Row>
              {filteredMangas.map((manga) => (
                <Col md={4} key={manga._id} className="mb-4">
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src={manga.file?.url || "default-image.jpg"}
                      style={{ height: "200px", objectFit: "cover" }}
                      alt={manga.name}
                    />
                    <Card.Body>
                      <Card.Title>{manga.name}</Card.Title>
                      <Card.Text>€ {manga.price}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => handleNavigate(manga._id)}
                      >
                        Aggiungi al carrello
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MangaList;
*/

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllMangas,
  allMangas,
  isMangaLoading,
  errorManga,
} from "../../reduces/mangaReduces";
import "./MangaList.css"; // Importa il file CSS
import Footer from "../Footer/Footer";
import NavbarComponent from "../Navbar/Navbar";

const MangaList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    dispatch(getAllMangas());
  }, [dispatch]);

  const handleNavigate = (id) => {
    navigate(`/details/manga/${id}`);
  };

  const allPrices = mangas.map((manga) => manga.price);
  const autoMinPrice = Math.min(...allPrices);
  const autoMaxPrice = Math.max(...allPrices);

  const filteredMangas = mangas
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

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <>
      <NavbarComponent />
      <div className="manga-list-space-up" />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
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
          </div>

          <div className="col-md-9">
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
                    className="col-md-4 mb-4"
                    key={manga._id}
                    onClick={() => handleNavigate(manga._id)}
                  >
                    <div className="card h-100">
                      <img
                        src={manga.file?.url || "default-image.jpg"}
                        className="card-img-top"
                        alt={manga.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{manga.name}</h5>
                        <p className="card-text">€ {manga.price}</p>
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
