import React from "react";
import CarouselComponent from "../Components/CarouselComponent";
import MyMapComponent from "../Components/mapContainerStyle";
import "../Styles/mapContainerStyle.css";
import Footer from "../Components/Footer";

const HomePage = () => {
  return (
    
    <div className="min-h-screen bg-gray-100">
      <CarouselComponent />

      <h3 className="text-lg font-semibold text-center mt-8 mb-4">
        Our Location
      </h3>

      <div className="mb-16 relative flex justify-center">
        <MyMapComponent />
      </div>

      <Footer/>

      
      </div>
    
  );
};

export default HomePage;
