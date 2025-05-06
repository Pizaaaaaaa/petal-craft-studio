
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, BookOpen, ShoppingCart, Settings, HelpCircle, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ClawSidebar: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="w-64 h-full bg-white border-r border-claw-blue-100 flex flex-col shadow-sm">
      <div className="flex items-center gap-2 p-4 border-b border-claw-blue-100">
        <span className="px-3 py-2 bg-gradient-to-r from-claw-blue-400 to-claw-blue-500 text-white rounded-lg">
          CL
        </span>
        <span className="text-xl font-bold bg-gradient-to-r from-claw-blue-400 to-claw-blue-500 bg-clip-text text-transparent">
          ClawLab
        </span>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-1">
        <NavLink to="/" className={({ isActive }) => 
          `menu-item ${isActive ? 'active' : ''}`
        }>
          <Home size={20} />
          <span>Home</span>
        </NavLink>
        
        <NavLink to="/my-works" className={({ isActive }) => 
          `menu-item ${isActive ? 'active' : ''}`
        }>
          <BookOpen size={20} />
          <span>My Works</span>
        </NavLink>
        
        <NavLink to="/membership" className={({ isActive }) => 
          `menu-item ${isActive ? 'active' : ''}`
        }>
          <ShoppingCart size={20} />
          <span>Membership & Shop</span>
        </NavLink>
        
        <NavLink to="/help" className={({ isActive }) => 
          `menu-item ${isActive ? 'active' : ''}`
        }>
          <HelpCircle size={20} />
          <span>Help</span>
        </NavLink>
        
        <NavLink to="/hardware-settings" className={({ isActive }) => 
          `menu-item ${isActive ? 'active' : ''}`
        }>
          <Settings size={20} />
          <span>Hardware Settings</span>
        </NavLink>
      </nav>
      
      <div className="p-4 border-t border-claw-blue-100">
        {isAuthenticated ? (
          <div 
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-claw-blue-50 cursor-pointer"
            onClick={() => navigate('/profile')}
          >
            <div className="w-10 h-10 rounded-full bg-claw-blue-200 flex items-center justify-center overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User size={20} className="text-claw-blue-500" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-sm">{user?.name || 'User'}</h3>
              <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
        ) : (
          <button 
            className="claw-button w-full"
            onClick={() => navigate('/profile')}
          >
            Sign In
          </button>
        )}
      </div>
    </aside>
  );
};

export default ClawSidebar;
