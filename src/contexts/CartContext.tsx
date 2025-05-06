
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

// Define cart item type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Define context type
interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, sourceElement?: HTMLElement) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  checkout: (shippingInfo: ShippingInfo, paymentMethod: string) => Promise<boolean>;
  isProcessingPayment: boolean;
}

export interface ShippingInfo {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

// Create context with default values
const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
  checkout: () => Promise.resolve(false),
  isProcessingPayment: false
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load cart from localStorage if available
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, 'quantity'>, sourceElement?: HTMLElement) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // If item already exists, increment quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // If item doesn't exist, add it with quantity 1
        return [...currentItems, { ...item, quantity: 1 }];
      }
    });
    
    // Create animation effect if source element is provided
    if (sourceElement) {
      createCartAnimation(sourceElement, item.image);
    }
    
    toast("Added to cart", {
      description: `${item.name} has been added to your cart`,
      duration: 2000,
    });
  };

  // Function to create the flying image animation
  const createCartAnimation = (sourceElement: HTMLElement, imageUrl: string) => {
    // Get the source button's position
    const sourceRect = sourceElement.getBoundingClientRect();
    
    // Find the cart icon in the DOM
    const cartIcon = document.querySelector('[data-cart-icon]');
    if (!cartIcon) return;
    
    const cartRect = cartIcon.getBoundingClientRect();
    
    // Create the flying image element
    const flyingImage = document.createElement('img');
    flyingImage.src = imageUrl;
    flyingImage.className = 'fixed pointer-events-none rounded-md shadow-md z-50';
    flyingImage.style.width = '50px';
    flyingImage.style.height = '50px';
    flyingImage.style.objectFit = 'cover';
    flyingImage.style.left = `${sourceRect.left + sourceRect.width / 2 - 25}px`;
    flyingImage.style.top = `${sourceRect.top + sourceRect.height / 2 - 25}px`;
    flyingImage.style.transition = 'all 0.8s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
    flyingImage.style.opacity = '1';
    
    // Add the element to the body
    document.body.appendChild(flyingImage);
    
    // Trigger the animation after a small delay
    setTimeout(() => {
      flyingImage.style.left = `${cartRect.left + cartRect.width / 2 - 15}px`;
      flyingImage.style.top = `${cartRect.top + cartRect.height / 2 - 15}px`;
      flyingImage.style.width = '30px';
      flyingImage.style.height = '30px';
      flyingImage.style.opacity = '0.5';
      
      // Add a ping effect to the cart icon
      if (cartIcon instanceof HTMLElement) {
        cartIcon.classList.add('relative');
        const pingElement = document.createElement('span');
        pingElement.className = 'absolute inline-flex h-full w-full rounded-full bg-claw-blue-400 opacity-75 animate-ping';
        cartIcon.appendChild(pingElement);
        
        setTimeout(() => {
          cartIcon.removeChild(pingElement);
        }, 700);
      }
      
      // Remove the flying image after animation
      setTimeout(() => {
        document.body.removeChild(flyingImage);
      }, 800);
    }, 50);
  };

  const removeItem = (itemId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
    
    toast("Item removed", {
      description: "Item has been removed from your cart",
      duration: 2000,
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(currentItems => 
      currentItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Simulate checkout process
  const checkout = async (shippingInfo: ShippingInfo, paymentMethod: string): Promise<boolean> => {
    setIsProcessingPayment(true);
    
    try {
      // Simulating network request
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment (in a real app, this would be an API call to payment processor)
      const isSuccessful = Math.random() > 0.1; // 90% success rate for demo purposes
      
      if (isSuccessful) {
        clearCart();
        return true;
      } else {
        toast.error("Payment failed", {
          description: "There was an error processing your payment. Please try again.",
        });
        return false;
      }
    } catch (error) {
      toast.error("Payment failed", {
        description: "There was an error processing your payment. Please try again.",
      });
      return false;
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    checkout,
    isProcessingPayment
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
