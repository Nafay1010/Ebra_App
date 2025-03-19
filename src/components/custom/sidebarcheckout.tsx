"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect } from "react";

interface SidebarCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarCheckout = ({ isOpen, onClose }: SidebarCheckoutProps) => {
  if (!isOpen) return null;

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-0 bg-black/30 z-50">
      <div className="p-2 fixed right-0 top-0 h-full w-96 backdrop-blur-3xl bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">Cart</h2>

          <div className="space-y-5">
            {/* Item 1 */}
            <div className="border-b pb-4">
              <p className="font-semibold">Tray Table</p>
              <p className="text-gray-600">$19.19</p>
              <p className="text-sm text-gray-500">Color: Black</p>
              <div className="flex items-center mt-2">
                <button className="px-3 py-1 border border-gray-300 rounded">
                  -
                </button>
                <span className="px-4">2</span>
                <button className="px-3 py-1 border border-gray-300 rounded">
                  +
                </button>
              </div>
            </div>

            {/* Item 2 */}
            <div className="border-b pb-4">
              <p className="font-semibold">Tray Table</p>
              <p className="text-gray-600">$19.19</p>
              <p className="text-sm text-gray-500">Color: Red</p>
              <div className="flex items-center mt-2">
                <button className="px-3 py-1 border border-gray-300 rounded">
                  -
                </button>
                <span className="px-4">2</span>
                <button className="px-3 py-1 border border-gray-300 rounded">
                  +
                </button>
              </div>
            </div>

            {/* Item 3 */}
            <div className="border-b pb-4">
              <p className="font-semibold">Table Lamp</p>
              <p className="text-gray-600">$39.00</p>
              <p className="text-sm text-gray-500">Color: Gold</p>
              <div className="flex items-center mt-2">
                <button className="px-3 py-1 border border-gray-300 rounded">
                  -
                </button>
                <span className="px-4">2</span>
                <button className="px-3 py-1 border border-gray-300 rounded">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Subtotal and Total */}
        <div className="space-y-4 px-6 py-4 mt-auto">
          <div className="flex justify-between">
            <p className="text-gray-600">Subtotal</p>
            <p className="font-semibold">$99.00</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Total</p>
            <p className="font-semibold">$234.00</p>
          </div>
        </div>

        {/* Checkout Button */}
        <Button className="w-full py-5">Checkout</Button>

        {/* Close Button */}
        <button
          onClick={() => onClose()}
          className="absolute top-6 cursor-pointer right-4 text-gray-500 hover:text-gray-700"
        >
          <Image
            src="/assets/icons/close.svg"
            alt="close"
            width={25}
            height={25}
          />
        </button>
      </div>
    </div>
  );
};

export default SidebarCheckout;
