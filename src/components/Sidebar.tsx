
import React from 'react';
import { Home, BookOpen, ShoppingBag, HelpCircle, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => {
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
  const menuItems = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'works', label: '我的作品', icon: BookOpen },
    { id: 'store', label: '会员商城', icon: ShoppingBag },
    { id: 'help', label: '帮助', icon: HelpCircle },
    { id: 'settings', label: '设置', icon: Settings },
  ];

  return (
    <aside className="h-screen w-[80px] md:w-[240px] bg-white border-r border-craft-pink-100 flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center justify-center md:justify-start gap-2 border-b border-craft-pink-100">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-craft-pink-300 to-craft-lavender-400 flex items-center justify-center">
          <span className="text-white font-serif font-bold text-xl">P</span>
        </div>
        <h1 className="hidden md:block font-serif text-xl font-medium">花瓣工坊</h1>
      </div>
      
      {/* Menu */}
      <div className="flex-1 py-8 flex flex-col gap-2 px-3">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activePage === item.id}
            onClick={() => onNavigate(item.id)}
          />
        ))}
      </div>
      
      {/* User Profile */}
      <div className="p-4 border-t border-craft-pink-100 flex items-center gap-3 relative">
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
          <p className="font-medium text-sm">默默小花</p>
          <p className="text-xs text-muted-foreground">高级会员</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
