
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Check, ChevronRight, ShoppingCart, X } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Membership tiers
const membershipTiers = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    billing: 'Free forever',
    features: [
      'Access to basic patterns',
      'Community features',
      'Create up to 5 projects',
      'Use basic yarn brushes',
      'Standard support'
    ],
    recommended: false
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    billing: 'per month',
    features: [
      'Everything in Basic',
      'Access to all patterns',
      'Unlimited projects',
      'All yarn brushes',
      'Priority support',
      'Ad-free experience'
    ],
    recommended: true
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 19.99,
    billing: 'per month',
    features: [
      'Everything in Premium',
      'Commercial usage rights',
      'Advanced editing tools',
      'Priority hardware connection',
      'Early access to new features',
      '24/7 dedicated support'
    ],
    recommended: false
  }
];

// Shop items (yarn supplies)
const shopItems = [
  {
    id: 'y1',
    name: 'Premium Merino Wool - Red',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1576473582313-495391868136?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    inStock: true
  },
  {
    id: 'y2',
    name: 'Soft Cotton Blend - Blue',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1582038439431-6019809c2241?auto=format&fit=crop&q=80&w=400',
    rating: 4.5,
    inStock: true
  },
  {
    id: 'y3',
    name: 'Alpaca Yarn Bundle - Pastels',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602079282086-3880b138a2c1?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    inStock: true
  },
  {
    id: 'y4',
    name: 'Chunky Wool Yarn - Gray',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1581067721837-11f8b1583488?auto=format&fit=crop&q=80&w=400',
    rating: 4.3,
    inStock: false
  },
  {
    id: 'y5',
    name: 'Bamboo Yarn - Green',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    inStock: true
  },
  {
    id: 'y6',
    name: 'Silk Blend - Purple',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1620208693288-161d48cbe2e4?auto=format&fit=crop&q=80&w=400',
    rating: 4.6,
    inStock: true
  }
];

// Payment methods
const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'paypal', name: 'PayPal', icon: '🅿️' },
  { id: 'alipay', name: 'Alipay', icon: '💲' },
  { id: 'wechat', name: 'WeChat Pay', icon: '📱' }
];

