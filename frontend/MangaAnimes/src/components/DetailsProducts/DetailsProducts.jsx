/*import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllMangas } from "../../reduces/mangaReduces";
import {
  isMangaLoading,
  allMangas,
  errorManga,
} from "../../reduces/mangaReduces";

const DetailsProducts = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();

  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  useEffect(() => {
    dispatch(getAllMangas());
  }, [dispatch]);

  // Trova il manga con l'ID corrispondente
  const manga = mangas.find((manga) => manga._id === _id);

  if (isLoading) return <div>Caricamento...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      {manga ? (
        <div className="row">
          <div className="col-md-6">
            <img
              src={manga.file?.url || "https://via.placeholder.com/150"}
              alt={manga.name}
              className="w-100"
            />
          </div>
          <div className="col-md-6">
            <h2>{manga.name}</h2>
            <p>{manga.description}</p>
            <p>€{manga.price}</p>
            <p>
              Disponibilità:{" "}
              {manga.availability > 0 ? "Disponibile" : "Esaurito"}
            </p>
          </div>
        </div>
      ) : (
        <p>Manga non trovato.</p>
      )}
    </div>
  );
};

export default DetailsProducts;
*/
/*
// src/pages/DetailsProducts.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllMangas } from "../../reduces/mangaReduces";
import {
  isMangaLoading,
  allMangas,
  errorManga,
} from "../../reduces/mangaReduces";
import ProductDescription from "../Context/ProductDescription"; // Import del nuovo componente

const DetailsProducts = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();

  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  useEffect(() => {
    dispatch(getAllMangas());
  }, [dispatch]);

  // Trova il manga con l'ID corrispondente
  const manga = mangas.find((manga) => manga._id === _id);

  if (isLoading) return <div>Caricamento...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      {manga ? (
        <div className="row">
          <div className="col-md-6">
            <img
              src={manga.file?.url || "https://via.placeholder.com/150"}
              alt={manga.name}
              className="w-100"
            />
          </div>
          <div className="col-md-6">
            <h2>{manga.name}</h2>
            <p>€{manga.price}</p>
            <p>
              Disponibilità:{" "}
              {manga.availability > 0 ? "Disponibile" : "Esaurito"}
            </p>
          </div>
        </div>
      ) : (
        <p>Manga non trovato.</p>
      )}

     
      {manga && <ProductDescription description={manga.description} />}
    </div>
  );
};

export default DetailsProducts;
*/
/*
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllMangas } from "../../reduces/mangaReduces";
import {
  isMangaLoading,
  allMangas,
  errorManga,
} from "../../reduces/mangaReduces";
import ProductDescription from "../Context/ProductDescription"; // Import del nuovo componente
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts"; // Import del nuovo componente

const DetailsProducts = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();

  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  useEffect(() => {
    dispatch(getAllMangas());
  }, [dispatch]);

  // Trova il manga con l'ID corrispondente
  const manga = mangas.find((manga) => manga._id === _id);

  if (isLoading) return <div>Caricamento...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      {manga ? (
        <div className="row">
          <div className="col-md-6">
            <img
              src={manga.file?.url || "https://via.placeholder.com/150"}
              alt={manga.name}
              className="w-100"
            />
          </div>
          <div className="col-md-6">
            <h2>{manga.name}</h2>
            <p>€{manga.price}</p>
            <p>
              Disponibilità:{" "}
              {manga.availability > 0 ? "Disponibile" : "Esaurito"}
            </p>
          </div>
        </div>
      ) : (
        <p>Manga non trovato.</p>
      )}

      {manga && <ProductDescription description={manga.description} />}

      {manga && <RelatedProducts category={manga.category} />}
    </div>
  );
};

export default DetailsProducts;
*/
/*
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllMangas } from "../../reduces/mangaReduces";
import {
  isMangaLoading,
  allMangas,
  errorManga,
} from "../../reduces/mangaReduces";
import ProductDescription from "../Context/ProductDescription";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import ProductComments from "../../components/ProductComments/ProductComments"; // Import del nuovo componente

const DetailsProducts = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();

  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  useEffect(() => {
    dispatch(getAllMangas());
  }, [dispatch]);

  const manga = mangas.find((manga) => manga._id === _id);

  if (isLoading) return <div>Caricamento...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      {manga ? (
        <div className="row">
          <div className="col-md-6">
            <img
              src={manga.file?.url || "https://via.placeholder.com/150"}
              alt={manga.name}
              className="w-100"
            />
          </div>
          <div className="col-md-6">
            <h2>{manga.name}</h2>
            <p>€{manga.price}</p>
            <p>
              Disponibilità:{" "}
              {manga.availability > 0 ? "Disponibile" : "Esaurito"}
            </p>
          </div>
        </div>
      ) : (
        <p>Manga non trovato.</p>
      )}
      {manga && <ProductDescription description={manga.description} />}
      {manga && <RelatedProducts category={manga.category} />}
      {manga && <ProductComments productId={manga._id} userRole="user" />}{" "}
   
    </div>
  );
};

export default DetailsProducts;
*/
/*
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllMangas } from "../../reduces/mangaReduces";
import {
  isMangaLoading,
  allMangas,
  errorManga,
} from "../../reduces/mangaReduces";
import ProductDescription from "../Context/ProductDescription";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import ProductComments from "../../components/ProductComments/ProductComments"; // Import del nuovo componente

const DetailsProducts = () => {
  const { _id, productType } = useParams(); // Ottieni _id e productType dinamicamente
  const dispatch = useDispatch();

  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  useEffect(() => {
    if (productType === "manga") {
      dispatch(getAllMangas());
    }
    // Puoi aggiungere altre logiche per gestire altri tipi di prodotti
  }, [dispatch, productType]);

  const product = mangas.find((manga) => manga._id === _id); // Cerca il prodotto corrente

  if (isLoading) return <div>Caricamento...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      {product ? (
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.file?.url || "https://via.placeholder.com/150"}
              alt={product.name}
              className="w-100"
            />
          </div>
          <div className="col-md-6">
            <h2>{product.name}</h2>
            <p>€{product.price}</p>
            <p>
              Disponibilità:{" "}
              {product.availability > 0 ? "Disponibile" : "Esaurito"}
            </p>
          </div>
        </div>
      ) : (
        <p>Prodotto non trovato.</p>
      )}
      {product && <ProductDescription description={product.description} />}
      {product && <RelatedProducts category={product.category} />}
      {product && (
        <ProductComments
          productId={product._id}
          productType={productType} // Passa il tipo di prodotto dinamicamente
          userRole="user"
        />
      )}
    </div>
  );
};

export default DetailsProducts;
*/

