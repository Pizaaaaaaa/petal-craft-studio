
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Star, Check } from 'lucide-react';

const MembershipStore: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold">ClawLab Membership</h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Unlock premium features and patterns to enhance your crafting experience
        </p>
      </div>
      
      {/* Featured Banner with membership-banner class */}
      <div className="membership-banner bg-gradient-to-r from-claw-blue-400 to-claw-blue-500 rounded-xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('/placeholder.svg')] bg-no-repeat bg-right opacity-10"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <h2 className="text-2xl font-bold mb-2">Get 20% off on Annual Membership</h2>
            <p className="text-white/90">Limited time offer. Experience all premium features at a special price.</p>
          </div>
          
          <div className="flex gap-4">
            <button className="claw-button bg-white text-claw-blue-500 border border-white hover:bg-white/90">
              Learn More
            </button>
            <button className="claw-button bg-transparent border border-white hover:bg-white/10">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Membership Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Plan */}
        <div className={`claw-card p-6 ${selectedPlan === 'basic' ? 'border-2 border-claw-blue-500' : ''}`}>
          <h3 className="text-xl font-semibold mb-2">Basic</h3>
          <p className="text-gray-500">Free</p>
          <p className="text-sm text-gray-600 mt-2">
            Access to a limited selection of patterns and tutorials.
          </p>
          <Button 
            variant="secondary" 
            className="mt-4 w-full"
            onClick={() => handlePlanSelection('basic')}
          >
            {selectedPlan === 'basic' ? <Check className="mr-2 h-4 w-4" /> : 'Choose Plan'}
          </Button>
        </div>
        
        {/* Premium Plan */}
        <div className={`claw-card p-6 ${selectedPlan === 'premium' ? 'border-2 border-claw-blue-500' : ''}`}>
          <div className="flex items-center gap-1 mb-2">
            <Star className="text-yellow-500 h-5 w-5" />
            <h3 className="text-xl font-semibold">Premium</h3>
          </div>
          <p className="text-gray-500">$9.99/month</p>
          <p className="text-sm text-gray-600 mt-2">
            Unlimited access to all patterns, tutorials, and exclusive content.
          </p>
          <Button 
            className="mt-4 w-full"
            onClick={() => handlePlanSelection('premium')}
          >
            {selectedPlan === 'premium' ? <Check className="mr-2 h-4 w-4" /> : 'Choose Plan'}
          </Button>
        </div>
        
        {/* Annual Plan */}
        <div className={`claw-card p-6 ${selectedPlan === 'annual' ? 'border-2 border-claw-blue-500' : ''}`}>
          <div className="flex items-center gap-1 mb-2">
            <Star className="text-yellow-500 h-5 w-5" />
            <Star className="text-yellow-500 h-5 w-5" />
            <h3 className="text-xl font-semibold">Annual</h3>
          </div>
          <p className="text-gray-500">$99.99/year</p>
          <p className="text-sm text-gray-600 mt-2">
            Best value! Enjoy a full year of premium access at a discounted rate.
          </p>
          <Button 
            className="mt-4 w-full"
            onClick={() => handlePlanSelection('annual')}
          >
            {selectedPlan === 'annual' ? <Check className="mr-2 h-4 w-4" /> : 'Choose Plan'}
          </Button>
        </div>
      </div>
      
      {/* Features Comparison */}
      <div className="claw-card p-6">
        <h2 className="text-2xl font-semibold mb-4">Membership Features</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 p-2">Feature</th>
                <th className="border border-gray-200 p-2">Basic</th>
                <th className="border border-gray-200 p-2">Premium</th>
                <th className="border border-gray-200 p-2">Annual</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 p-2">Unlimited Patterns</td>
                <td className="border border-gray-200 p-2">Limited</td>
                <td className="border border-gray-200 p-2"><Check className="text-green-500 mx-auto" /></td>
                <td className="border border-gray-200 p-2"><Check className="text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-2">Exclusive Tutorials</td>
                <td className="border border-gray-200 p-2">No</td>
                <td className="border border-gray-200 p-2"><Check className="text-green-500 mx-auto" /></td>
                <td className="border border-gray-200 p-2"><Check className="text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-2">Priority Support</td>
                <td className="border border-gray-200 p-2">No</td>
                <td className="border border-gray-200 p-2"><Check className="text-green-500 mx-auto" /></td>
                <td className="border border-gray-200 p-2"><Check className="text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-2">Ad-Free Experience</td>
                <td className="border border-gray-200 p-2">No</td>
                <td className="border border-gray-200 p-2"><Check className="text-green-500 mx-auto" /></td>
                <td className="border border-gray-200 p-2"><Check className="text-green-500 mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="claw-card p-6">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">What are the benefits of a premium membership?</h4>
            <p className="text-gray-600">Premium members get unlimited access to all patterns and tutorials, exclusive content, priority support, and an ad-free experience.</p>
          </div>
          <div>
            <h4 className="font-semibold">How do I cancel my subscription?</h4>
            <p className="text-gray-600">You can cancel your subscription at any time from your account settings. Your access will continue until the end of the current billing period.</p>
          </div>
          <div>
            <h4 className="font-semibold">Can I switch between plans?</h4>
            <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing period.</p>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Join ClawLab's premium membership today and unlock your full crafting potential!
        </p>
        <Button className="px-8 py-3">
          Explore Premium Plans <ChevronRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MembershipStore;
