import React, {useEffect} from 'react';
import Card from './components/Card';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './Products.css'

export default function Products() {
  
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user.uid);
      } else {
        navigate("/SignIn")
        console.log('User is signed out');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <h1 className="gelasio-featured-title">Featured Products</h1>
      <h2 className="featured-description">Check out our favorite products of the month.</h2>
      <Card />

    </>
  );
}