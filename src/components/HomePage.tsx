import React, { useState, useMemo } from 'react';
import { Product, Language, CartItem, CategoryGroupId } from '../types';
import { ProductCard } from './ProductCard';
import { getTranslation } from '../data/translations';
import { STORE_INFO } from '../data/categories';
import { 
  Sparkles, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  Scissors, 
  CheckCircle2, 
  Truck, 
  Clock, 
  Star,
  ChevronRight,
  Flame,
  MessageCircle,
  Gem
} from 'lucide-react';
import { 
  imgWedding, 
  imgMeles, 
  imgCouple, 
  imgAxum, 
  imgCoffee, 
  imgRaya 
} from '../data/products';

interface HomePageProps {
  products: Product[];
  language: Language;
  currency: 'ETB' | 'USD';
  onOpenDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  cart: CartItem[];
  onNavigateToProducts: (group?: CategoryGroupId, tag?: string) => void;
  onOpenCustomOrder: () => void;
  onAboutClick: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  language,
  currency,
  onOpenDetails,
  onAddToCart,
  cart,
  onNavigateToProducts,
  onOpenCustomOrder,
  onAboutClick
}) => {
  const t = getTranslation(language);
  const isAm = language === 'am';
  const isTi = language === 'ti';

  // State for Best Sellers tab
  const [bestSellerTab, setBestSellerTab] = useState<'all' | 'wedding' | 'couples' | 'chiffon'>('all');

  // Featured / Best Sellers Products
  const bestSellers = useMemo(() => {
    return products.filter(p => {
      if (bestSellerTab === 'all') return p.featured || p.badge === 'ተወዳጅ';
      if (bestSellerTab === 'wedding') return p.hashtags.some(h => ['#የሰርግ', '#የመልስ'].some(w => h.includes(w)));
      if (bestSellerTab === 'couples') return p.hashtags.some(h => ['#የጥንዶች_ልብስ', '#የካፕል', '#የወንድ'].some(w => h.includes(w)));
      if (bestSellerTab === 'chiffon') return p.hashtags.some(h => ['#ሽፎን', '#የሳባጨርቅ_ልብስ'].some(w => h.includes(w)));
      return true;
    }).slice(0, 8);
  }, [products, bestSellerTab]);

  // New Arrivals Products (sorted or recent items)
  const newArrivals = useMemo(() => {
    return products.filter(p => p.badge === 'አዲስ' || p.categoryGroup === 'events').slice(0, 4);
  }, [products]);

  // Curated Visual Categories
  const categoryTiles = [
    {
      id: 'wedding',
      nameAm: 'የሰርግ አልባሳት',
      nameTi: 'ናይ መርዓ ክዳውንቲ',
      nameEn: 'Royal Wedding Gowns',
      tag: '#የሰርግ',
      group: 'events' as CategoryGroupId,
      count: products.filter(p => p.hashtags.includes('#የሰርግ')).length,
      image: imgWedding,
      highlightAm: 'ከነነጠላው የተሰሩ የሙሽራ ቀሚሶች',
      highlightTi: 'ምስ ነጸልኡ ዝተሰርሐ ናይ መርዓ ቀሚሽ',
      highlightEn: 'Handwoven bridal sets with Netela',
    },
    {
      id: 'meles',
      nameAm: 'የመልስ አልባሳት',
      nameTi: 'ናይ መልሲ ክዳውንቲ',
      nameEn: 'Meles & Royal Tibeb',
      tag: '#የመልስ',
      group: 'events' as CategoryGroupId,
      count: products.filter(p => p.hashtags.includes('#የመልስ')).length,
      image: imgMeles,
      highlightAm: 'የወርቅ ጥልፍና ባህላዊ ድምቀት',
      highlightTi: 'ናይ ወርቂ ጥልፍን ባህላዊ ጽባቐን',
      highlightEn: 'Gold thread embroidery & regal color',
    },
    {
      id: 'couples',
      nameAm: 'የጥንዶችና የወንዶች አልባሳት',
      nameTi: 'ናይ መጻምድትን ተባዕትዮን',
      nameEn: 'Couples & Matching Sets',
      tag: '#የጥንዶች_ልብስ',
      group: 'men_couples' as CategoryGroupId,
      count: products.filter(p => p.hashtags.some(h => h.includes('ጥንዶች') || h.includes('ካፕል') || h.includes('ወንድ'))).length,
      image: imgCouple,
      highlightAm: 'የተጣመሩ የሙሽሮችና የጥንዶች ልብስ',
      highlightTi: 'ዝተጣመሩ ናይ መርዓውትን ጥንዲን ክዳውንቲ',
      highlightEn: 'Coordinated couple sets for weddings',
    },
    {
      id: 'fetel',
      nameAm: 'የኣክሱም ፈትል አልባሳት',
      nameTi: 'ናይ ኣኽሱም ፈትሊ',
      nameEn: 'Axum Handspun Fetel',
      tag: '#የኣክሱም_ፈትል',
      group: 'heritage_fabrics' as CategoryGroupId,
      count: products.filter(p => p.hashtags.includes('#የኣክሱም_ፈትል')).length,
      image: imgAxum,
      highlightAm: '100% ንጹህ የተፈተለ የጥጥ ጥበብ',
      highlightTi: '100% ጽሩይ ናይ ፈትሊ ጡጥ ኢደ-ጥበብ',
      highlightEn: '100% authentic pure handspun cotton',
    },
    {
      id: 'chiffon',
      nameAm: 'ዘመናዊ ሽፎኖች',
      nameTi: 'ዘመናዊ ሺፎናት',
      nameEn: 'Flowing Silk Chiffon',
      tag: '#ሽፎን',
      group: 'heritage_fabrics' as CategoryGroupId,
      count: products.filter(p => p.hashtags.some(h => h.includes('ሽፎን') || h.includes('ሳባ'))).length,
      image: imgCoffee,
      highlightAm: 'ቀለል ያሉና ለስላሳ ሽፎኖች',
      highlightTi: 'ቀለልትን ልስሉሳትን ሺፎናት',
      highlightEn: 'Lightweight & comfortable heritage',
    },
    {
      id: 'raya',
      nameAm: 'ባህላዊ የብሔር አልባሳት',
      nameTi: 'ናይ ብሄር ባህላዊ ክዳውንቲ',
      nameEn: 'Regional Heritage Attires',
      tag: '#የራያ_ልብስ',
      group: 'heritage_fabrics' as CategoryGroupId,
      count: products.filter(p => p.hashtags.some(h => h.includes('ራያ') || h.includes('ወሎ') || h.includes('ኦሮሞ'))).length,
      image: imgRaya,
      highlightAm: 'የራያ፣ የወሎ እና የጎንደር ጥበቦች',
      highlightTi: 'ናይ ራያ፣ ወሎን ጎንደርን ጥበባት',
      highlightEn: 'Raya, Wollo & regional heritage',
    },
  ];

  // Occasion Pills
  const occasionTags = [
    { tag: '#የሰርግ', am: '💍 የሰርግ (Wedding)', ti: '💍 ናይ መርዓ', en: '💍 Wedding' },
    { tag: '#የመልስ', am: '👑 የመልስ (Meles)', ti: '👑 ናይ መልሲ', en: '👑 Meles' },
    { tag: '#የጥንዶች_ልብስ', am: '💑 የጥንዶች (Couples)', ti: '💑 ናይ መጻምድቲ', en: '💑 Couples' },
    { tag: '#የኣክሱም_ፈትል', am: '✨ የኣክሱም ፈትል', ti: '✨ ኣኽሱም ፈትሊ', en: '✨ Axum Fetel' },
    { tag: '#ሽፎን', am: '🌸 ሽፎን (Chiffon)', ti: '🌸 ሺፎን', en: '🌸 Chiffon' },
    { tag: '#ጥምቀት', am: '⛪ ጥምቀት (Timket)', ti: '⛪ ጥምቀት', en: '⛪ Timket' },
    { tag: '#የቡና_ቁርስ', am: '☕ የቡና ቁርስ', ti: '☕ ናይ ቡና', en: '☕ Coffee Ceremony' },
    { tag: '#የምርቃት_ልብስ', am: '🎓 የምርቃት', ti: '🎓 ናይ ምረቓ', en: '🎓 Graduation' },
  ];

  return (
    <div className="bg-[#FDFCF8] text-[#2D241E]">
      
      {/* 1. E-COMMERCE PROMOTIONAL HERO BANNER */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#F9F4EC] to-[#FDFCF8] border-b border-[#EAD8C0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Hero Sales Text & CTAs */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-[#EAD8C0] text-[#8B0000] text-xs font-bold rounded-full shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{isTi ? 'ሓዱሽ ስብስብ 2025 • ሽሮሜዳ' : isAm ? 'አዲስ ስብስብ 2025 • ሽሮሜዳ' : 'NEW 2025 COLLECTION • SHIROMEDA ATELIER'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#8B0000] tracking-tight leading-[1.15]">
                {isTi 
                  ? 'ናይ ሓቂ ሓበሻ ክዳውንቲ፣ ሺፎናትን መርዓን' 
                  : isAm 
                  ? 'እውነተኛ የሓበሻ አልባሳት፣ ዘመናዊ ሽፎኖችና የሰርግ ቀሚሶች' 
                  : 'Authentic Handcrafted Habesha Kemis & Chiffon Attire'}
              </h1>

              <p className="text-sm sm:text-base text-[#2D241E]/80 leading-relaxed font-sans max-w-xl">
                {isTi
                  ? '100% ጽሩይ ናይ ፈትሊ ጡጥ • ብኢድ ዝተኣልመ ናይ ወርቂ ጥልፊ • ብልክዕኩም ብሓጺር ግዜ ተሰሪሑ ዝረከብ'
                  : isAm
                  ? '100% ንጹህ የተፈተለ የጥጥ ፈትል • በሸማኔዎች የተጠለፈ የወርቅ ጥበብ • በልክዎ በኣጭር ግዜ ቀጠሮ የሚሰፋ'
                  : '100% pure handspun Axum cotton, exquisite gold-thread Tibeb, and made-to-measure tailoring delivered with care.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigateToProducts()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#8B0000] hover:bg-[#6e0000] text-white text-sm font-bold rounded-xl shadow-sm transition-all group"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isTi ? 'ምህርቲ ርአ (Shop All Products)' : isAm ? 'ሁሉንም ምርቶች ይሸምቱ' : 'Shop All Products'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onOpenCustomOrder}
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-white border-2 border-[#8B0000] text-[#8B0000] hover:bg-[#F9F4EC] text-sm font-bold rounded-xl transition-colors shadow-2xs"
                >
                  <Scissors className="w-4 h-4 text-[#8B0000]" />
                  <span>{t.customOrderBtn}</span>
                </button>

                <a
                  href={STORE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3.5 bg-[#25D366]/10 text-[#17853f] border border-[#25D366]/30 hover:bg-[#25D366]/20 text-sm font-bold rounded-xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Promotional Tagline Badge */}
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#8B0000]">
                <Tag className="w-4 h-4 text-[#C5A059]" />
                <span>
                  {isTi 
                    ? '👉 ብብዝሒ ንዘስርሑ ዓቢ ናይ መርዓ ቅናሽ ኣለና!' 
                    : isAm 
                    ? '👉 በብዛት ለሚያሰሩ ታላቅ የሰርግና የቡድን ቅናሽ!' 
                    : '👉 Special group discounts for bridal parties & families!'}
                </span>
              </div>
            </div>

            {/* Right Hero Product Card Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden bg-white border-2 border-[#EAD8C0] shadow-lg p-3">
                <div className="relative rounded-2xl overflow-hidden aspect-4/5">
                  <img
                    src={imgWedding}
                    alt="Royal Bridal Kemis"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#8B0000] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    {isTi ? 'ፍሉይ ተፈታዊ' : isAm ? 'የሰርግ ተወዳጅ' : 'Bridal Best Seller'}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                    AH-01
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="text-xs text-[#C5A059] font-bold uppercase tracking-wider">
                      {isTi ? 'ናይ መርዓ ዘውዳዊ' : isAm ? 'የሰርግ ሮያል ወርቅ ጥልፍ' : 'Royal Golden Wedding Kemis'}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-white">
                      {isTi ? 'ናይ መርዓ ቀሚሽ ምስ ነጸላ' : isAm ? 'የሰርግ ቀሚስ ከነነጠላው' : 'Bridal Kemis with Netela'}
                    </h3>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20">
                      <span className="text-base font-bold text-[#FDFCF8]">
                        {currency === 'USD' ? '$185 USD' : '22,000 ETB'}
                      </span>
                      <button
                        onClick={() => onNavigateToProducts('events', '#የሰርግ')}
                        className="px-3 py-1.5 bg-[#C5A059] hover:bg-[#b08b43] text-[#2D241E] text-xs font-bold rounded-lg transition-colors shadow-2xs"
                      >
                        {isTi ? 'ዝርዝር ርአ →' : isAm ? 'ይመልከቱ →' : 'Shop Now →'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Trust Guarantees Bar directly below Hero */}
          <div className="mt-10 pt-6 border-t border-[#EAD8C0] grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#EAD8C0] shadow-2xs">
              <Truck className="w-4 h-4 text-[#8B0000] shrink-0" />
              <div>
                <span className="font-bold block text-[#2D241E]">{isTi ? 'ፈጣን ምብጻሕ' : isAm ? 'ፈጣን የማድረስ አገልግሎት' : 'Worldwide Delivery'}</span>
                <span className="text-[11px] text-[#2D241E]/70">DHL & FedEx Express</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#EAD8C0] shadow-2xs">
              <Gem className="w-4 h-4 text-[#C5A059] shrink-0" />
              <div>
                <span className="font-bold block text-[#2D241E]">{isTi ? '100% ጽሩይ ፈትሊ' : isAm ? '100% ንጹህ የፈትል ጥጥ' : '100% Pure Handspun'}</span>
                <span className="text-[11px] text-[#2D241E]/70">{isTi ? 'ናይ ኣኽሱም ሸማኔታት' : isAm ? 'የአክሱም ሸማኔዎች ጥበብ' : 'Direct from Artisans'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#EAD8C0] shadow-2xs">
              <Clock className="w-4 h-4 text-[#2E4739] shrink-0" />
              <div>
                <span className="font-bold block text-[#2D241E]">{isTi ? 'ብሓጺር ግዜ ቆጸራ' : isAm ? 'በኣጭር ግዜ ቀጠሮ' : 'Fast 3–5 Day Tailoring'}</span>
                <span className="text-[11px] text-[#2D241E]/70">{isTi ? 'ብልክዕኩም ዝስራሕ' : isAm ? 'በልክዎ የሚዘጋጅ' : 'Bespoke fit guaranteed'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#EAD8C0] shadow-2xs">
              <Tag className="w-4 h-4 text-[#8B0000] shrink-0" />
              <div>
                <span className="font-bold block text-[#2D241E]">{isTi ? 'ናይ ጅምላ ቅናሽ' : isAm ? 'የጅምላና የሰርግ ቅናሽ' : 'Bridal Party Discounts'}</span>
                <span className="text-[11px] text-[#2D241E]/70">{isTi ? 'ንሚዜታትን ስድራቤትን' : isAm ? 'ለሚዜዎችና ለቡድን' : 'Special package pricing'}</span>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* 2. SHOP BY CATEGORY - VISUAL TILES */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241E] tracking-tight">
              {t.shopByCategory}
            </h2>
            <p className="text-xs sm:text-sm text-[#2D241E]/75 mt-1">
              {isTi 
                ? 'ብዝደለይዎ ዓይነት በዓል፣ ጨርቂ ወይ ባህላዊ ቅዲ ምረጹ' 
                : isAm 
                ? 'በሚፈልጉት የዝግጅት አይነት፣ የጨርቅ ጥራት ወይም ባህላዊ ቅጥ ይምረጡ' 
                : 'Explore collections by occasion, handspun fabric, and style'}
            </p>
          </div>
          <button
            onClick={() => onNavigateToProducts()}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B0000] hover:underline self-start sm:self-auto"
          >
            <span>{t.viewAllProductsBtn}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Category Tiles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categoryTiles.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigateToProducts(cat.group, cat.tag)}
              className="group relative rounded-2xl overflow-hidden aspect-3/4 border border-[#EAD8C0] bg-white cursor-pointer shadow-xs hover:shadow-md transition-all flex flex-col justify-end"
            >
              <img
                src={cat.image}
                alt={cat.nameEn}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent"></div>
              
              <div className="relative p-3 text-white z-10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] block">
                  {cat.count} {isTi ? 'ምህርቲ' : isAm ? 'አልባሳት' : 'Styles'}
                </span>
                <h3 className="font-serif font-bold text-xs sm:text-sm text-white group-hover:text-amber-200 transition-colors">
                  {isTi ? cat.nameTi : isAm ? cat.nameAm : cat.nameEn}
                </h3>
                <span className="text-[10px] text-white/70 block line-clamp-1 mt-0.5">
                  {isTi ? cat.highlightTi : isAm ? cat.highlightAm : cat.highlightEn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 3. BEST SELLERS & FEATURED PRODUCTS SHOWCASE */}
      <section className="py-12 sm:py-16 bg-[#F9F4EC] border-y border-[#EAD8C0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#EAD8C0] rounded-full text-xs font-bold text-[#8B0000] mb-2 shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.bestSellersTitle}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#8B0000]">
                {isTi ? 'ተፈተውቲ ናይ ሓበሻ ክዳውንቲ' : isAm ? 'በጣም ተወዳጅ የሓበሻ አልባሳት' : 'Customer Favorite Attires'}
              </h2>
              <p className="text-xs sm:text-sm text-[#2D241E]/75 mt-1">
                {isTi 
                  ? 'ካብ ደንበኛታትና ብብዝሒ ዝተሓተቱ ናይ መርዓ፣ ናይ መልሲ፣ ናይ ጥንዲን ሺፎንን ምርጫታት' 
                  : isAm 
                  ? 'በደንበኞቻችን በከፍተኛ ሁኔታ የተመረጡ የሰርግ፣ የመልስ፣ የጥንዶችና የሽፎን ምርጥ ዲዛይኖች' 
                  : 'Our most requested handwoven styles for weddings, holidays, and celebrations'}
              </p>
            </div>

            {/* Sub Tabs */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#EAD8C0] self-start md:self-auto overflow-x-auto max-w-full">
              <button
                onClick={() => setBestSellerTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  bestSellerTab === 'all'
                    ? 'bg-[#8B0000] text-white shadow-2xs'
                    : 'text-[#2D241E]/70 hover:text-[#8B0000]'
                }`}
              >
                {isTi ? 'ኩሉ' : isAm ? 'ሁሉም' : 'All'}
              </button>
              <button
                onClick={() => setBestSellerTab('wedding')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  bestSellerTab === 'wedding'
                    ? 'bg-[#8B0000] text-white shadow-2xs'
                    : 'text-[#2D241E]/70 hover:text-[#8B0000]'
                }`}
              >
                {isTi ? 'ናይ መርዓ' : isAm ? 'ሰርግና መልስ' : 'Weddings'}
              </button>
              <button
                onClick={() => setBestSellerTab('couples')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  bestSellerTab === 'couples'
                    ? 'bg-[#8B0000] text-white shadow-2xs'
                    : 'text-[#2D241E]/70 hover:text-[#8B0000]'
                }`}
              >
                {isTi ? 'ናይ ጥንዲ' : isAm ? 'ጥንዶችና ወንዶች' : 'Couples & Men'}
              </button>
              <button
                onClick={() => setBestSellerTab('chiffon')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  bestSellerTab === 'chiffon'
                    ? 'bg-[#8B0000] text-white shadow-2xs'
                    : 'text-[#2D241E]/70 hover:text-[#8B0000]'
                }`}
              >
                {isTi ? 'ሺፎን' : isAm ? 'ሽፎኖች' : 'Chiffon'}
              </button>
            </div>
          </div>

          {/* Products Grid */}
          {bestSellers.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
              {bestSellers.map((product) => {
                const inCart = cart.some((c) => c.product.id === product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    language={language}
                    currency={currency}
                    onOpenDetails={(p) => onOpenDetails(p)}
                    onAddToCart={(p) => onAddToCart(p)}
                    onSelectHashtag={(tag) => onNavigateToProducts(undefined, tag)}
                    isAddedToCart={inCart}
                  />
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[#EAD8C0] p-8 sm:p-12 text-center max-w-md mx-auto shadow-xs">
              <div className="w-14 h-14 rounded-full bg-[#F9F4EC] border border-[#EAD8C0] flex items-center justify-center mx-auto mb-3 text-[#8B0000]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-[#2D241E] text-base mb-1">
                {isTi ? 'ክዳውንቲ ኣብ ምድላው ኣለዉ' : isAm ? 'አልባሳት በመዘጋጀት ላይ ናቸው' : 'Catalog Being Updated'}
              </h3>
              <p className="text-xs text-[#2D241E]/70 mb-4">
                {isTi 
                  ? 'ኣብዚ ሕጂ እዋን ሓደሽቲ ክዳውንቲ ይስፈዩ ኣለዉ። ብኣድሚን ፔጅ ወይ ብትእዛዝ ክዳንኩም ክትሓቱ ትኽእሉ ኢኹም።' 
                  : isAm 
                  ? 'በዚህ ወቅት አዳዲስ አልባሳት እየተሰፉ ይገኛሉ። በአድሚን ገፅ ወይም በልዩ ትዕዛዝ ልብስዎን ማሰራት ይችላሉ።' 
                  : 'New authentic attires are currently being woven. You can add items via the Admin panel or request bespoke made-to-measure tailoring.'}
              </p>
              <button
                onClick={onOpenCustomOrder}
                className="px-5 py-2.5 bg-[#8B0000] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#6e0000] transition-colors"
              >
                {t.customOrderBtn}
              </button>
            </div>
          )}

          {/* View More in Catalog Button */}
          {products.length > 0 && (
            <div className="text-center mt-10">
              <button
                onClick={() => onNavigateToProducts()}
                className="inline-flex items-center gap-2 px-7 py-3 bg-white border-2 border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all"
              >
                <span>{isTi ? 'ዝያዳ ክዳውንቲ ኣብ ካታሎግ ርአ' : isAm ? 'ተጨማሪ አልባሳትን በካታሎግ ይመልከቱ' : 'View More in Full Products Catalog'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </section>


      {/* 4. SPECIAL PROMOTIONAL BANNER: BRIDAL PARTY & BULK PACKAGES */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-r from-[#8B0000] via-[#750000] to-[#500000] rounded-3xl p-6 sm:p-12 text-white shadow-md relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 text-xs font-bold text-[#FDFCF8]">
                <Tag className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{t.bridalSpecialTitle}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
                {isTi 
                  ? 'ንመርዓ ሚዜታትን ንስድራቤትን ፍሉይ ናይ ጅምላ ቅናሽ' 
                  : isAm 
                  ? 'ለሰርግ ሚዜዎች፣ ለቡድን እና ለቤተሰብ አልባሳት ታላቅ ቅናሽ' 
                  : 'Special Coordinated Packages for Bridal Parties & Large Families'}
              </h2>
              <p className="text-xs sm:text-sm text-white/85 max-w-2xl leading-relaxed">
                {isTi
                  ? 'ንመርዓኹም ዝሰማማዕ ናይ ሚዜታት ቀሚሽ፣ ናይ መርዓዊ ክዳን፣ ናይ ስድራቤት ስብስብ ብተመሳሳሊ ጥልፍን ቀለምን ብፍትሓዊ ዋጋ ብሓጺር ግዜ ነዳልወልኩም።'
                  : isAm
                  ? 'ለሰርግዎ ተስማሚ የሆኑ የሚዜዎች ቀሚስ፣ የሙሽራ ልብስ፣ የቤተሰብ ስብስብ በተመሳሳይ ጥበብና ቀለም በታላቅ ቅናሽ በኣጭር ግዜ ሰርተን እናስረክባለን።'
                  : 'Planning a wedding? We create coordinated bridesmaids kemis, grooms attire, and family sets with uniform Tibeb patterns and colors, supported by special bulk pricing.'}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigateToProducts('events', '#የሰርግ')}
                  className="px-6 py-3 bg-[#C5A059] hover:bg-[#b08b43] text-[#2D241E] text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors"
                >
                  {isTi ? 'ናይ መርዓ ስብስብ ርአ' : isAm ? 'የሰርግ ስብስቦችን ይመልከቱ' : 'Shop Wedding Attires'}
                </button>
                <button
                  onClick={onOpenCustomOrder}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs sm:text-sm font-bold rounded-xl transition-colors"
                >
                  {isTi ? 'ናይ ሚዜታት ዓቐን ስደዱ' : isAm ? 'የሚዜዎች ልክ ያስገቡ' : 'Submit Group Measurements'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-white/10 backdrop-blur-xs p-6 rounded-2xl border border-white/20 text-center w-full max-w-xs space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#C5A059] text-[#2D241E] flex items-center justify-center mx-auto font-serif font-bold text-lg">
                  %
                </div>
                <div className="text-xl font-serif font-bold text-white">
                  {isTi ? 'ክሳብ 20% ቅናሽ' : isAm ? 'እስከ 20% የቡድን ቅናሽ' : 'Up to 20% Off'}
                </div>
                <p className="text-[11px] text-white/80">
                  {isTi 
                    ? 'ን 5 ወይ ካብኡ ንላዕሊ ክዳውንቲ ምስ ዝእዘዝ' 
                    : isAm 
                    ? 'ከ 5 እና ከዚያ በላይ አልባሳት ሲያሰሩ የሚደረግ ቅናሽ' 
                    : 'Applicable on orders of 5 or more coordinated dresses'}
                </p>
                <div className="pt-2 border-t border-white/20 text-xs font-bold text-[#FDFCF8]">
                  {STORE_INFO.phoneDisplay}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 5. NEW ARRIVALS */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#EAD8C0]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F9F4EC] border border-[#EAD8C0] rounded-full text-xs font-bold text-[#8B0000] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{t.newArrivalsTitle}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241E]">
              {isTi ? 'ሓደሽቲ ናይ 2025 ዲዛይናት' : isAm ? 'አዳዲስ የ 2025 ዲዛይኖች' : 'Latest Season New Arrivals'}
            </h2>
            <p className="text-xs sm:text-sm text-[#2D241E]/75 mt-1">
              {isTi 
                ? 'ናይ ሎሚ ሰሙን ካብ ሸማኔታትና ዝወጹ ሓደሽቲ ባህላዊ አልባሳት' 
                : isAm 
                ? 'በዚህ ሳምንት ከሸማኔዎቻችን እጅ የወጡ አዳዲስ የሓበሻ አልባሳትና ሽፎኖች' 
                : 'Freshly finished on the handlooms of Shiromeda this week'}
            </p>
          </div>
          <button
            onClick={() => onNavigateToProducts()}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B0000] hover:underline"
          >
            <span>{t.viewAllProductsBtn}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {newArrivals.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {newArrivals.map((product) => {
              const inCart = cart.some((c) => c.product.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  language={language}
                  currency={currency}
                  onOpenDetails={(p) => onOpenDetails(p)}
                  onAddToCart={(p) => onAddToCart(p)}
                  onSelectHashtag={(tag) => onNavigateToProducts(undefined, tag)}
                  isAddedToCart={inCart}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-[#F9F4EC] rounded-2xl border border-[#EAD8C0] p-6 text-center text-xs text-[#2D241E]/70 max-w-md mx-auto">
            {isTi 
              ? 'ሓደሽቲ ናይ 2025 ዲዛይናት ኣብ ቀረባ ግዜ ክስቀሉ እዮም!' 
              : isAm 
              ? 'አዳዲስ የ 2025 ዲዛይኖች በቅርቡ ወደ ዳታቤዙ ይሰቀላሉ!' 
              : 'New 2025 seasonal arrivals are currently being crafted in Shiromeda.'}
          </div>
        )}
      </section>


      {/* 6. SHOP BY OCCASION PILLS CLOUD */}
      <section className="py-12 sm:py-16 bg-[#F9F4EC] border-y border-[#EAD8C0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2D241E] mb-2">
            {t.shopByOccasionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#2D241E]/75 max-w-lg mx-auto mb-6">
            {isTi 
              ? 'ንመርዓ፣ ንመልሲ፣ ንጥምቀት፣ ንምረቓ ወይ ንዕለታዊ ክብረ-በዓል ዘድልዩኹም ክዳውንቲ ብቐሊሉ ምረጹ' 
              : isAm 
              ? 'ለሰርግ፣ ለመልስ፣ ለጥምቀት፣ ለምርቃት ወይም ለዕለታዊ ባህላዊ ዝግጅቶች የሚፈልጉትን አልባሳት በቀላሉ ይምረጡ' 
              : 'Find the ideal traditional dress tailored for every sacred ceremony & event'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
            {occasionTags.map((occ) => (
              <button
                key={occ.tag}
                onClick={() => onNavigateToProducts(undefined, occ.tag)}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#EAD8C0] text-[#2D241E] hover:border-[#8B0000] hover:text-[#8B0000] hover:shadow-2xs text-xs font-bold transition-all"
              >
                {isTi ? occ.ti : isAm ? occ.am : occ.en}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={onAboutClick}
              className="text-xs text-[#8B0000] hover:underline font-bold inline-flex items-center gap-1"
            >
              <span>{isTi ? 'ብዛዕባ ኣቤል ሓበሻ ታሪኽን ስራሕን ዝያዳ ንምንባብ →' : isAm ? 'ስለ አቤል ሓበሻ ታሪክና የእደ-ጥበብ ስራዎች የበለጠ ለማንበብ →' : 'Learn more about Abel Habesha heritage & story →'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. ALL PRODUCTS DIRECT ACTION FOOTER STRIP */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white border-2 border-[#EAD8C0] p-8 sm:p-10 rounded-3xl shadow-xs max-w-3xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#8B0000] mb-2">
            {isTi ? 'ምሉእ ካታሎግና ክትርእዩ ትደልዩዶ?' : isAm ? 'ሙሉውን የአልባሳት ካታሎግ ማሰስ ይፈልጋሉ?' : 'Looking to browse our entire catalog?'}
          </h3>
          <p className="text-xs sm:text-sm text-[#2D241E]/75 mb-6">
            {isTi 
              ? `${products.length} ዝተፈላለዩ ናይ ሓበሻ ቀሚሻት፣ ሺፎናት፣ ናይ መርዓን ናይ ወዲ ተባዕታይን ክዳውንቲ ተዳልዮምልኩም ኣለዉ።` 
              : isAm 
              ? `${products.length} የተለያዩ የሓበሻ ቀሚሶች፣ ሽፎኖች፣ የሰርግና የወንዶች አልባሳት ተዘጋጅተው ይጠብቁዎታል።` 
              : `Explore all ${products.length} handspun Habesha Kemis, Chiffon dresses, wedding attires, and couples sets.`}
          </p>
          <button
            onClick={() => onNavigateToProducts()}
            className="px-8 py-3.5 bg-[#8B0000] hover:bg-[#6e0000] text-white text-sm font-bold rounded-xl shadow-sm transition-all inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isTi ? 'ናብ ምህርቲ ገጽ ኪድ (Products Page)' : isAm ? 'ወደ ምርቶች ገጽ ይሂዱ (Products Page)' : 'Go to Products Page'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