const MembershipStore: React.FC = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [cart, setCart] = useState<{id: string, quantity: number}[]>([]);
  const [membershipDialogOpen, setMembershipDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<typeof membershipTiers[0] | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Add item to cart
  const addToCart = (itemId: string) => {
    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === itemId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { id: itemId, quantity: 1 }]);
    }
    
    toast("Added to cart", {
      description: "Item has been added to your cart",
      duration: 2000,
    });
  };
  
  // Open membership dialog
  const openMembershipDialog = () => {
    if (!isAuthenticated) {
      toast("Login required", {
        description: "Please log in to access membership options",
        duration: 3000,
      });
      return;
    }
    setMembershipDialogOpen(true);
  };
  
  // Select tier and open payment dialog
  const selectTier = (tier: typeof membershipTiers[0]) => {
    setSelectedTier(tier);
    setMembershipDialogOpen(false);
    
    // Skip payment for free tier
    if (tier.id === 'basic' || tier.price === 0) {
      processMembershipPurchase(tier, 'free');
      return;
    }
    
    setPaymentDialogOpen(true);
  };
  
  // Process membership purchase
  const processMembershipPurchase = async (tier: typeof membershipTiers[0], paymentMethod: string) => {
    if (!isAuthenticated) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate API request
      await new Promise(r => setTimeout(r, 2000));
      
      // For demo, set the membership tier directly
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 1);
      
      await updateProfile({
        membershipTier: tier.id as 'basic' | 'premium' | 'pro',
        isMember: true,
        membershipExpiryDate: expiryDate,
      });
      
      // Close dialogs
      setPaymentDialogOpen(false);
      setSelectedPayment(null);
      
      toast("Membership Activated", {
        description: `You are now a ${tier.name} member!`,
      });
    } catch (error) {
      toast("Error", {
        description: "There was an error processing your payment. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  // View cart items
  const viewCart = () => {
    toast("Shopping Cart", {
      description: `You have ${cart.reduce((sum, item) => sum + item.quantity, 0)} items in your cart. Checkout coming soon!`,
      duration: 3000,
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Membership Store</h1>
        <p className="text-gray-600 mt-1">Enhance your knitting experience with premium features and supplies</p>
      </div>
      
      {/* Membership Banner */}
      <div 
        onClick={openMembershipDialog}
        className="relative rounded-xl overflow-hidden cursor-pointer group"
      >
        <div className="bg-gradient-to-r from-claw-blue-500 to-indigo-600 h-52 md:h-40 w-full">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">ClawLab Membership</h2>
                <p className="text-white/80 max-w-md">
                  Unlock premium patterns, unlimited projects, and more with a ClawLab membership.
                </p>
                
                {user?.membershipTier && (
                  <div className="mt-3 inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white">
                    <Check size={16} className="mr-1.5" />
                    <span>Current: {user.membershipTier.charAt(0).toUpperCase() + user.membershipTier.slice(1)} Plan</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 md:mt-0">
                <button className="group-hover:bg-white group-hover:text-claw-blue-600 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full transition-all flex items-center">
                  Explore Plans
                  <ChevronRight size={18} className="ml-1.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Supplies Store */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Yarn Supplies</h2>
          
          <button 
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-claw-blue-50 hover:bg-claw-blue-100 text-claw-blue-500"
            onClick={viewCart}
          >
            <ShoppingCart size={18} />
            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shopItems.map(item => (
            <div key={item.id} className="border rounded-lg overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-48 object-cover"
              />
              
              <div className="p-4">
                <h3 className="font-medium">{item.name}</h3>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold">${item.price}</span>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFB800" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span className="text-sm">{item.rating}</span>
                  </div>
                </div>
                
                <button 
                  className={`w-full mt-3 py-2 rounded-lg font-medium ${
                    item.inStock 
                      ? 'bg-claw-blue-500 hover:bg-claw-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={() => item.inStock && addToCart(item.id)}
                  disabled={!item.inStock}
                >
                  {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Membership Dialog */}
      <Dialog open={membershipDialogOpen} onOpenChange={setMembershipDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose a Membership Plan</DialogTitle>
            <DialogDescription>
              Select the plan that works best for your needs.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            {membershipTiers.map(tier => (
              <div 
                key={tier.id}
                onClick={() => selectTier(tier)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  tier.recommended ? 'border-claw-blue-300 ring-2 ring-claw-blue-200' : 'border-gray-200 hover:border-claw-blue-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{tier.name}</h3>
                    <div className="text-sm text-gray-500">{tier.price === 0 ? 'Free forever' : `$${tier.price} ${tier.billing}`}</div>
                  </div>
                  {user?.membershipTier === tier.id && (
                    <span className="text-xs bg-claw-blue-100 text-claw-blue-700 px-2 py-1 rounded">Current</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              Select your preferred payment method
            </DialogDescription>
          </DialogHeader>
          
          {selectedTier && (
            <div className="my-4 border-b pb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Plan</span>
                <span className="font-medium">{selectedTier.name}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Billing</span>
                <span className="font-medium">{selectedTier.billing}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold mt-3">
                <span>Total</span>
                <span>${selectedTier.price}</span>
              </div>
            </div>
          )}
          
          <div className="space-y-3 my-4">
            <h4 className="text-sm font-medium">Payment Method</h4>
            {paymentMethods.map(method => (
              <div 
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`p-3 border rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                  selectedPayment === method.id ? 'border-claw-blue-300 bg-claw-blue-50' : 'border-gray-200 hover:border-claw-blue-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{method.icon}</span>
                  <span>{method.name}</span>
                </div>
                {selectedPayment === method.id && <Check size={18} className="text-claw-blue-500" />}
              </div>
            ))}
          </div>
          
          <div className="flex justify-end gap-3 mt-4">
            <button 
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
              onClick={() => setPaymentDialogOpen(false)}
            >
              Cancel
            </button>
            <button 
              className={`px-4 py-2 rounded-md bg-claw-blue-500 text-white ${
                !selectedPayment || isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-claw-blue-600'
              }`}
              disabled={!selectedPayment || isProcessing}
              onClick={() => selectedTier && selectedPayment && processMembershipPurchase(selectedTier, selectedPayment)}
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MembershipStore;
