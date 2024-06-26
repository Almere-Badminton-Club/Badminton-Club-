import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/auth.context";

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="src/Images/logo.png"
            alt="logo"
            height="75vw"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/aboutUs">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/registration">
                Booking
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <span className="nav-link">Hi, {user.user.name}</span>
                </li>
                <li className="nav-item ms-2">
                  <button
                    className="btn btn-link nav-link"
                    onClick={logOutUser}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
            
            
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    SignUp
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
