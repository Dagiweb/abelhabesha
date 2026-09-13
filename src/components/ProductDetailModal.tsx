import React, { useState } from 'react';
import { Product, Language } from '../types';
import { STORE_INFO } from '../data/categories';
import { 
  X, 
  Sparkles, 
  Clock, 
  MapPin, 
  Check, 
  Copy, 
  MessageCircle, 
  Send, 
  Phone, 
  ShoppingBag, 
  Ruler, 
  ShieldCheck,
  Camera,
  Scissors
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  language: Language;
  currency: 'ETB' | 'USD';
  exchangeRate?: number;
  onAddToCart: (product: Product, size: string, customMeasurements?: any) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  language,
  currency,
  exchangeRate = 135,
  onAddToCart,
}) => {
  if (!product) return null;

  const isAm = language === 'am';
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [isCustomMeasurement, setIsCustomMeasurement] = useState(false);
  const [measurements, setMeasurements] = useState({
    length: '',
    chest: '',
    waist: '',
    hips: '',
    shoulder: '',
  });
  const [copied, setCopied] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const images = [product.image, ...(product.secondaryImages || [])];

  const formatPrice = (etb: number) => {
    if (currency === 'USD') {
      return `$${Math.round(etb / exchangeRate).toLocaleString()}`;
    }
    return `${etb.toLocaleString()} ብር`;
  };

  const handleCopyOrderInfo = () => {
    const text = `🛍 የትዕዛዝ መረጃ - Abel Habesha\n\n` +
      `• ልብስ: ${product.nameAm} (${product.code})\n` +
      `• ጨርቅ: ${product.fabricAm}\n` +
      `• ዋጋ: ${product.priceETB.toLocaleString()} ብር\n` +
      `• መጠን/ልክ: ${isCustomMeasurement ? `በልክ (ቁመት: ${measurements.length || '-'}, ደረት: ${measurements.chest || '-'}, ወገብ: ${measurements.waist || '-'})` : selectedSize}\n` +
      `• አድራሻ: ሽሮሜዳ ብላቴና ህንፃ 110 ቁጥር\n` +
      `• ፎቶ ሊንክ: ${product.image}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const orderMessage = encodeURIComponent(
    `ሰላም አቤል ሓበሻ (Abel Habesha)! ይህንን አልባሳት ማዘዝ እፈልጋለሁ:\n\n` +
    `• ስም: ${product.nameAm}\n` +
    `• ኮድ: ${product.code}\n` +
    `• ጨርቅ: ${product.fabricAm}\n` +
    `• ዋጋ: ${product.priceETB.toLocaleString()} ብር\n` +
    `• የመረጡት መጠን/ልክ: ${isCustomMeasurement ? 'በልክ የሚሰፋ (Custom Measurement)' : selectedSize}\n` +
    (isCustomMeasurement && measurements.length ? `• ቁመት: ${measurements.length} cm, ደረት: ${measurements.chest || '-'} cm, ወገብ: ${measurements.waist || '-'} cm\n` : '') +
    `• ፎቶ: ${product.image}\n\n` +
    `እባክዎ አሰራሩንና የማስረከቢያ ቀጠሮውን ያሳውቁኝ።`
  );

  const handleAddToCart = () => {
    onAddToCart(
      product,
      isCustomMeasurement ? 'በልክ የሚሰፋ (Custom)' : selectedSize,
      isCustomMeasurement ? measurements : undefined
    );
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#EAD8C0] my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-[#F9F4EC] text-[#2D241E] flex items-center justify-center shadow-md transition-colors border border-[#EAD8C0]"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Gallery Column */}
          <div className="md:col-span-6 p-5 sm:p-6 bg-[#FDFCF8] flex flex-col justify-between border-r border-[#EAD8C0]">
            <div>
              {/* Main Image */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-sm border border-[#EAD8C0] mb-3">
                <img
                  src={selectedImage}
                  alt={product.nameAm}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-[#2D241E]/85 backdrop-blur-sm text-[#FDFCF8] text-xs font-mono font-bold px-3 py-1 rounded-full">
                  {product.code}
                </div>
              </div>

              {/* Thumbnail strip if multiple images */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImage === img ? 'border-[#8B0000] scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Prompt Ordering Step 1 Highlight */}
            <div className="mt-4 p-3.5 bg-[#F9F4EC] rounded-2xl border border-[#EAD8C0] text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 font-bold text-[#8B0000]">
                  <Camera className="w-4 h-4 text-[#C5A059]" />
                  <span>{isAm ? 'ደረጃ 1፦ Screenshot ያድርጉ' : 'Step 1: Screenshot this dress'}</span>
                </div>
                <button
                  onClick={handleCopyOrderInfo}
                  className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 bg-white rounded-md text-[#8B0000] hover:bg-[#F9F4EC] transition-colors border border-[#EAD8C0]"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (isAm ? 'ተገልብጧል!' : 'Copied!') : (isAm ? 'መረጃ ቅዳ' : 'Copy Info')}</span>
                </button>
              </div>
              <p className="text-[#2D241E]/75 leading-relaxed text-[11px]">
                {isAm 
                  ? 'የወደዱትን አልባሳት Screenshot በማድረግ ወይም ከላይ ያለውን መረጃ በመቅዳት በቀላሉ ማዘዝ ይችላሉ።'
                  : 'Take a screenshot of this dress or copy the details to send directly to our store inbox.'}
              </p>
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-6 p-5 sm:p-7 flex flex-col bg-white">
            {/* Hashtags */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {product.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-bold text-[#8B0000] bg-[#F9F4EC] px-2.5 py-0.5 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Product Title */}
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2D241E] mb-2 leading-snug">
              {isAm ? product.nameAm : product.nameEn}
            </h2>

            {/* Price Banner */}
            <div className="flex items-baseline gap-3 mb-4 pb-3 border-b border-[#F2E8DA]">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#8B0000]">
                {formatPrice(product.priceETB)}
              </span>
              {product.originalPriceETB && (
                <span className="text-sm text-[#2D241E]/40 line-through">
                  {formatPrice(product.originalPriceETB)}
                </span>
              )}
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#C5A059]/20 text-[#8B0000] font-bold">
                {isAm ? 'የተዘጋጀ ዋጋ' : 'Special Price'}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-[#2D241E]/80 leading-relaxed mb-4">
              {isAm ? product.descriptionAm : product.descriptionEn}
            </p>

            {/* Fabric & Delivery Highlights */}
            <div className="grid grid-cols-2 gap-2.5 mb-5 p-3 rounded-2xl bg-[#F9F4EC] border border-[#EAD8C0] text-xs text-[#2D241E]">
              <div className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-[#C5A059] shrink-0" />
                <div>
                  <p className="text-[10px] text-[#2D241E]/60 uppercase font-bold">{isAm ? 'የጨርቅ አይነት' : 'Fabric'}</p>
                  <p className="font-bold line-clamp-1">{isAm ? product.fabricAm : product.fabricEn}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2E4739] shrink-0" />
                <div>
                  <p className="text-[10px] text-[#2D241E]/60 uppercase font-bold">{isAm ? 'የቀጠሮ ግዜ' : 'Turnaround'}</p>
                  <p className="font-bold">{isAm ? `በ${product.tailoringDays} ቀናት ውስጥ ዝግጁ` : `Ready in ${product.tailoringDays} days`}</p>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-[#8B0000]" />
                  <span>{isAm ? 'መጠን / ልክ ይምረጡ' : 'Select Size or Custom Fit'}</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsCustomMeasurement(!isCustomMeasurement)}
                  className="text-xs font-bold text-[#8B0000] hover:underline"
                >
                  {isCustomMeasurement 
                    ? (isAm ? 'ወደ መደበኛ መጠን ተመለስ' : 'Switch to Standard Size')
                    : (isAm ? 'በልክዎ ማሰራት ይፈልጋሉ?' : 'Need Custom Measurements?')}
                </button>
              </div>

              {!isCustomMeasurement ? (
                <div className="flex gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                        selectedSize === sz
                          ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-xs'
                          : 'bg-[#F9F4EC] text-[#2D241E] border-[#EAD8C0] hover:border-[#8B0000]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-[#F9F4EC] rounded-xl border border-[#EAD8C0] space-y-2">
                  <p className="text-[11px] text-[#2D241E]/80">
                    {isAm 
                      ? 'ቁመትዎን እና ደረትዎን በሴንቲሜትር (cm) ያስገቡ ወይም በስልክ ይንገሩን፦' 
                      : 'Provide your height and chest measurements in cm:'}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder={isAm ? "ቁመት (cm)" : "Length (cm)"}
                      value={measurements.length}
                      onChange={(e) => setMeasurements({ ...measurements, length: e.target.value })}
                      className="text-xs p-2 bg-white border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                    />
                    <input
                      type="text"
                      placeholder={isAm ? "ደረት (cm)" : "Chest (cm)"}
                      value={measurements.chest}
                      onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })}
                      className="text-xs p-2 bg-white border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                    />
                    <input
                      type="text"
                      placeholder={isAm ? "ወገብ (cm)" : "Waist (cm)"}
                      value={measurements.waist}
                      onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                      className="text-xs p-2 bg-white border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons: WhatsApp, Telegram & Add to Cart */}
            <div className="space-y-2 mt-auto pt-4 border-t border-[#F2E8DA]">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/251913312314?text=${orderMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1faa4f] text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAm ? 'በ WhatsApp እዘዝ' : 'Order on WhatsApp'}</span>
                </a>

                <a
                  href={`https://t.me/${STORE_INFO.telegramUser}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#29b6f6] hover:bg-[#1da5e5] text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>{isAm ? 'በ Telegram Inbox' : 'Order on Telegram'}</span>
                </a>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs ${
                    addedNotice 
                      ? 'bg-[#2E4739] text-white' 
                      : 'bg-[#8B0000] text-white hover:bg-[#720000]'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>{isAm ? 'ወደ ቅርጫት ገብቷል!' : 'Added to Cart!'}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>{isAm ? 'ወደ ትዕዛዝ ቅርጫት ጨምር' : 'Add to Order Cart'}</span>
                    </>
                  )}
                </button>

                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="py-3 px-3.5 rounded-xl border border-[#EAD8C0] text-[#8B0000] hover:bg-[#F9F4EC] flex items-center justify-center transition-colors"
                  title="Call shop directly"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Prompt Store Address Notice */}
            <div className="mt-4 pt-3 border-t border-[#F2E8DA] flex items-start gap-2 text-[11px] text-[#2D241E]/75">
              <MapPin className="w-3.5 h-3.5 text-[#8B0000] shrink-0 mt-0.5" />
              <span>
                <strong>{isAm ? 'አድራሻችን፦' : 'Store Location:'}</strong> {isAm ? STORE_INFO.addressAm : STORE_INFO.addressEn}
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
