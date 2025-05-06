
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useHardwareConnection } from '../../contexts/HardwareConnectionContext';

const HardwareConnectionModal: React.FC = () => {
  const { 
    isConnected, 
    isConnecting, 
    connectionError, 
    showConnectionModal, 
    setShowConnectionModal,
    connectToHardware
  } = useHardwareConnection();
  
  const [deviceList, setDeviceList] = useState<string[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  
  // Mock device scan
  useEffect(() => {
    if (showConnectionModal) {
      const mockDevices = [
        'ClawLab Yarn Spinning Machine',
        'ClawLab Smart Knitting Machine',
        'ClawLab Pattern Printer'
      ];
      
      setTimeout(() => {
        setDeviceList(mockDevices);
        if (mockDevices.length > 0) {
          setSelectedDevice(mockDevices[0]);
        }
      }, 1500);
    }
  }, [showConnectionModal]);
  
  const handleConnect = () => {
    if (selectedDevice) {
      connectToHardware();
    }
  };
  
  const handleSkip = () => {
    setShowConnectionModal(false);
  };
  
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${showConnectionModal ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity bg-black/50`}>
      <div className="relative w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <button 
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
          onClick={handleSkip}
        >
          <X size={20} />
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-claw-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-claw-blue-500">
              <path d="M6 3v12"></path>
              <path d="M18 3v12"></path>
              <path d="M6 15h12"></path>
              <path d="M3 10h3"></path>
              <path d="M15 10h3"></path>
              <path d="M6 8h.01"></path>
              <path d="M18 8h.01"></path>
            </svg>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800">Connect Hardware Device</h3>
          <p className="text-gray-600 mt-1">Connect to your ClawLab textile device</p>
        </div>
        
        {connectionError && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <p>{connectionError}</p>
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Device</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-claw-blue-300"
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              disabled={isConnecting || deviceList.length === 0}
            >
              {deviceList.length === 0 ? (
                <option>Scanning for devices...</option>
              ) : (
                deviceList.map(device => (
                  <option key={device} value={device}>{device}</option>
                ))
              )}
            </select>
          </div>
          
          <div className="flex gap-3">
            <button
              className="claw-secondary-button flex-1"
              onClick={handleSkip}
            >
              Skip for Now
            </button>
            
            <button
              className="claw-button flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleConnect}
              disabled={isConnecting || !selectedDevice}
            >
              {isConnecting ? 'Connecting...' : isConnected ? 'Connected' : 'Connect'}
            </button>
          </div>
          
          <p className="text-center text-xs text-gray-500 mt-4">
            You can connect your device anytime in the Hardware Settings menu
          </p>
        </div>
      </div>
    </div>
  );
};

export default HardwareConnectionModal;
