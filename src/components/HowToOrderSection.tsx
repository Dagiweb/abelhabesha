import React, { useState } from 'react';
import { STORE_INFO } from '../data/categories';
import { Language } from '../types';
import { 
  Camera, 
  Send, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Check, 
  Copy, 
  Sparkles
} from 'lucide-react';

interface HowToOrderProps {
  language: Language;
}

export const HowToOrderSection: React.FC<HowToOrderProps> = ({ language }) => {
  const isAm = language === 'am';
  const isTi = language === 'ti';
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(STORE_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const steps = [
    {
      num: '1',
      titleAm: 'የወደዱትን አልባሳት Screenshot ያድርጉ',
      titleTi: 'ዝፈተውዎ ክዳን Screenshot ግበሩ',
      titleEn: 'Screenshot the Dress You Love',
      descAm: 'ከካታሎጋችን ውስጥ የወደዱትን የሓበሻ ቀሚስ ወይም ሽፎን ፎቶውን Screenshot ያንሱ ወይም የልብሱን ኮድ ይያዙ።',
      descTi: 'ካብ ካታሎግና ዝፈተውዎ ናይ ሓበሻ ቀሚሽ ወይ ሺፎን ስእሊ Screenshot ኣልዕሉ ወይ ናይቲ ክዳን ኮድ ሓዙ።',
      descEn: 'Capture a quick screenshot of any traditional dress from our catalog or note its product code.',
      icon: Camera,
      color: 'bg-[#C5A059]',
    },
    {
      num: '2',
      titleAm: 'ወደ አድሚን Inbox ይላኩልን',
      titleTi: 'ናብ ኣድሚን Inbox ስደዱልና',
      titleEn: 'Send to our Admin Inbox',
      descAm: `ያነሱትን Screenshot ወደ ቴሌግራማችን [@${STORE_INFO.telegramUser}] ወይም በ WhatsApp በስልክ ቁጥር [${STORE_INFO.phoneDisplay}] ይላኩልን።`,
      descTi: `ዘልዓልዎ ስእሊ ናብ ቴሌግራም [@${STORE_INFO.telegramUser}] ወይ ብ WhatsApp ብቑጽሪ ስልኪ [${STORE_INFO.phoneDisplay}] ስደዱልና።`,
      descEn: `Forward the screenshot to our Telegram @${STORE_INFO.telegramUser} or via WhatsApp at ${STORE_INFO.phoneDisplay}.`,
      icon: Send,
      color: 'bg-[#8B0000]',
    },
    {
      num: '3',
      titleAm: 'አድራሻችን መጥተው ይጎብኙን',
      titleTi: 'ናብ ድኳንና መጺእኩም ዑደት ግበሩ',
      titleEn: 'Visit Our Shiromeda Boutique',
      descAm: `📍 አድራሻችን፦ [${STORE_INFO.addressAm}] — በአካል መጥተው ጨርቆቹን መዳሰስና መለካት ይችላሉ።`,
      descTi: `📍 ኣድራሻና፦ [${STORE_INFO.addressTi}] — ብኣካል መጺእኩም ጨርቅታትን ጥበብን ክትርእዩን ክትዕቀኑን ትኽእሉ ኢኹም።`,
      descEn: `📍 Address: ${STORE_INFO.addressEn} — Feel the authentic fabrics and get measured in person!`,
      icon: MapPin,
      color: 'bg-[#2E4739]',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#FDFCF8] border-y border-[#EAD8C0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F9F4EC] text-[#8B0000] text-xs font-bold mb-2 border border-[#EAD8C0]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>
              {isTi ? 'ቀሊል ኣገባብ ትእዛዝ' : isAm ? 'ቀላል የትዕዛዝ አሰጣጥ' : 'How to Order & Buy'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241E] tracking-tight">
            {isTi 
              ? '🛍 ትእዛዝ ንምሃብን ንምግዛእን፦' 
              : isAm 
              ? '🛍 ትዕዛዝ ለመስጠት እና ለመግዛት፦' 
              : '🛍 Easy Steps to Place Your Order:'}
          </h2>
          <p className="text-xs sm:text-sm text-[#2D241E]/75 mt-2">
            {isTi
              ? 'ብ 3 ደረጃታት ጥራሕ ዝደለይዎ ባህላዊ ክዳውንቲ ብቐሊሉ ኣዝዙ'
              : isAm 
              ? 'በቀላሉ በ 3 ደረጃዎች ብቻ የሚፈልጉትን ባህላዊ አልባሳት ማዘዝ ይችላሉ' 
              : 'Order your bespoke or ready Habesha dress in 3 effortless steps'}
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            const title = isTi ? step.titleTi : isAm ? step.titleAm : step.titleEn;
            const desc = isTi ? step.descTi : isAm ? step.descAm : step.descEn;

            return (
              <div
                key={step.num}
                className="relative bg-white rounded-3xl p-6 sm:p-7 border border-[#F2E8DA] shadow-xs flex flex-col justify-between hover:shadow-lg transition-shadow"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#F9F4EC] border border-[#EAD8C0] flex items-center justify-center text-[#8B0000] font-serif font-extrabold text-lg">
                      {step.num}
                    </div>
                    <div className={`w-10 h-10 rounded-full ${step.color} text-white flex items-center justify-center shadow-xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-bold text-lg text-[#2D241E] mb-2">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#2D241E]/75 leading-relaxed">
                    {desc}
                  </p>
                </div>

                {/* Direct Action helpers per step */}
                <div className="mt-6 pt-4 border-t border-[#F2E8DA]">
                  {step.num === '1' && (
                    <div className="text-[11px] text-[#8B0000] flex items-center gap-1.5 font-bold">
                      <span>💡</span>
                      <span>
                        {isTi 
                          ? 'ኣብ ስልክኹም ስእሊ ዓቅቡ ወይ ኮድ ሓዙ' 
                          : isAm 
                          ? 'በስልክዎ ወይም በኮምፒውተርዎ ፎቶውን ያስቀምጡ' 
                          : 'Save photos or copy product codes'}
                      </span>
                    </div>
                  )}

                  {step.num === '2' && (
                    <div className="flex items-center gap-2">
                      <a
                        href={STORE_INFO.telegramUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2 px-2.5 bg-[#29b6f6] hover:bg-[#1fa0df] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Telegram</span>
                      </a>
                      <a
                        href={STORE_INFO.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2 px-2.5 bg-[#25D366] hover:bg-[#1faa4f] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  )}

                  {step.num === '3' && (
                    <div className="flex items-center justify-between text-xs">
                      <a
                        href={`tel:${STORE_INFO.phone}`}
                        className="font-bold text-[#2E4739] hover:underline flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{STORE_INFO.phoneDisplay}</span>
                      </a>
                      <button
                        onClick={handleCopyPhone}
                        className="text-[11px] text-[#8B0000] hover:underline flex items-center gap-1 font-bold"
                      >
                        {copiedPhone ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                        <span>
                          {copiedPhone 
                            ? (isTi ? 'ተቐዲሑ' : isAm ? 'ተገልብጧል' : 'Copied') 
                            : (isTi ? 'ስልኪ ቅዳሕ' : isAm ? 'ስልክ ቅዳ' : 'Copy')}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Thank You Callout */}
        <div className="mt-8 text-center">
          <p className="text-sm font-bold text-[#8B0000] bg-[#F9F4EC] border border-[#EAD8C0] py-2.5 px-6 rounded-full inline-block shadow-xs font-serif">
            {isTi 
              ? 'ንዓና ስለ ዝመረጽኩም የቐንየልና! 💛 Abel Habesha' 
              : isAm 
              ? 'እኛን ስለ መረጡ እናመሰግናለን! 💛 Abel Habesha' 
              : 'Thank you for choosing Abel Habesha! 💛'}
          </p>
        </div>

      </div>
    </section>
  );
};
