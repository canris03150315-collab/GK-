import React from 'react';
import { PaymentInfo, Category, ContactInfo } from '../types';
import StorefrontHeader from './StorefrontHeader';
import StorefrontFooter from './StorefrontFooter';

interface PageProps {
  info: PaymentInfo;
  shopName: string;
  categories: Category[];
  cartItemCount: number;
  onNavigateToCart: () => void;
  onNavigateToStorefront: () => void;
  onNavigateToAdmin: () => void;
  onNavigateToAbout: () => void;
  onNavigateToContact: () => void;
  onNavigateToShoppingGuide: () => void;
  onNavigateToPayment: () => void;
  onNavigateToShipping: () => void;
  // FIX: Added missing contactInfo prop to the interface.
  contactInfo: ContactInfo;
}

const PaymentPage: React.FC<PageProps> = (props) => {
    const { info } = props;
    return (
    <div className="bg-white">
      <StorefrontHeader
        shopName={props.shopName}
        categories={props.categories}
        onSelectCategory={() => props.onNavigateToStorefront()}
        cartItemCount={props.cartItemCount}
        onNavigateToCart={props.onNavigateToCart}
        onNavigateToAbout={props.onNavigateToAbout}
        onNavigateToContact={props.onNavigateToContact}
      />

      <main>
        <div className="relative h-96 bg-gray-800">
          <img
            className="w-full h-full object-cover opacity-50"
            src={info.imageUrl}
            alt="Banner"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white text-center">
              {info.title}
            </h1>
          </div>
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="max-w-prose mx-auto py-16 lg:py-24 text-lg">
            <p className="text-gray-500 whitespace-pre-line leading-8">
                {info.content}
            </p>
          </div>
        </div>
      </main>

      <StorefrontFooter
        onNavigateToAdmin={props.onNavigateToAdmin}
        contactInfo={props.contactInfo}
        onNavigateToAbout={props.onNavigateToAbout}
        onNavigateToContact={props.onNavigateToContact}
        onNavigateToShoppingGuide={props.onNavigateToShoppingGuide}
        onNavigateToPayment={props.onNavigateToPayment}
        onNavigateToShipping={props.onNavigateToShipping}
      />
    </div>
  );
};

export default PaymentPage;