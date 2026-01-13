
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
    category_cloak: "柯洛克系列 CLOAK",
    category_business: "商務用紙系列 BUSINESS",
    category_dustfree: "無塵紙餐巾紙系列",
    category_table: "紙桌布系列 TABLE CO",
    category_wet: "濕紙巾系列 WET WI",
    category_other: "其他產品 OTHER P",
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
    category_cloak: "CLOAK Series",
    category_business: "BUSINESS Series",
    category_dustfree: "Airlaid Paper Series", // ⭐ 已修改：無塵紙 -> Airlaid Paper
    category_table: "Table Cloths",
    category_wet: "Wet Wipes",
    category_other: "Other Products",
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
  // 📂 1️⃣ 高端定制系列 CLOAK (clk-1 ~ clk-14)
  {
    id: "clk-1", category: "category_cloak",
    name: { TC: "数码立体印刷超清晰42×48cm大尺寸刀叉袋印logo一张可接", EN: "Digital 3D Print Large Clear 42x48cm Cutlery Bag with Logo" },
    price: 2.5, image: "data/1/商品主图_2.jpg",
    images: ["data/1/商品主图_2.jpg","data/1/商品主图_1.jpg","data/1/商品主图_3.jpg","data/1/商品主图_4.jpg","data/1/商品主图_5.jpg","data/1/商品主图_6.jpg"],
    detailImage: "data/1/描述图(拼接)_1.png", videoUrl: "data/1/PC端_主图视频_1.mp4",
    description: { TC: "超清晰立体印刷，大尺寸展示效果佳。", EN: "Ultra-clear 3D print, great for large display." },
    stock: 10000, active: true
  },
  {
    id: "clk-2", category: "category_cloak",
    name: { TC: "无尘刀叉袋双色烫金logo外贸高档餐巾纸定制量小可印24小时发货", EN: "Airlaid Paper Cutlery Bag Dual Gold Foil Logo for Export" },
    price: 2.8, image: "data/2/商品主图_2.jpg",
    images: ["data/2/商品主图_2.jpg","data/2/商品主图_1.jpg","data/2/商品主图_3.jpg","data/2/商品主图_4.jpg","data/2/商品主图_5.jpg","data/2/商品主图_6.jpg"],
    detailImage: "data/2/描述图(拼接)_1.png", videoUrl: "data/2/PC端_主图视频_1.mp4",
    description: { TC: "双色烫金工艺，外贸高档品质，支持小批量定制。", EN: "Dual gold foil, export premium, small batch customization." },
    stock: 10000, active: true
  },
  {
    id: "clk-3", category: "category_cloak",
    name: { TC: "宴会用黑色铭牌烙印腰封式袋装布触感餐巾纸品牌标志专属图案定制", EN: "Banquet Black Nameplate Sleeve Cloth-Feel Napkin" },
    price: 2.3, image: "data/3/商品主图_2.jpg",
    images: ["data/3/商品主图_2.jpg","data/3/商品主图_1.jpg","data/3/商品主图_3.jpg","data/3/商品主图_4.jpg","data/3/商品主图_5.jpg","data/3/商品主图_6.jpg","data/3/商品主图_7.jpg"],
    detailImage: "data/3/描述图(拼接)_1.png", videoUrl: "data/3/PC端_主图视频_1.mp4",
    description: { TC: "黑色铭牌烙印，布触感，宴会用专属定制。", EN: "Black nameplate branding, cloth-feel, banquet exclusive." },
    stock: 10000, active: true
  },
  {
    id: "clk-4", category: "category_cloak",
    name: { TC: "供应灰色无尘纸布触感宴会纸巾袋鼠袋刀叉袋折法可加印logo", EN: "Gray Airlaid Paper Cloth-Feel Banquet Kangaroo Bag" },
    price: 1.6, image: "data/4/商品主图_2.jpg",
    images: ["data/4/商品主图_2.jpg","data/4/商品主图_1.jpg","data/4/商品主图_3.jpg","data/4/商品主图_4.jpg","data/4/商品主图_5.jpg","data/4/商品主图_6.jpg"],
    detailImage: "data/4/描述图(拼接)_1.png", videoUrl: "data/4/PC端_主图视频_1.mp4",
    description: { TC: "灰色布触感，袋鼠袋设计，可加印logo。", EN: "Gray cloth-feel, kangaroo pouch, logo printable." },
    stock: 10000, active: true
  },
  {
    id: "clk-5", category: "category_cloak",
    name: { TC: "供应宴会用白色铭牌烙印腰封式餐巾纸刀叉袋布触感餐巾纸定制LOGO", EN: "White Nameplate Sleeve Cloth-Feel Banquet Napkin" },
    price: 2.3, image: "data/5/商品主图_2.jpg",
    images: ["data/5/商品主图_2.jpg","data/5/商品主图_1.jpg","data/5/商品主图_3.jpg","data/5/商品主图_4.jpg","data/5/商品主图_5.jpg","data/5/商品主图_6.jpg","data/5/商品主图_7.jpg"],
    detailImage: "data/5/描述图(拼接)_1.png", videoUrl: "data/5/PC端_主图视频_1.mp4",
    description: { TC: "白色铭牌烙印，布触感，宴会用定制LOGO。", EN: "White nameplate branding, cloth-feel, banquet custom logo." },
    stock: 10000, active: true
  },
  {
    id: "clk-6", category: "category_cloak",
    name: { TC: "黑色木浆纸餐巾纸印白色logo可代客加印logo商用广告纸巾", EN: "Black Pulp White Logo Napkin" },
    price: 1.1, image: "data/6/商品主图_2.jpg",
    images: ["data/6/商品主图_2.jpg","data/6/商品主图_1.jpg","data/6/商品主图_3.jpg","data/6/商品主图_4.jpg","data/6/商品主图_5.jpg","data/6/商品主图_6.jpg"],
    detailImage: "data/6/描述图(拼接)_1.png", videoUrl: "data/6/PC端_主图视频_1.mp4",
    description: { TC: "黑色木浆纸印白logo，可代客加印。", EN: "Black pulp white logo, customizable." },
    stock: 10000, active: true
  },
  {
    id: "clk-7", category: "category_cloak",
    name: { TC: "黑色木浆纸印彩色二维码外贸无尘纸巾印logo酒楼宴会餐厅餐巾纸", EN: "Black Pulp Color QR Code Airlaid Paper Napkin" },
    price: 1.1, image: "data/7/商品主图_2.jpg",
    images: ["data/7/商品主图_2.jpg","data/7/商品主图_1.jpg","data/7/商品主图_3.jpg","data/7/商品主图_4.jpg","data/7/商品主图_5.jpg","data/7/商品主图_6.jpg"],
    detailImage: "data/7/描述图(拼接)_1.png", videoUrl: "data/7/PC端_主图视频_1.mp4",
    description: { TC: "支持彩色印刷二维码，互动性强。", EN: "Supports color QR printing." },
    stock: 10000, active: true
  },
  {
    id: "clk-8", category: "category_cloak",
    name: { TC: "黑色木浆纸印彩色二维码外贸无尘纸巾印logo酒楼宴会餐厅餐巾纸2", EN: "Black Pulp Color QR Code Airlaid Paper Napkin 2" },
    price: 1.1, image: "data/8/商品主图_2.jpg",
    images: ["data/8/商品主图_2.jpg","data/8/商品主图_1.jpg","data/8/商品主图_3.jpg","data/8/商品主图_4.jpg","data/8/商品主图_5.jpg","data/8/商品主图_6.jpg"],
    detailImage: "data/8/描述图(拼接)_1.png", videoUrl: "data/8/PC端_主图视频_1.mp4",
    description: { TC: "第二款彩色二维码外贸无尘纸巾。", EN: "Second version of color QR code Airlaid Paper napkin." },
    stock: 10000, active: true
  },
  {
    id: "clk-9", category: "category_cloak",
    name: { TC: "红色刀叉袋印金logo无尘餐巾纸刀叉袋西餐布触感V折餐巾纸", EN: "Red Cutlery Bag Gold Logo Airlaid Paper Napkin" },
    price: 1.5, image: "data/9/商品主图_2.jpg",
    images: ["data/9/商品主图_2.jpg","data/9/商品主图_1.jpg","data/9/商品主图_3.jpg","data/9/商品主图_4.jpg","data/9/商品主图_5.jpg","data/9/商品主图_6.jpg"],
    detailImage: "data/9/描述图(拼接)_1.png", videoUrl: "data/9/PC端_主图视频_1.mp4",
    description: { TC: "红色刀叉袋金logo，布触感V折，西餐适用。", EN: "Red cutlery bag gold logo, cloth-feel V-fold." },
    stock: 10000, active: true
  },
  {
    id: "clk-10", category: "category_cloak",
    name: { TC: "跨境供应多色烫金刀叉袋商务宴会专用加印logo大小單可接", EN: "Multi-Color Gold Foil Cutlery Bag for Business" },
    price: 2.0, image: "data/10/商品主图_2.jpg",
    images: ["data/10/商品主图_2.jpg","data/10/商品主图_1.jpg","data/10/商品主图_3.jpg","data/10/商品主图_4.jpg","data/10/商品主图_5.jpg","data/10/商品主图_6.jpg"],
    detailImage: "data/10/描述图(拼接)_1.png", videoUrl: "data/10/PC端_主图视频_1.mp4",
    description: { TC: "多色烫金刀叉袋，商务宴会专用。", EN: "Multi-color gold foil, business banquet use." },
    stock: 10000, active: true
  },
  {
    id: "clk-11", category: "category_cloak",
    name: { TC: "烙印logo一次性布触感纸餐巾宴会用彩色无尘纸餐巾纸印单多色logo", EN: "Embossed Logo Disposable Cloth-Feel Napkin" },
    price: 1.4, image: "data/11/商品主图_2.jpg",
    images: ["data/11/商品主图_2.jpg","data/11/商品主图_1.jpg","data/11/商品主图_3.jpg","data/11/商品主图_4.jpg","data/11/商品主图_5.jpg","data/11/商品主图_6.jpg"],
    detailImage: "data/11/描述图(拼接)_1.png", videoUrl: "data/11/PC端_主图视频_1.mp4",
    description: { TC: "一次性布触感纸餐巾，宴会用。", EN: "Disposable cloth-feel napkin, banquet use." },
    stock: 10000, active: true
  },
  {
    id: "clk-12", category: "category_cloak",
    name: { TC: "厂家直供方形餐巾纸木浆纸黑色烫金LOGO派对酒店西餐厅商用定制", EN: "Square Pulp Paper Black Gold Foil Napkin" },
    price: 1.8, image: "data/12/商品主图_2.jpg",
    images: ["data/12/商品主图_2.jpg","data/12/商品主图_1.jpg","data/12/商品主图_3.jpg","data/12/商品主图_4.jpg","data/12/商品主图_5.jpg","data/12/商品主图_6.jpg"],
    detailImage: "data/12/描述图(拼接)_1.png", videoUrl: "data/12/PC端_主图视频_1.mp4",
    description: { TC: "烫金工艺，尽显品牌尊贵。", EN: "Gold foil logo, premium brand feel." },
    stock: 10000, active: true
  },
  {
    id: "clk-13", category: "category_cloak",
    name: { TC: "定制黑色方形餐巾纸木浆纸黑色烫金LOGO派對酒店西餐廳商用", EN: "Custom Black Square Gold Foil Napkin" },
    price: 1.8, image: "data/13/商品主图_2.jpg",
    images: ["data/13/商品主图_2.jpg","data/13/商品主图_1.jpg","data/13/商品主图_3.jpg","data/13/商品主图_4.jpg","data/13/商品主图_5.jpg","data/13/商品主图_6.jpg"],
    detailImage: "data/13/描述图(拼接)_1.png", videoUrl: "data/13/PC端_主图视频_1.mp4",
    description: { TC: "全黑设计，彰显不凡品味。", EN: "All-black design for modern taste." },
    stock: 10000, active: true
  },
  {
    id: "clk-14", category: "category_cloak",
    name: { TC: "多颜色可选铭牌烙印腰封式布触感餐巾纸宴会酒店商用精致刀叉袋", EN: "Multi-Color Nameplate Sleeve Napkin" },
    price: 2.3, image: "data/14/商品主图_2.jpg",
    images: ["data/14/商品主图_2.jpg","data/14/商品主图_1.jpg","data/14/商品主图_3.jpg","data/14/商品主图_4.jpg","data/14/商品主图_5.jpg","data/14/商品主图_6.jpg"
    ,"data/14/商品主图_7.jpg","data/14/商品主图_8.jpg","data/14/商品主图_9.jpg","data/14/商品主图_10.jpg","data/14/商品主图_11.jpg","data/14/商品主图_12.jpg"
    ,"data/14/商品主图_13.jpg"],
    detailImage: "data/14/描述图(拼接)_1.png", videoUrl: "data/14/PC端_主图视频_1.mp4",
    description: { TC: "多颜色可选，铭牌烙印腰封式。", EN: "Multi-color option, nameplate sleeve." },
    stock: 10000, active: true
  },

  // 📂 2️⃣ 商务餐饮系列 BUSINESS (biz-1 ~ biz-8)
  {
    id: "biz-1", category: "category_business",
    name: { TC: "商務廣告木漿餐巾紙 (定制Logo)", EN: "Commercial Wood Pulp Napkin (Custom Logo)" },
    price: 0.5, image: "data/15/商品主图_1.jpg",
    images: ["data/15/商品主图_1.jpg","data/15/商品主图_2.jpg","data/15/商品主图_3.jpg","data/15/商品主图_4.jpg","data/15/商品主图_5.jpg"],
    detailImage: "data/15/描述图(拼接)_1.png", videoUrl: "data/15/PC端_主图视频_1.mp4",
    description: { TC: "廣泛應用於中西餐廳，性價比高。", EN: "Widely used in restaurants, high value." },
    stock: 10000, active: true
  },
  {
    id: "biz-2", category: "category_business",
    name: { TC: "供应餐巾纸宴會商用直接反向式口袋折纸巾印徽标定 制量小可订", EN: "Banquet Reverse Pocket Fold Napkin" },
    price: 0.9, image: "data/16/商品主图_2.jpg",
    images: ["data/16/商品主图_2.jpg","data/16/商品主图_1.jpg","data/16/商品主图_3.jpg","data/16/商品主图_4.jpg","data/16/商品主图_5.jpg","data/16/商品主图_6.jpg"],
    detailImage: "data/16/描述图(拼接)_1.png", videoUrl: "data/16/PC端_主图视频_1.mp4",
    description: { TC: "反向口袋折叠，使用便利。", EN: "Reverse fold for convenience." },
    stock: 10000, active: true
  },
  {
    id: "biz-3", category: "category_business",
    name: { TC: "供应口袋折彩色餐巾紙可印刷餐巾紙木漿紙西餐酒店口袋餐巾紙", EN: "Printable Pocket Fold Colored Napkin" },
    price: 0.8, image: "data/17/商品主图_2.jpg",
    images: ["data/17/商品主图_2.jpg","data/17/商品主图_1.jpg","data/17/商品主图_3.jpg","data/17/商品主图_4.jpg","data/17/商品主图_5.jpg","data/17/商品主图_6.jpg"],
    detailImage: "data/17/描述图(拼接)_1.png", videoUrl: "data/17/PC端_主图视频_1.mp4",
    description: { TC: "口袋折彩色餐巾紙，可印刷，木漿紙西餐酒店適用。", EN: "Pocket fold colored napkin, printable, suitable for pulp paper western hotels." },
    stock: 10000, active: true
  },
  {
    id: "biz-4", category: "category_business",
    name: { TC: "酒吧小食防濕隔熱四合一紙巾清吧酒館商用包裝紙巾飲料酒吧巾", EN: "Bar Snack Heat & Moisture Proof 4-in-1 Napkin" },
    price: 1.0, image: "data/18/商品主图_2.jpg",
    images: ["data/18/商品主图_2.jpg","data/18/商品主图_1.jpg","data/18/商品主图_3.jpg","data/18/商品主图_4.jpg","data/18/商品主图_5.jpg","data/18/商品主图_6.jpg"],
    detailImage: "data/18/描述图(拼接)_1.png", videoUrl: "data/18/PC端_主图视频_1.mp4",
    description: { TC: "酒吧小食專用四合一紙巾，防濕隔熱。", EN: "4-in-1 napkin for bar snacks, moisture & heat proof." },
    stock: 10000, active: true
  },
  {
    id: "biz-5", category: "category_business",
    name: { TC: "餐巾紙定制可印logo廣告紙巾訂做西餐廳奶茶店商用正方形方紙巾", EN: "Custom Logo Commercial Square Napkin" },
    price: 0.5, image: "data/19/商品主图_1.jpg",
    images: ["data/19/商品主图_1.jpg","data/19/商品主图_2.jpg","data/19/商品主图_3.jpg","data/19/商品主图_4.jpg","data/19/商品主图_5.jpg"],
    detailImage: "data/19/描述图(拼接)_1.png", videoUrl: "data/19/PC端_描述视频_1.mp4",
    description: { TC: "可印logo廣告紙巾，西餐廳奶茶店商用。", EN: "Custom logo napkin for western restaurants and milk tea shops." },
    stock: 10000, active: true
  },
  {
    id: "biz-6", category: "category_business",
    name: { TC: "廠家純色餐巾紙餐廳餐飲抽紙多色可選節日派對商用抽紙", EN: "Solid Color Restaurant Napkin Multi-Color Option" },
    price: 0.8, image: "data/20/商品主图_1.jpg",
    images: ["data/20/商品主图_1.jpg","data/20/商品主图_2.jpg","data/20/商品主图_3.jpg","data/20/商品主图_4.jpg","data/20/商品主图_5.jpg","data/20/商品主图_6.jpg","data/20/商品主图_7.jpg"],
    detailImage: "data/20/描述图(拼接)_1.png", videoUrl: "data/20/PC端_描述视频_1.mp4",
    description: { TC : "多色可選（紅色、黑色），節日派對商用抽紙，尺寸17×18cm。", EN: "Multiple colors available (red, black) for festival and party commercial tissue paper. Size: 17×18cm.",},
    stock: 10000, active: true
  },
  {
    id: "biz-7", category: "category_business",
    name: { TC: "廠家定制日式高低折·長短折紙巾適配高端日料宴會質感精緻餐巾紙", EN: "Japanese High-Low Fold Napkin" },
    price: 1.6, image: "data/21/商品主图_2.jpg",
    images: ["data/21/商品主图_2.jpg","data/21/商品主图_1.jpg","data/21/商品主图_3.jpg","data/21/商品主图_4.jpg","data/21/商品主图_5.jpg","data/21/商品主图_6.jpg","data/21/商品主图_7.jpg"],
    detailImage: "data/21/描述图(拼接)_1.png", videoUrl: "data/21/PC端_主图视频_1.mp4",
    description: { TC: "日式高低折設計，質感精緻，高端日料宴會適用。", EN: "Japanese high-low fold design, exquisite texture, for premium Japanese banquets." },
    stock: 10000, active: true
  },
  {
    id: "biz-8", category: "category_business",
    name: { TC: "工廠批發彩色卷裝衛生紙高檔酒店一次性彩色無塵餐巾紙多顏色定制", EN: "Wholesale Colored Roll Tissue for Hotel" },
    price: 1.2, image: "data/22/商品主图_1.jpg",
    images: ["data/22/商品主图_1.jpg","data/22/商品主图_1.jpg","data/22/商品主图_3.jpg","data/22/商品主图_4.jpg","data/22/商品主图_5.jpg","data/22/商品主图_6.jpg"
    ,"data/22/商品主图_7.jpg","data/22/商品主图_8.jpg","data/22/商品主图_9.jpg","data/22/商品主图_10.jpg","data/22/商品主图_11.jpg","data/22/商品主图_12.jpg"
    ,"data/22/商品主图_13.jpg"],
    detailImage: "data/22/描述图(拼接)_1.png", videoUrl: "data/22/PC端_描述视频_1.mp4",
    description: { TC: "高檔酒店一次性彩色無塵餐巾紙，多顏色定制。", EN: "High-end hotel disposable colored Airlaid Paper napkins, multi-color customization." },
    stock: 10000, active: true
  },
