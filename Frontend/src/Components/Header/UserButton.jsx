// components/UserButton.jsx
import React from "react";
import { FaUser, FaShoppingCart } from "react-icons/fa"; // Icons for Profile and Cart
import Button from "../Main/Button"; // Adjust path to your Button component

export function UserButton() {
  return (
    <div className="flex items-center gap-4 max-sm:gap-2">
          <Button
        text="Cart"
        onClick={() => (window.location.href = "/cart")}
        icon={<FaShoppingCart />} // Icon for Cart
        secondary={true} // Secondary button style
      /> 
       <Button
        text="Profile"
        onClick={() => (window.location.href = "/profile")}
        icon={<FaUser />} // Icon for Profile
        secondary={false} // Primary button style
      />

    </div>
  );
}