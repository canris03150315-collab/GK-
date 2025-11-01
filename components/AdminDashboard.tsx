
import React, { useState } from 'react';
import { Product, Category, CarouselImage, ContactInfo, AboutInfo, ContactPageInfo, ShoppingGuideInfo, PaymentInfo, ShippingInfo, Order, OrderStatus } from '../types.ts';
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import AddProductForm from './AddProductForm.tsx';
import ProductCard from './ProductCard.tsx';
import StorefrontSettings from './StorefrontSettings.tsx';
import CategoryManager from './CategoryManager.tsx';
import CarouselManager from './CarouselManager.tsx';
import ContactSettings from './ContactSettings.tsx';
import AboutSettings from './AboutSettings.tsx';
import ContactPageSettings from './ContactPageSettings.tsx';
import ShoppingGuideSettings from './ShoppingGuideSettings.tsx';
import PaymentSettings from './PaymentSettings.tsx';
import ShippingSettings from './ShippingSettings.tsx';
import SecuritySettings from './SecuritySettings.tsx';
import OrderHistory from './OrderHistory.tsx';
import SalesReport from './SalesReport.tsx';

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (productId: string) => void;
  onLogout: () => void;
  onNavigateToStorefront: () => void;
  shopName: string;
  onUpdateShopName: (name: string) => void;
  categories: Category[];
  onAddCategory: (name: string, parentId: string | null) => void;
  onDeleteCategory: (id: string) => void;
  onUpdateCategory: (id: string, newName: string) => void;
  carouselImages: CarouselImage[];
  onAddCarouselImage: (imageUrl: string) => void;
  onDeleteCarouselImage: (id: string) => void;
  contactInfo: ContactInfo;
  onUpdateContactInfo: (info: ContactInfo) => void;
  aboutInfo: AboutInfo;
  onUpdateAboutInfo: (info: AboutInfo) => void;
  contactPageInfo: ContactPageInfo;
  onUpdateContactPageInfo: (info: ContactPageInfo) => void;
  shoppingGuideInfo: ShoppingGuideInfo;
  onUpdateShoppingGuideInfo: (info: ShoppingGuideInfo) => void;
  paymentInfo: PaymentInfo;
  onUpdatePaymentInfo: (info: PaymentInfo) => void;
  shippingInfo: ShippingInfo;
  onUpdateShippingInfo: (info: ShippingInfo) => void;
  adminPassword: string;
  onUpdateAdminPassword: (newPassword: string) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
}

type AdminTab = 'reports' | 'products' | 'orders' | 'categories' | 'carousel' | 'settings' | 'contact' | 'about' | 'contactPage' | 'shoppingGuide' | 'payment' | 'shipping' | 'security';