// 📂 3️⃣ 无尘纸系列 AIRLAID (df-1 ~ df-5)
{
  id: "df-1", category: "category_dustfree",
  name: { TC: "竹浆纸普通纸巾西餐厅奶茶店小食纸巾饮料酒吧巾 正方形方纸巾", EN: "Bamboo Pulp Plain Napkin for Western Restaurants" },
  price: 0.6, image: "data/23/商品主图_2.jpg",
  images: ["data/23/商品主图_2.jpg","data/23/商品主图_1.jpg","data/23/商品主图_3.jpg","data/23/商品主图_4.jpg","data/23/商品主图_5.jpg","data/23/商品主图_6.jpg"],
  detailImage: "data/23/描述图(拼接)_1.png", videoUrl: "data/23/PC端_主图视频_1.mp4",
  description: { TC: "竹浆纸普通纸巾，适用西餐厅奶茶店小食。", EN: "Bamboo pulp plain napkin, suitable for western restaurants and milk tea shops." },
  stock: 10000, active: true
},
{
  id: "df-2", category: "category_dustfree",
  name: { TC: "厂家供应专利款彩色刀叉袋餐巾纸无尘纸可订颜色量小可接印LOGO", EN: "Patented Colored Cutlery Bag Napkin (Airlaid Paper/Custom Colors)" },
  price: 0.8, image: "data/24/商品主图_2.jpg",
  images: ["data/24/商品主图_2.jpg","data/24/商品主图_1.jpg","data/24/商品主图_3.jpg","data/24/商品主图_4.jpg","data/24/商品主图_5.jpg","data/24/商品主图_6.jpg"],
  detailImage: "data/24/描述图(拼接)_1.png", videoUrl: "data/24/PC端_主图视频_1.mp4",
  description: { TC: "多色可選，適配不同裝修風格。", EN: "Multiple colors available." },
  stock: 10000, active: true
},
{
  id: "df-3", category: "category_dustfree",
  name: { TC: "厂家直营欧美外贸订单麻布触感无尘餐巾纸印双色LOGO餐巾纸", EN: "Linen-Feel Airlaid Paper Napkin Dual Color Logo" },
  price: 1.5, image: "data/25/商品主图_2.jpg",
  images: ["data/25/商品主图_2.jpg","data/25/商品主图_1.jpg","data/25/商品主图_3.jpg","data/25/商品主图_4.jpg","data/25/商品主图_5.jpg","data/25/商品主图_6.jpg"],
  detailImage: "data/25/描述图(拼接)_1.png", videoUrl: "data/25/PC端_主图视频_1.mp4",
  description: { TC: "麻布觸感無塵餐巾紙，歐美外貿訂單，雙色LOGO。", EN: "Linen-feel Airlaid Paper napkin, EU/US export orders, dual color logo." },
  stock: 10000, active: true
},
{
  id: "df-4", category: "category_dustfree",
  name: { TC: "定制白色木浆纸餐巾纸印白色logo可代客加印logo商用广告纸巾", EN: "Custom White Pulp Napkin White Logo" },
  price: 1.1, image: "data/26/商品主图_2.jpg",
  images: ["data/26/商品主图_2.jpg","data/26/商品主图_1.jpg","data/26/商品主图_3.jpg","data/26/商品主图_4.jpg","data/26/商品主图_5.jpg","data/26/商品主图_6.jpg","data/26/商品主图_7.jpg"],
  detailImage: "data/26/描述图(拼接)_1.png", videoUrl: "data/26/PC端_主图视频_1.mp4",
  description: { TC: "白色木浆纸印白logo，可代客加印，商用廣告。", EN: "White pulp white logo, customizable, for commercial advertising." },
  stock: 10000, active: true
},
{
  id: "df-5", category: "category_dustfree",
  name: { TC: "定制黑色方形餐巾纸木浆纸黑色烫金LOGO派对酒店西餐厅商用", EN: "Custom Black Square Gold Foil Napkin" },
  price: 1.8, image: "data/27/商品主图_2.jpg",
  images: ["data/27/商品主图_2.jpg","data/27/商品主图_1.jpg","data/27/商品主图_3.jpg","data/27/商品主图_4.jpg","data/27/商品主图_5.jpg","data/27/商品主图_6.jpg"],
  detailImage: "data/27/描述图(拼接)_1.png", videoUrl: "data/27/PC端_主图视频_1.mp4",
  description: { TC: "全黑设计，彰显不凡品味。", EN: "All-black design for modern taste." },
  stock: 10000, active: true
},

