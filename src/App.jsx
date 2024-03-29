import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Navbar from "./Components/Navbar";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import Registration from "./Components/Registration";
import IsPrivate from "./Components/IsPrivate";
import IsAnon from "./Components/IsAnon";

function App() {

  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
          <Route path="/login" element={ <IsAnon> <LoginPage /> </IsAnon>  } />
          <Route path="/registration" element={<Registration/> } />  
        </Routes>
        
    </>
  );
}

export default App;
