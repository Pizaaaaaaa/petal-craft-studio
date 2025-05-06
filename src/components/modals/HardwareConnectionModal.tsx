
import React, { useEffect, useState } from 'react';
import { X, Bluetooth, Wifi, Usb, Cable } from 'lucide-react';
import { useHardwareConnection } from '../../contexts/HardwareConnectionContext';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

type ConnectionMethod = 'bluetooth' | 'wifi' | 'usb' | 'cable';

const HardwareConnectionModal: React.FC = () => {
  const { 
    isConnected, 
    isConnecting, 
    connectionError, 
    showConnectionModal, 
    setShowConnectionModal,
    connectToHardware,
    availableModels,
    selectedModel,
    setSelectedModel
  } = useHardwareConnection();
  
  const [deviceList, setDeviceList] = useState<string[]>([]);
  const [connectionMethod, setConnectionMethod] = useState<ConnectionMethod>('bluetooth');
  
  // Mock device scan
  useEffect(() => {
    if (showConnectionModal) {
      setTimeout(() => {
        setDeviceList(availableModels);
        if (availableModels.length > 0 && !selectedModel) {
          setSelectedModel(availableModels[0]);
        }
      }, 1500);
    }
  }, [showConnectionModal, availableModels, selectedModel, setSelectedModel]);
  
  const handleConnect = () => {
    if (selectedModel) {
      connectToHardware(connectionMethod);
    }
  };
  
  const handleSkip = () => {
    setShowConnectionModal(false);
  };

  const renderConnectionIcon = () => {
    switch (connectionMethod) {
      case 'bluetooth':
        return <Bluetooth size={32} className="text-claw-blue-500" />;
      case 'wifi':
        return <Wifi size={32} className="text-claw-blue-500" />;
      case 'usb':
        return <Usb size={32} className="text-claw-blue-500" />;
      case 'cable':
        return <Cable size={32} className="text-claw-blue-500" />;
      default:
        return <Bluetooth size={32} className="text-claw-blue-500" />;
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <button 
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
          onClick={handleSkip}
        >
          <X size={20} />
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-claw-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {renderConnectionIcon()}
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
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Connection Method</h4>
            <RadioGroup 
              value={connectionMethod} 
              onValueChange={(value) => setConnectionMethod(value as ConnectionMethod)}
              className="grid grid-cols-2 gap-3"
            >
              <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                <RadioGroupItem value="bluetooth" id="bluetooth" />
                <Label htmlFor="bluetooth" className="flex items-center cursor-pointer">
                  <Bluetooth size={18} className="mr-2" />
                  <span>Bluetooth</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                <RadioGroupItem value="wifi" id="wifi" />
                <Label htmlFor="wifi" className="flex items-center cursor-pointer">
                  <Wifi size={18} className="mr-2" />
                  <span>Wi-Fi</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                <RadioGroupItem value="usb" id="usb" />
                <Label htmlFor="usb" className="flex items-center cursor-pointer">
                  <Usb size={18} className="mr-2" />
                  <span>USB</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                <RadioGroupItem value="cable" id="cable" />
                <Label htmlFor="cable" className="flex items-center cursor-pointer">
                  <Cable size={18} className="mr-2" />
                  <span>Cable</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Device</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-claw-blue-300"
              value={selectedModel || ""}
              onChange={(e) => setSelectedModel(e.target.value as any)}
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
              disabled={isConnecting || !selectedModel}
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
