import Image from "next/image";
import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const links = [
    { name: "Home", url: "/home" },
    { name: "Shop", url: "/shop" },
    { name: "Product", url: "/products" },
    { name: "Contact Us", url: "/contact-us" },
  ];
  return (
    <footer className="bg-[#141718] text-white p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and Brand Name */}
          <div className="flex items-center space-x-2 w-full">
            <Image
              src={"/assets/icons/Footer_Logo.svg"}
              alt="logo"
              width={100}
              height={100}
            />
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 flex-shrink-0 text-xs">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="hover:text-gray-400"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright and Legal Links */}
        <div className="border-t border-gray-700 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-xs">
            <span>Copyright © 2023 3legant. All rights reserved</span>
          </div>
          <div className="flex space-x-4 text-xs">
            <a href="/privacy-policy" className="hover:text-gray-400">
              Privacy Policy
            </a>
            <a href="/terms-of-use" className="hover:text-gray-400">
              Terms of Use
            </a>
          </div>

          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400 text-xl">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-gray-400 text-xl">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-gray-400 text-xl">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
