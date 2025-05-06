
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from '../components/ProjectCard';
import { Search } from 'lucide-react';

// Mock data
const myProjects = [
  {
    id: '101',
    title: 'My Striped Sweater',
    author: 'You',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800',
    likes: 32,
    date: '2023-10-20'
  },
  {
    id: '102',
    title: 'Blue Beanie',
    author: 'You',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800',
    likes: 18,
    date: '2023-09-15'
  },
];

const myMaterials = [
  {
    id: 'm1',
    title: 'Flower Pattern',
    author: 'You',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=800',
    likes: 5,
    date: '2023-10-10'
  },
  {
    id: 'm2',
    title: 'Geometric Pattern',
    author: 'You',
    image: 'https://images.unsplash.com/photo-1608501078713-8e445a709b39?auto=format&fit=crop&q=80&w=800',
    likes: 7,
    date: '2023-09-05'
  },
];

const mySavedProjects = [
  {
    id: '201',
    title: 'Colorful Mittens',
    author: 'Emma Davis',
    image: 'https://images.unsplash.com/photo-1607529129242-5b759eb7b268?auto=format&fit=crop&q=80&w=800',
    likes: 87,
    date: '2023-10-25'
  },
  {
    id: '202',
    title: 'Cable Knit Hat',
    author: 'David Wong',
    image: 'https://images.unsplash.com/photo-1510481296702-5090337e808e?auto=format&fit=crop&q=80&w=800',
    likes: 143,
    date: '2023-10-12'
  },
  {
    id: '203',
    title: 'Knitted Wall Hanging',
    author: 'Sophie Turner',
    image: 'https://images.unsplash.com/photo-1602079282086-3880b138a2c1?auto=format&fit=crop&q=80&w=800',
    likes: 65,
    date: '2023-09-20'
  },
];

const MyWorksPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter function for projects based on search
  const filterItems = (items: any[]) => {
    if (!searchQuery) return items;
    return items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Works</h1>
          <p className="text-gray-600 mt-1">Manage your projects, materials, and saved works</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search your works..."
            className="w-full pl-10 pr-4 py-2 border border-claw-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-claw-blue-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>
      
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects">
          <div className="masonry-grid">
            <ProjectCard 
              id="new"
              title="Create New"
              author=""
              image=""
              likes={0}
              isCreateCard={true}
            />
            
            {filterItems(myProjects).map((project) => (
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
          
          {filterItems(myProjects).length === 0 && !searchQuery && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-claw-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-claw-blue-500">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800">No projects yet</h3>
              <p className="text-gray-500 mt-1">Create your first knitting project</p>
            </div>
          )}
          
          {filterItems(myProjects).length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-gray-500">No projects found matching "{searchQuery}"</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="materials">
          <div className="masonry-grid">
            <ProjectCard 
              id="new-material"
              title="Create New"
              author=""
              image=""
              likes={0}
              isCreateCard={true}
            />
            
            {filterItems(myMaterials).map((material) => (
              <ProjectCard 
                key={material.id}
                id={material.id}
                title={material.title}
                author={material.author}
                image={material.image}
                likes={material.likes}
              />
            ))}
          </div>
          
          {filterItems(myMaterials).length === 0 && !searchQuery && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-claw-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-claw-blue-500">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800">No materials yet</h3>
              <p className="text-gray-500 mt-1">Upload patterns and materials for your projects</p>
            </div>
          )}
          
          {filterItems(myMaterials).length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-gray-500">No materials found matching "{searchQuery}"</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="saved">
          <div className="masonry-grid">
            {filterItems(mySavedProjects).map((project) => (
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
          
          {filterItems(mySavedProjects).length === 0 && !searchQuery && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-claw-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-claw-blue-500">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800">No saved projects</h3>
              <p className="text-gray-500 mt-1">Save projects from the community for inspiration</p>
            </div>
          )}
          
          {filterItems(mySavedProjects).length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-gray-500">No saved projects found matching "{searchQuery}"</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyWorksPage;
