import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  const cartItemCount = useSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <header className="bg-gray-900 p-4 text-white flex justify-between items-center shadow-lg fixed top-0 w-full z-50 transition duration-500 ease-in-out">
      <h1 className="text-2xl font-semibold flex items-center">
        <Link
          to="/"
          className="flex items-center hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <FaShoppingCart className="mr-2 text-gray-400 hover:text-gray-100 transition-colors duration-300" />
          <span className="tracking-wide">ShopCart</span>
        </Link>
      </h1>
      <div className="cart-count flex items-center">
        <Link
          to="/cart"
          className="flex items-center text-lg hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <FaShoppingCart className="mr-2 text-gray-400 hover:text-gray-100 transition-colors duration-300" />
          <span className="ml-1 bg-gray-800 text-white px-3 py-1 rounded-full text-sm shadow-lg">
            {cartItemCount}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
