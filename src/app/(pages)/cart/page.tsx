"use client";
import { useState } from "react";
import { useProducts } from "@/app/context/ProductContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import Image from "next/image";

interface CartItem {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const { cart, totalPrice, updateQuantity, removeFromCart } = useProducts();
  const shippingOptions = [
    { label: "Free shipping", value: 0 },
    { label: "Express shipping", value: 15 },
    { label: "Pick Up", value: 21 },
  ];
  const [shipping, setShipping] = useState(0);
  const total = totalPrice + shipping;

  return (
    <div className="mx-auto py-6">
      <h1 className="text-4xl font-normal font-poppins mb-6 text-center">
        Cart
      </h1>
      <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 place-content-center gap-10">
        <div className="xl:col-span-2 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">No items in cart</p>
          ) : (
            <div>
              <div className="grid border-b border-b-gray-600 grid-cols-5 text-gray-500 font-medium py-2">
                <span className="col-span-2">Product</span>
                <span className="relative left-2">Quantity</span>
                <span className="relative left-8">Price</span>
                <span className="relative left-8">Subtotal</span>
              </div>
              {cart.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="grid grid-cols-5 items-center gap-6 border-b p-4"
                >
                  <div className="flex items-center gap-4 col-span-2">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="space-y-1.5">
                      <h2 className="font-semibold text-sm">{item.title}</h2>
                      <p className="text-gray-500 text-sm">
                        Category: {item.category}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-500 text-sm flex items-center gap-1 hover:text-red-500"
                      >
                        <X size={14} /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center border border-gray-200 rounded-md justify-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-gray-600 text-center">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="font-semibold text-center">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4">
            <h3 className="font-normal mb-2">Have a coupon?</h3>
            <p className="text-sm font-normal text-gray-400 mb-2">
              Add your code for an instant cart discount
            </p>
            <div className="mt-4 gap-2 relative md:max-w-sm">
              <Input
                placeholder="Coupon Code"
                className="border border-gray-400 rounded-none py-5 px-4"
              />
              <p className="absolute inset-y-0 right-3 top-2 cursor-pointer">
                Apply
              </p>
            </div>
          </div>
        </div>
        <Card className="p-4">
          <h2 className="font-normal mb-4">Cart Summary</h2>
          <RadioGroup defaultValue="0" className="space-y-2">
            {shippingOptions.map((option) => (
              <label
                key={option.value}
                className={`${
                  shipping === option.value ? "bg-slate-100" : "bg-none"
                } flex justify-between items-center border p-2 border-gray-500 rounded cursor-pointer`}
              >
                <RadioGroupItem
                  value={String(option.value)}
                  onClick={() => setShipping(option.value)}
                />
                {option.label} <span>${option.value.toFixed(2)}</span>
              </label>
            ))}
          </RadioGroup>
          <div className="mt-4 pt-4">
            <p className="flex justify-between font-normal text-gray-400 text-sm border-b pb-3">
              Subtotal{" "}
              <span className="text-black font-semibold">
                ${totalPrice.toFixed(2)}
              </span>
            </p>
            <p className="mt-4 flex justify-between text-lg font-semibold">
              Total <span>${total.toFixed(2)}</span>
            </p>
          </div>
          <Button className="w-full mt-4">Checkout</Button>
        </Card>
      </div>
    </div>
  );
}
