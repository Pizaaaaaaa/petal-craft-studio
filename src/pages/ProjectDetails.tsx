import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Share, Download, Edit, ChevronLeft, MessageSquare } from 'lucide-react';
import CommentSection from '../components/CommentSection';
import ShareDialog from '../components/ShareDialog';
import { useHardwareConnection } from '../contexts/HardwareConnectionContext';
import { toast } from 'sonner';

// Mock project data
const mockProject = {
  id: '1',
  title: 'Cozy Winter Sweater',
  description: 'A warm and stylish sweater perfect for cold winter days. Made with premium merino wool for comfort and durability.',
  author: {
    id: 'user123',
    name: 'Emily Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  },
  images: [
    'https://images.unsplash.com/photo-1584736328868-fbc30f5efe78?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&q=80&w=800'
  ],
  materials: [
    'Merino wool yarn - 800g',
    'Knitting needles - size 5mm',
    'Yarn needle',
    'Stitch markers'
  ],
  instructions: [
    'Cast on 96 stitches using a long-tail cast on.',
    'Work in 2x2 rib (K2, P2) for 5cm.',
    'Switch to stockinette stitch (knit one row, purl one row) for the body.',
    'Work even until piece measures 40cm from the beginning.',
    'Shape armholes by binding off 5 stitches at the beginning of the next 2 rows.',
    'Continue in stockinette stitch until armhole measures 20cm.',
    'Shape shoulders by binding off 10 stitches at the beginning of the next 4 rows.',
    'Bind off remaining stitches for the neck.'
  ],
  likes: 124,
  isLiked: false,
  createdAt: '2023-10-15T12:30:00Z',
  difficulty: 'Intermediate',
  timeToMake: '20 hours',
  patternType: 'Sweater',
  tags: ['winter', 'wool', 'sweater', 'cozy'],
  comments: [
    {
      id: 'comment1',
      author: {
        id: 'user456',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
      },
      content: 'I love the design! Has anyone tried this with cotton yarn instead of wool?',
      createdAt: '2023-10-20T14:30:00Z',
      likes: 8,
      isLiked: false
    },
    {
      id: 'comment2',
      author: {
        id: 'user789',
        name: 'Sarah Miller',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
      },
      content: 'Made this last week and it turned out great! The instructions were super clear.',
      createdAt: '2023-10-18T09:45:00Z',
      likes: 12,
      isLiked: true
    },
    {
      id: 'comment3',
      author: {
        id: 'user234',
        name: 'David Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
      },
      content: 'What level of experience would you recommend for this project? I\'m still a beginner.',
      createdAt: '2023-10-17T16:20:00Z',
      likes: 3,
      isLiked: false
    }
  ]
};

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(mockProject);
  const [activeImage, setActiveImage] = useState(0);
  const [isLiked, setIsLiked] = useState(project.isLiked);
  const [likesCount, setLikesCount] = useState(project.likes);
  const [showComments, setShowComments] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const { isConnected, showConnectionModal, setShowConnectionModal, selectedModel } = useHardwareConnection();
  
  // Fetch project data (mock)
  useEffect(() => {
    console.log(`Fetching project with ID: ${id}`);
    // In a real app, this would be an API call
    // setProject(data);
  }, [id]);
  
  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };
  
  const handleEdit = () => {
    navigate(`/editor/${id}`);
  };
  
  const handleShare = () => {
    setShareDialogOpen(true);
  };

  const handleSendToHardware = () => {
    if (!isConnected) {
      toast.error("No device connected");
      setShowConnectionModal(true);
      return;
    }
    
    if (selectedModel) {
      toast.success(`Sending "${project.title}" to ${selectedModel}...`);
    } else {
      toast.error("No hardware model selected");
      setShowConnectionModal(true);
    }
  };

  // Get the current URL for sharing
  const shareUrl = window.location.href;
  
  return (
    <div>
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{project.title}</h1>
            
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-2">
                <Link to={`/user/${project.author.id}`}>
                  <img 
                    src={project.author.avatar} 
                    alt={project.author.name} 
                    className="w-6 h-6 rounded-full"
                  />
                </Link>
                <span className="text-gray-600">
                  by <Link to={`/user/${project.author.id}`} className="hover:underline">{project.author.name}</Link>
                </span>
              </div>
              
              <span className="text-gray-400">•</span>
              
              <div className="flex items-center gap-1 text-gray-600">
                <Heart size={16} className={isLiked ? 'fill-claw-blue-500 text-claw-blue-500' : ''} />
                <span>{likesCount}</span>
              </div>
              
              <span className="text-gray-400">•</span>
              
              <button 
                className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageSquare size={16} />
                <span>{project.comments.length}</span>
              </button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              className="claw-secondary-button flex items-center gap-2"
              onClick={toggleLike}
            >
              <Heart size={18} className={isLiked ? 'fill-claw-blue-500 text-claw-blue-500' : ''} />
              <span>{isLiked ? 'Liked' : 'Like'}</span>
            </button>
            
            <button 
              className="claw-secondary-button flex items-center gap-2"
              onClick={handleShare}
            >
              <Share size={18} />
              <span>Share</span>
            </button>
            
            <button 
              className="claw-secondary-button"
              onClick={handleSendToHardware}
            >
              <Download size={18} />
            </button>
            
            <button 
              className="claw-button flex items-center gap-2"
              onClick={handleEdit}
            >
              <Edit size={18} />
              <span>Edit</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Share Dialog */}
      <ShareDialog
        isOpen={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        title={project.title}
        url={shareUrl}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="claw-card overflow-hidden mb-6">
            <img 
              src={project.images[activeImage]} 
              alt={project.title} 
              className="w-full h-96 object-cover"
            />
          </div>
          
          {project.images.length > 1 && (
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className={`w-24 h-24 rounded-lg overflow-hidden cursor-pointer border-2 ${
                    activeImage === index ? 'border-claw-blue-500' : 'border-transparent'
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${project.title} ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          
          <div className="claw-card p-6 mb-6">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700">{project.description}</p>
          </div>
          
          <div className="claw-card p-6 mb-6">
            <h2 className="text-xl font-semibold mb-3">Materials</h2>
            <ul className="list-disc pl-5 space-y-1">
              {project.materials.map((material, index) => (
                <li key={index} className="text-gray-700">{material}</li>
              ))}
            </ul>
          </div>
          
          <div className="claw-card p-6 mb-6">
            <h2 className="text-xl font-semibold mb-3">Instructions</h2>
            <ol className="list-decimal pl-5 space-y-2">
              {project.instructions.map((step, index) => (
                <li key={index} className="text-gray-700">{step}</li>
              ))}
            </ol>
          </div>
          
          {/* Comment Section */}
          <div className="claw-card p-6">
            <CommentSection 
              projectId={project.id}
              initialComments={project.comments}
            />
          </div>
        </div>
        
        <div>
          <div className="claw-card p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Project Details</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-500">Difficulty</h3>
                <p className="font-medium">{project.difficulty}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500">Estimated Time</h3>
                <p className="font-medium">{project.timeToMake}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500">Pattern Type</h3>
                <p className="font-medium">{project.patternType}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500">Created Date</h3>
                <p className="font-medium">
                  {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500">Tags</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 bg-claw-blue-50 text-claw-blue-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="claw-card p-6">
            <h2 className="text-lg font-semibold mb-4">About the Creator</h2>
            
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={project.author.avatar} 
                alt={project.author.name} 
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-medium">{project.author.name}</h3>
                <p className="text-sm text-gray-600">Knitting Enthusiast</p>
              </div>
            </div>
            
            <Link 
              to={`/user/${project.author.id}`}
              className="claw-secondary-button w-full flex justify-center"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
