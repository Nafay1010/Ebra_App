import { useProducts } from "@/app/context/ProductContext";
import { Button } from "../ui/button";
import Image from "next/image";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

// Type for product
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  quantity: number;
  image: string;
}

// SidebarCheckout component props
interface SidebarCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarCheckout = ({ isOpen, onClose }: SidebarCheckoutProps) => {
  if (!isOpen) return null;
  const router = useRouter();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const { cart, totalPrice, updateQuantity, removeFromCart, loading } =
    useProducts();

  // Handle incrementing the product quantity
  const handleIncrement = (id: number) => {
    const product: Product | undefined = cart.find(
      (product: Product) => product.id === id
    );
    if (product) {
      updateQuantity(id, product.quantity + 1);
    }
  };

  // Handle decrementing the product quantity
  const handleDecrement = (id: number) => {
    const product: Product | undefined = cart.find(
      (product: Product) => product.id === id
    );
    if (product && product.quantity > 0) {
      updateQuantity(id, product.quantity - 1);
    }
  };

  // Handle removing a product from the cart
  const handleRemove = (id: number) => {
    removeFromCart(id);
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50">
      <div className="p-2 fixed right-0 top-0 h-full w-96 backdrop-blur-3xl bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">Cart</h2>

          <div className="space-y-5">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-24 h-24 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-4 mb-2" />
                      <Skeleton className="h-3" />
                      <Skeleton className="h-6 mt-2" />
                    </div>
                    <div className="flex flex-col items-start mb-auto">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-12 mt-2" />
                    </div>
                  </div>
                </div>
              ))
            ) : cart.length === 0 ? (
              <h1>No Items in cart added yet</h1>
            ) : (
              cart.map((product: Product) => (
                <div key={product.id} className="border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={64}
                      height={64}
                      className="w-24 h-24 object-cover rounded"
                      style={{
                        width: "auto",
                        height: "auto",
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-xs">{product.title}</p>
                      <p className="text-xs text-gray-500">
                        Category: {product.category}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleDecrement(product.id)}
                          className="px-3 py-0.5 border border-gray-300 hover:bg-slate-50 cursor-pointer rounded"
                        >
                          -
                        </button>
                        <span className="px-4 text-xs">{product.quantity}</span>
                        <button
                          onClick={() => handleIncrement(product.id)}
                          className="px-3 py-0.5 border border-gray-300 hover:bg-slate-50 cursor-pointer rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end mb-auto">
                      <p className="text-gray-600">
                        ${product.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="text-gray-500 cursor-pointer hover:text-gray-700"
                      >
                        <Image
                          src="/assets/icons/close.svg"
                          alt="close"
                          width={20}
                          height={20}
                          style={{
                            width: "auto",
                            height: "auto",
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Subtotal and Total */}
        <div className="space-y-4 px-6 py-4 mt-10">
          <div className="flex justify-between">
            <p className="text-gray-600">Subtotal</p>
            <p className="font-semibold">${totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Total</p>
            <p className="font-semibold">${totalPrice.toFixed(2)}</p>
          </div>
        </div>

        <Button className="w-full py-3 my-3">Checkout</Button>

        <p
          onClick={() => {
            onClose();
            router.push("/cart");
          }}
          className="mb-5 cursor-pointer text-sm hover:font-semibold w-fit mx-auto text-center underline text-black"
        >
          View Cart
        </p>

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
            style={{
              width: "auto",
              height: "auto",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default SidebarCheckout;
