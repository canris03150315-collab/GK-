import React from 'react';
import { CartItem, Product, ContactInfo } from '../types';
import StorefrontFooter from './StorefrontFooter';

interface CartPageProps {
  cartItems: CartItem[];
  products: Product[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onNavigateToStorefront: () => void;
  shopName: string;
  onNavigateToAdmin: () => void;
  contactInfo: ContactInfo;
  onNavigateToAbout: () => void;
  onNavigateToContact: () => void;
  onNavigateToShoppingGuide: () => void;
  onNavigateToPayment: () => void;
  onNavigateToShipping: () => void;
  onNavigateToCheckout: () => void;
}

const CartPage: React.FC<CartPageProps> = (props) => {
  const {
    cartItems,
    products,
    onUpdateQuantity,
    onRemoveItem,
    onNavigateToStorefront,
    shopName,
    onNavigateToAdmin,
    contactInfo,
    onNavigateToAbout,
    onNavigateToContact,
    onNavigateToShoppingGuide,
    onNavigateToPayment,
    onNavigateToShipping,
    onNavigateToCheckout,
  } = props;

  const cartWithProductDetails = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product,
    };
  }).filter(item => item.product); // Filter out items where product might not be found

  const total = cartWithProductDetails.reduce((acc, item) => {
    return acc + (item.product!.price * item.quantity);
  }, 0);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
       <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center h-20">
                    <button onClick={onNavigateToStorefront} className="text-2xl font-bold tracking-wider">{shopName}</button>
                </div>
            </div>
       </header>

       <main className="max-w-4xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 flex-grow w-full">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center">您的購物車</h1>
            
            {cartItems.length === 0 ? (
                <div className="text-center mt-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h2 className="mt-2 text-lg font-medium text-gray-900">您的購物車是空的</h2>
                    <p className="mt-1 text-sm text-gray-500">看來您尚未新增任何商品到購物車。</p>
                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={onNavigateToStorefront}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            &larr; 繼續購物
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mt-12">
                    <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
                        {cartWithProductDetails.map(({ product, quantity }) => (
                            <li key={product!.id} className="flex py-6 sm:py-10">
                                <div className="flex-shrink-0">
                                    <img src={product!.imageUrl} alt={product!.name} className="w-24 h-24 rounded-lg object-center object-cover sm:w-32 sm:h-32" />
                                </div>
                                <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                    <div>
                                        <div className="flex justify-between">
                                            <h3 className="text-sm">
                                                <a href="#" className="font-medium text-gray-700 hover:text-gray-800">{product!.name}</a>
                                            </h3>
                                            <p className="ml-4 text-sm font-medium text-gray-900">NT$ {product!.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex-1 flex items-end justify-between">
                                         <div className="flex items-center">
                                            <button type="button" onClick={() => onUpdateQuantity(product!.id, quantity - 1)} className="w-8 h-8 flex items-center justify-center border rounded-md text-gray-600 hover:bg-gray-100">-</button>
                                            <span className="w-10 text-center">{quantity}</span>
                                            <button type="button" onClick={() => onUpdateQuantity(product!.id, quantity + 1)} className="w-8 h-8 flex items-center justify-center border rounded-md text-gray-600 hover:bg-gray-100">+</button>
                                        </div>
                                        <button type="button" onClick={() => onRemoveItem(product!.id)} className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            <span>移除</span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10 sm:ml-32 sm:pl-6">
                        <div className="bg-gray-100 rounded-lg p-4">
                             <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">小計</p>
                                <p className="text-sm font-medium text-gray-900">NT$ {total.toLocaleString()}</p>
                            </div>
                             <div className="flex items-center justify-between mt-2 border-t pt-2">
                                <p className="text-base font-medium text-gray-900">訂單總計</p>
                                <p className="text-base font-medium text-gray-900">NT$ {total.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button 
                                onClick={onNavigateToCheckout}
                                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                            >
                                前往結帳
                            </button>
                        </div>
                        <div className="mt-6 text-sm text-center">
                            <button onClick={onNavigateToStorefront} className="font-medium text-indigo-600 hover:text-indigo-500">
                                或 <span aria-hidden="true"> &larr;</span> 繼續購物
                            </button>
                        </div>
                    </div>
                </div>
            )}
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

export default CartPage;
