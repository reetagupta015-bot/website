import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  img: string;
  quantity: number;
  metalQuality?: string;
  metalColor?: string;
  diamondQuality?: string;
  size?: string;
  engraving?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage only on the client side after hydration
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("shopping-cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever cart changes, but only after initial load
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("shopping-cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === newItem.id);
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        return updatedCart;
      }
      return [...prevCart, newItem];
    });
    toast.success(`Added ${newItem.quantity} ${newItem.name} to cart!`);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
