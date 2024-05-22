import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import './General.css'

export default function Home() {
    const navigate = useNavigate();

    function handleNavigate(e) {
        const value = e.target.value;
        if (value === 'products') {
            navigate('/products');
        } else if (value === 'manager') {
            navigate('/manager');
        }
    }

    return (
        <div className="container">
            <Button
                value="products"
                onClick={handleNavigate}
                variant="contained"
                color="primary"
            >
                מוצרים
            </Button>
            <Button
                value="manager"
                onClick={handleNavigate}
                variant="contained"
                color="primary"
            >
                ניהול מוצרים
            </Button>
        </div>
    );
}
