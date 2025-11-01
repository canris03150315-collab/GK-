import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="w-full max-w-6xl px-4 py-6 mx-auto sm:px-6 lg:px-8">
        <p className="text-sm text-center text-gray-500">
          © {new Date().getFullYear()} GK公仔玩具專賣店. 保留一切權利。
        </p>
      </div>
    </footer>
  );
};

export default Footer;