import React from 'react';
import { ContactPageInfo, Category, ContactInfo } from '../types';
import StorefrontHeader from './StorefrontHeader';
import StorefrontFooter from './StorefrontFooter';

interface ContactPageProps {
  contactPageInfo: ContactPageInfo;
  contactInfo: ContactInfo;
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
}

const ContactPage: React.FC<ContactPageProps> = (props) => {
  const {
    contactPageInfo,
    contactInfo,
    shopName,
    categories,
    cartItemCount,
    onNavigateToCart,
    onNavigateToStorefront,
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
            src={contactPageInfo.imageUrl}
            alt="Contact us banner"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white text-center">
              {contactPageInfo.title}
            </h1>
          </div>
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="max-w-prose mx-auto py-16 lg:py-24">
            <div className="text-lg text-gray-500 whitespace-pre-line leading-8">
                {contactPageInfo.content}
            </div>
            <div className="mt-12 p-8 border border-gray-200 rounded-lg bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-900">Contact Details</h2>
                <ul className="mt-4 space-y-4 text-lg text-gray-700">
                    {contactInfo.phone && <li className="flex items-start"><span className="font-semibold w-24">Phone:</span><span>{contactInfo.phone}</span></li>}
                    {contactInfo.email && <li className="flex items-start"><span className="font-semibold w-24">Email:</span><span>{contactInfo.email}</span></li>}
                    {contactInfo.address && <li className="flex items-start"><span className="font-semibold w-24">Address:</span><span>{contactInfo.address}</span></li>}
                </ul>
            </div>
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

export default ContactPage;
