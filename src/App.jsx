import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Navbar from "./Components/Navbar";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import Registration from "./Components/Registration";
import IsPrivate from "./Components/IsPrivate";
import IsAnon from "./Components/IsAnon";
import BookingTable from "./Components/BookingTable";
import AboutUs from "./Pages/AboutUs";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
          <Route path="/login" element={ <IsAnon> <LoginPage /> </IsAnon>  } />
          <Route path="/registration" element={<IsPrivate><Registration/></IsPrivate> } /> 
          <Route path="/bookings" element={<BookingTable/>}/>
          <Route path="/aboutUs" element={<AboutUs />}/>
          <Route path="/cancel" element={<BookingTable/>}/>

        </Routes>
        
    </>
  );
}

export default App;
