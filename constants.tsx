
import { Language, TranslationMap, Product } from './types';

export const TRANSLATIONS: TranslationMap = {
  [Language.TC]: {
    home: "首頁",
    about: "關於櫻花",
    products: "產品介紹",
    admin: "系統管理",
    my_orders: "我的訂單",
    cart: "購物車",
    login: "用戶登錄",
    logout: "安全退出",
    register: "賬號註冊",
    username: "用戶名",
    password: "密碼",
    name: "聯繫人姓名",
    phone: "聯繫電話",
    address: "收貨地址",
    total: "總計金額",
    checkout: "去結算",
    category_treasures: "鎮店之寶",
    category_woodpulp: "木漿普通紙巾系列",
    category_dustfree: "無塵餐巾紙系列",
    category_composite: "上膠複合紙巾系列",
    category_coaster: "杯墊系列",
    category_apron: "紙圍裙系列",
    category_facial: "抽紙系列",
    category_wet: "濕紙巾系列 WET WI",
    category_large_roll: "大軸卷裝系列",
    category_toilet_roll: "彩色卷裝衛生紙系列",
    category_cloak: "柯洛克系列 CLOAK",
    category_rawmaterial: "原材料系列",
    stock: "現有庫存",
    order_status: "訂單狀態",
    placed: "已落單",
    picking: "揀貨中",
    shipped: "已發貨",
    received: "已簽收",
    tracking_no: "快遞單號",
    add_to_cart: "加入購物車",
    company_intro: "櫻花（香港）制造有限公司是一家專業的生活用紙製造商和出口商。本公司旗下品牌“柯洛克牌”系列生活用紙，包括有：高級歐洲進口各類無塵餐巾紙、大小卷裝廁紙、盒裝抽紙、迷你小手帕、廚房紙、擦手紙、醫用、機器抹紙、紙臺布等各類生活用紙。部份產品，更經國際權威驗證機構SGS的獨立驗證，完全符合歐洲FSC驗證和國家的衛生標準GB15979-2002的要求！憑藉我們豐富經驗 and 專業技術，同時接受各大小商戶（如中西餐館、桑拿會所、各大小公司、團體、個人、宴會、廣告紙巾等等）產品加工服務，訂單多少都無任歡迎！相信憑藉我們的實力，定能為閣下生產出稱心如意的貨品，並保持長期的合作夥伴關係！",
    certification_title: "資質認証",
    certification_desc: "本公司產品已通過 SGS 及 FSC 國際權威認証，符合歐盟及國家衛生標準。",
    process_title: "訂貨流程",
    step1: "註冊賬號", step2: "選購商品", step3: "結算支付", step4: "工廠揀貨", step5: "送貨簽收",
    no_account: "沒有賬號？",
    has_account: "已有賬號登錄",
    update_stock: "更新庫存",
    add_product: "上架商品",
    home_title: "櫻花紙業 - 專業紙品定制專家",
    home_subtitle: "提供專利無塵技術與環保包裝解決方案，為您的品牌增色。",
    buy_now: "立即訂貨",
    case_studies: "生產車間",
    add: "選購",
    out_of_stock: "暫時缺貨",
    unit_price: "單價",
    qty: "數量",
    proceed_checkout: "確認訂單",
    confirm_pay: "確認支付",
    order_id: "訂單編號",
    admin_inventory: "商品庫存管理",
    admin_orders: "訂單狀態跟蹤",
    edit: "修改",
    save: "保存",
    cancel: "取消",
    tracking_placeholder: "輸入物流單號...",
    dispatch: "發貨",
    complete: "完成",
    acknowledge: "揀貨",
    product_name: "商品名稱",
    price: "單價",
    img_url: "封面圖片URL",
    detail_img_url: "詳情圖URL",
    factory_video: "櫻花生產工廠實拍",
    deep_dive: "商品詳細規格",
    status_active: "銷售中",
    status_inactive: "已下架",
    toggle_status: "上架/下架"
  },
  [Language.EN]: {
    home: "Home",
    about: "About Sakura",
    products: "Products",
    admin: "Admin",
    my_orders: "Orders",
    cart: "Cart",
    login: "Login",
    logout: "Logout",
    register: "Register",
    username: "Username",
    password: "Password",
    name: "Contact Name",
    phone: "Phone",
    address: "Shipping Address",
    total: "Total",
    checkout: "Checkout",
    category_treasures: "Shop's Treasure",
    category_woodpulp: "Wood Pulp Series",
    category_dustfree: "Airlaid Paper Series",
    category_composite: "Composite Series",
    category_coaster: "Coaster Series",
    category_apron: "Paper Apron Series",
    category_facial: "Facial Tissue Series",
    category_wet: "Wet Wipes Series",
    category_large_roll: "Jumbo Roll Series",
    category_toilet_roll: "Colored Toilet Paper",
    category_cloak: "CLOAK Series",
    category_rawmaterial: "Raw Materials",
    stock: "Stock",
    order_status: "Status",
    placed: "Placed",
    picking: "Picking",
    shipped: "Shipped",
    received: "Received",
    tracking_no: "Tracking No.",
    add_to_cart: "Add to Cart",
    // ⭐ 已修改：公司名称及無塵紙翻譯
    company_intro: "Sakura (Hong Kong) Products limited is a professional integrated paper products manufacturer and exporter. Our own brand 'CLOAK' series includes: premium imported Airlaid Paper napkins, toilet paper rolls, facial tissues, handkerchiefs, kitchen towels, hand towels, medical machine wipes, paper tablecloths, etc. Certified by SGS for GB15979-2002 and European FSC requirements. With our expertise and total quality management, we offer custom OEM services for various clients (restaurants, sauna centers, clubs, corporate events, annual balls, advertising napkins, etc.). We welcome orders of any size and look forward to building long-term partnerships with high-quality products that exceed your expectations.",
    certification_title: "Certifications",
    certification_desc: "Our products have passed SGS and FSC international authoritative certifications.",
    process_title: "Ordering Steps",
    step1: "Register", step2: "Select", step3: "Checkout", step4: "Picking", step5: "Received",
    no_account: "No account?",
    has_account: "Login here",
    update_stock: "Update Stock",
    add_product: "Add Item",
    home_title: "Sakura - Custom Paper Expert",
    home_subtitle: "Patented Airlaid Paper technology and eco-friendly solutions.", // ⭐ 已修改
    buy_now: "Shop Now",
    case_studies: "Workshop",
    add: "Add",
    out_of_stock: "Out of Stock",
    unit_price: "Price",
    qty: "Qty",
    proceed_checkout: "Place Order",
    confirm_pay: "Pay Now",
    order_id: "Order ID",
    admin_inventory: "Inventory Management",
    admin_orders: "Order Processing",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    tracking_placeholder: "Tracking No...",
    dispatch: "Dispatch",
    complete: "Complete",
    acknowledge: "Pick",
    product_name: "Product Name",
    price: "Price",
    img_url: "Image URL",
    detail_img_url: "Detail URL",
    factory_video: "Sakura Factory Video",
    deep_dive: "Product Specs",
    status_active: "Active",
    status_inactive: "Hidden",
    toggle_status: "Show/Hide"
  }
};

