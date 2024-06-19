import React from "react";
import BookingTable from "../Components/BookingTable";
import CarouselComponent from "../Components/CarouselComponent";
import MyMapComponent from "../Components/mapContainerStyle";
import "../Styles/mapContainerStyle.css";

const HomePage = () => {
  return (
    <>
      <h1 className="color-change-title ">Welcome to Smashers Connect Club</h1>
      <CarouselComponent />
      <div>
      <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Our Location</h3>
        <div className="map-container">
          <MyMapComponent />
        </div>
      </div>
      <BookingTable />
    </>
  );
};

export default HomePage;
