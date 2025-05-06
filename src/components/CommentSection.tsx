
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Send } from 'lucide-react';
import { Textarea } from './ui/textarea';
import CommentItem from './CommentItem';
import { toast } from 'sonner';

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

interface CommentSectionProps {
  projectId: string;
  initialComments?: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ 
  projectId,
  initialComments = [] 
}) => {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<{id: string, author: string} | null>(null);
  
  const handleAddComment = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to comment');
      return;
    }
    
    if (!newComment.trim()) return;
    
    const commentText = replyTo 
      ? `@${replyTo.author} ${newComment}`
      : newComment;
    
    // In a real app, this would be an API call
    const newCommentObj: Comment = {
      id: `comment-${Date.now()}`,
      author: {
        id: user!.id,
        name: user!.name,
        avatar: user!.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      content: commentText,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment('');
    setReplyTo(null);
    
    toast.success('Comment added');
  };
  
  const handleLikeComment = (commentId: string) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to like comments');
      return;
    }
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const wasLiked = comment.isLiked;
        return {
          ...comment,
          isLiked: !wasLiked,
          likes: wasLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };
  
  const handleReplyComment = (commentId: string, authorName: string) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to reply');
      return;
    }
    
    setReplyTo({ id: commentId, author: authorName });
  };
  
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments ({comments.length})</h3>
      
      {/* Add comment form */}
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <img 
              src={user?.avatar || 'https://via.placeholder.com/40x40'} 
              alt={user?.name || 'User'}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            {replyTo && (
              <div className="flex items-center gap-2 mb-2 text-sm bg-gray-50 py-1 px-2 rounded">
                <span>Replying to <span className="font-medium">{replyTo.author}</span></span>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setReplyTo(null)}
                >
                  ✕
                </button>
              </div>
            )}
            
            <Textarea
              placeholder={isAuthenticated ? "Add a comment..." : "Please sign in to comment"}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full resize-none"
              rows={3}
              disabled={!isAuthenticated}
            />
            
            <div className="flex justify-end mt-2">
              <button 
                className={`flex items-center gap-1 px-4 py-2 rounded-md ${
                  isAuthenticated && newComment.trim() 
                    ? 'bg-claw-blue-500 hover:bg-claw-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleAddComment}
                disabled={!isAuthenticated || !newComment.trim()}
              >
                <Send size={16} />
                <span>Comment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Comments list */}
      <div className="space-y-1">
        {comments.length > 0 ? (
          comments.map(comment => (
            <CommentItem 
              key={comment.id}
              {...comment}
              onLike={handleLikeComment}
              onReply={handleReplyComment}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
