
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface HardwareConnectionContextType {
  isConnected: boolean;
  isConnecting: boolean;
  connectionError: string | null;
  showConnectionModal: boolean;
  setShowConnectionModal: (show: boolean) => void;
  connectToHardware: () => Promise<void>;
  disconnectHardware: () => void;
  hardwareStatus: {
    batteryLevel: number;
    temperature: number;
    firmwareVersion: string;
    lastUpdated: Date | null;
  };
}

const HardwareConnectionContext = createContext<HardwareConnectionContextType | undefined>(undefined);

export const useHardwareConnection = (): HardwareConnectionContextType => {
  const context = useContext(HardwareConnectionContext);
  if (!context) {
    throw new Error('useHardwareConnection must be used within a HardwareConnectionProvider');
  }
  return context;
};

interface HardwareConnectionProviderProps {
  children: ReactNode;
}

export const HardwareConnectionProvider: React.FC<HardwareConnectionProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [showConnectionModal, setShowConnectionModal] = useState<boolean>(false);
  const [hardwareStatus, setHardwareStatus] = useState({
    batteryLevel: 75,
    temperature: 28,
    firmwareVersion: '1.2.3',
    lastUpdated: null as Date | null
  });

  // Mock connection function
  const connectToHardware = async (): Promise<void> => {
    setIsConnecting(true);
    setConnectionError(null);
    
    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 80% chance of successful connection
      if (Math.random() > 0.2) {
        setIsConnected(true);
        setHardwareStatus({
          ...hardwareStatus,
          lastUpdated: new Date()
        });
        toast.success('Successfully connected to hardware!');
      } else {
        throw new Error('Could not establish a connection with the hardware device.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setConnectionError(errorMessage);
      toast.error(`Connection error: ${errorMessage}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectHardware = (): void => {
    setIsConnected(false);
    toast.info('Hardware disconnected');
  };

  const value = {
    isConnected,
    isConnecting,
    connectionError,
    showConnectionModal,
    setShowConnectionModal,
    connectToHardware,
    disconnectHardware,
    hardwareStatus,
  };

  return (
    <HardwareConnectionContext.Provider value={value}>
      {children}
    </HardwareConnectionContext.Provider>
  );
};
