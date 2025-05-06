import React, { useState } from 'react';
import { X, ChevronRight, Edit, Download } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DownloadConfirmDialog from '../DownloadConfirmDialog';
import { useHardwareConnection } from '../../contexts/HardwareConnectionContext';

interface TemplateCategory {
  id: string;
  name: string;
  templates: Template[];
}

interface Template {
  id: string;
  name: string;
  image: string;
}

const templateCategories: TemplateCategory[] = [
  {
    id: 'clothes',
    name: 'Clothes',
    templates: [
      { id: 'clothes-a', name: 'Template A', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800' },
      { id: 'clothes-b', name: 'Template B', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800' },
      { id: 'clothes-c', name: 'Template C', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800' },
      { id: 'clothes-d', name: 'Template D', image: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?auto=format&fit=crop&q=80&w=800' },
    ]
  },
  {
    id: 'scarves',
    name: 'Scarves',
    templates: [
      { id: 'scarves-a', name: 'Template A', image: 'https://images.unsplash.com/photo-1611676279444-5577698aa13c?auto=format&fit=crop&q=80&w=800' },
      { id: 'scarves-b', name: 'Template B', image: 'https://images.unsplash.com/photo-1512089425728-b12f1321ca5c?auto=format&fit=crop&q=80&w=800' },
      { id: 'scarves-c', name: 'Template C', image: 'https://images.unsplash.com/photo-1566839670464-2b448e80667b?auto=format&fit=crop&q=80&w=800' },
      { id: 'scarves-d', name: 'Template D', image: 'https://images.unsplash.com/photo-1584722155177-75ec0c2626f4?auto=format&fit=crop&q=80&w=800' },
    ]
  },
  {
    id: 'hats',
    name: 'Hats',
    templates: [
      { id: 'hats-a', name: 'Template A', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800' },
      { id: 'hats-b', name: 'Template B', image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800' },
      { id: 'hats-c', name: 'Template C', image: 'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?auto=format&fit=crop&q=80&w=800' },
      { id: 'hats-d', name: 'Template D', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&q=80&w=800' },
    ]
  },
  {
    id: 'socks',
    name: 'Socks',
    templates: [
      { id: 'socks-a', name: 'Template A', image: 'https://images.unsplash.com/photo-1586350977771-2dbe4fae8d39?auto=format&fit=crop&q=80&w=800' },
      { id: 'socks-b', name: 'Template B', image: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&q=80&w=800' },
      { id: 'socks-c', name: 'Template C', image: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&q=80&w=800' },
      { id: 'socks-d', name: 'Template D', image: 'https://images.unsplash.com/photo-1580910951866-76f8db99acce?auto=format&fit=crop&q=80&w=800' },
    ]
  },
  {
    id: 'gloves',
    name: 'Gloves',
    templates: [
      { id: 'gloves-a', name: 'Template A', image: 'https://images.unsplash.com/photo-1512604151067-557a4eba21c9?auto=format&fit=crop&q=80&w=800' },
      { id: 'gloves-b', name: 'Template B', image: 'https://images.unsplash.com/photo-1565677913671-ce5c0e9b7f?auto=format&fit=crop&q=80&w=800' },
      { id: 'gloves-c', name: 'Template C', image: 'https://images.unsplash.com/photo-1499952748986-01abb469a8d5?auto=format&fit=crop&q=80&w=800' },
      { id: 'gloves-d', name: 'Template D', image: 'https://images.unsplash.com/photo-1574314810775-a27e5ee6d178?auto=format&fit=crop&q=80&w=800' },
    ]
  },
  {
    id: 'bags',
    name: 'Bags',
    templates: [
      { id: 'bags-a', name: 'Template A', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800' },
      { id: 'bags-b', name: 'Template B', image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&q=80&w=800' },
      { id: 'bags-c', name: 'Template C', image: 'https://images.unsplash.com/photo-1596149615493-f0739de31c2d?auto=format&fit=crop&q=80&w=800' },
      { id: 'bags-d', name: 'Template D', image: 'https://images.unsplash.com/photo-1629199012539-cae769542ec1?auto=format&fit=crop&q=80&w=800' },
    ]
  },
  {
    id: 'toys',
    name: 'Dolls',
    templates: [
      { id: 'toys-a', name: 'Template A', image: 'https://images.unsplash.com/photo-1556012018-50c5c0da73bf?auto=format&fit=crop&q=80&w=800' },
      { id: 'toys-b', name: 'Template B', image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800' },
      { id: 'toys-c', name: 'Template C', image: 'https://images.unsplash.com/photo-1648162392092-ecc1145a33c9?auto=format&fit=crop&q=80&w=800' },
      { id: 'toys-d', name: 'Template D', image: 'https://images.unsplash.com/photo-1658398088322-d4c3fb7e02a1?auto=format&fit=crop&q=80&w=800' },
    ]
  }
];

interface TemplateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TemplateSelectionModal: React.FC<TemplateSelectionModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | null>(null);
  const [isTransferring, setIsTransferring] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const { isConnected, showConnectionModal, setShowConnectionModal, selectedModel } = useHardwareConnection();
  const navigate = useNavigate();
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };
  
  const handleSendToHardware = () => {
    if (!selectedTemplate) return;
    
    if (!isConnected) {
      toast.error("No device connected");
      setShowConnectionModal(true);
      return;
    }
    
    setDownloadDialogOpen(true);
  };
  
  const handleDownloadConfirm = () => {
    if (!selectedTemplate || !selectedModel) return;
    
    // Simulate sending template to hardware
    setIsTransferring(true);
    
    setTimeout(() => {
      setIsTransferring(false);
      toast.success(`Successfully sent template to ${selectedModel}`, {
        description: 'You can check the execution status on your hardware device'
      });
      onClose();
    }, 1500);
  };
  
  const handleEdit = () => {
    if (!selectedTemplate) return;
    
    // Extract the category ID and template ID
    const categoryId = selectedTemplate.split('-')[0];
    
    // Navigate to editor with the template ID
    navigate(`/editor/new/${categoryId}`);
    onClose();
  };

  // Find template name based on selected template id
  const getSelectedTemplateName = () => {
    if (!selectedTemplate || !selectedCategory) return "Template";
    
    const template = selectedCategory.templates.find(t => t.id === selectedTemplate);
    return template ? `${selectedCategory.name} - ${template.name}` : "Template";
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-medium">
            {selectedCategory ? `Select ${selectedCategory.name} Template` : 'Select Template Category'}
          </h2>
          <button 
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="overflow-y-auto p-4 flex-1">
          {!selectedCategory ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {templateCategories.map(category => (
                <div
                  key={category.id}
                  className="claw-card p-4 cursor-pointer hover:-translate-y-1 transition-transform"
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className="aspect-square bg-claw-blue-50 rounded-lg mb-3 overflow-hidden">
                    <img 
                      src={category.templates[0].image} 
                      alt={category.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{category.name}</h3>
                    <ChevronRight size={18} className="text-claw-blue-500" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <button 
                className="mb-4 flex items-center text-claw-blue-500 hover:underline"
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedTemplate(null);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Categories
              </button>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {selectedCategory.templates.map(template => (
                  <div
                    key={template.id}
                    className={`claw-card overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform ${
                      selectedTemplate === template.id ? 'ring-2 ring-claw-blue-500' : ''
                    }`}
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={template.image} 
                        alt={template.name} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">{template.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t p-4 flex justify-end gap-2">
          <button 
            className="claw-secondary-button"
            onClick={onClose}
          >
            Cancel
          </button>
          
          {selectedTemplate && !isTransferring && (
            <>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleEdit}
              >
                <Edit size={18} />
                Edit
              </Button>
              
              <Button
                variant="default"
                className="flex items-center gap-2"
                onClick={handleSendToHardware}
              >
                <Download size={18} />
                Send to Hardware
              </Button>
            </>
          )}
          
          {isTransferring && (
            <button 
              className="claw-button flex items-center"
              disabled
            >
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Transferring...
            </button>
          )}
        </div>
      </div>
      
      {/* Add Download Confirm Dialog */}
      <DownloadConfirmDialog
        isOpen={downloadDialogOpen}
        onClose={() => setDownloadDialogOpen(false)}
        onConfirm={handleDownloadConfirm}
        projectTitle={getSelectedTemplateName()}
        requiredMaterials={[]}  // Templates don't have specific materials listed
      />
    </div>
  );
};

export default TemplateSelectionModal;
