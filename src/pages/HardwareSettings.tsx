
import React, { useState } from 'react';
import { useHardwareConnection } from '../contexts/HardwareConnectionContext';
import { RefreshCw, Battery, Thermometer, FileCode, Info } from 'lucide-react';

const HardwareSettingsPage: React.FC = () => {
  const { 
    isConnected, 
    isConnecting, 
    connectToHardware, 
    disconnectHardware, 
    hardwareStatus 
  } = useHardwareConnection();
  
  const [selectedTab, setSelectedTab] = useState<'connection' | 'status'>('connection');
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Hardware Settings</h1>
        <p className="text-gray-600 mt-1">Configure and monitor your ClawLab device</p>
      </div>
      
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${selectedTab === 'connection' ? 'text-claw-blue-500 border-b-2 border-claw-blue-500' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setSelectedTab('connection')}
        >
          Connection
        </button>
        <button
          className={`px-4 py-2 font-medium ${selectedTab === 'status' ? 'text-claw-blue-500 border-b-2 border-claw-blue-500' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setSelectedTab('status')}
        >
          Device Status
        </button>
      </div>
      
      {selectedTab === 'connection' && (
        <div className="max-w-2xl">
          <div className="claw-card p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isConnected ? 'bg-green-100' : 'bg-amber-100'}`}>
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`} />
              </div>
              <div>
                <h3 className="text-lg font-medium">Device Connection</h3>
                <p className="text-gray-600">{isConnected ? 'Your device is connected' : 'No device connected'}</p>
              </div>
            </div>
            
            {isConnected ? (
              <button
                className="claw-secondary-button w-full"
                onClick={disconnectHardware}
              >
                Disconnect
              </button>
            ) : (
              <button
                className="claw-button w-full"
                onClick={connectToHardware}
                disabled={isConnecting}
              >
                {isConnecting ? 'Connecting...' : 'Connect to Device'}
              </button>
            )}
          </div>
          
          <div className="claw-card p-6">
            <h3 className="text-lg font-medium mb-4">Connection Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Connection Method</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-claw-blue-300">
                  <option>Bluetooth</option>
                  <option>USB</option>
                  <option>Wi-Fi</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Auto-Connect</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="auto-connect"
                    className="h-4 w-4 text-claw-blue-500 focus:ring-claw-blue-400 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="auto-connect" className="ml-2 block text-sm text-gray-700">
                    Automatically connect when device is detected
                  </label>
                </div>
              </div>
              
              <div className="pt-4">
                <button className="claw-secondary-button">
                  Reset Connection Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {selectedTab === 'status' && (
        <div className={`max-w-2xl ${!isConnected ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Device Information</h3>
            
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-claw-blue-50 text-claw-blue-500 transition-colors">
              <RefreshCw size={16} />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
          
          {isConnected ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="claw-card p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-claw-blue-100 flex items-center justify-center">
                    <Battery size={20} className="text-claw-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Battery Level</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${hardwareStatus.batteryLevel}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{hardwareStatus.batteryLevel}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="claw-card p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-claw-blue-100 flex items-center justify-center">
                    <Thermometer size={20} className="text-claw-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Temperature</h4>
                    <p className="font-medium">{hardwareStatus.temperature}°C</p>
                  </div>
                </div>
              </div>
              
              <div className="claw-card p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-claw-blue-100 flex items-center justify-center">
                    <FileCode size={20} className="text-claw-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Firmware Version</h4>
                    <p className="font-medium">{hardwareStatus.firmwareVersion}</p>
                  </div>
                </div>
              </div>
              
              <div className="claw-card p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-claw-blue-100 flex items-center justify-center">
                    <Info size={20} className="text-claw-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Last Updated</h4>
                    <p className="font-medium">
                      {hardwareStatus.lastUpdated 
                        ? hardwareStatus.lastUpdated.toLocaleString() 
                        : 'Never'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="claw-card p-6 text-center">
              <p className="text-gray-600">Connect to your device to view status information</p>
              <button
                className="claw-button mt-4"
                onClick={connectToHardware}
              >
                Connect to Device
              </button>
            </div>
          )}
          
          <div className="mt-6 claw-card p-6">
            <h3 className="text-lg font-medium mb-4">Firmware Updates</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Current Version: {hardwareStatus.firmwareVersion}</p>
                <p className="text-sm text-gray-600">Latest Version: 1.2.5</p>
              </div>
              
              <button 
                className="claw-button"
                disabled={!isConnected}
              >
                Update Firmware
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HardwareSettingsPage;
