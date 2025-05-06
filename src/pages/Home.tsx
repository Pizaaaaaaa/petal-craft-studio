
import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { toast } from 'sonner';
import RecommendationSection from '../components/RecommendationSection';
import CategorySelector from '../components/CategorySelector';
import TemplateSelectionModal from '../components/modals/TemplateSelectionModal';

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
];

const personalizedProjects = [
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
  {
    id: '9',
    title: 'Colorful Mittens',
    author: 'Emma Davis',
    image: 'https://images.unsplash.com/photo-1607529129242-5b759eb7b268?auto=format&fit=crop&q=80&w=800',
    likes: 87,
    date: '2023-10-25'
  },
  {
    id: '10',
    title: 'Cable Knit Hat',
    author: 'David Wong',
    image: 'https://images.unsplash.com/photo-1510481296702-5090337e808e?auto=format&fit=crop&q=80&w=800',
    likes: 143,
    date: '2023-10-12'
  },
  {
    id: '11',
    title: 'Knitted Wall Hanging',
    author: 'Sophie Turner',
    image: 'https://images.unsplash.com/photo-1602079282086-3880b138a2c1?auto=format&fit=crop&q=80&w=800',
    likes: 65,
    date: '2023-09-20'
  },
  {
    id: '12',
    title: 'Vintage Style Socks',
    author: 'Michael Brown',
    image: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&q=80&w=800',
    likes: 92,
    date: '2023-09-15'
  },
];

// Categories for filtering
const categories = ['All', 'Clothes', 'Scarves', 'Hats', 'Socks', 'Gloves', 'Bags', 'Dolls'];

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Search: ${searchQuery}`);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Creative Community</h1>
          <p className="text-gray-600 mt-1">Discover yarn DIY inspiration and start your creative journey</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border border-claw-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-claw-blue-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </form>
          
          <button 
            onClick={() => setShowTemplateModal(true)} 
            className="claw-button whitespace-nowrap flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Create New Project</span>
          </button>
        </div>
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

      <TemplateSelectionModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
      />
    </div>
  );
};

export default HomePage;
