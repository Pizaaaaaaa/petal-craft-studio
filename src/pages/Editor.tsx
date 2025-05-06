import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Undo, Redo, Image, Type, Pencil, ChevronLeft, Share, Download } from 'lucide-react';
import DownloadConfirmDialog from '../components/DownloadConfirmDialog';
import { useHardwareConnection } from '../contexts/HardwareConnectionContext';
import { toast } from 'sonner';

const toolOptions = [
  { id: 'brush', name: 'Yarn Brush', icon: Pencil },
  { id: 'pattern', name: 'Pattern', icon: Image },
  { id: 'text', name: 'Text', icon: Type },
];

// Mock materials for the editor's current project
const mockMaterials = [
  'Worsted Weight Yarn - 200g',
  'Fine Merino Wool - 150g',
  'Size 4.5mm Knitting Needle Head'
];

const EditorPage: React.FC = () => {
  const { id, templateId } = useParams();
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState('brush');
  const [canvasScale, setCanvasScale] = useState(100);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [projectTitle, setProjectTitle] = useState('Untitled Project');
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const { isConnected, showConnectionModal, setShowConnectionModal, selectedModel } = useHardwareConnection();
  
  // Initialize the canvas or template based on templateId
  useEffect(() => {
    if (templateId) {
      setProjectTitle(`New ${templateId.charAt(0).toUpperCase() + templateId.slice(1)} Project`);
      // Here we would load the template data
      console.log(`Loading template with ID: ${templateId}`);
    } else if (id && id !== 'new') {
      // Here we would load existing project
      console.log(`Loading project with ID: ${id}`);
    }
    
    // This is to simulate user making changes
    const timer = setTimeout(() => {
      setUnsavedChanges(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [id, templateId]);
  
  const handleSave = () => {
    console.log('Saving project...');
    setUnsavedChanges(false);
  };
  
  const handleBackClick = () => {
    if (unsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };
  
  const handleDownloadClick = () => {
    if (!isConnected) {
      toast.error("No device connected");
      setShowConnectionModal(true);
      return;
    }
    
    setDownloadDialogOpen(true);
  };
  
  const handleDownloadConfirm = () => {
    if (selectedModel) {
      toast.success(`Sending "${projectTitle}" to ${selectedModel}...`);
    } else {
      toast.error("No hardware model selected");
      setShowConnectionModal(true);
    }
  };
  
  return (
    <div className="h-screen flex flex-col bg-claw-gray-100">
      {/* Editor header */}
      <header className="h-14 bg-white border-b flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            className="p-2 rounded-lg hover:bg-claw-blue-50 text-gray-600"
            onClick={handleBackClick}
          >
            <ChevronLeft size={20} />
          </button>
          
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="font-medium text-gray-800 border-none focus:outline-none focus:ring-2 focus:ring-claw-blue-300 rounded-md px-2"
          />
          
          {unsavedChanges && (
            <span className="text-amber-500 text-sm">•</span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button className="claw-secondary-button gap-2 flex items-center">
            <Share size={18} />
            <span>Share</span>
          </button>
          
          <button className="claw-button gap-2 flex items-center" onClick={handleSave}>
            <Save size={18} />
            <span>Save</span>
          </button>
          
          <button className="claw-secondary-button gap-2 flex items-center" onClick={handleDownloadClick}>
            <Download size={18} />
            <span>Send to Hardware</span>
          </button>
        </div>
      </header>
      
      {/* Download Confirm Dialog */}
      <DownloadConfirmDialog
        isOpen={downloadDialogOpen}
        onClose={() => setDownloadDialogOpen(false)}
        onConfirm={handleDownloadConfirm}
        projectTitle={projectTitle}
        requiredMaterials={mockMaterials}
      />
      
      {/* Editor main area */}
      <div className="flex-1 flex">
        {/* Tools sidebar */}
        <div className="w-16 bg-white border-r flex flex-col items-center py-4">
          {toolOptions.map((tool) => (
            <button
              key={tool.id}
              className={`editor-tool mb-2 ${activeTool === tool.id ? 'active' : ''}`}
              onClick={() => setActiveTool(tool.id)}
              title={tool.name}
            >
              <tool.icon size={20} />
            </button>
          ))}
          
          <div className="mt-auto">
            <button className="editor-tool" title="Undo">
              <Undo size={20} />
            </button>
            <button className="editor-tool" title="Redo">
              <Redo size={20} />
            </button>
          </div>
        </div>
        
        {/* Editor canvas area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Canvas toolbar */}
          <div className="editor-controls m-4 flex justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Zoom:</span>
              <input
                type="range"
                min="50"
                max="200"
                value={canvasScale}
                onChange={(e) => setCanvasScale(parseInt(e.target.value))}
                className="w-32"
              />
              <span className="text-sm">{canvasScale}%</span>
            </div>
          </div>
          
          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center overflow-auto p-4">
            <div
              className="bg-white border rounded-lg shadow-lg relative"
              style={{
                width: '600px',
                height: '800px',
                transform: `scale(${canvasScale / 100})`,
                transformOrigin: 'center center',
                transition: 'transform 0.2s ease'
              }}
            >
              {/* Canvas placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <p>Your knitting project will appear here</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Properties panel */}
        <div className="w-64 bg-white border-l p-4">
          <h3 className="font-medium mb-4">
            {activeTool === 'brush' && 'Yarn Brush Settings'}
            {activeTool === 'pattern' && 'Pattern Settings'}
            {activeTool === 'text' && 'Text Settings'}
          </h3>
          
          {activeTool === 'brush' && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Brush Size</label>
                <input type="range" className="w-full" min="1" max="50" defaultValue="10" />
              </div>
              
              <div>
                <label className="text-sm text-gray-600 block mb-1">Yarn Type</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Worsted Weight</option>
                  <option>Fine</option>
                  <option>Bulky</option>
                  <option>Super Bulky</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 block mb-1">Color</label>
                <div className="grid grid-cols-5 gap-2">
                  {['#FF5252', '#4CAF50', '#2196F3', '#FFC107', '#9C27B0', 
                    '#607D8B', '#795548', '#FF9800', '#9E9E9E', '#FFEB3B'].map((color) => (
                    <div 
                      key={color} 
                      className="w-8 h-8 rounded-full border cursor-pointer"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTool === 'pattern' && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Pattern Library</label>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4, 6].map((id) => (
                    <div key={id} className="border rounded-lg overflow-hidden cursor-pointer">
                      <img 
                        src={`https://picsum.photos/id/${id + 20}/100`} 
                        alt={`Pattern ${id}`} 
                        className="w-full h-20 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 block mb-1">Scale</label>
                <input type="range" className="w-full" min="50" max="200" defaultValue="100" />
              </div>
              
              <div>
                <label className="text-sm text-gray-600 block mb-1">Opacity</label>
                <input type="range" className="w-full" min="10" max="100" defaultValue="100" />
              </div>
            </div>
          )}
          
          {activeTool === 'text' && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Font</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Quicksand</option>
                  <option>Playfair Display</option>
                  <option>Arial</option>
                  <option>Helvetica</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 block mb-1">Size</label>
                <input type="range" className="w-full" min="8" max="72" defaultValue="16" />
              </div>
              
              <div>
                <label className="text-sm text-gray-600 block mb-1">Color</label>
                <div className="grid grid-cols-5 gap-2">
                  {['#000000', '#FF5252', '#4CAF50', '#2196F3', '#FFC107'].map((color) => (
                    <div 
                      key={color} 
                      className="w-8 h-8 rounded-full border cursor-pointer"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 block mb-1">Text</label>
                <textarea 
                  className="w-full p-2 border rounded-lg" 
                  rows={3} 
                  placeholder="Enter your text..."
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
