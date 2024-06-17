import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const userData = response.data;
          setUser(userData);
          const userId = userData ? userData._id : null;
          setUserId(userId); // Add null check for userData
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setUser(null);
          setUserId(null);
          setIsLoading(false);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      setUserId(null);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  useEffect(() => {
    if (user) {
      setUserId(user._id); // Set userId when user data is available
    } else {
      setUserId(null);
    }
  }, [user]); // Listen for changes in the user state

  useEffect(() => {
    console.log("User id:", {user});
  }, [userId]);

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        userId,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
