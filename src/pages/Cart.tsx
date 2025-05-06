
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Trash, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 bg-claw-gray-100 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8 text-claw-gray-400" />
        </div>
        <h2 className="text-2xl font-medium text-gray-900">Your cart is empty</h2>
        <p className="mt-1 text-gray-500">Start shopping to add items to your cart</p>
        <Link to="/membership-store">
          <Button className="mt-6">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
        <span className="text-gray-600">{totalItems} items</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg border">
            <ul className="divide-y">
              {items.map(item => (
                <li key={item.id} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-20 h-20 bg-gray-100 rounded">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      
                      <p className="text-gray-500 text-sm mt-1">${item.price.toFixed(2)} each</p>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border rounded">
                          <button 
                            className="flex items-center justify-center w-8 h-8 text-gray-600 hover:bg-gray-50"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <button 
                            className="flex items-center justify-center w-8 h-8 text-gray-600 hover:bg-gray-50"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <button 
                          className="text-red-500 hover:text-red-700 flex items-center"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash size={16} />
                          <span className="ml-1 text-sm">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(totalPrice * 0.07).toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${(totalPrice + 5 + totalPrice * 0.07).toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full mt-6"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </Button>
            
            <Link to="/membership-store">
              <button className="w-full mt-3 text-claw-blue-600 text-sm hover:underline">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
