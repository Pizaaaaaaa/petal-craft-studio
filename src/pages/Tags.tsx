
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import MasonryGrid from '../components/MasonryGrid';
import ProjectCard from '../components/ProjectCard';

// Mock projects data - using the same data structure as other pages
const mockProjects = [
  {
    id: '1',
    title: 'Cozy Winter Sweater',
    image: 'https://images.unsplash.com/photo-1584736328868-fbc30f5efe78?auto=format&fit=crop&q=80&w=800',
    author: 'Emily Chen',
    likes: 124
  },
  {
    id: '2',
    title: 'Summer Cotton Cardigan',
    image: 'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&q=80&w=800',
    author: 'Emily Chen',
    likes: 87
  },
  {
    id: '3',
    title: 'Chunky Knit Blanket',
    image: 'https://images.unsplash.com/photo-1581067721837-11f8b1583488?auto=format&fit=crop&q=80&w=800',
    author: 'Emily Chen',
    likes: 156
  },
  {
    id: '4',
    title: 'Lace Shawl Pattern',
    image: 'https://images.unsplash.com/photo-1620208693288-161d48cbe2e4?auto=format&fit=crop&q=80&w=800',
    author: 'Emily Chen',
    likes: 98
  },
  {
    id: '5',
    title: 'Colorwork Mittens',
    image: 'https://images.unsplash.com/photo-1602079282086-3880b138a2c1?auto=format&fit=crop&q=80&w=800',
    author: 'Emily Chen',
    likes: 65
  },
  {
    id: '6',
    title: 'Cable Knit Hat',
    image: 'https://images.unsplash.com/photo-1576473582313-495391868136?auto=format&fit=crop&q=80&w=800',
    author: 'Alex Johnson',
    likes: 72
  },
  {
    id: '7',
    title: 'Fair Isle Pullover',
    image: 'https://images.unsplash.com/photo-1582038439431-6019809c2241?auto=format&fit=crop&q=80&w=800',
    author: 'Alex Johnson',
    likes: 110
  },
  {
    id: '8',
    title: 'Beginner Sock Pattern',
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=800',
    author: 'Alex Johnson',
    likes: 94
  }
];

// Tags and associated projects data structure
const tagProjectMap: Record<string, typeof mockProjects> = {
  'winter': [mockProjects[0], mockProjects[4], mockProjects[5]],
  'wool': [mockProjects[0], mockProjects[2], mockProjects[4]],
  'sweater': [mockProjects[0], mockProjects[1], mockProjects[6]],
  'cozy': [mockProjects[0], mockProjects[2]],
  // Add more tag mappings as needed
};

const TagsPage: React.FC = () => {
  const { tagName } = useParams<{ tagName: string }>();
  const [tagProjects, setTagProjects] = useState<typeof mockProjects>([]);
  
  useEffect(() => {
    if (tagName) {
      console.log(`Fetching projects with tag: ${tagName}`);
      
      // In a real app, this would be an API call
      // For now, use our mock data structure
      if (tagName && tagProjectMap[tagName]) {
        setTagProjects(tagProjectMap[tagName]);
      } else {
        // If tag not found in our mock data, show empty results
        setTagProjects([]);
      }
    }
  }, [tagName]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to={-1 as any} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4">
          <ChevronLeft size={20} />
          <span>Back</span>
        </Link>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Projects tagged with "{tagName}"
        </h1>
        <p className="text-gray-600">{tagProjects.length} projects found</p>
      </div>
      
      {tagProjects.length > 0 ? (
        <MasonryGrid columnCount={3} columnGap={24} rowGap={24}>
          {tagProjects.map(project => (
            <ProjectCard
              key={project.id}
              id={project.id}
              image={project.image}
              title={project.title}
              author={project.author}
              likes={project.likes}
            />
          ))}
        </MasonryGrid>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold mb-2">No projects found</h2>
          <p className="text-gray-600">There are no projects with this tag yet.</p>
        </div>
      )}
    </div>
  );
};

export default TagsPage;
