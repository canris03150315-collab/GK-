
import React, { useState, useMemo } from 'react';
import { Category } from '../types.ts';

interface StorefrontHeaderProps {
  shopName: string;
  categories: Category[];
  onSelectCategory: (id: string | null) => void;
  cartItemCount: number;
  onNavigateToCart: () => void;
  onNavigateToAbout: () => void;
  onNavigateToContact: () => void;
}

type CategoryNode = Category & { children: CategoryNode[] };

// Recursive component for sub-menu items (for fly-out menus)
const SubNavItem: React.FC<{
  item: CategoryNode;
  onSelectCategory: (id: string) => void;
}> = ({ item, onSelectCategory }) => {
  const hasChildren = item.children.length > 0;
  return (
    <div className="relative group/sub">
      <button
        onClick={(e) => {
            e.stopPropagation();
            onSelectCategory(item.id)
        }}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between items-center"
      >
        {item.name}
        {hasChildren && (
          <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
        )}
      </button>
      {hasChildren && (
        <div className="absolute top-0 left-full -mt-1 ml-0 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover/sub:opacity-100 transition-opacity duration-200 pointer-events-none group-hover/sub:pointer-events-auto z-10">
          <div className="py-1">
            {item.children.map(child => (
              <SubNavItem key={child.id} item={child} onSelectCategory={onSelectCategory} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


// Recursive component for mobile menu items
const MobileNavItem: React.FC<{
    item: CategoryNode;
    onSelectCategory: (id: string) => void;
    closeMenu: () => void;
}> = ({ item, onSelectCategory, closeMenu }) => {
    const handleClick = (id: string) => {
        onSelectCategory(id);
        closeMenu();
    };

    return (
        <div className="text-center w-full">
            <button onClick={() => handleClick(item.id)} className="text-sm font-medium tracking-wider py-2 text-gray-700 w-full">{item.name}</button>
            {item.children.length > 0 && (
                <div className="pl-4 border-l-2 border-gray-200 ml-2">
                    {item.children.map(child => (
                        <MobileNavItem 
                            key={child.id}
                            item={child}
                            onSelectCategory={onSelectCategory}
                            closeMenu={closeMenu}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};


const StorefrontHeader: React.FC<StorefrontHeaderProps> = ({ shopName, categories, onSelectCategory, cartItemCount, onNavigateToCart, onNavigateToAbout, onNavigateToContact }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navTree = useMemo((): CategoryNode[] => {
        const buildTree = (parentId: string | null): CategoryNode[] => {
            return categories
                .filter(cat => cat.parentId === parentId)
                .map(cat => ({
                    ...cat,
                    children: buildTree(cat.id),
                }));
        };
        return buildTree(null);
    }, [categories]);

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md z-20 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 p-2" aria-label="開啟選單">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 md:static md:left-0 md:translate-x-0">
            <button onClick={() => onSelectCategory(null)} className="text-2xl font-bold tracking-wider">{shopName}</button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => onSelectCategory(null)} 
              className="text-sm font-medium tracking-wider text-gray-500 hover:text-gray-800"
            >
              所有商品
            </button>
            {navTree.map(link => (
              <div key={link.id} className="relative group/main">
                 <button 
                    onClick={() => onSelectCategory(link.id)}
                    className="text-sm font-medium tracking-wider text-gray-500 hover:text-gray-800 flex items-center"
                 >
                    {link.name}
                    {link.children.length > 0 && (
                        <svg className="ml-1 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    )}
                 </button>
                 {link.children.length > 0 && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover/main:opacity-100 transition-opacity duration-200 pointer-events-none group-hover/main:pointer-events-auto z-10">
                        <div className="py-1">
                            {link.children.map(child => (
                                <SubNavItem key={child.id} item={child} onSelectCategory={onSelectCategory} />
                            ))}
                        </div>
                    </div>
                 )}
              </div>
            ))}
            <button 
              onClick={onNavigateToAbout} 
              className="text-sm font-medium tracking-wider text-gray-500 hover:text-gray-800"
            >
              關於我們
            </button>
            <button 
              onClick={onNavigateToContact} 
              className="text-sm font-medium tracking-wider text-gray-500 hover:text-gray-800"
            >
              聯絡我們
            </button>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-800 hover:text-gray-500 p-2" aria-label="搜尋">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button onClick={onNavigateToCart} className="text-gray-800 hover:text-gray-500 p-2 relative" aria-label="購物車">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-20 left-0 w-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-[150%]'}`}>
        <nav className="flex flex-col items-center space-y-2 py-4">
           <button onClick={() => { onSelectCategory(null); setIsMenuOpen(false); }} className="text-sm font-medium tracking-wider py-2">所有商品</button>
           {navTree.map(link => (
              <MobileNavItem 
                key={link.id} 
                item={link}
                onSelectCategory={onSelectCategory}
                closeMenu={() => setIsMenuOpen(false)}
               />
           ))}
           <button onClick={() => { onNavigateToAbout(); setIsMenuOpen(false); }} className="text-sm font-medium tracking-wider py-2">關於我們</button>
           <button onClick={() => { onNavigateToContact(); setIsMenuOpen(false); }} className="text-sm font-medium tracking-wider py-2">聯絡我們</button>
        </nav>
      </div>
    </header>
  );
};

export default StorefrontHeader;