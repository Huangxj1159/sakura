
export enum Language {
  TC = 'TC',
  EN = 'EN'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER'
}

export interface User {
  username: string;
  password?: string;
  role: UserRole;
  name: string;
  phone: string;
  address: string;
}

export interface Product {
  id: string;
  category: string;
  name: { [key in Language]: string };
  price: number;
  image: string; // 保持兼容，设为主图
  images: string[]; // 新增：多张细节图
  detailImage?: string;
  videoUrl?: string; // 新增：商品描述視頻
  description: { [key in Language]: string };
  stock: number;
  active: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  username: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
  paymentMethod: string;
  trackingNumber?: string;
  createdAt: string;
}

export enum OrderStatus {
  PLACED = 'PLACED',
  PICKING = 'PICKING',
  SHIPPED = 'SHIPPED',
  RECEIVED = 'RECEIVED'
}

export type TranslationMap = {
  [key in Language]: {
    [key: string]: string;
  };
};