import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/auth.context";

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="bg-gray-800 font-poppins">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* logo */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start cursor-pointer">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/">
                <img
                  className="h-9 w-auto"
                  src="src/Images/logo.png"
                  alt="logo"
                />
              </Link>
            </div>

            {/* web menu */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  className="rounded-md px-3 py-2 text-lg font-normal text-gray-400 no-underline"
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className="rounded-md px-3 py-2 text-lg font-normal text-gray-400 no-underline"
                  to="/aboutUs"
                >
                  About Us
                </Link>
                <Link
                  className="rounded-md px-3 py-2 text-lg font-normal text-gray-400 no-underline"
                  to="/registration"
                >
                  Booking
                </Link>
              </div>
            </div>
          </div>

          {/* Hamburger button */}
          <button
            type="button"
            className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <span className="sr-only">Open main menu</span>
            {showMobileMenu ? (
              <ion-icon name="close" size="large"></ion-icon>
            ) : (
              <ion-icon name="menu" size="large"></ion-icon>
            )}
          </button>

          {/* login */}
          <div className="hidden sm:flex items-center text-gray-300 space-x-4">
            {isLoggedIn ? (
              <div className="flex">
                <span className="nav-link">Hi, {user.user.name}</span>
                <button
                  className="btn btn-link nav-link px-3"
                  onClick={logOutUser}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/signup">
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              to="/"
              onClick={() => setShowMobileMenu(false)}
            >
              Home
            </Link>
            <Link
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              to="/aboutUs"
              onClick={() => setShowMobileMenu(false)}
            >
              About Us
            </Link>
            <Link
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              to="/registration"
              onClick={() => setShowMobileMenu(false)}
            >
              Booking
            </Link>
            {isLoggedIn ? (
              <div className="block px-3 py-2">
                <span className="block text-gray-400">
                  Hi, {user.user.name}
                </span>
                <button
                  className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  onClick={logOutUser}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  to="/login"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Login
                </Link>
                <Link
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  to="/signup"
                  onClick={() => setShowMobileMenu(false)}
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
