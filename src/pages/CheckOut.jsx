import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { applyExtraDiscount, applyFixedDiscount } from "../slices/cartSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [couponCode, setCouponCode] = useState("");

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
      <h2 className="text-2xl font-bold mb-6">Checkout Summary</h2>
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="text-xl font-bold">Order Summary</h3>
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
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
