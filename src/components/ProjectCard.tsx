
import React, { useState } from 'react';
import { Heart, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import TemplateSelectionModal from './modals/TemplateSelectionModal';
import MaterialUploadModal from './modals/MaterialUploadModal';

export interface ProjectCardProps {
  id: string;
  image: string;
  title: string;
  author: string;
  likes: number;
  height?: string;
  isCreateCard?: boolean;
  comments?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  id, 
  image, 
  title, 
  author, 
  likes: initialLikes, 
  height = 'auto',
  isCreateCard = false,
  comments = 0
}) => {
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to project details
    e.stopPropagation(); // Stop event propagation
    
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    
    toast(isLiked ? "Removed from favorites" : "Added to favorites", {
      description: isLiked ? 
        `${title} has been removed from your favorites` : 
        `${title} has been added to your favorites`,
      position: "bottom-right",
      duration: 2000
    });
  };

  if (isCreateCard) {
    const isMaterialUpload = id === 'new-material';
    
    return (
      <>
        <div
          onClick={() => isMaterialUpload ? setShowMaterialModal(true) : setShowTemplateModal(true)}
          className="claw-card group relative w-full flex flex-col items-center justify-center transition-transform duration-200 hover:-translate-y-1 bg-claw-blue-50 border-2 border-dashed border-claw-blue-200 cursor-pointer"
          style={{ minHeight: '250px', height }}
        >
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-claw-blue-500">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
          </div>
          <h3 className="text-claw-blue-500 font-medium">
            {isMaterialUpload ? "Upload New Material" : "Create New Project"}
          </h3>
        </div>
        
        {!isMaterialUpload && (
          <TemplateSelectionModal
            isOpen={showTemplateModal}
            onClose={() => setShowTemplateModal(false)}
          />
        )}
        
        {isMaterialUpload && (
          <MaterialUploadModal
            isOpen={showMaterialModal}
            onClose={() => setShowMaterialModal(false)}
          />
        )}
      </>
    );
  }

  return (
    <Link 
      to={`/project/${id}`}
      className="claw-card group relative w-full transition-transform duration-200 hover:-translate-y-1"
      style={{ 
        height: height,
        minHeight: '200px',
        maxHeight: '350px'
      }}
    >
      <div className="h-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      {/* Always visible overlay with title and stats */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
        <h3 className="text-white font-medium text-lg truncate">{title}</h3>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1">
            <button 
              onClick={handleLike}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <Heart 
                size={16} 
                className={isLiked ? "text-claw-blue-300 fill-claw-blue-300" : "text-white"} 
              />
            </button>
            <span className="text-white/80 text-xs">{likes}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <MessageSquare size={16} className="text-white" />
            <span className="text-white/80 text-xs">{comments}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
