import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Phone, 
  Send, 
  Search, 
  Globe, 
  MapPin, 
  MessageCircle,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { STORE_INFO } from '../data/categories';
import { getTranslation } from '../data/translations';
import { Language } from '../types';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currency: 'ETB' | 'USD';
  onCurrencyChange: (currency: 'ETB' | 'USD') => void;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCustomOrder: () => void;
  onLogoClick?: () => void;
  currentView?: 'home' | 'products' | 'catalog' | 'detail' | 'about' | 'contact' | 'admin';
  onNavigate?: (view: 'home' | 'products' | 'about' | 'contact' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  currency,
  onCurrencyChange,
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onOpenCustomOrder,
  onLogoClick,
  currentView = 'home',
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = getTranslation(language);
  const currentAddress = language === 'ti' ? STORE_INFO.addressTi : (language === 'am' ? STORE_INFO.addressAm : STORE_INFO.addressEn);

  return (
    <header className="sticky top-0 z-40 bg-[#FDFCF8]/95 backdrop-blur-md border-b border-[#EAD8C0] shadow-xs">
      {/* Slim Top Announcement Bar */}
      <div className="bg-[#2D241E] text-[#F9F4EC] text-[11px] sm:text-xs py-1 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-medium truncate">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-[9px] sm:text-[10px] bg-[#8B0000] text-white font-bold uppercase tracking-wider shrink-0">
              {t.saleTag}
            </span>
            <span className="truncate opacity-90 text-[11px] sm:text-xs">
              {t.announcement}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs shrink-0">
            <a 
              href={`tel:${STORE_INFO.phone}`} 
              className="flex items-center gap-1 hover:text-[#C5A059] transition-colors font-medium"
              title={t.callUs}
            >
              <Phone className="w-3 h-3 text-[#C5A059]" />
              <span>{STORE_INFO.phoneDisplay}</span>
            </a>
            <span className="text-white/30">|</span>
            <a 
              href={STORE_INFO.whatsappUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 hover:text-[#25D366] transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
            <span className="text-white/30">|</span>
            <a 
              href={STORE_INFO.telegramUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 hover:text-[#29b6f6] transition-colors"
            >
              <Send className="w-3 h-3 text-[#29b6f6]" />
              <span>@{STORE_INFO.telegramUser}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar - Compact & Responsive */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2">
            <a 
              href="#" 
              onClick={(e) => {
                if (onLogoClick) {
                  e.preventDefault();
                  onLogoClick();
                }
              }}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-linear-to-br from-[#8B0000] to-[#C5A059] p-0.5 shadow-xs shrink-0">
                <div className="w-full h-full rounded-full bg-[#FDFCF8] flex items-center justify-center text-[#8B0000] font-bold text-sm sm:text-base font-serif">
                  AH
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-serif font-bold tracking-tight text-[#8B0000] leading-none">
                    ABEL HABESHA
                  </span>
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.2 bg-[#F9F4EC] text-[#8B0000] border border-[#EAD8C0] rounded font-semibold font-ethiopic leading-normal">
                    {language === 'ti' ? 'ኣቤል ሓበሻ' : 'አቤል ሓበሻ'}
                  </span>
                </div>
                <span className="hidden lg:block text-[9px] tracking-wider uppercase opacity-70 text-[#2D241E] mt-0.5">
                  {language === 'ti' ? 'ባህላዊ ክዳውንቲ • ሽሮሜዳ' : language === 'am' ? 'የሓበሻ ቀሚሶችና ሽፎኖች መደብር • ሽሮሜዳ' : 'Authentic Ethiopian Elegance • Shiromeda'}
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-[#2D241E] shrink-0">
            <button
              onClick={() => onNavigate && onNavigate('home')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                currentView === 'home'
                  ? 'bg-[#8B0000] text-white font-bold shadow-2xs'
                  : 'hover:bg-[#F9F4EC] hover:text-[#8B0000]'
              }`}
            >
              {t.navHome}
            </button>
            <button
              onClick={() => onNavigate && onNavigate('products')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                currentView === 'products' || currentView === 'catalog'
                  ? 'bg-[#8B0000] text-white font-bold shadow-2xs'
                  : 'hover:bg-[#F9F4EC] hover:text-[#8B0000]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t.navProducts}</span>
            </button>
            <button
              onClick={() => onNavigate && onNavigate('about')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                currentView === 'about'
                  ? 'bg-[#8B0000] text-white font-bold shadow-2xs'
                  : 'hover:bg-[#F9F4EC] hover:text-[#8B0000]'
              }`}
            >
              {t.navAbout}
            </button>
            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                currentView === 'contact'
                  ? 'bg-[#8B0000] text-white font-bold shadow-2xs'
                  : 'hover:bg-[#F9F4EC] hover:text-[#8B0000]'
              }`}
            >
              {t.navContact}
            </button>
          </nav>

          {/* Search Bar - Desktop (Kept exactly intact) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-4 py-2 text-sm bg-[#F9F4EC] border border-[#EAD8C0] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] placeholder-[#2D241E]/50 transition-all text-[#2D241E]"
              />
              <Search className="w-4 h-4 text-[#8B0000]/60 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Actions & Utilities - Sleek proportions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Custom Tailoring Button */}
            <button
              onClick={onOpenCustomOrder}
              className="hidden lg:flex items-center gap-1 px-3.5 py-1.5 bg-[#8B0000] text-white hover:bg-[#A52A2A] rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors shadow-xs shrink-0"
            >
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>{t.customOrderBtn}</span>
            </button>

            {/* Currency Selector */}
            <button
              onClick={() => onCurrencyChange(currency === 'ETB' ? 'USD' : 'ETB')}
              className="px-2 py-1 text-[11px] font-semibold rounded-md border border-[#EAD8C0] bg-white text-[#2D241E] hover:border-[#8B0000] transition-colors"
              title="Toggle currency"
            >
              {currency}
            </button>

            {/* 3-Way Language Selector */}
            <div className="flex items-center rounded-md border border-[#EAD8C0] bg-white p-0.5 text-[11px] font-semibold shadow-2xs">
              <button
                type="button"
                onClick={() => onLanguageChange('am')}
                className={`px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] transition-colors ${
                  language === 'am' 
                    ? 'bg-[#8B0000] text-white font-bold' 
                    : 'text-[#2D241E] hover:text-[#8B0000]'
                }`}
                title="አማርኛ"
              >
                አማ
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('ti')}
                className={`px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] transition-colors ${
                  language === 'ti' 
                    ? 'bg-[#8B0000] text-white font-bold' 
                    : 'text-[#2D241E] hover:text-[#8B0000]'
                }`}
                title="ትግርኛ"
              >
                ትግ
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] transition-colors ${
                  language === 'en' 
                    ? 'bg-[#8B0000] text-white font-bold' 
                    : 'text-[#2D241E] hover:text-[#8B0000]'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              id="cart-button"
              className="relative p-2 rounded-full bg-[#2D241E] text-white hover:bg-[#8B0000] transition-colors flex items-center justify-center shadow-xs"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F9F4EC]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A059] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#FDFCF8]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[#2D241E] hover:text-[#8B0000] rounded-md"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 text-sm bg-[#F9F4EC] border border-[#EAD8C0] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] text-[#2D241E]"
            />
            <Search className="w-4 h-4 text-[#8B0000]/60 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Mobile Expandable Drawer */}
        {mobileMenuOpen && (
          <div className="mt-2.5 pt-2.5 border-t border-[#EAD8C0] md:hidden flex flex-col gap-2.5">
            {/* Mobile Page Navigation Grid */}
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold text-left transition-colors flex items-center gap-1.5 ${
                  currentView === 'home'
                    ? 'bg-[#8B0000] text-white'
                    : 'bg-[#F9F4EC] text-[#2D241E] hover:bg-[#EAD8C0]/50'
                }`}
              >
                <span>🏠</span>
                <span>{t.navHome}</span>
              </button>

              <button
                onClick={() => {
                  if (onNavigate) onNavigate('products');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold text-left transition-colors flex items-center gap-1.5 ${
                  currentView === 'products' || currentView === 'catalog'
                    ? 'bg-[#8B0000] text-white'
                    : 'bg-[#F9F4EC] text-[#2D241E] hover:bg-[#EAD8C0]/50'
                }`}
              >
                <span>🛍️</span>
                <span>{t.navProducts}</span>
              </button>

              <button
                onClick={() => {
                  if (onNavigate) onNavigate('about');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold text-left transition-colors flex items-center gap-1.5 ${
                  currentView === 'about'
                    ? 'bg-[#8B0000] text-white'
                    : 'bg-[#F9F4EC] text-[#2D241E] hover:bg-[#EAD8C0]/50'
                }`}
              >
                <span>📖</span>
                <span>{t.navAbout}</span>
              </button>

              <button
                onClick={() => {
                  if (onNavigate) onNavigate('contact');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold text-left transition-colors flex items-center gap-1.5 ${
                  currentView === 'contact'
                    ? 'bg-[#8B0000] text-white'
                    : 'bg-[#F9F4EC] text-[#2D241E] hover:bg-[#EAD8C0]/50'
                }`}
              >
                <span>📞</span>
                <span>{t.navContact}</span>
              </button>
            </div>

            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between px-2 py-1 bg-[#F9F4EC] rounded-lg border border-[#EAD8C0]">
              <span className="text-xs font-semibold text-[#2D241E] flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#8B0000]" />
                {language === 'ti' ? 'ቋንቋ ምረጹ' : language === 'am' ? 'ቋንቋ ይምረጡ' : 'Language'}:
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onLanguageChange('am')}
                  className={`px-2 py-1 rounded text-xs font-bold ${language === 'am' ? 'bg-[#8B0000] text-white' : 'text-[#2D241E] bg-white border border-[#EAD8C0]'}`}
                >
                  አማርኛ
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('ti')}
                  className={`px-2 py-1 rounded text-xs font-bold ${language === 'ti' ? 'bg-[#8B0000] text-white' : 'text-[#2D241E] bg-white border border-[#EAD8C0]'}`}
                >
                  ትግርኛ
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('en')}
                  className={`px-2 py-1 rounded text-xs font-bold ${language === 'en' ? 'bg-[#8B0000] text-white' : 'text-[#2D241E] bg-white border border-[#EAD8C0]'}`}
                >
                  English
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                onOpenCustomOrder();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 bg-[#8B0000] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{t.customOrderBtn}</span>
            </button>
            
            <div className="flex items-center justify-between text-xs text-[#2D241E]/80 px-1 py-0.5">
              <span className="flex items-center gap-1 truncate max-w-[210px]">
                <MapPin className="w-3.5 h-3.5 text-[#8B0000] shrink-0" />
                <span className="truncate">{currentAddress}</span>
              </span>
              <a href={`tel:${STORE_INFO.phone}`} className="font-bold text-[#8B0000] shrink-0">
                {STORE_INFO.phoneDisplay}
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 py-1.5 bg-[#25D366]/10 text-[#17853f] rounded-lg text-xs font-bold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </a>
              <a
                href={STORE_INFO.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 py-1.5 bg-[#29b6f6]/10 text-[#0f6c96] rounded-lg text-xs font-bold"
              >
                <Send className="w-3.5 h-3.5" />
                Telegram
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="tibeb-border w-full"></div>
    </header>
  );
};
