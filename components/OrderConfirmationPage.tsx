import React from 'react';
import { Order, Category, ContactInfo } from '../types';

interface OrderConfirmationPageProps {
  order: Order;
  shopName: string;
  onNavigateToStorefront: () => void;
  onNavigateToAdmin: () => void;
  contactInfo: ContactInfo;
}

const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = (props) => {
  const { order, shopName, onNavigateToStorefront } = props;

  if (!order) {
    // This might happen if the user refreshes the page.
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-gray-800">找不到訂單資訊</h1>
        <p className="mt-2 text-gray-600">可能是因為頁面已重新整理。</p>
        <button
          onClick={onNavigateToStorefront}
          className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          返回商店首頁
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-20">
            <button onClick={onNavigateToStorefront} className="text-2xl font-bold tracking-wider">{shopName}</button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">感謝您的訂購！</h1>
          <p className="mt-2 text-base text-gray-500">我們已收到您的訂單，正在處理中。</p>

          <div className="mt-8 text-sm font-medium">
            <p className="text-gray-900">訂單編號</p>
            <p className="mt-1 text-indigo-600">{order.id}</p>
          </div>

          <div className="mt-10">
            <button
              onClick={onNavigateToStorefront}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              繼續購物
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmationPage;
