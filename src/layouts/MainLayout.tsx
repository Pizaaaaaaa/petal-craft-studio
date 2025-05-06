
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ClawSidebar from '../components/ClawSidebar';
import { useHardwareConnection } from '../contexts/HardwareConnectionContext';
import HardwareConnectionModal from '../components/modals/HardwareConnectionModal';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const { isConnected, showConnectionModal, setShowConnectionModal } = useHardwareConnection();
  
  // Check if this is the user's first visit
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      setShowConnectionModal(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, [setShowConnectionModal]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <ClawSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 flex items-center justify-end h-14 px-4 border-b bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${isConnected ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`} />
              <span className="text-sm font-medium">
                {isConnected ? 'Hardware Connected' : 'Not Connected'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto py-6 px-4 md:px-6">
          <Outlet />
        </div>
      </main>
      
      {showConnectionModal && <HardwareConnectionModal />}
    </div>
  );
};

export default MainLayout;
