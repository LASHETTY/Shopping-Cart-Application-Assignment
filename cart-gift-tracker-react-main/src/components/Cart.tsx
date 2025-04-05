
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle, Trash2 } from "lucide-react";
import { CartItem } from "@/pages/Index";

type CartProps = {
  items: CartItem[];
  updateQuantity: (itemId: number, quantity: number) => void;
  removeFromCart: (itemId: number) => void;
};

const Cart = ({ items, updateQuantity, removeFromCart }: CartProps) => {
  const isFreeGift = (itemId: number) => itemId === 99; // FREE_GIFT.id = 99

  return (
    <div className="space-y-4">
      {items.map(item => (
        <div 
          key={item.id}
          className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
        >
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-medium">{item.name}</span>
              {isFreeGift(item.id) && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                  FREE GIFT
                </span>
              )}
            </div>
            <div className="text-sm text-gray-600">
              ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!isFreeGift(item.id) && (
              <>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                
                <span className="w-8 text-center">{item.quantity}</span>
                
                <Button
                  variant="default"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-red-200 hover:bg-red-50 hover:text-red-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
