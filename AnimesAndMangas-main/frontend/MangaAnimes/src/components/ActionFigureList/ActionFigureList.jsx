/*import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllActionFigures,
  allActionFigures,
  isActionFigureLoading,
  errorActionFigure,
} from "../../reduces/actionFigureRedux"; // Assicurati che il percorso sia corretto

const ActionFigureList = () => {
  const dispatch = useDispatch();

  // Stati globali
  const actionFigures = useSelector(allActionFigures);
  const isLoading = useSelector(isActionFigureLoading);
  const error = useSelector(errorActionFigure);

  // Stati locali
  const [sortedFigures, setSortedFigures] = useState([]);
  const [filter, setFilter] = useState({ minPrice: "", maxPrice: "" });
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    dispatch(getAllActionFigures());
  }, [dispatch]);

  useEffect(() => {
    setSortedFigures([...actionFigures]);
  }, [actionFigures]);

  // Funzioni di ordinamento
  const handleSort = (option) => {
    setSortOption(option);
    let sorted = [...actionFigures];

    switch (option) {
      case "nameAZ":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameZA":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "priceLowHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setSortedFigures(sorted);
  };

  // Funzione di filtro
  const handleFilter = () => {
    const min = parseFloat(filter.minPrice) || 0;
    const max = parseFloat(filter.maxPrice) || Infinity;

    const filtered = actionFigures.filter(
      (figure) => figure.price >= min && figure.price <= max
    );
    setSortedFigures(filtered);
  };

  // Render
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Action Figures</h1>


      <div className="mb-4">
        <label className="me-2">Ordina per:</label>
        <select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          className="form-select d-inline-block w-auto"
        >
          <option value="">Seleziona</option>
          <option value="nameAZ">Nome, da A a Z</option>
          <option value="nameZA">Nome, da Z a A</option>
          <option value="priceLowHigh">Prezzo, da meno caro a più caro</option>
          <option value="priceHighLow">Prezzo, da più caro a meno caro</option>
        </select>
      </div>

     
      <div className="mb-4">
        <label>Filtra per prezzo:</label>
        <div className="d-flex align-items-center">
          <input
            type="number"
            placeholder="Prezzo minimo"
            value={filter.minPrice}
            onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
            className="form-control me-2"
          />
          <input
            type="number"
            placeholder="Prezzo massimo"
            value={filter.maxPrice}
            onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
            className="form-control me-2"
          />
          <button onClick={handleFilter} className="btn btn-primary">
            Filtra
          </button>
        </div>
      </div>


      {isLoading && <p>Caricamento in corso...</p>}
      {error && <p className="text-danger">{error}</p>}

  
      <div className="row">
        {sortedFigures.map((figure, index) => (
          <div key={figure.id || index} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={figure.image}
                alt={figure.name}
                className="card-img-top"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{figure.name}</h5>
                <p className="card-text">Prezzo: €{figure.price.toFixed(2)}</p>
                <button className="btn btn-success">
                  Aggiungi al carrello
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionFigureList;
*/

/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllActionFigures,
  allActionFigures,
  isActionFigureLoading,
  errorActionFigure,
} from "../../reduces/actionFigureRedux";

