
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import ProjectCard, { ProjectCardProps } from './ProjectCard';

interface Project {
  id: string;
  image: string;
  title: string;
  author: string;
  likes: number;
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
      
      <div className="masonry-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {displayedProjects.map((project, index) => (
          <div 
            key={project.id} 
            className="masonry-item mb-4"
            style={{ 
              height: `${Math.max(240, Math.random() * 60 + 220)}px`,
              gridRow: `span ${Math.ceil(Math.random() * 1) + 1}`
            }}
          >
            <ProjectCard
              id={project.id}
              image={project.image}
              title={project.title}
              author={project.author}
              likes={project.likes}
              height="100%"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;
