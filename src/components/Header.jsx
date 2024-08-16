import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const cartItemCount = useSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-yellow-500 transition-colors duration-300">
          Shopping Cart
        </Link>
        <nav className="flex space-x-6">
          <Link 
            to="/" 
            className="hover:text-yellow-500 transition-colors duration-300">
            Products
          </Link>
          <Link 
            to="/cart" 
            className="relative hover:text-yellow-500 transition-colors duration-300">
            Cart 
            <span className="ml-1 bg-red-600 text-white rounded-full px-2 py-1 text-xs font-bold">
              {cartItemCount}
            </span>
          </Link>
          <Link 
            to="/checkout" 
            className="hover:text-yellow-500 transition-colors duration-300">
            Checkout
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
