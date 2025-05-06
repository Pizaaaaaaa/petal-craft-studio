
import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ProjectCardProps {
  id: string;
  image: string;
  title: string;
  author: string;
  likes: number;
  height?: string;
  isCreateCard?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  id, 
  image, 
  title, 
  author, 
  likes, 
  height = 'auto',
  isCreateCard = false
}) => {
  if (isCreateCard) {
    return (
      <Link 
        to="/editor/new/blank"
        className="claw-card group relative w-full flex flex-col items-center justify-center transition-transform duration-200 hover:-translate-y-1 bg-claw-blue-50 border-2 border-dashed border-claw-blue-200"
        style={{ minHeight: '250px', height }}
      >
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-claw-blue-500">
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
        </div>
        <h3 className="text-claw-blue-500 font-medium">Create New Project</h3>
      </Link>
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white font-medium text-lg truncate">{title}</h3>
        <p className="text-white/80 text-sm">by {author}</p>
        <div className="flex items-center gap-1 mt-2">
          <Heart size={16} className="text-claw-blue-300 fill-claw-blue-300" />
          <span className="text-white/80 text-xs">{likes}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