/*
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllMangas } from "../../reduces/mangaReduces";
import {
  isMangaLoading,
  allMangas,
  errorManga,
} from "../../reduces/mangaReduces";
import ProductDescription from "../Context/ProductDescription";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import ProductComments from "../../components/ProductComments/ProductComments"; // Import del nuovo componente

const DetailsProducts = () => {
  // Recupero i parametri URL
  const { _id, productType } = useParams();
  console.log("_id:", _id);
  console.log("productType:", productType);
  // Debugging: aggiungi un log per verificare i parametri passati nell'URL
  console.log("_id:", _id);
  console.log("productType:", productType);

  const dispatch = useDispatch();

  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  // Effetto per caricare i prodotti in base al tipo
  useEffect(() => {
    if (productType === "manga") {
      dispatch(getAllMangas());
    }
    // Puoi aggiungere altre logiche per gestire altri tipi di prodotti
  }, [dispatch, productType]);

  // Cerca il prodotto corrente nella lista
  const product = mangas.find((manga) => manga._id === _id);

  // Mostra uno stato di caricamento o errore
  if (isLoading) return <div>Caricamento...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      {product ? (
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.file?.url || "https://via.placeholder.com/150"}
              alt={product.name}
              className="w-100"
            />
          </div>
          <div className="col-md-6">
            <h2>{product.name}</h2>
            <p>€{product.price}</p>
            <p>
              Disponibilità:{" "}
              {product.availability > 0 ? "Disponibile" : "Esaurito"}
            </p>
          </div>
        </div>
      ) : (
        <p>Prodotto non trovato.</p>
      )}

     
      {product && (
        <>
          <ProductDescription description={product.description} />
          <RelatedProducts category={product.category} />
          <ProductComments
            productId={product._id}
            productType={productType} // Passa il tipo di prodotto dinamicamente
            userRole="user"
          />
        </>
      )}
    </div>
  );
};

export default DetailsProducts;
*/
/*
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllMangas } from "../../reduces/mangaReduces";
import {
  isMangaLoading,
  allMangas,
  errorManga,
} from "../../reduces/mangaReduces";
import ProductDescription from "../Context/ProductDescription";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import ProductComments from "../../components/ProductComments/ProductComments"; // Import del nuovo componente

const DetailsProducts = () => {
  // Recupero i parametri URL
  const { _id, productType } = useParams();
  console.log("_id:", _id);
  console.log("productType:", productType);

  const dispatch = useDispatch();

  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  // Effetto per caricare i prodotti in base al tipo
  useEffect(() => {
    if (productType === "manga") {
      dispatch(getAllMangas());
    }
    // Puoi aggiungere altre logiche per gestire altri tipi di prodotti
  }, [dispatch, productType]);

  // Cerca il prodotto corrente nella lista
  const product = mangas.find((manga) => manga._id === _id);

  // Mostra uno stato di caricamento o errore
  if (isLoading) return <div>Caricamento...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      {product ? (
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.file?.url || "https://via.placeholder.com/150"}
              alt={product.name}
              className="w-100"
            />
          </div>
          <div className="col-md-6">
            <h2>{product.name}</h2>
            <p>€{product.price}</p>
            <p>
              Disponibilità:{" "}
              {product.availability > 0 ? "Disponibile" : "Esaurito"}
            </p>

          
            <p>Autore: {product.author}</p>
            <p>Editore: {product.publisher}</p>
            <p>Categoria: {product.category}</p>
            <p>Generi: {product.genres.join(", ")}</p>
            <p>Lingua: {product.language}</p>
            <p>
              Data di rilascio:{" "}
              {new Date(product.releaseDate).toLocaleDateString()}
            </p>

         
            <p>Negozio: {product.shopName}</p>
          </div>
        </div>
      ) : (
        <p>Prodotto non trovato.</p>
      )}

      {product && (
        <>
          <ProductDescription description={product.description} />
          <RelatedProducts category={product.category} />
          <ProductComments
            productId={product._id}
            productType={productType} // Passa il tipo di prodotto dinamicamente
            userRole="user"
          />
        </>
      )}
    </div>
  );
};

export default DetailsProducts;
*/

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllMangas } from "../../reduces/mangaReduces";
import {
  isMangaLoading,
  allMangas,
  errorManga,
} from "../../reduces/mangaReduces";
import ProductDescription from "../Context/ProductDescription";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import ProductComments from "../../components/ProductComments/ProductComments";

const DetailsProducts = () => {
  const { _id, productType } = useParams();
  const dispatch = useDispatch();
  const mangas = useSelector(allMangas);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  useEffect(() => {
    if (productType === "manga") {
      dispatch(getAllMangas());
    }
  }, [dispatch, productType]);

  const product = mangas.find((manga) => manga._id === _id);

  if (isLoading) return <div>Caricamento...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      {product ? (
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.file?.url || "https://via.placeholder.com/150"}
              alt={product.name}
              className="w-100"
            />
          </div>
          <div className="col-md-6">
            <h2>{product.name}</h2>
            <p>€{product.price}</p>
            <p>
              Disponibilità:{" "}
              {product.availability > 0 ? "Disponibile" : "Esaurito"}
            </p>
          </div>
        </div>
      ) : (
        <p>Prodotto non trovato.</p>
      )}

      {product && (
        <>
          <ProductDescription description={product.description} />
          <RelatedProducts category={product.category} />
          <ProductComments
            productId={product._id}
            productType={productType}
            userRole="user"
          />
        </>
      )}
    </div>
  );
};

export default DetailsProducts;
