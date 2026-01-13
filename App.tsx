
import React, { useState, useEffect } from 'react';
import { Language, Product, CartItem, Order, OrderStatus, User, UserRole } from './types';
import { TRANSLATIONS, INITIAL_PRODUCTS } from './constants';

const DB = {
  getUsers: (): User[] => JSON.parse(localStorage.getItem('sp_users') || '[]'),
  saveUser: (user: User) => {
    const users = DB.getUsers();
    users.push(user);
    localStorage.setItem('sp_users', JSON.stringify(users));
  },
  getOrders: (): Order[] => JSON.parse(localStorage.getItem('sp_orders') || '[]'),
  saveOrder: (order: Order) => {
    const orders = DB.getOrders();
    orders.unshift(order);
    localStorage.setItem('sp_orders', JSON.stringify(orders));
  },
  updateOrder: (updatedOrder: Order) => {
    const orders = DB.getOrders().map(o => o.id === updatedOrder.id ? updatedOrder : o);
    localStorage.setItem('sp_orders', JSON.stringify(orders));
  },
  getProducts: (): Product[] => {
    const saved = localStorage.getItem('sp_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  },
  saveProducts: (prods: Product[]) => localStorage.setItem('sp_products', JSON.stringify(prods))
};

if (DB.getUsers().length === 0) {
  DB.saveUser({ username: 'ADMIN', password: '123', role: UserRole.ADMIN, name: 'Admin', phone: '000', address: 'Sakura Office' });
}

export default function App() {
  const [lang, setLang] = useState<Language>(Language.TC);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sp_current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [view, setView] = useState<'home' | 'about' | 'products' | 'detail' | 'cart' | 'checkout' | 'admin' | 'auth' | 'my_orders'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>(DB.getProducts());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(DB.getOrders());
  const [isRegistering, setIsRegistering] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sp_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sp_current_user');
    }
  }, [currentUser]);

  const handleCheckout = (payment: string) => {
    if (!currentUser) return;
    const total = cart.reduce((acc, item) => {
      const p = products.find(prod => prod.id === item.productId);
      return acc + (p?.price || 0) * item.quantity;
    }, 0);

    const updatedProducts = products.map(p => {
      const cartItem = cart.find(ci => ci.productId === p.id);
      if (cartItem) return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
      return p;
    });
    setProducts(updatedProducts);
    DB.saveProducts(updatedProducts);

    const newOrder: Order = {
      id: `SAK-${Date.now()}`,
      username: currentUser.username,
      customerName: currentUser.name,
      phone: currentUser.phone,
      address: currentUser.address,
      items: [...cart],
      totalPrice: total,
      status: OrderStatus.PLACED,
      paymentMethod: payment,
      createdAt: new Date().toLocaleString()
    };

    DB.saveOrder(newOrder);
    setOrders(DB.getOrders());
    setCart([]);
    setView('my_orders');
    alert(lang === Language.EN ? 'Order submitted!' : '訂單已提交！');
  };

  const addToCart = (productId: string) => {
    if (!currentUser) { setView('auth'); return; }
    const p = products.find(x => x.id === productId);
    if (p && p.stock <= 0) { alert(t.out_of_stock); return; }
    setCart(prev => {
      const existing = prev.find(i => i.productId === productId);
      if (existing) return prev.map(i => i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const visibleProducts = products.filter(p => p.active);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 overflow-x-hidden">
      <nav className="sticky top-0 z-50 bg-[#8b0000] text-white shadow-xl px-4 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-12">
            <h1 onClick={() => setView('home')} className="text-xl md:text-2xl font-black cursor-pointer tracking-tighter uppercase">SAKURA</h1>
            <div className="hidden lg:flex gap-8 text-[11px] font-black uppercase tracking-widest">
              <button onClick={() => setView('home')} className={view === 'home' ? 'text-yellow-400' : 'hover:text-yellow-400'}>{String(t.home)}</button>
              <button onClick={() => setView('about')} className={view === 'about' ? 'text-yellow-400' : 'hover:text-yellow-400'}>{String(t.about)}</button>
              <button onClick={() => setView('products')} className={view === 'products' ? 'text-yellow-400' : 'hover:text-yellow-400'}>{String(t.products)}</button>
              {currentUser && <button onClick={() => setView('my_orders')} className={view === 'my_orders' ? 'text-yellow-400' : 'hover:text-yellow-400'}>{String(t.my_orders)}</button>}
              {currentUser?.role === UserRole.ADMIN && (
                <button onClick={() => setView('admin')} className={`bg-white text-red-800 px-4 py-1 rounded-full text-[10px]`}>{String(t.admin)}</button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <select value={lang} onChange={e => setLang(e.target.value as Language)} className="text-[10px] border-none rounded-lg p-1.5 md:p-2 font-black bg-red-900 text-white outline-none">
              <option value={Language.TC}>繁體</option>
              <option value={Language.EN}>EN</option>
            </select>
            <button onClick={() => setView('cart')} className="relative p-2 bg-red-800 rounded-full hover:bg-red-700">
              🛒 {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-900 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black">{cart.length}</span>}
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

      <main className="flex-1 animate-fadeIn overflow-x-hidden">
        {view === 'home' && <HomeView setView={setView} lang={lang} />}
        {view === 'about' && <AboutView lang={lang} />}
        {view === 'products' && <ProductsView products={visibleProducts} setView={setView} setProduct={setSelectedProductId} addToCart={addToCart} lang={lang} />}
        {view === 'detail' && <ProductDetailView productId={selectedProductId} products={products} addToCart={addToCart} lang={lang} />}
        {view === 'cart' && <CartView cart={cart} products={products} lang={lang} setView={setView} />}
        {view === 'checkout' && <CheckoutView onPay={handleCheckout} lang={lang} />}
        {view === 'auth' && <AuthView t={t} isRegistering={isRegistering} setIsRegistering={setIsRegistering} setCurrentUser={setCurrentUser} setView={setView} />}
        {view === 'admin' && <AdminView products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} lang={lang} />}
        {view === 'my_orders' && <MyOrdersView orders={orders} currentUser={currentUser} products={products} lang={lang} />}
      </main>

      <footer className="bg-gray-100 border-t py-12 md:py-16 px-4 text-center md:text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          <div>
            <h4 className="text-lg font-black text-red-800 mb-6 tracking-tighter uppercase">櫻花（香港）製造有限公司</h4>
            <p className="text-xs text-gray-500 font-bold leading-relaxed mb-4">{String(t.company_intro)}</p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">QUICK LINKS</h4>
            <button onClick={() => setView('home')} className="text-xs font-bold hover:text-red-600 text-left w-fit mx-auto md:mx-0">{String(t.home)}</button>
            <button onClick={() => setView('products')} className="text-xs font-bold hover:text-red-600 text-left w-fit mx-auto md:mx-0">{String(t.products)}</button>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">CONTACT</h4>
            <p className="text-sm font-black text-red-800">sakura328@yahoo.com.hk</p>
            <p className="text-xs text-gray-400 font-black mt-10 uppercase">© 2024 SAKURA Products Ltd.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}

function HomeView({ setView, lang }: any) {
  const t = TRANSLATIONS[lang];
  return (
    <div className="overflow-x-hidden">
      <section className="min-h-[60vh] md:h-[75vh] relative flex items-center justify-center text-center px-4 py-16 overflow-hidden bg-gray-900">
        <img src="data\前台.jpg" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        <div className="relative max-w-4xl px-4">
          <h2 className="text-3xl sm:text-5xl md:text-8xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-tight">{String(t.home_title)}</h2>
          <p className="text-gray-200 text-sm md:text-2xl mb-8 md:mb-12 font-bold max-w-2xl mx-auto leading-relaxed drop-shadow-lg">{String(t.home_subtitle)}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => setView('products')} className="bg-[#8b0000] text-white px-10 md:px-16 py-4 md:py-5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-2xl">{String(t.buy_now)}</button>
            <button onClick={() => setView('about')} className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-10 md:px-16 py-4 md:py-5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">{String(t.about)}</button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-16 md:py-32 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-20 gap-6 border-b-4 md:border-b-8 border-red-800 pb-8 text-center md:text-left">
          <div className="flex-1">
            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4">{String(t.case_studies)}</h3>
            <p className="text-gray-400 text-xs md:text-sm font-bold">{lang === Language.TC ? '櫻花（香港）自有全自動化生產線，嚴格把控每一道工序。' : 'Sakura (HK) fully automated production lines with strict quality control.'}</p>
          </div>
          <div className="hidden md:block">
             <span className="text-[10px] font-black text-red-800 bg-red-50 px-4 py-2 rounded-full uppercase tracking-widest">{lang === Language.TC ? '實地拍攝' : 'FACTORY LIVE'}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 aspect-video bg-black rounded-2xl md:rounded-[40px] overflow-hidden shadow-2xl relative group border-4 border-gray-100">
             <video controls className="w-full h-full object-cover">
               <source src="data/factory/厂房视频02.mp4" type="video/mp4" />
             </video>
             <div className="absolute top-4 md:top-6 left-4 md:left-6 pointer-events-none">
                <span className="bg-red-800 text-white text-[8px] md:text-[9px] font-black px-3 md:px-4 py-1.5 md:py-2 rounded-full uppercase tracking-widest shadow-lg">{String(t.factory_video)}</span>
             </div>
          </div>
          
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="group relative aspect-square bg-gray-50 rounded-2xl md:rounded-[40px] overflow-hidden border-2 border-transparent hover:border-red-800 transition-all shadow-sm">
              <img 
                src={`/data/factory/${i}.jpg`} 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                alt="Factory"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 md:p-8">
                 <p className="text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest">{lang === Language.TC ? '生產細節' : 'PRODUCTION'} 0{i}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutView({ lang }: any) {
  const t = TRANSLATIONS[lang];
  return (
    <div className="max-w-7xl mx-auto py-12 md:py-24 px-4">
      <div className="flex items-center gap-4 mb-10 md:mb-16">
        <h2 className="text-3xl md:text-6xl font-black text-gray-900 leading-none uppercase">{lang === Language.TC ? '關於櫻花' : 'About Sakura'}</h2>
        <div className="h-2 md:h-4 bg-red-800 flex-1 rounded-full opacity-10"></div>
      </div>
      
      <div className="bg-white border rounded-3xl md:rounded-[50px] overflow-hidden p-6 md:p-16 shadow-2xl space-y-20 md:space-y-32">
        {/* 公司介紹與視頻 */}
        <div className="flex flex-col lg:flex-row gap-10 md:gap-20 items-center">
          <div className="flex-1 text-center lg:text-left">
            <h4 className="text-red-800 font-black text-[10px] uppercase tracking-[0.3em] mb-6 md:mb-8">{lang === Language.TC ? '專業供應商' : 'Professional Provider'}</h4>
            <p className="text-lg md:text-3xl text-gray-800 leading-snug font-black mb-8 md:mb-12 italic">"{String(t.company_intro)}"</p>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-video bg-black rounded-2xl md:rounded-[40px] overflow-hidden shadow-3xl border-4 md:border-[12px] border-gray-50 relative z-10">
              <video controls className="w-full h-full object-cover">
                <source src="data/factory/厂房视频01.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-800 rounded-full opacity-5 hidden lg:block"></div>
          </div>
        </div>
{/*
          {/* 資質認證 (純圖片板塊) */}
          <div className="pt-20 border-t-2 border-dashed border-gray-100">
            <div className="text-center mb-16 md:mb-24">
                <h3 className="text-2xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-red-800">{String(t.certification_title)}</h3>
                <p className="text-gray-400 font-bold text-xs md:text-sm uppercase tracking-widest">{String(t.certification_desc)}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 px-4 md:px-12">
                {/* SGS 認證圖片 */}
                <div className="group">
                  <div className="aspect-[3/4] bg-white rounded-2xl md:rounded-[40px] overflow-hidden shadow-2xl border-[12px] md:border-[24px] border-gray-50 group-hover:border-red-50 transition-all relative">
                      <img 
                        src="data\zhengshu\sgs.jpg" 
                        className="w-full h-full object-contain p-4 md:p-10 scale-95 group-hover:scale-100 transition-transform duration-500" 
                        alt="SGS Certificate" 
                      />
                      <div className="absolute top-0 right-0 bg-red-800 text-white text-[8px] font-black px-4 py-2 uppercase tracking-widest shadow-lg">SGS VERIFIED</div>
                  </div>
                  <div className="mt-8 text-center">
                      <h5 className="text-xl md:text-2xl font-black uppercase tracking-tight text-gray-900 mb-3">SGS 衛生標準認證</h5>
                      <div className="w-12 h-1 bg-red-800 mx-auto mb-4"></div>
                      <p className="text-xs md:text-sm text-gray-500 font-bold賞 leading-relaxed max-w-xs mx-auto">符合國家衛生標準 GB15979-2002 的嚴格要求，通過國際權威機構獨立驗證。</p>
                  </div>
                </div>

                {/* FSC 認證圖片 */}
                <div className="group">
                  <div className="aspect-[3/4] bg-white rounded-2xl md:rounded-[40px] overflow-hidden shadow-2xl border-[12px] md:border-[24px] border-gray-50 group-hover:border-green-50 transition-all relative">
                      <img 
                        src="data\zhengshu\fsc.jpg" 
                        className="w-full h-full object-contain p-4 md:p-10 scale-95 group-hover:scale-100 transition-transform duration-500" 
                        alt="FSC Certificate" 
                      />
                      <div className="absolute top-0 right-0 bg-green-800 text-white text-[8px] font-black px-4 py-2 uppercase tracking-widest shadow-lg">FSC CERTIFIED</div>
                  </div>
                  <div className="mt-8 text-center">
                      <h5 className="text-xl md:text-2xl font-black uppercase tracking-tight text-gray-900 mb-3">FSC 森林管理認證</h5>
                      <div className="w-12 h-1 bg-green-800 mx-auto mb-4"></div>
                      <p className="text-xs md:text-sm text-gray-500 font-bold leading-relaxed max-w-xs mx-auto">完全符合歐洲 FSC 森林驗證要求，確保原材料來源於負責任管理的森林。</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
function ProductsView({ products, setView, setProduct, addToCart, lang }: any) {
  const t = TRANSLATIONS[lang];
  // 獲取品類順序：優先遵從 INITIAL_PRODUCTS 中出現的順序，確保新增品類也不會打亂展示
  const allCategories = Array.from(new Set([...INITIAL_PRODUCTS.map(p => p.category), ...products.map(p => p.category)]));
  // 僅保留當前產品列表中存在的品類
  const activeCategories = allCategories.filter(cat => products.some(p => p.category === cat));
  
  return (
    <div className="max-w-7xl mx-auto py-12 md:py-24 px-4">
      {activeCategories.map((cat: string) => (
        <div key={cat} className="mb-12 md:mb-24">
          <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b-2 md:border-b-4 border-gray-100 pb-4 md:pb-6">
            <h3 className="text-xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter">{String(t[cat] || cat)}</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
            {products.filter((p: Product) => p.category === cat).map((p: Product) => (
              <div key={p.id} className="bg-white rounded-2xl md:rounded-3xl p-3 md:p-5 border-2 border-transparent hover:border-red-800 transition-all flex flex-col group hover:shadow-xl">
                <div className="relative aspect-square mb-4 md:mb-6 cursor-pointer rounded-xl md:rounded-2xl overflow-hidden bg-gray-50" onClick={() => { setProduct(p.id); setView('detail'); }}>
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={String(p.name[lang])} />
                  {p.stock <= 0 && <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-[8px] md:text-[10px] font-black uppercase text-red-800">{String(t.out_of_stock)}</div>}
                </div>
                <h4 className="text-[10px] md:text-sm font-black text-gray-800 h-8 md:h-10 overflow-hidden mb-3 md:mb-4 line-clamp-2 leading-tight uppercase">{String(p.name[lang])}</h4>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-red-800 font-black text-sm md:text-xl">¥{p.price}</span>
                  <button disabled={p.stock <= 0} onClick={() => addToCart(p.id)} className="bg-red-800 disabled:bg-gray-100 text-white text-[8px] md:text-[10px] px-3 md:px-5 py-1.5 md:py-2 rounded-full font-black uppercase shadow-md">{String(t.add)}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductDetailView({ productId, products, addToCart, lang }: any) {
  const p = products.find((x: Product) => x.id === productId);
  const t = TRANSLATIONS[lang];
  const [activeImg, setActiveImg] = useState(p?.image || '');

  useEffect(() => { if (p) setActiveImg(p.image); }, [p]);

  if (!p) return null;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 md:py-24 px-4 flex flex-col lg:flex-row gap-10 md:gap-24 items-start border-b">
        <div className="flex-1 w-full space-y-4 md:space-y-6">
          <div className="rounded-2xl md:rounded-[40px] overflow-hidden border-4 md:border-8 border-gray-50 shadow-2xl aspect-square bg-gray-50">
            <img src={activeImg} className="w-full h-full object-cover" alt="Main" />
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 md:gap-3">
            {(p.images && p.images.length > 0 ? p.images : [p.image]).map((img: string, idx: number) => (
              <button key={idx} onClick={() => setActiveImg(img)} className={`aspect-square rounded-lg md:rounded-xl overflow-hidden border-2 md:border-4 transition-all ${activeImg === img ? 'border-red-800' : 'border-transparent'}`}>
                <img src={img} className="w-full h-full object-cover" alt="Thumb" />
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 w-full flex flex-col justify-center">
          <div className="mb-4 md:mb-8">
            <span className="bg-red-800 text-white px-4 py-1.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest">{String(t[p.category] || p.category)}</span>
          </div>
          <h2 className="text-2xl md:text-5xl font-black text-gray-900 mb-6 md:mb-8 leading-tight uppercase">{String(p.name[lang])}</h2>
          <div className="flex items-baseline gap-4 md:gap-6 mb-8 md:mb-12">
            <p className="text-4xl md:text-6xl text-red-800 font-black">¥ {p.price.toFixed(2)}</p>
          </div>
          <div className="bg-gray-50 p-6 md:p-10 rounded-2xl md:rounded-[40px] border-2 md:border-4 border-dashed border-gray-100 mb-8 md:mb-12 text-gray-700 font-bold text-sm md:text-base">
            <p>{String(p.description[lang])}</p>
          </div>
          <button disabled={p.stock <= 0} onClick={() => addToCart(p.id)} className="w-full bg-red-800 disabled:bg-gray-200 text-white py-5 md:py-6 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-2xl">
            {p.stock > 0 ? String(t.add_to_cart) : String(t.out_of_stock)}
          </button>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto py-12 md:py-24 px-4 bg-gray-50 space-y-12 md:space-y-20">
        {p.videoUrl && (
          <div className="space-y-6 md:space-y-10">
            <div className="flex items-center gap-4">
               <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter">{lang === Language.TC ? '產品展示視頻' : 'Product Video'}</h3>
               <div className="h-1 bg-red-800 flex-1 opacity-10"></div>
            </div>
            <div className="rounded-2xl md:rounded-[40px] overflow-hidden shadow-2xl bg-black aspect-video border-4 md:border-8 border-white">
              <video controls className="w-full h-full object-cover" key={p.id}>
                <source src={p.videoUrl} type="video/mp4" />
              </video>
            </div>
          </div>
        )}

        {p.detailImage && (
          <div className="space-y-6 md:space-y-10">
            <div className="flex items-center gap-4">
               <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter">{lang === Language.TC ? '商品詳細規格' : 'Product Specifications'}</h3>
               <div className="h-1 bg-red-800 flex-1 opacity-10"></div>
            </div>
            <div className="rounded-2xl md:rounded-[40px] overflow-hidden shadow-2xl bg-white border-2 border-gray-100">
               <img src={p.detailImage} className="w-full h-auto block" alt="Detail Specs" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminView({ products, setProducts, orders, setOrders, lang }: any) {
  const [tab, setTab] = useState<'inventory' | 'orders' | 'add'>('inventory');
  const t = TRANSLATIONS[lang];

  const handleUpdate = (updatedProduct: Product) => {
    const newList = products.map((p: Product) => p.id === updatedProduct.id ? updatedProduct : p);
    setProducts(newList);
    DB.saveProducts(newList);
  };

  const [newProd, setNewProd] = useState<Partial<Product>>({
    name: { TC: '', EN: '' },
    description: { TC: '', EN: '' },
    category: '',
    price: 0,
    stock: 0,
    active: true,
    image: '',
    images: [],
    detailImage: '',
    videoUrl: ''
  });
  const [customCat, setCustomCat] = useState('');
  const [extraImages, setExtraImages] = useState(''); 

  // 品類列表也遵從 INITIAL_PRODUCTS 順序
  const allCategories = Array.from(new Set([...INITIAL_PRODUCTS.map(p => p.category), ...products.map(p => p.category)]));

  const handleAddProduct = () => {
    const cat = customCat || newProd.category;
    if (!newProd.name?.TC || !cat) return alert('請完整填寫產品名稱與分類');
    
    const p: Product = {
      ...newProd as Product,
      id: `SAK-${Date.now()}`,
      category: cat,
      images: extraImages.split(',').map(s => s.trim()).filter(s => s !== '')
    };
    // 關鍵修改：將新商品追加到末尾，確保現有商品的展示順序不被打亂
    const newList = [...products, p];
    setProducts(newList);
    DB.saveProducts(newList);
    setTab('inventory');
    alert('商品已成功上架！');
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex gap-4 mb-10 border-b overflow-x-auto no-scrollbar pb-2">
        <button onClick={() => setTab('inventory')} className={`px-6 py-3 font-black uppercase text-xs tracking-widest ${tab === 'inventory' ? 'text-red-800 border-b-4 border-red-800' : 'text-gray-400'}`}>{String(t.admin_inventory)}</button>
        <button onClick={() => setTab('add')} className={`px-6 py-3 font-black uppercase text-xs tracking-widest ${tab === 'add' ? 'text-red-800 border-b-4 border-red-800' : 'text-gray-400'}`}>{String(t.add_product)}</button>
        <button onClick={() => setTab('orders')} className={`px-6 py-3 font-black uppercase text-xs tracking-widest ${tab === 'orders' ? 'text-red-800 border-b-4 border-red-800' : 'text-gray-400'}`}>{String(t.admin_orders)}</button>
      </div>

      {tab === 'inventory' && (
        <div className="grid gap-6">
          {products.map((p: Product) => (
            <div key={p.id} className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
              <img src={p.image} className="w-20 h-20 rounded-lg object-cover bg-gray-50" />
              <div className="flex-1">
                <h4 className="font-black uppercase text-xs mb-1">{p.name[lang]}</h4>
                <p className="text-[10px] text-gray-400 font-bold">{p.id} | {t[p.category] || p.category}</p>
              </div>
              <div className="grid grid-cols-2 md:flex gap-4 items-center">
                <div className="flex flex-col">
                  <label className="text-[8px] font-black text-gray-400 uppercase">單價 Price</label>
                  <input type="number" step="0.1" className="border rounded px-2 py-1 text-xs w-20 font-black" value={p.price} onChange={e => handleUpdate({...p, price: parseFloat(e.target.value) || 0})} />
                </div>
                <div className="flex flex-col">
                  <label className="text-[8px] font-black text-gray-400 uppercase">庫存 Stock</label>
                  <input type="number" className="border rounded px-2 py-1 text-xs w-20 font-black" value={p.stock} onChange={e => handleUpdate({...p, stock: parseInt(e.target.value) || 0})} />
                </div>
                <button onClick={() => handleUpdate({...p, active: !p.active})} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase ${p.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {p.active ? t.status_active : t.status_inactive}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'add' && (
        <div className="bg-white p-8 rounded-3xl border shadow-xl max-w-3xl mx-auto space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="產品名稱 (TC)" className="border-2 p-3 rounded-xl text-xs font-black uppercase" onChange={e => setNewProd({...newProd, name: {...newProd.name!, TC: e.target.value}})} />
            <input placeholder="Product Name (EN)" className="border-2 p-3 rounded-xl text-xs font-black uppercase" onChange={e => setNewProd({...newProd, name: {...newProd.name!, EN: e.target.value}})} />
          </div>
          
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">選擇類別或輸入新品類 Select/Add Category</label>
            <div className="grid grid-cols-2 gap-4">
              <select className="border-2 p-3 rounded-xl text-xs font-black uppercase" onChange={e => setNewProd({...newProd, category: e.target.value})}>
                <option value="">選擇現有類別</option>
                {allCategories.map(c => <option key={c} value={c}>{t[c] || c}</option>)}
              </select>
              <input placeholder="或輸入新品類名稱" className="border-2 p-3 rounded-xl text-xs font-black uppercase" onChange={e => setCustomCat(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
               <label className="text-[8px] font-black text-gray-400 uppercase mb-1">單價 Price</label>
               <input type="number" step="0.1" className="border-2 p-3 rounded-xl text-xs font-black" onChange={e => setNewProd({...newProd, price: parseFloat(e.target.value)})} />
            </div>
            <div className="flex flex-col">
               <label className="text-[8px] font-black text-gray-400 uppercase mb-1">庫存 Stock</label>
               <input type="number" className="border-2 p-3 rounded-xl text-xs font-black" onChange={e => setNewProd({...newProd, stock: parseInt(e.target.value)})} />
            </div>
          </div>

          <div className="space-y-4">
            <input placeholder="主圖 URL (Main Image URL)" className="w-full border-2 p-3 rounded-xl text-xs font-black" onChange={e => setNewProd({...newProd, image: e.target.value})} />
            <textarea placeholder="細節圖 URL (5-6張，以逗號分隔)" className="w-full border-2 p-3 rounded-xl text-xs font-black h-20" onChange={e => setExtraImages(e.target.value)} />
            <input placeholder="詳情圖 URL (Long Detail Image URL)" className="w-full border-2 p-3 rounded-xl text-xs font-black" onChange={e => setNewProd({...newProd, detailImage: e.target.value})} />
            <input placeholder="展示視頻 URL (Video URL)" className="w-full border-2 p-3 rounded-xl text-xs font-black" onChange={e => setNewProd({...newProd, videoUrl: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <textarea placeholder="商品描述 (TC)" className="border-2 p-3 rounded-xl text-xs font-black h-24" onChange={e => setNewProd({...newProd, description: {...newProd.description!, TC: e.target.value}})} />
            <textarea placeholder="Description (EN)" className="border-2 p-3 rounded-xl text-xs font-black h-24" onChange={e => setNewProd({...newProd, description: {...newProd.description!, EN: e.target.value}})} />
          </div>

          <button onClick={handleAddProduct} className="w-full bg-red-800 text-white py-5 rounded-full font-black text-sm uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all">立即上架 ADD PRODUCT</button>
        </div>
      )}

      {tab === 'orders' && (
        <div className="space-y-6">
          {orders.map((o: Order) => (
            <div key={o.id} className="bg-white p-6 rounded-3xl border shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h4 className="font-mono text-red-800 font-black text-sm">{o.id}</h4>
                  <p className="text-[10px] text-gray-400 font-bold">{o.customerName} | {o.phone}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <select 
                    className="text-[10px] font-black uppercase border-2 p-2 rounded-xl bg-gray-50 outline-none focus:border-red-800"
                    value={o.status}
                    onChange={e => {
                      const updated = {...o, status: e.target.value as OrderStatus};
                      DB.updateOrder(updated);
                      setOrders(DB.getOrders());
                    }}
                  >
                    <option value={OrderStatus.PLACED}>{t.placed}</option>
                    <option value={OrderStatus.PICKING}>{t.picking}</option>
                    <option value={OrderStatus.SHIPPED}>{t.shipped}</option>
                    <option value={OrderStatus.RECEIVED}>{t.received}</option>
                  </select>
                </div>
              </div>

{/* --- 插入开始 --- */}
<div className="mb-6 border-t border-b border-gray-50 py-4 space-y-3">
  {o.items.map((item, idx) => {
    const p = products.find((prod: any) => prod.id === item.productId);
    return (
      <div key={idx} className="flex justify-between items-center text-[10px] font-bold text-gray-600">
        <div className="flex items-center gap-3">
          <img src={p?.image} className="w-10 h-10 rounded-lg object-cover border" />
          <div className="flex flex-col">
            <span className="text-gray-800 uppercase">{p?.name[lang]}</span>
            <span className="text-gray-400">单价: ¥{p?.price}</span>
          </div>
        </div>
        <div className="text-right">
          <span>数量: {item.quantity}</span>
          <p className="text-red-800">小计: ¥{((p?.price || 0) * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    );
  })}
</div>
{/* --- 插入结束 --- */}


              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 block">快遞單號 Tracking Number</label>
                  <input 
                    placeholder="輸入物流單號..." 
                    className="w-full border-2 p-2 rounded-xl text-[10px] font-black uppercase"
                    value={o.trackingNumber || ''}
                    onChange={e => {
                      const updated = {...o, trackingNumber: e.target.value};
                      DB.updateOrder(updated);
                      setOrders(DB.getOrders());
                    }}
                  />
                </div>
                <div className="flex items-end">
                   <div className="bg-red-50 text-red-800 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest border-2 border-red-100">
                      Total: ¥ {o.totalPrice.toFixed(2)}
                   </div>
                </div>
              </div>
            </div>
          ))}
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
      <h2 className="text-2xl md:text-4xl font-black mb-10 md:mb-20 text-gray-900 uppercase tracking-tighter border-l-8 border-red-800 pl-6 md:pl-8">{String(t.my_orders)}</h2>
      <div className="space-y-6 md:space-y-12">
        {myOrders.map((o: Order) => (
          <div key={o.id} className="bg-white p-6 md:p-12 rounded-2xl md:rounded-[50px] shadow-xl border-2 border-gray-50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b-2 border-dashed pb-6">
              <span className="font-mono text-red-800 font-black text-sm md:text-lg">{String(o.id)}</span>
              <div className="flex gap-2 items-center">
                <span className="text-[10px] font-black text-gray-400 bg-gray-100 px-3 py-1 rounded-full uppercase">{o.paymentMethod}</span>
                <span className="bg-red-50 text-red-800 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100">{String(t[o.status.toLowerCase()])}</span>
              </div>
            </div>
 {/* --- 插入开始 --- */}
 <div className="mb-8 space-y-4">
    {o.items.map((item: any, idx: number) => {
      const p = products.find((prod: any) => prod.id === item.productId);
      return (
        <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
          <div className="flex items-center gap-4">
            <img src={p?.image} className="w-12 h-12 md:w-16 md:h-16 rounded-xl object-cover border-2 border-white shadow-sm" />
            <div>
              <p className="text-xs md:text-sm font-black uppercase text-gray-800">{p?.name[lang]}</p>
              <p className="text-[10px] text-gray-400 font-bold">¥{p?.price} x {item.quantity}</p>
            </div>
          </div>
          <p className="text-sm md:text-lg font-black text-gray-700">¥{((p?.price || 0) * item.quantity).toFixed(2)}</p>
        </div>
      );
    })}
  </div>
  {/* --- 插入结束 --- */}

            <div className="flex justify-between items-end">
               <div>
                  <p className="text-2xl md:text-4xl font-black text-red-800 tracking-tighter">¥ {o.totalPrice.toFixed(2)}</p>
                  {o.trackingNumber && <p className="mt-4 text-xs font-black text-red-800 bg-red-50 p-2 rounded inline-block">{String(t.tracking_no)}: {o.trackingNumber}</p>}
               </div>
               <p className="text-[10px] font-black text-gray-400 uppercase">{o.createdAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CartView({ cart, products, lang, setView }: any) {
  const t = TRANSLATIONS[lang];
  const total = cart.reduce((acc: number, item: CartItem) => {
    const p = products.find((prod: Product) => prod.id === item.productId);
    return acc + (p?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto py-12 md:py-24 px-4">
      <h2 className="text-2xl md:text-4xl font-black mb-10 md:mb-20 text-gray-900 uppercase tracking-tighter border-l-8 border-red-800 pl-6 md:pl-8">{String(t.cart)}</h2>
      {cart.length === 0 ? (
        <div className="text-center py-20 border-4 border-dashed rounded-2xl bg-white">
          <p className="text-gray-300 font-black uppercase text-sm md:text-xl mb-8 tracking-widest">{lang === Language.TC ? '您的購物車是空的' : 'Cart is empty'}</p>
          <button onClick={() => setView('products')} className="bg-red-800 text-white px-10 md:px-16 py-4 rounded-full font-black text-[10px] uppercase shadow-xl">{String(t.buy_now)}</button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl md:rounded-[50px] shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-12 space-y-8">
            {cart.map((item: CartItem) => {
              const p = products.find((x: Product) => x.id === item.productId);
              return (
                <div key={item.productId} className="flex items-center gap-4 md:gap-10 border-b pb-6 last:border-0 last:pb-0">
                  <img src={p?.image} className="w-16 h-16 md:w-24 md:h-24 rounded-xl object-cover border shadow-sm" />
                  <div className="flex-1">
                    <h4 className="font-black text-gray-800 text-xs md:text-lg uppercase line-clamp-1">{String(p?.name[lang])}</h4>
                    <p className="text-[10px] text-gray-400 font-black">¥{p?.price} x {item.quantity}</p>
                  </div>
                  <p className="text-sm md:text-2xl font-black text-gray-900">¥{(p ? p.price * item.quantity : 0).toFixed(2)}</p>
                </div>
              );
            })}
          </div>
          <div className="p-6 md:p-12 flex flex-col md:flex-row justify-between items-center bg-gray-900 text-white gap-6">
            <div className="text-center md:text-left">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">{String(t.total)}</p>
              <div className="text-3xl md:text-5xl font-black text-yellow-400 tracking-tighter">¥ {total.toFixed(2)}</div>
            </div>
            <button onClick={() => setView('checkout')} className="w-full md:w-auto bg-red-800 text-white px-10 md:px-20 py-4 md:py-6 rounded-full font-black text-xs md:text-lg uppercase shadow-2xl">{String(t.proceed_checkout)}</button>
          </div>
        </div>
      )}
    </div>
  );
}

function CheckoutView({ onPay, lang }: any) {
  const t = TRANSLATIONS[lang];
  const [method, setMethod] = useState('Alipay');
  const paymentMethods = [
    { id: 'Alipay', name: '支付寶 (Alipay)' },
    { id: 'WeChat Pay', name: '微信支付 (WeChat Pay)' },
    { id: 'PayPal', name: 'PayPal' },
    { id: 'Visa', name: 'Visa' },
    { id: 'Octopus', name: '八達通 (Octopus)' }
  ];

  return (
    <div className="max-w-md mx-auto py-16 md:py-32 px-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl md:rounded-[50px] shadow-2xl border-2 border-gray-50 text-center">
        <h2 className="text-2xl md:text-3xl font-black mb-8 text-gray-900 uppercase tracking-tighter">{String(t.checkout)}</h2>
        <div className="space-y-3 mb-10 text-left">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
             {lang === Language.TC ? '選擇支付方式' : 'Select Payment Method'}
           </p>
           {paymentMethods.map(m => (
             <label key={m.id} className={`flex items-center gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all ${method === m.id ? 'border-red-800 bg-red-50' : 'border-gray-100 hover:border-red-200'}`}>
               <input type="radio" name="pay" checked={method === m.id} onChange={() => setMethod(m.id)} className="hidden" />
               <div className={`w-4 h-4 rounded-full border-4 ${method === m.id ? 'border-red-800' : 'border-gray-200'}`}></div>
               <span className="text-xs font-black uppercase tracking-tighter">{m.name}</span>
             </label>
           ))}
        </div>
        <button onClick={() => onPay(method)} className="w-full bg-red-800 text-white py-5 rounded-full font-black text-sm md:text-lg uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all">
          {String(t.confirm_pay)}
        </button>
      </div>
    </div>
  );
}

function AuthView({ t, isRegistering, setIsRegistering, setCurrentUser, setView }: any) {
  const [formData, setFormData] = useState({ username: '', password: '', name: '', phone: '', address: '' });
  const handleAction = () => {
    if(!formData.username || !formData.password) { alert('請輸入賬號密碼'); return; }
    const users = DB.getUsers();
    if (isRegistering) {
      const newUser = { ...formData, role: UserRole.CUSTOMER };
      DB.saveUser(newUser as any);
      setCurrentUser(newUser as any);
      setView('home');
    } else {
      const u = users.find(x => 
        // 将输入的用户名转为大写并去掉前后空格，再与数据库对比
        x.username.trim().toUpperCase() === formData.username.trim().toUpperCase() && 
        x.password === formData.password.trim()
      );
      if (u) {
        setCurrentUser(u);
        setView(u.role === UserRole.ADMIN ? 'admin' : 'home');
      } else {
        alert('無效的憑據');
      }
    }
  };
  return (
    <div className="max-w-md mx-auto py-16 md:py-32 px-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl md:rounded-[50px] shadow-2xl border-2 border-gray-50">
        <h2 className="text-2xl md:text-3xl font-black mb-8 md:mb-12 text-center text-gray-900 uppercase tracking-tighter">{isRegistering ? String(t.register) : String(t.login)}</h2>
        <div className="space-y-4 md:space-y-6">
          <input placeholder={String(t.username)} className="w-full border-2 border-gray-100 p-4 rounded-full outline-none focus:border-red-800 font-black text-[10px] uppercase bg-gray-50" onChange={e => setFormData({...formData, username: e.target.value})} />
          <input type="password" placeholder={String(t.password)} className="w-full border-2 border-gray-100 p-4 rounded-full outline-none focus:border-red-800 font-black text-[10px] uppercase bg-gray-50" onChange={e => setFormData({...formData, password: e.target.value})} />
          {isRegistering && (
            <div className="space-y-4 animate-fadeIn">
              <input placeholder={String(t.name)} className="w-full border-2 border-gray-100 p-4 rounded-full outline-none focus:border-red-800 font-black text-[10px] uppercase bg-gray-50" onChange={e => setFormData({...formData, name: e.target.value})} />
              <input placeholder={String(t.phone)} className="w-full border-2 border-gray-100 p-4 rounded-full outline-none focus:border-red-800 font-black text-[10px] uppercase bg-gray-50" onChange={e => setFormData({...formData, phone: e.target.value})} />
              <input placeholder={String(t.address)} className="w-full border-2 border-gray-100 p-4 rounded-full outline-none focus:border-red-800 font-black text-[10px] uppercase bg-gray-50" onChange={e => setFormData({...formData, address: e.target.value})} />
            </div>
          )}
          <button onClick={handleAction} className="w-full bg-red-800 text-white py-5 rounded-full font-black text-xs md:text-lg uppercase shadow-2xl mt-4">{isRegistering ? String(t.register) : String(t.login)}</button>
          <button onClick={() => setIsRegistering(!isRegistering)} className="w-full text-center text-[10px] text-red-800 font-black uppercase underline mt-4">{isRegistering ? String(t.login) : String(t.register)}</button>
        </div>
      </div>
    </div>
  );
}
