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
      { id: 'clothes-a', name: 'Template A', image: 'public/lovable-uploads/2cea61ef-645a-4b72-91cb-0d402b9d431a.png' },
      { id: 'clothes-b', name: 'Template B', image: 'public/lovable-uploads/005820bb-f3b1-4537-b84d-98b771e922be.png' },
      { id: 'clothes-c', name: 'Template C', image: 'public/lovable-uploads/996efb21-4ce3-4701-8184-d653eed5cab9.png' },
      { id: 'clothes-d', name: 'Template D', image: 'public/lovable-uploads/3c0d4d0a-1df5-4656-bbb7-f1bf432a9e61.png' },
    ]
  },
  {
    id: 'scarves',
    name: 'Scarves',
    templates: [
      { id: 'scarves-a', name: 'Template A', image: 'public/lovable-uploads/17adc731-1692-4ec1-8987-edb17ba59739.png' },
      { id: 'scarves-b', name: 'Template B', image: 'public/lovable-uploads/14e74b0b-d052-4d01-bd14-8ed882290663.png' },
      { id: 'scarves-c', name: 'Template C', image: 'public/lovable-uploads/9bae2afc-6de5-40e3-b7a5-8c2a0589ba3b.png' },
      { id: 'scarves-d', name: 'Template D', image: 'public/lovable-uploads/3ef51248-a77a-46ba-801e-9f22f8234738.png' },
    ]
  },
  {
    id: 'hats',
    name: 'Hats',
    templates: [
      { id: 'hats-a', name: 'Template A', image: 'public/lovable-uploads/3c33bc51-2937-49ab-9954-d817fb782231.png' },
      { id: 'hats-b', name: 'Template B', image: 'public/lovable-uploads/340c2625-cda5-46de-ad69-c9a1cfac2ccc.png' },
      { id: 'hats-c', name: 'Template C', image: 'public/lovable-uploads/b4e73852-1b3a-4f17-8980-d9db5c67ffbb.png' },
      { id: 'hats-d', name: 'Template D', image: 'public/lovable-uploads/2b7becf0-a65c-4506-afdc-58f708496df8.png' },
    ]
  },
  {
    id: 'socks',
    name: 'Socks',
    templates: [
      { id: 'socks-a', name: 'Template A', image: 'public/lovable-uploads/dd0d4f4d-6c53-406c-a248-47d6a8cb3bc8.png' },
      { id: 'socks-b', name: 'Template B', image: 'public/lovable-uploads/07b87f0e-09cb-4469-9651-d9e7bd9f4416.png' },
      { id: 'socks-c', name: 'Template C', image: 'public/lovable-uploads/0d06caab-4d27-4e84-b501-d008e2d277ba.png' },
      { id: 'socks-d', name: 'Template D', image: 'public/lovable-uploads/44517033-5aa0-465a-904c-b48bf3fea84d.png' },
    ]
  },
  {
    id: 'gloves',
    name: 'Gloves',
    templates: [
      { id: 'gloves-a', name: 'Template A', image: 'public/lovable-uploads/d5ad8c98-8048-43aa-b884-9f36180a4407.png' },
      { id: 'gloves-b', name: 'Template B', image: 'public/lovable-uploads/d5ad8c98-8048-43aa-b884-9f36180a4407.png' },
      { id: 'gloves-c', name: 'Template C', image: 'public/lovable-uploads/d5ad8c98-8048-43aa-b884-9f36180a4407.png' },
      { id: 'gloves-d', name: 'Template D', image: 'public/lovable-uploads/d5ad8c98-8048-43aa-b884-9f36180a4407.png' },
    ]
  },
  {
    id: 'bags',
    name: 'Bags',
    templates: [
      { id: 'bags-a', name: 'Template A', image: 'public/lovable-uploads/861d422f-57ff-4c74-8fa7-1b5be8424971.png' },
      { id: 'bags-b', name: 'Template B', image: 'public/lovable-uploads/c5ef5e14-bc51-4a30-b486-9b983f2f926e.png' },
      { id: 'bags-c', name: 'Template C', image: 'public/lovable-uploads/3ce0ab8f-a843-4e45-94d2-05b81ceffd9b.png' },
      { id: 'bags-d', name: 'Template D', image: 'public/lovable-uploads/12b19a45-f9ed-425d-b8e7-67b2aceead8c.png' },
    ]
  },
  {
    id: 'toys',
    name: 'Dolls',
    templates: [
      { id: 'toys-a', name: 'Template A', image: 'public/lovable-uploads/9e2bf774-12fa-40a6-a844-a7d2c308ddb5.png' },
      { id: 'toys-b', name: 'Template B', image: 'public/lovable-uploads/9e2bf774-12fa-40a6-a844-a7d2c308ddb5.png' },
      { id: 'toys-c', name: 'Template C', image: 'public/lovable-uploads/9e2bf774-12fa-40a6-a844-a7d2c308ddb5.png' },
      { id: 'toys-d', name: 'Template D', image: 'public/lovable-uploads/9e2bf774-12fa-40a6-a844-a7d2c308ddb5.png' },
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
  
  // Get required materials based on selected template
  const getRequiredMaterials = () => {
    if (!selectedTemplate || !selectedCategory) return [];
    
    // Define some sample materials based on category type
    const categoryId = selectedTemplate.split('-')[0];
    
    const materialsMap: Record<string, string[]> = {
      'clothes': ['Wool yarn - 800g', 'Cotton yarn - 200g', 'Knitting needles - size 5mm', 'Stitch markers'],
      'scarves': ['Medium weight yarn - 400g', 'Knitting needles - size 6mm', 'Yarn needle'],
      'hats': ['Medium weight yarn - 200g', 'Double pointed needles - size 4mm', 'Stitch markers', 'Yarn needle'],
      'socks': ['Sock weight yarn - 100g', 'Double pointed needles - size 2.5mm', 'Stitch markers', 'Yarn needle'],
      'gloves': ['Fine weight yarn - 150g', 'Double pointed needles - size 3mm', 'Stitch markers', 'Yarn needle'],
      'bags': ['Heavy weight yarn - 300g', 'Knitting needles - size 8mm', 'Lining fabric - 50x50cm'],
      'toys': ['Medium weight yarn - 200g', 'Stuffing material - 100g', 'Safety eyes - 2pcs', 'Yarn needle']
    };
    
    return materialsMap[categoryId] || [];
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
        requiredMaterials={getRequiredMaterials()}
      />
    </div>
  );
};

export default TemplateSelectionModal;
