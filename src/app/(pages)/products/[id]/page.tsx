"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FaRegHeart } from "react-icons/fa";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  category: string;
}

interface OfferTimer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ProductDetails = () => {
  const params = useParams();
  const { id } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [offerTimer, setOfferTimer] = useState<OfferTimer>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleQuantityChange = (action: "increase" | "decrease") => {
    setQuantity((prev) =>
      action === "increase" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  useEffect(() => {
    if (!product) return;

    // Set the expiration date (1 day ahead from now)
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    // Function to update the timer
    const updateTimer = () => {
      const now = new Date();
      const timeRemaining = expirationDate.getTime() - now.getTime();

      if (timeRemaining <= 0) {
        setOfferTimer({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      setOfferTimer({
        days,
        hours,
        minutes,
        seconds,
      });
    };

    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, [product]);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-gray-600 mb-10">
          <Skeleton className="w-full h-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="w-full h-96" />

          <div className="space-y-6">
            <Skeleton className="w-3/4 h-6" />
            <Skeleton className="w-1/2 h-8" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-1/3 h-8" />
            <Skeleton className="w-1/2 h-8" />
          </div>
        </div>
      </div>
    );

  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found</p>;

  const discountPercentage =
    Math.round(1 - product.price / (product.price * 1.2)) * 100;
  const originalPrice = (product.price * 1.2).toFixed(2);
  const measurements = "20 x 30 x 15 cm";
  const colors = ["Red", "Blue", "Green", "Black"];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-sm text-gray-600 mb-10">
        <p className="text-sm font-inter">
          <Link className="pr-4 text-[#605F5F] hover:underline" href="/">
            Home
          </Link>
          {">"}{" "}
          <Link href="/products" className="px-4 hover:underline">
            Products
          </Link>
          {">"}{" "}
          <span className="pl-4 font-semibold text-black">{product.title}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full h-96">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain rounded-lg"
          />
          <span className="absolute top-2 left-2 bg-white text-black text-xs font-bold px-2 py-1 rounded">
            NEW
          </span>
          <span className="absolute top-10 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            -{discountPercentage}%
          </span>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center mt-2">
              <div className="flex">
                {Array(Math.round(product.rating.rate))
                  .fill(0)
                  .map((_, index) => (
                    <span key={index} className="text-[#343839] text-sm">
                      ★
                    </span>
                  ))}
                {Array(5 - Math.round(product.rating.rate))
                  .fill(0)
                  .map((_, index) => (
                    <span key={index} className="text-gray-300 text-sm">
                      ★
                    </span>
                  ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">
                {product.rating.count} Reviews
              </span>
            </div>
            <h1 className="text-4xl my-4">{product.title}</h1>
          </div>

          <p className="text-[#6C7275] font-inter">
            {product.description.charAt(0).toUpperCase() +
              product.description.slice(1)}
          </p>

          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-gray-400 line-through">${originalPrice}</span>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Offer expires in:</span>
            </div>
            <div className="flex space-x-4 mt-2">
              <div className="text-center">
                <span className="text-lg font-bold">{offerTimer.days}</span>
                <span className="text-sm text-gray-600 block">Days</span>
              </div>
              <div className="text-center">
                <span className="text-lg font-bold">{offerTimer.hours}</span>
                <span className="text-sm text-gray-600 block">Hours</span>
              </div>
              <div className="text-center">
                <span className="text-lg font-bold">{offerTimer.minutes}</span>
                <span className="text-sm text-gray-600 block">Minutes</span>
              </div>
              <div className="text-center">
                <span className="text-lg font-bold">{offerTimer.seconds}</span>
                <span className="text-sm text-gray-600 block">Seconds</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600">
              Measurements
            </h3>
            <p className="text-gray-700">{measurements}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600">
              Choose Color
            </h3>
            <div className="flex space-x-2 mt-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded-full border-2 border-gray-200 focus:outline-none focus:border-black"
                  style={{ backgroundColor: color.toLowerCase() }}
                ></button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center border border-gray-200 rounded-md">
              <button
                onClick={() => handleQuantityChange("decrease")}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-2 text-gray-800">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increase")}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <Button
              variant={"outline"}
              className="flex-1 w-full py-5 flex items-center justify-center"
            >
              <FaRegHeart className="text-gray-500" />
              Wishlist
            </Button>
          </div>

          <Button className="w-full py-5">Add to Cart</Button>

          <div className="text-sm text-gray-600 space-y-2">
            <p className="flex items-center">
              <span className="font-semibold w-24">SKU:</span>
              <span>{product.id}</span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold w-24">CATEGORY:</span>
              <span>{product.category}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
