"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationMenu } from "./NavigationMenu";
import { AuthButton } from "./AuthButton";
import {UserButton} from "./UserButton";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check token on mount and update on navigation
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    checkAuth(); // Initial check
    window.addEventListener('storage', checkAuth); // Update on storage changes

    return () => {
      window.removeEventListener('storage', checkAuth); // Cleanup
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-60 backdrop-blur-md bg-black/30  flex items-center justify-between px-32 py-5 w-full bg-black h-[93px] max-md:px-10 max-md:py-5 max-sm:px-5 max-sm:py-5">
      <div className="flex gap-44 items-center max-md:gap-16 max-sm:gap-8 flex-wrap">
        <img
          src="src\assets\logo.png"
          className="object-contain w-32 h-[58px] c cursor-pointer"
          alt="Shah Ghouse Biryani Logo"
          onClick={() => window.location.href = "/"}
        />
        <NavigationMenu />
      </div>
{isAuthenticated ? <UserButton /> : <AuthButton />}
    </header>
  );
}

export default Header;
