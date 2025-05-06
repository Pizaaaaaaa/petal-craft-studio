
import React, { useState } from 'react';
import { Play, ChevronDown, ChevronUp, Search } from 'lucide-react';

// Mock tutorial data
const tutorials = [
  {
    id: 1,
    title: 'Getting Started with ClawLab',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800',
    duration: '5:24',
    description: 'Learn the basics of ClawLab and how to create your first project.'
  },
  {
    id: 2,
    title: 'Connecting Your Device',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1563770660941-10a63607847f?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min',
    description: 'Step-by-step guide on connecting your knitting device to ClawLab.'
  },
  {
    id: 3,
    title: 'Working with Patterns',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1601379327928-bedfaf9da2d0?auto=format&fit=crop&q=80&w=800',
    duration: '7:15',
    description: 'Learn how to import, create, and edit knitting patterns.'
  },
  {
    id: 4,
    title: 'Advanced Knitting Techniques',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800',
    duration: '12:47',
    description: 'Master advanced techniques for creating complex designs.'
  }
];

// Mock FAQ data
const faqs = [
  {
    id: 1,
    question: 'How do I connect my knitting device to ClawLab?',
    answer: 'To connect your device, go to "Hardware Settings" in the sidebar, select "Connection", and click "Connect to Device". Make sure your device is powered on and within range.'
  },
  {
    id: 2,
    question: 'Can I use my own yarn with ClawLab devices?',
    answer: 'Yes, ClawLab devices are compatible with most standard yarn types. However, for optimal results, we recommend using ClawLab-certified yarns available in our shop.'
  },
  {
    id: 3,
    question: 'How do I export my designs to the knitting machine?',
    answer: 'After creating your design, click the "Export" button in the editor. Select your connected device from the dropdown, review the export settings, and click "Send to Device".'
  },
  {
    id: 4,
    question: 'What file formats can I import into ClawLab?',
    answer: 'ClawLab supports importing designs in .png, .jpg, .svg, and .clw (ClawLab specific) formats. For best results, use high-contrast images with clear outlines.'
  },
  {
    id: 5,
    question: 'How do I update my device firmware?',
    answer: 'Go to "Hardware Settings", select the "Device Status" tab, and click "Update Firmware" if an update is available. Make sure your device is connected and has sufficient battery.'
  }
];

const HelpPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'tutorials' | 'faq'>('tutorials');
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const toggleFaq = (id: number) => {
    if (expandedFaqs.includes(id)) {
      setExpandedFaqs(expandedFaqs.filter(faqId => faqId !== id));
    } else {
      setExpandedFaqs([...expandedFaqs, id]);
    }
  };
  
  // Filter tutorials and FAQs based on search query
  const filteredTutorials = tutorials.filter(tutorial => 
    tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutorial.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Help Center</h1>
        <p className="text-gray-600 mt-1">Learn how to use ClawLab and get answers to common questions</p>
      </div>
      
      <div className="max-w-2xl mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for help topics..."
            className="w-full pl-10 pr-4 py-3 border border-claw-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-claw-blue-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${selectedTab === 'tutorials' ? 'text-claw-blue-500 border-b-2 border-claw-blue-500' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setSelectedTab('tutorials')}
        >
          Tutorials
        </button>
        <button
          className={`px-4 py-2 font-medium ${selectedTab === 'faq' ? 'text-claw-blue-500 border-b-2 border-claw-blue-500' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setSelectedTab('faq')}
        >
          FAQ
        </button>
      </div>
      
      {selectedTab === 'tutorials' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTutorials.map(tutorial => (
              <div key={tutorial.id} className="claw-card overflow-hidden">
                <div className="relative">
                  <img 
                    src={tutorial.thumbnail} 
                    alt={tutorial.title} 
                    className="w-full h-40 object-cover"
                  />
                  {tutorial.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                        <Play size={24} className="text-claw-blue-500 ml-1" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {tutorial.type === 'video' ? tutorial.duration : `${tutorial.readTime} read`}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg">{tutorial.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{tutorial.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {filteredTutorials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No tutorials found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}
      
      {selectedTab === 'faq' && (
        <div className="max-w-2xl">
          {filteredFaqs.map(faq => (
            <div key={faq.id} className="mb-4">
              <button
                className="w-full text-left claw-card p-4 flex justify-between items-center"
                onClick={() => toggleFaq(faq.id)}
              >
                <h3 className="font-medium">{faq.question}</h3>
                {expandedFaqs.includes(faq.id) ? (
                  <ChevronUp size={20} className="text-gray-500" />
                ) : (
                  <ChevronDown size={20} className="text-gray-500" />
                )}
              </button>
              
              {expandedFaqs.includes(faq.id) && (
                <div className="mt-1 p-4 bg-claw-blue-50 rounded-lg">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
          
          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No FAQs found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HelpPage;
