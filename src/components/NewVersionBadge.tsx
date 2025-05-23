
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface NewVersionBadgeProps {
  className?: string;
}

const NewVersionBadge: React.FC<NewVersionBadgeProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Load visibility preference from localStorage on component mount
  useEffect(() => {
    const savedVisibility = localStorage.getItem('newVersionBadgeVisible');
    if (savedVisibility !== null) {
      setIsVisible(savedVisibility === 'true');
    }
  }, []);

  // Mock function for version update
  const handleVersionClick = () => {
    console.log('New version clicked - mock function executed');
    // Mock version update logic here
    alert('Checking for updates...');
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`inline-flex items-center bg-green-500 text-white rounded-md px-2 py-0.5 text-xs cursor-pointer hover:bg-green-600 transition-colors ${className}`}
      onClick={handleVersionClick}
    >
      <ArrowUp size={12} className="mr-1" />
      <span className="font-medium">新版本</span>
    </div>
  );
};

export default NewVersionBadge;
