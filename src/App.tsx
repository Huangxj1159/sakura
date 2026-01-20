import React, { useState, useEffect } from 'react';
import { Language, Product, CartItem, Order, OrderStatus, User, UserRole } from './types';
import { TRANSLATIONS } from './constants';

// 1. 定义后端 API 地址 (确保你的 Node.js 后端正在运行)
const API_URL = 'https://sakura-backend-gamma.vercel.app/api';

export default function App() {
  const [lang, setLang] = useState<Language>(Language.TC);
  // 用户状态
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sp_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [view, setView] = useState<'home' | 'about' | 'products' | 'detail' | 'cart' | 'checkout' | 'admin' | 'auth' | 'my_orders'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [scrollPos, setScrollPos] = useState(0);
  // 数据状态 (初始为空，等待后端加载)
  const [products, setProducts] = useState<Product[]>([]);
const [cart, setCart] = useState<Record<string, number>>({});
  const [orders, setOrders] = useState<Order[]>([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const openDetail = (productId: string, currentView: string) => {

    setScrollPos(window.scrollY);
    setPrevView(currentView);
    setSelectedProductId(productId);
    setView('detail');
    window.scrollTo(0, 0);
  };
  const t = TRANSLATIONS[lang];
  const [allUsers, setAllUsers] = useState([]);
  // --- 2. 初始化：从后端获取产品数据 ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        setProducts(data);
        console.log("✅ 产品数据加载成功");
      } catch (error) {
        console.error("❌ 无法连接到后端，请确保 server.js 正在运行");
      }
    };
    fetchProducts();
  }, []);
  // --- 3. 监听：当用户登录后，获取对应的订单 ---
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sp_current_user', JSON.stringify(currentUser));
      fetchOrders(); // 拉取订单
    } else {
      localStorage.removeItem('sp_current_user');
      setOrders([]); // 登出清空订单显示
    }
  }, [currentUser]);

  // 辅助函数：获取订单
  const fetchOrders = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch(`${API_URL}/orders`);
      const allOrders = await res.json();

      // 如果是管理员，看所有；如果是普通用户，只看自己的
      if (currentUser.role === UserRole.ADMIN) {
        setOrders(allOrders);
      } else {
        setOrders(allOrders.filter((o: Order) => o.username === currentUser.username));
      }
    } catch (error) {
      console.error("获取订单失败", error);
    }
  };

  // --- 4. 注册功能 (发送给后端) ---
 const handleRegister = async (userData: any) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await res.json();

    if (data.success) {
      alert(lang === Language.TC ? '註冊成功！請登入' : 'Registration successful! Please login.');
      setIsRegistering(false);
    } else {
      // 顯示後端傳回的繁體中文錯誤消息 (如：電子郵件已被佔用)
      alert(data.message || '註冊失敗');
    }
  } catch (error) {
    alert(lang === Language.TC ? '無法連接伺服器，請稍後再試' : 'Server connection failed');
  }
};
const handleOpenDetail = (id: string) => {
  console.log("正在记录位置并进入详情，ID:", id);
  setScrollPos(window.scrollY); // 核心：记录离开列表时的位置
  setSelectedProductId(id);
  setView('detail');
};
  // --- 5. 登录功能 (发送给后端) ---
  const handleLogin = async (username, password) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (data.success) {
        setCurrentUser(data.user);
        setView('home');
      } else {
        alert(data.message || '登录失败');
      }
    } catch (error) {
      alert('无法连接服务器');
    }
  };

  // --- 6. 购物车逻辑 (纯前端，无需改动) ---
const addToCart = (productId: string) => {
  const product = products.find((p: any) => p.id === productId);
  if (!product) return;

  setCart(prev => ({
    ...prev,
    [productId]: (prev[productId] || 0) + 1
  }));

  // 顯示提示（先重置 show，確保每次點擊都有動畫）
  setToast({ show: false, msg: '' });

  setTimeout(() => {
    const msg = lang === Language.TC ? `已加入 ${product.name[lang]}` : `Added ${product.name[lang]}`;
    setToast({ show: true, msg });
  }, 10);

  // 2秒後自動消失
  setTimeout(() => setToast({ show: false, msg: '' }), 1000);
};
const updateCartQuantity = (productId: string, newQty: number) => {
  setCart(prev => {
    const updated = { ...prev };
    if (newQty <= 0) {
      delete updated[productId]; // 数量小于等于0，直接移除商品
    } else {
      updated[productId] = newQty;
    }
    return updated;
  });
};
  // --- 7. 结账下单 (发送给后端) ---
  // 修改 App 组件内的 handleCheckout
  const handleCheckout = async (payment: string, deliveryAddress: string,note: string) => {
    if (!currentUser) return;

    // 校验地址
    if (!deliveryAddress || deliveryAddress.trim() === "") {
        alert(lang === Language.TC ? "請填寫收貨地址" : "Please enter delivery address");
        return;
    }

  const finalPrice = Object.keys(cart).reduce((sum, productId) => {
    const p = products.find(prod => prod.id === productId);
    return sum + (p?.price || 0) * cart[productId];
  }, 0);

    const newOrder: Order = {
      id: `SAK-${Date.now()}`,
      username: currentUser.username,
      customerName: currentUser.name,
      phone: currentUser.phone,
      email: currentUser.email,
      address: deliveryAddress, // ✅ 使用用户下单时填写的地址
      note: note,
      items: Object.keys(cart).map(productId => ({
      productId,
      quantity: cart[productId]
    })),
      totalPrice: finalPrice, // ✅ 使用上面計算的 finalPrice
      status: OrderStatus.PLACED,
      paymentMethod: payment,
      createdAt: new Date().toLocaleString()
    };

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
      const data = await res.json();

      if (data.success) {
        setCart([]);
        setView('my_orders');
        fetchOrders(); // 刷新订单
        // 刷新产品库存
        const prodRes = await fetch(`${API_URL}/products`);
        setProducts(await prodRes.json());
        alert(lang === Language.EN ? 'Order submitted!' : '訂單已提交！');
      } else {
        alert(data.message || '提交失敗');
      }
    } catch (error) {
      alert('提交訂單時發生錯誤');
    }
  };
