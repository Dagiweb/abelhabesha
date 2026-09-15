import React, { useState, useEffect, useMemo } from 'react';
import { Product, Language } from '../types';
import { getCategoryDisplay } from '../data/categories';
import { getTranslation, getProductName, getProductFabric } from '../data/translations';
import { 
  ShoppingBag, 
  MessageCircle, 
  Eye, 
  Sparkles, 
  Clock, 
  Check, 
  Scissors,
  Layers
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  language: Language;
  currency: 'ETB' | 'USD';
  exchangeRate?: number;
  onOpenDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectHashtag: (tag: string) => void;
  isAddedToCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  language,
  currency,
  exchangeRate = 135,
  onOpenDetails,
  onAddToCart,
  onSelectHashtag,
  isAddedToCart = false,
}) => {
  const t = getTranslation(language);
  const productName = getProductName(product, language);
  const productFabric = getProductFabric(product, language);

  // All images for shuffling on hover
  const allImages = useMemo(() => {
    const list = [product.image];
    if (product.secondaryImages && Array.isArray(product.secondaryImages)) {
      for (const img of product.secondaryImages) {
        if (img && typeof img === 'string' && img.trim() && !list.includes(img)) {
          list.push(img);
        }
      }
    }
    return list;
  }, [product.image, product.secondaryImages]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Shuffle / cycle images on hover
  useEffect(() => {
    if (!isHovered || allImages.length <= 1) {
      setActiveImageIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % allImages.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [isHovered, allImages.length]);

  const formatPrice = (etb: number) => {
    if (currency === 'USD') {
      const usd = Math.round(etb / exchangeRate);
      return `$${usd.toLocaleString()}`;
    }
    const currencySuffix = language === 'ti' ? 'ቅርሺ' : (language === 'am' ? 'ብር' : 'ETB');
    return `${etb.toLocaleString()} ${currencySuffix}`;
  };

  const getWhatsAppMessage = () => {
    if (language === 'ti') {
      return encodeURIComponent(
        `ሰላም ኣቤል ሓበሻ! ነዚ ባህላዊ ክዳን ክእዝዝ ደልየ አለኹ:\n\n• ስም: ${productName}\n• ኮድ: ${product.code}\n• ጨርቂ: ${productFabric}\n• ዋጋ: ${product.priceETB.toLocaleString()} ቅርሺ\n• ስእሊ: ${product.image}\n\nእባክኹም ኣሰራርሕኡን ናይ ትእዛዝ ቆፀሮን ንገሩኒ። የቐንየለይ!`
      );
    }
    if (language === 'en') {
      return encodeURIComponent(
        `Hello Abel Habesha! I would like to order this attire:\n\n• Name: ${product.nameEn}\n• Code: ${product.code}\n• Fabric: ${product.fabricEn}\n• Price: ${product.priceETB.toLocaleString()} ETB\n• Image: ${product.image}\n\nPlease let me know the tailoring turnaround and details. Thank you!`
      );
    }
    return encodeURIComponent(
      `ሰላም አቤል ሓበሻ! ይህንን አልባሳት ማዘዝ እፈልጋለሁ:\n\n• ስም: ${product.nameAm}\n• ኮድ: ${product.code}\n• ጨርቅ: ${product.fabricAm}\n• ዋጋ: ${product.priceETB.toLocaleString()} ብር\n• ፎቶ: ${product.image}\n\nእባክዎ አሰራሩን እና የትዕዛዝ ቀጠሮውን ይንገሩኝ። እናመሰግናለን!`
    );
  };

  return (
    <div 
      onClick={() => onOpenDetails(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveImageIndex(0);
      }}
      className="group flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-[#EAD8C0] overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-[#8B0000]/40 shadow-xs cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-3/4 overflow-hidden bg-[#F9F4EC]">
        <img
          src={allImages[activeImageIndex] || product.image}
          alt={productName}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 sm:top-3 inset-x-2.5 sm:inset-x-3 flex items-center justify-between gap-1.5 pointer-events-none">
          <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#2D241E]/85 backdrop-blur-md text-[#F9F4EC] text-[10px] sm:text-[11px] font-mono font-bold tracking-wider pointer-events-auto">
            {product.code}
          </span>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {allImages.length > 1 && (
              <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] font-bold flex items-center gap-1">
                <Layers className="w-2.5 h-2.5 text-[#C5A059]" />
                <span>{activeImageIndex + 1}/{allImages.length}</span>
              </span>
            )}
            {product.bestSeller && (
              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#8B0000] text-white text-[10px] sm:text-[11px] font-bold shadow-xs flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C5A059]" />
                <span>{t.bestSeller}</span>
              </span>
            )}
          </div>
        </div>

        {/* Shuffle Progress Dots on Hover if multiple images */}
        {allImages.length > 1 && (
          <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-1 pointer-events-none z-10">
            {allImages.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeImageIndex === idx 
                    ? 'w-4 bg-[#8B0000] shadow-xs' 
                    : 'w-1.5 bg-white/75 shadow-2xs'
                }`}
              />
            ))}
          </div>
        )}

        {/* Tailoring Turnaround indicator */}
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 pointer-events-none">
          <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-md text-[#2D241E] text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 shadow-xs border border-[#EAD8C0]">
            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#2E4739]" />
            <span>
              {language === 'ti' 
                ? `ኣብ ${product.tailoringDays} መዓልቲ` 
                : language === 'am' 
                ? `በ${product.tailoringDays} ቀናት` 
                : `${product.tailoringDays} days`}
            </span>
          </span>
        </div>

        {/* Quick View Overlay Button */}
        <div className="hidden sm:flex absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center gap-2 text-white font-bold text-xs pointer-events-none">
          <span className="px-4 py-2 rounded-xl bg-[#8B0000] text-white backdrop-blur-sm border border-white/20 flex items-center gap-1.5 shadow-lg">
            <Eye className="w-4 h-4 text-[#C5A059]" />
            <span>{t.viewFullDetails}</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-3 sm:p-5">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-1.5 sm:mb-2">
          {product.hashtags.slice(0, 2).map((tag) => (
            <button
              key={tag}
              onClick={(e) => {
                e.stopPropagation();
                onSelectHashtag(tag);
              }}
              className="text-[10px] sm:text-[11px] font-bold text-[#8B0000] bg-[#F9F4EC] hover:bg-[#EAD8C0] px-2 py-0.5 rounded-md transition-colors"
            >
              {getCategoryDisplay(tag, language)}
            </button>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-[#2D241E] text-xs sm:text-base group-hover:text-[#8B0000] transition-colors line-clamp-2 mb-1 sm:mb-1.5">
          {productName}
        </h3>

        {/* Fabric Type */}
        <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs text-[#2D241E]/70 mb-2 sm:mb-3">
          <Scissors className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C5A059] shrink-0" />
          <span className="line-clamp-1 font-medium">
            {productFabric}
          </span>
        </div>

        {/* Price & Action Section */}
        <div className="mt-auto pt-2 sm:pt-3 border-t border-[#F2E8DA] flex items-baseline justify-between gap-1.5 mb-2 sm:mb-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-xl font-bold font-serif text-[#8B0000]">
                {formatPrice(product.priceETB)}
              </span>
              {product.originalPriceETB && (
                <span className="hidden sm:inline text-xs text-[#2D241E]/40 line-through">
                  {formatPrice(product.originalPriceETB)}
                </span>
              )}
            </div>
            <p className="text-[9px] sm:text-[10px] text-[#2D241E]/60 font-medium">
              {t.bulkDiscountAvailable}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className={`p-2 sm:p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center shrink-0 ${
              isAddedToCart
                ? 'bg-[#2E4739] text-white shadow-xs'
                : 'bg-[#F9F4EC] border border-[#EAD8C0] text-[#8B0000] hover:bg-[#8B0000] hover:text-white shadow-2xs'
            }`}
            title={isAddedToCart ? t.addedToBag : t.addToBag}
          >
            {isAddedToCart ? (
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>
        </div>

        {/* Quick WhatsApp Order Action */}
        <div className="pt-1">
          <a
            href={`https://wa.me/251913312314?text=${getWhatsAppMessage()}`}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#127737] text-[11px] sm:text-xs font-bold transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>{t.orderWhatsAppDirect}</span>
          </a>
        </div>
      </div>
    </div>
  );
};


