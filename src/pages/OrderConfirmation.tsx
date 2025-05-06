
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../contexts/CartContext';

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  
  // If there are items in the cart, the order wasn't completed, redirect to cart
  useEffect(() => {
    if (totalItems > 0) {
      navigate('/cart');
    }
  }, [totalItems, navigate]);
  
  // Generate a random order number
  const orderNumber = React.useMemo(() => {
    return 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  }, []);
  
  // Current date + 7 days for estimated delivery
  const estimatedDelivery = React.useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto text-center py-8">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check size={32} className="text-green-600" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Thank You For Your Order!</h1>
      <p className="text-gray-600 mb-8">
        Your order has been placed and is being processed.
      </p>
      
      <div className="bg-white border rounded-lg p-6 mb-8 text-left">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Order Number</h3>
            <p className="mt-1">{orderNumber}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Estimated Delivery</h3>
            <p className="mt-1">{estimatedDelivery}</p>
          </div>
        </div>
        
        <div className="border-t mt-4 pt-4">
          <p className="text-sm">
            You will receive an email confirmation shortly at your registered email address. 
            If you have any questions about your order, please contact our customer support.
          </p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Link to="/membership-store">
          <Button>
            Continue Shopping
          </Button>
        </Link>
        
        <Link to="/my-works">
          <Button variant="outline">
            View My Works
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
