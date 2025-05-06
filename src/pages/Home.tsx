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
    title: 'Knitted Beanie',
    author: 'Emma Davis',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&q=80&w=800',
    likes: 104,
  },
  {
    id: '8',
    title: 'Wool Socks',
    author: 'Daniel Garcia',
    image: 'https://images.unsplash.com/photo-1543398470-71ece679e400?auto=format&fit=crop&q=80&w=800',
    likes: 75,
  },
  {
    id: '9',
    title: 'Hand-knitted Scarf',
    author: 'Lily Johnson',
    image: 'https://images.unsplash.com/photo-1516728778615-2d590ea1855e?auto=format&fit=crop&q=80&w=800',
    likes: 113,
  },
];

const personalizedProjects = [
  {
    id: '10',
    title: 'Cute Bear Plushie',
    author: 'Emma Davis',
    image: 'https://images.unsplash.com/photo-1556012018-50c5c0da73bf?auto=format&fit=crop&q=80&w=800',
    likes: 201,
  },
  {
    id: '11',
    title: 'Knitted Home Decor',
    author: 'Daniel Garcia',
    image: 'https://images.unsplash.com/photo-1578898887932-7769494df893?auto=format&fit=crop&q=80&w=800',
    likes: 75,
  },
  {
    id: '12',
    title: 'Colorful Mittens',
    author: 'Emma Davis',
    image: 'https://images.unsplash.com/photo-1607529129242-5b759eb7b268?auto=format&fit=crop&q=80&w=800',
    likes: 87,
  },
  {
    id: '13',
    title: 'Cable Knit Hat',
    author: 'David Wong',
    image: 'https://images.unsplash.com/photo-1510481296702-5090337e808e?auto=format&fit=crop&q=80&w=800',
    likes: 143,
  },
  {
    id: '14',
    title: 'Knitted Wall Hanging',
    author: 'Sophie Turner',
    image: 'https://images.unsplash.com/photo-1602079282086-3880b138a2c1?auto=format&fit=crop&q=80&w=800',
    likes: 65,
  },
  {
    id: '15',
    title: 'Vintage Style Socks',
    author: 'Michael Brown',
    image: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&q=80&w=800',
    likes: 92,
  },
  {
    id: '16',
    title: 'Cozy Blanket',
    author: 'Jane Smith',
    image: 'https://images.unsplash.com/photo-1580301762339-0a78caff1927?auto=format&fit=crop&q=80&w=800',
    likes: 157,
  },
  {
    id: '17',
    title: 'Baby Booties',
    author: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1556906105-58e0397867f3?auto=format&fit=crop&q=80&w=800',
    likes: 108,
  },
  {
    id: '18',
    title: 'Summer Tote Bag',
    author: 'Rachel Green',
    image: 'https://images.unsplash.com/photo-1544816155-f9c22a3246c6?auto=format&fit=crop&q=80&w=800',
    likes: 133,
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
