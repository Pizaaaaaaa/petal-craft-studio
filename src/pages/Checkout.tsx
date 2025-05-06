
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CheckoutFormData {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  paymentMethod: string;
}

const paymentMethods = [
  { id: 'credit_card', name: 'Credit / Debit Card', icon: <CreditCard size={20} /> },
  { id: 'paypal', name: 'PayPal', icon: <Wallet size={20} /> },
  { id: 'alipay', name: 'Alipay', icon: '💲' },
  { id: 'wechat', name: 'WeChat Pay', icon: '📱' },
];

const CheckoutPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { items, totalItems, totalPrice, checkout, isProcessingPayment } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: user?.displayName || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    paymentMethod: 'credit_card'
  });

  // Redirect to cart if cart is empty
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    const requiredFields = ['fullName', 'address', 'city', 'state', 'zipCode', 'country', 'phone'] as const;
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields", {
        description: `Missing: ${missingFields.join(', ')}`,
      });
      return;
    }
    
    // Process checkout
    const success = await checkout({
      fullName: formData.fullName,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
      phone: formData.phone
    }, formData.paymentMethod);
    
    if (success) {
      navigate('/order-confirmation');
    }
  };
  
  const subtotal = totalPrice;
  const shipping = 5.00;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-medium mb-4">Shipping Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-claw-blue-500 focus:border-claw-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-claw-blue-500 focus:border-claw-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-claw-blue-500 focus:border-claw-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State/Province</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-claw-blue-500 focus:border-claw-blue-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP/Postal Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-claw-blue-500 focus:border-claw-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-claw-blue-500 focus:border-claw-blue-500"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="CN">China</option>
                      <option value="JP">Japan</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-claw-blue-500 focus:border-claw-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-medium mb-4">Payment Method</h2>
              
              <div className="space-y-3">
                {paymentMethods.map(method => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.paymentMethod === method.id 
                        ? 'border-claw-blue-500 bg-claw-blue-50' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-claw-blue-600">
                        {typeof method.icon === 'string' ? <span className="text-xl">{method.icon}</span> : method.icon}
                      </div>
                      <span>{method.name}</span>
                    </div>
                    
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-claw-blue-600"
                    />
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isProcessingPayment}
                className="px-8"
              >
                {isProcessingPayment ? 'Processing...' : 'Place Order'}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg border sticky top-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            
            <div className="max-h-64 overflow-auto mb-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 py-3 border-b">
                  <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
