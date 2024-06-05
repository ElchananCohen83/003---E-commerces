import React, { useContext } from 'react';
import { CartContext } from '../context/CartContextProducts.jsx';
import './Card.css'

const ProductList = () => {
    const {getAllProducts, deleteProduct } = useContext(CartContext);
    const products = getAllProducts();

    const handleDelete = (id) => {
        deleteProduct(id);
    };

    return (
        <div className="card-container">
            {products.map((product) => (
                <div className="card" key={product.id}>
                    <img src={product.url} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>From £{product.price}</p>
                    <div>
                        <p>{product.details}</p>
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;