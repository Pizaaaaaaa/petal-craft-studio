
import React from 'react';
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
  return (
    <div className="mt-8">
      <h2 className="text-xl font-serif font-medium mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            image={project.image}
            title={project.title}
            author={project.author}
            likes={project.likes}
            height="240px"
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;
