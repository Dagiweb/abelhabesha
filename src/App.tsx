/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { AboutUsPage } from './components/AboutUsPage';
import { ContactUsPage } from './components/ContactUsPage';
import { AdminPanel } from './components/AdminPanel';
import { AdminAuth } from './components/AdminAuth';
import { BlogPage } from './components/BlogPage';
import { CustomTailoringModal } from './components/CustomTailoringModal';
import { CartModal } from './components/CartModal';
import { MeasurementGuideModal } from './components/MeasurementGuideModal';
import { ReturnPolicyModal } from './components/ReturnPolicyModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { STORE_INFO } from './data/categories';
import { Product, CartItem, Language, CategoryGroupId, ViewType } from './types';
import { 
  subscribeToProducts, 
  saveProductToFirestore, 
  updateProductInFirestore, 
  deleteProductFromFirestore,
  clearAllProductsFromFirestore
} from './lib/productsService';
import { 
  MessageCircle, 
  Send, 
  Mail,
  Cloud,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('abel_habesha_lang');
      if (saved === 'am' || saved === 'en' || saved === 'ti') return saved;
    } catch {}
    return 'en';
  });
  const [currency, setCurrency] = useState<'ETB' | 'USD'>('ETB');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<CategoryGroupId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Persist language selection
  useEffect(() => {
    try {
      localStorage.setItem('abel_habesha_lang', language);
    } catch {}
  }, [language]);

  // Firestore Real-Time Products State
  const [products, setProducts] = useState<Product[]>([]);
  const [isDbLoading, setIsDbLoading] = useState(true);
  const [dbStatusMessage, setDbStatusMessage] = useState<string | null>(null);

  // Subscribe to real-time Firestore updates
  useEffect(() => {
    setIsDbLoading(true);
    const unsubscribe = subscribeToProducts(
      (liveProducts) => {
        setProducts(liveProducts);
        setIsDbLoading(false);
      },
      (err) => {
        console.warn('Firestore subscription notice (offline/empty):', err);
        setIsDbLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);
  
  // Page View Navigation: 'home' | 'products' | 'detail' | 'about' | 'contact' | 'admin' | 'blogs'
  const [currentView, setCurrentView] = useState<ViewType>(() => {
    try {
      const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '');
      const hash = window.location.hash;
      if (pathname === '/admin' || hash === '#/admin' || hash === '#admin') return 'admin';
      if (pathname === '/blogs' || hash === '#/blogs' || hash === '#/blog') return 'blogs';
      if (pathname === '/products' || hash === '#/products' || hash === '#/catalog') return 'products';
      if (pathname === '/about' || hash === '#/about') return 'about';
      if (pathname === '/contact' || hash === '#/contact') return 'contact';
      if (hash.startsWith('#/product/')) return 'detail';
    } catch {}
    return 'home';
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modals state
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isGlobalMeasurementOpen, setIsGlobalMeasurementOpen] = useState(false);
  const [isGlobalReturnPolicyOpen, setIsGlobalReturnPolicyOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const isAm = language === 'am';

  // Deep linking and browser back/forward button support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '');

      // Check if user accesses /admin directly in URL or hash
      if (pathname === '/admin' || hash === '#/admin' || hash === '#admin') {
        setCurrentView('admin');
        setSelectedProduct(null);
        return;
      }

      if (hash.startsWith('#/product/')) {
        const prodId = hash.replace('#/product/', '');
        const found = products.find((p) => p.id === prodId || p.code === prodId);
        if (found) {
          setSelectedProduct(found);
          setCurrentView('detail');
          return;
        }
      } else if (hash === '#/products' || hash === '#/catalog' || pathname === '/products') {
        setCurrentView('products');
        setSelectedProduct(null);
        return;
      } else if (hash === '#/blogs' || hash === '#/blog' || pathname === '/blogs') {
        setCurrentView('blogs');
        setSelectedProduct(null);
        return;
      } else if (hash === '#/about' || pathname === '/about') {
        setCurrentView('about');
        setSelectedProduct(null);
        return;
      } else if (hash === '#/contact' || pathname === '/contact') {
        setCurrentView('contact');
        setSelectedProduct(null);
        return;
      } else if (!hash || hash === '#' || hash === '#/home' || pathname === '' || pathname === '/') {
        setCurrentView('home');
        setSelectedProduct(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [products]);

  const handleNavigate = (view: ViewType) => {
    const target = view === 'catalog' ? 'products' : view;
    setCurrentView(target);
    if (target === 'home') {
      window.location.hash = '#/home';
      setSelectedProduct(null);
    } else if (target === 'products') {
      window.location.hash = '#/products';
      setSelectedProduct(null);
    } else if (target === 'blogs') {
      window.location.hash = '#/blogs';
      setSelectedProduct(null);
    } else if (target === 'about') {
      window.location.hash = '#/about';
      setSelectedProduct(null);
    } else if (target === 'contact') {
      window.location.hash = '#/contact';
      setSelectedProduct(null);
    } else if (target === 'admin') {
      window.location.hash = '#/admin';
      setSelectedProduct(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToProducts = (group?: CategoryGroupId, tag?: string) => {
    if (group) setSelectedGroup(group);
    if (tag) setSelectedTag(tag);
    handleNavigate('products');
  };

  const handleOpenProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
    window.location.hash = `#/product/${product.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    handleNavigate('products');
  };

  // Product mutations with Firebase Firestore persistence
  const handleAddProduct = async (newProduct: Product) => {
    try {
      // Optimistic update
      setProducts((prev) => [newProduct, ...prev.filter((p) => p.id !== newProduct.id)]);
      await saveProductToFirestore(newProduct);
    } catch (err) {
      console.error('Failed to save product to Firestore:', err);
    }
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      // Optimistic update
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      if (selectedProduct && selectedProduct.id === updatedProduct.id) {
        setSelectedProduct(updatedProduct);
      }
      await saveProductToFirestore(updatedProduct);
    } catch (err) {
      console.error('Failed to update product in Firestore:', err);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      // Optimistic update
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      if (selectedProduct && selectedProduct.id === productId) {
        handleBackToCatalog();
      }
      await deleteProductFromFirestore(productId);
    } catch (err) {
      console.error('Failed to delete product from Firestore:', err);
    }
  };

  const handleResetCatalog = async () => {
    try {
      setProducts([]);
      await clearAllProductsFromFirestore();
    } catch (err) {
      console.error('Failed to clear catalog:', err);
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, size = 'M', customMeasurements?: any) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, { product, size, customMeasurements, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF8] text-[#2D241E]">
      {/* Navigation */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (currentView !== 'products' && currentView !== 'catalog') {
            setCurrentView('products');
            setSelectedProduct(null);
            window.location.hash = '#/products';
          }
        }}
        onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
        onOpenMeasurementGuide={() => setIsGlobalMeasurementOpen(true)}
        onLogoClick={() => handleNavigate('home')}
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* VIEW 1: HOME PAGE (ECOMMERCE STOREFRONT) */}
        {currentView === 'home' && (
          <HomePage
            products={products}
            language={language}
            currency={currency}
            onOpenDetails={handleOpenProductDetail}
            onAddToCart={(prod) => {
              handleAddToCart(prod);
              setIsCartOpen(true);
            }}
            cart={cart}
            onNavigateToProducts={handleNavigateToProducts}
            onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
            onAboutClick={() => handleNavigate('about')}
          />
        )}

        {/* VIEW 2: PRODUCTS CATALOG PAGE */}
        {(currentView === 'products' || currentView === 'catalog') && (
          <ProductsPage
            products={products}
            language={language}
            currency={currency}
            onOpenDetails={handleOpenProductDetail}
            onAddToCart={(prod) => {
              handleAddToCart(prod);
              setIsCartOpen(true);
            }}
            cart={cart}
            initialTag={selectedTag}
            initialGroup={selectedGroup}
            onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

        {/* VIEW 3: SEPARATE PRODUCT DETAIL PAGE */}
        {currentView === 'detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={handleBackToCatalog}
            onSelectProduct={(newProduct) => handleOpenProductDetail(newProduct)}
            onAddToCart={(prod, size, measurements) => {
              handleAddToCart(prod, size, measurements);
              setIsCartOpen(true);
            }}
            language={language}
            currency={currency}
            onSelectCategory={(catTag) => {
              setSelectedTag(catTag);
              handleBackToCatalog();
            }}
          />
        )}

        {/* VIEW 4: ABOUT US PAGE */}
        {currentView === 'about' && (
          <AboutUsPage
            language={language}
            onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
            onExploreCatalog={() => handleNavigate('products')}
            onContactClick={() => handleNavigate('contact')}
          />
        )}

        {/* VIEW 5: CONTACT US PAGE */}
        {currentView === 'contact' && (
          <ContactUsPage
            language={language}
            onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
          />
        )}

        {/* VIEW 6: BLOGS & CULTURAL HERITAGE ARTICLES */}
        {currentView === 'blogs' && (
          <BlogPage
            language={language}
            onNavigateToProducts={() => handleNavigate('products')}
            onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
            onOpenMeasurementGuide={() => setIsGlobalMeasurementOpen(true)}
            onOpenReturnPolicy={() => setIsGlobalReturnPolicyOpen(true)}
          />
        )}

        {/* VIEW 7: ADMIN PANEL (PROTECTED WITH AUTH) */}
        {currentView === 'admin' && (
          <AdminAuth
            language={language}
            onBackToStore={() => handleNavigate('home')}
          >
            {(user) => (
              <AdminPanel
                products={products}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
                onResetCatalog={handleResetCatalog}
                onBackToStore={() => handleNavigate('home')}
                language={language}
                adminUser={user}
              />
            )}
          </AdminAuth>
        )}
      </main>

      {/* Footer with All Store Socials & Shiromeda Address */}
      <Footer
        language={language}
        onSelectHashtag={(tag) => {
          setSelectedTag(tag);
          handleNavigate('products');
        }}
        onNavigate={handleNavigate}
        onOpenMeasurementGuide={() => setIsGlobalMeasurementOpen(true)}
        onOpenReturnPolicy={() => setIsGlobalReturnPolicyOpen(true)}
      />

      {/* Custom Tailoring Modal */}
      <CustomTailoringModal
        isOpen={isCustomOrderOpen}
        onClose={() => setIsCustomOrderOpen(false)}
        language={language}
      />

      {/* Measurement Guide Modal (Global) */}
      {isGlobalMeasurementOpen && (
        <MeasurementGuideModal
          isOpen={isGlobalMeasurementOpen}
          onClose={() => setIsGlobalMeasurementOpen(false)}
          language={language}
        />
      )}

      {/* Return & Order Policy Modal (Global) */}
      {isGlobalReturnPolicyOpen && (
        <ReturnPolicyModal
          isOpen={isGlobalReturnPolicyOpen}
          onClose={() => setIsGlobalReturnPolicyOpen(false)}
          language={language}
        />
      )}

      {/* Cart Drawer / Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        language={language}
        currency={currency}
      />

      {/* Floating Fast Chat & Contact Actions for Mobile & Desktop */}
      <div className={`fixed ${currentView === 'detail' ? 'bottom-16 sm:bottom-5' : 'bottom-5'} right-4 sm:right-5 z-40 flex flex-col gap-2.5 transition-all`}>
        <a
          href={STORE_INFO.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Chat on WhatsApp (+251 913 312 314)"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        </a>
        <a
          href={STORE_INFO.telegramUrl}
          target="_blank"
          rel="noreferrer"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#29b6f6] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Chat on Telegram @AbelDesignChat"
          aria-label="Chat on Telegram"
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
        </a>
        <a
          href={STORE_INFO.emailUrl}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#8B0000] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform border border-[#C5A059]/30"
          title={language === 'ti' ? `ኢመይል ስደዱልና (${STORE_INFO.email})` : language === 'am' ? `ኢሜይል ይላኩልን (${STORE_INFO.email})` : `Email Us (${STORE_INFO.email})`}
          aria-label="Send Email"
        >
          <Mail className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
        </a>
      </div>
    </div>
  );
}

