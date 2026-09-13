import React, { useState } from 'react';
import { STORE_INFO, HASHTAG_CATEGORIES } from '../data/categories';
import { Language } from '../types';
import { 
  X, 
  Scissors, 
  Sparkles, 
  Calendar, 
  Ruler, 
  MessageCircle, 
  Send, 
  Phone, 
  Check, 
  MapPin,
  Tag
} from 'lucide-react';

interface CustomTailoringModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const CustomTailoringModal: React.FC<CustomTailoringModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  const isAm = language === 'am';

  const [occasion, setOccasion] = useState('#የሰርግ');
  const [fabric, setFabric] = useState('#የኣክሱም_ፈትል');
  const [quantity, setQuantity] = useState(1);
  const [neededDate, setNeededDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [height, setHeight] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');

  const isBulk = quantity >= 3;

  const generateMessage = () => {
    return (
      `ሰላም አቤል ሓበሻ! በፈለግኩት ዲዛይን በኣጭር ግዜ ቀጠሮ ማሰራት እፈልጋለሁ:\n\n` +
      `• ዝግጅት: ${occasion}\n` +
      `• የጨርቅ አይነት: ${fabric}\n` +
      `• ብዛት: ${quantity} ${isBulk ? '(የብዛት ቅናሽ ይካተታል)' : ''}\n` +
      (neededDate ? `• የሚፈለግበት ቀን: ${neededDate}\n` : '') +
      (customerName ? `• የደንበኛ ስም: ${customerName}\n` : '') +
      (phone ? `• ስልክ: ${phone}\n` : '') +
      (height || chest || waist ? `• ልክ/ስፋት: ቁመት=${height || '-'}, ደረት=${chest || '-'}, ወገብ=${waist || '-'}\n` : '') +
      (notes ? `• ተጨማሪ ማስታወሻ/ዲዛይን ፍላጎት: ${notes}\n` : '') +
      `\nእባክዎ ዋጋውንና የቀጠሮውን ዝርዝር ይንገሩኝ። አመሰግናለሁ!`
    );
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(generateMessage());
    window.open(`https://wa.me/251913312314?text=${text}`, '_blank');
  };

  const handleSendTelegram = () => {
    window.open(`https://t.me/${STORE_INFO.telegramUser}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#EAD8C0] my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B0000] to-[#5a0000] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059] text-[#2D241E] text-xs font-bold mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2D241E]" />
            <span>{isAm ? 'በፈለጉት ዲዛይን በኣጭር ግዜ ቀጠሮ' : 'Custom Bespoke Tailoring'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white">
            {isAm ? 'የባህል አልባሳት በትዕዛዝ ማሰሪያ' : 'Order Your Custom Habesha Dress'}
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            {isAm 
              ? 'የሚፈልጉትን የጨርቅ አይነት፣ የጥበብ ዲዛይን እና ልክዎን ይንገሩን። በፈጣን ቀጠሮ አዘጋጅተን እናስረክባለን!'
              : 'Choose your event, traditional fabric, measurements, and turnaround time. Handcrafted at Shiromeda.'}
          </p>
        </div>

        {/* Bulk discount alert if >= 3 items */}
        <div className="bg-[#F9F4EC] border-b border-[#EAD8C0] px-6 py-2.5 flex items-center gap-2 text-xs text-[#8B0000]">
          <Tag className="w-4 h-4 text-[#8B0000] shrink-0" />
          <span className="font-bold">
            {isAm 
              ? '👉 በብዛት ለሚያሰሩ (ለሙሽራ ሚዜዎች፣ ለቡድን ወይም ለቤተሰብ) ታላቅ ቅናሽ እናደርጋለን!'
              : '👉 Bulk discount available for bridal parties, family sets, and group celebrations!'}
          </span>
        </div>

        {/* Body Form */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Occasion Selection */}
          <div>
            <label className="block text-xs font-bold text-[#2D241E] mb-1.5">
              {isAm ? '1. የዝግጅቱ አይነት ይምረጡ' : '1. Select Occasion'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { tag: '#የሰርግ', labelAm: 'የሰርግ አልባሳት' },
                { tag: '#የመልስ', labelAm: 'የመልስ አልባሳት' },
                { tag: '#የካፕል', labelAm: 'የጥንዶች (Couple)' },
                { tag: '#የወንድ', labelAm: 'የወንዶች አልባሳት' },
                { tag: '#የክርስትና', labelAm: 'የክርስትና/ቁርባን' },
                { tag: '#የምርቃት', labelAm: 'የምርቃት' },
                { tag: '#የኣሸንዳ', labelAm: 'የኣሸንዳ/ሻደይ' },
                { tag: '#የኣዲስ_ኣመት', labelAm: 'የአዲስ ዓመት' },
                { tag: '#የቡና', labelAm: 'የቡና ስነ-ስርዓት' },
              ].map((item) => (
                <button
                  key={item.tag}
                  type="button"
                  onClick={() => setOccasion(item.tag)}
                  className={`p-2 rounded-xl text-xs font-bold text-left transition-all border ${
                    occasion === item.tag
                      ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-xs'
                      : 'bg-[#F9F4EC] text-[#2D241E] border-[#EAD8C0] hover:border-[#8B0000]'
                  }`}
                >
                  <div>{item.labelAm}</div>
                  <div className="text-[10px] opacity-80">{item.tag}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Fabric Type Selection */}
          <div>
            <label className="block text-xs font-bold text-[#2D241E] mb-1.5">
              {isAm ? '2. የጨርቅ አይነት ይምረጡ' : '2. Select Fabric Type'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { tag: '#የኣክሱም_ፈትል', labelAm: 'የኣክሱም ፈትል' },
                { tag: '#የሳባጨርቅ_ልብስ', labelAm: 'የሳባ ጨርቅ' },
                { tag: '#የቻይናጨርቅ_ልብስ', labelAm: 'የቻይና ጨርቅ (ሽፎን)' },
                { tag: '#የንክር_ልብስ', labelAm: 'የንክር ጨርቅ' },
                { tag: '#የራያ_ልብስ', labelAm: 'የራያ ባህላዊ' },
                { tag: '#የጎንደር_ልብስ', labelAm: 'የጎንደር ጥልፍ' },
              ].map((f) => (
                <button
                  key={f.tag}
                  type="button"
                  onClick={() => setFabric(f.tag)}
                  className={`p-2 rounded-xl text-xs font-bold text-left transition-all border ${
                    fabric === f.tag
                      ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-xs'
                      : 'bg-white text-[#2D241E] border-[#EAD8C0] hover:border-[#8B0000]'
                  }`}
                >
                  {f.labelAm}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Bulk notice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#2D241E] mb-1">
                {isAm ? '3. ብዛት (Quantity)' : '3. Quantity'}
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-lg border border-[#EAD8C0] bg-[#F9F4EC] font-bold text-sm text-[#2D241E]"
                >
                  -
                </button>
                <span className="font-extrabold text-base w-8 text-center text-[#2D241E]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-lg border border-[#EAD8C0] bg-[#F9F4EC] font-bold text-sm text-[#2D241E]"
                >
                  +
                </button>
                {isBulk && (
                  <span className="text-[11px] font-bold text-[#2E4739] bg-[#2E4739]/10 px-2 py-1 rounded-md">
                    {isAm ? '✨ የብዛት ቅናሽ ገብቷል!' : '✨ Bulk discount applied!'}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D241E] mb-1">
                {isAm ? 'የሚፈለግበት ቀን / ቀጠሮ' : 'Target Date Needed'}
              </label>
              <input
                type="text"
                placeholder={isAm ? "ለምሳሌ፦ ከ 5 ቀናት በኋላ፣ ወይም ቀን" : "e.g. In 5 days, or specific date"}
                value={neededDate}
                onChange={(e) => setNeededDate(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000]"
              />
            </div>
          </div>

          {/* Optional Measurements */}
          <div>
            <label className="block text-xs font-bold text-[#2D241E] mb-1">
              {isAm ? '4. የልክ መረጃ (ካለዎት)' : '4. Measurements (if available)'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder={isAm ? "ቁመት (cm)" : "Length"}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="text-xs p-2 bg-[#F9F4EC] border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
              />
              <input
                type="text"
                placeholder={isAm ? "ደረት (cm)" : "Chest"}
                value={chest}
                onChange={(e) => setChest(e.target.value)}
                className="text-xs p-2 bg-[#F9F4EC] border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
              />
              <input
                type="text"
                placeholder={isAm ? "ወገብ (cm)" : "Waist"}
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                className="text-xs p-2 bg-[#F9F4EC] border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
              />
            </div>
          </div>

          {/* Notes & Design Requests */}
          <div>
            <label className="block text-xs font-bold text-[#2D241E] mb-1">
              {isAm ? '5. የዲዛይን ወይም የጥልፍ ፍላጎት ማስታወሻ' : '5. Specific Design Details'}
            </label>
            <textarea
              rows={2}
              placeholder={isAm ? "የሚፈልጉትን የጥልፍ ቀለም፣ የነጠላ ዲዛይን ወይም ልዩ ጥያቄ ይጻፉልን..." : "Special embroidery patterns, collar styles, or color preferences..."}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-2.5 bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000]"
            />
          </div>

          {/* Customer contact info */}
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder={isAm ? "ስምዎ" : "Your Name"}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="text-xs p-2 bg-white border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
            />
            <input
              type="text"
              placeholder={isAm ? "ስልክ ቁጥር" : "Phone Number"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="text-xs p-2 bg-white border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-[#F2E8DA] space-y-2">
            <p className="text-center text-xs text-[#2D241E]/75 font-medium">
              {isAm ? 'ትዕዛዝዎን በቀጥታ ወደ አድሚን ይላኩ፦' : 'Send this request directly to our tailoring desk:'}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#1faa4f] text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp ላይ ላክ</span>
              </button>

              <button
                type="button"
                onClick={handleSendTelegram}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-[#29b6f6] hover:bg-[#1fa0df] text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Telegram Inbox ላክ</span>
              </button>
            </div>

            <div className="text-center">
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="inline-flex items-center gap-1.5 text-xs text-[#8B0000] hover:underline font-bold py-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{isAm ? `ወይም በቀጥታ ይደውሉ፦ ${STORE_INFO.phoneDisplay}` : `Or call us directly: ${STORE_INFO.phoneDisplay}`}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
