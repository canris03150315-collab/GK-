export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  categoryId: string | null;
}

export interface Category {
  id: string;
  name: string;
  parentId: string | null; // null for top-level categories
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CarouselImage {
  id: string;
  imageUrl: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
}

export interface AboutInfo {
  title: string;
  content: string;
  imageUrl: string;
}

export interface ContactPageInfo {
  title: string;
  content: string;
  imageUrl: string;
}

export interface ShoppingGuideInfo {
  title: string;
  content: string;
  imageUrl: string;
}

export interface PaymentInfo {
  title: string;
  content: string;
  imageUrl: string;
}

export interface ShippingInfo {
  title: string;
  content: string;
  imageUrl: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export type OrderStatus = '待處理' | '處理中' | '已出貨' | '已取消';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: CustomerInfo;
  createdAt: string; // ISO date string
  status: OrderStatus;
}