
import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import CategorySelector from '../components/CategorySelector';

// Mock data for the community projects
const mockProjects = [
  {
    id: '1',
    title: 'Cozy Winter Sweater',
    author: 'Emily Chen',
    image: 'https://images.unsplash.com/photo-1584736328868-fbc30f5efe78?auto=format&fit=crop&q=80&w=800',
    likes: 124,
  },
  {
    id: '2',
    title: 'Rainbow Scarf',
    author: 'David Wong',
    image: 'https://images.unsplash.com/photo-1610288311735-39b7facbd095?auto=format&fit=crop&q=80&w=800',
    likes: 87,
  },
  {
    id: '3',
    title: 'Fluffy Hat with Pompom',
    author: 'Sophie Turner',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800',
    likes: 156,
  },
  {
    id: '4',
    title: 'Striped Socks',
    author: 'Michael Brown',
    image: 'https://images.unsplash.com/photo-1586350977771-2dbe4fae8d39?auto=format&fit=crop&q=80&w=800',
    likes: 63,
  },
  {
    id: '5',
    title: 'Fingerless Gloves',
    author: 'Olivia Smith',
    image: 'https://images.unsplash.com/photo-1510757902970-e236dc20b948?auto=format&fit=crop&q=80&w=800',
    likes: 92,
  },
  {
    id: '6',
    title: 'Tote Bag with Flower Pattern',
    author: 'James Wilson',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    likes: 118,
  },
  {
    id: '7',
    title: 'Cute Bear Plushie',
    author: 'Emma Davis',
    image: 'https://images.unsplash.com/photo-1556012018-50c5c0da73bf?auto=format&fit=crop&q=80&w=800',
    likes: 201,
  },
  {
    id: '8',
    title: 'Knitted Home Decor',
    author: 'Daniel Garcia',
    image: 'https://images.unsplash.com/photo-1578898887932-7769494df893?auto=format&fit=crop&q=80&w=800',
    likes: 75,
  },
];

// Categories for filtering
const categories = ['All', 'Clothes', 'Scarves', 'Hats', 'Socks', 'Gloves', 'Bags', 'Toys'];

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects based on search query and selected category
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || 
      project.title.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Creative Community</h1>
          <p className="text-gray-600 mt-1">Discover and get inspired by amazing knitting projects</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border border-claw-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-claw-blue-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          
          <Link to="/editor/new/blank" className="claw-button whitespace-nowrap flex items-center gap-2">
            <Plus size={18} />
            <span>Create New</span>
          </Link>
        </div>
      </div>
      
      <CategorySelector 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <div className="masonry-grid">
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id}
            id={project.id}
            title={project.title}
            author={project.author}
            image={project.image}
            likes={project.likes}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
