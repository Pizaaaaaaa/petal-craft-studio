
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useHardwareConnection } from '../contexts/HardwareConnectionContext';
import { FileCheck, HardDrive } from 'lucide-react';
import { toast } from 'sonner';

interface DownloadConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectTitle: string;
  requiredMaterials?: string[];
}

const DownloadConfirmDialog: React.FC<DownloadConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  projectTitle,
  requiredMaterials = []
}) => {
  const { isConnected, selectedModel, hardwareStatus } = useHardwareConnection();

  const handleConfirm = () => {
    if (!isConnected || !selectedModel) {
      toast.error("No device connected");
      onClose();
      return;
    }

    onConfirm();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-claw-blue-500" />
            Confirm Download to Device
          </AlertDialogTitle>
          <AlertDialogDescription>
            You are about to download <span className="font-medium text-foreground">{projectTitle}</span> to your knitting device.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-3">
          {/* Device Status */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
              <HardDrive className="h-4 w-4" />
              Device Status
            </h3>

            {isConnected && selectedModel ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Connected Device:</span>
                  <span className="font-medium">{selectedModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Battery Level:</span>
                  <span className="font-medium">{hardwareStatus.batteryLevel}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Temperature:</span>
                  <span className="font-medium">{hardwareStatus.temperature}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Firmware Version:</span>
                  <span className="font-medium">{hardwareStatus.firmwareVersion}</span>
                </div>
              </div>
            ) : (
              <p className="text-amber-600 text-sm">No device connected. Please connect a device first.</p>
            )}
          </div>

          {/* Required Materials */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Required Materials</h3>
            {requiredMaterials && requiredMaterials.length > 0 ? (
              <ul className="space-y-1 text-sm">
                {requiredMaterials.map((material, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-claw-blue-500 rounded-full"></span>
                    <span>{material}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No specific materials required.</p>
            )}
            <p className="mt-3 text-sm text-amber-600">
              Please ensure your device has all required materials loaded before proceeding.
            </p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="bg-claw-blue-500 hover:bg-claw-blue-600"
            disabled={!isConnected}
          >
            Download Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DownloadConfirmDialog;
