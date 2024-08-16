import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const cartItemCount = useSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">Shopping Cart</Link>
      </h1>
      <div className="cart-count">
        <Link to="/cart" className="font-bold">
          Cart Items: {cartItemCount}
        </Link>
      </div>
    </header>
  );
};

export default Header;
