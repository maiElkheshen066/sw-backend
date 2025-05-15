import React from "react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa"; // Example icons
import Button from "../../Components/Main/Button"; // Updated Button import

export function AuthButton() {
  return (
    <div className="flex items-center gap-4 max-sm:gap-2">
      <Button
        text="Login"
        onClick={() => window.location.href = "/login"}
        icon={<FaSignInAlt />} // Passing an icon for the login button
        secondary={false} // Primary button style
      />
      <Button
        text="Register"
        onClick={() => window.location.href = "/register"}
        icon={<FaUserPlus />} // Passing an icon for the register button
        secondary={true} // Secondary button style
      />
    </div>
  );
}
