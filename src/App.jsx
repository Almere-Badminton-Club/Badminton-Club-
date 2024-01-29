import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Navbar from "./Components/Navbar";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
      </Routes>
    </>
  );
}

export default App;
