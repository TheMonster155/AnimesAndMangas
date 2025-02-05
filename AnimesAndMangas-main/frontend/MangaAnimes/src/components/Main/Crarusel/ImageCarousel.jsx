import React from "react";
import { Carousel } from "react-bootstrap";

const ImageCarousel = ({ handleImageClick }) => {
  const carouselImages = [
    {
      src: "https://res.cloudinary.com/dzdxelv4m/image/upload/v1733498409/Mangas/227339.jpg",
    },
    {
      src: "https://res.cloudinary.com/dzdxelv4m/image/upload/v1734067067/33244_yeorfi.jpg",
    },
    {
      src: "https://res.cloudinary.com/dzdxelv4m/image/upload/v1734076610/ninja-7701126_1920_moyfsa.jpg",
    },
  ];

  return (
    <Carousel className="carousel-large">
      {carouselImages.map((image, index) => (
        <Carousel.Item key={index}>
          <div className="d-flex justify-content-center position-relative">
            <img
              src={image.src}
              alt={`carousel-image-${index + 1}`}
              style={{ pointerEvents: "none" }}
            />
            {index === 1 && (
              <div className="carousel-text text-start position-absolute top-0 start-0 opacity-100">
                Benvenuti in MangasAndAnimes
              </div>
            )}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
