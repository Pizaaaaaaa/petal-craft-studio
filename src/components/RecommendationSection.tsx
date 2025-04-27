
import React from 'react';
import ProjectCard from './ProjectCard';

type Project = {
  id: string;
  image: string;
  title: string;
  author: string;
  likes: number;
}

type RecommendationSectionProps = {
  title: string;
  projects: Project[];
}

const RecommendationSection = ({ title, projects }: RecommendationSectionProps) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-serif font-medium">{title}</h2>
        <button className="text-sm text-craft-pink-500 hover:text-craft-pink-400 transition-colors">
          查看全部
        </button>
      </div>
      
      <div className="masonry-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            image={project.image}
            title={project.title}
            author={project.author}
            likes={project.likes}
            height={index % 3 === 0 ? '300px' : index % 3 === 1 ? '250px' : '280px'}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;
