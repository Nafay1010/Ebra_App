"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Grid, List, SlidersHorizontal } from "lucide-react"; // Icons from Lucide

const categories = [
  "All Rooms",
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Bathroom",
  "Dinning",
  "Outdoor",
];
const priceRanges = [
  "$0.00 - 99.99",
  "$100.00 - 199.99",
  "$200.00 - 299.99",
  "$300.00 - 399.99",
  "$400.00+",
];

const products = [
  {
    id: 1,
    name: "Loveseat Sofa",
    price: "$199.00",
    oldPrice: "$400.00",
    image: "/placeholder.jpg",
    discount: "-50%",
  },
  {
    id: 2,
    name: "Luxury Sofa",
    price: "$299.00",
    oldPrice: "$600.00",
    image: "/placeholder.jpg",
    discount: "-50%",
  },
  {
    id: 3,
    name: "Table Lamp",
    price: "$19.00",
    image: "/placeholder.jpg",
    discount: "-50%",
  },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("Living Room");
  const [selectedPrice, setSelectedPrice] = useState(priceRanges[0]);

  return (
    <div className="w-full">
      <section className="relative w-full h-96">
        <Image
          src="/assets/pics/product_hero.svg"
          alt="Shop Hero"
          fill
          className="object-cover"
        />
      </section>

      <div className="container mx-auto px-6 py-10 flex gap-8">
        <aside className="w-1/4">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <SlidersHorizontal size={20} /> Filter
          </h3>

          <div>
            <h4 className="text-md font-semibold mb-2">CATEGORIES</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category}
                  className={`cursor-pointer ${
                    selectedCategory === category
                      ? "text-black font-bold"
                      : "text-gray-500 hover:text-black"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h4 className="text-md font-semibold mb-2">PRICE</h4>
            <ul className="space-y-2">
              {priceRanges.map((price) => (
                <li key={price} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedPrice === price}
                    onChange={() => setSelectedPrice(price)}
                    className="w-4 h-4"
                  />
                  <span>{price}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">{selectedCategory}</h2>
            <div className="flex items-center gap-4">
              <span>Sort by</span>
              <ChevronDown size={16} />
              <Grid size={24} className="cursor-pointer" />
              <List size={24} className="cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    {product.discount}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-700">
                    <span className="font-bold">{product.price}</span>
                    {product.oldPrice && (
                      <span className="ml-2 line-through text-gray-400">
                        {product.oldPrice}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
