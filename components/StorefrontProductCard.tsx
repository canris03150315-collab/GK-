import React from 'react';
import { Product } from '../types';

interface StorefrontProductCardProps {
  product: Product;
  onProductClick: (productId: string) => void;
}

const StorefrontProductCard: React.FC<StorefrontProductCardProps> = ({ product, onProductClick }) => {
  return (
    <div 
      onClick={() => onProductClick(product.id)}
      className="relative flex flex-col overflow-hidden transition-shadow duration-300 bg-white border border-gray-200 rounded-lg cursor-pointer group hover:shadow-xl"
    >
      <div className="overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-1 p-4 space-y-2">
        <h3 className="text-sm font-medium text-gray-900">
          <span aria-hidden="true" className="absolute inset-0" />
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">NT$ {product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default StorefrontProductCard;
