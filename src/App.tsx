
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
import MembershipStore from './pages/MembershipStore';
import NotFound from './pages/NotFound';

// Providers
import { HardwareConnectionProvider } from './contexts/HardwareConnectionContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <HardwareConnectionProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="my-works" element={<MyWorksPage />} />
              <Route path="membership-store" element={<MembershipStore />} />
              <Route path="help" element={<HelpPage />} />
              <Route path="hardware-settings" element={<HardwareSettingsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="project/:id" element={<ProjectDetailsPage />} />
            </Route>
            <Route path="/editor/:id" element={<EditorPage />} />
            <Route path="/editor/new/:templateId" element={<EditorPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster position="top-right" />
        </HardwareConnectionProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
