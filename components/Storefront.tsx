
import React, { useState } from 'react';
import { Product, Category, CarouselImage, ContactInfo } from '../types.ts';
import StorefrontHeader from './StorefrontHeader.tsx';
import Carousel from './Carousel.tsx';
import StorefrontProductCard from './StorefrontProductCard.tsx';
import StorefrontFooter from './StorefrontFooter.tsx';

interface StorefrontProps {
  shopName: string;
  carouselImages: CarouselImage[];
  products: Product[];
  categories: Category[];
  onNavigateToAdmin: () => void;
  onProductClick: (productId: string) => void;
  cartItemCount: number;
  onNavigateToCart: () => void;
  contactInfo: ContactInfo;
  onNavigateToAbout: () => void;
  onNavigateToContact: () => void;
  onNavigateToShoppingGuide: () => void;
  onNavigateToPayment: () => void;
  onNavigateToShipping: () => void;
}

const getCategoryAndAllDescendantIds = (categoryId: string, allCategories: Category[]): string[] => {
    const ids = new Set<string>();
    const queue = [categoryId];
    ids.add(categoryId);

    while (queue.length > 0) {
        const currentId = queue.shift()!;
        const children = allCategories.filter(c => c.parentId === currentId);
        for (const child of children) {
            if (!ids.has(child.id)) {
                ids.add(child.id);
                queue.push(child.id);
            }
        }
    }
    return Array.from(ids);
};


const Storefront: React.FC<StorefrontProps> = ({ 
  shopName, 
  carouselImages, 
  products, 
  categories, 
  onNavigateToAdmin, 
  onProductClick,
  cartItemCount,
  onNavigateToCart,
  contactInfo,
  onNavigateToAbout,
  onNavigateToContact,
  onNavigateToShoppingGuide,
  onNavigateToPayment,
  onNavigateToShipping,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const filteredProducts = activeCategoryId
    ? products.filter(p => {
        if (!p.categoryId) return false;
        const idsToMatch = getCategoryAndAllDescendantIds(activeCategoryId, categories);
        return idsToMatch.includes(p.categoryId);
      })
    : products;

  const activeCategory = categories.find(c => c.id === activeCategoryId);
  const pageTitle = activeCategory ? activeCategory.name : '所有商品';

  return (
    <div className="bg-white">
      <StorefrontHeader 
        shopName={shopName}
        categories={categories}
        onSelectCategory={setActiveCategoryId}
        cartItemCount={cartItemCount}
        onNavigateToCart={onNavigateToCart}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToContact={onNavigateToContact}
      />
      <Carousel images={carouselImages} />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
             {pageTitle}
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <StorefrontProductCard 
                        key={product.id} 
                        product={product} 
                        onProductClick={onProductClick}
                    />
                ))
            ) : (
                <p className="text-gray-500 sm:col-span-2 lg:col-span-4 text-center">這個分類中沒有商品。</p>
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

export default Storefront;