const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('reports');
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  const getTabClass = (tabName: AdminTab) => {
    return activeTab === tabName 
      ? 'border-indigo-500 text-indigo-600' 
      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
  };
  
  const TABS: { id: AdminTab; label: string }[] = [
      { id: 'reports', label: '銷售報表' },
      { id: 'orders', label: '訂單管理' },
      { id: 'products', label: '商品管理' },
      { id: 'categories', label: '分類管理' },
      { id: 'carousel', label: '首頁橫幅' },
      { id: 'about', label: '關於我們' },
      { id: 'contactPage', label: '聯絡頁面' },
      { id: 'shoppingGuide', label: '購物指南'},
      { id: 'payment', label: '付款方式'},
      { id: 'shipping', label: '運送方式'},
      { id: 'contact', label: '聯絡資訊' },
      { id: 'settings', label: '商店設定' },
      { id: 'security', label: '安全設定' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header onLogout={props.onLogout} onNavigateToStorefront={props.onNavigateToStorefront} />
      <main className="flex-grow w-full max-w-7xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">管理後台</h1>

        {/* Tab Navigation */}
        <div className="mt-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
            {TABS.map(tab => (
                 <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)} 
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none ${getTabClass(tab.id)}`}
                    >
                    {tab.label}
                </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'reports' && (
             <div>
                <SalesReport orders={props.orders} products={props.products} />
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="md:flex md:items-center md:justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">商品列表</h2>
                <button
                  onClick={() => setShowAddProductForm(!showAddProductForm)}
                  className="mt-4 md:mt-0 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {showAddProductForm ? '取消' : '＋ 新增商品'}
                </button>
              </div>

              {showAddProductForm && (
                <div className="mt-6">
                  <AddProductForm 
                    onAddProduct={props.onAddProduct} 
                    categories={props.categories} 
                    onProductAdded={() => setShowAddProductForm(false)}
                  />
                </div>
              )}
              
              <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {props.products.length > 0 ? (
                  props.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onDelete={props.onDeleteProduct}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 sm:col-span-3">目前沒有商品，新增一個來開始吧。</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">訂單歷史紀錄</h2>
              <div className="mt-6">
                 <OrderHistory 
                    orders={props.orders} 
                    products={props.products}
                    onUpdateOrderStatus={props.onUpdateOrderStatus}
                />
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">分類管理</h2>
              <div className="mt-6 max-w-lg">
                 <CategoryManager 
                    categories={props.categories}
                    onAddCategory={props.onAddCategory}
                    onDeleteCategory={props.onDeleteCategory}
                    onUpdateCategory={props.onUpdateCategory}
                 />
              </div>
            </div>
          )}

          {activeTab === 'carousel' && (
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">橫幅管理</h2>
                <div className="mt-6">
                    <CarouselManager
                        images={props.carouselImages}
                        onAddImage={props.onAddCarouselImage}
                        onDeleteImage={props.onDeleteCarouselImage}
                    />
                </div>
            </div>
          )}
          
           {activeTab === 'about' && (
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">「關於我們」頁面管理</h2>
               <div className="mt-6 max-w-lg">
                <AboutSettings 
                    currentAboutInfo={props.aboutInfo}
                    onUpdateAboutInfo={props.onUpdateAboutInfo}
                />
              </div>
            </div>
          )}
          
          {activeTab === 'contactPage' && (
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">「聯絡我們」頁面管理</h2>
               <div className="mt-6 max-w-lg">
                <ContactPageSettings
                    currentContactPageInfo={props.contactPageInfo}
                    onUpdateContactPageInfo={props.onUpdateContactPageInfo}
                />
              </div>
            </div>
          )}
          
          {activeTab === 'shoppingGuide' && (
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">「購物指南」頁面管理</h2>
               <div className="mt-6 max-w-lg">
                <ShoppingGuideSettings
                    currentInfo={props.shoppingGuideInfo}
                    onUpdateInfo={props.onUpdateShoppingGuideInfo}
                />
              </div>
            </div>
          )}
          
          {activeTab === 'payment' && (
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">「付款方式」頁面管理</h2>
               <div className="mt-6 max-w-lg">
                <PaymentSettings
                    currentInfo={props.paymentInfo}
                    onUpdateInfo={props.onUpdatePaymentInfo}
                />
              </div>
            </div>
          )}
          
          {activeTab === 'shipping' && (
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">「運送方式」頁面管理</h2>
               <div className="mt-6 max-w-lg">
                <ShippingSettings
                    currentInfo={props.shippingInfo}
                    onUpdateInfo={props.onUpdateShippingInfo}
                />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">聯絡資訊管理</h2>
               <div className="mt-6 max-w-lg">
                <ContactSettings 
                    currentContactInfo={props.contactInfo}
                    onUpdateContactInfo={props.onUpdateContactInfo}
                />
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">商店管理</h2>
               <div className="mt-6 max-w-lg">
                <StorefrontSettings 
                    currentShopName={props.shopName}
                    onUpdateShopName={props.onUpdateShopName}
                />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">安全設定</h2>
               <div className="mt-6 max-w-lg">
                <SecuritySettings 
                    currentAdminPassword={props.adminPassword}
                    onUpdateAdminPassword={props.onUpdateAdminPassword}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;