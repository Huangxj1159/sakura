// 1. 语言定义
export enum Language {
  TC = 'TC',
  EN = 'EN'
}

// 2. 用户角色
export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER'
}

// 3. 订单状态
export enum OrderStatus {
  PLACED = 'PLACED',   // 已落单
  PICKING = 'PICKING', // 拣货中
  SHIPPED = 'SHIPPED', // 已发货
  RECEIVED = 'RECEIVED' // 已签收
}

// 4. 商品状态 (新增)
export enum ProductStatus {
  ON_SALE = 'ON_SALE',   // 销售中 (可购买)
  SHOWCASE = 'SHOWCASE', // 展示中 (只展示不可买)
  HIDDEN = 'HIDDEN'      // 已下架 (前端不显示)
}

// 5. 商品接口 (修正版)
export interface Product {
  id: string;
  category: string;
  name: {
    TC: string;
    EN: string;
  };
  price: number;
  image: string;
  images?: string[];
  detailImage?: string;
  videoUrl?: string;
  description: {
    TC: string;
    EN: string;
  };
  stock: number;

  // --- 关键修改开始 ---
  // 新增 status 字段，用于支持三种状态
  status?: ProductStatus | string;

  // 将 active 改为可选，兼容你旧的商品数据
  active?: boolean;
  // --- 关键修改结束 ---
}

// 6. 用户接口
export interface User {
  id?: string;
  username: string;
  password?: string;
  role: UserRole;
  name: string;
  phone: string;
  address: string;
  createdAt?: string;
}

// 7. 购物车项
export interface CartItem {
  productId: string;
  quantity: number;
}

// 8. 订单接口
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

// 9. 翻译字典类型
export type TranslationMap = {
  [key in Language]: {
    [key: string]: string | { [key: string]: string };
  };
};