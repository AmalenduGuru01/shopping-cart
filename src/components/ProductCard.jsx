// src/components/ProductCard.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  return (
    <div className="border rounded-md p-4 shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-lg font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-4">${product.price}</p>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
