
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ClawSidebar from '../components/ClawSidebar';
import { useHardwareConnection } from '../contexts/HardwareConnectionContext';
import HardwareConnectionModal from '../components/modals/HardwareConnectionModal';
import NewVersionBadge from '../components/NewVersionBadge';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isConnected, showConnectionModal } = useHardwareConnection();
  
  const handleConnectionStatusClick = () => {
    navigate('/hardware-settings');
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      <ClawSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 flex items-center justify-end h-14 px-4 border-b bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div 
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${isConnected ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'} cursor-pointer hover:opacity-80 transition-opacity`}
              onClick={handleConnectionStatusClick}
              title="Go to hardware settings"
            >
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
      
      {/* New version badge placed with lower z-index */}
      <div className="absolute bottom-0 left-0">
        <NewVersionBadge />
      </div>
      
      {showConnectionModal && <HardwareConnectionModal />}
    </div>
  );
};

export default MainLayout;
