import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Navbar from "./Components/Navbar";
import { BookingProvider } from "./Context/BookingContext";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import Registration from "./Components/Registration";

function App() {

  return (
    <>
      <Navbar />
      <BookingProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />  
          <Route path="/login" element={<LoginPage />} />  
          <Route path="/registration" element={<Registration />} />  


        </Routes>
        
      </BookingProvider>
    </>
  );
}

export default App;
