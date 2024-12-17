import React from "react";
import { Carousel } from "react-bootstrap";

const ImageCarousel = ({ handleImageClick }) => {
  const carouselImages = [
    {
      src: "https://res-console.cloudinary.com/dzdxelv4m/thumbnails/v1/image/upload/v1733498409/TWFuZ2FzLzIyNzMzOQ==/preview",
    },
    {
      src: "https://res-console.cloudinary.com/dzdxelv4m/thumbnails/v1/image/upload/v1734067067/MzMyNDRfeWVvcmZp/drilldown",
    },
    {
      src: "https://res-console.cloudinary.com/dzdxelv4m/thumbnails/v1/image/upload/v1734076610/bmluamEtNzcwMTEyNl8xOTIwX21veWZzYQ==/drilldown",
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
              onClick={() => handleImageClick(image.src, "image")}
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