const totalItems = Object.values(cart).reduce((sum: number, qty: any) => sum + qty, 0);
// 过滤显示的产品：只显示销售中和展示中的
  const visibleProducts = products.filter(p =>
    p.status === 'ON_SALE' || p.status === 'SHOWCASE' ||
    (p.status === undefined && p.active) // 兼容旧数据
  );
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 overflow-x-hidden">
      {/* 顶部导航 */}
      <nav className="sticky top-0 z-50 bg-[#8b0000] text-white shadow-xl px-4 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-12">
            <h1 onClick={() => setView('home')} className="text-xl md:text-2xl font-black cursor-pointer tracking-tighter uppercase">CLOAK</h1>
            <div className="flex gap-8 text-[11px] font-black uppercase tracking-widest">
              <button onClick={() => setView('home')} className={view === 'home' ? 'text-yellow-400' : 'hover:text-yellow-400'}>{String(t.home)}</button>
              <button onClick={() => setView('products')} className={view === 'products' ? 'text-yellow-400' : 'hover:text-yellow-400'}>{String(t.products)}</button>
              {currentUser && <button onClick={() => setView('my_orders')} className={view === 'my_orders' ? 'text-yellow-400' : 'hover:text-yellow-400'}>{String(t.my_orders)}</button>}
              {currentUser?.role === UserRole.ADMIN && (
                <button onClick={() => setView('admin')} className="bg-white text-red-800 px-4 py-1 rounded-full text-[10px] font-black">{String(t.admin)}</button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <select value={lang} onChange={e => setLang(e.target.value as Language)} className="text-[10px] border-none rounded-lg p-1.5 md:p-2 font-black bg-red-900 text-white outline-none">
              <option value={Language.TC}>繁體</option>
              <option value={Language.EN}>EN</option>
            </select>
<button onClick={() => setView('cart')} className="relative p-2 bg-red-800 rounded-full hover:bg-red-700">
  🛒
  {/* 🔥 修改点：使用 totalItems 替代 cart.length */}
  {totalItems > 0 && (
    <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-900 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black animate-pulse">
      {totalItems}
    </span>
  )}
</button>
            {currentUser ? (
              <div className="flex items-center gap-2 md:gap-4">
                <span className="text-[10px] hidden sm:inline font-black uppercase tracking-widest line-clamp-1 max-w-[80px]">{currentUser.name}</span>
                <button onClick={() => { setCurrentUser(null); setView('home'); }} className="text-[10px] text-red-200 hover:text-white font-bold">{String(t.logout)}</button>
              </div>
            ) : (
              <button onClick={() => setView('auth')} className="bg-white text-red-800 px-4 md:px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">{String(t.login)}</button>
            )}
          </div>
        </div>
      </nav>

      {/* 核心视图渲染 */}
      <main className="flex-1 animate-fadeIn overflow-x-hidden">
        {view === 'home' && <HomeView setView={setView} lang={lang} />}
        {view === 'about' && <AboutView lang={lang} />}
        {view === 'products' && <ProductsView products={visibleProducts} setView={setView} setProduct={handleOpenDetail} addToCart={addToCart} lang={lang}  initialScroll={scrollPos} />}
        {view === 'detail' && <ProductDetailView productId={selectedProductId} products={products} addToCart={addToCart} lang={lang} setView={setView} />}
        {view === 'cart' && <CartView cart={cart} updateCartQuantity={updateCartQuantity}  products={products} lang={lang} setView={setView} />}
        {view === 'checkout' && (<CheckoutView cart={cart} products={products} onPay={handleCheckout} lang={lang} />)}
        {view === 'auth' && (<AuthView t={t} isRegistering={isRegistering} setIsRegistering={setIsRegistering} onLogin={handleLogin} onRegister={handleRegister}lang={lang} />)}
        {view === 'admin' && <AdminView products={products} setProducts={setProducts} currentUser={currentUser} orders={orders} setOrders={setOrders}  users={allUsers}  lang={lang} view={view} />}
        {view === 'my_orders' && <MyOrdersView orders={orders} currentUser={currentUser} products={products} lang={lang} />}
      </main>
{toast.show && (
  <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-bounce">
    <div className="bg-red-800 text-white px-8 py-4 rounded-full shadow-2xl font-black flex items-center gap-3">
      <div className="bg-white text-red-800 rounded-full w-6 h-6 flex items-center justify-center">✓</div>
      {toast.msg}
    </div>
  </div>
)}
      <footer className="bg-gray-100 border-t py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-lg font-black text-red-800 mb-6 uppercase">柯洛克牌品牌系列</h4>
            <p className="text-xs text-gray-500 font-bold leading-relaxed">{String(t.company_intro)}</p>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => setView('home')} className="text-xs font-bold text-left hover:text-red-800">{String(t.home)}</button>
              <button onClick={() => setView('products')} className="text-xs font-bold text-left hover:text-red-800">{String(t.products)}</button>
              <p className="text-xs text-gray-500 font-bold leading-relaxed">以上產品不斷更新，本公司保留一切最終解釋權！</p>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Contact</h4>
            <p className="text-sm font-black text-red-800">E-mail: sakura328@yahoo.com.hk</p>
            <p className="text-sm font-black text-red-800 mt-2">WhatsApp: 56112982</p>
            <p className="text-[10px] text-gray-400 font-black mt-8 uppercase">© 2026 Sakura（HongKong )Products limited </p>
            <p className="text-[10px] text-gray-400 font-black mt-8 uppercase">All Right Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- 模块化视图组件 ---

