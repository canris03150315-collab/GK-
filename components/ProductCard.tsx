import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onDelete: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  return (
    <div className="relative flex flex-col overflow-hidden bg-white border border-gray-200 rounded-lg group">
      <div className="overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="flex flex-col flex-1 p-4 space-y-2">
        <h3 className="text-sm font-medium text-gray-900">
          <span aria-hidden="true" className="absolute inset-0" />
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">NT$ {product.price.toLocaleString()}</p>
      </div>
      <button
        onClick={() => onDelete(product.id)}
        className="absolute top-2 right-2 z-10 p-1.5 text-gray-500 bg-white bg-opacity-75 rounded-full hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        aria-label={`刪除 ${product.name}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default ProductCard;