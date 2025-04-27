
import React from 'react';
import { Heart } from 'lucide-react';

type ProjectCardProps = {
  image: string;
  title: string;
  author: string;
  likes: number;
  height?: string;
}

const ProjectCard = ({ image, title, author, likes, height = 'auto' }: ProjectCardProps) => {
  return (
    <div 
      className="craft-card group relative"
      style={{ height }}
    >
      <div className="overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          style={{ minHeight: '200px' }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white font-medium text-lg truncate">{title}</h3>
        <p className="text-white/80 text-sm">by {author}</p>
        <div className="flex items-center gap-1 mt-2">
          <Heart size={16} className="text-craft-pink-300 fill-craft-pink-300" />
          <span className="text-white/80 text-xs">{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
