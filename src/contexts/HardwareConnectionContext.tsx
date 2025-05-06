
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Define available hardware models
export type HardwareModel = 'ClawLab Yarn Spinner' | 'ClawLab Smart Knitter' | 'ClawLab Pattern Printer';

// Define hardware parameters
export interface HardwareParameters {
  speed: number;
  temperature: number;
  tension: number;
}

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
  availableModels: HardwareModel[];
  selectedModel: HardwareModel | null;
  setSelectedModel: (model: HardwareModel) => void;
  hardwareParameters: HardwareParameters;
  updateHardwareParameter: (param: keyof HardwareParameters, value: number) => void;
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
  
  // Hardware models and parameters
  const availableModels: HardwareModel[] = ['ClawLab Yarn Spinner', 'ClawLab Smart Knitter', 'ClawLab Pattern Printer'];
  const [selectedModel, setSelectedModel] = useState<HardwareModel | null>(null);
  const [hardwareParameters, setHardwareParameters] = useState<HardwareParameters>({
    speed: 50,
    temperature: 120,
    tension: 30
  });

  const updateHardwareParameter = (param: keyof HardwareParameters, value: number): void => {
    setHardwareParameters(prev => ({
      ...prev,
      [param]: value
    }));
    
    if (isConnected) {
      // Simulate sending parameter to hardware
      toast.success(`Updated ${param} to ${value}`);
    }
  };

  // Mock connection function
  const connectToHardware = async (): Promise<void> => {
    if (!selectedModel) {
      toast.error('Please select a hardware model');
      return;
    }
    
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
        toast.success(`Successfully connected to ${selectedModel}!`);
        // The modal will be automatically closed by the useEffect in HardwareConnectionModal
      } else {
        throw new Error(`Could not establish a connection with ${selectedModel}.`);
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
    availableModels,
    selectedModel,
    setSelectedModel,
    hardwareParameters,
    updateHardwareParameter
  };

  return (
    <HardwareConnectionContext.Provider value={value}>
      {children}
    </HardwareConnectionContext.Provider>
  );
};
