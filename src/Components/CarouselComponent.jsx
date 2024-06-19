import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../Styles/CarouselComponent.css';

const CarouselComponent = () => {
  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="src/Images/image1.avif" className="d-block w-100" alt="First Slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>JOIN US & PLAY</h5>
            <p>Elevate Your Game</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="src/Images/image2.avif" className="d-block w-100" alt="Second Slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>FOLLOW YOUR PASSION</h5>
            <p>Badminton is fun for all ages!</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="src/Images/image3.avif" className="d-block w-100" alt="Third Slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>RESERVE YOUR SPOT</h5>
            <p>Enjoy! The Court Is Yours! </p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CarouselComponent;
