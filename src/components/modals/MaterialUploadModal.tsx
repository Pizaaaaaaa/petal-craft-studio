
import React, { useState } from 'react';
import { X, Upload, FileUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface MaterialUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MaterialUploadModal: React.FC<MaterialUploadModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [materialName, setMaterialName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please select an image file (JPG, PNG, or SVG)');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }
    
    setSelectedFile(file);
    // Extract filename without extension as default material name
    const fileName = file.name.split('.')[0];
    setMaterialName(fileName);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }
    
    if (!materialName.trim()) {
      toast.error('Please enter a name for your material');
      return;
    }
    
    // Simulate upload process
    setIsLoading(true);
    
    // Simulate progress updates
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsLoading(false);
        toast.success(`Material "${materialName}" uploaded successfully!`);
        onClose();
        // In a real app, you might navigate to the material detail page
        // navigate('/my-works');
        
        // Reset state for next upload
        setSelectedFile(null);
        setMaterialName('');
        setUploadProgress(0);
      }
    }, 300);
  };
  
  const handleCancel = () => {
    if (isLoading) {
      toast.info("Upload in progress, please wait");
      return;
    }
    
    // Confirm if there's a file selected
    if (selectedFile && !isLoading) {
      if (window.confirm("Are you sure you want to cancel this upload?")) {
        onClose();
        setSelectedFile(null);
        setMaterialName('');
      }
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload New Material</DialogTitle>
          <DialogDescription>
            Upload patterns, textures, and other materials for your knitting projects
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              dragActive ? 'border-claw-blue-500 bg-claw-blue-50' : 'border-gray-300 hover:border-claw-blue-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => !isLoading && document.getElementById('fileInput')?.click()}
          >
            {selectedFile ? (
              <div className="space-y-2">
                <div className="w-24 h-24 mx-auto bg-claw-blue-50 rounded-lg flex items-center justify-center overflow-hidden">
                  {selectedFile.type.startsWith('image/') && (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                </div>
                <p className="text-sm text-gray-600">{selectedFile.name}</p>
                {!isLoading && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-16 h-16 mx-auto bg-claw-blue-100 rounded-full flex items-center justify-center">
                  <FileUp className="h-8 w-8 text-claw-blue-500" />
                </div>
                <p className="text-gray-700">Drag and drop or click to upload</p>
                <p className="text-xs text-gray-500">Supports JPG, PNG, SVG (max 5MB)</p>
              </div>
            )}
            <input
              id="fileInput"
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/svg+xml"
              onChange={handleFileChange}
              disabled={isLoading}
            />
          </div>

          {selectedFile && (
            <div className="mt-4">
              <label htmlFor="materialName" className="block text-sm font-medium text-gray-700 mb-1">
                Material Name
              </label>
              <input
                id="materialName"
                type="text"
                value={materialName}
                onChange={(e) => setMaterialName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-claw-blue-300"
                placeholder="Enter material name"
                disabled={isLoading}
              />
            </div>
          )}

          {isLoading && (
            <div className="mt-4">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-claw-blue-500 transition-all duration-300 ease-in-out"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-center text-gray-500 mt-1">Uploading... {uploadProgress}%</p>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || !materialName.trim() || isLoading}
              className="flex items-center gap-2"
            >
              <Upload size={16} />
              {isLoading ? "Uploading..." : "Upload Material"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MaterialUploadModal;
