
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MessageSquare, 
  UserPlus, 
  Grid3x3, 
  Heart,
  Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MasonryGrid from '../components/MasonryGrid';
import ProjectCard from '../components/ProjectCard';
import { toast } from 'sonner';

// Mock user data
const mockUsers = {
  'user123': {
    id: 'user123',
    name: 'Emily Chen',
    bio: 'Knitwear designer and yarn enthusiast. Creating cozy patterns since 2015.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=1200',
    location: 'Portland, OR',
    website: 'emilyknits.com',
    followers: 1245,
    following: 356,
    isFollowing: false,
    joinedDate: '2022-03-15T00:00:00Z',
    social: {
      instagram: 'emily_knits',
      pinterest: 'emilychen',
      ravelry: 'emilychen'
    }
  },
  'user456': {
    id: 'user456',
    name: 'Alex Johnson',
    bio: 'Knitting teacher and pattern tester. I love colorwork and challenging projects!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1200',
    location: 'Seattle, WA',
    website: 'alexknits.com',
    followers: 876,
    following: 230,
    isFollowing: true,
    joinedDate: '2022-05-20T00:00:00Z',
    social: {
      instagram: 'alex_knits',
      pinterest: 'alexjohnson',
      ravelry: 'alexj'
    }
  },
  'user789': {
    id: 'user789',
    name: 'Sarah Miller',
    bio: 'Fiber artist specializing in sustainable and eco-friendly knitting patterns.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200',
    location: 'Austin, TX',
    website: 'sarahknits.com',
    followers: 2345,
    following: 412,
    isFollowing: false,
    joinedDate: '2021-11-10T00:00:00Z',
    social: {
      instagram: 'sarah_knits',
      pinterest: 'sarahmiller',
      ravelry: 'sarahm'
    }
  }
};

// Mock projects data
const mockUserProjects = {
  'user123': [
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
    }
  ],
  'user456': [
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
  ],
  'user789': [
    {
      id: '9',
      title: 'Recycled Yarn Tote',
      image: 'https://images.unsplash.com/photo-1584736328868-fbc30f5efe78?auto=format&fit=crop&q=80&w=800',
      author: 'Sarah Miller',
      likes: 147
    },
    {
      id: '10',
      title: 'Organic Cotton Baby Blanket',
      image: 'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&q=80&w=800',
      author: 'Sarah Miller',
      likes: 201
    },
    {
      id: '11',
      title: 'Plant-Dyed Wool Scarf',
      image: 'https://images.unsplash.com/photo-1582038439431-6019809c2241?auto=format&fit=crop&q=80&w=800',
      author: 'Sarah Miller',
      likes: 168
    },
    {
      id: '12',
      title: 'Zero-Waste Cowl',
      image: 'https://images.unsplash.com/photo-1620208693288-161d48cbe2e4?auto=format&fit=crop&q=80&w=800',
      author: 'Sarah Miller',
      likes: 112
    }
  ]
};

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<typeof mockUsers[keyof typeof mockUsers] | null>(null);
  const [projects, setProjects] = useState<typeof mockUserProjects[keyof typeof mockUserProjects]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const isOwnProfile = userId === currentUser?.id;
  
  // Fetch user data
  useEffect(() => {
    if (userId && mockUsers[userId as keyof typeof mockUsers]) {
      const userData = mockUsers[userId as keyof typeof mockUsers];
      setUser(userData);
      setIsFollowing(userData.isFollowing);
      
      // Fetch projects
      const userProjects = mockUserProjects[userId as keyof typeof mockUserProjects] || [];
      setProjects(userProjects);
    }
  }, [userId]);
  
  const handleFollowToggle = () => {
    if (!user) return;
    
    setIsFollowing(!isFollowing);
    
    if (!isFollowing) {
      toast.success(`Following ${user.name}`);
    } else {
      toast.info(`Unfollowed ${user.name}`);
    }
  };
  
  const handleMessage = () => {
    if (!user) return;
    toast.info(`Messaging feature coming soon!`);
  };
  
  if (!user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">User not found</h2>
        <p className="text-gray-600">The user you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }
  
  return (
    <div>
      {/* Cover image */}
      <div className="h-64 w-full rounded-xl overflow-hidden mb-16 relative">
        <img 
          src={user.coverImage} 
          alt={`${user.name}'s cover`} 
          className="w-full h-full object-cover"
        />
        
        {/* Avatar overlay */}
        <div className="absolute -bottom-12 left-8">
          <div className="w-24 h-24 border-4 border-white rounded-full overflow-hidden">
            <img 
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between mb-8 px-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-600 mt-1">{user.bio}</p>
          
          <div className="flex flex-wrap gap-4 mt-3">
            {user.location && (
              <div className="text-sm text-gray-600">
                📍 {user.location}
              </div>
            )}
            
            {user.website && (
              <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-claw-blue-500 hover:underline">
                🔗 {user.website}
              </a>
            )}
            
            <div className="text-sm text-gray-600">
              📅 Joined {new Date(user.joinedDate).toLocaleDateString()}
            </div>
          </div>
          
          <div className="flex gap-4 mt-4">
            <div>
              <span className="font-semibold">{projects.length}</span> <span className="text-gray-600">Projects</span>
            </div>
            <div>
              <span className="font-semibold">{user.followers}</span> <span className="text-gray-600">Followers</span>
            </div>
            <div>
              <span className="font-semibold">{user.following}</span> <span className="text-gray-600">Following</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 flex gap-2">
          {isOwnProfile ? (
            <Link to="/profile" className="claw-secondary-button flex items-center gap-2">
              <Settings size={18} />
              <span>Edit Profile</span>
            </Link>
          ) : (
            <>
              <button 
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                  isFollowing 
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' 
                    : 'bg-claw-blue-500 hover:bg-claw-blue-600 text-white'
                }`}
                onClick={handleFollowToggle}
              >
                <UserPlus size={18} />
                <span>{isFollowing ? 'Following' : 'Follow'}</span>
              </button>
              
              <button 
                className="claw-secondary-button flex items-center gap-2"
                onClick={handleMessage}
              >
                <MessageSquare size={18} />
                <span>Message</span>
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex overflow-x-auto">
          <button 
            className={`px-6 py-3 font-medium border-b-2 ${
              activeTab === 'projects' 
                ? 'border-claw-blue-500 text-claw-blue-500' 
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('projects')}
          >
            <div className="flex items-center gap-2">
              <Grid3x3 size={18} />
              <span>Projects</span>
            </div>
          </button>
          
          <button 
            className={`px-6 py-3 font-medium border-b-2 ${
              activeTab === 'likes' 
                ? 'border-claw-blue-500 text-claw-blue-500' 
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('likes')}
          >
            <div className="flex items-center gap-2">
              <Heart size={18} />
              <span>Likes</span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div>
        {activeTab === 'projects' && (
          projects.length > 0 ? (
            <MasonryGrid columnCount={3} columnGap={24} rowGap={24}>
              {projects.map(project => (
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
            <div className="text-center py-16 text-gray-500">
              <p>No projects yet</p>
              {isOwnProfile && (
                <Link to="/my-works" className="claw-button inline-block mt-4">
                  Create Your First Project
                </Link>
              )}
            </div>
          )
        )}
        
        {activeTab === 'likes' && (
          <div className="text-center py-16 text-gray-500">
            <p>Liked projects will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
