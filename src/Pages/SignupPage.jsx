import React, { useState } from "react";
import axios from "axios";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5005/api/signup",formData
      );
      console.log("Signup successful:", response.data);
    } catch (error) {
      console.error("Signup failed:", error.response.data);
    }
  };
  return (
    

    <form
      onSubmit={handleSignup}
      className="vh-100"
    >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-9">

            <div className="card" >
              <div className="card-body">
                <div className="row align-items-center pt-4 pb-3">
                  <div className="col-md-3 ps-5">
                    <h6 className="mb-0">Full name</h6>
                  </div>
                  <div className="col-md-9 pe-5">
                    <input
                      type="text"
                      name="username"
                      onChange={handleInputChange}
                      className="form-control form-control-lg"
                    />
                  </div>
                </div>

                <hr className="mx-n3" />

                <div className="row align-items-center py-3">
                  <div className="col-md-3 ps-5">
                    <h6 className="mb-0">Email address</h6>
                  </div>
                  <div className="col-md-9 pe-5">
                    <input
                      type="email"
                      name="email"
                      onChange={handleInputChange}
                      className="form-control form-control-lg"
                      placeholder="example@example.com"
                    />
                  </div>
                </div>

                <hr className="mx-n3" />

                <div className="row align-items-center py-3">
                  <div className="col-md-3 ps-5">
                    <h6 className="mb-0">Password</h6>
                  </div>
                  <div className="col-md-9 pe-5">
                    <input
                      type="password"
                      name="password"
                      onChange={handleInputChange}
                      className="form-control form-control-lg"
                      placeholder="example@example.com"
                    />
                  </div>
                </div>

        

               


                <div className="px-5 py-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    SignUp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default SignupForm;