import React from "react";

export const PayPalPayment = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">PayPal Payment</h3>
      <p className="text-gray-600">
        Click the button below to log in to PayPal and complete your payment.
      </p>
      <button
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
        aria-label="Log in to PayPal"
      >
        Log in to PayPal
      </button>
    </div>
  );
};