const ActionFigureList = () => {
  const dispatch = useDispatch();

  // Stati globali
  const actionFigures = useSelector(allActionFigures);
  const isLoading = useSelector(isActionFigureLoading);
  const error = useSelector(errorActionFigure);

  // Stati locali
  const [sortedFigures, setSortedFigures] = useState([]);
  const [filter, setFilter] = useState({ minPrice: "", maxPrice: "" });
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    dispatch(getAllActionFigures());
  }, [dispatch]);

  useEffect(() => {
    setSortedFigures([...actionFigures]);
  }, [actionFigures]);

  // Funzioni di ordinamento
  const handleSort = (option) => {
    setSortOption(option);
    let sorted = [...actionFigures];

    switch (option) {
      case "nameAZ":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameZA":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "priceLowHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setSortedFigures(sorted);
  };

  // Funzione di filtro
  const handleFilter = () => {
    const min = parseFloat(filter.minPrice) || 0;
    const max = parseFloat(filter.maxPrice) || Infinity;

    const filtered = actionFigures.filter(
      (figure) => figure.price >= min && figure.price <= max
    );
    setSortedFigures(filtered);
  };

  // Funzione per ottenere l'immagine
  const getImageUrl = (figure) => {
    if (figure.photoUrl) return figure.photoUrl;
    if (figure.file && typeof figure.file === "string") return figure.file;
    if (figure.file && figure.file.url) return figure.file.url; // Gestione oggetti file
    return "https://via.placeholder.com/200x200.png?text=No+Image"; // Placeholder
  };

  // Render
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Action Figures</h1>

      
      <div className="mb-4">
        <label className="me-2">Ordina per:</label>
        <select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          className="form-select d-inline-block w-auto"
        >
          <option value="">Seleziona</option>
          <option value="nameAZ">Nome, da A a Z</option>
          <option value="nameZA">Nome, da Z a A</option>
          <option value="priceLowHigh">Prezzo, da meno caro a più caro</option>
          <option value="priceHighLow">Prezzo, da più caro a meno caro</option>
        </select>
      </div>

   
      <div className="mb-4">
        <label>Filtra per prezzo:</label>
        <div className="d-flex align-items-center">
          <input
            type="number"
            placeholder="Prezzo minimo"
            value={filter.minPrice}
            onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
            className="form-control me-2"
          />
          <input
            type="number"
            placeholder="Prezzo massimo"
            value={filter.maxPrice}
            onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
            className="form-control me-2"
          />
          <button onClick={handleFilter} className="btn btn-primary">
            Filtra
          </button>
        </div>
      </div>

     
      {isLoading && <p>Caricamento in corso...</p>}
      {error && <p className="text-danger">{error}</p>}

    
      <div className="row">
        {sortedFigures.map((figure, index) => (
          <div key={figure._id || index} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={getImageUrl(figure)}
                alt={figure.name}
                className="card-img-top"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{figure.name}</h5>
                <p className="card-text">Prezzo: €{figure.price.toFixed(2)}</p>
                <button className="btn btn-success">
                  Aggiungi al carrello
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionFigureList;
*/
/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import {
  getAllActionFigures,
  allActionFigures,
  isActionFigureLoading,
  errorActionFigure,
} from "../../reduces/actionFigureRedux";
import "./ActionFigureList.css"; // Importa il file CSS

const ActionFigureList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Inizializza useNavigate

  // Stati globali
  const actionFigures = useSelector(allActionFigures);
  const isLoading = useSelector(isActionFigureLoading);
  const error = useSelector(errorActionFigure);

  // Stati locali
  const [sortedFigures, setSortedFigures] = useState([]);
  const [filter, setFilter] = useState({ minPrice: "", maxPrice: "" });
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    dispatch(getAllActionFigures());
  }, [dispatch]);

  useEffect(() => {
    setSortedFigures([...actionFigures]);
  }, [actionFigures]);

  // Funzioni di ordinamento
  const handleSort = (option) => {
    setSortOption(option);
    let sorted = [...actionFigures];

    switch (option) {
      case "nameAZ":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameZA":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "priceLowHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setSortedFigures(sorted);
  };

  // Funzione di filtro
  const handleFilter = () => {
    const min = parseFloat(filter.minPrice) || 0;
    const max = parseFloat(filter.maxPrice) || Infinity;

    const filtered = actionFigures.filter(
      (figure) => figure.price >= min && figure.price <= max
    );
    setSortedFigures(filtered);
  };

  // Funzione per ottenere l'immagine
  const getImageUrl = (figure) => {
    if (figure.photoUrl) return figure.photoUrl;
    if (figure.file && typeof figure.file === "string") return figure.file;
    if (figure.file && figure.file.url) return figure.file.url; // Gestione oggetti file
    return "https://via.placeholder.com/200x200.png?text=No+Image"; // Placeholder
  };

  // Funzione per gestire il clic sulla card
  const handleCardClick = (id) => {
    navigate(`/details/actionfigure/${id}`); // Naviga alla pagina dei dettagli
  };

  // Render
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Action Figures</h1>

  
      <div className="mb-4">
        <label className="me-2">Ordina per:</label>
        <select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          className="form-select d-inline-block w-auto"
        >
          <option value="">Seleziona</option>
          <option value="nameAZ">Nome, da A a Z</option>
          <option value="nameZA">Nome, da Z a A</option>
          <option value="priceLowHigh">Prezzo, da meno caro a più caro</option>
          <option value="priceHighLow">Prezzo, da più caro a meno caro</option>
        </select>
      </div>

      <div className="mb-4">
        <label>Filtra per prezzo:</label>
        <div className="d-flex align-items-center">
          <input
            type="number"
            placeholder="Prezzo minimo"
            value={filter.minPrice}
            onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
            className="form-control me-2"
          />
          <input
            type="number"
            placeholder="Prezzo massimo"
            value={filter.maxPrice}
            onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
            className="form-control me-2"
          />
          <button onClick={handleFilter} className="btn btn-primary">
            Filtra
          </button>
        </div>
      </div>

   
      {isLoading && <p>Caricamento in corso...</p>}
      {error && <p className="text-danger">{error}</p>}

    
      <div className="row">
        {sortedFigures.map((figure, index) => (
          <div key={figure._id || index} className="col-md-4 mb-4">
            <div className="card" onClick={() => handleCardClick(figure._id)}>
              <div className="card-img-container">
                <img
                  src={getImageUrl(figure)}
                  alt={figure.name}
                  className="card-img-top"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{figure.name}</h5>
                <p className="card-text">Prezzo: €{figure.price.toFixed(2)}</p>
                <button className="card-btn">Aggiungi al carrello</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionFigureList;
*/
/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import {
  getAllActionFigures,
  allActionFigures,
  isActionFigureLoading,
  errorActionFigure,
} from "../../reduces/actionFigureRedux";
import "./ActionFigureList.css"; // Importa il file CSS

const ActionFigureList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Inizializza useNavigate

  // Stati globali
  const actionFigures = useSelector(allActionFigures);
  const isLoading = useSelector(isActionFigureLoading);
  const error = useSelector(errorActionFigure);

  // Stati locali
  const [sortedFigures, setSortedFigures] = useState([]);
  const [filter, setFilter] = useState({ minPrice: "", maxPrice: "" });
  const [sortOption, setSortOption] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  useEffect(() => {
    dispatch(getAllActionFigures());
  }, [dispatch]);

  useEffect(() => {
    setSortedFigures([...actionFigures]);
    if (actionFigures.length > 0) {
      // Imposta il prezzo minimo e massimo basato sui dati dei prodotti
      const prices = actionFigures.map((figure) => figure.price);
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));
    }
  }, [actionFigures]);

  // Funzioni di ordinamento
  const handleSort = (option) => {
    setSortOption(option);
    let sorted = [...actionFigures];

    switch (option) {
      case "nameAZ":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameZA":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "priceLowHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setSortedFigures(sorted);
  };

  // Funzione di filtro
  const handleFilter = () => {
    const min = parseFloat(filter.minPrice) || minPrice; // Usa minPrice se vuoto
    const max = parseFloat(filter.maxPrice) || maxPrice; // Usa maxPrice se vuoto

    const filtered = actionFigures.filter(
      (figure) => figure.price >= min && figure.price <= max
    );
    setSortedFigures(filtered);
  };

  // Funzione per ottenere l'immagine
  const getImageUrl = (figure) => {
    if (figure.photoUrl) return figure.photoUrl;
    if (figure.file && typeof figure.file === "string") return figure.file;
    if (figure.file && figure.file.url) return figure.file.url; // Gestione oggetti file
    return "https://via.placeholder.com/200x200.png?text=No+Image"; // Placeholder
  };

  // Funzione per gestire il clic sulla card
  const handleCardClick = (id) => {
    navigate(`/details/actionfigure/${id}`); // Naviga alla pagina dei dettagli
  };

  // Render
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Action Figures</h1>

 
      <div className="mb-4">
        <label className="me-2">Ordina per:</label>
        <select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          className="form-select d-inline-block w-auto"
        >
          <option value="">Seleziona</option>
          <option value="nameAZ">Nome, da A a Z</option>
          <option value="nameZA">Nome, da Z a A</option>
          <option value="priceLowHigh">Prezzo, da meno caro a più caro</option>
          <option value="priceHighLow">Prezzo, da più caro a meno caro</option>
        </select>
      </div>

     
      <div className="mb-4">
        <label>Filtra per prezzo:</label>
        <div className="d-flex align-items-center">
          <input
            type="number"
            placeholder="Prezzo minimo"
            value={filter.minPrice}
            onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
            min={minPrice} // Impedisce valori sotto il minimo
            className="form-control me-2"
          />
          <input
            type="number"
            placeholder="Prezzo massimo"
            value={filter.maxPrice}
            onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
            max={maxPrice} // Impedisce valori sopra il massimo
            className="form-control me-2"
          />
          <button onClick={handleFilter} className="btn btn-primary">
            Filtra
          </button>
        </div>
      </div>

    
      {isLoading && <p>Caricamento in corso...</p>}
      {error && <p className="text-danger">{error}</p>}

   
      <div className="row">
        {sortedFigures.map((figure, index) => (
          <div key={figure._id || index} className="col-md-4 mb-4">
            <div className="card" onClick={() => handleCardClick(figure._id)}>
              <div className="card-img-container">
                <img
                  src={getImageUrl(figure)}
                  alt={figure.name}
                  className="card-img-top"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{figure.name}</h5>
                <p className="card-text">Prezzo: €{figure.price.toFixed(2)}</p>
                <button className="card-btn">Aggiungi al carrello</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionFigureList;
*/
/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllActionFigures,
  allActionFigures,
  isActionFigureLoading,
  errorActionFigure,
} from "../../reduces/actionFigureRedux";
import "./ActionFigureList.css";

const ActionFigureList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Stati globali
  const actionFigures = useSelector(allActionFigures);
  const isLoading = useSelector(isActionFigureLoading);
  const error = useSelector(errorActionFigure);

  // Stati locali
  const [sortedFigures, setSortedFigures] = useState([]);
  const [filter, setFilter] = useState({ minPrice: "", maxPrice: "" });
  const [sortOption, setSortOption] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  useEffect(() => {
    dispatch(getAllActionFigures());
  }, [dispatch]);

  useEffect(() => {
    setSortedFigures([...actionFigures]);
    if (actionFigures.length > 0) {
      // Imposta il prezzo minimo e massimo basato sui dati dei prodotti
      const prices = actionFigures.map((figure) => figure.price);
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));
    }
  }, [actionFigures]);

  // Funzioni di ordinamento
  const handleSort = (option) => {
    setSortOption(option);
    let sorted = [...actionFigures];

    switch (option) {
      case "nameAZ":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameZA":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "priceLowHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setSortedFigures(sorted);
  };

  // Funzione di filtro
  const handleFilter = () => {
    const min = filter.minPrice ? parseFloat(filter.minPrice) : minPrice; // Usa minPrice se vuoto
    const max = filter.maxPrice ? parseFloat(filter.maxPrice) : maxPrice; // Usa maxPrice se vuoto

    // Se solo uno dei due valori (minPrice o maxPrice) è definito, applica il filtro solo su quello
    const filtered = actionFigures.filter((figure) => {
      const isWithinPriceRange = figure.price >= min && figure.price <= max;
      return isWithinPriceRange;
    });

    setSortedFigures(filtered);
  };

  // Funzione per ottenere l'immagine
  const getImageUrl = (figure) => {
    if (figure.photoUrl) return figure.photoUrl;
    if (figure.file && typeof figure.file === "string") return figure.file;
    if (figure.file && figure.file.url) return figure.file.url; // Gestione oggetti file
    return "https://via.placeholder.com/200x200.png?text=No+Image"; // Placeholder
  };

  // Funzione per gestire il clic sulla card
  const handleCardClick = (id) => {
    navigate(`/details/actionfigure/${id}`); // Naviga alla pagina dei dettagli
  };

  // Render
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Action Figures</h1>

    
      <div className="mb-4">
        <label className="me-2">Ordina per:</label>
        <select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          className="form-select d-inline-block w-auto"
        >
          <option value="">Seleziona</option>
          <option value="nameAZ">Nome, da A a Z</option>
          <option value="nameZA">Nome, da Z a A</option>
          <option value="priceLowHigh">Prezzo, da meno caro a più caro</option>
          <option value="priceHighLow">Prezzo, da più caro a meno caro</option>
        </select>
      </div>

    
      <div className="mb-4">
        <label>Filtra per prezzo:</label>
        <div className="d-flex align-items-center">
          <input
            type="number"
            placeholder="Prezzo minimo"
            value={filter.minPrice}
            onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
            min={minPrice} // Impedisce valori sotto il minimo
            className="form-control me-2"
          />
          <input
            type="number"
            placeholder="Prezzo massimo"
            value={filter.maxPrice}
            onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
            max={maxPrice} // Impedisce valori sopra il massimo
            className="form-control me-2"
          />
          <button onClick={handleFilter} className="btn btn-primary">
            Filtra
          </button>
        </div>
      </div>

  
      {isLoading && <p>Caricamento in corso...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {sortedFigures.map((figure, index) => (
          <div key={figure._id || index} className="col-md-4 mb-4">
            <div className="card" onClick={() => handleCardClick(figure._id)}>
              <div className="card-img-container">
                <img
                  src={getImageUrl(figure)}
                  alt={figure.name}
                  className="card-img-top"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{figure.name}</h5>
                <p className="card-text">Prezzo: €{figure.price.toFixed(2)}</p>
                <button className="card-btn">Aggiungi al carrello</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionFigureList;
*/
/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllActionFigures,
  allActionFigures,
  isActionFigureLoading,
  errorActionFigure,
} from "../../reduces/actionFigureRedux";
import "./ActionFigureList.css";

const ActionFigureList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Stati globali
  const actionFigures = useSelector(allActionFigures);
  const isLoading = useSelector(isActionFigureLoading);
  const error = useSelector(errorActionFigure);

  // Stati locali
  const [sortedFigures, setSortedFigures] = useState([]);
  const [filter, setFilter] = useState({ minPrice: "", maxPrice: "" });
  const [sortOption, setSortOption] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  useEffect(() => {
    dispatch(getAllActionFigures());
  }, [dispatch]);

  useEffect(() => {
    setSortedFigures([...actionFigures]);
    if (actionFigures.length > 0) {
      // Imposta il prezzo minimo e massimo basato sui dati dei prodotti
      const prices = actionFigures.map((figure) => figure.price);
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));
    }
  }, [actionFigures]);

  // Funzioni di ordinamento
  const handleSort = (option) => {
    setSortOption(option);
    let sorted = [...actionFigures];

    switch (option) {
      case "nameAZ":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameZA":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "priceLowHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setSortedFigures(sorted);
  };

  // Funzione per ottenere l'immagine
  const getImageUrl = (figure) => {
    if (figure.photoUrl) return figure.photoUrl;
    if (figure.file && typeof figure.file === "string") return figure.file;
    if (figure.file && figure.file.url) return figure.file.url; // Gestione oggetti file
    return "https://via.placeholder.com/200x200.png?text=No+Image"; // Placeholder
  };

  // Funzione per gestire il clic sulla card
  const handleCardClick = (id) => {
    navigate(`/details/actionfigure/${id}`); // Naviga alla pagina dei dettagli
  };

  // Funzione di filtro automatico
  useEffect(() => {
    const min = filter.minPrice ? parseFloat(filter.minPrice) : minPrice; // Usa minPrice se vuoto
    const max = filter.maxPrice ? parseFloat(filter.maxPrice) : maxPrice; // Usa maxPrice se vuoto

    // Filtra automaticamente quando il prezzo minimo o massimo cambiano
    const filtered = actionFigures.filter((figure) => {
      const isWithinPriceRange = figure.price >= min && figure.price <= max;
      return isWithinPriceRange;
    });

    setSortedFigures(filtered);
  }, [filter, actionFigures, minPrice, maxPrice]); // Aggiungi le dipendenze per eseguire il filtro

  // Render
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Action Figures</h1>

      
      <div className="mb-4">
        <label className="me-2">Ordina per:</label>
        <select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          className="form-select d-inline-block w-auto"
        >
          <option value="">Seleziona</option>
          <option value="nameAZ">Nome, da A a Z</option>
          <option value="nameZA">Nome, da Z a A</option>
          <option value="priceLowHigh">Prezzo, da meno caro a più caro</option>
          <option value="priceHighLow">Prezzo, da più caro a meno caro</option>
        </select>
      </div>

   
      <div className="mb-4">
        <label>Filtra per prezzo:</label>
        <div className="d-flex align-items-center">
          <input
            type="number"
            placeholder="Prezzo minimo"
            value={filter.minPrice}
            onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
            min={minPrice} // Impedisce valori sotto il minimo
            className="form-control me-2"
          />
          <input
            type="number"
            placeholder="Prezzo massimo"
            value={filter.maxPrice}
            onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
            max={maxPrice} // Impedisce valori sopra il massimo
            className="form-control me-2"
          />
        </div>
      </div>

     
      {isLoading && <p>Caricamento in corso...</p>}
      {error && <p className="text-danger">{error}</p>}

     
      <div className="row">
        {sortedFigures.map((figure, index) => (
          <div key={figure._id || index} className="col-md-4 mb-4">
            <div className="card" onClick={() => handleCardClick(figure._id)}>
              <div className="card-img-container">
                <img
                  src={getImageUrl(figure)}
                  alt={figure.name}
                  className="card-img-top"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{figure.name}</h5>
                <p className="card-text">Prezzo: €{figure.price.toFixed(2)}</p>
                <button className="card-btn">Aggiungi al carrello</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionFigureList;
*/
/*
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllActionFigures,
  allActionFigures,
  isActionFigureLoading,
  errorActionFigure,
} from "../../reduces/actionFigureRedux";
import "./ActionFigureList.css";

const ActionFigureList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Stati globali
  const actionFigures = useSelector(allActionFigures);
  const isLoading = useSelector(isActionFigureLoading);
  const error = useSelector(errorActionFigure);

  // Stati locali
  const [sortedFigures, setSortedFigures] = useState([]);
  const [filter, setFilter] = useState({ minPrice: "", maxPrice: "" });
  const [sortOption, setSortOption] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  useEffect(() => {
    dispatch(getAllActionFigures());
  }, [dispatch]);

  useEffect(() => {
    setSortedFigures([...actionFigures]);
    if (actionFigures.length > 0) {
      // Imposta il prezzo minimo e massimo basato sui dati dei prodotti
      const prices = actionFigures.map((figure) => figure.price);
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));
    }
  }, [actionFigures]);

  // Funzioni di ordinamento
  const handleSort = (option) => {
    setSortOption(option);
    let sorted = [...actionFigures];

    switch (option) {
      case "nameAZ":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameZA":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "priceLowHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setSortedFigures(sorted);
  };

  // Funzione per ottenere l'immagine
  const getImageUrl = (figure) => {
    if (figure.photoUrl) return figure.photoUrl;
    if (figure.file && typeof figure.file === "string") return figure.file;
    if (figure.file && figure.file.url) return figure.file.url; // Gestione oggetti file
    return "https://via.placeholder.com/200x200.png?text=No+Image"; // Placeholder
  };

  // Funzione per gestire il clic sulla card
  const handleCardClick = (id) => {
    navigate(`/details/actionfigure/${id}`); // Naviga alla pagina dei dettagli
  };

  // Funzione di filtro automatico
  useEffect(() => {
    const min = filter.minPrice ? parseFloat(filter.minPrice) : minPrice; // Usa minPrice se vuoto
    const max = filter.maxPrice ? parseFloat(filter.maxPrice) : maxPrice; // Usa maxPrice se vuoto

    // Filtra automaticamente quando il prezzo minimo o massimo cambiano
    const filtered = actionFigures.filter((figure) => {
      const isWithinPriceRange = figure.price >= min && figure.price <= max;
      return isWithinPriceRange;
    });

    setSortedFigures(filtered);
  }, [filter, actionFigures, minPrice, maxPrice]); // Aggiungi le dipendenze per eseguire il filtro

  // Render
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Action Figures</h1>

      <div className="row mb-4">
      
        <div className="col-md-6 mb-3">
          <label className="me-2">Filtra per prezzo:</label>
          <div className="d-flex align-items-center">
            <input
              type="number"
              placeholder="Prezzo minimo"
              value={filter.minPrice}
              onChange={(e) =>
                setFilter({ ...filter, minPrice: e.target.value })
              }
              min={minPrice} // Impedisce valori sotto il minimo
              className="form-control me-2"
            />
            <input
              type="number"
              placeholder="Prezzo massimo"
              value={filter.maxPrice}
              onChange={(e) =>
                setFilter({ ...filter, maxPrice: e.target.value })
              }
              max={maxPrice} // Impedisce valori sopra il massimo
              className="form-control"
            />
          </div>
        </div>

      
        <div className="col-md-6 mb-3">
          <label className="me-2">Ordina per:</label>
          <select
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className="form-select"
          >
            <option value="">Seleziona</option>
            <option value="nameAZ">Nome, da A a Z</option>
            <option value="nameZA">Nome, da Z a A</option>
            <option value="priceLowHigh">
              Prezzo, da meno caro a più caro
            </option>
            <option value="priceHighLow">
              Prezzo, da più caro a meno caro
            </option>
          </select>
        </div>
      </div>

      {isLoading && <p>Caricamento in corso...</p>}
      {error && <p className="text-danger">{error}</p>}

     
      <div className="row">
        {sortedFigures.map((figure, index) => (
          <div key={figure._id || index} className="col-md-4 mb-4">
            <div className="card" onClick={() => handleCardClick(figure._id)}>
              <div className="card-img-container">
                <img
                  src={getImageUrl(figure)}
                  alt={figure.name}
                  className="card-img-top"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{figure.name}</h5>
                <p className="card-text">Prezzo: €{figure.price.toFixed(2)}</p>
                <button className="card-btn">Aggiungi al carrello</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionFigureList;
*/

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllActionFigures,
  allActionFigures,
  isActionFigureLoading,
  errorActionFigure,
} from "../../reduces/actionFigureRedux";
import "./ActionFigureList.css";
import NavbarComponent from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const ActionFigureList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Stati globali
  const actionFigures = useSelector(allActionFigures);
  const isLoading = useSelector(isActionFigureLoading);
  const error = useSelector(errorActionFigure);

  // Stati locali
  const [sortedFigures, setSortedFigures] = useState([]);
  const [filter, setFilter] = useState({ minPrice: "", maxPrice: "" });
  const [sortOption, setSortOption] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  useEffect(() => {
    dispatch(getAllActionFigures());
  }, [dispatch]);

  useEffect(() => {
    setSortedFigures([...actionFigures]);
    if (actionFigures.length > 0) {
      // Imposta il prezzo minimo e massimo basato sui dati dei prodotti
      const prices = actionFigures.map((figure) => figure.price);
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));
    }
  }, [actionFigures]);

  // Funzioni di ordinamento
  const handleSort = (option) => {
    setSortOption(option);
    let sorted = [...actionFigures];

    switch (option) {
      case "nameAZ":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameZA":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "priceLowHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setSortedFigures(sorted);
  };

  // Funzione per ottenere l'immagine
  const getImageUrl = (figure) => {
    if (figure.photoUrl) return figure.photoUrl;
    if (figure.file && typeof figure.file === "string") return figure.file;
    if (figure.file && figure.file.url) return figure.file.url; // Gestione oggetti file
    return "https://via.placeholder.com/200x200.png?text=No+Image"; // Placeholder
  };

  // Funzione per gestire il clic sulla card
  const handleCardClick = (id) => {
    navigate(`/details/actionfigure/${id}`); // Naviga alla pagina dei dettagli
  };

  // Funzione di filtro automatico
  useEffect(() => {
    const min = filter.minPrice ? parseFloat(filter.minPrice) : minPrice; // Usa minPrice se vuoto
    const max = filter.maxPrice ? parseFloat(filter.maxPrice) : maxPrice; // Usa maxPrice se vuoto

    // Filtra automaticamente quando il prezzo minimo o massimo cambiano
    const filtered = actionFigures.filter((figure) => {
      const isWithinPriceRange = figure.price >= min && figure.price <= max;
      return isWithinPriceRange;
    });

    setSortedFigures(filtered);
  }, [filter, actionFigures, minPrice, maxPrice]); // Aggiungi le dipendenze per eseguire il filtro

  // Render
  return (
    <>
      <NavbarComponent />
      <div className="action_space_up" />
      <div className="container">
        <h1 className="text-center mb-4">Action Figures</h1>
        <div className="row">
          {/* Colonna a sinistra per i filtri */}
          <div className="col-md-3">
            <div className="me-3 mb-3">
              <label className="me-2">Filtra per prezzo:</label>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  placeholder="Prezzo minimo"
                  value={filter.minPrice}
                  onChange={(e) =>
                    setFilter({ ...filter, minPrice: e.target.value })
                  }
                  min={minPrice} // Impedisce valori sotto il minimo
                  className="form-control me-2"
                />
                <input
                  type="number"
                  placeholder="Prezzo massimo"
                  value={filter.maxPrice}
                  onChange={(e) =>
                    setFilter({ ...filter, maxPrice: e.target.value })
                  }
                  max={maxPrice} // Impedisce valori sopra il massimo
                  className="form-control"
                />
              </div>
            </div>

            {/* Sezione di ordinamento */}
            <div className="mb-3">
              <label className="me-2">Ordina per:</label>
              <select
                value={sortOption}
                onChange={(e) => handleSort(e.target.value)}
                className="form-select"
              >
                <option value="">Seleziona</option>
                <option value="nameAZ">Nome, da A a Z</option>
                <option value="nameZA">Nome, da Z a A</option>
                <option value="priceLowHigh">
                  Prezzo, da meno caro a più caro
                </option>
                <option value="priceHighLow">
                  Prezzo, da più caro a meno caro
                </option>
              </select>
            </div>
          </div>

          {/* Colonna a destra per i prodotti */}
          <div className="col-md-9">
            {/* Stato di caricamento o errore */}
            {isLoading && <p>Caricamento in corso...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Lista di prodotti */}

            <div className="row">
              {sortedFigures.map((figure, index) => (
                <div key={figure._id || index} className="col-md-4 mb-4">
                  <div
                    className="card h-100"
                    onClick={() => handleCardClick(figure._id)}
                  >
                    <div className="card-img-container">
                      <img
                        src={getImageUrl(figure)}
                        alt={figure.name}
                        className="card-img-top"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{figure.name}</h5>
                      <p className="card-text">€ {figure.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="action_space_down" />
      <Footer />
    </>
  );
};

export default ActionFigureList;