// 📂 4️⃣ 原材大卷轴 RAW_MATERIAL (rm-1 ~ rm-3)
{
  id: "rm-1", category: "category_rawmaterial",
  name: { TC: "批发大卷轴装染色无尘纸 染色竹浆纸接受來色樣定制餐巾紙原紙", EN: "Wholesale Jumbo Roll Dyed Airlaid Paper/Bamboo Pulp Paper" },
  price: 150.0, image: "data/28/商品主图_1.jpg",
  images: ["data/28/商品主图_1.jpg","data/28/商品主图_2.jpg","data/28/商品主图_3.jpg","data/28/商品主图_4.jpg","data/28/商品主图_5.jpg","data/28/商品主图_6.jpg"
  ,"data/28/商品主图_7.jpg","data/28/商品主图_8.jpg","data/28/商品主图_9.jpg","data/28/商品主图_10.jpg","data/28/商品主图_11.jpg","data/28/商品主图_12.jpg","data/28/商品主图_13.jpg"
  ,"data/28/商品主图_14.jpg"],
  detailImage: "data/28/描述图(拼接)_1.png", videoUrl: "data/28/PC端_描述视频_1.mp4",
  description: { TC: "原紙卷軸，適合後續加工。", EN: "Jumbo rolls for processing." },
  stock: 10000, active: true
},
{
  id: "rm-2", category: "category_rawmaterial",
  name: { TC: "厂家直营大卷轴彩色染色竹浆纸无尘纸原纸餐巾纸酒店宴会量小可订", EN: "Large Roll Colored Bamboo Pulp Airlaid Paper" },
  price: 145.0, image: "data/29/商品主图_1.jpg",
  images: ["data/29/商品主图_1.jpg","data/29/商品主图_2.jpg","data/29/商品主图_3.jpg","data/29/商品主图_4.jpg","data/29/商品主图_5.jpg","data/29/商品主图_6.jpg"
  ,"data/29/商品主图_7.jpg","data/29/商品主图_8.jpg","data/29/商品主图_9.jpg","data/29/商品主图_10.jpg","data/29/商品主图_11.jpg","data/29/商品主图_12.jpg","data/29/商品主图_13.jpg"
  ,"data/29/商品主图_14.jpg"],
  detailImage: "data/29/描述图(拼接)_1.png", videoUrl: "data/29/PC端_描述视频_1.mp4",
  description: { TC: "大卷轴彩色染色竹浆纸，酒店宴会适用。", EN: "Large roll colored bamboo pulp, suitable for hotel banquets." },
  stock: 10000, active: true
},
{
  id: "rm-3", category: "category_rawmaterial",
  name: { TC: "厂家直营卡其色大卷轴彩色染色宴会西餐无尘纸无尘纸巾量小可订", EN: "Khaki Large Roll Colored Airlaid Paper" },
  price: 148.0, image: "data/30/商品主图_2.jpg",
  images: ["data/30/商品主图_2.jpg","data/30/商品主图_1.jpg","data/30/商品主图_3.jpg","data/30/商品主图_4.jpg","data/30/商品主图_5.jpg","data/30/商品主图_6.jpg"],
  detailImage: "data/30/描述图(拼接)_1.png", videoUrl: "data/30/PC端_主图视频_1.mp4",
  description: { TC: "卡其色大卷轴彩色染色无尘纸，宴会西餐适用。", EN: "Khaki large roll colored Airlaid Paper for banquet western dining." },
  stock: 10000, active: true
},

