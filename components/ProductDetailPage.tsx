
import React, { useState } from 'react';
import { Product, Category, ContactInfo } from '../types.ts';
import StorefrontFooter from './StorefrontFooter.tsx';

interface ProductDetailPageProps {
  product: Product;
  onBackToStore: () => void;
  shopName: string;
  categories: Category[];
  onNavigateToAdmin: () => void;
  onAddToCart: (productId: string, quantity: number) => void;
  cartItemCount: number;
  onNavigateToCart: () => void;
  contactInfo: ContactInfo;
  onNavigateToAbout: () => void;
  onNavigateToContact: () => void;
  onNavigateToShoppingGuide: () => void;
  onNavigateToPayment: () => void;
  onNavigateToShipping: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = (props) => {
  const { 
    product, 
    onBackToStore, 
    shopName, 
    categories, 
    onNavigateToAdmin,
    onAddToCart,
    cartItemCount,
    onNavigateToCart,
    contactInfo,
    onNavigateToAbout,
    onNavigateToContact,
    onNavigateToShoppingGuide,
    onNavigateToPayment,
    onNavigateToShipping,
  } = props;

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <p className="text-xl text-gray-600">找不到商品。</p>
            <button onClick={onBackToStore} className="mt-4 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                &larr; 回到商店
            </button>
        </div>
    );
  }

  const category = categories.find(c => c.id === product.categoryId);
  const parentCategory = category?.parentId ? categories.find(c => c.id === category.parentId) : null;
  
  const handleFormSubmit = (e: React.FormEvent, isBuyNow: boolean) => {
    e.preventDefault();
    onAddToCart(product.id, quantity);
    if (isBuyNow) {
      onNavigateToCart();
    }
  };

  return (
    <div className="bg-white">
       <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <button onClick={onBackToStore} className="text-2xl font-bold tracking-wider">{shopName}</button>
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
       </header>

      <main className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-sm breadcrumbs">
            <ul className="flex items-center space-x-2 text-gray-500">
                <li><button onClick={onBackToStore} className="hover:text-gray-700">首頁</button></li>
                {parentCategory && <>
                    <li>/</li>
                    <li><span className="text-gray-500">{parentCategory.name}</span></li>
                </>}
                 {category && <>
                    <li>/</li>
                    <li><span className="text-gray-900">{category.name}</span></li>
                </>}
            </ul>
        </div>
        
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start mt-8">
          {/* Image gallery */}
          <div className="aspect-w-1 aspect-h-1">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-cover object-center w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Product info */}
          <div className="mt-10 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

            <div className="mt-3">
              <p className="text-3xl text-gray-900">NT$ {product.price.toLocaleString()}</p>
            </div>

            <form className="mt-8">
                <div>
                  <h4 className="text-sm text-gray-900 font-medium">數量</h4>
                  <div className="mt-2 flex items-center">
                    <button 
                      type="button" 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity <= 1}
                      aria-label="減少數量"
                    >
                      -
                    </button>
                    <span className="w-12 h-10 flex items-center justify-center text-center border-t border-b border-gray-300">{quantity}</span>
                    <button 
                      type="button"
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md text-gray-700 hover:bg-gray-100"
                      aria-label="增加數量"
                    >
                      +
                    </button>
                  </div>
                </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={(e) => handleFormSubmit(e, false)}
                  className="w-full bg-transparent border border-gray-800 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-800 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  加入購物車
                </button>
                <button
                  type="button"
                  onClick={(e) => handleFormSubmit(e, true)}
                  className="w-full bg-gray-800 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  立即購買
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Description and Shipping Tabs */}
        <div className="w-full mt-16">
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button 
                        onClick={() => setActiveTab('description')}
                        className={`${activeTab === 'description' ? 'border-gray-800 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                    >
                        商品描述
                    </button>
                    <button 
                        onClick={() => setActiveTab('shipping')}
                        className={`${activeTab === 'shipping' ? 'border-gray-800 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                    >
                        運送及付款
                    </button>
                </nav>
            </div>

            <div className="mt-8">
                {activeTab === 'description' && (
                    <div className="space-y-6 text-base text-gray-700" style={{ whiteSpace: 'pre-line' }}>
                        {product.description}
                    </div>
                )}
                {activeTab === 'shipping' && (
                    <div className="space-y-4 text-base text-gray-700">
                        <p><strong>運送方式:</strong></p>
                        <ul className="list-disc list-inside">
                            <li>宅配</li>
                            <li>超商取貨</li>
                        </ul>
                        <p><strong>付款方式:</strong></p>
                        <ul className="list-disc list-inside">
                            <li>信用卡</li>
                            <li>銀行轉帳</li>
                            <li>貨到付款</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
      </main>

      <StorefrontFooter 
        onNavigateToAdmin={onNavigateToAdmin} 
        contactInfo={contactInfo} 
        onNavigateToAbout={onNavigateToAbout} 
        onNavigateToContact={onNavigateToContact}
        onNavigateToShoppingGuide={onNavigateToShoppingGuide}
        onNavigateToPayment={onNavigateToPayment}
        onNavigateToShipping={onNavigateToShipping}
      />
    </div>
  );
};

export default ProductDetailPage;