import React, { useState, useEffect } from "react";
import bgImg from "../assets/Images/bg.png";
import { CreditCardPayment } from "../strategies/creditCardPayment";
import { PayPalPayment } from "../strategies/paypalPayment";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const paymentStrategies = {
  creditCard: CreditCardPayment,
  paypal: PayPalPayment,
};

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [selectedMethod, setSelectedMethod] = useState("creditCard");
  const SelectedPaymentComponent = paymentStrategies[selectedMethod];

  // State for order details
  const [order, setOrder] = useState({
    items: cartItems,
    delivery: 5.99,
    discount: 2.0,
    total: 0,
  });

  // Calculate total price when cartItems, delivery, or discount change
  useEffect(() => {
    const total =
      cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
      order.delivery -
      order.discount;
    setOrder((prev) => ({ ...prev, total, items: cartItems }));
  }, [cartItems, order.delivery, order.discount]);

  // Handle payment submission
  const handlePayment = () => {
    console.log(`Processing payment with ${selectedMethod}`);
    alert(`Payment processed using ${selectedMethod}`);
  };

  return (
    <div
      className="min-h-screen p-4 bg-gray-100 flex flex-col items-center pt-[6rem]"
      style={{
        backgroundImage: bgImg ? `url(${bgImg})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <style>
        {`
          .cart-btn {
            padding: 0.5rem 0.75rem;
            border-radius: 0.375rem;
            font-weight: 500;
            transition: background 0.2s, color 0.2s;
            border: none;
            outline: none;
            font-size: 1rem;
            line-height: 1;
            margin: 0 0.25rem;
            cursor: pointer;
          }
          .cart-btn--inc, .cart-btn--dec {
            background: #000;
            color: #fff;
          }
          .cart-btn--inc:hover, .cart-btn--dec:hover {
            background: #222;
          }
          .cart-btn--remove {
            background: #ef4444;
            color: #fff;
          }
          .cart-btn--remove:hover {
            background: #dc2626;
          }
        `}
      </style>
      <div
        className="w-full max-w-4xl rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
        style={{
          background:
            "linear-gradient(90deg, rgb(22,66,60), rgb(45,100,94), rgb(38,84,78), rgb(51,108,101))",
        }}
      >
        {/* Order Summary Section */}
        <div className="space-y-4 bg-gray-50 p-4 rounded">
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id || item._id} className="flex justify-between items-center">
                <div>
                  <p className="text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id || item._id, -1)}
                    className="cart-btn cart-btn--dec"
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id || item._id, 1)}
                    className="cart-btn cart-btn--inc"
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id || item._id)}
                    className="cart-btn cart-btn--remove"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )}
          <Link
            to="/menu"
            className="mt-4 inline-block bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Back to Menu
          </Link>
        </div>

        {/* Payment Section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Payment Information
            </h2>
            <label htmlFor="payment-method" className="text-gray-800">
              Payment Method
            </label>
            <select
              id="payment-method"
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="p-2 border rounded w-full"
              aria-label="Select payment method"
            >
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          {/* Render the selected payment component */}
          <div className="space-y-2">
            <SelectedPaymentComponent />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white-800">
              Order Summary
            </h2>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <p key={item.id || item._id}>
                  {item.name}: ${(item.price * item.quantity).toFixed(2)}
                </p>
              ))}
              <p>Delivery: ${order.delivery.toFixed(2)}</p>
              <p>Discount: -${order.discount.toFixed(2)}</p>
              <p className="font-semibold">
                Total Price: ${order.total.toFixed(2)}
              </p>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            aria-label="Submit Payment"
            disabled={cartItems.length === 0}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;