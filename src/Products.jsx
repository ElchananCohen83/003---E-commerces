import React, { useState } from 'react';
import Card from './components/Card';
import './Products.css'

export default function Products() {

  return (
    <>
      <h1 className="gelasio-featured-title">Featured Products</h1>
      <h2 className="featured-description">Check out our favorite products of the month.</h2>
      <Card />

    </>
  );
}