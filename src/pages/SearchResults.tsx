
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import MasonryGrid from '../components/MasonryGrid';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';

// Using the same mock projects data structure as in other pages
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
  }
];

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<typeof mockProjects>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  useEffect(() => {
    // Get the search query from URL search params
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    
    if (query) {
      setSearchQuery(query);
      console.log(`Searching for: ${query}`);
      
      // In a real app, this would be an API call
      // For now, use our mock data and filter by title
      const filteredProjects = mockProjects.filter(project => 
        project.title.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(filteredProjects);
    }
  }, [location.search]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4">
          <ChevronLeft size={20} />
          <span>Back to Home</span>
        </Link>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Search results for "{searchQuery}"
        </h1>
        <p className="text-gray-600">{searchResults.length} projects found</p>
      </div>
      
      {searchResults.length > 0 ? (
        <MasonryGrid columnCount={3} columnGap={24} rowGap={24}>
          {searchResults.map(project => (
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
          <h2 className="text-xl font-semibold mb-2">No results found</h2>
          <p className="text-gray-600">Try different keywords or check spelling.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
