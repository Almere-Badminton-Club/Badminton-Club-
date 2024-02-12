import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Navbar from "./Components/Navbar";
import { BookingProvider } from "./Context/BookingContext";
import SeatBooking from "./Components/SeatBooking";
import SignupPage from "./Pages/SignupPage";

function App() {

  return (
    <>
      <Navbar />
      <BookingProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />          
        </Routes>
        <SeatBooking />
      </BookingProvider>
    </>
  );
}

export default App;
