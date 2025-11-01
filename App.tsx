
import React, { useState, useEffect } from 'react';
import { Product, Category, CartItem, CarouselImage, ContactInfo, AboutInfo, ContactPageInfo, ShoppingGuideInfo, PaymentInfo, ShippingInfo, CustomerInfo, Order, OrderStatus } from './types.ts';
import Login from './components/Login.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import Storefront from './components/Storefront.tsx';
import ProductDetailPage from './components/ProductDetailPage.tsx';
import CartPage from './components/CartPage.tsx';
import AboutUsPage from './components/AboutUsPage.tsx';
import ContactPage from './components/ContactPage.tsx';
import ShoppingGuidePage from './components/ShoppingGuidePage.tsx';
import PaymentPage from './components/PaymentPage.tsx';
import ShippingPage from './components/ShippingPage.tsx';
import CheckoutPage from './components/CheckoutPage.tsx';
import OrderConfirmationPage from './components/OrderConfirmationPage.tsx';

// Mock Data
const initialCategories: Category[] = [
  { id: '1', name: '預購商品', parentId: null },
  { id: '2', name: '現貨商品', parentId: null },
  { id: '3', name: '七龍珠', parentId: null },
  { id: 'c-goku', name: '孫悟空', parentId: '3' },
  { id: 'c-vegeta', name: '達爾', parentId: '3' },
];

const initialProducts: Product[] = [
    { id: 'p1', name: '【七龍珠】億覓·STUDIO－悟吉塔', price: 8800, imageUrl: 'https://images.unsplash.com/photo-1619025873875-a8d39f88a282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', description: '震撼的悟吉塔模型，完美重現經典場景。\n限定版，附帶特殊地台與特效件。\n材質: PVC, ABS\n尺寸: 高約35cm', categoryId: 'c-vegeta' },
    { id: 'p2', name: '【航海王】索隆三刀流奧義', price: 7500, imageUrl: 'https://images.unsplash.com/photo-1607963628652-16a760d9a244?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', description: '展現索隆三刀流的極致魄力。\n精細塗裝，動態感十足。\n材質: 樹脂\n尺寸: 高約40cm', categoryId: '2' },
    { id: 'p3', name: '【火影忍者】宇智波鼬 曉組織Ver.', price: 9200, imageUrl: 'https://images.unsplash.com/photo-1611604548018-d8bf4138d218?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', description: '身穿曉組織服裝的宇智波鼬，眼神冷酷，氣場強大。\n附帶可替換手部配件與烏鴉特效。\n材質: PVC\n尺寸: 高約30cm', categoryId: '1' },
    { id: 'p4', name: '【鬼滅之刃】竈門炭治郎 水之呼吸', price: 6300, imageUrl: 'https://images.unsplash.com/photo-1610461193144-3b2d1cbe5b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', description: '炭治郎使用水之呼吸的動態模型。\n水花特效件採用透明材質，生動逼真。\n材質: PVC, ABS\n尺寸: 高約25cm', categoryId: '2' },
    { id: 'p5', name: '【七龍珠】超級賽亞人 孫悟空', price: 6800, imageUrl: 'https://images.unsplash.com/photo-1598056157134-2d65d4a13a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', description: '經典超級賽亞人形態的孫悟空，氣勢磅礴。\n附帶龜派氣功特效件。\n材質: PVC\n尺寸: 高約28cm', categoryId: 'c-goku' },
];

const initialCarouselImages: CarouselImage[] = [
  { id: 'ci1', imageUrl: 'https://images.unsplash.com/photo-1598992645311-59a0f05f7c32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80' },
  { id: 'ci2', imageUrl: 'https://images.unsplash.com/photo-1613904985222-0d5751625f16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80' },
  { id: 'ci3', imageUrl: 'https://images.unsplash.com/photo-1562326522-8e7c1a01883c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80' },
];

const initialContactInfo: ContactInfo = {
  phone: '0912-345-678',
  email: 'service@gkuncle.com',
  address: '123 Toy Street, Taipei, Taiwan',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
};

const initialAboutInfo: AboutInfo = {
    title: '關於GK公仔玩具專賣店',
    content: '歡迎來到GK公仔玩具專賣店！我們是熱衷於高品質模型與公仔的收藏家團隊，致力於為所有同好帶來最精緻、最稀有的收藏品。\n\n我們的商店創立於2020年，源於一份對動漫文化的熱愛。從七龍珠到航海王，從火影忍者到鬼滅之刃，我們精心挑選每一款商品，確保它們不僅是玩具，更是能夠觸動人心的藝術品。我們與世界各地的頂尖工作室合作，引進限定版與獨家商品，讓您的收藏與眾不同。\n\n我們的使命是打造一個讓所有模型愛好者都能找到歸屬感的社群。無論您是資深收藏家，還是剛入門的新手，我們都樂於分享我們的知識與熱情。感謝您的光臨，希望您在這裡能找到心儀的寶藏！',
    imageUrl: 'https://images.unsplash.com/photo-1587219213523-2b270dba2549?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
};

