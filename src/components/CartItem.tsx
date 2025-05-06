
import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Trash, Minus, Plus } from 'lucide-react';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, image, quantity }) => {
  const { removeItem, updateQuantity } = useCart();
  
  // Handle quantity change with animation
  const handleQuantityChange = (newQuantity: number) => {
    // Don't go below 1
    if (newQuantity < 1) return;
    
    // Get the quantity element to animate
    const quantityElement = document.getElementById(`quantity-${id}`);
    if (quantityElement) {
      // Add a brief scaling animation
      quantityElement.classList.add('scale-125');
      quantityElement.classList.add('text-claw-blue-500');
      
      // Remove animation class after animation completes
      setTimeout(() => {
        quantityElement.classList.remove('scale-125');
        quantityElement.classList.remove('text-claw-blue-500');
      }, 300);
    }
    
    // Update the quantity
    updateQuantity(id, newQuantity);
  };
  
  return (
    <div className="flex items-center py-4 border-b">
      <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium">{name}</h3>
          <p className="font-medium">${(price * quantity).toFixed(2)}</p>
        </div>
        
        <p className="text-gray-500 text-sm">${price.toFixed(2)} each</p>
      </div>
      
      <div className="flex items-center ml-4">
        <button 
          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-700"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
        >
          <Minus size={16} />
        </button>
        <span 
          id={`quantity-${id}`} 
          className="mx-2 w-6 text-center transition-all duration-300"
        >
          {quantity}
        </span>
        <button 
          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-700"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          <Plus size={16} />
        </button>
      </div>
      
      <button 
        className="ml-4 text-red-500 hover:text-red-700 transition-colors duration-200"
        onClick={() => removeItem(id)}
      >
        <Trash size={16} />
      </button>
    </div>
  );
};

export default CartItem;
