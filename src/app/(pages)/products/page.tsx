"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { BsFillGrid3X3GapFill, BsFillGridFill } from "react-icons/bs";
import { PiColumnsFill } from "react-icons/pi";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";

const categories = [
  "All Rooms",
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Bathroom",
  "Dinning",
  "Outdoor",
  "Office",
  "Kids",
  "Hallway",
  "Storage",
  "Lighting",
  "Decor",
  "Rugs",
  "Textiles",
  "Curtains",
  "Mirrors",
];

const priceRanges = [
  "$0.00 - 99.99",
  "$100.00 - 199.99",
  "$200.00 - 299.99",
  "$300.00 - 399.99",
  "$400.00+",
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("Living Room");
  const [selectedPrice, setSelectedPrice] = useState(priceRanges[0]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-96">
        <Image
          src="/assets/pics/product_hero.svg"
          alt="Shop Hero"
          fill
          className="object-cover"
        />
        <div className="space-y-6 absolute inset-0 flex flex-col items-center justify-center text-black">
          <p className="text-sm font-inter">
            <Link className="pr-4 text-[#605F5F] hover:underline" href="/">
              Home
            </Link>
            {">"} <span className="pl-4 font-semibold">Products</span>
          </p>
          <h1 className="text-5xl font-poppins">Shop Page</h1>
          <p className="text-sm font-inter">
            Let’s design the place you always imagined.
          </p>
        </div>
      </section>

      <div className="container mx-auto py-10 flex gap-8">
        {/* Sidebar */}
        <aside className="w-[20%]">
          <h3 className="font-semibold text-lg mb-10 flex items-center gap-2">
            <SlidersHorizontal size={20} /> Filter
          </h3>

          <div>
            <h4 className="text-md font-semibold mb-4">CATEGORIES</h4>
            <ul className="space-y-3 h-72 overflow-y-scroll scrollbar-visible">
              {categories.map((category) => (
                <li
                  key={category}
                  className={`cursor-pointer ${
                    selectedCategory === category
                      ? "text-black underline font-semibold"
                      : "text-gray-500 hover:text-black"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14">
            <h4 className="text-md font-semibold mb-4">PRICE</h4>
            <ul className="space-y-3">
              {priceRanges.map((price) => (
                <li
                  key={price}
                  className="flex items-center justify-between gap-2"
                >
                  <span>{price}</span>
                  <Checkbox
                    checked={selectedPrice === price}
                    onCheckedChange={() => setSelectedPrice(price)}
                    className="w-5 h-5 border border-gray-900 rounded"
                  />
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">{selectedCategory}</h2>
            <div className="flex items-center gap-4">
              <span>Sort by</span>
              <ChevronDown size={16} />

              <div className="flex items-center">
                <BsFillGrid3X3GapFill className="text-4xl px-2.5 bg-slate-100 text-black" />
                <BsFillGridFill className="text-4xl px-2.5 text-gray-500" />
                <PiColumnsFill className="text-4xl px-2.5 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Products List */}
          {loading ? (
            <div className="grid grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border rounded overflow-hidden ">
                  <Skeleton className="w-full h-48" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {products.map((product) => {
                const discountPercentage = 50; // Assuming 50% off
                const discountedPrice =
                  (product.price * (100 - discountPercentage)) / 100;

                return (
                  <div
                    key={product.id}
                    className="rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-75 ease-linear"
                  >
                    {/* Product Image and Labels */}
                    <div className="relative bg-slate-100">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={400}
                        height={300}
                        className="w-full h-82 object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-white text-black text-xs font-bold px-2 py-1 rounded">
                        NEW
                      </span>
                      <span className="absolute top-10 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        -{discountPercentage}%
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="py-4 px-2">
                      {/* Star Ratings (Fake) */}
                      <div className="flex justify-start mb-1">
                        {Array(5)
                          .fill(0)
                          .map((_, index) => (
                            <span
                              key={index}
                              className="text-[#343839] text-sm"
                            >
                              ★
                            </span>
                          ))}
                      </div>

                      {/* Product Title */}
                      <h3 className="text-sm font-semibold font-inter text-[#141718]">
                        {product.title}
                      </h3>

                      {/* Pricing */}
                      <p className="text-gray-700 mt-1">
                        <span className="font-semibold text-sm mr-3">
                          ${discountedPrice.toFixed(2)}
                        </span>{" "}
                        <span className="text-gray-400 line-through text-sm font-normal">
                          ${product.price.toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
