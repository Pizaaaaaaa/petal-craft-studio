
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Check, ShoppingCart } from 'lucide-react';

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
  }
];

const MembershipPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'membership' | 'shop'>('membership');
  const [cart, setCart] = useState<{id: string, quantity: number}[]>([]);
  
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
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Membership & Shop</h1>
        <p className="text-gray-600 mt-1">Enhance your knitting experience with premium features and supplies</p>
      </div>
      
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${selectedTab === 'membership' ? 'text-claw-blue-500 border-b-2 border-claw-blue-500' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setSelectedTab('membership')}
        >
          ClawLab Membership
        </button>
        <button
          className={`px-4 py-2 font-medium ${selectedTab === 'shop' ? 'text-claw-blue-500 border-b-2 border-claw-blue-500' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setSelectedTab('shop')}
        >
          Yarn Shop
        </button>
      </div>
      
      {selectedTab === 'membership' && (
        <div>
          {isAuthenticated && user?.isMember && user?.membershipTier && (
            <div className="claw-card p-6 mb-6 border-claw-blue-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-claw-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-claw-blue-500">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Current Membership: {user.membershipTier.charAt(0).toUpperCase() + user.membershipTier.slice(1)}</h3>
                  {user.membershipExpiryDate && (
                    <p className="text-gray-600">Expires on: {user.membershipExpiryDate.toLocaleDateString()}</p>
                  )}
                  <button className="claw-secondary-button mt-4">Manage Subscription</button>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membershipTiers.map(tier => (
              <div key={tier.id} className={`claw-card overflow-hidden ${tier.recommended ? 'border-claw-blue-300 ring-2 ring-claw-blue-200' : ''}`}>
                {tier.recommended && (
                  <div className="bg-claw-blue-500 text-white py-1 text-xs font-medium text-center">
                    RECOMMENDED
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-medium">{tier.name}</h3>
                  
                  <div className="my-4">
                    <span className="text-3xl font-bold">${tier.price}</span>
                    <span className="text-gray-600 ml-1">{tier.billing}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check size={18} className="text-claw-blue-500 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    className={`w-full py-2 rounded-lg font-medium ${
                      tier.id === 'basic' 
                        ? 'bg-claw-gray-200 hover:bg-claw-gray-300 text-gray-700' 
                        : 'claw-button'
                    }`}
                  >
                    {tier.id === 'basic' ? 'Current Plan' : `Get ${tier.name}`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {selectedTab === 'shop' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Yarn Supplies</h2>
            
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-claw-blue-50 hover:bg-claw-blue-100 text-claw-blue-500">
              <ShoppingCart size={18} />
              <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shopItems.map(item => (
              <div key={item.id} className="claw-card overflow-hidden">
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
                        ? 'claw-button' 
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
      )}
    </div>
  );
};

export default MembershipPage;
