import React, { useState, useEffect } from 'react';
import { Product, Language } from '../types';
import { STORE_INFO, getCategoryDisplay } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { getTranslation, getProductName, getProductFabric, getProductDescription } from '../data/translations';
import { 
  ArrowLeft, 
  ShoppingBag, 
  MessageCircle, 
  Send, 
  Phone, 
  Scissors, 
  Clock, 
  Ruler, 
  Check, 
  Copy, 
  Camera, 
  Share2, 
  ShieldCheck, 
  MapPin, 
  Sparkles,
  ChevronRight,
  Heart
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, measurements?: any) => void;
  language: Language;
  currency: 'ETB' | 'USD';
  exchangeRate?: number;
  onSelectCategory?: (categoryTag: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onSelectProduct,
  onAddToCart,
  language,
  currency,
  exchangeRate = 135,
  onSelectCategory,
}) => {
  const t = getTranslation(language);
  const productName = getProductName(product, language);
  const productFabric = getProductFabric(product, language);
  const productDesc = getProductDescription(product, language);
  const currentAddress = language === 'ti' ? STORE_INFO.addressTi : (language === 'am' ? STORE_INFO.addressAm : STORE_INFO.addressEn);

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [isCustomMeasurement, setIsCustomMeasurement] = useState(false);
  const [measurements, setMeasurements] = useState({ length: '', chest: '', waist: '' });
  const [copied, setCopied] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Scroll to top whenever product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImage(product.image);
    setAddedNotice(false);
  }, [product.id, product.image]);

  const images = [product.image, ...(product.secondaryImages || [])];

  const formatPrice = (etb: number) => {
    if (currency === 'USD') {
      return `$${Math.round(etb / exchangeRate).toLocaleString()}`;
    }
    const currencySuffix = language === 'ti' ? 'ቅርሺ' : (language === 'am' ? 'ብር' : 'ETB');
    return `${etb.toLocaleString()} ${currencySuffix}`;
  };

  const discountPercent = product.originalPriceETB 
    ? Math.round(((product.originalPriceETB - product.priceETB) / product.originalPriceETB) * 100)
    : null;

  // Build message for WhatsApp & Telegram
  const getOrderMessage = () => {
    const sizeText = isCustomMeasurement 
      ? (language === 'ti' 
          ? `ብልክዒ ዝስራሕ (ቁመት: ${measurements.length || '-'}, ደረት: ${measurements.chest || '-'}, ወገብ: ${measurements.waist || '-'})`
          : language === 'en'
          ? `Custom Fit (Length: ${measurements.length || '-'}, Chest: ${measurements.chest || '-'}, Waist: ${measurements.waist || '-'})`
          : `በልክ የሚዘጋጅ (ቁመት: ${measurements.length || '-'}, ደረት: ${measurements.chest || '-'}, ወገብ: ${measurements.waist || '-'})`)
      : selectedSize;

    if (language === 'ti') {
      return encodeURIComponent(
        `ሰላም ኣቤል ሓበሻ! ነዚ ባህላዊ ክዳን ክእዝዝ ደልየ አለኹ:\n\n` +
        `• ስም ክዳን: ${productName}\n` +
        `• ኮድ: ${product.code}\n` +
        `• ጨርቂ: ${productFabric}\n` +
        `• ዋጋ: ${product.priceETB.toLocaleString()} ቅርሺ\n` +
        `• መጠን/ልክዒ: ${sizeText}\n` +
        `• ናይ ቆፀሮ ግዜ: ኣብ ${product.tailoringDays} መዓልቲ ውሽጢ\n\n` +
        `እባክኹም ትእዛዘይ ኣረጋግፁለይ። የቐንየለይ!`
      );
    }

    if (language === 'en') {
      return encodeURIComponent(
        `Hello Abel Habesha! I would like to order this traditional attire:\n\n` +
        `• Attire: ${product.nameEn}\n` +
        `• Code: ${product.code}\n` +
        `• Fabric: ${product.fabricEn}\n` +
        `• Price: ${product.priceETB.toLocaleString()} ETB\n` +
        `• Size: ${sizeText}\n` +
        `• Turnaround: Within ${product.tailoringDays} days\n\n` +
        `Please confirm availability. Thank you!`
      );
    }

    return encodeURIComponent(
      `ሰላም አቤል ሓበሻ! ይህንን አልባሳት ማዘዝ እፈልጋለሁ:\n\n` +
      `• የልብስ ስም: ${product.nameAm} (${product.nameEn})\n` +
      `• የኮድ ቁጥር: ${product.code}\n` +
      `• ጨርቅ: ${product.fabricAm}\n` +
      `• ዋጋ: ${product.priceETB.toLocaleString()} ብር\n` +
      `• መጠን/ልክ: ${sizeText}\n` +
      `• የቀጠሮ ግዜ: በ ${product.tailoringDays} ቀናት ውስጥ\n\n` +
      `እባክዎ ትዕዛዜን ያረጋግጡልኝ። አመሰግናለሁ!`
    );
  };

  const handleCopyOrderInfo = () => {
    const text = 
      `${language === 'ti' ? 'ኣቤል ሓበሻ ባህላዊ ክዳውንቲ' : language === 'en' ? 'Abel Habesha Traditional Attire' : 'አቤል ሓበሻ አልባሳት'} - ${productName}\n` +
      `Code: ${product.code}\n` +
      `Price: ${formatPrice(product.priceETB)}\n` +
      `Fabric: ${productFabric}\n` +
      `Phone: ${STORE_INFO.phoneDisplay}\n` +
      `Address: ${currentAddress}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddToCart = () => {
    onAddToCart(
      product,
      isCustomMeasurement ? 'Custom Measurement' : selectedSize,
      isCustomMeasurement ? measurements : undefined
    );
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: productName,
        text: `${productName} - Abel Habesha`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Related products from same category or group
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.categoryGroup === product.categoryGroup || p.hashtags.some(t => product.hashtags.includes(t)))
  ).slice(0, 4);

  return (
    <div className="bg-[#FDFCF8] min-h-screen pb-24 sm:pb-16 text-[#2D241E]">
      
      {/* Top Breadcrumbs & Back Bar */}
      <div className="border-b border-[#EAD8C0] bg-white sticky top-16 z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#8B0000] hover:text-[#630000] transition-colors py-1 px-2.5 rounded-lg hover:bg-[#F9F4EC]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.backToCollection}</span>
          </button>

          {/* Breadcrumb path (hidden on smallest screens) */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-[#2D241E]/60 truncate max-w-md">
            <button onClick={onBack} className="hover:text-[#8B0000] transition-colors">
              {t.home}
            </button>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-[#8B0000] font-medium truncate">
              {getCategoryDisplay(product.hashtags[0] || product.categoryGroup, language)}
            </span>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-[#2D241E] font-bold truncate">
              {productName}
            </span>
          </div>

          {/* Quick Share button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D241E] bg-[#F9F4EC] hover:bg-[#EAD8C0]/50 px-3 py-1.5 rounded-xl border border-[#EAD8C0] transition-colors"
              title="Share product link"
            >
              <Share2 className="w-3.5 h-3.5 text-[#8B0000]" />
              <span className="hidden sm:inline">{t.share}</span>
            </button>

            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-2 rounded-xl border border-[#EAD8C0] transition-colors ${
                isWishlisted ? 'bg-[#8B0000] text-white' : 'bg-[#F9F4EC] text-[#2D241E] hover:text-[#8B0000]'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>

        </div>
      </div>

      {/* Main Product Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: Image Gallery Column */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Primary High-Resolution Display */}
            <div className="relative aspect-3/4 sm:aspect-4/5 rounded-3xl overflow-hidden bg-white border border-[#EAD8C0] shadow-sm">
              <img
                src={selectedImage}
                alt={productName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Product Code Badge */}
              <div className="absolute top-4 left-4 bg-[#2D241E]/85 backdrop-blur-md text-[#FDFCF8] text-xs font-mono font-bold px-3.5 py-1.5 rounded-full shadow-md">
                {product.code}
              </div>

              {/* In-Stock / Bespoke Ready Badge */}
              <div className="absolute top-4 right-4 bg-[#C5A059] text-[#2D241E] text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2D241E]" />
                <span>{t.bespokeReady}</span>
              </div>

              {/* Discount pill if available */}
              {discountPercent && (
                <div className="absolute bottom-4 left-4 bg-[#8B0000] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {discountPercent}% {t.saleTag}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === img 
                        ? 'border-[#8B0000] scale-102 shadow-md ring-2 ring-[#8B0000]/20' 
                        : 'border-transparent opacity-70 hover:opacity-100 hover:border-[#EAD8C0]'
                    }`}
                  >
                    <img src={img} alt="Product view" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Store Order Flow Notice */}
            <div className="p-4 sm:p-5 bg-[#F9F4EC] rounded-2xl border border-[#EAD8C0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000] shrink-0 mt-0.5">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#8B0000]">
                    {t.step1ScreenshotTitle}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#2D241E]/75 leading-relaxed mt-0.5">
                    {t.step1ScreenshotDesc}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyOrderInfo}
                className="self-stretch sm:self-auto flex items-center justify-center gap-1.5 text-xs font-bold px-3.5 py-2 bg-white rounded-xl text-[#8B0000] hover:bg-[#F9F4EC] transition-colors border border-[#EAD8C0] shadow-2xs shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t.copiedNotice : t.copyInfoBtn}</span>
              </button>
            </div>

            {/* Genuine Shiromeda Handcraft Guarantee */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-2xl border border-[#EAD8C0] text-center">
              <div className="space-y-1">
                <Scissors className="w-5 h-5 text-[#8B0000] mx-auto" />
                <p className="text-[11px] font-bold text-[#2D241E]">{t.handcraftedShiromeda}</p>
                <p className="text-[10px] text-[#2D241E]/60">{t.traditionalCraft}</p>
              </div>
              <div className="space-y-1 border-x border-[#EAD8C0]">
                <Clock className="w-5 h-5 text-[#2E4739] mx-auto" />
                <p className="text-[11px] font-bold text-[#2D241E]">{t.quickTurnaround}</p>
                <p className="text-[10px] text-[#2D241E]/60">
                  {language === 'ti' 
                    ? `ኣብ ${product.tailoringDays} መዓልቲ` 
                    : language === 'am' 
                    ? `${product.tailoringDays} ቀናት ብቻ` 
                    : `${product.tailoringDays} days`}
                </p>
              </div>
              <div className="space-y-1">
                <ShieldCheck className="w-5 h-5 text-[#C5A059] mx-auto" />
                <p className="text-[11px] font-bold text-[#2D241E]">{t.qualityGuarantee}</p>
                <p className="text-[10px] text-[#2D241E]/60">{t.premiumFabricNote}</p>
              </div>
            </div>

          </div>

          {/* RIGHT: Product Details & Buying Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              
              {/* Clean Category Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {product.hashtags.map((tag) => {
                  const label = getCategoryDisplay(tag, language);
                  return (
                    <button
                      key={tag}
                      onClick={() => onSelectCategory && onSelectCategory(tag)}
                      className="text-xs font-bold text-[#8B0000] bg-[#F9F4EC] hover:bg-[#EAD8C0]/60 px-3 py-1 rounded-lg transition-colors border border-[#EAD8C0]"
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#2D241E] leading-tight mb-3">
                {productName}
              </h1>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3.5 pb-4 mb-4 border-b border-[#EAD8C0]">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-[#8B0000]">
                  {formatPrice(product.priceETB)}
                </span>
                {product.originalPriceETB && (
                  <span className="text-base sm:text-lg text-[#2D241E]/40 line-through">
                    {formatPrice(product.originalPriceETB)}
                  </span>
                )}
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#C5A059]/20 text-[#8B0000]">
                  {t.specialPriceTag}
                </span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-wider font-bold text-[#2D241E]/70 mb-1.5">
                  {t.productDescHeader}
                </h3>
                <p className="text-sm sm:text-base text-[#2D241E]/80 leading-relaxed">
                  {productDesc}
                </p>
              </div>

              {/* Fabric Details & Turnaround Info */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-[#F9F4EC] border border-[#EAD8C0]">
                <div className="flex items-start gap-2.5">
                  <Scissors className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-[#2D241E]/60 uppercase font-bold block">{t.fabricTypeLabel}</span>
                    <span className="text-xs sm:text-sm font-bold text-[#2D241E]">{productFabric}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 border-l border-[#EAD8C0] pl-3">
                  <Clock className="w-5 h-5 text-[#2E4739] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-[#2D241E]/60 uppercase font-bold block">{t.deliveryLabel}</span>
                    <span className="text-xs sm:text-sm font-bold text-[#2D241E]">
                      {language === 'ti' 
                        ? `ኣብ ${product.tailoringDays} መዓልቲ ውሽጢ` 
                        : language === 'am' 
                        ? `በ${product.tailoringDays} ቀናት ውስጥ` 
                        : `In ${product.tailoringDays} days`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Size & Custom Fit Selector */}
              <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-white border border-[#EAD8C0] shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs sm:text-sm font-bold text-[#2D241E] flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-[#8B0000]" />
                    <span>{t.selectSizeLabel}</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setIsCustomMeasurement(!isCustomMeasurement)}
                    className="text-xs font-bold text-[#8B0000] hover:underline"
                  >
                    {isCustomMeasurement ? t.switchToStandardSize : t.needCustomFit}
                  </button>
                </div>

                {!isCustomMeasurement ? (
                  <div className="grid grid-cols-5 gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl border transition-all ${
                          selectedSize === sz
                            ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-sm'
                            : 'bg-[#F9F4EC] text-[#2D241E] border-[#EAD8C0] hover:border-[#8B0000]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-[#F9F4EC] rounded-xl border border-[#EAD8C0] space-y-2.5">
                    <p className="text-[11px] text-[#2D241E]/80">
                      {t.customFitHelp}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder={t.lengthPlaceholder}
                        value={measurements.length}
                        onChange={(e) => setMeasurements({ ...measurements, length: e.target.value })}
                        className="text-xs p-2 bg-white border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                      />
                      <input
                        type="text"
                        placeholder={t.chestPlaceholder}
                        value={measurements.chest}
                        onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })}
                        className="text-xs p-2 bg-white border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                      />
                      <input
                        type="text"
                        placeholder={t.waistPlaceholder}
                        value={measurements.waist}
                        onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                        className="text-xs p-2 bg-white border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Ordering Action CTAs */}
              <div className="space-y-2.5 mb-6">
                
                {/* WhatsApp & Telegram Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={`https://wa.me/251913312314?text=${getOrderMessage()}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1faa4f] text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{t.orderWhatsAppDirect}</span>
                  </a>

                  <a
                    href={`https://t.me/${STORE_INFO.telegramUser}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#29b6f6] hover:bg-[#1da5e5] text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
                  >
                    <Send className="w-5 h-5" />
                    <span>{t.orderTelegramInbox}</span>
                  </a>
                </div>

                {/* Add to Order Bag (Cart) Button */}
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
                      addedNotice 
                        ? 'bg-[#2E4739] text-white' 
                        : 'bg-[#8B0000] text-white hover:bg-[#720000]'
                    }`}
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-5 h-5 stroke-[3]" />
                        <span>{t.addedToBag}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        <span>{t.addToBag}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="py-3.5 px-4 rounded-xl border border-[#EAD8C0] text-[#8B0000] hover:bg-[#F9F4EC] flex items-center justify-center transition-colors"
                    title={t.callShopDirect}
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                </div>

              </div>

              {/* Physical Store Location Card */}
              <div className="p-4 rounded-2xl bg-[#F9F4EC] border border-[#EAD8C0] text-xs text-[#2D241E]/80 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-[#8B0000]">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{t.showroomAddressHeader}</span>
                </div>
                <p className="pl-6 text-[11px] leading-relaxed">
                  {currentAddress}
                </p>
                <div className="pl-6 pt-1 flex items-center gap-3 text-[11px]">
                  <a href={`tel:${STORE_INFO.phone}`} className="text-[#8B0000] hover:underline font-bold">
                    {STORE_INFO.phoneDisplay}
                  </a>
                  <span>•</span>
                  <span>{t.openEveryDay}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* RELATED PRODUCTS SECTION */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-10 border-t border-[#EAD8C0]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2D241E]">
                  {t.relatedAttireHeader}
                </h2>
                <p className="text-xs text-[#2D241E]/60 mt-0.5">
                  {t.relatedAttireSub}
                </p>
              </div>
              <button
                onClick={onBack}
                className="text-xs font-bold text-[#8B0000] hover:underline flex items-center gap-1"
              >
                <span>{t.viewAllSimilar}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProduct) => {
                const relProductName = getProductName(relProduct, language);
                return (
                  <div
                    key={relProduct.id}
                    onClick={() => onSelectProduct(relProduct)}
                    className="group cursor-pointer bg-white rounded-2xl border border-[#EAD8C0] overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
                  >
                    <div className="relative aspect-3/4 overflow-hidden bg-[#FDFCF8]">
                      <img
                        src={relProduct.image}
                        alt={relProductName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 bg-[#2D241E]/80 text-[#FDFCF8] text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                        {relProduct.code}
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 flex flex-col flex-1">
                      <span className="text-[11px] font-bold text-[#8B0000] mb-1">
                        {getCategoryDisplay(relProduct.hashtags[0] || '', language)}
                      </span>
                      <h3 className="font-serif font-bold text-xs sm:text-sm text-[#2D241E] line-clamp-2 mb-2 group-hover:text-[#8B0000] transition-colors">
                        {relProductName}
                      </h3>
                      <div className="mt-auto pt-2 border-t border-[#F2E8DA] flex items-center justify-between">
                        <span className="font-serif font-bold text-xs sm:text-sm text-[#8B0000]">
                          {formatPrice(relProduct.priceETB)}
                        </span>
                        <span className="text-[10px] font-bold text-[#2D241E]/60 bg-[#F9F4EC] px-2 py-0.5 rounded-md">
                          {t.viewDetailsShort}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAD8C0] px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[10px] text-[#2D241E]/60 font-bold block">{t.priceLabel}</span>
          <span className="font-serif font-bold text-base text-[#8B0000]">
            {formatPrice(product.priceETB)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-colors ${
              addedNotice ? 'bg-[#2E4739] text-white border-[#2E4739]' : 'bg-[#F9F4EC] text-[#8B0000] border-[#EAD8C0]'
            }`}
            title={t.addToBag}
          >
            {addedNotice ? <Check className="w-5 h-5 stroke-[3]" /> : <ShoppingBag className="w-5 h-5" />}
          </button>

          <a
            href={`https://wa.me/251913312314?text=${getOrderMessage()}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.orderWhatsAppDirect}</span>
          </a>
        </div>
      </div>

    </div>
  );
};

