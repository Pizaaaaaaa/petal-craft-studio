
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
    { id: 'all', name: '全部' },
    { id: 'paper', name: '纸艺' },
    { id: 'knitting', name: '编织' },
    { id: 'clay', name: '粘土' },
    { id: 'embroidery', name: '刺绣' },
    { id: 'resin', name: '树脂' },
    { id: 'jewelry', name: '饰品' },
    { id: 'painting', name: '绘画' },
    { id: 'sewing', name: '缝纫' },
  ];

  // Sample project data
  const trendingProjects = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1596496181871-9681eacf9764?q=80&w=1000',
      title: '清新花环手账装饰',
      author: '小花花',
      likes: 256
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1629976002373-8c901c9d954d?q=80&w=1000',
      title: '复古风刺绣小挂件',
      author: '针线活',
      likes: 189
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1602409339188-95d178a611a3?q=80&w=1000',
      title: '夏日贝壳饰品DIY',
      author: '海边姑娘',
      likes: 345
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1606722590583-6951b5ea95b3?q=80&w=1000',
      title: '迷你多肉花盆创意',
      author: '植物控',
      likes: 217
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1464699908537-0954e50791ee?q=80&w=1000',
      title: '温馨纸艺灯罩',
      author: '光影师',
      likes: 129
    },
    {
      id: '6',
      image: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?q=80&w=1000',
      title: '春日花环装饰',
      author: '花艺师小白',
      likes: 156
    }
  ];

  const personalizedProjects = [
    {
      id: '7',
      image: 'https://images.unsplash.com/photo-1613338761627-82828a8024c1?q=80&w=1000',
      title: '创意布艺收纳盒',
      author: '家居达人',
      likes: 178
    },
    {
      id: '8',
      image: 'https://images.unsplash.com/photo-1558959806-42daff5aa0b4?q=80&w=1000',
      title: '水晶树脂首饰教程',
      author: '饰品匠人',
      likes: 203
    },
    {
      id: '9',
      image: 'https://images.unsplash.com/photo-1528826007177-f38517ce0a76?q=80&w=1000',
      title: '治愈系刺绣图案',
      author: '小绣娘',
      likes: 143
    },
    {
      id: '10',
      image: 'https://images.unsplash.com/photo-1579275530126-af715aa21c6c?q=80&w=1000',
      title: '轻粘土小动物公仔',
      author: '粘土师',
      likes: 289
    },
    {
      id: '11',
      image: 'https://images.unsplash.com/photo-1505262933600-27c2b248607c?q=80&w=1000',
      title: '牛皮纸包装礼盒',
      author: '礼物包装师',
      likes: 165
    },
    {
      id: '12',
      image: 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?q=80&w=1000',
      title: '棉线编织小装饰',
      author: '编织艺术',
      likes: 132
    }
  ];

  const handleSearch = (query: string) => {
    toast({
      title: "搜索",
      description: `正在搜索: ${query}`,
      duration: 2000,
    });
  };

  const handleCreateProject = () => {
    toast({
      title: "新项目",
      description: "创建新项目功能即将上线！",
      duration: 2000,
    });
  };

  const handleNavigate = (page: string) => {
    setActivePage(page);
    toast({
      title: "导航",
      description: `您选择了: ${page}`,
      duration: 1500,
    });
  };

  const handleSelectCategory = (id: string) => {
    setSelectedCategory(id);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-craft-pink-100/30">
      {/* Sidebar */}
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          {/* Top section with search and create button */}
          <SearchBar onSearch={handleSearch} onCreateProject={handleCreateProject} />
          
          {/* Category selector */}
          <div className="mt-8">
            <CategorySelector 
              categories={categories} 
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>
          
          {/* Welcome banner */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-craft-pink-200 to-craft-lavender-200 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-medium">欢迎回来，默默小花！</h1>
              <p className="mt-2 text-foreground/80">发现今日灵感，开始你的DIY创作之旅</p>
            </div>
            <div className="hidden md:block animate-float">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/1533/1533913.png" 
                alt="Crafting illustration" 
                className="w-24 h-24"
              />
            </div>
          </div>
          
          {/* Trending projects */}
          <RecommendationSection 
            title="热门内容" 
            projects={trendingProjects} 
          />
          
          {/* Personalized recommendations */}
          <RecommendationSection 
            title="为你推荐" 
            projects={personalizedProjects} 
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
