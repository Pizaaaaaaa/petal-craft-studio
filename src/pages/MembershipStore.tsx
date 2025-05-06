import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { Check, ChevronRight, ShoppingCart, X, Star, Badge } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";

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
    detailedBenefits: [
      {
        title: 'Basic Patterns',
        description: 'Access our library of beginner-friendly patterns to start your knitting journey.',
        icon: 'star'
      },
      {
        title: 'Community Access',
        description: 'Join our community forums to share your projects and get advice from fellow knitters.',
        icon: 'users'
      },
      {
        title: '5 Project Limit',
        description: 'Create and save up to 5 projects in your personal workspace.',
        icon: 'bookmark'
      }
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
    detailedBenefits: [
      {
        title: 'Unlimited Patterns',
        description: 'Access our entire library of patterns, including premium and seasonal designs.',
        icon: 'star'
      },
      {
        title: 'Unlimited Projects',
        description: 'Create and save as many projects as you want with no restrictions.',
        icon: 'bookmark'
      },
      {
        title: 'Premium Tools',
        description: 'Use all available yarn brushes and advanced editing tools to perfect your designs.',
        icon: 'badge'
      },
      {
        title: 'Priority Support',
        description: 'Get faster responses from our support team when you need assistance.',
        icon: 'user'
      }
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
    detailedBenefits: [
      {
        title: 'Commercial License',
        description: 'Use our patterns and designs for commercial purposes and sell your creations.',
        icon: 'badge-dollar-sign'
      },
      {
        title: 'Advanced Tools',
        description: 'Access professional-grade editing tools designed for complex pattern creation.',
        icon: 'star'
      },
      {
        title: 'Hardware Priority',
        description: 'Your hardware connections take priority, ensuring minimal wait times.',
        icon: 'badge-check'
      },
      {
        title: 'Early Access',
        description: "Be the first to try new features and tools before they're released to the public.",
        icon: 'gift'
      },
      {
        title: 'Dedicated Support',
        description: 'Get 24/7 dedicated support from our expert team for any issues or questions.',
        icon: 'user-plus'
      }
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
  const { addItem, totalItems } = useCart();
  const [membershipDialogOpen, setMembershipDialogOpen] = useState(false);
  const [benefitsDialogOpen, setBenefitsDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<typeof membershipTiers[0] | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Add item to cart
  const handleAddToCart = (item: typeof shopItems[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
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
  
  // Open benefits dialog for a specific tier
  const openBenefitsDialog = (tier: typeof membershipTiers[0]) => {
    setSelectedTier(tier);
    setBenefitsDialogOpen(true);
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
  
  // Get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'star':
        return <Star size={20} />;
      case 'badge':
        return <Badge size={20} />;
      case 'badge-check':
        return <Check size={20} />;
      case 'users':
        return <Check size={20} />;
      case 'bookmark':
        return <Check size={20} />;
      case 'gift':
        return <Check size={20} />;
      case 'user':
        return <Check size={20} />;
      case 'user-plus':
        return <Check size={20} />;
      case 'badge-dollar-sign':
        return <Check size={20} />;
      default:
        return <Check size={20} />;
    }
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
                <button className="membership-banner-button">
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
          
          <Link to="/cart">
            <button 
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-claw-blue-50 hover:bg-claw-blue-100 text-claw-blue-500"
            >
              <ShoppingCart size={18} />
              <span>{totalItems}</span>
            </button>
          </Link>
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
                  onClick={() => item.inStock && handleAddToCart(item)}
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
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Choose a Membership Plan</DialogTitle>
            <DialogDescription>
              Select the plan that works best for your needs.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 my-4">
            {membershipTiers.map(tier => (
              <Card 
                key={tier.id}
                className={`cursor-pointer transition-all ${
                  tier.recommended ? 'border-claw-blue-300 ring-2 ring-claw-blue-200' : 'hover:border-claw-blue-200'
                }`}
              >
                {tier.recommended && (
                  <div className="bg-claw-blue-500 text-white py-1 text-xs font-medium text-center">
                    RECOMMENDED
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{tier.name}</CardTitle>
                      <CardDescription className="mt-1">${tier.price} {tier.billing}</CardDescription>
                    </div>
                    {user?.membershipTier === tier.id && (
                      <span className="text-xs bg-claw-blue-100 text-claw-blue-700 px-2 py-1 rounded">Current</span>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2">
                    {tier.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={16} className="text-claw-blue-500 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {tier.features.length > 3 && (
                      <Collapsible>
                        <CollapsibleTrigger className="text-sm text-claw-blue-500 hover:underline cursor-pointer flex items-center">
                          Show more features
                          <ChevronRight size={14} className="ml-1 transform rotate-90" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <ul className="space-y-2 mt-2">
                            {tier.features.slice(3).map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check size={16} className="text-claw-blue-500 mt-0.5" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </ul>
                </CardContent>
                
                <CardFooter className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => openBenefitsDialog(tier)}
                  >
                    Learn More
                  </Button>
                  
                  <Button 
                    variant={tier.id !== user?.membershipTier ? "default" : "secondary"}
                    onClick={() => selectTier(tier)}
                    disabled={tier.id === user?.membershipTier}
                  >
                    {tier.id === user?.membershipTier ? 'Current Plan' : `Get ${tier.name}`}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Benefits Detail Dialog */}
      <Dialog open={benefitsDialogOpen} onOpenChange={setBenefitsDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedTier?.name} Plan Benefits</DialogTitle>
            <DialogDescription>
              Detailed overview of what's included in the {selectedTier?.name} membership
            </DialogDescription>
          </DialogHeader>
          
          {selectedTier && (
            <div className="my-6">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">${selectedTier.price} {selectedTier.billing}</h3>
                  <Button 
                    onClick={() => {
                      setBenefitsDialogOpen(false);
                      selectTier(selectedTier);
                    }}
                  >
                    Subscribe Now
                  </Button>
                </div>
                <p className="text-gray-600 mt-2">
                  {selectedTier.id === 'basic' 
                    ? 'Start with our free tier to explore basic knitting capabilities.' 
                    : selectedTier.id === 'premium'
                      ? 'Perfect for hobbyists and enthusiastic knitters looking for more features.'
                      : 'Designed for professional knitters and small businesses.'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {selectedTier.detailedBenefits.map((benefit, idx) => (
                  <div key={idx} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 h-10 w-10 bg-claw-blue-100 rounded-full flex items-center justify-center text-claw-blue-600">
                        {getIconComponent(benefit.icon)}
                      </div>
                      <div>
                        <h4 className="font-medium">{benefit.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedTier.id !== 'basic' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Compare with other plans</h4>
                  <div className="flex overflow-x-auto gap-4 pb-2">
                    {membershipTiers.map(tier => (
                      <div 
                        key={tier.id}
                        className={`flex-shrink-0 w-40 p-3 border rounded-lg ${
                          tier.id === selectedTier.id ? 'bg-claw-blue-50 border-claw-blue-200' : 'bg-white'
                        }`}
                      >
                        <div className="font-medium">{tier.name}</div>
                        <div className="text-sm">${tier.price} {tier.billing}</div>
                        <Button 
                          variant="link" 
                          className="px-0 text-sm h-6" 
                          onClick={() => {
                            setBenefitsDialogOpen(false);
                            setSelectedTier(tier);
                            setTimeout(() => setBenefitsDialogOpen(true), 100);
                          }}
                        >
                          {tier.id === selectedTier.id ? 'Current view' : 'View benefits'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
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
