
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import ProjectCard, { ProjectCardProps } from './ProjectCard';

interface Project {
  id: string;
  image: string;
  title: string;
  author: string;
  likes: number;
  comments?: number;
}

interface RecommendationSectionProps {
  title: string;
  projects: Project[];
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({ title, projects }) => {
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 6;
  
  const displayedProjects = showAll ? projects : projects.slice(0, initialDisplayCount);
  
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-serif font-medium">{title}</h2>
        {projects.length > initialDisplayCount && (
          <button 
            onClick={() => setShowAll(!showAll)} 
            className="flex items-center text-claw-blue-500 hover:text-claw-blue-600 transition-colors text-sm"
          >
            {showAll ? 'Show Less' : 'View More'}
            <ChevronRight size={16} className={`ml-1 transition-transform ${showAll ? 'rotate-90' : ''}`} />
          </button>
        )}
      </div>
      
      <div className="masonry-grid">
        {displayedProjects.map((project) => (
          <ProjectCard 
            key={project.id}
            id={project.id}
            title={project.title}
            author={project.author}
            image={project.image}
            likes={project.likes}
            comments={project.comments || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;
