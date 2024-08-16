import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { applyCouponDiscount, clearCart } from "../slices/cartSlice";
import "./CheckOut.css"; 

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const couponDiscount = useSelector((state) => state.cart.couponDiscount);
  const [couponCode, setCouponCode] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [couponError, setCouponError] = useState("");

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTotal = (subtotal) => {
    const discountRate = 0.1; 
    const discount = subtotal * discountRate + couponDiscount;
    return (subtotal - discount).toFixed(2);
  };

  const handleApplyCoupon = () => {
    dispatch(applyCouponDiscount(couponCode));
  };

  useEffect(() => {
    if (couponCode && couponDiscount === 0) {
      setCouponError("Invalid Coupon Code");
    } else {
      setCouponError("");
    }
  }, [couponCode, couponDiscount]);

  const handlePaymentClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      alert("Payment process would start here...");
      dispatch(clearCart()); 
      setIsAnimating(false); 
    }, 600);
  };

  const subtotal = calculateSubtotal();
  const total = calculateTotal(subtotal);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout Summary</h2>
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="text-xl font-bold">Order Summary</h3>
        <p className="text-lg mt-2">Subtotal: ${subtotal}</p>
        <p className="text-lg mt-2">Coupon Discount: -${couponDiscount}</p>
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
          {couponError && (
            <p className="text-red-500 mt-2">{couponError}</p>
          )}
        </div>
        <button
          onClick={handlePaymentClick}
          className={`bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 ${
            isAnimating ? "payment-button-animation" : ""
          }`}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
