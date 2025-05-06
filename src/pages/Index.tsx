
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import CategorySelector from '@/components/CategorySelector';
import RecommendationSection from '@/components/RecommendationSection';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [activePage, setActivePage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const categories = [
    'All',
    'Clothes',
    'Scarves',
    'Hats',
    'Socks',
    'Gloves',
    'Bags',
    'Dolls'
  ];

  const trendingProjects = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800',
      title: 'Fresh Floral Notebook Design',
      author: 'Flora Smith',
      likes: 256
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1618153920965-2e86516dde19?auto=format&fit=crop&q=80&w=800',
      title: 'Vintage Embroidery Pendant',
      author: 'Stitch Master',
      likes: 189
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1615743029255-a367a66c502f?auto=format&fit=crop&q=80&w=800',
      title: 'Summer Shell Jewelry DIY',
      author: 'Beach Girl',
      likes: 345
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1582977343701-4ff3da7c2e32?auto=format&fit=crop&q=80&w=800',
      title: 'Mini Succulent Planter Ideas',
      author: 'Plant Lover',
      likes: 217
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1602734846297-9299fc2d4703?auto=format&fit=crop&q=80&w=800',
      title: 'Cozy Paper Lampshade',
      author: 'Light Master',
      likes: 129
    },
    {
      id: '6',
      image: 'https://images.unsplash.com/photo-1591289009723-faf5732f4218?auto=format&fit=crop&q=80&w=800',
      title: 'Spring Wreath Decoration',
      author: 'Flower Artist',
      likes: 156
    }
  ];

  const personalizedProjects = [
    {
      id: '7',
      image: 'https://images.unsplash.com/photo-1588850655215-70f3e650aaed?auto=format&fit=crop&q=80&w=800',
      title: 'Creative Fabric Storage Box',
      author: 'Home Expert',
      likes: 178
    },
    {
      id: '8',
      image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=800',
      title: 'Crystal Resin Jewelry Tutorial',
      author: 'Jewelry Artisan',
      likes: 203
    },
    {
      id: '9',
      image: 'https://images.unsplash.com/photo-1632159394933-b1846a398844?auto=format&fit=crop&q=80&w=800',
      title: 'Therapeutic Embroidery Patterns',
      author: 'Stitch Artist',
      likes: 143
    },
    {
      id: '10',
      image: 'https://images.unsplash.com/photo-1591644996984-e76b77e38620?auto=format&fit=crop&q=80&w=800',
      title: 'Clay Animal Figurines',
      author: 'Clay Crafter',
      likes: 289
    },
    {
      id: '11',
      image: 'https://images.unsplash.com/photo-1605733513597-a8f8341084e6?auto=format&fit=crop&q=80&w=800',
      title: 'Kraft Paper Gift Boxes',
      author: 'Gift Wrapper',
      likes: 165
    },
    {
      id: '12',
      image: 'https://images.unsplash.com/photo-1599107671646-c483b128d8a9?auto=format&fit=crop&q=80&w=800',
      title: 'Cotton String Decorations',
      author: 'Weaving Artist',
      likes: 132
    }
  ];

  const handleSearch = (query: string) => {
    toast({
      title: "Search",
      description: `Searching for: ${query}`,
      duration: 2000,
    });
  };

  const handleCreateProject = () => {
    toast({
      title: "New Project",
      description: "Create new project feature coming soon!",
      duration: 2000,
    });
  };

  const handleNavigate = (page: string) => {
    setActivePage(page);
    toast({
      title: "Navigation",
      description: `You selected: ${page}`,
      duration: 1500,
    });
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-craft-pink-100/30">
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
          <div className="py-4 sm:py-6">
            <SearchBar onSearch={handleSearch} onCreateProject={handleCreateProject} />
            
            <div className="mt-6 sm:mt-8">
              <CategorySelector 
                categories={categories} 
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
              />
            </div>
            
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-craft-pink-200 to-craft-lavender-200 flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-serif font-medium">Welcome back, Flora!</h1>
                <p className="mt-2 text-foreground/80 text-sm sm:text-base">Discover today's inspiration and start your DIY journey</p>
              </div>
              <div className="hidden md:block animate-float ml-4">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/1533/1533913.png" 
                  alt="Crafting illustration" 
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
        </div>
      </main>
    </div>
  );
};

export default Index;
