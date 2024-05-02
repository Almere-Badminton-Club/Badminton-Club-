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

   /*  UPDATE - get authenticateUser from the context */
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

        // Save the token in the localStorage.      
        storeToken(response.data.authToken);

        // Verify the token by sending a request 
        // to the server's JWT validation endpoint. 2345
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message || "An error occurred";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <section className="text-center text-lg-start">
      <div className="card mb-3">
        <div className="row g-0 d-flex align-items-center">
          <div className="col-lg-4 d-none d-lg-flex">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBiXPhu3OFLbseL3o4FEPyi0HxiRhyldbj9g&usqp=CAU"
              alt="job search image"
              className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
            />
          </div>
          <div className="col-lg-8">
            <div className="card-body py-5 px-md-5">
              <form onSubmit={handleLoginSubmit}>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    id="form2Example1"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <label className="form-label" htmlFor="form2Example1">
                    Email:
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    id="form2Example2"
                    className="form-control"
                    placeholder="Enter your password"
                  />
                  <label className="form-label" htmlFor="form2Example2">
                    Password
                  </label>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4">
                  Login
                </button>

                {errorMessage && <p className="text-danger">{errorMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
