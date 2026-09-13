import React, { useState, useMemo } from 'react';
import { Product, Language, CategoryGroupId, CartItem } from '../types';
import { ProductCard } from './ProductCard';
import { CategoryNav } from './CategoryNav';
import { getCategoryDisplay } from '../data/categories';
import { getTranslation } from '../data/translations';
import { 
  Search, 
  ArrowUpDown, 
  Scissors, 
  Filter, 
  X, 
  Sparkles,
  ShoppingBag,
  SlidersHorizontal,
  Check
} from 'lucide-react';

interface ProductsPageProps {
  products: Product[];
  language: Language;
  currency: 'ETB' | 'USD';
  onOpenDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  cart: CartItem[];
  initialTag?: string | null;
  initialGroup?: CategoryGroupId;
  onOpenCustomOrder: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  language,
  currency,
  onOpenDetails,
  onAddToCart,
  cart,
  initialTag = null,
  initialGroup = 'all',
  onOpenCustomOrder,
  searchQuery: externalSearchQuery,
  onSearchChange: externalOnSearchChange,
}) => {
  const t = getTranslation(language);
  const isAm = language === 'am';
  const isTi = language === 'ti';

  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const setSearchQuery = (val: string) => {
    setInternalSearchQuery(val);
    if (externalOnSearchChange) externalOnSearchChange(val);
  };
  const [selectedGroup, setSelectedGroup] = useState<CategoryGroupId>(initialGroup);
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Count per category tag
  const productCountByTag = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((prod) => {
      prod.hashtags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Group filter
      if (selectedGroup !== 'all' && prod.categoryGroup !== selectedGroup) {
        const matchesHashtagInGroup = prod.hashtags.some((t) => {
          if (selectedGroup === 'events') {
            return ['#የሰርግ', '#የመልስ', '#የጥምቀት_ልብስ', '#የኣሸንዳ', '#የቡና', '#የምርቃት', '#የእጮኝነት'].some(h => t.includes(h));
          }
          if (selectedGroup === 'men_couples') {
            return ['#የካፕል', '#የጥንዶች_ልብስ', '#የወንድ', '#የወንዶች_ልብስ', '#የቤተሰብ_ልብስ', '#የህጻናት'].some(h => t.includes(h));
          }
          if (selectedGroup === 'heritage_fabrics') {
            return ['#የኣክሱም_ፈትል', '#የራያ_ልብስ', '#የሳባጨርቅ_ልብስ', '#የቻይናጨርቅ_ልብስ', '#የጎጃም_ፈትል', '#የወሎ_ልብስ', '#የኦሮሞ_ባህል'].some(h => t.includes(h));
          }
          return false;
        });
        if (!matchesHashtagInGroup) return false;
      }

      // Hashtag filter
      if (selectedTag && !prod.hashtags.includes(selectedTag)) {
        return false;
      }

      // In stock only filter
      if (inStockOnly && !prod.inStock) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = 
          prod.nameAm.toLowerCase().includes(q) ||
          prod.nameEn.toLowerCase().includes(q) ||
          (prod.nameTi && prod.nameTi.toLowerCase().includes(q));
        const matchesCode = prod.code.toLowerCase().includes(q);
        const matchesFabric = 
          prod.fabricAm.toLowerCase().includes(q) ||
          prod.fabricEn.toLowerCase().includes(q);
        const matchesHashtag = prod.hashtags.some((tag) => tag.toLowerCase().includes(q));
        return matchesName || matchesCode || matchesFabric || matchesHashtag;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceETB - b.priceETB;
      if (sortBy === 'price-desc') return b.priceETB - a.priceETB;
      // Default: featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [products, selectedGroup, selectedTag, inStockOnly, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGroup('all');
    setSelectedTag(null);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters = searchQuery || selectedGroup !== 'all' || selectedTag !== null || inStockOnly;

  return (
    <div className="min-h-screen bg-[#FDFCF8] py-8 sm:py-12 text-[#2D241E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="mb-6 sm:mb-8 pb-6 border-b border-[#EAD8C0]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9F4EC] text-[#8B0000] text-xs font-bold mb-2 border border-[#EAD8C0]">
                <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{isTi ? 'ምሉእ ናይ ክዳውንቲ ካታሎግ' : isAm ? 'የተሟላ የአልባሳት ካታሎግ' : 'Complete Habesha Catalog'}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#8B0000] tracking-tight">
                {isTi ? 'ኩሎም ናይ ሓበሻ ክዳውንቲ' : isAm ? 'ሁሉም የሓበሻ አልባሳትና ሽፎኖች' : 'All Habesha Dresses & Attire'}
              </h1>
              <p className="text-xs sm:text-sm text-[#2D241E]/75 mt-1 max-w-2xl">
                {isTi 
                  ? 'ካብ ጽሩይ ፈትሊ ዝተሰርሑ ናይ መርዓ፣ ናይ መልሲ፣ ናይ ጥንዲ፣ ናይ ወዲ ተባዕታይን ሺፎንን ክዳውንቲ ብዝደለይዎ ዓቐን'
                  : isAm 
                  ? 'በሽሮሜዳ ሸማኔዎች ከንጹህ ጥጥ የተፈተሉ የሰርግ፣ የመልስ፣ የጥንዶች፣ የወንዶችና ዘመናዊ የሽፎን አልባሳት ስብስብ'
                  : 'Authentic pure handspun cotton Habesha Kemis, flowing chiffon gowns, couples sets, and wedding attires.'}
              </p>
            </div>

            {/* Quick Custom Order CTA */}
            <button
              onClick={onOpenCustomOrder}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B0000] hover:bg-[#6e0000] text-white text-xs font-bold rounded-xl shadow-xs transition-colors self-start md:self-auto shrink-0"
            >
              <Scissors className="w-4 h-4" />
              <span>{t.customOrderBtn}</span>
            </button>
          </div>
        </div>

        {/* Live Search Bar on Products Page */}
        <div className="mb-6">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-10 py-3 text-sm bg-white border border-[#EAD8C0] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] placeholder-[#2D241E]/50 text-[#2D241E] shadow-2xs"
            />
            <Search className="w-4 h-4 text-[#8B0000]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 bg-stone-100 rounded-full w-5 h-5 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Navigation Bar & Hashtag Chips */}
        <div className="mb-6">
          <CategoryNav
            language={language}
            selectedTag={selectedTag}
            onSelectTag={(tag) => {
              setSelectedTag(tag);
              setSearchQuery('');
            }}
            selectedGroup={selectedGroup}
            onSelectGroup={(grp) => {
              setSelectedGroup(grp);
              setSelectedTag(null);
            }}
            productCountByTag={productCountByTag}
          />
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#EAD8C0]/70">
          {/* Result Count and Active Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs sm:text-sm font-bold text-[#2D241E]">
              {filteredProducts.length} {isTi ? 'ክዳውንቲ ተረኺቦም' : isAm ? 'አልባሳት ተገኝተዋል' : 'Items Found'}
            </span>

            {selectedTag && (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-[#8B0000] text-white font-bold rounded-lg shadow-2xs">
                <span>{getCategoryDisplay(selectedTag, language)}</span>
                <button 
                  onClick={() => setSelectedTag(null)}
                  className="hover:text-amber-200 ml-1 text-xs font-bold"
                  title="Remove filter"
                >
                  ×
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-[#2D241E] text-[#FDFCF8] rounded-lg">
                <span>"{searchQuery}"</span>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="hover:text-[#C5A059] ml-1"
                  title="Clear search"
                >
                  ×
                </button>
              </span>
            )}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-[#2E4739] text-white rounded-lg font-medium">
                <span>{isTi ? 'ኣብ መኽዘን ዘሎ' : isAm ? 'በእጅ ላይ ያለ ብቻ' : 'In Stock Only'}</span>
                <button 
                  onClick={() => setInStockOnly(false)}
                  className="hover:text-amber-200 ml-1"
                >
                  ×
                </button>
              </span>
            )}

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#8B0000] hover:underline font-semibold ml-1 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                <span>{isTi ? 'ኩሉ ኣጽሪ' : isAm ? 'ሁሉንም አጽዳ' : 'Clear All'}</span>
              </button>
            )}
          </div>

          {/* Controls Right: In Stock Toggle & Sort */}
          <div className="flex items-center gap-3 flex-wrap self-end sm:self-auto">
            {/* In Stock Toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-[#2D241E]/80">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                inStockOnly ? 'bg-[#2E4739] border-[#2E4739] text-white' : 'border-[#C5A059] bg-white'
              }`}>
                {inStockOnly && <Check className="w-3 h-3" />}
              </div>
              <span>{isTi ? 'ኣብ መኽዘን ዘሎ ጥራሕ' : isAm ? 'በእጅ ላይ ያለ ብቻ' : 'In Stock Only'}</span>
            </label>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8B0000]" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="text-xs py-1.5 px-3 bg-white border border-[#EAD8C0] rounded-xl text-[#2D241E] focus:outline-none focus:border-[#8B0000] shadow-2xs"
              >
                <option value="featured">{isTi ? 'ፍሉይ ምርጫ (Featured)' : isAm ? 'የተመረጡ (Featured)' : 'Featured'}</option>
                <option value="price-asc">{isTi ? 'ዋጋ፡ ካብ ትሑት ናብ ላዕሊ' : isAm ? 'ዋጋ፡ ከዝቅተኛ ወደ ከፍተኛ' : 'Price: Low to High'}</option>
                <option value="price-desc">{isTi ? 'ዋጋ፡ ካብ ላዕሊ ናብ ትሑት' : isAm ? 'ዋጋ፡ ከከፍተኛ ወደ ዝቅተኛ' : 'Price: High to Low'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredProducts.map((product) => {
              const inCart = cart.some((c) => c.product.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  language={language}
                  currency={currency}
                  onOpenDetails={(p) => onOpenDetails(p)}
                  onAddToCart={(p) => onAddToCart(p)}
                  onSelectHashtag={(tag) => setSelectedTag(tag)}
                  isAddedToCart={inCart}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#F9F4EC] rounded-3xl border border-[#EAD8C0] p-8 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-white mx-auto flex items-center justify-center mb-3 shadow-xs border border-[#EAD8C0]">
              <Scissors className="w-8 h-8 text-[#8B0000]" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#2D241E] mb-1">
              {isTi ? 'በዚ መጽረዪ ዝተረኽበ ክዳን የለን' : isAm ? 'በዚህ ማጣሪያ የተገኘ አልባሳት የለም' : 'No items match your search'}
            </h3>
            <p className="text-xs text-[#2D241E]/75 max-w-sm mx-auto mb-5">
              {isTi 
                ? 'እባክዎ ዝመረጽዎ መጽረዪ ይቐይሩ ወይ ብዝደለይዎ ዲዛይን ክስራሕ ትእዛዝ ሃቡና።' 
                : isAm 
                ? 'እባክዎ የተመረጠውን ማጣሪያ ይቀይሩ ወይም በፈለጉት ዲዛይን እንዲዘጋጅልዎ ትዕዛዝ ይስጡን።' 
                : 'Try clearing your filter or request a custom made-to-measure order.'}
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-[#8B0000] hover:bg-[#6e0000] text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                {isTi ? 'ኩሎም ክዳውንቲ ኣርኢ' : isAm ? 'ሁሉንም አልባሳት አሳይ' : 'Show All Items'}
              </button>
              <button
                onClick={onOpenCustomOrder}
                className="px-5 py-2.5 bg-white border border-[#EAD8C0] text-[#8B0000] rounded-xl text-xs font-bold hover:bg-[#F9F4EC] transition-colors"
              >
                {t.customOrderBtn}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