// 📂 5️⃣ 杯垫桌布系列 TABLEWARE (tb-1 ~ tb-2)
{
  id: "tb-1", category: "category_tableware",
  name: { TC: "一次性无尘纸杯垫宴会商用定制烫金水墨印烙印压印环保无尘纸杯垫", EN: "Disposable Airlaid Paper Coaster (Gold Foil/Brand)" },
  price: 0.45, image: "data/31/商品主图_1.jpg",
  images: ["data/31/商品主图_1.jpg","data/31/商品主图_2.jpg","data/31/商品主图_3.jpg","data/31/商品主图_4.jpg","data/31/商品主图_5.jpg"],
  detailImage: "data/31/描述图(拼接)_1.png", videoUrl: "data/31/PC端_描述视频_1.mp4",
  description: { TC: "高品質紙杯墊，保護桌面更美觀。", EN: "High quality coasters for protection." },
  stock: 10000, active: true
},
{
  id: "tb-2", category: "category_tableware",
  name: { TC: "定制一次性无尘纸杯垫系列商用可烫金烙印压印LOGO环保无尘纸杯垫", EN: "Commercial Eco Airlaid Paper Coaster Series" },
  price: 0.5, image: "data/32/商品主图_1.jpg",
  images: ["data/32/商品主图_1.jpg","data/32/商品主图_2.jpg","data/32/商品主图_3.jpg","data/32/商品主图_4.jpg","data/32/商品主图_5.jpg"],
  detailImage: "data/32/描述图(拼接)_1.png", videoUrl: "data/32/PC端_描述视频_1.mp4",
  description: { TC: "環保材質，商用首選。", EN: "Eco-friendly for commercial use." },
  stock: 10000, active: true
},

