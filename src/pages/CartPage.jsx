import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../slices/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center border-b pb-4 mb-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover mr-4" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-700">${item.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="bg-gray-300 px-2 py-1 rounded-l"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      className="w-12 text-center border px-2 py-1"
                    />
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="bg-gray-300 px-2 py-1 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h3 className="text-xl font-bold">Cart Summary</h3>
            <p className="text-lg mt-2">Subtotal: ${calculateSubtotal()}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
