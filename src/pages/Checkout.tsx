
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Check, CreditCard, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import CartItem from '../components/CartItem';

// Form steps
const STEPS = {
  SHIPPING: 0,
  PAYMENT: 1,
  REVIEW: 2
};

const CheckoutPage: React.FC = () => {
  const { user } = useAuth();
  const { items, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(STEPS.SHIPPING);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: user?.name || '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
        <button 
          onClick={() => navigate('/membership-store')}
          className="claw-button"
        >
          Continue Shopping
        </button>
      </div>
    );
  }
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(STEPS.PAYMENT);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(STEPS.REVIEW);
  };
  
  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect to confirmation
      clearCart();
      navigate('/order-confirmation', {
        state: {
          orderNumber: Math.floor(100000 + Math.random() * 900000).toString(),
          shippingInfo,
          items
        }
      });
      
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('There was an error processing your order.');
      setIsProcessing(false);
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
      
      {/* Checkout progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex flex-col items-center ${currentStep >= STEPS.SHIPPING ? 'text-claw-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= STEPS.SHIPPING ? 'bg-claw-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {currentStep > STEPS.SHIPPING ? <Check size={16} /> : 1}
            </div>
            <span className="text-sm mt-1">Shipping</span>
          </div>
          
          <div className={`flex-1 h-1 mx-2 ${currentStep >= STEPS.PAYMENT ? 'bg-claw-blue-500' : 'bg-gray-200'}`}></div>
          
          <div className={`flex flex-col items-center ${currentStep >= STEPS.PAYMENT ? 'text-claw-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= STEPS.PAYMENT ? 'bg-claw-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {currentStep > STEPS.PAYMENT ? <Check size={16} /> : 2}
            </div>
            <span className="text-sm mt-1">Payment</span>
          </div>
          
          <div className={`flex-1 h-1 mx-2 ${currentStep >= STEPS.REVIEW ? 'bg-claw-blue-500' : 'bg-gray-200'}`}></div>
          
          <div className={`flex flex-col items-center ${currentStep >= STEPS.REVIEW ? 'text-claw-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= STEPS.REVIEW ? 'bg-claw-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {currentStep > STEPS.REVIEW ? <Check size={16} /> : 3}
            </div>
            <span className="text-sm mt-1">Review</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Shipping Info Form */}
          {currentStep === STEPS.SHIPPING && (
            <div className="claw-card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MapPin size={20} className="mr-2" />
                Shipping Information
              </h2>
              
              <form onSubmit={handleShippingSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={shippingInfo.fullName}
                      onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal Code</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 text-right">
                  <button 
                    type="submit"
                    className="claw-button"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Payment Info Form */}
          {currentStep === STEPS.PAYMENT && (
            <div className="claw-card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CreditCard size={20} className="mr-2" />
                Payment Information
              </h2>
              
              <form onSubmit={handlePaymentSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={paymentInfo.cardName}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                      placeholder="XXXX XXXX XXXX XXXX"
                      maxLength={19}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                      <select 
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={paymentInfo.expMonth}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expMonth: e.target.value})}
                        required
                      >
                        <option value="">Month</option>
                        {[...Array(12)].map((_, i) => (
                          <option key={i} value={String(i + 1).padStart(2, '0')}>
                            {String(i + 1).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                      <select 
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={paymentInfo.expYear}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expYear: e.target.value})}
                        required
                      >
                        <option value="">Year</option>
                        {[...Array(10)].map((_, i) => {
                          const year = new Date().getFullYear() + i;
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                        placeholder="XXX"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between">
                  <button 
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    onClick={() => setCurrentStep(STEPS.SHIPPING)}
                  >
                    Back
                  </button>
                  
                  <button 
                    type="submit"
                    className="claw-button"
                  >
                    Continue to Review
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Order Review */}
          {currentStep === STEPS.REVIEW && (
            <div className="claw-card p-6">
              <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Shipping Information</h3>
                  <div className="bg-gray-50 p-3 rounded">
                    <p>{shippingInfo.fullName}</p>
                    <p>{shippingInfo.email}</p>
                    <p>{shippingInfo.address}</p>
                    <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                    <p>{shippingInfo.country}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Payment Method</h3>
                  <div className="bg-gray-50 p-3 rounded flex items-center">
                    <CreditCard size={18} className="mr-2 text-gray-500" />
                    <span>Card ending in {paymentInfo.cardNumber.slice(-4)}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Items</h3>
                  <div className="space-y-2">
                    {items.map(item => (
                      <CartItem key={item.id} {...item} />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => setCurrentStep(STEPS.PAYMENT)}
                >
                  Back
                </button>
                
                <button 
                  className="claw-button"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <div className="claw-card p-5 sticky top-4">
            <h2 className="font-semibold text-lg mb-4 pb-2 border-b">Order Summary</h2>
            
            {items.length > 0 && (
              <div className="space-y-4">
                <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${(totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t mt-2">
                    <span>Total</span>
                    <span>${(totalPrice + totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
