
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, BookOpen, ShoppingBag, HelpCircle, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  path: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon: Icon, label, path, active, onClick }: SidebarItemProps) => {
  return (
    <button 
      className={cn("menu-item group", active && "active")} 
      onClick={onClick}
    >
      <div className="icon-wrapper">
        <Icon size={18} className="text-craft-pink-400" />
      </div>
      <span className="hidden md:block">{label}</span>
      {active && (
        <span className="absolute w-1 h-8 bg-craft-pink-400 rounded-full left-0 hidden md:block"></span>
      )}
    </button>
  );
};

type SidebarProps = {
  activePage: string;
  onNavigate: (page: string) => void;
}

const Sidebar = ({ activePage, onNavigate }: SidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'works', label: 'My Works', icon: BookOpen, path: '/my-works' },
    { id: 'store', label: 'Store', icon: ShoppingBag, path: '/store' },
    { id: 'help', label: 'Help', icon: HelpCircle, path: '/help' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleNavigation = (item: typeof menuItems[0]) => {
    onNavigate(item.id);
    navigate(item.path);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    toast("Viewing profile", {
      description: "Opening your profile page",
      duration: 2000
    });
  };

  return (
    <aside className="h-screen w-[80px] md:w-[240px] bg-white border-r border-craft-pink-100 flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center justify-center md:justify-start gap-2 border-b border-craft-pink-100">
        <div 
          className="w-10 h-10 rounded-full bg-gradient-to-r from-craft-pink-300 to-craft-lavender-400 flex items-center justify-center cursor-pointer"
          onClick={() => navigate('/')}
        >
          <span className="text-white font-serif font-bold text-xl">C</span>
        </div>
        <h1 className="hidden md:block font-serif text-xl font-medium">Clawlab</h1>
      </div>
      
      {/* Menu */}
      <div className="flex-1 py-8 flex flex-col gap-2 px-3">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            path={item.path}
            active={activePage === item.id}
            onClick={() => handleNavigation(item)}
          />
        ))}
      </div>
      
      {/* User Profile */}
      <div 
        className="p-4 border-t border-craft-pink-100 flex items-center gap-3 relative cursor-pointer"
        onClick={handleProfileClick}
      >
        <div className="relative w-12 h-12 flower-decoration star-decoration">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-craft-lavender-200 to-craft-pink-200 p-0.5">
            <img 
              src="https://i.pravatar.cc/150?img=44" 
              alt="User avatar" 
              className="w-full h-full object-cover rounded-full border-2 border-white"
            />
          </div>
        </div>
        <div className="hidden md:block">
          <p className="font-medium text-sm">Flora Smith</p>
          <p className="text-xs text-muted-foreground">Premium Member</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
