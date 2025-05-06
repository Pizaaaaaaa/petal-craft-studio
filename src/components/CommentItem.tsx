
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { ThumbsUp, Reply, Flag } from 'lucide-react';

interface CommentItemProps {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  onLike?: (id: string) => void;
  onReply?: (id: string, author: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  id,
  author,
  content,
  createdAt,
  likes,
  isLiked = false,
  onLike,
  onReply
}) => {
  const formattedTime = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div className="flex space-x-3 py-4">
      <Link to={`/user/${author.id}`} className="flex-shrink-0">
        <img 
          src={author.avatar} 
          alt={author.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      </Link>
      
      <div className="flex-1">
        <div className="bg-gray-50 px-4 py-3 rounded-lg">
          <div className="flex justify-between items-start">
            <Link to={`/user/${author.id}`} className="font-medium hover:underline">
              {author.name}
            </Link>
            <span className="text-xs text-gray-500">{formattedTime}</span>
          </div>
          
          <p className="mt-1 text-gray-800">{content}</p>
        </div>
        
        <div className="flex items-center mt-2 text-sm text-gray-600 space-x-4">
          <button 
            className={`flex items-center gap-1 hover:text-gray-900 ${isLiked ? 'text-claw-blue-500' : ''}`}
            onClick={() => onLike && onLike(id)}
          >
            <ThumbsUp size={14} className={isLiked ? 'fill-claw-blue-500' : ''} />
            <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
          </button>
          
          <button 
            className="flex items-center gap-1 hover:text-gray-900"
            onClick={() => onReply && onReply(id, author.name)}
          >
            <Reply size={14} />
            <span>Reply</span>
          </button>
          
          <button className="flex items-center gap-1 hover:text-gray-900">
            <Flag size={14} />
            <span>Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
