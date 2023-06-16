import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import photo1 from "../images/photo1.jpg";
import photo2 from "../images/photo2.jpg";
import photo3 from "../images/photo3.jpg";

import "./PhotoCarousel.css";

const useStyles = makeStyles(() => ({
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px",
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
    <div className="carousel">
      <img
        className={classes.image}
        src={photos[currentIndex]}
        alt={`Photo ${currentIndex + 1}`}
      />
    </div>
  );
};

export default Carousel;
