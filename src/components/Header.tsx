import React from 'react';
import { Sunrise, CheckSquare } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-amber-500 to-orange-400 text-white py-8 mb-8 rounded-lg shadow-lg fade-in">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <div className="bg-white/20 p-3 rounded-full mr-4 bounce-animation">
            <Sunrise className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Daily Task Manager</h1>
        </div>
        <p className="text-center mt-3 text-amber-50 max-w-md mx-auto">
          Organize your day, boost your productivity, and achieve your goals with ease
        </p>
        <div className="flex justify-center mt-4">
          <div className="bg-white/10 rounded-full px-4 py-1 text-xs font-medium text-white flex items-center slide-in-right">
            <CheckSquare className="h-3 w-3 mr-1" />
            <span>Make every day count</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
