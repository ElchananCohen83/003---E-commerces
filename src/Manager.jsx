import React, { useState, useContext } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { CartContext } from './context/CartContextProducts.jsx';

import './General.css';

export default function Manager() {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productDetails, setProductDetails] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [message, setMessage] = useState("");

    const { addProduct } = useContext(CartContext);

    async function addData() {
        setMessage("");

        if (!productName || !productPrice || !productDetails || !imgUrl) {
            console.error("Please fill in all fields");
            setMessage("בבקשה למלא את כל השדות");
            hideError();
            return;
        }

        if (isNaN(productPrice) || parseFloat(productPrice) <= 0) {
            console.error("Please enter a valid price");
            setMessage("יש להזין מספרים בלבד");
            hideError();
            return;
        }

        try {
            await addProduct({
                name: productName,
                price: parseFloat(productPrice), // Ensure price is a number
                details: productDetails,
                url: imgUrl
            });
            setMessage("המוצר נקלט בהצלחה");
            hideError();
        } catch (e) {
            console.error("Error adding product: ", e);
            setMessage("שגיאה בהוספת המוצר");
            hideError();
        }
    }

    function hideError() {
        setTimeout(() => {
            setMessage("");
        }, 2000);
    }

    return (
        <div className="container">
            <h1>הוספת מוצר</h1>
            {message && <p style={{ color: 'red' }}>{message}</p>}
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
