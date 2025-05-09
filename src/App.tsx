
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/Home';
import MyWorksPage from './pages/MyWorks';
import HelpPage from './pages/Help';
import HardwareSettingsPage from './pages/HardwareSettings';
import ProfilePage from './pages/Profile';
import EditorPage from './pages/Editor';
import ProjectDetailsPage from './pages/ProjectDetails';
import UserProfile from './pages/UserProfile';
import MembershipStore from './pages/MembershipStore';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import NotFound from './pages/NotFound';
import TagsPage from './pages/Tags';
import SearchResults from './pages/SearchResults';

// Providers
import { HardwareConnectionProvider } from './contexts/HardwareConnectionContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <CartProvider>
          <HardwareConnectionProvider>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="my-works" element={<MyWorksPage />} />
                <Route path="membership-store" element={<MembershipStore />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="order-confirmation" element={<OrderConfirmation />} />
                <Route path="help" element={<HelpPage />} />
                <Route path="hardware-settings" element={<HardwareSettingsPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="project/:id" element={<ProjectDetailsPage />} />
                <Route path="user/:userId" element={<UserProfile />} />
                <Route path="tags/:tagName" element={<TagsPage />} />
                <Route path="search" element={<SearchResults />} />
              </Route>
              <Route path="/editor/:id" element={<EditorPage />} />
              <Route path="/editor/new/:templateId" element={<EditorPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster position="top-right" />
          </HardwareConnectionProvider>
        </CartProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
