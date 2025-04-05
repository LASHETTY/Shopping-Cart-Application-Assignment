
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle, MinusCircle } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
};

type ProductListProps = {
  products: Product[];
  addToCart: (productId: number) => void;
};

const ProductList = ({ products, addToCart }: ProductListProps) => {
  const [quantities, setQuantities] = useState<Record<number, number>>(
    products.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
  );

  const incrementQuantity = (productId: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: prev[productId] + 1
    }));
  };

  const decrementQuantity = (productId: number) => {
    if (quantities[productId] > 1) {
      setQuantities(prev => ({
        ...prev,
        [productId]: prev[productId] - 1
      }));
    }
  };

  const handleAddToCart = (productId: number) => {
    // Add the product multiple times based on the selected quantity
    for (let i = 0; i < quantities[productId]; i++) {
      addToCart(productId);
    }
    
    // Reset quantity to 1 after adding to cart
    setQuantities(prev => ({
      ...prev,
      [productId]: 1
    }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {products.map(product => (
        <Card key={product.id} className="p-4 flex flex-col">
          <h3 className="font-medium mb-1">{product.name}</h3>
          <p className="text-gray-700 mb-4">₹{product.price}</p>
          
          <div className="flex items-center justify-center mb-4">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => decrementQuantity(product.id)}
            >
              <MinusCircle className="h-4 w-4" />
            </Button>
            
            <span className="mx-3 min-w-8 text-center">
              {quantities[product.id]}
            </span>
            
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => incrementQuantity(product.id)}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            className="mt-auto"
            onClick={() => handleAddToCart(product.id)}
          >
            Add to Cart
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
