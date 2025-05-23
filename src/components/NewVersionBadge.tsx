
import React, { useState, useEffect } from 'react';
import { ArrowUp, X } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";

interface NewVersionBadgeProps {
  className?: string;
}

const NewVersionBadge: React.FC<NewVersionBadgeProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  // Load visibility preference from localStorage on component mount
  useEffect(() => {
    const savedVisibility = localStorage.getItem('newVersionBadgeVisible');
    if (savedVisibility !== null) {
      setIsVisible(savedVisibility === 'true');
    }
  }, []);

  // Save preference to localStorage when changed
  const toggleVisibility = (value: boolean) => {
    setIsVisible(value);
    localStorage.setItem('newVersionBadgeVisible', String(value));
  };

  if (!isVisible) return null;

  return (
    <TooltipProvider>
      <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
        <TooltipTrigger asChild>
          <div 
            className={`inline-flex items-center bg-green-500 text-white rounded-md px-2 py-0.5 text-xs cursor-pointer hover:bg-green-600 transition-colors ${className}`}
            onClick={() => setIsTooltipOpen(!isTooltipOpen)}
          >
            <ArrowUp size={12} className="mr-1" />
            <span className="font-medium">新版本</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="p-4 w-64">
          <div className="space-y-4">
            <p>New version available!</p>
            <div className="flex items-center justify-between">
              <span className="text-sm">Show new version badge</span>
              <Switch 
                checked={true} 
                onCheckedChange={(value) => {
                  toggleVisibility(value);
                  setIsTooltipOpen(false);
                }}
              />
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NewVersionBadge;
