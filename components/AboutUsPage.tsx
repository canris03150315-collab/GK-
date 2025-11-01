import React from 'react';
import { AboutInfo, Category, ContactInfo } from '../types';
import StorefrontHeader from './StorefrontHeader';
import StorefrontFooter from './StorefrontFooter';

interface AboutUsPageProps {
  aboutInfo: AboutInfo;
  shopName: string;
  categories: Category[];
  cartItemCount: number;
  onNavigateToCart: () => void;
  onNavigateToStorefront: () => void;
  contactInfo: ContactInfo;
  onNavigateToAdmin: () => void;
  onNavigateToAbout: () => void;
  onNavigateToContact: () => void;
  onNavigateToShoppingGuide: () => void;
  onNavigateToPayment: () => void;
  onNavigateToShipping: () => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = (props) => {
  const {
    aboutInfo,
    shopName,
    categories,
    cartItemCount,
    onNavigateToCart,
    onNavigateToStorefront,
    contactInfo,
    onNavigateToAdmin,
    onNavigateToAbout,
    onNavigateToContact,
    onNavigateToShoppingGuide,
    onNavigateToPayment,
    onNavigateToShipping,
  } = props;

  return (
    <div className="bg-white">
      <StorefrontHeader
        shopName={shopName}
        categories={categories}
        onSelectCategory={(id) => {
            onNavigateToStorefront(); 
        }}
        cartItemCount={cartItemCount}
        onNavigateToCart={onNavigateToCart}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToContact={onNavigateToContact}
      />

      <main>
        <div className="relative h-96 bg-gray-800">
          <img
            className="w-full h-full object-cover opacity-50"
            src={aboutInfo.imageUrl}
            alt="About us banner"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white text-center">
              {aboutInfo.title}
            </h1>
          </div>
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="max-w-prose mx-auto py-16 lg:py-24 text-lg">
            <p className="text-gray-500 whitespace-pre-line leading-8">
                {aboutInfo.content}
            </p>
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

export default AboutUsPage;
