import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const cartItemCount = useSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Shopping Cart</h1>
      <div className="cart-count">
        <span className="mr-2">Cart Items: </span>
        <span className="font-bold">{cartItemCount}</span>
      </div>
    </header>
  );
};

export default Header;
