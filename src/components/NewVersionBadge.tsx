
import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface NewVersionBadgeProps {
  className?: string;
}

const NewVersionBadge: React.FC<NewVersionBadgeProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center bg-green-500 text-white rounded-md px-2 py-0.5 text-xs cursor-pointer hover:bg-green-600 transition-colors ${className}`}>
            <ArrowUp size={12} className="mr-1" />
            <span className="font-medium">新版本</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>New version available!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NewVersionBadge;
