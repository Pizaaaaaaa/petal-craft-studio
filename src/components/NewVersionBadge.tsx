
import React, { useState } from 'react';
import { ArrowUp, X } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { 
  Avatar,
  AvatarImage,
  AvatarFallback 
} from "@/components/ui/avatar";

const NewVersionBadge: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center bg-green-500 text-white rounded-lg shadow-lg pr-3 pl-4 py-2 cursor-pointer hover:bg-green-600 transition-colors">
              <ArrowUp size={16} className="mr-2" />
              <span className="text-sm font-medium">新版本</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVisible(false);
                }} 
                className="ml-2 p-0.5 hover:bg-green-600 rounded-full"
              >
                <X size={14} />
              </button>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>New version available!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default NewVersionBadge;
