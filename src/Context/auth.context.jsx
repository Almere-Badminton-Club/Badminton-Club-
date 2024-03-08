import React, {useState, useEffect} from "react";
import axios from "axios";


const AuthContext = React.createContext();

function AuthProviderWrapper(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token) => {
        localStorage.setItem("authToken", token);
    }

    const authenticateUser = () => {
        // Get the stored token from the localStorage
        const storedToken = localStorage.getItem("authToken");

        //If the token exists in the localStorage
        if (storedToken) {
            //We must send the JWT token in the request's "Authorization" Headers
            axios.get(
                `${import.meta.env.VITE_API_URL}/auth/verify`,
                {headers: {Authorization: `Bearer ${storedToken}`}}
            )
            .then ((response) => {
                // If the server verifies that JWT token is valid
                const user = response.data;
                //Update state variables
                setUser(user);
                setIsLoggedIn(true);
                setIsLoading(false);
                console.log(response.data);
            })
            .catch((error) => {
                // If the server sends an error response (invalid token)
                // update state variables
                setIsLoggedIn(false);
                setUser(null);
                setIsLoading(false);
            })
        } else {
            // If token is not available
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    }
     
    const removeToken = () => {
        //upon logout, remove the token from the localstorage
        localStorage.removeItem("authToken");
    }

    const logOutUser = () => {
        removeToken();
        authenticateUser();
    }

    useEffect(() => {
        // run the function after thr initial render,
        // after the components in the app render for the first time.
        authenticateUser();
    }, []);

  return (
    <AuthContext.Provider
    value={{
        isLoggedIn,
        isLoading, 
        user, 
        storeToken, 
        authenticateUser, 
        logOutUser }}>
        {props.children}
    </AuthContext.Provider>
  )
}
export {AuthProviderWrapper, AuthContext };