const initialContactPageInfo: ContactPageInfo = {
    title: '聯絡我們',
    content: '有任何問題嗎？歡迎隨時透過以下方式與我們聯繫，我們的團隊將很樂意為您服務。\n\n營業時間：\n週一至週五: 10:00 AM - 7:00 PM\n週末及國定假日休息',
    imageUrl: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
};

const initialShoppingGuideInfo: ShoppingGuideInfo = {
    title: '購物指南',
    content: '步驟一：瀏覽商品\n您可以透過頂部導航欄的分類或使用搜索功能找到您喜歡的商品。\n\n步驟二：加入購物車\n在商品頁面選擇您要的數量，點擊「加入購物車」。\n\n步驟三：結帳\n點擊右上角的購物車圖標，確認商品無誤後，點擊「結帳」按鈕。\n\n步驟四：填寫資料\n填寫您的收件人資訊、選擇運送及付款方式。\n\n步驟五：完成訂單\n確認所有資訊無誤後，提交訂單，您將會收到一封訂單確認郵件。',
    imageUrl: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
};

const initialPaymentInfo: PaymentInfo = {
    title: '付款方式',
    content: '我們提供多種付款方式，讓您輕鬆購物：\n\n信用卡\n支援 VISA, MasterCard, JCB 等國內外信用卡一次付清。\n\n銀行轉帳／ATM\n請於下單後48小時內完成匯款，並告知我們您的帳號後五碼以便對帳。\n\n貨到付款\n商品將由宅配人員送達，請將現金交給宅配人員即可。',
    imageUrl: 'https://images.unsplash.com/photo-1565932690088-53c880d444a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
};

const initialShippingInfo: ShippingInfo = {
    title: '運送方式',
    content: '現貨商品\n訂單成立後，約需1-3個工作天（不含假日）進行出貨。\n\n預購商品\n商品頁面會標示預計到貨時間，到貨後將依訂單順序陸續出貨。\n\n運送選項\n- 宅配到府: 運費 NT$100\n- 超商取貨 (7-11/全家): 運費 NT$60\n\n全館消費滿 NT$3,000 即享免運優惠。',
    imageUrl: 'https://images.unsplash.com/photo-1587145820137-a9315ee5656c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
};


