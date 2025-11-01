import React from 'react';

interface HeaderProps {
  onLogout: () => void;
  onNavigateToStorefront: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onNavigateToStorefront }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="w-full max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">
              GK公仔玩具專賣店 管理後台
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateToStorefront}
              className="px-3 py-2 text-sm font-medium text-gray-600 bg-transparent border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              查看商店
            </button>
            <button
              onClick={onLogout}
              className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              登出
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;