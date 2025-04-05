
import { useState, useEffect } from "react";
import ProductList from "@/components/ProductList";
import Cart from "@/components/Cart";
import GiftProgressBar from "@/components/GiftProgressBar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Product data
const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

// Cart item type definition
export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [giftAdded, setGiftAdded] = useState(false);

  // Calculate subtotal and handle gift eligibility whenever cart changes
  useEffect(() => {
    const calculatedSubtotal = cart
      .filter(item => item.id !== FREE_GIFT.id)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    setSubtotal(calculatedSubtotal);
    
    // Handle free gift logic
    if (calculatedSubtotal >= THRESHOLD && !giftAdded) {
      // Add free gift to cart
      setCart(prevCart => [...prevCart, { ...FREE_GIFT, quantity: 1 }]);
      setGiftAdded(true);
      toast.success("Congratulations! You got a free Wireless Mouse!");
    } else if (calculatedSubtotal < THRESHOLD && giftAdded) {
      // Remove free gift from cart
      setCart(prevCart => prevCart.filter(item => item.id !== FREE_GIFT.id));
      setGiftAdded(false);
    }
  }, [cart, giftAdded]);

  // Add product to cart
  const addToCart = (productId: number) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      
      if (existingItem) {
        // Increase quantity of existing item
        return prevCart.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Update item quantity in cart
  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    // Don't allow manual updates to free gift
    if (itemId === FREE_GIFT.id) return;

    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (itemId: number) => {
    // Don't allow manual removal of free gift
    if (itemId === FREE_GIFT.id) return;
    
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart App</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <ProductList 
            products={PRODUCTS} 
            addToCart={addToCart} 
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
          
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Subtotal:</span>
              <span className="font-medium">₹{subtotal}</span>
            </div>
            
            {subtotal < THRESHOLD ? (
              <GiftProgressBar 
                currentAmount={subtotal} 
                threshold={THRESHOLD} 
              />
            ) : (
              <div className="p-3 bg-green-50 text-green-700 rounded-md">
                You got a free Wireless Mouse!
              </div>
            )}
          </div>
          
          <h3 className="text-lg font-semibold mb-3">Cart Items</h3>
          
          {cart.length > 0 ? (
            <Cart 
              items={cart} 
              updateQuantity={updateQuantity} 
              removeFromCart={removeFromCart} 
            />
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-2">Your cart is empty</p>
              <p className="text-sm">Add some products to see them here!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
