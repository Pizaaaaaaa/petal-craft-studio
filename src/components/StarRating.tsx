
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  maxRating = 5, 
  size = 16, 
  className = '' 
}) => {
  const stars = [];
  
  for (let i = 1; i <= maxRating; i++) {
    const isFilled = rating >= i;
    const isHalfFilled = rating >= i - 0.5 && rating < i;
    
    stars.push(
      <div key={i} className="relative">
        <Star 
          size={size} 
          className={`text-gray-300 ${className}`}
        />
        {(isFilled || isHalfFilled) && (
          <Star 
            size={size} 
            className={`absolute top-0 left-0 text-yellow-400 fill-yellow-400 ${className}`}
            style={{
              clipPath: isHalfFilled ? 'inset(0 50% 0 0)' : 'none'
            }}
          />
        )}
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-0.5">
      {stars}
    </div>
  );
};

export default StarRating;
