import React, { useState } from 'react';
import { CartItem, Language } from '../types';
import { STORE_INFO } from '../data/categories';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  MessageCircle, 
  Send, 
  Tag, 
  Check, 
  Copy, 
  MapPin, 
  Phone
} from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  language: Language;
  currency: 'ETB' | 'USD';
  exchangeRate?: number;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  language,
  currency,
  exchangeRate = 135,
}) => {
  if (!isOpen) return null;

  const isAm = language === 'am';
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [copied, setCopied] = useState(false);

  // Calculate totals
  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalETB = items.reduce((acc, item) => acc + item.product.priceETB * item.quantity, 0);
  
  // Bulk discount rule: 3 or more items gets 10% discount!
  const hasBulkDiscount = totalItemsCount >= 3;
  const discountAmountETB = hasBulkDiscount ? Math.round(subtotalETB * 0.10) : 0;
  const finalTotalETB = subtotalETB - discountAmountETB;

  const formatPrice = (etb: number) => {
    if (currency === 'USD') {
      return `$${Math.round(etb / exchangeRate).toLocaleString()}`;
    }
    return `${etb.toLocaleString()} ብር`;
  };

  const generateOrderSummary = () => {
    let text = `🛍 የትዕዛዝ ዝርዝር - Abel Habesha (አቤል ሓበሻ)\n\n`;
    items.forEach((item, index) => {
      text += `${index + 1}. ${item.product.nameAm} (${item.product.code})\n`;
      text += `   • መጠን: ${item.size}\n`;
      text += `   • ጨርቅ: ${item.product.fabricAm}\n`;
      text += `   • ብዛት: ${item.quantity} x ${item.product.priceETB.toLocaleString()} ብር = ${(item.quantity * item.product.priceETB).toLocaleString()} ብር\n\n`;
    });

    text += `--------------------------\n`;
    text += `ንዑስ ድምር: ${subtotalETB.toLocaleString()} ብር\n`;
    if (hasBulkDiscount) {
      text += `👉 የብዛት ቅናሽ (10%): -${discountAmountETB.toLocaleString()} ብር\n`;
    }
    text += `አጠቃላይ ድምር: ${finalTotalETB.toLocaleString()} ብር\n`;
    text += `--------------------------\n`;
    if (customerName) text += `የደንበኛ ስም: ${customerName}\n`;
    if (customerPhone) text += `ስልክ ቁጥር: ${customerPhone}\n`;
    if (deliveryNote) text += `ማስታወሻ: ${deliveryNote}\n`;
    text += `\n📍 የመደብር አድራሻ: ሽሮሜዳ ብላቴና ህንፃ 4ኛ ፎቅ 110 ቁጥር`;

    return text;
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(generateOrderSummary());
    window.open(`https://wa.me/251913312314?text=${text}`, '_blank');
  };

  const handleSendTelegram = () => {
    window.open(`https://t.me/${STORE_INFO.telegramUser}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateOrderSummary());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#EAD8C0] my-6 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#8B0000] to-[#600000] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C5A059] text-[#2D241E] flex items-center justify-center font-bold shadow-xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
                {isAm ? 'የትዕዛዝ ቅርጫት' : 'Your Order Bag'}
              </h2>
              <p className="text-xs text-white/80">
                {items.length} {isAm ? 'የተመረጡ አልባሳት' : 'items selected'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bulk discount promo bar */}
        <div className="bg-[#F9F4EC] border-b border-[#EAD8C0] px-5 py-2.5 flex items-center justify-between text-xs text-[#8B0000]">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#8B0000] shrink-0" />
            <span className="font-bold">
              {hasBulkDiscount
                ? (isAm ? '✨ እንኳን ደስ አለዎት! የ10% የብዛት ቅናሽ ተካቷል!' : '✨ 10% Bulk discount applied to your order!')
                : (isAm ? '👉 3 እና ከዚያ በላይ አልባሳት ሲያዙ የ10% የብዛት ቅናሽ ያገኛሉ!' : '👉 Add 3+ dresses to unlock 10% bulk discount!')}
            </span>
          </div>
          {hasBulkDiscount && (
            <span className="font-black text-[#2E4739]">
              -{formatPrice(discountAmountETB)}
            </span>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FDFCF8]">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#F9F4EC] border border-[#EAD8C0] mx-auto flex items-center justify-center mb-3">
                <ShoppingBag className="w-8 h-8 text-[#8B0000]" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#2D241E] mb-1">
                {isAm ? 'ቅርጫትዎ ባዶ ነው' : 'Your bag is empty'}
              </h3>
              <p className="text-xs text-[#2D241E]/70 max-w-xs mx-auto mb-4">
                {isAm 
                  ? 'የሚፈልጉትን የሓበሻ ቀሚስ ወይም ሽፎን ከመደብራችን ካታሎግ ይምረጡ።' 
                  : 'Explore our catalog and choose your preferred Habesha Kemis or Chiffon attire.'}
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#8B0000] hover:bg-[#6e0000] text-white rounded-xl text-xs font-bold transition-colors"
              >
                {isAm ? 'ካታሎግ ያስሱ' : 'Browse Catalog'}
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex gap-3 p-3 rounded-2xl bg-white border border-[#EAD8C0] items-center shadow-xs"
                  >
                    <img 
                      src={item.product.image} 
                      alt={item.product.nameAm}
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 rounded-xl object-cover object-center bg-[#FDFCF8] shrink-0 border border-[#EAD8C0]" 
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#8B0000] font-bold">
                        <span>{item.product.code}</span>
                        <span>•</span>
                        <span className="truncate">{item.product.fabricAm}</span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#2D241E] truncate">
                        {isAm ? item.product.nameAm : item.product.nameEn}
                      </h4>
                      <p className="text-xs text-[#2D241E]/70 mt-0.5">
                        {isAm ? 'መጠን፦' : 'Size:'} <strong className="text-[#2D241E]">{item.size}</strong>
                      </p>
                      <div className="font-serif font-bold text-sm text-[#8B0000] mt-1">
                        {formatPrice(item.product.priceETB)}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-[#2D241E]/50 hover:text-[#8B0000] p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2 bg-[#F9F4EC] rounded-lg border border-[#EAD8C0] px-1.5 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                          className="text-xs font-bold px-1 text-[#2D241E] hover:text-[#8B0000]"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold min-w-[16px] text-center text-[#2D241E]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="text-xs font-bold px-1 text-[#2D241E] hover:text-[#8B0000]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Contact Inputs */}
              <div className="pt-3 border-t border-[#EAD8C0] space-y-2.5">
                <h4 className="text-xs font-bold text-[#2D241E]">
                  {isAm ? 'የትዕዛዝ መላኪያ መረጃ (አማራጭ)' : 'Order Details (Optional)'}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder={isAm ? "የእርስዎ ስም" : "Your Name"}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="text-xs p-2.5 bg-white border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                  />
                  <input
                    type="text"
                    placeholder={isAm ? "ስልክ ቁጥር" : "Phone Number"}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="text-xs p-2.5 bg-white border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                  />
                </div>
                <input
                  type="text"
                  placeholder={isAm ? "ልዩ ማስታወሻ ወይም የቀጠሮ ቀን..." : "Special instructions or delivery request..."}
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer with Totals & WhatsApp/Telegram submit */}
        {items.length > 0 && (
          <div className="p-5 bg-[#F9F4EC] border-t border-[#EAD8C0] space-y-3">
            <div className="space-y-1.5 text-xs text-[#2D241E]/80">
              <div className="flex justify-between">
                <span>{isAm ? 'ንዑስ ድምር' : 'Subtotal'}</span>
                <span className="font-semibold">{formatPrice(subtotalETB)}</span>
              </div>
              {hasBulkDiscount && (
                <div className="flex justify-between text-[#2E4739] font-bold">
                  <span>{isAm ? 'የብዛት ቅናሽ (10%)' : 'Bulk Discount (10%)'}</span>
                  <span>-{formatPrice(discountAmountETB)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-serif font-bold text-[#8B0000] pt-1.5 border-t border-[#EAD8C0]">
                <span>{isAm ? 'አጠቃላይ ድምር' : 'Final Total'}</span>
                <span>{formatPrice(finalTotalETB)}</span>
              </div>
            </div>

            {/* Direct Send CTAs matching prompt instructions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleSendWhatsApp}
                className="flex items-center justify-center gap-2 py-3 px-3 bg-[#25D366] hover:bg-[#1faa4f] text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAm ? 'በ WhatsApp እዘዝ' : 'Order via WhatsApp'}</span>
              </button>

              <button
                onClick={handleSendTelegram}
                className="flex items-center justify-center gap-2 py-3 px-3 bg-[#29b6f6] hover:bg-[#1fa0df] text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>{isAm ? 'በ Telegram Inbox' : 'Order on Telegram'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[#8B0000] hover:underline font-bold"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (isAm ? 'ዝርዝሩ ተገልብጧል!' : 'Summary copied!') : (isAm ? 'የትዕዛዝ ዝርዝር ቅዳ' : 'Copy order text')}</span>
              </button>

              <button
                onClick={onClearCart}
                className="text-[#2D241E]/40 hover:text-[#8B0000] text-[11px] transition-colors"
              >
                {isAm ? 'ቅርጫት አጽዳ' : 'Clear Bag'}
              </button>
            </div>

            <div className="pt-2 border-t border-[#EAD8C0] flex items-center gap-1.5 text-[11px] text-[#2D241E]/75">
              <MapPin className="w-3.5 h-3.5 text-[#8B0000] shrink-0" />
              <span>{STORE_INFO.addressAm}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
