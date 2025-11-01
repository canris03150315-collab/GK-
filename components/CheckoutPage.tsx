import React, { useState } from 'react';
import { CartItem, Product, CustomerInfo, ContactInfo, Category } from '../types';

interface CheckoutPageProps {
  cartItems: CartItem[];
  products: Product[];
  onPlaceOrder: (customerInfo: CustomerInfo) => void;
  onNavigateToCart: () => void;
  shopName: string;
  onNavigateToStorefront: () => void;
  contactInfo: ContactInfo;
}

const CheckoutPage: React.FC<CheckoutPageProps> = (props) => {
  const { cartItems, products, onPlaceOrder, onNavigateToCart, shopName, onNavigateToStorefront } = props;

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    email: '',
    name: '',
    address: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (Object.values(customerInfo).some(val => val.trim() === '')) {
      alert('請填寫所有必填欄位。');
      return;
    }
    onPlaceOrder(customerInfo);
  };

  const cartWithProductDetails = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  const subtotal = cartWithProductDetails.reduce((acc, item) => {
    return acc + (item.product!.price * item.quantity);
  }, 0);
  
  const shippingFee = subtotal >= 3000 ? 0 : 100;
  const total = subtotal + shippingFee;

  return (
    <div className="bg-gray-50">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-20">
            <button onClick={onNavigateToStorefront} className="text-2xl font-bold tracking-wider">{shopName}</button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <h1 className="sr-only">結帳</h1>

          <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">聯絡資訊</h2>
                <div className="mt-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">電子郵件</label>
                  <div className="mt-1">
                    <input type="email" id="email" name="email" value={customerInfo.email} onChange={handleInputChange} autoComplete="email" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">運送地址</h2>
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">收件人姓名</label>
                    <div className="mt-1">
                      <input type="text" id="name" name="name" value={customerInfo.name} onChange={handleInputChange} autoComplete="name" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">地址</label>
                    <div className="mt-1">
                      <input type="text" name="address" id="address" value={customerInfo.address} onChange={handleInputChange} autoComplete="street-address" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">電話</label>
                    <div className="mt-1">
                      <input type="text" name="phone" id="phone" value={customerInfo.phone} onChange={handleInputChange} autoComplete="tel" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">訂單摘要</h2>

              <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <ul role="list" className="divide-y divide-gray-200">
                  {cartWithProductDetails.map(({ product, quantity }) => (
                    <li key={product!.id} className="flex py-6 px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        <img src={product!.imageUrl} alt={product!.name} className="w-20 rounded-md" />
                      </div>

                      <div className="ml-6 flex-1 flex flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <span className="font-medium text-gray-700 hover:text-gray-800">{product!.name}</span>
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">數量: {quantity}</p>
                          </div>
                        </div>
                        <div className="flex-1 pt-2 flex items-end justify-between">
                          <p className="mt-1 text-sm font-medium text-gray-900">NT$ {(product!.price * quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">小計</dt>
                    <dd className="text-sm font-medium text-gray-900">NT$ {subtotal.toLocaleString()}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">運費</dt>
                    <dd className="text-sm font-medium text-gray-900">NT$ {shippingFee.toLocaleString()}</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">總計</dt>
                    <dd className="text-base font-medium text-gray-900">NT$ {total.toLocaleString()}</dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <button type="submit" className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                    完成訂購
                  </button>
                   <div className="mt-6 text-sm text-center">
                        <button onClick={onNavigateToCart} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                            <span aria-hidden="true"> &larr;</span> 返回購物車
                        </button>
                    </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