const DEFAULT_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";
export const INITIAL_PRODUCTS: Product[] = [
  // 📂 1️⃣ 鎮店之寶 (category_treasures) - data/1 ~ data/2
  {
    id: "tre-1", 
    category: "category_treasures",
    name: { TC: "刀叉紙加厚口袋摺疊紙", EN: "Cutlery Paper Thickened Pocket Fold" },
    price: 0.88, image: "data/1/商品主图_1.jpg",
    images: ["data/1/商品主图_1.jpg","data/1/商品主图_1.jpg","data/1/商品主图_3.jpg","data/1/商品主图_4.jpg","data/1/商品主图_5.jpg","data/1/商品主图_6.jpg","data/1/商品主图_7.jpg","data/1/商品主图_8.jpg"],
    detailImage: "data/1/描述图(拼接)_1.png", videoUrl: "data/1/PC端_主图视频_1.mp4",
    description: { TC: "規格 4.5*20cm，採用高端上膠複合工藝，紙張極致加厚，具備優質佈感觸感，酒店宴會專用。", EN: "Size 4.5*20cm, premium glued composite technology, ultra-thickened paper with cloth-feel, banquet exclusive." },
    stock: 10000, active: true
  },
  {
    id: "tre-2", 
    category: "category_treasures",
    name: { TC: "彩色餐巾紙口袋摺疊木漿紙", EN: "Colored Napkin Pocket Fold Wood Pulp" },
    price: 2.0, image: "data/2/商品主图_1.jpg",
    images: ["data/2/商品主图_1.jpg","data/2/商品主图_1.jpg","data/2/商品主图_3.jpg","data/2/商品主图_4.jpg","data/2/商品主图_5.jpg","data/2/商品主图_6.jpg"],
    detailImage: "data/2/描述图(拼接)_1.jpg", videoUrl: "data/2/PC端_主图视频_1.mp4",
    description: { TC: "規格 20*20cm 展開，高端原木漿材質，獨特口袋摺法設計，適用於西餐廳與商務酒店。", EN: "Size 20*20cm unfolded, premium wood pulp material, unique pocket fold design for business hotels." },
    stock: 10000, active: true
  },

  // 📂 2️⃣ 木漿普通紙巾系列 (category_woodpulp) - data/3 ~ data/7
  {
    id: "wpn-1", 
    category: "category_woodpulp",
    name: { TC: "酒吧小食紙防濕隔熱四合一", EN: "Bar Napkin Moisture-proof 4-in-1" },
    price: 2.0, image: "data/3/商品主图_1.jpg",
    images: ["data/3/商品主图_1.jpg","data/3/商品主图_1.jpg","data/3/商品主图_3.jpg","data/3/商品主图_4.jpg","data/3/商品主图_5.jpg","data/3/商品主图_6.jpg"],
    detailImage: "data/3/描述图(拼接)_1.jpg", videoUrl: "data/3/PC端_主图视频_1.mp4",
    description: { TC: "具備防濕與隔熱功能的商用餐巾紙，專為清吧與酒館環境設計。", EN: "Moisture-proof and heat-insulating napkin, designed for bars and pubs." },
    stock: 10000, active: true
  },
  {
    id: "wpn-2", 
    category: "category_woodpulp",
    name: { TC: "定制餐巾紙白色木漿印刷Logo", EN: "Custom Napkin White Pulp Logo" },
    price: 2.0, image: "data/4/商品主图_1.jpg",
    images: ["data/4/商品主图_1.jpg","data/4/商品主图_1.jpg","data/4/商品主图_3.jpg","data/4/商品主图_4.jpg","data/4/商品主图_5.jpg","data/4/商品主图_6.jpg","data/4/商品主图_7.jpg"],
    detailImage: "data/4/描述图(拼接)_1.jpg", videoUrl: "data/4/PC端_主图视频_1.mp4",
    description: { TC: "高品質純白木漿，支持 Logo 定制印刷，品牌宣傳效果優越。", EN: "High-quality white wood pulp, supports custom logo printing for branding." },
    stock: 10000, active: true
  },
  {
    id: "wpn-3", 
    category: "category_woodpulp",
    name: { TC: "廣告餐巾紙方形小食紙巾", EN: "Ad Napkin Square Snack Printing" },
    price: 2.0, image: "data/5/商品主图_2.jpg",
    images: ["data/5/商品主图_2.jpg","data/5/商品主图_2.jpg","data/5/商品主图_3.jpg","data/5/商品主图_4.jpg","data/5/商品主图_5.jpg"],
    detailImage: "data/5/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: { TC: "正方形規格，印刷清晰，咖啡店與各類餐廳首選。", EN: "Square snack napkin, clear printing, preferred for cafes and restaurants." },
    stock: 10000, active: true
  },
  {
    id: "wpn-4", 
    category: "category_woodpulp",
    name: { TC: "西餐方紙巾奶茶店西餐廳定制", EN: "Square Napkin for Milk Tea Shop" },
    price: 2.0, image: "data/6/商品主图_2.jpg",
    images: ["data/6/商品主图_2.jpg","data/6/商品主图_2.jpg","data/6/商品主图_3.jpg","data/6/商品主图_4.jpg","data/6/商品主图_5.jpg"],
    detailImage: "data/6/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: { TC: "商用方紙巾，紙張吸水性強，適合奶茶店與快餐店使用。", EN: "Commercial square napkin, high absorbency, for fast food shops." },
    stock: 10000, active: true
  },
  {
    id: "wpn-5", 
    category: "category_woodpulp",
    name: { TC: "竹漿紙巾小食飲料吧專用", EN: "Bamboo Napkin for Drink Bar" },
    price: 2.0, image: "data/7/商品主图_3.jpg",
    images: ["data/7/商品主图_3.jpg","data/7/商品主图_3.jpg","data/7/商品主图_3.jpg","data/7/商品主图_4.jpg","data/7/商品主图_5.jpg","data/7/商品主图_6.jpg"],
    detailImage: "data/7/描述图(拼接)_1.jpg", videoUrl: "data/7/PC端_主图视频_1.mp4",
    description: { TC: "天然竹漿材質，環保抑菌，觸感舒適，適合綠色餐飲。", EN: "Natural bamboo pulp, eco-friendly and antibacterial, soft touch." },
    stock: 10000, active: true
  },

  // 📂 3️⃣ 無塵餐巾紙系列 (category_dustfree) - data/8 ~ data/27 + data/2
  {
    id: "dfn-1", 
    category: "category_dustfree",
    name: { TC: "黑色無塵紙方形燙金LOGO", EN: "Black Airlaid Square Gold Foil" },
    price: 0.88, image: "data/8/商品主图_1.jpg",
    images: ["data/8/商品主图_1.jpg","data/8/商品主图_1.jpg","data/8/商品主图_3.jpg","data/8/商品主图_4.jpg","data/8/商品主图_5.jpg","data/8/商品主图_6.jpg"],
    detailImage: "data/8/描述图(拼接)_1.jpg", videoUrl: "data/8/PC端_主图视频_1.mp4",
    description: { TC: "無塵紙材質，全黑底配精美燙金，高端宴會專用。", EN: "Airlaid material, black surface with gold foil, for banquets." },
    stock: 10000, active: true
  },
  {
    id: "dfn-2", 
    category: "category_dustfree",
    name: { TC: "白色無塵紙銘牌烙印腰封款", EN: "White Airlaid Branded Sleeve" },
    price: 0.88, image: "data/9/商品主图_1.jpg",
    images: ["data/9/商品主图_1.jpg","data/9/商品主图_1.jpg","data/9/商品主图_3.jpg","data/9/商品主图_4.jpg","data/9/商品主图_5.jpg","data/9/商品主图_6.jpg","data/9/商品主图_7.jpg"],
    detailImage: "data/9/描述图(拼接)_1.jpg", videoUrl: "data/9/PC端_主图视频_1.mp4",
    description: { TC: "白色無塵紙配高級銘牌烙印，自帶餐具袋位。", EN: "White airlaid with branded sleeve and cutlery pouch." },
    stock: 10000, active: true
  },
  {
    id: "dfn-3", 
    category: "category_dustfree",
    name: { TC: "黑色腰封無塵紙品牌專屬定制", EN: "Black Sleeve Airlaid Custom" },
    price: 0.88, image: "data/10/商品主图_1.jpg",
    images: ["data/10/商品主图_1.jpg","data/10/商品主图_1.jpg","data/10/商品主图_3.jpg","data/10/商品主图_4.jpg","data/10/商品主图_5.jpg","data/10/商品主图_6.jpg","data/10/商品主图_7.jpg"],
    detailImage: "data/10/描述图(拼接)_1.jpg", videoUrl: "data/10/PC端_主图视频_1.mp4",
    description: { TC: "品牌專屬銘牌烙印，黑色高質感佈感材質。", EN: "Exclusive branded sleeve on black high-texture airlaid." },
    stock: 10000, active: true
  },
  {
    id: "dfn-4", 
    category: "category_dustfree",
    name: { TC: "雙色燙金無塵紙外貿高檔定制", EN: "Dual Gold Foil Airlaid Export" },
    price: 0.88, image: "data/11/商品主图_1.jpg",
    images: ["data/11/商品主图_1.jpg","data/11/商品主图_1.jpg","data/11/商品主图_3.jpg","data/11/商品主图_4.jpg","data/11/商品主图_5.jpg","data/11/商品主图_6.jpg"],
    detailImage: "data/11/描述图(拼接)_1.jpg", videoUrl: "data/11/PC端_主图视频_1.mp4",
    description: { TC: "雙色燙金LOGO，高品質無塵紙，適用於國際貿易出口。", EN: "Dual-color foil logo, high-quality airlaid paper." },
    stock: 10000, active: true
  },
  {
    id: "dfn-5", 
    category: "category_dustfree",
    name: { TC: "彩色烙印無塵紙宴會彩色佈感", EN: "Colored Embossed Airlaid Banquet" },
    price: 0.88, image: "data/12/商品主图_3.jpg",
    images: ["data/12/商品主图_3.jpg","data/12/商品主图_3.jpg","data/12/商品主图_3.jpg","data/12/商品主图_4.jpg","data/12/商品主图_5.jpg","data/12/商品主图_6.jpg"],
    detailImage: "data/12/描述图(拼接)_1.jpg", videoUrl: "data/12/PC端_主图视频_1.mp4",
    description: { TC: "彩色佈感材質，支持多色LOGO精準烙印。", EN: "Colored cloth-feel airlaid, supports multi-color logo embossing." },
    stock: 10000, active: true
  },
  {
    id: "dfn-6", 
    category: "category_dustfree",
    name: { TC: "立體印刷無塵紙大尺寸刀叉袋", EN: "3D Print Airlaid Large Cutlery Bag" },
    price: 0.88, image: "data/13/商品主图_1.jpg",
    images: ["data/13/商品主图_1.jpg","data/13/商品主图_1.jpg","data/13/商品主图_3.jpg","data/13/商品主图_4.jpg","data/13/商品主图_5.jpg","data/13/商品主图_6.jpg"],
    detailImage: "data/13/描述图(拼接)_1.jpg", videoUrl: "data/13/PC端_主图视频_1.mp4",
    description: { TC: "規格 42x48cm，數碼立體印刷，圖案清晰鮮明。", EN: "Size 42x48cm, 3D digital printing, vibrant patterns." },
    stock: 10000, active: true
  },
  {
    id: "dfn-7", 
    category: "category_dustfree",
    name: { TC: "二維碼無塵紙酒樓宴會商用", EN: "QR Code Airlaid Commercial Use" },
    price: 0.88, image: "data/14/商品主图_1.jpg",
    images: ["data/14/商品主图_1.jpg","data/14/商品主图_1.jpg","data/14/商品主图_3.jpg","data/14/商品主图_4.jpg","data/14/商品主图_5.jpg","data/14/商品主图_6.jpg"],
    detailImage: "data/14/描述图(拼接)_1.jpg", videoUrl: "data/14/PC端_主图视频_1.mp4",
    description: { TC: "黑色底紙配彩色二維碼，具備強大營銷推廣功能。", EN: "Black airlaid with color QR code for marketing utility." },
    stock: 10000, active: true
  },
  {
    id: "dfn-8", 
    category: "category_dustfree",
    name: { TC: "白標無塵紙黑色木漿印刷", EN: "White Logo Airlaid Black Pulp" },
    price: 0.88, image: "data/15/商品主图_1.jpg",
    images: ["data/15/商品主图_1.jpg","data/15/商品主图_1.jpg","data/15/商品主图_3.jpg","data/15/商品主图_4.jpg","data/15/商品主图_5.jpg","data/15/商品主图_6.jpg"],
    detailImage: "data/15/描述图(拼接)_1.jpg", videoUrl: "data/15/PC端_主图视频_1.mp4",
    description: { TC: "經典黑色底搭配白色絲印 Logo，對比鮮明廣告效應好。", EN: "Classic black paper with white screen-printed logo." },
    stock: 10000, active: true
  },
  {
    id: "dfn-9", 
    category: "category_dustfree",
    name: { TC: "灰色佈感無塵紙 鼠袋摺疊摺法", EN: "Gray Cloth-feel Kangaroo Folder" },
    price: 0.88, image: "data/16/商品主图_1.jpg",
    images: ["data/16/商品主图_1.jpg","data/16/商品主图_1.jpg","data/16/商品主图_3.jpg","data/16/商品主图_4.jpg","data/16/商品主图_5.jpg","data/16/商品主图_6.jpg"],
    detailImage: "data/16/描述图(拼接)_1.jpg", videoUrl: "data/16/PC端_主图视频_1.mp4",
    description: { TC: "優雅灰色系，採用鼠袋式特殊摺疊法，美觀穩固。", EN: "Elegant gray, unique kangaroo fold for table elegance." },
    stock: 10000, active: true
  },
  {
    id: "dfn-10", 
    category: "category_dustfree",
    name: { TC: "多彩腰封無塵紙 多色可選銘牌款", EN: "Multi-color Sleeve Branded Nameplate" },
    price: 0.88, image: "data/17/商品主图_1.jpg",
    images: ["data/17/商品主图_1.jpg","data/17/商品主图_1.jpg","data/17/商品主图_3.jpg","data/17/商品主图_4.jpg","data/17/商品主图_5.jpg","data/17/商品主图_6.jpg","data/17/商品主图_7.jpg","data/17/商品主图_8.jpg","data/17/商品主图_9.jpg","data/17/商品主图_10.jpg","data/17/商品主图_11.jpg","data/17/商品主图_12.jpg","data/17/商品主图_13.jpg"],
    detailImage: "data/17/描述图(拼接)_1.jpg", videoUrl: "data/17/PC端_主图视频_1.mp4",
    description: { TC: "多款配色選擇，搭配腰封銘牌烙印工藝，奢華體驗。", EN: "Various colors with premium branded nameplate sleeves." },
    stock: 10000, active: true
  },
  {
    id: "dfn-11", 
    category: "category_dustfree",
    name: { TC: "直供方形無塵紙 黑色燙金款", EN: "Direct Square Black Gold Foil" },
    price: 0.88, image: "data/18/商品主图_1.jpg",
    images: ["data/18/商品主图_1.jpg","data/18/商品主图_1.jpg","data/18/商品主图_3.jpg","data/18/商品主图_4.jpg","data/18/商品主图_5.jpg","data/18/商品主图_6.jpg"],
    detailImage: "data/18/描述图(拼接)_1.jpg", videoUrl: "data/18/PC端_主图视频_1.mp4",
    description: { TC: "廠家直接供應，高品質黑色木漿配合燙金標誌。", EN: "Factory direct supply, premium black pulp with gold foil." },
    stock: 10000, active: true
  },
  {
    id: "dfn-12", 
    category: "category_dustfree",
    name: { TC: "紅金刀叉袋無塵紙 V折摺法", EN: "Red-Gold Cutlery Airlaid V-fold" },
    price: 0.88, image: "data/19/商品主图_1.jpg",
    images: ["data/19/商品主图_1.jpg","data/19/商品主图_1.jpg","data/19/商品主图_3.jpg","data/19/商品主图_4.jpg","data/19/商品主图_5.jpg","data/19/商品主图_6.jpg"],
    detailImage: "data/19/描述图(拼接)_1.jpg", videoUrl: "data/19/PC端_主图视频_1.mp4",
    description: { TC: "節慶紅色系，V摺設計方便快速抽取，燙金標識亮眼。", EN: "Festive red, V-fold for quick access, vivid gold logo." },
    stock: 10000, active: true
  },
  {
    id: "dfn-13", 
    category: "category_dustfree",
    name: { TC: "外貿多色燙金無塵紙 刀叉袋定制", EN: "Export Multi-Foil Cutlery Custom" },
    price: 0.88, image: "data/20/商品主图_3.jpg",
    images: ["data/20/商品主图_3.jpg","data/20/商品主图_3.jpg","data/20/商品主图_3.jpg","data/20/商品主图_4.jpg","data/20/商品主图_5.jpg","data/20/商品主图_6.jpg"],
    detailImage: "data/20/描述图(拼接)_1.jpg", videoUrl: "data/20/PC端_主图视频_1.mp4",
    description: { TC: "高品質外貿訂單規格，支持多種色彩金箔組合疊印。", EN: "High-end export spec, supports multiple gold foil colors." },
    stock: 10000, active: true
  },
  {
    id: "dfn-14", 
    category: "category_dustfree",
    name: { TC: "卡其染色無塵紙 大卷軸染色", EN: "Khaki Dyed Jumbo Roll Colored" },
    price: 0.88, image: "data/21/商品主图_1.jpg",
    images: ["data/21/商品主图_1.jpg","data/21/商品主图_1.jpg","data/21/商品主图_3.jpg","data/21/商品主图_4.jpg","data/21/商品主图_5.jpg","data/21/商品主图_6.jpg"],
    detailImage: "data/21/描述图(拼接)_1.jpg", videoUrl: "data/21/PC端_主图视频_1.mp4",
    description: { TC: "獨特卡其原木色調，染色均勻環保，適合現代西餐廳裝飾。", EN: "Unique khaki tone, even dyeing, ideal for modern decor." },
    stock: 10000, active: true
  },
  {
    id: "dfn-15", 
    category: "category_dustfree",
    name: { TC: "外貿二維碼無塵紙 高清印刷", EN: "Export QR Airlaid HD Printing" },
    price: 0.88, image: "data/22/商品主图_1.jpg",
    images: ["data/22/商品主图_1.jpg","data/22/商品主图_1.jpg","data/22/商品主图_3.jpg","data/22/商品主图_4.jpg","data/22/商品主图_5.jpg","data/22/商品主图_6.jpg"],
    detailImage: "data/22/描述图(拼接)_1.jpg", videoUrl: "data/22/PC端_主图视频_1.mp4",
    description: { TC: "針對海外市場定制，高品質印刷高清二維碼，廣告識別率高。", EN: "HD QR code printing tailored for international markets." },
    stock: 10000, active: true
  },
  {
    id: "dfn-16", 
    category: "category_dustfree",
    name: { TC: "反向式口袋無塵紙 商務徽標", EN: "Reverse Pocket Business Logo" },
    price: 0.88, image: "data/23/商品主图_1.jpg",
    images: ["data/23/商品主图_1.jpg","data/23/商品主图_1.jpg","data/23/商品主图_3.jpg","data/23/商品主图_4.jpg","data/23/商品主图_5.jpg","data/23/商品主图_6.jpg"],
    detailImage: "data/23/描述图(拼接)_1.jpg", videoUrl: "data/23/PC端_主图视频_1.mp4",
    description: { TC: "獨特反向式摺疊設計，口袋位充足，適用於各類商務宴席。", EN: "Unique reverse pocket design for high-end banquets." },
    stock: 10000, active: true
  },
  {
    id: "dfn-17", 
    category: "category_dustfree",
    name: { TC: "麻佈感無塵紙 歐美雙色LOGO", EN: "Linen-feel EU/US Dual Logo" },
    price: 0.88, image: "data/24/商品主图_3.jpg",
    images: ["data/24/商品主图_3.jpg","data/24/商品主图_1.jpg","data/24/商品主图_3.jpg","data/24/商品主图_4.jpg","data/24/商品主图_5.jpg","data/24/商品主图_6.jpg"],
    detailImage: "data/24/描述图(拼接)_1.jpg", videoUrl: "data/24/PC端_主图视频_1.mp4",
    description: { TC: "仿麻布質地，質感厚實細膩，支持精準雙色套印 Logo。", EN: "Linen-like texture, thick feel, precise dual-color printing." },
    stock: 10000, active: true
  },
  {
    id: "dfn-18", 
    category: "category_dustfree",
    name: { TC: "專利款彩色無塵紙 可訂色LOGO", EN: "Patented Color Custom Colored" },
    price: 0.88, image: "data/25/商品主图_1.jpg",
    images: ["data/25/商品主图_1.jpg","data/25/商品主图_1.jpg","data/25/商品主图_3.jpg","data/25/商品主图_4.jpg","data/25/商品主图_5.jpg","data/25/商品主图_6.jpg"],
    detailImage: "data/25/描述图(拼接)_1.jpg", videoUrl: "data/25/PC端_主图视频_1.mp4",
    description: { TC: "獨有專利結構設計，支持多種色彩定做，起訂量靈活。", EN: "Patented structure design, flexible custom colors." },
    stock: 10000, active: true
  },
  {
    id: "dfn-19", 
    category: "category_dustfree",
    name: { TC: "跨境多色燙金無塵紙 加印LOGO", EN: "Cross-border Foil Branding" },
    price: 0.88, image: "data/26/商品主图_1.jpg",
    images: ["data/26/商品主图_1.jpg","data/26/商品主图_1.jpg","data/26/商品主图_3.jpg","data/26/商品主图_4.jpg","data/26/商品主图_5.jpg","data/26/商品主图_6.jpg"],
    detailImage: "data/26/描述图(拼接)_1.jpg", videoUrl: "data/26/PC端_主图视频_1.mp4",
    description: { TC: "針對跨境貿易優化，高品質金箔工藝，大單小單均可加印。", EN: "Cross-border optimized, premium foil, any order size." },
    stock: 10000, active: true
  },
  {
    id: "dfn-20", 
    category: "category_dustfree",
    name: { TC: "日式高低折無塵紙 佈感精緻款", EN: "Japanese High-low Fine Airlaid" },
    price: 0.88, image: "data/27/商品主图_1.jpg",
    images: ["data/27/商品主图_1.jpg","data/27/商品主图_1.jpg","data/27/商品主图_3.jpg","data/27/商品主图_4.jpg","data/27/商品主图_5.jpg","data/27/商品主图_6.jpg","data/27/商品主图_7.jpg"],
    detailImage: "data/27/描述图(拼接)_1.jpg", videoUrl: "data/27/PC端_主图视频_1.mp4",
    description: { TC: "層次分明的日式高低摺法，觸感細膩，提升高端日料格調。", EN: "Traditional Japanese fold, delicate feel, perfect for Omakase." },
    stock: 10000, active: true
  },
  {
    id: "dfn-21", 
    category: "category_dustfree",
    name: { TC: "彩色無塵紙 口袋摺疊佈感質感", EN: "Colored Airlaid Pocket Fold" },
    price: 0.88, 
    image: "data/2/商品主图_1.jpg", 
    images: ["data/2/商品主图_1.jpg","data/2/商品主图_1.jpg","data/2/商品主图_3.jpg","data/2/商品主图_4.jpg","data/2/商品主图_5.jpg"],
    detailImage: "data/2/描述图(拼接)_1.jpg", videoUrl: "data/2/PC端_主图视频_1.mp4",
    description: { TC: "規格 20x20cm 展開，採用優質佈感無塵材質，高端宴會摺法，手感柔軟。", EN: "Size 20x20cm unfolded, premium cloth-feel airlaid, banquet fold." },
    stock: 10000, active: true
  },

  // 📂 4️⃣ 上膠複合紙巾系列 (category_composite)
  {
    id: "gcn-1", 
    category: "category_composite",
    name: { TC: "上膠複合紙 加厚口袋摺紙", EN: "Glued Composite Thickened Paper" },
    price: 0.88, 
    image: "data/1/商品主图_1.jpg", 
    images: ["data/1/商品主图_1.jpg","data/1/商品主图_1.jpg","data/1/商品主图_3.jpg","data/1/商品主图_4.jpg","data/1/商品主图_5.jpg","data/1/商品主图_6.jpg","data/1/商品主图_7.jpg","data/1/商品主图_8.jpg"],
    detailImage: "data/1/描述图(拼接)_1.png", videoUrl: "data/1/PC端_主图视频_1.mp4",
    description: { TC: "規格 4.5*20cm，採用領先上膠複合工藝，厚實如布，吸水力強且不掉粉。", EN: "Size 4.5*20cm, advanced composite process, thick as cloth." },
    stock: 10000, active: true
  },

  // 📂 5️⃣ 杯墊系列 (category_coaster) - data/28 ~ data/29
  {
    id: "cst-1", 
    category: "category_coaster",
    name: { TC: "無塵紙杯墊 宴會商用燙金水墨", EN: "Airlaid Coaster Gold Foil Ink" },
    price: 0, image: "data/28/商品主图_5.jpg",
    images: ["data/28/商品主图_5.jpg","data/28/商品主图_2.jpg","data/28/商品主图_3.jpg","data/28/商品主图_4.jpg","data/28/商品主图_5.jpg"],
    detailImage: "data/28/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: { TC: "採用高品質無塵紙，吸水性極強，支持精細燙金與水墨壓印工藝。", EN: "High-absorbency airlaid, supports fine gold foil and ink embossing." },
    stock: 10000, active: true
  },
  {
    id: "cst-2", 
    category: "category_coaster",
    name: { TC: "定制紙杯墊 商用燙金壓印LOGO", EN: "Custom Coaster Branded Logo" },
    price: 0, image: "data/29/商品主图_5.jpg",
    images: ["data/29/商品主图_5.jpg","data/29/商品主图_2.jpg","data/29/商品主图_3.jpg","data/29/商品主图_4.jpg","data/29/商品主图_5.jpg"],
    detailImage: "data/29/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: { TC: "環保材質，多種壓印技術可選，保護桌面更展示品牌價值。", EN: "Eco-friendly, various embossing techniques to show brand value." },
    stock: 10000, active: true
  },

  // 📂 6️⃣ 紙圍裙系列 (category_apron) - data/30 ~ data/31
  {
    id: "apr-1", 
    category: "category_apron",
    name: { TC: "佈感紙圍裙 燒烤火鍋專用", EN: "Paper Apron BBQ/Hotpot Special" },
    price: 0, image: "data/30/商品主图_5.jpg",
    images: ["data/30/商品主图_5.jpg","data/30/商品主图_2.jpg","data/30/商品主图_3.jpg","data/30/商品主图_4.jpg","data/30/商品主图_5.jpg"],
    detailImage: "data/30/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: { TC: "一次性環保材質，強效防油汙，佩戴輕便，商用首選。", EN: "Disposable eco-material, oil-resistant, lightweight for business." },
    stock: 10000, active: true
  },
  {
    id: "apr-2", 
    category: "category_apron",
    name: { TC: "無紡布圍裙 客用餐飲環保款", EN: "Non-woven Apron Eco Catering" },
    price: 0, image: "data/31/商品主图_5.jpg",
    images: ["data/31/商品主图_5.jpg","data/31/商品主图_2.jpg","data/31/商品主图_3.jpg","data/31/商品主图_4.jpg","data/31/商品主图_5.jpg"],
    detailImage: "data/31/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: { TC: "採用高品質無紡布，透氣舒適且防水防油，支持來圖定制。", EN: "High-quality non-woven, breathable and oil-proof, supports custom images." },
    stock: 10000, active: true
  },

  // 📂 7️⃣ 抽紙系列 (category_facial) - data/32 ~ data/33
  {
    id: "tis-1", 
    category: "category_facial",
    name: { TC: "黑色抽紙 黑色純色餐巾抽紙", EN: "Black Tissue Solid Black Facial" },
    price: 2.0, image: "data/32/商品主图_2.jpg",
    images: ["data/32/商品主图_2.jpg","data/32/商品主图_2.jpg","data/32/商品主图_3.jpg","data/32/商品主图_4.jpg","data/32/商品主图_5.jpg",,"data/32/商品主图_6.jpg",,"data/32/商品主图_7.jpg"],
    detailImage: "data/32/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: { TC: "極簡純黑設計，高品質木漿纖維，抽取順滑，吸水不掉屑。", EN: "Minimalist black design, high-quality pulp, smooth extraction." },
    stock: 10000, active: true
  },
  {
    id: "tis-2", 
    category: "category_facial",
    name: { TC: "定制彩色抽紙 商用廣告款", EN: "Custom Tissue Advertising Colored" },
    price: 2.0, image: "data/33/商品主图_2.jpg",
    images: ["data/33/商品主图_2.jpg","data/33/商品主图_2.jpg","data/33/商品主图_3.jpg","data/33/商品主图_4.jpg","data/33/商品主图_5.jpg","data/33/商品主图_6.jpg","data/33/商品主图_7.jpg"],
    detailImage: "data/33/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: { TC: "繽紛色彩選擇，支持企業外盒廣告定做，宣傳效力極強。", EN: "Vibrant colors, supports custom box advertising for branding." },
    stock: 10000, active: true
  },

  // 📂 8️⃣ 濕紙巾系列 (category_wet) - data/34 ~ data/35
  {
    id: "wwp-1", 
    category: "category_wet",
    name: { TC: "日式濕毛巾 溫泉旅館商務款", EN: "Wet Towel Japanese Onsen" },
    price: 0, image: "data/34/商品主图_2.jpg",
    images: ["data/34/商品主图_2.jpg","data/34/商品主图_2.jpg","data/34/商品主图_3.jpg","data/34/商品主图_4.jpg","data/34/商品主图_5.jpg","data/34/商品主图_6.jpg"],
    detailImage: "data/34/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: { TC: "柔韌加厚材質，仿毛巾細膩質感，支持 Logo 來樣定制。", EN: "Thickened towel-feel texture, supports logo customization." },
    stock: 10000, active: true
  },
  {
    id: "wwp-2", 
    category: "category_wet",
    name: { TC: "無塵濕紙巾 酒店餐飲擦手款", EN: "Airlaid Wipe Hotel Cleaning" },
    price: 0, image: "data/35/商品主图_2.jpg",
    images: ["data/35/商品主图_2.jpg","data/35/商品主图_2.jpg","data/35/商品主图_3.jpg","data/35/商品主图_4.jpg","data/35/商品主图_5.jpg"],
    detailImage: "data/35/描述图(拼接)_1.jpg", videoUrl: "data/35/PC端_主图视频_1.mp4",
    description: { TC: "獨立小包裝，採用無塵紙材質，清潔力度強且衛生環保。", EN: "Individual packing, airlaid material, hygienic and eco-friendly." },
    stock: 10000, active: true
  },

  // 📂 9️⃣ 大軸系列 (category_large_roll) - data/36 ~ data/37
  {
    id: "lrl-1", 
    category: "category_large_roll",
    name: { TC: "大軸原紙 染色無塵紙批發", EN: "Jumbo Roll Dyed Airlaid" },
    price: 0, image: "data/36/商品主图_3.jpg",
    images: ["data/36/商品主图_3.jpg","data/36/商品主图_2.jpg","data/36/商品主图_3.jpg","data/36/商品主图_4.jpg","data/36/商品主图_5.jpg","data/36/商品主图_6.jpg"],
    detailImage: "data/36/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: { TC: "工業大規格卷軸，染色均勻，吸水力強，深加工原材料首選。", EN: "Industrial jumbo rolls, even dyeing, superior absorbency." },
    stock: 10000, active: true
  },
  {
    id: "lrl-2", 
    category: "category_large_roll",
    name: { TC: "竹漿大軸原紙 彩色無塵紙原紙", EN: "Bamboo Jumbo Colored Airlaid" },
    price: 0, image: "data/37/商品主图_5.jpg",
    images: ["data/37/商品主图_5.jpg","data/37/商品主图_2.jpg","data/37/商品主图_3.jpg","data/37/商品主图_4.jpg","data/37/商品主图_5.jpg"
    ,"data/37/商品主图_6.jpg"
    ,"data/37/商品主图_7.jpg"
    ,"data/37/商品主图_8.jpg"
    ,"data/37/商品主图_9.jpg"
    ,"data/37/商品主图_10.jpg"
    ,"data/37/商品主图_11.jpg"
    ,"data/37/商品主图_12.jpg"
    ,"data/37/商品主图_13.jpg"
    ,"data/37/商品主图_14.jpg"
  ],
    detailImage: "data/37/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: { TC: "純竹漿纖維製造，韌性極佳，適合製造各類高端商用擦手紙。", EN: "Bamboo fiber made, excellent toughness for hand towels." },
    stock: 10000, active: true
  },

  // 📂 🔟 彩色卷系列 (category_toilet_roll) - data/38
  {
    id: "trl-1", 
    category: "category_toilet_roll",
    name: { TC: "彩色衛生紙 高檔酒店無塵紙", EN: "Colored Roll Hotel Airlaid" },
    price: 0, image: "data/38/商品主图_2.jpg",
    images: ["data/38/商品主图_2.jpg","data/38/商品主图_2.jpg","data/38/商品主图_3.jpg","data/38/商品主图_4.jpg","data/38/商品主图_5.jpg"
    ,"data/38/商品主图_6.jpg"
    ,"data/38/商品主图_7.jpg"
    ,"data/38/商品主图_8.jpg"
    ,"data/38/商品主图_9.jpg"
    ,"data/38/商品主图_10.jpg"
  ],
    detailImage: "data/38/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: { TC: "豐富色彩，環保染料不掉色，紙張細膩柔軟，提升酒店檔次。", EN: "Rich colors, eco-dye, soft and fine to elevate hotel class." },
    stock: 10000, active: true
  },
// 📂 1️⃣1️⃣ 柯洛克系列 (category_cloak) - 數據集從 39 開始
  {
    id: "clk-1", 
    category: "category_cloak",
    name: { TC: "柯洛克珍寶大卷廁紙", EN: "Cloak Jumbo Roll Toilet Paper" },
    price: 0, 
    image: "data/39/商品主图_1.png",
    images: ["data/39/商品主图_1.png","data/39/商品主图_1.png","data/39/商品主图_1.png","data/39/商品主图_1.png","data/39/商品主图_1.png"],
    detailImage: "data/39/描述图(拼接)_1.png", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: { TC: "【產品規格】1箱6卷（每卷680克）。\n【產品尺寸】卷直徑：7cm x 高：9cm；紙巾寬度：9cm；層數：4層加厚。\n【外箱尺寸】W41 x D31.5 x H32cm。\n【商品簡介】強韌潔白親膚，4層加厚設計使濕水不易爛。大容量設計能有效減少更換頻率，是商場、學校等高人流量公用場所的超值首選。", 
    EN: "【Spec】6 rolls/case (680g per roll).\n【Size】Roll: Dia 7cm x H 9cm; Paper Width: 9cm; 4-ply thickened.\n【Carton Size】W41 x D31.5 x H32cm.\n【Features】Strong, white, and skin-friendly. The 4-ply design ensures durability even when wet. Jumbo capacity reduces refill frequency, making it the ideal choice for high-traffic public areas like malls and schools." },
    stock: 10000, active: true
  },
  {
    id: "clk-2", 
    category: "category_cloak",
    name: { TC: "柯洛克商用小卷廁紙", EN: "Cloak Small Roll Toilet Paper" },
    price: 0, 
    image: "data/40/商品主图_1.jpg",
    detailImage: "data/40/描述图(拼接)_1.png", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    images: ["data/40/商品主图_1.jpg","data/40/商品主图_1.jpg","data/40/商品主图_2.jpg","data/40/商品主图_3.jpg","data/40/商品主图_4.jpg"],
    description: {TC: "【產品規格】1箱100卷（每卷50克）。\n【產品尺寸】卷直徑：7cm x 高：9cm；紙巾尺寸：10cm/節，約150節；層數：2層加厚。\n【外箱尺寸】W41 x D31.5 x H32cm。\n【商品簡介】強韌潔白親膚，2層加厚設計使濕水不易爛。商用小卷規格適合燒烤場、戶外場地及公廁等人流密集場合使用，經濟實惠且高品質。", 
    EN: "【Spec】100 rolls/case (50g per roll).\n【Size】Roll: Dia 7cm x H 9cm; Paper: 10cm/sheet, approx. 150 sheets; 2-ply thickened.\n【Carton Size】W41 x D31.5 x H32cm.\n【Features】Strong, white, and skin-friendly. The 2-ply design ensures durability even when wet. Commercial small roll spec, ideal for high-traffic areas like BBQ sites, outdoor venues, and public toilets, providing excellent value." },
    stock: 10000, active: true
  },
  {
    id: "clk-3",
    category: "category_cloak",
    name: { TC: "柯洛克特級韌滑紙巾", EN: "Cloak Premium Soft Facial Tissue" },
    price: 0, 
    image: "data/41/商品主图_1.jpg",
    images: ["data/41/商品主图_1.jpg","data/41/商品主图_1.jpg","data/41/商品主图_1.jpg","data/41/商品主图_1.jpg","data/41/商品主图_1.jpg"],
    detailImage: "data/41/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: {TC: "【產品規格】1箱30包（每包80張）。\n【產品尺寸】紙巾尺寸：W20 x H20cm；層數：4層加厚。\n【外箱尺寸】W41 x D31.5 x H32cm。\n【商品簡介】質地極度韌滑，乾濕兩用，加大加厚設計且不掉屑。柔韌親膚，4層加厚使濕水不易爛，是家用、酒店會所及高端美容院的超值首選。", 
    EN: "【Spec】30 packs/case (80 sheets per pack).\n【Size】Paper Size: W20 x H20cm; 4-ply thickened.\n【Carton Size】W41 x D31.5 x H32cm.\n【Features】Extremely soft and strong, dry and wet dual use. Oversized and thickened design, lint-free and skin-friendly. The 4-ply structure ensures durability even when wet. The preferred high-value choice for home, hotels, clubs, and premium beauty salons." },
    stock: 10000, active: true
  },
  {
    id: "clk-4",
    category: "category_cloak",
    name: { TC: "柯洛克珍珠紋棉柔巾", EN: "Cloak Pearl Pattern Cotton Soft Towel" },
    price: 0, 
    image: "data/42/商品主图_1.jpg",
    images: ["data/42/商品主图_1.jpg","data/42/商品主图_1.jpg","data/42/商品主图_1.jpg","data/42/商品主图_1.jpg","data/42/商品主图_1.jpg"],
    detailImage: "data/42/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: { TC: "【產品規格】1箱24包（每包80張）。\n【產品尺寸】紙巾尺寸：W20 x H20cm；加大加厚設計。\n【外箱尺寸】W41 x D31.5 x H32cm。\n【商品簡介】特有珍珠紋理設計，親膚清潔力更強。乾濕兩用，加大加厚且不掉屑，柔韌親膚。這款棉柔巾是家用及美容院日常護理的高性價比之選。", 
    EN: "【Spec】24 packs/case (80 sheets per pack).\n【Size】Tissue Size: W20 x H20cm; Oversized and thickened design.\n【Carton Size】W41 x D31.5 x H32cm.\n【Features】Unique pearl texture for better cleaning and skin-friendly touch. Dry and wet dual use, lint-free and strong. A high-value choice for daily care in homes and professional beauty salons." },
    stock: 10000, active: true
  },
  {
    id: "clk-5",
    category: "category_cloak",
    name: { TC: "柯洛克無塵餐巾紙", EN: "Cloak Airlaid Napkin" },
    price: 0.88, 
    image: "data/43/商品主图_1.jpg",
    images: ["data/43/商品主图_1.jpg","data/43/商品主图_1.jpg","data/43/商品主图_1.jpg","data/43/商品主图_1.jpg","data/43/商品主图_1.jpg"],
    detailImage: "data/43/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: {  TC: "【產品規格】1箱50包（每包50張）。\n【產品尺寸】W20 x H20cm（摺疊後 W10 x H10cm）。\n【外箱尺寸】W51 x D21 x H46cm。\n【商品簡介】革命性佈感材質，質感似布，吸水性強且質地柔軟。環保可自然生物分解且不掉屑，甚至可重複水洗達5次。提供多種顏色及加印LOGO印刷服務，適合會所、酒吧、宴會等高端場所，引領現代餐飲裝飾新潮流。", 
    EN: "【Spec】50 packs/case (50 sheets per pack).\n【Size】W20 x H20cm (Folded: W10 x H10cm).\n【Carton Size】W51 x D21 x H46cm.\n【Features】Revolutionary cloth-feel airlaid paper, soft and highly absorbent. Eco-friendly, biodegradable, and lint-free, it can even be washed up to 5 times. Supports custom LOGO printing and multiple color options. Ideal for clubs, bars, and banquets, leading the trend of modern catering decoration." },
    stock: 10000, active: true
  },
  {
    id: "clk-6",
    category: "category_cloak",
    name: { TC: "柯洛克耐洗廚房紙", EN: "Cloak Washable Kitchen Paper" },
    price: 0, 
    image: "data/44/商品主图_1.jpg",
    images: ["data/44/商品主图_1.jpg","data/44/商品主图_1.jpg","data/44/商品主图_1.jpg","data/44/商品主图_1.jpg","data/44/商品主图_1.jpg"],
    detailImage: "data/44/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: {  TC: "【產品規格】1箱6卷（每卷145節）。\n【產品尺寸】每節 W24 x H27cm；質感似布。\n【外箱尺寸】W51 x D21 x H46cm。\n【商品簡介】採用環保加厚材質，質感似布且吸水強勁，濕水後強韌不易爛。最大特點為可重複水洗使用達5次，且能自然生物降解。除了日常強效除油清潔，亦可作隔水過濾用途。", 
    EN: "【Spec】6 rolls/case (145 sheets per roll).\n【Size】W24 x H27cm per sheet; Cloth-like texture.\n【Carton Size】W51 x D21 x H46cm.\n【Features】Eco-friendly thickened material with a cloth-like texture and strong water absorption. Durable and strong even when wet. It can be washed and reused up to 5 times and is fully biodegradable. Beyond daily heavy-duty cleaning, it can also be used for water filtration purposes." },
    stock: 10000, active: true
  },
  {
    id: "clk-7",
    category: "category_cloak",
    name: { TC: "柯洛克抹手紙 (兒童版)", EN: "Cloak Hand Towel (Kids Edition)" },
    price: 0, 
    image: "data/45/商品主图_1.jpg",
    images: ["data/45/商品主图_1.jpg","data/45/商品主图_1.jpg","data/45/商品主图_1.jpg","data/45/商品主图_1.jpg","data/45/商品主图_1.jpg"],
    detailImage: "data/45/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: { TC: "【產品規格】1箱12包。\n【產品尺寸】紙巾尺寸：W12 x H21cm；包裝尺寸：W12 x D11 x H6.5cm。\n【外箱尺寸】W32 x D22 x H20cm。\n【商品簡介】小童專屬尺寸，寬度僅為正常產品的一半。採用蔗渣漿和再造漿製造，環保且可自然生物降解。紙質堅韌不易爛、不掉屑。專為兒童小手設計，能有效減少浪費，尤其適合幼稚園、家用、美容院及注重成本效益的場所。", 
    EN: "【Spec】12 packs/case.\n【Size】Tissue: W12 x H21cm; Pack: W12 x D11 x H6.5cm.\n【Carton Size】W32 x D22 x H20cm.\n【Features】Kid-sized towels, specifically designed to be half the width of standard products to fit small hands and reduce waste. Made from eco-friendly bagasse and recycled pulp, fully biodegradable. Strong, durable, and lint-free. An ideal cost-saving choice for kindergartens, households, and beauty salons." },
    stock: 10000, active: true
  },
  {
    id: "clk-8",
    category: "category_cloak",
    name: { TC: "柯洛克竹漿紙餐巾", EN: "Cloak Bamboo Pulp Napkin" },
    price: 2.0, 
    image: "data/46/商品主图_1.jpg",
    images: ["data/46/商品主图_1.jpg","data/46/商品主图_1.jpg","data/46/商品主图_1.jpg","data/46/商品主图_2.jpg","data/46/商品主图_3.jpg"],
    detailImage: "data/46/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: {   TC: "【產品規格】1箱20包（每包100張）。\n【產品尺寸】展開尺寸：W40 x H40cm；層數：3層加厚。\n【外箱尺寸】W41 x D31.5 x H32cm。\n【商品簡介】純竹漿製造，完全生物降解，不含螢光劑，健康、環保且親膚。具備乾濕兩用特性，3層加厚設計使濕水後強韌不易爛，且擦拭不掉屑。支持可加印LOGO服務，是家用、大型餐廳及商務會所的超值之選。", 
    EN: "【Spec】20 packs/case (100 sheets per pack).\n【Size】Tissue Size: W40 x H40cm; 3-ply thickened.\n【Carton Size】W41 x D31.5 x H32cm.\n【Features】Made from 100% pure bamboo pulp, fully biodegradable, healthy, and skin-friendly. Suitable for both dry and wet use. The 3-ply thickened structure ensures it remains strong when wet and remains lint-free. Supports custom LOGO printing. A premium high-value choice for homes, restaurants, and business clubs." },
    stock: 10000, active: true
  },
  {
    id: "clk-9",
    category: "category_cloak",
    name: { TC: "柯洛克平紋棉柔巾", EN: "Cloak Plain Cotton Soft Towel" },
    price: 0, 
    image: "data/47/商品主图_1.jpg",
    images: ["data/47/商品主图_1.jpg","data/47/商品主图_1.jpg","data/47/商品主图_1.jpg","data/47/商品主图_1.jpg","data/47/商品主图_1.jpg"],
    detailImage: "data/47/描述图(拼接)_1.jpg", videoUrl:"data/factory/PC端_描述视频_1.mp4",
    description: { TC: "【產品規格】1箱24包（每包100張）。\n【產品尺寸】紙巾尺寸：W20 x H20cm；加大加厚設計。\n【外箱尺寸】W41 x D31.5 x H32cm。\n【商品簡介】細膩平紋設計，柔軟不掉屑。乾濕兩用，加大加厚設計確保濕水不爛，觸感柔韌親膚。這款棉柔巾是家用及美容院日常洗臉與護理的超值首選。", 
    EN: "【Spec】24 packs/case (100 sheets per pack).\n【Size】Tissue Size: W20 x H20cm; Enlarged and thickened design.\n【Carton Size】W41 x D31.5 x H32cm.\n【Features】Fine plain weave design, soft and lint-free. Suitable for both dry and wet use. The thickened structure ensures it remains durable even when wet. An excellent high-value choice for daily facial cleaning and professional beauty salon care." },
    stock: 10000, active: true
  },
  {
    id: "clk-10",
    category: "category_cloak",
    name: { TC: "柯洛克黑色無塵餐巾紙", EN: "Cloak Black Airlaid Napkin" },
    price: 0.88, 
    image: "data/48/商品主图_1.jpg",
    images: ["data/48/商品主图_1.jpg","data/48/商品主图_1.jpg","data/48/商品主图_1.jpg","data/48/商品主图_1.jpg","data/48/商品主图_1.jpg"],
    detailImage: "data/48/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: { TC: "【產品規格】1箱50包（每包50張）。\n【產品尺寸】W20 x H20cm（摺疊後 W10 x H10cm）。\n【外箱尺寸】W41 x D31.5 x H32cm。\n【商品簡介】極簡純黑風格，高端佈感無塵材質，質感似布且乾濕兩用。最大特色為可重複水洗達5次，加大加厚設計確保不掉屑，質地超柔韌且吸水親膚。能顯著提升商務場合與宴會的裝飾層次，是家用、餐廳及酒樓省成本的不二之選。", 
    EN: "【Spec】50 packs/case (50 sheets per pack).\n【Size】W20 x H20cm (Folded: W10 x H10cm).\n【Carton Size】W41 x D31.5 x H32cm.\n【Features】Minimalist black style with a premium cloth-like airlaid texture. Suitable for both dry and wet use, and washable up to 5 times. The enlarged and thickened design ensures it is lint-free, super strong, and skin-friendly. Significantly elevates the decorative level of business events and banquets, making it the perfect cost-saving choice for households and restaurants." },
    stock: 10000, active: true
  },
  {
    id: "clk-11",
    category: "category_cloak",
    name: { TC: "柯洛克酒精消毒濕紙巾", EN: "Cloak Alcohol Disinfectant Wipe" },
    price: 0, 
    image: "data/49/商品主图_1.jpg",
    images: ["data/49/商品主图_1.jpg","data/49/商品主图_1.jpg","data/49/商品主图_1.jpg","data/49/商品主图_1.jpg","data/49/商品主图_1.jpg"],
    detailImage: "data/49/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: {   TC: "【產品規格】1箱600片（獨立包裝）。\n【產品尺寸】紙巾尺寸：W20 x H20cm；包裝尺寸：W6.5 x H14cm。\n【外箱尺寸】W51 x D28 x H29cm。\n【商品簡介】採用純環保無塵紙製造，厚度比普通紙巾厚1倍，面積大40%。含酒精成分有效殺滅99%細菌，單片獨立包裝防止二次污染，且環保可自然生物分解。高品質與強效防護力，是商務、旅遊及日常衛生的安心之選。", 
    EN: "【Spec】600 pieces/case (Individually wrapped).\n【Size】Tissue Size: W20 x H20cm; Pack Size: W6.5 x H14cm.\n【Carton Size】W51 x D28 x H29cm.\n【Features】Made from pure eco-friendly Airlaid Paper, twice as thick and 40% larger in area than ordinary napkins. Effectively kills 99% of bacteria. Individually wrapped to prevent secondary contamination and fully biodegradable. Provides high-quality protection for business, travel, and daily hygiene needs." },
    stock: 10000, active: true
  },
  {
    id: "clk-12",
    category: "category_cloak",
    name: { TC: "柯洛克彩色無塵餐巾紙", EN: "Cloak Colored Airlaid Napkin" },
    price: 0.88, 
    image: "data/50/商品主图_1.jpg",
    images: ["data/50/商品主图_1.jpg","data/50/商品主图_1.jpg","data/50/商品主图_2.jpg","data/50/商品主图_3.jpg","data/50/商品主图_4.jpg"],
    detailImage: "data/50/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: {  TC: "【產品規格】1箱30包（每包80張），共15款色彩可選。\n【產品尺寸】紙巾尺寸：W20 x H20cm；層數：4層加厚。\n【外箱尺寸】W41 x D31.5 x H32cm。\n【商品簡介】高品質染色無塵紙，提供15款鮮艷色彩且牢固不掉色，滿足各類主題場景佈置。具備乾濕兩用特性，加大加厚設計確保擦拭不掉屑，4層加厚結構使濕水後依然強韌不爛。質地柔韌親膚，是家用、美容院及宴會裝飾的超值首選。", 
    EN: "【Spec】30 packs/case (80 sheets per pack), 15 colors available.\n【Size】Tissue Size: W20 x H20cm; 4-ply thickened.\n【Carton Size】W41 x D31.5 x H32cm.\n【Features】High-quality colored airlaid paper with 15 vibrant, color-fast options to suit any scene. Suitable for both dry and wet use. The enlarged and thickened 4-ply structure ensures it is lint-free and stays strong even when wet. Soft and skin-friendly, it is the ideal high-value choice for homes, beauty salons, and event decorations." },
    stock: 10000, active: true
  },
  {
    id: "clk-13",
    category: "category_cloak",
    name: { TC: "柯洛克輕柔乳霜巾", EN: "Cloak Soft Lotion Tissue" },
    price: 0, 
    image: "data/51/商品主图_1.jpg",
    images: ["data/51/商品主图_1.jpg","data/51/商品主图_1.jpg","data/51/商品主图_1.jpg","data/51/商品主图_1.jpg","data/51/商品主图_1.jpg"],
    detailImage: "data/51/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: { TC: "【產品規格】1箱50包（每包110抽 / 330張）。\n【產品尺寸】紙巾尺寸：W19 x H15cm；包裝尺寸：W155 x D100 x H4cm。\n【外箱尺寸】W50.5 x D32.5 x H22cm。\n【商品簡介】特別添加柔潤保濕成份，確保每張紙巾都極致柔潤順滑且堅韌不掉粉。親膚呵護設計，非常適合母嬰使用，且對敏感鼻使用者極其友好。其觸感極度輕柔，是日常面部保養與嬌嫩肌膚護理的超值之選。", 
    EN: "【Spec】50 packs/case (110 pulls / 330 sheets per pack).\n【Size】Tissue Size: W19 x H15cm; Pack Size: W155 x D100 x H4cm.\n【Carton Size】W50.5 x D32.5 x H22cm.\n【Features】Specially formulated with moisturizing ingredients to ensure every sheet is smooth, soft, and strong without lint. Designed for skin-friendly care, making it perfect for mothers, babies, and those with sensitive noses. Its extremely silky texture is ideal for daily facial care and delicate skin protection." },
    stock: 10000, active: true
  },

  // 📂 1️⃣2️⃣ 原材料系列 (category_rawmaterial) - 數據集從 data/46 開始
  {
    id: "raw-1", 
    category: "category_rawmaterial",
    name: { TC: "染色大軸原紙", EN: "Jumbo rolls dyeing paper" },
    price: 0, 
    image: "data/52/商品主图_1.jpg",
    images: ["data/52/商品主图_1.jpg","data/52/商品主图_2.jpg","data/52/商品主图_3.jpg","data/52/商品主图_4.jpg","data/52/商品主图_5.jpg"],
    detailImage: "data/52/描述图(拼接)_1.jpg", videoUrl: "data/factory/PC端_描述视频_1.mp4",
    description: { TC: "規格：工業大軸。專業染色工藝，染色均勻且色牢度高，是造紙深加工與印刷廠的核心原料。", EN: "Spec: Jumbo roll. Professional dyeing process with high color stability, essential material for factories." },
    stock: 10000, active: true
  }
];