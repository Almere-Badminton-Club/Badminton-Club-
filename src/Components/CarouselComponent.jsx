import React, { useState, useEffect } from "react";

const CarouselComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      src: "src/images/pexels-photo-2202685.jpeg", // Ensure the path is correct
      captionTitle: "JOIN US & PLAY",
      captionText: "Elevate Your Game",
    },
    {
      src: "src/images/image2.avif", // Ensure the path is correct
      captionTitle: "FOLLOW YOUR PASSION",
      captionText: "Badminton is fun for all ages!",
    },
    {
      src: "src/images/image3.avif", // Ensure the path is correct
      captionTitle: "RESERVE YOUR SPOT",
      captionText: "Enjoy! The Court Is Yours!",
    },
  ];

  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Change image every 3 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-full font-poppins overflow-hidden">
      <h1 className="absolute top-0 left-0 z-10 right-0 text-center text-white text-2xl sm:text-4xl font-bold bg-black bg-opacity-50 p-4">
        Welcome to Smashers Badminton Club
      </h1>
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full relative">
            <img
              src={slide.src}
              className="object-cover w-full h-[60vh] sm:h-[80vh]"
              alt={`Slide ${index + 1}`}
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center flex-col text-white bg-black bg-opacity-50 p-4">
              <h5 className="text-xl sm:text-3xl font-bold">
                {slide.captionTitle}
              </h5>
              <p className="text-sm sm:text-lg">{slide.captionText}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        className="absolute top-1/2 transform -translate-y-1/2 left-3 bg-transparent border-0 text-white text-xl sm:text-2xl leading-none font-semibold outline-none cursor-pointer"
        onClick={handlePrev}
      >
        <span aria-hidden="true">&lt;</span>
        <span className="sr-only">Previous</span>
      </button>

      <button
        className="absolute top-1/2 transform -translate-y-1/2 right-3 bg-transparent border-0 text-white text-xl sm:text-2xl leading-none font-semibold outline-none cursor-pointer"
        onClick={handleNext}
      >
        <span aria-hidden="true">&gt;</span>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

export default CarouselComponent;