function HomeView({ setView, lang }: any) {
  const t = TRANSLATIONS[lang];
  return (
    <div>
      {/* Banner */}
      <section className="h-[70vh] relative flex items-center justify-center text-center bg-gray-900 overflow-hidden">
        <img src="data/前台.jpg" className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Banner" />
        <div className="relative z-10 max-w-4xl px-4">
          <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">{String(t.home_title)}</h2>
          <p className="text-gray-200 text-lg md:text-2xl mb-10 font-bold">{String(t.home_subtitle)}</p>
          <div className="flex justify-center gap-4">
            <button onClick={() => setView('products')} className="bg-[#8b0000] text-white px-12 py-4 rounded-full font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform">{String(t.buy_now)}</button>
            <button onClick={() => setView('about')} className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-12 py-4 rounded-full font-black uppercase tracking-widest">{String(t.about)}</button>
          </div>
        </div>
      </section>

      {/* 工厂布局调整：右边排一个，下面排三个 */}
      <section className="max-w-7xl mx-auto py-16 md:py-24 px-4">
        <div className="flex justify-between items-end mb-12 border-b-8 border-red-800 pb-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2">{String(t.case_studies)}</h3>
            <p className="text-gray-400 text-sm font-bold">{lang === Language.TC ? '柯洛克（香港）自有全自動化生產線，嚴格把控每一道工序。' : 'CLOAK (HK) owns fully automated production lines.'}</p>
          </div>
          <span className="text-[10px] font-black text-red-800 bg-red-50 px-4 py-2 rounded-full uppercase tracking-widest">{lang === Language.TC ? '實地拍攝' : 'FACTORY LIVE'}</span>
        </div>

        <div className="flex flex-col gap-6">
          {/* 第一排：左边大视频，右边1张图 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3 aspect-video bg-black rounded-2xl md:rounded-[40px] overflow-hidden shadow-2xl">
              <video className="w-full h-full object-cover" src="https://res.cloudinary.com/dwo2uqoqo/video/upload/%E5%8E%82%E6%88%BF%E8%A7%86%E9%A2%9101_xuttmy.mp4" autoPlay muted loop playsInline controls />
            </div>
            <div className="hidden md:block bg-gray-50 rounded-2xl md:rounded-[30px] overflow-hidden group border-2 border-transparent hover:border-red-800 transition-all shadow-sm">
              <img src="data/factory/1.jpg" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="Fac 1" />
            </div>
          </div>
          {/* 第二排：平排三张图 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[2, 3, 4].map(i => (
              <div key={i} className="aspect-video bg-gray-50 rounded-xl md:rounded-[30px] overflow-hidden group border-2 border-transparent hover:border-red-800 transition-all shadow-sm">
                <img src={`data/factory/${i}.jpg`} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt={`Fac ${i}`} />
              </div>
            ))}
            {/* 移动端补全第一张图 */}
            <div className="md:hidden aspect-video bg-gray-50 rounded-xl overflow-hidden group border-2 border-transparent hover:border-red-800 transition-all shadow-sm">
              <img src="data/factory/1.jpg" className="w-full h-full object-cover" alt="Fac 1" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AboutView({ lang }: any) {
  const t = TRANSLATIONS[lang];
  return (
    <div className="max-w-7xl mx-auto py-24 px-4">
      <div className="flex items-center gap-6 mb-16">
        <h2 className="text-5xl font-black text-gray-900 uppercase">{String(t.about)}</h2>
        <div className="h-4 bg-red-800 flex-1 rounded-full opacity-10"></div>
      </div>
      <div className="flex flex-col lg:flex-row gap-20 items-center bg-white p-12 rounded-[50px] shadow-xl border">
        <div className="flex-1">
          <h4 className="text-red-800 font-black text-[10px] uppercase tracking-[0.3em] mb-8">Professional Provider</h4>
          <p className="text-2xl font-black leading-snug italic">"{String(t.company_intro)}"</p>
        </div>
        <div className="flex-1 aspect-video bg-black rounded-[40px] overflow-hidden shadow-2xl">
          <video className="w-full h-full object-cover" src="https://res.cloudinary.com/dwo2uqoqo/video/upload/%E5%8E%82%E6%88%BF%E8%A7%86%E9%A2%9102_ozuppn.mp4" autoPlay muted loop playsInline controls />
        </div>
      </div>
    </div>
  );
}

function ProductsView({ products, setView, setProduct, addToCart, lang , initialScroll }: any) {
  const t = TRANSLATIONS[lang];
  // 获取所有分类
  const rawCategories = Array.from(new Set(products.map((p: any) => p.category)));
  // 确保 cloak 排在前面 (可选)
  const allCategories = ['category_cloak', ...rawCategories.filter(cat => cat !== 'category_cloak')];
  const activeCategories = allCategories.filter(cat => products.some((p: any) => p.category === cat));
useEffect(() => {
  if (initialScroll > 0) {
    const timer = setTimeout(() => {
      window.scrollTo({
        top: initialScroll,
        behavior: 'instant'
      });
    }, 50);
    return () => clearTimeout(timer);
  }
}, [initialScroll]);
  return (
 <div className="max-w-7xl mx-auto py-24 px-4">
      {activeCategories.map((cat: string) => {
        // 第一層：篩選出屬於該「大系列」的所有產品
        const productsInCat = products.filter((p: any) => p.category === cat);

        // 第二層：獲取該大系列下所有存在的「小系列」Key (若無則設為 'sub_none')
        const subCatsInThisCat = Array.from(new Set(productsInCat.map((p: any) => p.subCategory || 'sub_none')));

        return (
          <div key={cat} className="mb-32">
            {/* 柯洛克系列專屬運費提示 */}
            {cat === 'category_cloak' && (
              <div className="mb-10 p-5 bg-red-800 text-white rounded-2xl shadow-xl border-2 border-red-900">
                <p className="font-black text-sm leading-relaxed tracking-wide">
                  {t.shipping_notice}
                </p>
              </div>
            )}

            {/* 大系列標題 (例如：柯洛克品牌系列) */}
            <div className="border-b-8 border-gray-100 pb-6 mb-16 flex items-baseline gap-4">
              <h3 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter italic">
                {String(t[cat] || cat)}
              </h3>
              <span className="text-gray-300 font-bold italic hidden md:inline">COLLECTION</span>
            </div>

            {/* 第三層：遍歷小系列渲染 */}
            {subCatsInThisCat.map((subKey: any) => {
              // 篩選出屬於該「大系列」且同時屬於該「小系列」的產品

              const finalProducts = productsInCat.filter((p: any) => (p.subCategory || 'sub_none') === subKey);
              const firstProduct = finalProducts[0];
              const displaySubName = firstProduct?.subCategoryName?.[lang] || t[subKey] || subKey;
              return (
                <div key={`${cat}-${subKey}`} className="mb-20 last:mb-0">
                  {/* 小系列副標題 (只有 subKey 不是 sub_none 時顯示) */}
                  {true && (
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-1 w-12 bg-red-800 rounded-full"></div>
                      <h4 className="text-2xl font-black text-gray-800 tracking-tight">
                        {displaySubName}
                      </h4>
                      <div className="h-[1px] flex-1 bg-gray-200"></div>
                    </div>
                  )}

                  {/* 產品網格 */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {finalProducts.map((p: any) => {
                      const isShowcase = p.status === 'SHOWCASE' || (!p.status && p.category !== 'category_cloak');

                      return (
                        <div key={p.id} className="group bg-white rounded-3xl p-5 border-2 border-transparent hover:border-red-800 hover:shadow-2xl transition-all flex flex-col">
                          {/* 圖片點擊進入詳情 */}
                          <div className="relative aspect-square mb-6 cursor-pointer rounded-2xl overflow-hidden bg-gray-50" onClick={() => setProduct(p.id)}>
                            <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={String(p.name[lang])} />
                            {isShowcase && <div className="absolute top-2 right-2 bg-gray-500/80 text-white text-[8px] px-3 py-1 rounded-full font-black uppercase">{lang === Language.TC ? '僅供展示' : 'Display Only'}</div>}
                            {p.stock <= 0 && !isShowcase && <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-xs font-black text-red-800 uppercase">{String(t.out_of_stock)}</div>}
                          </div>

                          <h4 className="text-sm font-black text-gray-800 h-10 line-clamp-2 uppercase mb-4 leading-tight">{String(p.name[lang])}</h4>

                          <div className="mt-auto flex items-center justify-between">
                            <span className="text-red-800 font-black text-xl">HKD ${p.price}</span>
                            <button
                              disabled={p.stock <= 0 || isShowcase}
                              onClick={(e) => {
                                e.stopPropagation(); // 阻止冒泡
                                addToCart(p.id);
                              }}
                              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase shadow-md transition-all ${
                                !isShowcase && p.stock > 0
                                  ? 'bg-red-800 text-white hover:bg-red-700 hover:scale-105 active:scale-95'
                                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              {isShowcase ? (lang === Language.TC ? '僅展示' : 'Display') : String(t.add)}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
// --- 增强版认证视图 ---
function AuthView({ t, isRegistering, setIsRegistering, onLogin, onRegister, lang, loading }: any) {
  // 狀態管理
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    email: ''
  });

  // Email 驗證正則
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 提交按鈕邏輯
  const handleAction = async () => {
    const { username, password, email } = formData;

    // 1. 基礎非空校驗 (使用傳進來的 t)
    if (!username || !password) {
      alert(t.auth_error_empty || "請輸入賬號和密碼");
      return;
    }

    // 2. 註冊時的額外校驗
    if (isRegistering) {
      if (!email) {
        alert(t.alertEmpty);
        return;
      }
      if (!validateEmail(email)) {
        alert(t.alertEmail);
        return;
      }
    }

    // 3. 執行登入或註冊
    try {
      if (isRegistering) {
        await onRegister(formData);
      } else {
        await onLogin(username, password);
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 md:py-32 px-4">
      <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-2xl border-2 border-gray-50">
        <h2 className="text-2xl md:text-3xl font-black mb-8 text-center text-gray-900 uppercase tracking-tighter">
          {/* 直接使用傳進來的 t.xxx */}
          {isRegistering ? t.titleRegister : t.titleLogin}
        </h2>

        <div className="space-y-4 md:space-y-6">
          <input
            placeholder={t.username}
            disabled={loading}
            className="w-full border-2 border-gray-100 p-4 rounded-full outline-none focus:border-red-800 font-black text-[10px] bg-gray-50"
            onChange={e => setFormData({...formData, username: e.target.value})}
          />

          {isRegistering && (
            <input
              type="email"
              placeholder={t.email}
              disabled={loading}
              className="w-full border-2 border-gray-100 p-4 rounded-full outline-none focus:border-red-800 font-black text-[10px] bg-gray-50 animate-fadeIn"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          )}

          <input
            type="password"
            placeholder={t.password}
            disabled={loading}
            className="w-full border-2 border-gray-100 p-4 rounded-full outline-none focus:border-red-800 font-black text-[10px] bg-gray-50"
            onChange={e => setFormData({...formData, password: e.target.value})}
          />

          {isRegistering && (
            <div className="space-y-4 animate-fadeIn">
              <input placeholder={t.name} className="w-full border-2 border-gray-100 p-4 rounded-full outline-none focus:border-red-800 font-black text-[10px] uppercase bg-gray-50" onChange={e => setFormData({...formData, name: e.target.value})} />
              <input placeholder={t.phone} className="w-full border-2 border-gray-100 p-4 rounded-full outline-none focus:border-red-800 font-black text-[10px] uppercase bg-gray-50" onChange={e => setFormData({...formData, phone: e.target.value})} />
              <textarea placeholder={t.address} className="w-full border-2 border-gray-100 p-4 rounded-3xl outline-none focus:border-red-800 font-black text-[10px] uppercase bg-gray-50 min-h-[100px]" onChange={e => setFormData({...formData, address: e.target.value})} />
            </div>
          )}

          <button
            disabled={loading}
            onClick={handleAction}
            className="w-full bg-red-800 text-white py-5 rounded-full font-black text-xs md:text-lg uppercase shadow-2xl mt-4 transition-all hover:scale-105"
          >
            {loading ? t.processing : (isRegistering ? t.btnRegister : t.btnLogin)}
          </button>

          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="w-full text-center text-[10px] text-red-800 font-black uppercase underline mt-4"
          >
            {isRegistering ? t.toLogin : t.toRegister}
          </button>
        </div>
      </div>
    </div>
  );
}
function AdminView({ products, setProducts, orders, users = [],setOrders, lang ,view, currentUser}: any) {
  const [tab, setTab] = useState<'inventory' | 'orders' | 'add'| 'users'>('inventory');
    const [editingProd, setEditingProd] = useState<any>(null); // 當前正在編輯的商品
  const t = TRANSLATIONS[lang];
  // 保存商品变更到后端
  const saveProductToBackend = async (product: Product) => {
    try {
      await fetch(`${API_URL}/products/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'x-user-role': currentUser.role},
        body: JSON.stringify(product)
      });
    } catch (error) {
      alert("無法保存到服務器");
    }
  };
const handleFileUpload = async (file: File, type: 'main' | 'details' | 'descImg' | 'video', index?: number) => {
  const formData = new FormData();
  console.log("上傳時的角色狀態:", currentUser?.role);
  formData.append('file', file);
  try {
    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        // 🔥 增加這行
        'x-user-role': currentUser?.role || ''
      },
      body: formData
    });
    const data = await res.json();
 if (data.success) {
        const url = data.url;
        // 根據類型更新 editingProd 狀態
        if (type === 'main') setEditingProd({ ...editingProd, image: url });
        if (type === 'descImg') setEditingProd({ ...editingProd, detailImage: url });
        if (type === 'video') setEditingProd({ ...editingProd, videoUrl: url });
        if (type === 'details' && index !== undefined) {
          const newImages = [...(editingProd.images || [])];
          newImages[index] = url;
          setEditingProd({ ...editingProd, images: newImages });
        }
      }
  } catch (e) { alert("上傳失敗"); }
};
  // 保存到數據庫
  const submitProduct = async () => {
    const res = await fetch(`${API_URL}/products/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        'x-user-role': currentUser.role},
      body: JSON.stringify(editingProd)
    });
    const data = await res.json();
    if (data.success) {
      alert("保存成功！");
      setEditingProd(null); // 關閉編輯
      // 刷新外部產品列表
      const refresh = await fetch(`${API_URL}/products`);
      setProducts(await refresh.json());
    }
  };
const deleteProduct = async (id: string) => {
  if (!window.confirm("確定要徹底刪除此商品嗎？此操作不可恢復。")) return;

  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        // 🔥 增加這行
        'x-user-role': currentUser?.role || ''
      }
    });

    if (res.ok) {
      setProducts(products.filter((p: any) => p.id !== id));
      alert("商品已刪除");
    } else {
      alert("權限不足，無法刪除");
    }
  } catch (e) { alert("刪除出錯"); }
};

  // 更新本地和后端
  const handleUpdate = (updated: Product) => {
    const newList = products.map((p: Product) => p.id === updated.id ? updated : p);
    setProducts(newList);
    saveProductToBackend(updated);
  };

  // 新增商品表单状态
const [newProd, setNewProd] = useState<any>({
  id: '',
  category: 'category_cloak',
  categoryName: { TC: '', EN: '' },
  subCategory: '',
  subCategoryName: { TC: '', EN: '' },
  name: { TC: '', EN: '' },
  description: { TC: '', EN: '' },
  price: 0,
  stock: 100,
  status: 'ON_SALE',
  image: '',
  images: ["", "", "", "", "", ""],
  detailImage: '',
  videoUrl: ''
});

  const handleAddProduct = () => {
    if (!newProd.name?.TC || !newProd.price) {
      alert("請填寫必要信息 (名稱、價格)");
      return;
    }
    const p: Product = {
      ...newProd as Product,
      id: `SAK-${Date.now()}`,
      active: true // 兼容旧字段
    };

    setProducts([...products, p]);
    saveProductToBackend(p);
    alert("商品已上架！");
    setTab('inventory');
    // 重置表单
    setNewProd({ name: { TC: '', EN: '' }, description: { TC: '', EN: '' }, category: 'category_treasures', price: 0, stock: 100, status: 'ON_SALE', image: '', images: [] });
  };

  // 更新订单状态
  const updateOrderInBackend = async (order: Order) => {
    try {
      await fetch(`${API_URL}/orders/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-role': currentUser?.role || ''  },
        body: JSON.stringify(order)
      });
      alert("訂單狀態已更新");
    } catch (e) {
      alert("更新失敗");
    }
  };
const [allUsers, setAllUsers] = useState<any[]>([]);


// 在進入管理員頁面時觸發獲取數據
useEffect(() => {
  const fetchAllUsers = async () => {
    // 🛡️ 只有當前用戶是管理員時才去抓取用戶數據
    if (!currentUser || currentUser.role !== 'ADMIN') return;

    try {
      const res = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
          // 🔥 重點：必須帶上這個頭部，後端 isAdmin 中間件才會放行
        'x-user-role': currentUser?.role || ''
        }
      });

      // 如果返回 403，說明雖然帶了頭，但角色不對
      if (res.status === 403) {
        console.error("權限不足：後端拒絕了獲取用戶列表的請求");
        return;
      }

      const data = await res.json();
      if (data.success) {
        setAllUsers(data.users);
      }
    } catch (error) {
      console.error("抓取用戶失敗:", error);
    }
  };

  if (view === 'admin') {
    fetchAllUsers();
  }
}, [view, currentUser]);

// 專門處理新增頁面的文件上傳
const handleFileUploadForAdd = async (file: File, type: string, index?: number) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const res = await fetch(`${API_URL}/upload`, { method: 'POST',headers: {
  'x-user-role': currentUser?.role || ''
}, body: formData });
    const data = await res.json();
    if (data.success) {
      const url = data.url;
      if (type === 'main') setNewProd({ ...newProd, image: url });
      if (type === 'descImg') setNewProd({ ...newProd, detailImage: url });
      if (type === 'video') setNewProd({ ...newProd, videoUrl: url });
      if (type === 'details' && index !== undefined) {
        const newImgs = [...newProd.images];
        newImgs[index] = url;
        setNewProd({ ...newProd, images: newImgs });
      }
    }
  } catch (e) { alert("上傳失敗"); }
};

// 提交新商品
const submitNewProduct = async () => {
  if (!newProd.name.TC || !newProd.category) {
    alert("❌ 請填寫商品名稱和系列 Key");
    return;
  }
  // 生成最終 ID
  const finalProd = { ...newProd, id: `clk-${Date.now()}` };

  try {
    const res = await fetch(`${API_URL}/products/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','x-user-role': currentUser?.role || ''  },
      body: JSON.stringify(finalProd)
    });
    if (res.ok) {
      alert("🎉 商品上架成功！");
      // 重新加載數據
      const refresh = await fetch(`${API_URL}/products`);
      setProducts(await refresh.json());
      setTab('inventory'); // 跳轉回列表
    }
  } catch (e) { alert("發佈失敗"); }
};
  return (
 <div className="max-w-7xl mx-auto py-12 px-4 bg-gray-50 min-h-screen">
      {/* 1. 顶部标签页切换 */}
      <div className="flex gap-4 mb-8 border-b pb-4 overflow-x-auto">
        {[
          { key: 'inventory', label: t.admin_inventory || '商品庫存管理' },
          { key: 'add', label: t.add_product || '上架新商品' },
          { key: 'orders', label: t.admin_orders || '訂單管理中心' },
          { key: 'users', label: lang === 'TC' ? '用戶信息管理' : 'User Management' }
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key as any)}
            className={`px-6 py-3 rounded-full font-black text-xs md:text-sm uppercase tracking-widest transition-all whitespace-nowrap ${
              tab === item.key ? 'bg-red-800 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
       {/* 用戶管理界面 */}
    {tab === 'users' && (
  <div className="animate-fadeIn space-y-6">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">
        {lang === 'TC' ? '全體用戶資料總覽' : 'User Information Directory'}
      </h3>
      <span className="bg-gray-200 text-gray-600 px-4 py-1 rounded-full text-[10px] font-black uppercase">
        {/* ✅ 使用 allUsers.length */}
        Total: {allUsers.length} Users
      </span>
    </div>

    <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-6 font-black text-[10px] uppercase text-gray-400 tracking-widest">用戶名稱</th>
              <th className="p-6 font-black text-[10px] uppercase text-gray-400 tracking-widest">電子郵件</th>
              <th className="p-6 font-black text-[10px] uppercase text-gray-400 tracking-widest">真實姓名</th>
              <th className="p-6 font-black text-[10px] uppercase text-gray-400 tracking-widest">聯絡電話</th>
              <th className="p-6 font-black text-[10px] uppercase text-gray-400 tracking-widest">收貨地址</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {/* ✅ 修正 1：循環對象改為 allUsers，單個變量名改為 user */}
            {allUsers.map((user: any) => (
              <tr key={user._id || user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-6">
                  <span className="font-black text-red-800 text-sm">{user.username}</span>
                </td>
                <td className="p-6">
                  <span className="text-gray-600 text-sm font-medium">{user.email || 'N/A'}</span>
                </td>
                <td className="p-6 text-sm font-bold text-gray-900">
                  {user.name || '--'}
                </td>
                <td className="p-6 text-sm text-gray-600">
                  {user.phone || '--'}
                </td>
                <td className="p-6 text-[10px] text-gray-400 leading-relaxed max-w-xs truncate hover:whitespace-normal cursor-help">
                  {user.address || '--'}
                </td>
              </tr>
            ))}

            {/* ✅ 修正 2：判斷空數據也用 allUsers */}
            {allUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="p-20 text-center text-gray-300 font-black uppercase italic tracking-widest">
                  No User Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}
      {/* --- 1. 库存管理 (重点看这里的 select) --- */}
{/* --- 商品庫存管理列表 --- */}
      {tab === 'inventory' && (
        <div className="grid gap-6 animate-fadeIn">
          {products.map((p: any) => (
            <div key={p.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 group hover:border-red-800 transition-all">
              {/* 點擊圖片打開全量編輯彈窗 */}
              <div className="relative cursor-pointer" onClick={() => setEditingProd(p)}>
                <img src={p.image} className="w-20 h-20 rounded-xl object-cover bg-gray-100 group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl transition-opacity">
                  <span className="text-[8px] text-white font-black">EDIT</span>
                </div>
              </div>

              <div className="flex-1 space-y-1 text-center md:text-left cursor-pointer" onClick={() => setEditingProd(p)}>
                <h4 className="font-black text-sm text-gray-800">{p.name.TC}</h4>
                <p className="text-xs text-gray-400">{p.name.EN}</p>
                <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 font-bold">{p.id}</span>
              </div>

              <div className="flex flex-wrap gap-4 items-end justify-center">
                <div className="flex flex-col">
                  <label className="text-[10px] font-black text-gray-400 mb-1 uppercase">單價 ($)</label>
                  <input type="number" className="border-2 border-gray-200 rounded-lg px-3 py-2 text-sm w-24 font-bold text-center focus:border-red-800 outline-none"
                    value={p.price} onChange={e => handleUpdate({...p, price: parseFloat(e.target.value)})} />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-black text-gray-400 mb-1 uppercase">庫存</label>
                  <input type="number" className="border-2 border-gray-200 rounded-lg px-3 py-2 text-sm w-24 font-bold text-center focus:border-red-800 outline-none"
                    value={p.stock} onChange={e => handleUpdate({...p, stock: parseInt(e.target.value)})} />
                </div>
                <div className="flex flex-col">
                   <label className="text-[10px] font-black text-gray-400 mb-1 uppercase">狀態</label>
                   <select
                      value={p.status}
                      onChange={(e) => handleUpdate({...p, status: e.target.value})}
                      className={`border-2 rounded-lg px-3 py-2 text-xs font-black outline-none cursor-pointer min-w-[120px] ${
                        p.status === 'ON_SALE' ? 'border-green-200 bg-green-50 text-green-700' :
                        p.status === 'SHOWCASE' ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-gray-200 bg-gray-50 text-gray-500'
                      }`}
                   >
                     <option value="ON_SALE">🟢 銷售中</option>
                     <option value="SHOWCASE">🔵 僅展示</option>
                     <option value="HIDDEN">🔴 已下架</option>
                   </select>
                </div>
                {/* 刪除按鈕 */}
                <button onClick={() => deleteProduct(p.id)} className="p-2 text-gray-300 hover:text-red-800 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
{/* --- 🔥 商品全量編輯彈窗 (Modal) --- */}
      {editingProd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* 背景遮罩 */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditingProd(null)}></div>

          {/* 彈窗主體 */}
          <div className="relative bg-white w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-[50px] shadow-2xl border-4 border-red-800 animate-zoomIn">
            {/* 1. 固定頂部標題欄 */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md p-6 border-b flex justify-between items-center z-10">
               <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">編輯商品詳情 / <span className="text-red-800">Edit Details</span></h3>
               <button onClick={() => setEditingProd(null)} className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full font-bold hover:bg-red-800 hover:text-white transition-all">✕</button>
            </div>

            <div className="p-8 md:p-12 space-y-12">
              {/* --- 第一部分：大系列與小系列自定義 (全寬度) --- */}
              <section className="space-y-6 bg-gray-50 p-6 rounded-[40px] border-2 border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-red-800 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase">Series Settings</span>
                  <h5 className="font-black text-lg uppercase italic">大小系列自定義</h5>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 大系列組 */}
                  <div className="space-y-3 p-4 bg-white rounded-3xl shadow-sm border">
                    <label className="text-[10px] font-black text-red-800 uppercase block">1. 大系列 Key</label>
                    <input className="w-full border-2 p-3 rounded-xl text-sm font-bold focus:border-red-800 outline-none"
                      value={editingProd.category} onChange={e => setEditingProd({...editingProd, category: e.target.value})} />
                    <input className="w-full border-2 p-2 rounded-lg text-xs font-bold mt-2" placeholder="繁體名稱"
                      value={editingProd.categoryName?.TC || ''} onChange={e => setEditingProd({...editingProd, categoryName: {...(editingProd.categoryName || {}), TC: e.target.value}})} />
                    <input className="w-full border-2 p-2 rounded-lg text-xs font-bold mt-1" placeholder="English Name"
                      value={editingProd.categoryName?.EN || ''} onChange={e => setEditingProd({...editingProd, categoryName: {...(editingProd.categoryName || {}), EN: e.target.value}})} />
                  </div>

                  {/* 小系列組 */}
                  <div className="space-y-3 p-4 bg-white rounded-3xl shadow-sm border">
                    <label className="text-[10px] font-black text-red-800 uppercase block">2. 小系列 Key</label>
                    <input className="w-full border-2 p-3 rounded-xl text-sm font-bold focus:border-red-800 outline-none"
                      value={editingProd.subCategory || ''} onChange={e => setEditingProd({...editingProd, subCategory: e.target.value})} />
                    <input className="w-full border-2 p-2 rounded-lg text-xs font-bold mt-2" placeholder="繁體名稱"
                      value={editingProd.subCategoryName?.TC || ''} onChange={e => setEditingProd({...editingProd, subCategoryName: {...(editingProd.subCategoryName || {}), TC: e.target.value}})} />
                    <input className="w-full border-2 p-2 rounded-lg text-xs font-bold mt-1" placeholder="English Name"
                      value={editingProd.subCategoryName?.EN || ''} onChange={e => setEditingProd({...editingProd, subCategoryName: {...(editingProd.subCategoryName || {}), EN: e.target.value}})} />
                  </div>

                  {/* 提示 */}
                  <div className="bg-red-800 text-white p-6 rounded-3xl flex items-center justify-center text-center">
                    <p className="text-[10px] font-black italic uppercase leading-relaxed">名稱將直接顯示在頁面<br/>Key 用於系統內部分組</p>
                  </div>
                </div>
              </section>

              {/* --- 第二部分：核心編輯區 (左右分欄) --- */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* 左側：文字內容 */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h6 className="text-sm font-black text-red-800 border-l-4 border-red-800 pl-2">繁體中文內容</h6>
                    <input className="w-full border-2 p-4 rounded-2xl font-bold bg-gray-50" placeholder="商品名稱"
                      value={editingProd.name.TC} onChange={e => setEditingProd({...editingProd, name: {...editingProd.name, TC: e.target.value}})} />
                    <textarea className="w-full border-2 p-4 rounded-[30px] font-bold bg-gray-50 min-h-[150px]" placeholder="詳情描述"
                      value={editingProd.description.TC} onChange={e => setEditingProd({...editingProd, description: {...editingProd.description, TC: e.target.value}})} />
                  </div>

                  <div className="space-y-4">
                    <h6 className="text-sm font-black text-red-800 border-l-4 border-red-800 pl-2">English Content</h6>
                    <input className="w-full border-2 p-4 rounded-2xl font-bold bg-gray-50" placeholder="Product Name"
                      value={editingProd.name.EN} onChange={e => setEditingProd({...editingProd, name: {...editingProd.name, EN: e.target.value}})} />
                    <textarea className="w-full border-2 p-4 rounded-[30px] font-bold bg-gray-50 min-h-[150px]" placeholder="Description"
                      value={editingProd.description.EN} onChange={e => setEditingProd({...editingProd, description: {...editingProd.description, EN: e.target.value}})} />
                  </div>
                </div>

                {/* 右側：媒體管理 */}
                <div className="space-y-8">
                  <div className="bg-gray-50 p-6 rounded-[40px] border-2 border-dashed border-gray-200">
                    <label className="text-[10px] font-black text-red-800 uppercase block mb-4">主展示圖 (Main Image)</label>
                    <div className="flex items-center gap-6">
                      <img src={editingProd.image} className="w-32 h-32 rounded-[30px] object-cover shadow-xl border-4 border-white" alt="" />
                      <input type="file" onChange={e => e.target.files && handleFileUpload(e.target.files[0], 'main')} className="text-xs font-bold" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase block mb-4 ml-2">詳情輪播圖 (最多6張)</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[0, 1, 2, 3, 4, 5].map(idx => (
                        <div key={idx} className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden border-2 border-white shadow-sm flex items-center justify-center group">
                          {editingProd.images?.[idx] ? (
                            <img src={editingProd.images[idx]} className="w-full h-full object-cover" alt="" />
                          ) : <span className="text-[18px] text-gray-300">+</span>}
                          <input type="file" onChange={e => e.target.files && handleFileUpload(e.target.files[0], 'details', idx)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase">詳情描述長圖</label>
                      <div className="relative h-24 bg-gray-100 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden">
                        {editingProd.detailImage ? <img src={editingProd.detailImage} className="w-full object-cover" alt="" /> : <span className="text-[8px]">上傳</span>}
                        <input type="file" onChange={e => e.target.files && handleFileUpload(e.target.files[0], 'descImg')} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase">展示視頻 (MP4)</label>
                      <div className="relative h-24 bg-black rounded-2xl flex items-center justify-center overflow-hidden border-2 border-white">
                        {editingProd.videoUrl ? <span className="text-[8px] text-green-400 font-black">READY ✅</span> : <span className="text-[8px] text-white">上傳</span>}
                        <input type="file" accept="video/*" onChange={e => e.target.files && handleFileUpload(e.target.files[0], 'video')} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div> {/* 右側媒體管理結束 */}
              </div> {/* 核心左右分欄結束 */}

              {/* 3. 固定底部按鈕欄 */}
              <div className="pt-8 border-t flex flex-col md:flex-row gap-4">
                <button onClick={submitProduct} className="flex-1 bg-red-800 text-white py-6 rounded-full font-black text-xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">確認保存所有更改 / Save Changes</button>
                <button onClick={() => setEditingProd(null)} className="px-12 bg-gray-100 text-gray-600 rounded-full font-black uppercase text-xs hover:bg-gray-200">取消 / Cancel</button>
              </div>
            </div> {/* p-8 容器結束 */}
          </div> {/* 彈窗主體結束 */}
        </div>
      )}
{tab === 'add' && (
  <div className="animate-fadeIn space-y-10 max-w-6xl mx-auto pb-24">
    <div className="flex justify-between items-end border-b-4 border-red-800 pb-4">
      <h3 className="text-3xl font-black text-gray-900 uppercase italic">上架新商品 / Add New Product</h3>
      <p className="text-gray-400 font-bold text-xs">請填寫以下完整信息後提交</p>
    </div>

    {/* --- 1. 分類與核心設置 (大系列/小系列) --- */}
    <section className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 space-y-8">
      <div className="flex items-center gap-3 border-l-4 border-red-800 pl-4">
        <h5 className="font-black text-xl uppercase">1. 系列分類設置 (Series Settings)</h5>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4 p-6 bg-gray-50 rounded-3xl">
          <label className="text-[10px] font-black text-red-800 uppercase">大系列 Key & 名稱</label>
          <input className="w-full border-2 p-3 rounded-xl mb-2 font-bold" placeholder="Key: e.g. category_cloak" value={newProd.category} onChange={e => setNewProd({...newProd, category: e.target.value})} />
          <div className="grid grid-cols-2 gap-2">
            <input className="border p-2 rounded-lg text-xs" placeholder="繁體名稱" value={newProd.categoryName.TC} onChange={e => setNewProd({...newProd, categoryName: {...newProd.categoryName, TC: e.target.value}})} />
            <input className="border p-2 rounded-lg text-xs" placeholder="EN Name" value={newProd.categoryName.EN} onChange={e => setNewProd({...newProd, categoryName: {...newProd.categoryName, EN: e.target.value}})} />
          </div>
        </div>
        <div className="space-y-4 p-6 bg-gray-50 rounded-3xl">
          <label className="text-[10px] font-black text-red-800 uppercase">小系列 Key & 名稱</label>
          <input className="w-full border-2 p-3 rounded-xl mb-2 font-bold" placeholder="Key: e.g. sub_toilet" value={newProd.subCategory} onChange={e => setNewProd({...newProd, subCategory: e.target.value})} />
          <div className="grid grid-cols-2 gap-2">
            <input className="border p-2 rounded-lg text-xs" placeholder="繁體名稱" value={newProd.subCategoryName.TC} onChange={e => setNewProd({...newProd, subCategoryName: {...newProd.subCategoryName, TC: e.target.value}})} />
            <input className="border p-2 rounded-lg text-xs" placeholder="EN Name" value={newProd.subCategoryName.EN} onChange={e => setNewProd({...newProd, subCategoryName: {...newProd.subCategoryName, EN: e.target.value}})} />
          </div>
        </div>
      </div>
    </section>

    {/* --- 2. 商業屬性 (價格/庫存/狀態) --- */}
    <section className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 space-y-8">
      <div className="flex items-center gap-3 border-l-4 border-red-800 pl-4">
        <h5 className="font-black text-xl uppercase">2. 價格與庫存設置 (Commercial)</h5>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">銷售單價 (HKD $)</label>
          <input type="number" className="w-full border-2 p-4 rounded-2xl font-black text-red-800 text-xl" value={newProd.price} onChange={e => setNewProd({...newProd, price: parseFloat(e.target.value)})} />
        </div>
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">初始庫存數量 (PCS)</label>
          <input type="number" className="w-full border-2 p-4 rounded-2xl font-black" value={newProd.stock} onChange={e => setNewProd({...newProd, stock: parseInt(e.target.value)})} />
        </div>
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase ml-2">上架狀態</label>
          <select className="w-full border-2 p-4 rounded-2xl font-black bg-white" value={newProd.status} onChange={e => setNewProd({...newProd, status: e.target.value})}>
                     <option value="ON_SALE">🟢 銷售中</option>
                     <option value="SHOWCASE">🔵 僅展示</option>
                     <option value="HIDDEN">🔴 已下架</option>
          </select>
        </div>
      </div>
    </section>

    {/* --- 3. 雙語內容 (名稱/描述) --- */}
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-[40px] border shadow-sm space-y-4">
        <h6 className="font-black text-red-800 italic underline uppercase">繁體中文內容</h6>
        <input className="w-full border-2 p-4 rounded-2xl font-bold" placeholder="輸入商品中文名稱" value={newProd.name.TC} onChange={e => setNewProd({...newProd, name: {...newProd.name, TC: e.target.value}})} />
        <textarea className="w-full border-2 p-4 rounded-[30px] font-bold min-h-[120px]" placeholder="詳細描述..." value={newProd.description.TC} onChange={e => setNewProd({...newProd, description: {...newProd.description, TC: e.target.value}})} />
      </div>
      <div className="bg-white p-8 rounded-[40px] border shadow-sm space-y-4">
        <h6 className="font-black text-red-800 italic underline uppercase">English Content</h6>
        <input className="w-full border-2 p-4 rounded-2xl font-bold" placeholder="Product Name in English" value={newProd.name.EN} onChange={e => setNewProd({...newProd, name: {...newProd.name, EN: e.target.value}})} />
        <textarea className="w-full border-2 p-4 rounded-[30px] font-bold min-h-[120px]" placeholder="English Description..." value={newProd.description.EN} onChange={e => setNewProd({...newProd, description: {...newProd.description, EN: e.target.value}})} />
      </div>
    </section>

    {/* --- 4. 媒體上傳 (主圖/詳情圖/視頻) --- */}
    <section className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 space-y-8">
      <div className="flex items-center gap-3 border-l-4 border-red-800 pl-4">
        <h5 className="font-black text-xl uppercase">3. 媒體文件上傳 (Media Upload)</h5>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 主圖 */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase">1. 商品主圖 (800x800)</label>
          <div className="relative aspect-square rounded-[40px] overflow-hidden border-4 border-dashed border-gray-200 flex items-center justify-center bg-gray-50 group">
            {newProd.image ? <img src={newProd.image} className="w-full h-full object-cover" /> : <span className="text-xs font-black text-gray-300">點擊上傳主圖</span>}
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => e.target.files && handleFileUploadForAdd(e.target.files[0], 'main')} />
          </div>
        </div>

        {/* 詳情6圖 */}
        <div className="lg:col-span-2 space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase">2. 詳情輪播圖 (最多6張)</label>
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2, 3, 4, 5].map(idx => (
              <div key={idx} className="relative aspect-square rounded-3xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center bg-gray-50">
                {newProd.images[idx] ? <img src={newProd.images[idx]} className="w-full h-full object-cover" /> : <span className="text-[10px] text-gray-300">圖 {idx+1}</span>}
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => e.target.files && handleFileUploadForAdd(e.target.files[0], 'details', idx)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-32 rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50">
           {newProd.detailImage ? <img src={newProd.detailImage} className="w-full object-cover" /> : <span className="font-black text-xs text-gray-300">上傳詳情長圖</span>}
           <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => e.target.files && handleFileUploadForAdd(e.target.files[0], 'descImg')} />
        </div>
        <div className="relative h-32 rounded-3xl bg-black border-4 border-gray-800 flex items-center justify-center overflow-hidden">
           {newProd.videoUrl ? <span className="text-green-400 font-black text-xs">VIDEO READY ✅</span> : <span className="text-white font-black text-xs uppercase">上傳展示視頻 (MP4)</span>}
           <input type="file" accept="video/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => e.target.files && handleFileUploadForAdd(e.target.files[0], 'video')} />
        </div>
      </div>
    </section>

    {/* 提交按鈕 */}
    <div className="flex gap-4">
      <button
        onClick={submitNewProduct}
        className="flex-1 bg-red-800 text-white py-8 rounded-full font-black text-2xl shadow-2xl hover:bg-red-700 hover:scale-[1.01] active:scale-95 transition-all uppercase tracking-tighter"
      >
        確認發佈商品 / Publish Now
      </button>
      <button onClick={() => setTab('inventory')} className="px-12 bg-white text-gray-400 rounded-full font-black border-2 border-gray-100 hover:bg-gray-50 uppercase text-sm">取消</button>
    </div>
  </div>
)}

      {/* --- 3. 订单管理 --- */}
      {tab === 'orders' && (
        <div className="space-y-8">
          {orders.map((o: Order) => (

            <div key={o.id} className="bg-white p-8 rounded-[30px] shadow-lg border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gray-50 text-[100px] leading-none opacity-5 font-black select-none pointer-events-none">#</div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start border-b border-gray-100 pb-6 mb-6 gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-lg text-xs font-black">{o.id}</span>
                      <span className="text-xs text-gray-400 font-bold">{o.createdAt}</span>
                    </div>
                    <h4 className="text-xl font-black text-gray-800 mb-1">{o.customerName}</h4>
                    <p className="text-xs font-bold text-red-800 mb-1">📧 {o.email || '未提供郵箱'}</p>
                    <p className="text-sm font-bold text-gray-500 flex items-center gap-2">📞 {o.phone}</p>
                  </div>

                  <div className="w-full md:w-auto bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <p className="text-[10px] text-gray-400 font-black uppercase mb-1">收貨地址 (Delivery Address)</p>
                    <p className="text-sm font-bold text-gray-800 leading-relaxed whitespace-pre-wrap">{o.address}</p>
                  </div>
                   {o.note && (
                          <div className="w-full md:w-80 bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                            <p className="text-[10px] text-yellow-600 font-black uppercase mb-1">訂單備註</p>
                            <p className="text-sm font-bold text-yellow-800">{o.note}</p>
                          </div>
                        )}
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                   <p className="text-[10px] text-gray-400 font-black uppercase mb-3">訂單內容 (Items)</p>
                   <div className="space-y-3">
                     {o.items.map((item: any, idx: number) => {
                       const prod = products.find((p: Product) => p.id === item.productId);
                       return (
                         <div key={idx} className="flex justify-between items-center text-sm font-bold border-b border-gray-200 last:border-0 pb-2 last:pb-0">
                           <div className="flex items-center gap-3">
                              <span className="text-gray-400 text-xs">x{item.quantity}</span>
                              <span className="text-gray-800">{prod ? prod.name.TC : '未知商品'}</span>
                           </div>
                           <span className="text-gray-600">${prod ? prod.price * item.quantity : 0}</span>
                         </div>
                       )
                     })}
                   </div>
                   <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                      <span className="font-black text-xs text-red-800 uppercase">Total Amount</span>
                      <span className="font-black text-lg text-red-800">${o.totalPrice}</span>
                   </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-end justify-between bg-red-50/50 p-4 rounded-xl border border-red-50">
                   <div className="flex-1 w-full md:w-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">訂單狀態</label>
                        <select
                          className="w-full text-xs font-bold border-2 border-white bg-white p-3 rounded-lg shadow-sm outline-none"
                          defaultValue={o.status}
                          id={`status-${o.id}`}
                        >
                          <option value="PLACED">🕒 已下單 (Pending)</option>
                          <option value="PICKING">📦 揀貨中 (Picking)</option>
                          <option value="SHIPPED">🚚 已發貨 (Shipped)</option>
                          <option value="RECEIVED">✅ 已完成 (Completed)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">快遞單號</label>
                        <input
                          defaultValue={o.trackingNumber || ''}
                          id={`track-${o.id}`}
                          placeholder="輸入單號..."
                          className="w-full text-xs font-bold border-2 border-white bg-white p-3 rounded-lg shadow-sm outline-none"
                        />
                      </div>
                   </div>
                   <button
                    onClick={() => {
                        const statusSelect = document.getElementById(`status-${o.id}`) as HTMLSelectElement;
                        const trackInput = document.getElementById(`track-${o.id}`) as HTMLInputElement;
                        const updatedOrder = {
                            ...o,
                            status: statusSelect.value,
                            trackingNumber: trackInput.value
                        };
                        updateOrderInBackend(updatedOrder as any);
                    }}
                    className="w-full md:w-auto bg-red-800 text-white px-8 py-3 rounded-lg font-black uppercase text-xs shadow-lg hover:bg-red-700 active:scale-95 transition-all"
                   >
                     確認更新狀態
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function CheckoutView({ cart, products, onPay, lang }: any) {
  const t = TRANSLATIONS[lang];

  // 1. 获取用户默认地址

  const [address, setAddress] = useState(() => {
     const user = JSON.parse(localStorage.getItem('sp_current_user') || '{}');
     return user.address || '';
  });

  const [note, setNote] = useState('');
  // 2. 计算总金额
  const totalAmount = Object.keys(cart).reduce((acc: number, productId: string) => {
    const p = products.find((prod: any) => prod.id === productId);
    const quantity = cart[productId] || 0;
    return acc + (p?.price || 0) * quantity;
  }, 0);

  // 3. 你的支付方式列表
  const PAYMENT_METHODS = [
    { id: "Alipay", name: "支付寶 (Alipay)", color: "bg-[#1677FF]", icon: "🔵" },
    { id: "WeChat Pay", name: "微信支付 (WeChat Pay)", color: "bg-[#07C160]", icon: "🟢" },
    { id: "PayPal", name: "PayPal", color: "bg-[#003087]", icon: "🅿️" },
    { id: "Visa", name: "Visa", color: "bg-[#1A1F71]", icon: "💳" },
    { id: "Octopus", name: "八達通 (Octopus)", color: "bg-[#F4821C]", icon: "🐙" }
  ];

  // 4. 处理支付点击
  const handlePaymentClick = (methodId: string) => {
    if (!address || address.trim() === "") {
      alert(lang === Language.TC ? "請先填寫收貨地址！" : "Please enter delivery address first!");
      return;
    }
    // 提交订单：带上 支付方式ID 和 地址
    onPay(methodId, address, note);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-gray-100">
        <div className="mb-8 p-4 bg-red-700 text-white rounded-2xl font-black text-xs leading-relaxed shadow-md">
          {t.shipping_notice}
        </div>
        <h2 className="text-3xl font-black text-red-800 mb-8 uppercase text-center tracking-tighter">
          {String(t.checkout)}
        </h2>

        {/* 订单总额 */}
        <div className="text-center mb-10 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <p className="text-xs text-gray-400 font-black uppercase mb-2">Total Amount</p>
          <p className="text-4xl font-black text-gray-900">${totalAmount.toFixed(2)}</p>
        </div>

        {/* 第一步：地址 */}

        <div className="mb-10">
          <label className="block text-xs font-black text-red-800 uppercase mb-3 ml-2">
            1. {lang === Language.TC ? "確認收貨地址" : "Confirm Delivery Address"}
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border-2 border-gray-200 bg-white p-4 rounded-2xl text-sm font-bold focus:border-red-800 outline-none transition-colors min-h-[100px]"
            placeholder={lang === Language.TC ? "請輸入詳細地址、聯繫人及電話..." : "Enter address, contact and phone..."}
          />
        </div>
        <div className="mb-10">
                  <label className="block text-xs font-black text-red-800 uppercase mb-3 ml-2">2. 訂單備註 (選填)</label>
                  <input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full border-2 border-gray-200 bg-white p-4 rounded-full text-sm font-bold focus:border-red-800 outline-none"
                    placeholder="例如：請電聯、需要收據等..."
                  />
                </div>

        {/* 第二步：支付方式列表 */}

        <div>
          <label className="block text-xs font-black text-red-800 uppercase mb-3 ml-2">
            2. {lang === Language.TC ? "選擇支付方式並下單" : "Select Payment to Submit"}
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                onClick={() => handlePaymentClick(method.id)}
                className="group relative overflow-hidden bg-white border-2 border-gray-100 p-4 rounded-2xl hover:border-red-800 hover:shadow-lg transition-all text-left flex items-center gap-4"
              >
                {/* 左侧图标/颜色块 */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl text-white shadow-sm ${method.color}`}>
                  {method.icon}
                </div>
                {/* 文字 */}
                <div>
                   <p className="font-black text-sm text-gray-800 group-hover:text-red-800 transition-colors">
                     {method.name}
                   </p>
                </div>
                {/* 箭头指示 */}
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-red-800 font-black">
                  →
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function CartView({ cart, products, lang, setView, updateCartQuantity }: any) {
  const t = TRANSLATIONS[lang];

  const cartItems = products.filter((p: any) => cart[p.id] > 0);

  // 計算總價
  const totalPrice = cartItems.reduce((sum: number, p: any) => {
    const quantity = cart[p.id] || 0;
    return sum + (p.price * quantity);
  }, 0);
 return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-4xl font-black text-gray-900 mb-12 flex items-center gap-4">
        <span className="w-2 h-10 bg-red-800 block"></span>
        {t.cart}
      </h2>
      <div className="mb-8 p-4 bg-yellow-50 text-red-800 rounded-2xl border-2 border-red-100 font-bold text-xs leading-relaxed">
        {t.shipping_notice}
      </div>
      <div className="space-y-6">
        {cartItems.map((p: any) => (
          <div key={p.id} className="bg-white rounded-[40px] p-8 shadow-xl border-2 border-gray-50 flex flex-col md:flex-row items-center gap-8">
            <img src={p.image} className="w-32 h-32 rounded-3xl object-cover shadow-md" alt="" />

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-black text-gray-800 mb-2">{p.name[lang]}</h3>
              <p className="text-gray-400 font-bold">HKD ${p.price} / {lang === 'TC' ? 'PCS' : 'Unit'}</p>
            </div>

            {/* 🔥 數量控制區域 */}
            <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-full border-2 border-gray-100">
              <button
                onClick={() => updateCartQuantity(p.id, cart[p.id] - 1)}
                className="w-10 h-10 rounded-full bg-white shadow-sm hover:bg-red-800 hover:text-white transition-all font-black text-xl"
              >-</button>

              <input
                type="number"
                value={cart[p.id]}
                onChange={(e) => updateCartQuantity(p.id, parseInt(e.target.value) || 0)}
                className="w-16 bg-transparent text-center font-black text-red-800 outline-none"
              />

              <button
                onClick={() => updateCartQuantity(p.id, cart[p.id] + 1)}
                className="w-10 h-10 rounded-full bg-white shadow-sm hover:bg-red-800 hover:text-white transition-all font-black text-xl"
              >+</button>
            </div>

            <div className="text-2xl font-black text-gray-900 min-w-[120px] text-right">
              HKD ${(p.price * cart[p.id]).toFixed(2)}
            </div>
          </div>
        ))}

        {cartItems.length === 0 && (
          <div className="text-center py-24 bg-gray-50 rounded-[50px] border-4 border-dashed border-gray-200">
            <p className="text-gray-400 font-black text-xl uppercase italic">Your cart is empty</p>
            <button onClick={() => setView('products')} className="mt-6 text-red-800 underline font-black">GO SHOPPING</button>
          </div>
        )}
      </div>

      {/* 總結區域 */}
      {cartItems.length > 0 && (
        <div className="mt-12 bg-gray-900 rounded-[50px] p-10 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
          <div>
            <p className="text-gray-400 font-bold uppercase text-xs mb-2 tracking-widest">{t.total}</p>
            <h3 className="text-5xl font-black text-yellow-400 tracking-tighter">HKD ${totalPrice.toFixed(2)}</h3>
          </div>
          <button
            onClick={() => setView('checkout')}
            className="bg-red-800 hover:bg-red-700 text-white px-12 py-6 rounded-full font-black text-xl uppercase tracking-widest transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            {t.confirm_pay}
          </button>
        </div>
      )}
    </div>
  );
}
function MyOrdersView({ orders, currentUser, products, lang }: any) {
  const t = TRANSLATIONS[lang];
  const myOrders = orders.filter((o: Order) => o.username === currentUser?.username);

  return (
    <div className="max-w-4xl mx-auto py-12 md:py-24 px-4">
      <h2 className="text-2xl md:text-4xl font-black mb-10 text-gray-900 uppercase tracking-tighter border-l-8 border-red-800 pl-6">{t.my_orders}</h2>
       <div className="mb-10 p-4 bg-gray-100 text-gray-600 rounded-2xl border-l-4 border-red-800 text-[10px] font-bold">
    {t.shipping_notice}
  </div>
      <div className="space-y-8">
        {myOrders.map((o: Order) => (
          <div key={o.id} className="bg-white p-6 md:p-10 rounded-[40px] shadow-xl border-2 border-gray-50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b-2 border-dashed pb-6">
              <span className="font-mono text-red-800 font-black text-sm md:text-lg">{o.id}</span>
              <div className="flex gap-2">
                <span className="text-[10px] font-black text-gray-400 bg-gray-100 px-3 py-1 rounded-full uppercase">{o.paymentMethod}</span>
                <span className="bg-red-50 text-red-800 px-4 py-1 rounded-full text-[10px] font-black uppercase border border-red-100">{t[o.status.toLowerCase()] || o.status}</span>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              {o.items.map((item: any, idx: number) => {
                const p = products.find((prod: any) => prod.id === item.productId);
                return (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-600 uppercase">{p?.name[lang]} x {item.quantity}</span>
                    <span className="font-black">HKD ${((p?.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-end pt-4 border-t">
               <div>
                  <p className="text-2xl font-black text-red-800 tracking-tighter">HKD $ {o.totalPrice.toFixed(2)}</p>
                  {o.trackingNumber && <p className="mt-2 text-[10px] font-black text-red-800 bg-red-50 p-2 rounded inline-block">{t.tracking_no}: {o.trackingNumber}</p>}
               </div>
               <p className="text-[8px] font-black text-gray-400 uppercase">{o.createdAt}</p>
            </div>

                {o.note && (
      <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <p className="text-[10px] font-black text-gray-400 uppercase mb-1">您的備註 (Your Note):</p>
        <p className="text-sm text-gray-600 italic">"{o.note}"</p>
      </div>
    )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetailView({ productId, products, addToCart, lang ,setView}: any) {
  const p = products.find((x: Product) => x.id === productId);
  const t = TRANSLATIONS[lang];
  const [activeImg, setActiveImg] = useState('');

  useEffect(() => { if (p) setActiveImg(p.image); }, [p]);

  if (!p) return null;

  // 🔥 修改点：判断是否仅展示 🔥
  const isShowcase = p.status === 'SHOWCASE' || (!p.status && p.category !== 'category_cloak');

  return (
    <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 pt-8">
        <button
          onClick={() => setView('products')} // 切换回列表视图
          className="flex items-center gap-2 text-gray-500 hover:text-red-800 transition-colors font-black uppercase text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          {lang === Language.TC ? '返回' : 'Back'}
        </button>
      </div>
      <div className="max-w-7xl mx-auto py-12 md:py-24 px-4 flex flex-col lg:flex-row gap-12 md:gap-24">
        {/* 左側：主圖與細節圖 */}
        <div className="flex-1 w-full space-y-6">
          <div className="aspect-square rounded-[40px] overflow-hidden border-8 border-gray-50 shadow-2xl bg-gray-50">
            <img src={activeImg} className="w-full h-full object-cover" alt="" />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[p.image, ...(p.images || [])].map((img: string, idx: number) => (
              <button key={idx} onClick={() => setActiveImg(img)} className={`aspect-square rounded-xl overflow-hidden border-4 ${activeImg === img ? 'border-red-800' : 'border-transparent'}`}>
                <img src={img} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* 右側：信息 */}
        <div className="flex-1">
          <span className="bg-red-800 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{t[p.category] || p.category}</span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 my-8 uppercase leading-tight">{p.name[lang]}</h2>
          <p className="text-5xl text-red-800 font-black mb-10 tracking-tighter">HKD $ {p.price.toFixed(2)}</p>

          <div className="bg-gray-50 p-8 rounded-[30px] border-4 border-dashed border-gray-100 mb-10 text-gray-600 font-bold leading-relaxed italic">
            {p.description[lang]}
          </div>

          <button
            disabled={p.stock <= 0 || isShowcase}
            onClick={() => {
              console.log("🛒 [前端]：嘗試加入購物車...", p.id);
              addToCart(p.id);
            }}
            className={`w-full py-6 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl transition-all ${
              !isShowcase && p.stock > 0
                ? 'bg-red-800 text-white hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {/* 按钮文字逻辑 */}
            {p.stock <= 0
              ? t.out_of_stock
              : isShowcase
                ? (lang === Language.TC ? '僅供展示 (不可購買)' : 'Display Only')
                : t.add_to_cart
            }
          </button>

          {isShowcase && <p className="mt-4 text-center text-[10px] font-bold text-gray-400 uppercase">{t.not_for_sale_hint}</p>}
        </div>
      </div>

      {/* 詳情細節 */}
      <div className="max-w-5xl mx-auto py-12 md:py-24 px-4 space-y-20">
        {p.videoUrl && (
          <div className="aspect-video rounded-[40px] overflow-hidden shadow-2xl bg-black border-8 border-white">
             <video controls className="w-full h-full object-cover"><source src={p.videoUrl} type="video/mp4" /></video>
          </div>
        )}
        {p.detailImage && <img src={p.detailImage} className="w-full rounded-[40px] shadow-2xl border-4 border-white" alt="Specs" />}
      </div>
    </div>
  );
}