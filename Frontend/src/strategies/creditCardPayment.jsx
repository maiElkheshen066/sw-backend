import React from "react";

export const CreditCardPayment = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Credit Card Details</h3>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Card Number"
          className="w-full p-2 border rounded"
          aria-label="Card Number"
        />
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="MM/YY"
            className="w-1/2 p-2 border rounded"
            aria-label="Expiration Date"
          />
          <input
            type="text"
            placeholder="CVV"
            className="w-1/2 p-2 border rounded"
            aria-label="CVV"
          />
        </div>
        <input
          type="text"
          placeholder="Cardholder Name"
          className="w-full p-2 border rounded"
          aria-label="Cardholder Name"
        />
      </div>
    </div>
  );
};