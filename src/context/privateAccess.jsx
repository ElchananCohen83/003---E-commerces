import React, { useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const PrivateAccess = ({ children }) => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(null); // null indicates loading state

    useEffect(() => {
        // Set up the Firebase authentication listener
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true); // User is authenticated
            } else {
                setAuthenticated(false); // User is not authenticated
                navigate("/SignIn"); // Redirect to login page
            }
        });

        // Return a cleanup function to remove the listener on component unmount
        return () => unsubscribe(); // Properly remove the Firebase authentication listener
    }, [navigate]);

    if (authenticated === null) {
        // Show a loading indicator while authentication state is being determined
        return <div>Loading...</div>;
    }

    return authenticated ? children : null; // Render children if authenticated, otherwise null
};

export default PrivateAccess;
