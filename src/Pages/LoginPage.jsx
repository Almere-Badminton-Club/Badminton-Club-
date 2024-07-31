import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";

const LoginPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription =
          error.response.data.message || "An error occurred";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <section className="text-center lg:text-left flex justify-center items-center min-h-screen bg-gray-100">
      <div className="shadow-md rounded-lg flex flex-col lg:flex-row w-full max-w-4xl">
        <div className="hidden lg:block lg:w-1/3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBiXPhu3OFLbseL3o4FEPyi0HxiRhyldbj9g&usqp=CAU"
            alt="job search image"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>
        <div className="lg:w-2/3 p-6 lg:p-12">
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Login
            </button>

            {errorMessage && (
              <p className="text-red-500 mt-4">{errorMessage}</p>
            )}

            <p className="text-center text-gray-600 mt-6">
              Already registered?{" "}
              <a href="/signup" className="text-indigo-600 hover:underline">
                Signup here
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
