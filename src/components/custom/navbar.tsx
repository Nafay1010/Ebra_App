"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Percent } from "lucide-react"; // Lucide icons

export default function Navbar() {
  const [items, setItems] = useState(2); // Example cart items
  const [showBanner, setShowBanner] = useState(true); // Banner state
  const pathname = usePathname();

  const links = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    { name: "Product", url: "/products" },
    { name: "Contact Us", url: "/contact-us" },
  ];

  return (
    <div className="relative">
      {/* Banner Section */}
      {showBanner && (
        <div className="bg-gray-100 text-black text-sm flex items-center justify-between px-6 py-2 transition-all duration-300 relative w-full">
          <div className="flex items-center justify-center text-center mx-auto gap-2">
            <Image
              src={"/assets/icons/ticket-percent.svg"}
              alt="ticket-price"
              width={20}
              height={20}
            />
            <span>30% off storewide — Limited time!</span>

            <Link
              href="/products"
              className="text-blue-600  ml-2 group flex items-center"
            >
              Shop Now
              <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
                <Image
                  src="/assets/icons/arrow-right.svg"
                  alt="arrow-right"
                  width={18}
                  height={18}
                />
              </span>
            </Link>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="hover:opacity-70"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Navbar Section */}
      <nav className="flex justify-between items-center my-2 md:py-3 py-1.5 md:px-32 px-4">
        {/* Logo */}
        <Image
          src="/assets/icons/Logo.svg"
          alt="logo"
          width={100}
          height={100}
        />

        {/* Links */}
        <ul className="font-spaceGrotesk hidden md:flex space-x-6">
          {links.map((link) => (
            <li
              key={link.name}
              className={`${
                pathname === link.url ? "text-black" : "text-gray-400"
              } font-semibold cursor-pointer transition-all duration-300 hover:text-gray-800`}
            >
              <Link href={link.url}>{link.name}</Link>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Image
            src="/assets/icons/search.svg"
            alt="Search"
            width={20}
            height={20}
          />
          <Image
            src="/assets/icons/user-circle.svg"
            alt="User"
            width={20}
            height={20}
          />

          {/* Shopping Cart */}
          <div className="relative">
            <Image
              src="/assets/icons/shopping-bag.svg"
              alt="Cart"
              width={20}
              height={20}
            />
            {items > 0 && (
              <div className="absolute -top-2 -right-4 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {items}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
