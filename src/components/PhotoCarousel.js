import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import photo1 from "../images/photo1.jpg";
import photo2 from "../images/photo2.jpg";
import photo3 from "../images/photo3.jpg";

import "./PhotoCarousel.css";

const useStyles = makeStyles(() => ({
  carouselContainer: {
    position: "relative",
    width: "100%",
    height: "300px",
    overflow: "hidden",
    borderRadius: "10px",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 1,
    transition: "opacity 0.5s ease",
  },
  hiddenImage: {
    opacity: 0,
  },
}));

const photos = [photo1, photo2, photo3];

const Carousel = () => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`${classes.carouselContainer} carousel-container`}>
      {photos.map((photo, index) => (
        <img
          key={index}
          className={`${classes.image} ${
            index === currentIndex ? "" : classes.hiddenImage
          }`}
          src={photo}
          alt=""
        />
      ))}
    </div>
  );
};

export default Carousel;
