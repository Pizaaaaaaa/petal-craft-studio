import React, { useState } from 'react';
import { toast } from 'sonner';
import SearchBar from '../components/SearchBar';
import RecommendationSection from '../components/RecommendationSection';
import CategorySelector from '../components/CategorySelector';

// Mock data for the community projects
const trendingProjects = [
  {
    id: '1',
    title: 'Cozy Winter Sweater',
    author: 'Emily Chen',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800',
    likes: 124,
    comments: 18,
  },
  {
    id: '2',
    title: 'Rainbow Scarf',
    author: 'David Wong',
    image: 'https://images.unsplash.com/photo-1618153920965-2e86516dde19?auto=format&fit=crop&q=80&w=800',
    likes: 87,
    comments: 12,
  },
  {
    id: '3',
    title: 'Fluffy Hat with Pompom',
    author: 'Sophie Turner',
    image: 'https://images.unsplash.com/photo-1510832198440-a52376950479?auto=format&fit=crop&q=80&w=800',
    likes: 156,
    comments: 25,
  },
  {
    id: '4',
    title: 'Striped Socks',
    author: 'Michael Brown',
    image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&q=80&w=800',
    likes: 63,
    comments: 7,
  },
  {
    id: '5',
    title: 'Fingerless Gloves',
    author: 'Olivia Smith',
    image: 'https://images.unsplash.com/photo-1583467875263-d2eefb8aabc4?auto=format&fit=crop&q=80&w=800',
    likes: 92,
    comments: 14,
  },
  {
    id: '6',
    title: 'Tote Bag with Flower Pattern',
    author: 'James Wilson',
    image: 'https://images.unsplash.com/photo-1591644996984-e76b77e38620?auto=format&fit=crop&q=80&w=800',
    likes: 118,
    comments: 21,
  },
  {
    id: '7',
    title: 'Knitted Beanie',
    author: 'Emma Davis',
    image: 'https://images.unsplash.com/photo-1571172964276-91faaa704e1f?auto=format&fit=crop&q=80&w=800',
    likes: 104,
    comments: 16,
  },
  {
    id: '8',
    title: 'Wool Socks',
    author: 'Daniel Garcia',
    image: 'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?auto=format&fit=crop&q=80&w=800',
    likes: 75,
    comments: 9,
  },
  {
    id: '9',
    title: 'Hand-knitted Scarf',
    author: 'Lily Johnson',
    image: 'https://images.unsplash.com/photo-1615743029255-a367a66c502f?auto=format&fit=crop&q=80&w=800',
    likes: 113,
    comments: 19,
  },
];

const personalizedProjects = [
  {
    id: '10',
    title: 'Cute Bear Plushie',
    author: 'Emma Davis',
    image: 'https://images.unsplash.com/photo-1602734846297-9299fc2d4703?auto=format&fit=crop&q=80&w=800',
    likes: 201,
    comments: 32,
  },
  {
    id: '11',
    title: 'Knitted Home Decor',
    author: 'Daniel Garcia',
    image: 'https://images.unsplash.com/photo-1632159394933-b1846a398844?auto=format&fit=crop&q=80&w=800',
    likes: 75,
    comments: 11,
  },
  {
    id: '12',
    title: 'Colorful Mittens',
    author: 'Emma Davis',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800',
    likes: 87,
    comments: 8,
  },
  {
    id: '13',
    title: 'Cable Knit Hat',
    author: 'David Wong',
    image: 'https://images.unsplash.com/photo-1599107671646-c483b128d8a9?auto=format&fit=crop&q=80&w=800',
    likes: 143,
    comments: 15,
  },
  {
    id: '14',
    title: 'Knitted Wall Hanging',
    author: 'Sophie Turner',
    image: 'https://images.unsplash.com/photo-1582977343701-4ff3da7c2e32?auto=format&fit=crop&q=80&w=800',
    likes: 65,
    comments: 10,
  },
  {
    id: '15',
    title: 'Vintage Style Socks',
    author: 'Michael Brown',
    image: 'https://images.unsplash.com/photo-1604369294872-8e862e0600ea?auto=format&fit=crop&q=80&w=800',
    likes: 92,
    comments: 12,
  },
  {
    id: '16',
    title: 'Cozy Blanket',
    author: 'Jane Smith',
    image: 'https://images.unsplash.com/photo-1629418886825-df1e6e08f47f?auto=format&fit=crop&q=80&w=800',
    likes: 157,
    comments: 18,
  },
  {
    id: '17',
    title: 'Baby Booties',
    author: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1588850655215-70f3e650aaed?auto=format&fit=crop&q=80&w=800',
    likes: 108,
    comments: 13,
  },
  {
    id: '18',
    title: 'Summer Tote Bag',
    author: 'Rachel Green',
    image: 'https://images.unsplash.com/photo-1605733513597-a8f8341084e6?auto=format&fit=crop&q=80&w=800',
    likes: 133,
    comments: 17,
  },
];

// Categories for filtering
const categories = ['All', 'Clothes', 'Scarves', 'Hats', 'Socks', 'Gloves', 'Bags', 'Dolls'];

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearch = (query: string) => {
    toast.info(`Search: ${query}`);
  };

  const handleCreateProject = () => {
    // This won't be directly used now as modal is handled in SearchBar
    // But keeping it for compatibility
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Creative Community</h1>
          <p className="text-gray-600 mt-1">Discover yarn DIY inspiration and start your creative journey</p>
        </div>
        
        <SearchBar 
          onSearch={handleSearch} 
          onCreateProject={handleCreateProject} 
        />
      </div>
      
      <CategorySelector 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-claw-blue-100 to-claw-blue-50 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-serif font-medium">Welcome to ClawLab!</h1>
          <p className="mt-2 text-foreground/80 text-sm sm:text-base">Discover yarn DIY inspiration and bring your ideas to life with smart hardware</p>
        </div>
        <div className="hidden md:block animate-float ml-4">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/1255/1255502.png" 
            alt="Knitting illustration" 
            className="w-16 sm:w-24 h-16 sm:h-24"
          />
        </div>
      </div>
      
      <RecommendationSection 
        title="Trending Content" 
        projects={trendingProjects} 
      />
      
      <RecommendationSection 
        title="Recommended For You" 
        projects={personalizedProjects} 
      />
    </div>
  );
};

export default HomePage;
