
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Template categories and templates
const templateCategories = [
  'Clothes', 
  'Scarves', 
  'Hats', 
  'Socks', 
  'Gloves', 
  'Bags', 
  'Toys'
];

const templates = {
  'Clothes': [
    { id: 'c1', name: 'Basic Sweater', image: 'https://images.unsplash.com/photo-1584736328868-fbc30f5efe78?auto=format&fit=crop&q=80&w=400' },
    { id: 'c2', name: 'Cardigan', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=400' },
    { id: 'c3', name: 'Vest', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=400' },
    { id: 'c4', name: 'Tank Top', image: 'https://images.unsplash.com/photo-1516762689871-2d99137621cb?auto=format&fit=crop&q=80&w=400' }
  ],
  'Scarves': [
    { id: 's1', name: 'Basic Scarf', image: 'https://images.unsplash.com/photo-1610288311735-39b7facbd095?auto=format&fit=crop&q=80&w=400' },
    { id: 's2', name: 'Infinity Scarf', image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=400' },
    { id: 's3', name: 'Striped Scarf', image: 'https://images.unsplash.com/photo-1608438400077-59e382491e4f?auto=format&fit=crop&q=80&w=400' },
    { id: 's4', name: 'Textured Scarf', image: 'https://images.unsplash.com/photo-1553814080-765dc87735af?auto=format&fit=crop&q=80&w=400' }
  ],
  'Hats': [
    { id: 'h1', name: 'Beanie', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=400' },
    { id: 'h2', name: 'Beret', image: 'https://images.unsplash.com/photo-1510481296702-5090337e808e?auto=format&fit=crop&q=80&w=400' },
    { id: 'h3', name: 'Pompom Hat', image: 'https://images.unsplash.com/photo-1511500118080-275313ec90a1?auto=format&fit=crop&q=80&w=400' },
    { id: 'h4', name: 'Cable Knit Hat', image: 'https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?auto=format&fit=crop&q=80&w=400' }
  ],
  'Socks': [
    { id: 'so1', name: 'Basic Socks', image: 'https://images.unsplash.com/photo-1586350977771-2dbe4fae8d39?auto=format&fit=crop&q=80&w=400' },
    { id: 'so2', name: 'Ankle Socks', image: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&q=80&w=400' },
    { id: 'so3', name: 'Knee Socks', image: 'https://images.unsplash.com/photo-1597843797221-e34b4a320b97?auto=format&fit=crop&q=80&w=400' },
    { id: 'so4', name: 'Patterned Socks', image: 'https://images.unsplash.com/photo-1512748971662-995fa915dda9?auto=format&fit=crop&q=80&w=400' }
  ],
  'Gloves': [
    { id: 'g1', name: 'Fingerless Gloves', image: 'https://images.unsplash.com/photo-1510757902970-e236dc20b948?auto=format&fit=crop&q=80&w=400' },
    { id: 'g2', name: 'Mittens', image: 'https://images.unsplash.com/photo-1607529129242-5b759eb7b268?auto=format&fit=crop&q=80&w=400' },
    { id: 'g3', name: 'Full Gloves', image: 'https://images.unsplash.com/photo-1545028873-f2a9a359a1ebHmId=4&Fmt=3' },
    { id: 'g4', name: 'Wrist Warmers', image: 'https://images.unsplash.com/photo-1611375397414-cf9832dfdc9a?auto=format&fit=crop&q=80&w=400' }
  ],
  'Bags': [
    { id: 'b1', name: 'Tote Bag', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400' },
    { id: 'b2', name: 'Clutch', image: 'https://images.unsplash.com/photo-1584917865442-de89df41c136?auto=format&fit=crop&q=80&w=400' },
    { id: 'b3', name: 'Backpack', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400' },
    { id: 'b4', name: 'Purse', image: 'https://images.unsplash.com/photo-1584917865442-de89df41c136?auto=format&fit=crop&q=80&w=400' }
  ],
  'Toys': [
    { id: 't1', name: 'Bear Plushie', image: 'https://images.unsplash.com/photo-1556012018-50c5c0da73bf?auto=format&fit=crop&q=80&w=400' },
    { id: 't2', name: 'Bunny', image: 'https://images.unsplash.com/photo-1545822686-1dc5b381307a?auto=format&fit=crop&q=80&w=400' },
    { id: 't3', name: 'Cat', image: 'https://images.unsplash.com/photo-1548366086-7f1b76106622?auto=format&fit=crop&q=80&w=400' },
    { id: 't4', name: 'Dog', image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=400' }
  ]
};

interface TemplateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TemplateSelectionModal: React.FC<TemplateSelectionModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('Clothes');
  const navigate = useNavigate();
  
  const handleTemplateSelect = (templateId: string) => {
    navigate(`/editor/new/${templateId}`);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Choose a Template</h2>
          <button 
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex h-[calc(90vh-76px)]">
          {/* Category sidebar */}
          <div className="w-48 border-r overflow-y-auto">
            <ul className="p-2">
              {templateCategories.map(category => (
                <li key={category}>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-lg ${selectedCategory === category ? 'bg-claw-blue-100 text-claw-blue-600 font-medium' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Templates grid */}
          <div className="flex-1 p-4 overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">{selectedCategory} Templates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates[selectedCategory as keyof typeof templates].map(template => (
                <div 
                  key={template.id}
                  className="claw-card cursor-pointer hover:-translate-y-1 transition-transform duration-200"
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={template.image} 
                      alt={template.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium">{template.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelectionModal;
