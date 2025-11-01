
import React from 'react';
import { ContactInfo } from '../types.ts';

interface StorefrontFooterProps {
    onNavigateToAdmin: () => void;
    contactInfo: ContactInfo;
    onNavigateToAbout: () => void;
    onNavigateToContact: () => void;
    onNavigateToShoppingGuide: () => void;
    onNavigateToPayment: () => void;
    onNavigateToShipping: () => void;
}

const StorefrontFooter: React.FC<StorefrontFooterProps> = (props) => {
  const { 
    onNavigateToAdmin, 
    contactInfo, 
    onNavigateToAbout, 
    onNavigateToContact,
    onNavigateToShoppingGuide,
    onNavigateToPayment,
    onNavigateToShipping,
  } = props;

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">關於</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <button onClick={onNavigateToAbout} className="text-base text-gray-500 hover:text-gray-900">
                  關於我們
                </button>
              </li>
              <li>
                <button onClick={onNavigateToContact} className="text-base text-gray-500 hover:text-gray-900">
                  聯絡我們
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">指南</h3>
            <ul className="mt-4 space-y-2">
              <li><button onClick={onNavigateToShoppingGuide} className="text-base text-gray-500 hover:text-gray-900">購物指南</button></li>
              <li><button onClick={onNavigateToPayment} className="text-base text-gray-500 hover:text-gray-900">付款方式</button></li>
              <li><button onClick={onNavigateToShipping} className="text-base text-gray-500 hover:text-gray-900">運送方式</button></li>
            </ul>
          </div>
           <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">聯絡</h3>
            <ul className="mt-4 space-y-2 text-base text-gray-500">
                {contactInfo.phone && <li>電話: {contactInfo.phone}</li>}
                {contactInfo.email && <li>Email: {contactInfo.email}</li>}
                {contactInfo.address && <li>地址: {contactInfo.address}</li>}
            </ul>
          </div>
          <div>
             <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">管理</h3>
            <ul className="mt-4 space-y-2">
                <li>
                    <button onClick={onNavigateToAdmin} className="text-base text-gray-500 hover:text-gray-900">
                        管理員登入
                    </button>
                </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-base text-gray-400 md:order-1">&copy; {new Date().getFullYear()} GK公仔玩具專賣店. 保留一切權利。</p>
          <div className="flex space-x-6 md:order-2 mt-4 md:mt-0">
             <a href={contactInfo.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">Facebook</a>
             <a href={contactInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StorefrontFooter;