import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  applyExtraDiscount,
  applyFixedDiscount,
  removeItem,
  updateQuantity,
} from "../slices/cartSlice";
import "./CartPage.css"; // Import custom CSS for animations

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [couponCode, setCouponCode] = useState("");

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id) => {
    console.log(`Removing item with id: ${id}`); 
    const element = document.getElementById(`cart-item-${id}`);
    if (element) {
      element.classList.add('fade-out');
      setTimeout(() => {
        dispatch(removeItem(id));
      }, 300);
    }
  };

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateDiscount = (subtotal) => {
    const discountRate = 0.1; // 10% discount
    return (subtotal * discountRate).toFixed(2);
  };

  const calculateTotal = (subtotal, discount) => {
    return (subtotal - discount).toFixed(2);
  };

  const handleApplyCoupon = () => {
    const discount = 10; // Example fixed discount amount
    dispatch(applyFixedDiscount(discount));
  };

  const handleAdditionalDiscount = (discountType) => {
    const extraDiscount = discountType === "debit" ? 5 : 7; // Example additional discounts
    dispatch(applyExtraDiscount(extraDiscount));
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount(subtotal);
  const total = calculateTotal(subtotal, discount);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                id={`cart-item-${item.id}`}
                className="flex items-center border-b pb-4 mb-4 cart-item"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-700">${item.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="bg-gray-300 px-2 py-1 rounded-l"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      className="w-12 text-center border px-2 py-1"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
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
            <p className="text-lg mt-2">Subtotal: ${subtotal}</p>
            <p className="text-lg mt-2">Discount: -${discount}</p>
            <p className="text-lg mt-2 font-bold">Total: ${total}</p>
            <div className="mt-4">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="border px-2 py-1 mr-2"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Apply Coupon
              </button>
            </div>
            <div className="mt-4">
              <label className="block">
                <input
                  type="radio"
                  name="discount"
                  value="debit"
                  onClick={() => handleAdditionalDiscount("debit")}
                  className="mr-2"
                />
                Debit Card Discount
              </label>
              <label className="block mt-2">
                <input
                  type="radio"
                  name="discount"
                  value="credit"
                  onClick={() => handleAdditionalDiscount("credit")}
                  className="mr-2"
                />
                Credit Card Discount
              </label>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