const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<'storefront' | 'admin' | 'login' | 'product' | 'cart' | 'about' | 'contact' | 'shoppingGuide' | 'payment' | 'shipping' | 'checkout' | 'orderConfirmation'>('storefront');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Load state from localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });
  const [shopName, setShopName] = useState<string>(() => {
    return localStorage.getItem('shopName') || 'GK公仔玩具專賣店';
  });
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>(() => {
    const saved = localStorage.getItem('carouselImages');
    return saved ? JSON.parse(saved) : initialCarouselImages;
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem('contactInfo');
    return saved ? JSON.parse(saved) : initialContactInfo;
  });
  const [aboutInfo, setAboutInfo] = useState<AboutInfo>(() => {
    const saved = localStorage.getItem('aboutInfo');
    return saved ? JSON.parse(saved) : initialAboutInfo;
  });
  const [contactPageInfo, setContactPageInfo] = useState<ContactPageInfo>(() => {
    const saved = localStorage.getItem('contactPageInfo');
    return saved ? JSON.parse(saved) : initialContactPageInfo;
  });
  const [shoppingGuideInfo, setShoppingGuideInfo] = useState<ShoppingGuideInfo>(() => {
    const saved = localStorage.getItem('shoppingGuideInfo');
    return saved ? JSON.parse(saved) : initialShoppingGuideInfo;
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>(() => {
    const saved = localStorage.getItem('paymentInfo');
    return saved ? JSON.parse(saved) : initialPaymentInfo;
  });
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>(() => {
    const saved = localStorage.getItem('shippingInfo');
    return saved ? JSON.parse(saved) : initialShippingInfo;
  });
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem('adminPassword') || 'admin';
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Save state to localStorage
  useEffect(() => { localStorage.setItem('products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('shopName', shopName); }, [shopName]);
  useEffect(() => { localStorage.setItem('cartItems', JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => { localStorage.setItem('carouselImages', JSON.stringify(carouselImages)); }, [carouselImages]);
  useEffect(() => { localStorage.setItem('contactInfo', JSON.stringify(contactInfo)); }, [contactInfo]);
  useEffect(() => { localStorage.setItem('aboutInfo', JSON.stringify(aboutInfo)); }, [aboutInfo]);
  useEffect(() => { localStorage.setItem('contactPageInfo', JSON.stringify(contactPageInfo)); }, [contactPageInfo]);
  useEffect(() => { localStorage.setItem('shoppingGuideInfo', JSON.stringify(shoppingGuideInfo)); }, [shoppingGuideInfo]);
  useEffect(() => { localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo)); }, [paymentInfo]);
  useEffect(() => { localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo)); }, [shippingInfo]);
  useEffect(() => { localStorage.setItem('adminPassword', adminPassword); }, [adminPassword]);
  useEffect(() => { localStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);


  const handleLogin = (password: string): boolean => {
    if (password === adminPassword) {
      setIsLoggedIn(true);
      setCurrentPage('admin');
      return true;
    }
    return false;
  };
  const handleLogout = () => { setIsLoggedIn(false); setCurrentPage('login'); };
  const handleNavigateToAdmin = () => { if (isLoggedIn) { setCurrentPage('admin'); } else { setCurrentPage('login'); } };
  const handleNavigateToStorefront = () => { setSelectedProductId(null); setCurrentPage('storefront'); }
  const handleNavigateToCart = () => { setCurrentPage('cart'); }
  const handleNavigateToAbout = () => { setCurrentPage('about'); };
  const handleNavigateToContact = () => { setCurrentPage('contact'); };
  const handleNavigateToShoppingGuide = () => { setCurrentPage('shoppingGuide'); };
  const handleNavigateToPayment = () => { setCurrentPage('payment'); };
  const handleNavigateToShipping = () => { setCurrentPage('shipping'); };
  const handleNavigateToCheckout = () => { setCurrentPage('checkout'); };

  const handleProductClick = (productId: string) => {
      setSelectedProductId(productId);
      setCurrentPage('product');
  };

  // Cart Actions
  const handleAddToCart = (productId: string, quantity: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.productId === productId);
      if (existingItem) {
        return prev.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { productId, quantity }];
    });
    alert('商品已加入購物車！');
  };

  const handleUpdateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(prev => prev.map(item => 
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };
  
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Order Actions
    const handlePlaceOrder = (customerInfo: CustomerInfo) => {
        const total = cartItems.reduce((acc, item) => {
            const product = products.find(p => p.id === item.productId);
            return acc + (product ? product.price * item.quantity : 0);
        }, 0);

        const newOrder: Order = {
            id: `order-${Date.now()}`,
            items: [...cartItems],
            total: total,
            customerInfo,
            createdAt: new Date().toISOString(),
            status: '待處理',
        };
        setOrders(prev => [newOrder, ...prev]);
        setCartItems([]);
        setCurrentPage('orderConfirmation');
    };

    const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

  // Admin Actions
  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    setProducts(prev => [{ ...product, id: `p${Date.now()}` }, ...prev]);
  };
  
  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleAddCategory = (name: string, parentId: string | null) => {
      const newCategory: Category = { id: `c${Date.now()}`, name, parentId };
      setCategories(prev => [...prev, newCategory]);
  };

  const handleDeleteCategory = (id: string) => {
      setCategories(prevCategories => {
          const idsToDelete = new Set<string>([id]);
          let newIdsFound = true;
          // Recursively find all descendant categories
          while (newIdsFound) {
              newIdsFound = false;
              prevCategories.forEach(cat => {
                  if (cat.parentId && idsToDelete.has(cat.parentId) && !idsToDelete.has(cat.id)) {
                      idsToDelete.add(cat.id);
                      newIdsFound = true;
                  }
              });
          }

          // Uncategorize products associated with deleted categories
          setProducts(prevProducts => 
              prevProducts.map(p => 
                  p.categoryId && idsToDelete.has(p.categoryId)
                      ? { ...p, categoryId: null } 
                      : p
              )
          );
          
          // Filter out the deleted categories
          return prevCategories.filter(cat => !idsToDelete.has(cat.id));
      });
  };

  const handleUpdateCategory = (id: string, newName: string) => {
      setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, name: newName } : cat));
  };
  
  const handleAddCarouselImage = (imageUrl: string) => {
    if (carouselImages.length >= 10) {
      alert("You can only have a maximum of 10 carousel images.");
      return;
    }
    const newImage: CarouselImage = { id: `ci${Date.now()}`, imageUrl };
    setCarouselImages(prev => [...prev, newImage]);
  };

  const handleDeleteCarouselImage = (id: string) => {
    setCarouselImages(prev => prev.filter(img => img.id !== id));
  };

  const handleUpdateContactInfo = (newInfo: ContactInfo) => setContactInfo(newInfo);
  const handleUpdateAboutInfo = (newInfo: AboutInfo) => setAboutInfo(newInfo);
  const handleUpdateContactPageInfo = (newInfo: ContactPageInfo) => setContactPageInfo(newInfo);
  const handleUpdateShoppingGuideInfo = (newInfo: ShoppingGuideInfo) => setShoppingGuideInfo(newInfo);
  const handleUpdatePaymentInfo = (newInfo: PaymentInfo) => setPaymentInfo(newInfo);
  const handleUpdateShippingInfo = (newInfo: ShippingInfo) => setShippingInfo(newInfo);
  const handleUpdateAdminPassword = (newPassword: string) => {
    setAdminPassword(newPassword);
  };

  const sharedNavProps = {
      onNavigateToAdmin: handleNavigateToAdmin,
      onNavigateToStorefront: handleNavigateToStorefront,
      onNavigateToCart: handleNavigateToCart,
      onNavigateToAbout: handleNavigateToAbout,
      onNavigateToContact: handleNavigateToContact,
      onNavigateToShoppingGuide: handleNavigateToShoppingGuide,
      onNavigateToPayment: handleNavigateToPayment,
      onNavigateToShipping: handleNavigateToShipping,
  };

  const sharedPageProps = {
      ...sharedNavProps,
      shopName,
      categories,
      cartItemCount,
      contactInfo,
  };


  const renderPage = () => {
    switch(currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} onNavigateToStorefront={handleNavigateToStorefront} />;
      case 'admin':
        if (!isLoggedIn) return <Login onLogin={handleLogin} onNavigateToStorefront={handleNavigateToStorefront} />;
        return (
          <AdminDashboard 
            products={products} onAddProduct={handleAddProduct} onDeleteProduct={handleDeleteProduct}
            onLogout={handleLogout} onNavigateToStorefront={handleNavigateToStorefront}
            shopName={shopName} onUpdateShopName={setShopName}
            categories={categories} onAddCategory={handleAddCategory} onDeleteCategory={handleDeleteCategory} onUpdateCategory={handleUpdateCategory}
            carouselImages={carouselImages} onAddCarouselImage={handleAddCarouselImage} onDeleteCarouselImage={handleDeleteCarouselImage}
            contactInfo={contactInfo} onUpdateContactInfo={handleUpdateContactInfo}
            aboutInfo={aboutInfo} onUpdateAboutInfo={handleUpdateAboutInfo}
            contactPageInfo={contactPageInfo} onUpdateContactPageInfo={handleUpdateContactPageInfo}
            shoppingGuideInfo={shoppingGuideInfo} onUpdateShoppingGuideInfo={handleUpdateShoppingGuideInfo}
            paymentInfo={paymentInfo} onUpdatePaymentInfo={handleUpdatePaymentInfo}
            shippingInfo={shippingInfo} onUpdateShippingInfo={handleUpdateShippingInfo}
            adminPassword={adminPassword}
            onUpdateAdminPassword={handleUpdateAdminPassword}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        );
      case 'product':
        const selectedProduct = products.find(p => p.id === selectedProductId);
        if (!selectedProduct) { handleNavigateToStorefront(); return null; }
        return <ProductDetailPage 
            product={selectedProduct} 
            onBackToStore={handleNavigateToStorefront}
            onAddToCart={handleAddToCart}
            {...sharedPageProps}
        />;
      case 'cart':
        return <CartPage
            cartItems={cartItems}
            products={products}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onNavigateToCheckout={handleNavigateToCheckout}
            {...sharedPageProps}
        />
      case 'checkout':
        return <CheckoutPage
            cartItems={cartItems}
            products={products}
            onPlaceOrder={handlePlaceOrder}
            {...sharedPageProps}
        />
      case 'orderConfirmation':
        const lastOrder = orders[0];
        return <OrderConfirmationPage
            order={lastOrder}
            {...sharedPageProps}
        />
      case 'about':
        return <AboutUsPage aboutInfo={aboutInfo} {...sharedPageProps} />
      case 'contact':
        return <ContactPage contactPageInfo={contactPageInfo} {...sharedPageProps} />
      case 'shoppingGuide':
        return <ShoppingGuidePage info={shoppingGuideInfo} {...sharedPageProps} />
      case 'payment':
        return <PaymentPage info={paymentInfo} {...sharedPageProps} />
      case 'shipping':
        return <ShippingPage info={shippingInfo} {...sharedPageProps} />
      case 'storefront':
      default:
        return (
          <Storefront
            products={products}
            carouselImages={carouselImages}
            onProductClick={handleProductClick}
            {...sharedPageProps}
          />
        );
    }
  };

  return <div className="App">{renderPage()}</div>;
};

export default App;