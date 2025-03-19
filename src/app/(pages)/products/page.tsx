"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { BsFillGrid3X3GapFill, BsFillGridFill } from "react-icons/bs";
import { PiColumnsFill } from "react-icons/pi";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useProducts } from "@/app/context/ProductContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Products() {
  const router = useRouter();
  const { addToCart } = useProducts();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory
      ? product.category === selectedCategory
      : true;
    const priceMatch = selectedPrice
      ? product.price >= +selectedPrice.split(" - ")[0].slice(1) &&
        product.price <= +selectedPrice.split(" - ")[1].slice(1)
      : true;
    return categoryMatch && priceMatch;
  });

  const [sortBy, setSortBy] = useState<string | null>(null);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceLowToHigh") return a.price - b.price;
    if (sortBy === "priceHighToLow") return b.price - a.price;
    if (sortBy === "rating") return b.rating.rate - a.rating.rate;
    return 0;
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        if (!res.ok) {
          throw new Error(`Failed to fetch categories: ${res.statusText}`);
        }
        const data = await res.json();
        setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // Optionally set categories to an empty array on error
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.statusText}`);
        }
        const data = await res.json();
        setProducts(data);

        // Find min and max price
        const prices = data.map((product: any) => product.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        // Create 5 price segments
        const numSegments = 5;
        const step = (maxPrice - minPrice) / numSegments;
        const ranges = Array.from({ length: numSegments }, (_, i) => {
          const start = minPrice + i * step;
          const end = start + step;
          return `$${start.toFixed(2)} - $${end.toFixed(2)}`;
        });

        setPriceRanges(ranges);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Optionally set products to an empty array on error
      } finally {
        setLoading(false);
      }
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
          priority
        />
        <div className="space-y-6 absolute inset-0 flex flex-col items-center justify-center text-black">
          <p className="text-sm font-inter">
            <Link className="pr-4 text-[#605F5F] hover:underline" href="/">
              Home
            </Link>
            {">"} <span className="pl-4 font-semibold">Products</span>
          </p>
          <h1 className="md:text-5xl text-3xl font-poppins">Shop Page</h1>
          <p className="text-sm font-inter">
            Let’s design the place you always imagined.
          </p>
        </div>
      </section>

      <div className="mx-auto py-10 gap-12 flex flex-col md:flex-row w-full">
        {/* Sidebar */}
        <aside className="md:w-[20%] w-full lg:max-w-xs">
          <h3 className="font-semibold text-lg mb-14 flex items-center md:justify-normal justify-center gap-2">
            <SlidersHorizontal size={20} /> Filter
          </h3>

          <div className="md:text-left text-center">
            <h4 className="text-md font-semibold mb-4">CATEGORIES</h4>
            <ul className="space-y-3 h-40 overflow-y-scroll scrollbar-visible">
              {loading ? (
                <div className="space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="w-32 h-5" />
                  ))}
                </div>
              ) : (
                categories.map((category) => (
                  <li
                    key={category}
                    className={`cursor-pointer capitalize ${
                      selectedCategory === category
                        ? "text-black underline font-semibold"
                        : "text-gray-500 hover:text-black"
                    }`}
                    onClick={() => {
                      if (selectedCategory === category) {
                        setSelectedCategory(null);
                      } else {
                        setSelectedCategory(category);
                      }
                    }}
                  >
                    {category}
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="mt-14 md:text-left text-center">
            <h4 className="text-md font-semibold mb-4">PRICE</h4>
            <ul className="space-y-3">
              {loading
                ? [...Array(6)].map((_, i) => (
                    <li
                      key={i}
                      className="flex items-center  md:justify-between justify-center md:gap-2 gap-y-2 gap-x-10"
                    >
                      <Skeleton className="w-32 h-5" />{" "}
                      <Skeleton className="w-5 h-5 rounded" />{" "}
                    </li>
                  ))
                : priceRanges.map((price) => (
                    <li
                      key={price}
                      className="flex items-center md:justify-between justify-center md:gap-2 gap-y-2 gap-x-10"
                    >
                      <span>{price}</span>
                      <Checkbox
                        checked={selectedPrice === price}
                        onCheckedChange={() => {
                          if (selectedPrice === price) {
                            setSelectedPrice(null);
                          } else {
                            setSelectedPrice(price);
                          }
                        }}
                        className="cursor-pointer w-5 h-5 border border-gray-900 rounded"
                      />
                    </li>
                  ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="flex-1">
          <div className="flex md:justify-between justify-center items-center mb-14">
            <h2 className="text-2xl font-semibold capitalize">
              {selectedCategory}
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <Select value={sortBy ?? undefined} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="priceLowToHigh">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="priceHighToLow">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-6 gap-3">
              {sortedProducts.length === 0 ? (
                <div>
                  <h1 className="text-2xl">No products found</h1>
                </div>
              ) : (
                sortedProducts.map((product) => {
                  const discountPercentage = 50; // Assuming 50% off
                  const discountedPrice =
                    (product.price * (100 - discountPercentage)) / 100;

                  return (
                    <div
                      onClick={() => router.push(`/products/${product.id}`)}
                      key={product.id}
                      className="group cursor-pointer overflow-hidden shadow hover:shadow-lg transition-all duration-75 ease-linear"
                    >
                      <div className=" relative p-2 bg-[#F2F2F2]">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={400}
                          height={300}
                          className="w-full h-82 object-cover mb-12 brightness-95"
                        />
                        <span className="absolute top-2 left-2 bg-white text-black text-xs font-bold px-2 py-1 rounded">
                          NEW
                        </span>
                        <Image
                          src={"/assets/icons/heart.svg"}
                          alt="Heart Icon"
                          width={40}
                          height={40}
                          className="group-hover:block hidden absolute top-2 right-1"
                        />
                        <span className="absolute top-10 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          -{discountPercentage}%
                        </span>

                        <div className="absolute bottom-0 left-0 w-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button
                            className="w-full cursor-pointer py-5"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product, 1);
                            }}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>

                      <div className="py-4 px-2">
                        <div className="flex justify-start mb-1">
                          <div className="flex justify-start mb-1">
                            {Array(Math.round(product.rating.rate))
                              .fill(0)
                              .map((_, index) => (
                                <span
                                  key={index}
                                  className="text-[#343839] text-sm"
                                >
                                  ★
                                </span>
                              ))}
                            {Array(5 - Math.round(product.rating.rate))
                              .fill(0)
                              .map((_, index) => (
                                <span
                                  key={index}
                                  className="text-[#343839] text-sm opacity-30"
                                >
                                  ★
                                </span>
                              ))}
                          </div>
                        </div>

                        <h3 className="text-sm font-semibold font-inter text-[#141718]">
                          {product.title}
                        </h3>

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
                })
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
