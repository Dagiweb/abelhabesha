import React, { useState } from 'react';
import { Language } from '../types';
import { STORE_INFO } from '../data/categories';
import { 
  MapPin, 
  Phone, 
  Send, 
  MessageCircle, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Calendar,
  User,
  Check,
  Copy,
  ExternalLink
} from 'lucide-react';

interface ContactUsPageProps {
  language: Language;
  onOpenCustomOrder: () => void;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({
  language,
  onOpenCustomOrder
}) => {
  const isAm = language === 'am';
  const isTi = language === 'ti';

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    occasion: 'Wedding',
    eventDate: '',
    fabricPreference: 'Axum Pure Fetel',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const occasionOptions = [
    { value: 'Wedding', labelAm: 'የሰርግ ሓበሻ ቀሚስ (Wedding)', labelTi: 'ናይ መርዓ ቀሚሽ (Wedding)', labelEn: 'Wedding Habesha Kemis' },
    { value: 'Meles', labelAm: 'የመልስ ዲዛይን (Meles)', labelTi: 'ናይ መልሲ ዲዛይን (Meles)', labelEn: 'Meles Traditional Dress' },
    { value: 'Couple', labelAm: 'የጥንዶች አልባሳት (Couple Set)', labelTi: 'ናይ መጻምድቲ ክዳውንቲ (Couple Set)', labelEn: 'Couples Matching Attire' },
    { value: 'BulkBridal', labelAm: 'የሰርግ ሚዜዎች / የጅምላ ትዕዛዝ', labelTi: 'ናይ መርዓ ሚዜታት / ናይ ጅምላ ትእዛዝ', labelEn: 'Bridal Party & Bulk Order' },
    { value: 'Chiffon', labelAm: 'ዘመናዊ የሽፎን ቀሚስ (Chiffon)', labelTi: 'ዘመናዊ ሺፎን ቀሚሽ (Chiffon)', labelEn: 'Modern Chiffon Kemis' },
    { value: 'Holiday', labelAm: 'ለበዓልና ለተለያዩ ዝግጅቶች (Holiday/Other)', labelTi: 'ንበዓላትን ዝተፈላለዩን (Holiday/Other)', labelEn: 'Holiday & Other Occasions' },
  ];

  const fabricOptions = [
    { value: 'Axum Pure Fetel', label: 'የኣክሱም ፈትል ንጹህ ጥጥ (Axum Handspun)' },
    { value: 'Royal Tibeb Gold', label: 'የወርቅ ጥልፍ ዘውዳዊ ጥበብ (Royal Gold Tibeb)' },
    { value: 'Gondar Heritage', label: 'የጎንደር ዙፋን ቅርስ ጥበብ (Gondar Heritage)' },
    { value: 'Modern Chiffon', label: 'ዘመናዊ የሽፎን ጨርቅ (Flowing Chiffon)' },
    { value: 'Raya / Saba Heritage', label: 'የራያ ወይም የሳባ ባህላዊ ጥበብ (Raya / Saba)' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getFormattedMessage = () => {
    return `ሰላም አቤል ሓበሻ (Abel Habesha)፤\n` +
      `👤 ስም፡ ${formData.fullName || 'ደንበኛ'}\n` +
      `📞 ስልክ፡ ${formData.phone || 'ያልተገለጸ'}\n` +
      `✉️ ኢሜይል፡ ${formData.email || 'ያልተገለጸ'}\n` +
      `🎉 ዝግጅት፡ ${formData.occasion}\n` +
      `📅 የቀጠሮ ቀን፡ ${formData.eventDate || 'ያልተወሰነ'}\n` +
      `🧵 የጨርቅ ምርጫ፡ ${formData.fabricPreference}\n` +
      `💬 መልእክት፡ ${formData.message || 'ስለ አልባሳት መረጃና ዋጋ ለማወቅ እፈልጋለሁ።'}`;
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(getFormattedMessage());
    window.open(`https://wa.me/251913312314?text=${text}`, '_blank');
  };

  const handleSendTelegram = () => {
    const text = encodeURIComponent(getFormattedMessage());
    window.open(`https://t.me/AbelDesignChat?text=${text}`, '_blank');
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Inquiry from ${formData.fullName || 'Customer'} - ${formData.occasion}`);
    const body = encodeURIComponent(getFormattedMessage());
    window.open(`mailto:info@abelhabesha.com.et?subject=${subject}&body=${body}`, '_blank');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(getFormattedMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-[#FDFCF8] min-h-screen text-[#2D241E]">
      {/* Header */}
      <div className="bg-linear-to-b from-[#F9F4EC] to-[#FDFCF8] border-b border-[#EAD8C0]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#EAD8C0] text-[#8B0000] text-xs font-bold rounded-full mb-4 shadow-2xs">
              <span>{isTi ? '📍 ርኸቡና' : isAm ? '📍 አድራሻ እና ግንኙነት' : '📍 Showroom & Inquiries'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#8B0000] tracking-tight mb-3">
              {isTi ? 'ኣድራሻናን ርክብን' : isAm ? 'ያግኙን እና ይዘዙ' : 'Contact & Visit Us'}
            </h1>
            <p className="text-base sm:text-lg text-[#2D241E]/80 leading-relaxed font-sans">
              {isTi
                ? 'ናብ ድኳንና ሽሮሜዳ ብላቴና ህንጻ ምጹ፣ ብስልኪ ደውሉ ወይ ብዋትስኣፕን ቴሌግራምን ሓበሬታ ስደዱልና።'
                : isAm
                ? 'በሽሮሜዳ ብላቴና ህንፃ የሚገኘውን ሱቃችንን ይጎብኙ፣ በስልክ በቀጥታ ይደውሉ ወይም በዋትስአፕና በቴሌግራም ያናግሩን።'
                : 'Visit our atelier in Shiromeda Blatena Building, call us directly, or reach out anytime on WhatsApp and Telegram.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Contact Channels + Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info & Showroom Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Showroom Location Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#EAD8C0] shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#8B0000]/10 text-[#8B0000] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-[#2D241E] mb-1">
                    {isTi ? 'ናይ ድኳንና ኣድራሻ' : isAm ? 'የሱቃችን አድራሻ' : 'Showroom & Atelier'}
                  </h3>
                  <p className="text-sm font-semibold text-[#8B0000] mb-1">
                    {isTi || isAm ? STORE_INFO.addressAm : STORE_INFO.addressEn}
                  </p>
                  <p className="text-xs text-[#2D241E]/70 leading-relaxed">
                    {isTi 
                      ? 'ሽሮሜዳ ብላቴና ህንጻ 4ይ ደረጀ ቢሮ ቁጽሪ 110፣ ኣዲስ ኣበባ' 
                      : isAm 
                      ? 'ሽሮሜዳ ብላቴና ህንፃ 4ኛ ፎቅ ቢሮ ቁጥር 110፣ አዲስ አበባ' 
                      : 'Shiromeda Blatena Building, 4th Floor, Office 110, Addis Ababa, Ethiopia'}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Calling & Messaging */}
            <div className="bg-white p-6 rounded-2xl border border-[#EAD8C0] shadow-xs space-y-4">
              <h3 className="text-base font-serif font-bold text-[#2D241E] mb-1">
                {isTi ? 'ቀጥታ ርክብ' : isAm ? 'ቀጥታ የስልክ መስመሮች' : 'Direct Channels'}
              </h3>

              {/* Phone */}
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="flex items-center justify-between p-3 rounded-xl bg-[#F9F4EC] hover:bg-[#EAD8C0]/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#8B0000] text-white flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#2D241E]/70 block">
                      {isTi ? 'ስልኪ ደውሉልና' : isAm ? 'ስልክ ይደውሉልን' : 'Direct Phone'}
                    </span>
                    <span className="text-sm font-bold text-[#2D241E]">
                      {STORE_INFO.phoneDisplay}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#8B0000] group-hover:underline">
                  {isTi ? 'ደውሉ' : isAm ? 'ይደውሉ' : 'Call'}
                </span>
              </a>

              {/* WhatsApp */}
              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#25D366] text-white flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#17853f] block">
                      WhatsApp Chat & Orders
                    </span>
                    <span className="text-sm font-bold text-[#17853f]">
                      {STORE_INFO.phoneDisplay}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#17853f] group-hover:underline">
                  Chat →
                </span>
              </a>

              {/* Telegram */}
              <a
                href={STORE_INFO.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#29b6f6]/10 hover:bg-[#29b6f6]/20 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#29b6f6] text-white flex items-center justify-center">
                    <Send className="w-4 h-4 ml-0.5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#0f6c96] block">
                      Telegram Channel & Inbox
                    </span>
                    <span className="text-sm font-bold text-[#0f6c96]">
                      @{STORE_INFO.telegramUser}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#0f6c96] group-hover:underline">
                  Open →
                </span>
              </a>

              {/* Email */}
              <a
                href={STORE_INFO.emailUrl}
                className="flex items-center justify-between p-3 rounded-xl bg-[#8B0000]/5 hover:bg-[#8B0000]/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#8B0000] text-white flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8B0000] block">
                      Official Email
                    </span>
                    <span className="text-sm font-bold text-[#2D241E]">
                      {STORE_INFO.email}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#8B0000] group-hover:underline">
                  Email →
                </span>
              </a>
            </div>

            {/* Business Hours */}
            <div className="bg-[#F9F4EC] p-5 rounded-2xl border border-[#EAD8C0]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8B0000] mb-2 uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>{isTi ? 'ናይ ስራሕ ሰዓታት' : isAm ? 'የስራ ሰዓታት' : 'Hours of Operation'}</span>
              </div>
              <div className="space-y-1.5 text-xs text-[#2D241E]/80">
                <div className="flex justify-between">
                  <span className="font-semibold">{isTi ? 'ሰኑይ – ቀዳም' : isAm ? 'ሰኞ – ቅዳሜ' : 'Monday – Saturday'}:</span>
                  <span>8:30 AM – 7:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{isTi ? 'ሰንበት' : isAm ? 'እሁድ' : 'Sunday'}:</span>
                  <span>9:00 AM – 6:00 PM</span>
                </div>
              </div>
              <p className="text-[11px] text-[#8B0000] font-semibold mt-3 pt-2 border-t border-[#EAD8C0]">
                {isTi 
                  ? '👉 ኣብ ዝኾነ ሰዓት ብዋትስኣፕን ቴሌግራምን ምሕታት ይከኣል እዩ።'
                  : isAm 
                  ? '👉 በማንኛውም ሰዓት በዋትስአፕና በቴሌግራም መልእክት መላክ ይችላሉ።'
                  : '👉 You can send WhatsApp and Telegram messages anytime 24/7.'}
              </p>
            </div>

          </div>

          {/* Right Column: Inquiry & Tailoring Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAD8C0] shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#8B0000] mb-1">
                  {isTi ? 'ናይ ክዳን ምሕታት ወይ ምእዛዝ ቅጺ' : isAm ? 'የአልባሳት መጠየቂያ ወይም ማዘዣ ቅፅ' : 'Consultation & Inquiry Form'}
                </h2>
                <p className="text-xs sm:text-sm text-[#2D241E]/70">
                  {isTi
                    ? 'ናይ ዝደለይዎ ክዳን መረጃ ምልኡ፤ ብቐጥታ ብዋትስኣፕ፣ ብኢመይል ወይ ብቴሌግራም ንምልኣኽ ድሉው ይኸውን።'
                    : isAm
                    ? 'የሚፈልጉትን ልብስ መረጃ ይሙሉ፤ በቀጥታ በዋትስአፕ፣ በቴሌግራም ወይም በኢሜይል ወዲያውኑ መላክ ይችላሉ።'
                    : 'Fill out your event details below to consult with our master tailors or send via WhatsApp/Email.'}
                </p>
              </div>

              {submitted ? (
                <div className="bg-[#F9F4EC] p-6 sm:p-8 rounded-2xl border border-[#C5A059] text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#8B0000] text-[#C5A059] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#8B0000]">
                    {isTi ? 'መልእኽትኹም ተዳልዩ ኣሎ!' : isAm ? 'መልእክትዎ ተዘጋጅቷል!' : 'Your Inquiry is Ready!'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2D241E]/80 max-w-md mx-auto">
                    {isTi
                      ? 'ነዚ ዝተዳለወ መልእኽቲ ብዋትስኣፕ ወይ ብቴሌግራም ብቀጥታ ናብ ኣቤል ሓበሻ ስደዱልና።'
                      : isAm
                      ? 'ይህንን የተዘጋጀ መልእክት በቀጥታ በዋትስአፕ ወይም በቴሌግራም በመላክ ከአቤል ሓበሻ ጋር ፈጣን ምላሽ ያግኙ።'
                      : 'Click below to dispatch this message directly to our showroom team via WhatsApp or Telegram.'}
                  </p>

                  {/* Pre-formatted Message Display */}
                  <div className="p-4 bg-white rounded-xl border border-[#EAD8C0] text-left text-xs font-mono text-[#2D241E] whitespace-pre-line">
                    {getFormattedMessage()}
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleSendWhatsApp}
                      className="px-5 py-2.5 bg-[#25D366] text-white hover:bg-[#1faa53] text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send on WhatsApp</span>
                    </button>
                    <button
                      onClick={handleSendTelegram}
                      className="px-5 py-2.5 bg-[#29b6f6] text-white hover:bg-[#1ea1db] text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send on Telegram</span>
                    </button>
                    <button
                      onClick={handleCopyMessage}
                      className="px-4 py-2.5 bg-white border border-[#EAD8C0] text-[#2D241E] hover:bg-[#F9F4EC] text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? (isAm ? 'ተገልብጧል!' : 'Copied!') : (isAm ? 'ቅዳ' : 'Copy')}</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2.5 text-xs text-[#8B0000] font-semibold hover:underline"
                    >
                      {isAm ? 'ቅፁን መልሰው አርትዑ' : 'Edit Form'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitForm} className="space-y-4">
                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2D241E] mb-1">
                        {isTi ? 'ምሉእ ስም' : isAm ? 'ሙሉ ስምዎ' : 'Full Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder={isAm ? 'ለምሳሌ፡ ሰላማዊት ከበደ' : 'e.g., Selamawit Kebede'}
                        className="w-full px-3.5 py-2 text-xs bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D241E] mb-1">
                        {isTi ? 'ስልኪ / ዋትስኣፕ' : isAm ? 'ስልክ / ዋትስአፕ' : 'Phone or WhatsApp'} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+251 91..."
                        className="w-full px-3.5 py-2 text-xs bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E]"
                      />
                    </div>
                  </div>

                  {/* Email & Event Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2D241E] mb-1">
                        {isTi ? 'ኢመይል' : isAm ? 'ኢሜይል አድራሻ' : 'Email Address'}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2 text-xs bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D241E] mb-1">
                        {isTi ? 'ናይ ዝግጅት መዓልቲ' : isAm ? 'የዝግጅቱ ወይም የቀጠሮ ቀን' : 'Target Event Date'}
                      </label>
                      <input
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => handleInputChange('eventDate', e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E]"
                      />
                    </div>
                  </div>

                  {/* Occasion & Fabric Preference */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2D241E] mb-1">
                        {isTi ? 'ናይ ዝግጅት ዓይነት' : isAm ? 'የዝግጅቱ አይነት' : 'Occasion'}
                      </label>
                      <select
                        value={formData.occasion}
                        onChange={(e) => handleInputChange('occasion', e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E]"
                      >
                        {occasionOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {isTi ? opt.labelTi : isAm ? opt.labelAm : opt.labelEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D241E] mb-1">
                        {isTi ? 'ዝመረጽክምዎ ዓይነት ጨርቂ' : isAm ? 'የጨርቅ ምርጫ' : 'Fabric Preference'}
                      </label>
                      <select
                        value={formData.fabricPreference}
                        onChange={(e) => handleInputChange('fabricPreference', e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E]"
                      >
                        {fabricOptions.map((f, i) => (
                          <option key={i} value={f.value}>{f.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message & Custom Fitting notes */}
                  <div>
                    <label className="block text-xs font-bold text-[#2D241E] mb-1">
                      {isTi ? 'ተወሳኺ ሓበሬታ ወይ ድሌትኩም' : isAm ? 'ተጨማሪ ማብራሪያ ወይም የሰውነት ልክ' : 'Custom Request or Measurements'}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder={isAm 
                        ? 'የሚፈልጉትን ቀለም፣ የጥልፍ ዲዛይን ወይም የቁመትና ደረት ልክዎን እዚህ ይጻፉልን...' 
                        : 'Describe your style preferences, colors, or body measurements (length, chest, waist)...'}
                      className="w-full px-3.5 py-2 text-xs bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E]"
                    ></textarea>
                  </div>

                  {/* Submission and Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 bg-[#8B0000] hover:bg-[#6e0000] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#C5A059]" />
                      <span>{isTi ? 'መልእኽቲ ኣዳሉ' : isAm ? 'መልእክት አዘጋጅ' : 'Prepare Inquiry'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendWhatsApp}
                      className="w-full sm:w-auto px-5 py-3 bg-[#25D366] hover:bg-[#1faa53] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Direct</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendEmail}
                      className="w-full sm:w-auto px-5 py-3 bg-white border border-[#EAD8C0] text-[#2D241E] hover:bg-[#F9F4EC] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4 text-[#8B0000]" />
                      <span>Email</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
