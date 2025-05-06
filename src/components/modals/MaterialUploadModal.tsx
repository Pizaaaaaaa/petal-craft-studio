
import React, { useState } from 'react';
import { X, Upload, FileUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
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
    
    // Here we would typically upload the file to a server
    // For now, we'll just simulate success
    toast.success(`Material "${materialName}" uploaded successfully!`);
    onClose();
    // In a real app, you might navigate to the material detail page or editor
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
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
            onClick={() => document.getElementById('fileInput')?.click()}
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
              />
            </div>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!selectedFile || !materialName.trim()}
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                selectedFile && materialName.trim()
                  ? 'bg-claw-blue-500 text-white hover:bg-claw-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Upload size={16} />
              Upload Material
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MaterialUploadModal;
