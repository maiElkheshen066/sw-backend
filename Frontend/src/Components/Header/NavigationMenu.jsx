import * as React from "react";

export function NavigationMenu() {
  const menuItems = [
    { text: "About Us", href: "#" },
    { text: "Menu", href: "/menu" },
    { text: "Blog", href: "#" },
    { text: "Order Online", href: "#" },
    { text: "Contact Us", href: "#" },
  ];

  return (
    <nav className="flex gap-12 items-start max-md:gap-8 max-md:hidden">
      {menuItems.map((item) => (
        <a
          key={item.text}
          href={item.href}
          className="text-xl text-center text-stone-300 hover:text-white transition-colors"
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}
