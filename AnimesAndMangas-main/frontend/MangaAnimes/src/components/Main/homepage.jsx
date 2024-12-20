import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartContext } from "../Context/CartContext";
import { getAllMangas } from "../../reduces/mangaReduces";
import {
  isMangaLoading,
  allMangas,
  errorManga,
  selectFigures,
  mangaTitles,
  isLoadingTitles,
  errorTitles,
} from "../../reduces/mangaReduces";
import UltimeUscite from "./Crarusel/UltimeUscite";
import CaroselloManga from "./Crarusel/CaroselloManga";
import CaroselloFigure from "./Crarusel/CaroselloFigure";
import ImageCarousel from "./Crarusel/ImageCarousel";

import "./homepage.css";
import Swal from "sweetalert2";

const HomePage = () => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mangas = useSelector(allMangas);
  const figures = useSelector(selectFigures);
  const isLoading = useSelector(isMangaLoading);
  const error = useSelector(errorManga);

  useEffect(() => {
    dispatch(getAllMangas());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    addToCart(product);
    Swal.fire({
      title: "Aggiuto al Carrello",
      text: `${product.name} E stato aggiugto al carello`,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const handleDetailsProducts = (_id, type) => {
    const path =
      type === "actionFigure"
        ? `/details/Figure/${_id}`
        : `/details/manga/${_id}`;
    navigate(path);
  };

  return (
    <div>
      <div className="text-center mt-5">
        <ImageCarousel handleImageClick={handleDetailsProducts} />
      </div>

      <CaroselloManga
        mangas={mangas}
        handleAddToCart={handleAddToCart}
        handleDetailsProducts={handleDetailsProducts}
      />
      <CaroselloFigure
        figures={figures}
        handleAddToCart={handleAddToCart}
        handleDetailsProducts={handleDetailsProducts}
      />
    </div>
  );
};

export default HomePage;
