import React, { createContext, useEffect, useState } from 'react';
import { db } from '../firebase-config.js';
import { collection, getDocs as firebaseGetDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

// Create the context
export const CartContext = createContext();

// Create a provider component
const CartProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    // Fetch products from Firestore
    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await firebaseGetDocs(collection(db, 'products'));
            const productList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productList);
        };

        fetchProducts();
    }, []);

    // Function to add a product
    const addProduct = async (product) => {
        const docRef = await addDoc(collection(db, 'products'), product);
        setProducts(prevProducts => [...prevProducts, { id: docRef.id, ...product }]);
    };

    // Function to get all products
    const getAllProducts = () => {
        return products;
    };

    // Function to delete a product by id
    const deleteProduct = async (id) => {
        await deleteDoc(doc(db, 'products', id));
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    };

    return (
        <CartContext.Provider value={{ addProduct, getAllProducts, deleteProduct }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
