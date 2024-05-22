import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import Products from './Products';
import Manager from './Manager.jsx';

const App = () => {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/manager" element={<Manager />} />
            </Routes>
    );
}

export default App;
