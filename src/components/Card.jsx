import React, { useState, useEffect } from "react";
import './Card.css';
import { db } from '../firebase-config';
import { collection, getDocs } from "firebase/firestore";

export default function Card() {

    const [listOfProducts, setListOfProducts] = useState([])

    useEffect(() => {
        const getProductsData = async function () {
            const getData = await getDocs(collection(db, 'products'))
            setListOfProducts(
                getData.docs.map((element) => ({
                    ...element.data(),
                }))
            )
        }
        getProductsData();
    }, [])

    return (
        <div className="card-container">
            {listOfProducts.map((product) => (
                <div className="card" key={product.name}>
                    <img src={product.url} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>From £{product.price}</p>
                    <p>{product.details}</p>
                </div>
            ))}
        </div>
    );
}
