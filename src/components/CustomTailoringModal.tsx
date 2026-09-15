import React, { useState } from 'react';
import { STORE_INFO } from '../data/categories';
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
  Tag,
  Info
} from 'lucide-react';
import { MeasurementGuideModal } from './MeasurementGuideModal';

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
  const [otherFabricText, setOtherFabricText] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [guideOpen, setGuideOpen] = useState(false);

  // Measurement gender & fields
  const [measurementType, setMeasurementType] = useState<'women' | 'men'>('women');
  // Women measurements
  const [seder, setSeder] = useState('');
  const [wHeight, setWHeight] = useState('');
  const [wBust, setWBust] = useState('');
  const [wWaist, setWWaist] = useState('');
  const [wShoulder, setWShoulder] = useState('');
  const [wSleeve, setWSleeve] = useState('');
  // Men measurements
  const [mShirtLen, setMShirtLen] = useState('');
  const [mChest, setMChest] = useState('');
  const [mBelly, setMBelly] = useState('');
  const [mShoulder, setMShoulder] = useState('');
  const [mSleeve, setMSleeve] = useState('');
  const [mPantsLen, setMPantsLen] = useState('');
  const [mWaist, setMWaist] = useState('');

  const isBulk = quantity >= 3;
  // Estimated base price for tailored piece (e.g. average 18,500 ETB)
  const unitPrice = fabric === '#የሽፎን_ቀሚስ' ? 14500 : (fabric === '#የቻይናጨርቅ_ልብስ' ? 13500 : 18500);
  const discountMultiplier = isBulk ? 0.9 : 1.0;
  const unitPriceFinal = Math.round(unitPrice * discountMultiplier);
  const totalPrice = unitPriceFinal * quantity;
  const depositPrice = Math.round(totalPrice * 0.5); // 50% deposit (ቀብድ)

  const activeFabricDisplay = fabric === '#ሌላ_የጨርቅ_ምርጫ' 
    ? (otherFabricText ? `ሌላ ጨርቅ፦ ${otherFabricText}` : 'ሌላ የጨርቅ ምርጫ') 
    : fabric;

  const generateMessage = () => {
    let measText = '';
    if (measurementType === 'women') {
      measText = `• የሴቶች ልኬት:\n` +
        (seder ? `  - ሠደር: ${seder}\n` : '') +
        (wHeight ? `  - ቁመት: ${wHeight}\n` : '') +
        (wBust ? `  - ጡት ዙሪያ: ${wBust}\n` : '') +
        (wWaist ? `  - ወገብ ዙሪያ: ${wWaist}\n` : '') +
        (wShoulder ? `  - ትከሻ: ${wShoulder}\n` : '') +
        (wSleeve ? `  - እጅጌ: ${wSleeve}\n` : '');
    } else {
      measText = `• የወንዶች ልኬት:\n` +
        (mShirtLen ? `  - ሸሚዝ ቁመት: ${mShirtLen}\n` : '') +
        (mChest ? `  - ደረት ዙሪያ: ${mChest}\n` : '') +
        (mBelly ? `  - ሆድ ዙሪያ: ${mBelly}\n` : '') +
        (mShoulder ? `  - ትከሻ: ${mShoulder}\n` : '') +
        (mSleeve ? `  - እጅ: ${mSleeve}\n` : '') +
        (mWaist ? `  - ሱሪ ወገብ ዙሪያ: ${mWaist}\n` : '') +
        (mPantsLen ? `  - ሱሪ ቁመት: ${mPantsLen}\n` : '');
    }

    return (
      `ሰላም አቤል ሓበሻ! በፈለግኩት ዲዛይን በኣጭር ግዜ ቀጠሮ ማሰራት እፈልጋለሁ:\n\n` +
      `• ዝግጅት: ${occasion}\n` +
      `• የጨርቅ አይነት: ${activeFabricDisplay}\n` +
      `• ብዛት: ${quantity} ${isBulk ? '(የብዛት ቅናሽ ተካቷል)' : ''}\n` +
      (appointmentDate ? `• የቀጠሮ ቀን: ${appointmentDate}\n` : '') +
      `• የኣንዱ ዋጋ (ግምት): ${unitPriceFinal.toLocaleString()} ብር\n` +
      `• ጠቅላላ ዋጋ: ${totalPrice.toLocaleString()} ብር\n` +
      `• ቀብድ (50%): ${depositPrice.toLocaleString()} ብር\n` +
      (customerName ? `• የደንበኛ ስም: ${customerName}\n` : '') +
      (phone ? `• ስልክ: ${phone}\n` : '') +
      (measText ? `${measText}\n` : '') +
      (notes ? `• ተጨማሪ ማስታወሻ/ዲዛይን ፍላጎት: ${notes}\n` : '') +
      `\nእባክዎ የቀጠሮውን እና የስራውን ዝርዝር ያረጋግጡልኝ። አመሰግናለሁ!`
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
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#EAD8C0] my-6">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#8B0000] to-[#5a0000] p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
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
          <div className="bg-[#F9F4EC] border-b border-[#EAD8C0] px-6 py-2.5 flex items-center justify-between text-xs text-[#8B0000]">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#8B0000] shrink-0" />
              <span className="font-bold">
                {isBulk 
                  ? (isAm ? '🎉 የብዛት ቅናሽ ታስቧል (10% Off)!' : '🎉 10% Bulk discount applied!')
                  : (isAm ? 'ለሰርግ ሚዜዎችና ለቡድን 3+ ሲያሰሩ ታላቅ ቅናሽ!' : 'Order 3+ for special wedding party discount!')}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setGuideOpen(true)}
              className="flex items-center gap-1 text-[#8B0000] font-bold hover:underline cursor-pointer"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>የልኬት መመሪያ</span>
            </button>
          </div>

          {/* Form Content */}
          <div className="p-5 sm:p-6 space-y-4 max-h-[62vh] overflow-y-auto">
            
            {/* 1. Occasion Selection */}
            <div>
              <label className="block text-xs font-bold text-[#2D241E] mb-1.5">
                {isAm ? '1. የዝግጅት አይነት ይምረጡ' : '1. Select Event Type'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { tag: '#የሰርግ', labelAm: 'የሰርግ' },
                  { tag: '#የመልስ', labelAm: 'የመልስ' },
                  { tag: '#የካፕል', labelAm: 'የጥንዶች (Couple)' },
                  { tag: '#የወንድ', labelAm: 'የወንዶች' },
                  { tag: '#የክርስትና', labelAm: 'የክርስትና' },
                  { tag: '#የቁርባን', labelAm: 'የቁርባን' },
                  { tag: '#የምርቃት', labelAm: 'የምርቃት' },
                  { tag: '#የኣሸንዳ', labelAm: 'የኣሸንዳ/ሻደይ' },
                  { tag: '#የኣዲስ_ኣመት', labelAm: 'የአዲስ ዓመት' },
                  { tag: '#የቡና', labelAm: 'የቡና ስነ-ስርዓት' },
                ].map((item) => (
                  <button
                    key={item.tag}
                    type="button"
                    onClick={() => setOccasion(item.tag)}
                    className={`p-2 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
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

            {/* 2. Fabric Type Selection */}
            <div>
              <label className="block text-xs font-bold text-[#2D241E] mb-1.5">
                {isAm ? '2. የጨርቅ ምርጫ (Fabric Choice)' : '2. Select Fabric Type'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { tag: '#የኣክሱም_ፈትል', labelAm: 'የኣክሱም ፈትል እና ማግ' },
                  { tag: '#የሳባጨርቅ_ልብስ', labelAm: 'የሳባ ጨርቅ' },
                  { tag: '#የሽፎን_ቀሚስ', labelAm: 'የሽፎን ጨርቅ (Chiffon)' },
                  { tag: '#የቻይናጨርቅ_ልብስ', labelAm: 'የቻይና ጨርቅ' },
                  { tag: '#የንክር_ልብስ', labelAm: 'የንክር ጨርቅ' },
                  { tag: '#ሌላ_የጨርቅ_ምርጫ', labelAm: 'ሌላ የጨርቅ ምርጫ (Other)' },
                ].map((f) => (
                  <button
                    key={f.tag}
                    type="button"
                    onClick={() => setFabric(f.tag)}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                      fabric === f.tag
                        ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-xs'
                        : 'bg-white text-[#2D241E] border-[#EAD8C0] hover:border-[#8B0000]'
                    }`}
                  >
                    {f.labelAm}
                  </button>
                ))}
              </div>

              {/* If "Other" fabric is chosen */}
              {fabric === '#ሌላ_የጨርቅ_ምርጫ' && (
                <div className="mt-2.5">
                  <input
                    type="text"
                    placeholder={isAm ? "የሚፈልጉትን ሌላ የጨርቅ አይነት እዚህ ይጥቀሱ..." : "Specify custom fabric preference..."}
                    value={otherFabricText}
                    onChange={(e) => setOtherFabricText(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#F9F4EC] border border-[#8B0000] rounded-xl focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* 3. Quantity & Strictly የቀጠሮ ቀን */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#2D241E] mb-1">
                  {isAm ? '3. ብዛት (Quantity)' : '3. Quantity'}
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-lg border border-[#EAD8C0] bg-[#F9F4EC] font-bold text-sm text-[#2D241E] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-base w-8 text-center text-[#2D241E]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-lg border border-[#EAD8C0] bg-[#F9F4EC] font-bold text-sm text-[#2D241E] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D241E] mb-1">
                  {isAm ? 'የቀጠሮ ቀን' : 'Appointment Date'}
                </label>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000]"
                />
              </div>
            </div>

            {/* Price Breakdown Banner */}
            <div className="p-3.5 bg-[#F9F4EC] rounded-2xl border border-[#EAD8C0] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#2D241E]/80">
                <span>የኣንዱ ዋጋ:</span>
                <span className="font-bold text-[#2D241E]">{unitPriceFinal.toLocaleString()} ብር</span>
              </div>
              <div className="flex justify-between text-[#2D241E]/80">
                <span>ጠቅላላ ዋጋ ({quantity} ልብስ):</span>
                <span className="font-bold text-base text-[#8B0000]">{totalPrice.toLocaleString()} ብር</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#EAD8C0] text-[#2D241E] font-bold">
                <span className="flex items-center gap-1 text-[#C5A059]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ቀብድ (50% ቅድመ-ክፍያ):</span>
                </span>
                <span className="text-[#8B0000] font-black">{depositPrice.toLocaleString()} ብር</span>
              </div>
            </div>

            {/* 4. Measurements Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#2D241E]">
                  {isAm ? '4. የልኬት አወሳሰድ (Measurements)' : '4. Measurements'}
                </label>
                <div className="inline-flex rounded-lg bg-[#F9F4EC] p-0.5 border border-[#EAD8C0] text-[11px]">
                  <button
                    type="button"
                    onClick={() => setMeasurementType('women')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                      measurementType === 'women' ? 'bg-[#8B0000] text-white' : 'text-[#2D241E]'
                    }`}
                  >
                    የሴቶች ልኬት
                  </button>
                  <button
                    type="button"
                    onClick={() => setMeasurementType('men')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                      measurementType === 'men' ? 'bg-[#8B0000] text-white' : 'text-[#2D241E]'
                    }`}
                  >
                    የወንዶች ልኬት
                  </button>
                </div>
              </div>

              {measurementType === 'women' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="ሠደር"
                    value={seder}
                    onChange={(e) => setSeder(e.target.value)}
                    className="text-xs p-2 bg-[#F9F4EC] border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                  />
                  <input
                    type="text"
                    placeholder="ቁመት"
                    value={wHeight}
                    onChange={(e) => setWHeight(e.target.value)}
                    className="text-xs p-2 bg-[#F9F4EC] border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                  />
                  <input
                    type="text"
                    placeholder="ጡት ዙሪያ"
                    value={wBust}
                    onChange={(e) => setWBust(e.target.value)}
                    className="text-xs p-2 bg-[#F9F4EC] border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                  />
                  <input
                    type="text"
                    placeholder="ወገብ ዙሪያ"
                    value={wWaist}
                    onChange={(e) => setWWaist(e.target.value)}
                    className="text-xs p-2 bg-[#F9F4EC] border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                  />
                  <input
                    type="text"
                    placeholder="ትከሻ"
                    value={wShoulder}
                    onChange={(e) => setWShoulder(e.target.value)}
                    className="text-xs p-2 bg-[#F9F4EC] border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                  />
                  <input
                    type="text"
                    placeholder="እጅጌ"
                    value={wSleeve}
                    onChange={(e) => setWSleeve(e.target.value)}
                    className="text-xs p-2 bg-[#F9F4EC] border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="ሸሚዝ ቁመት"
                    value={mShirtLen}
                    onChange={(e) => setMShirtLen(e.target.value)}
                    className="text-xs p-2 bg-[#F9F4EC] border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                  />
                  <input
                    type="text"
                    placeholder="ደረት ዙሪያ"
                    value={mChest}
                    onChange={(e) => setMChest(e.target.value)}
                    className="text-xs p-2 bg-[#F9F4EC] border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                  />
                  <input
                    type="text"
                    placeholder="ሆድ ዙሪያ"
                    value={mBelly}
                    onChange={(e) => setMBelly(e.target.value)}
                    className="text-xs p-2 bg-[#F9F4EC] border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                  />
                  <input
                    type="text"
                    placeholder="ትከሻ"
                    value={mShoulder}
                    onChange={(e) => setMShoulder(e.target.value)}
                    className="text-xs p-2 bg-[#F9F4EC] border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                  />
                  <input
                    type="text"
                    placeholder="እጅ"
                    value={mSleeve}
                    onChange={(e) => setMSleeve(e.target.value)}
                    className="text-xs p-2 bg-[#F9F4EC] border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                  />
                  <input
                    type="text"
                    placeholder="ሱሪ ወገብ / ቁመት"
                    value={mPantsLen}
                    onChange={(e) => setMPantsLen(e.target.value)}
                    className="text-xs p-2 bg-[#F9F4EC] border border-[#EAD8C0] rounded-lg focus:outline-none focus:border-[#8B0000]"
                  />
                </div>
              )}
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
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#1faa4f] text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp ላይ ላክ</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendTelegram}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-[#29b6f6] hover:bg-[#1fa0df] text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
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

      {guideOpen && (
        <MeasurementGuideModal
          isOpen={guideOpen}
          onClose={() => setGuideOpen(false)}
          language={language}
        />
      )}
    </>
  );
};
