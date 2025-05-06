
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Instagram, Link, Copy, X } from 'lucide-react';
import { toast } from 'sonner';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  url 
}) => {
  const socialPlatforms = [
    { 
      name: 'Facebook', 
      icon: Facebook, 
      color: 'bg-blue-600 hover:bg-blue-700',
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      color: 'bg-sky-500 hover:bg-sky-600',
      shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      color: 'bg-blue-700 hover:bg-blue-800',
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      color: 'bg-pink-600 hover:bg-pink-700',
      shareUrl: `https://www.instagram.com/?url=${encodeURIComponent(url)}`
    }
  ];

  const handleShare = (platform: string, shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
    toast.success(`Shared to ${platform}!`);
    onClose();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Link copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy link');
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this project</DialogTitle>
          <DialogDescription>
            Share this knitting project with your friends and followers
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          {socialPlatforms.map((platform) => (
            <Button
              key={platform.name}
              variant="outline"
              className={`flex items-center justify-center gap-2 text-white ${platform.color}`}
              onClick={() => handleShare(platform.name, platform.shareUrl)}
            >
              <platform.icon className="h-5 w-5" />
              {platform.name}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2 mt-2">
          <div className="bg-gray-100 flex items-center rounded-md w-full overflow-hidden">
            <div className="px-3 py-2 text-sm text-gray-600 truncate flex-1">
              {url}
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-full rounded-none border-l"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-end mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
