import React, { useState } from 'react';
import { db } from './firebase-config';
import { collection, addDoc } from "firebase/firestore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import './General.css';

export default function Manager() {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDetails, setProductDetails] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [data, setData] = useState([]);

    async function addData() {
        try {
            const docRef = await addDoc(collection(db, "products"), {
                name: productName,
                price: productPrice,
                details: productDetails,
                url: imgUrl
            });
            console.log("Document written with ID: ", docRef.id);

            // Update the state to include the new product
            setData([...data, { id: docRef.id, name: productName, price: productPrice, details: productDetails, url: imgUrl }]);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className="container">
            <h1>הוספת מוצר</h1>
            <TextField 
                className='TextField' 
                label="Product Name" 
                variant="outlined" 
                onChange={(e) => setProductName(e.target.value)} 
                margin="normal"
            />
            <TextField 
                className='TextField' 
                label="Product Price" 
                variant="outlined" 
                onChange={(e) => setProductPrice(e.target.value)} 
                margin="normal"
            />
            <TextField 
                className='TextField' 
                label="Product Details" 
                variant="outlined" 
                onChange={(e) => setProductDetails(e.target.value)} 
                margin="normal"
            />
            <TextField 
                className='TextField' 
                label="Image URL" 
                variant="outlined" 
                onChange={(e) => setImgUrl(e.target.value)} 
                margin="normal"
            />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={addData}
                style={{ marginTop: '20px' }}
            >
                Add Data
            </Button>
        </div>
    );
}