// 📂 6️⃣ 其他系列 OTHER (ot-1 ~ ot-5)
{
  id: "ot-1", category: "category_other",
  name: { TC: "木浆纸餐巾广告纸巾印制印刷logo酒店西餐纸咖啡店正方形小食纸巾", EN: "Wood Pulp Advertising Napkin Custom Logo" },
  price: 0.6, image: "data/33/商品主图_1.jpg",
  images: ["data/33/商品主图_1.jpg","data/33/商品主图_2.jpg","data/33/商品主图_3.jpg","data/33/商品主图_4.jpg","data/33/商品主图_5.jpg"],
  detailImage: "data/33/描述图(拼接)_1.png", videoUrl: "data/33/PC端_描述视频_1.mp4",
  description: { TC: "可印制logo，适用于酒店西餐及咖啡店。", EN: "Printable logo, suitable for hotels, western restaurants and cafes." },
  stock: 10000, active: true
},
{
  id: "ot-2", category: "category_other",
  name: { TC: "日式温泉旅馆用湿毛巾 商务湿纸巾无尘纸支持来图来样定做", EN: "Japanese Onsen Airlaid Paper Wet Towel" },
  price: 1.1, image: "data/34/商品主图_1.jpg",
  images: ["data/34/商品主图_1.jpg","data/34/商品主图_2.jpg","data/34/商品主图_3.jpg","data/34/商品主图_4.jpg","data/34/商品主图_5.jpg","data/34/商品主图_6.jpg"],
  detailImage: "data/34/描述图(拼接)_1.png", videoUrl: "data/34/PC端_描述视频_1.mp4",
  description: { TC: "柔韌耐用，日式品質。", EN: "Strong and durable, Japanese quality." },
  stock: 10000, active: true
},
{
  id: "ot-3", category: "category_other",
  name: { TC: "4.5cm×20cm刀叉纸加厚口袋折纸上胶复合纸巾酒店宴会布触感餐巾纸", EN: "Thickened Pocket Fold Cutlery Paper 4.5×20cm" },
  price: 1.1, image: "data/35/商品主图_2.jpg",
  images: ["data/35/商品主图_2.jpg","data/35/商品主图_1.jpg","data/35/商品主图_3.jpg","data/35/商品主图_4.jpg","data/35/商品主图_5.jpg","data/35/商品主图_6.jpg"
  ,"data/35/商品主图_7.jpg"
  ,"data/35/商品主图_8.jpg"],
  detailImage: "data/35/描述图(拼接)_1.png", videoUrl: "data/35/PC端_主图视频_1.mp4",
  description: { TC: "加厚口袋折刀叉紙，布觸感，酒店宴會適用，灰色、黑色可選。", EN: "Thickened pocket fold cutlery paper, cloth-feel, hotel banquet use. Available in grey and black." },
  stock: 10000, active: true
},
{
  id: "ot-4", category: "category_other",
  name: { TC: "定制一次性纸围裙客用餐饮商用餐环保无纺布无尘纸围裙支持来图定制", EN: "Custom Disposable Paper Apron for Catering" },
  price: 4.5, image: "data/36/商品主图_1.jpg",
  images: ["data/36/商品主图_1.jpg","data/36/商品主图_2.jpg","data/36/商品主图_3.jpg","data/36/商品主图_4.jpg","data/36/商品主图_5.jpg"],
  detailImage: "data/36/描述图(拼接)_1.png", videoUrl: "data/36/PC端_描述视频_1.mp4",
  description: { TC: "一次性紙圍裙，環保無紡布無塵，支持來圖定制。", EN: "Disposable paper apron, eco non-woven Airlaid Paper, custom by image." },
  stock: 10000, active: true
},
{
  id: "ot-5", category: "category_other",
  name: { TC: "定制一次性纸围裙烧烤火锅餐饮商用环保无尘纸围裙支持来图定制", EN: "Custom Disposable BBQ/Hotpot Paper Apron" },
  price: 4.2, image: "data/37/商品主图_1.jpg",
  images: ["data/37/商品主图_1.jpg","data/37/商品主图_2.jpg","data/37/商品主图_3.jpg","data/37/商品主图_4.jpg","data/37/商品主图_5.jpg"],
  detailImage: "data/37/描述图(拼接)_1.png", videoUrl: "data/37/PC端_描述视频_1.mp4",
  description: { TC: "燒烤火鍋專用一次性紙圍裙，環保無塵，支持來圖定制。", EN: "Disposable BBQ/hotpot paper apron, eco Airlaid Paper, custom by image." },
  stock: 10000, active: true
}
];