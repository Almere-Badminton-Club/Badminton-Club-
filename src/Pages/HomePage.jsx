import React from "react";
import BookingTable from "../Components/BookingTable";
import CarouselComponent from "../Components/CarouselComponent";
import MyMapComponent from "../Components/mapContainerStyle";
import "../Styles/mapContainerStyle.css";
import Footer from "../Components/Footer";

const HomePage = () => {
  return (
    <>
      <h1 className="color-change-title ">Welcome to Smashers Badminton Club</h1>
      <CarouselComponent />
      <div>
      <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Our Location</h3>
        <div className="map-container">
          <MyMapComponent />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
