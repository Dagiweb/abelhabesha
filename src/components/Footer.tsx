import React from 'react';
import { STORE_INFO } from '../data/categories';
import { getTranslation } from '../data/translations';
import { Language, ViewType } from '../types';
import { 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle, 
  Instagram,
  Facebook,
  Youtube,
  Sparkles,
  Mail,
  FileText,
  Ruler
} from 'lucide-react';
import { AbelHabeshaLogo } from './AbelHabeshaLogo';

// Accurate official TikTok vector icon
const TikTokIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.86-4.49V8.58a8.28 8.28 0 0 0 4.82 1.54V6.69h-.91z" />
  </svg>
);

interface FooterProps {
  language: Language;
  onSelectHashtag: (tag: string) => void;
  onNavigate?: (view: ViewType) => void;
  onOpenReturnPolicy?: () => void;
  onOpenMeasurementGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  language, 
  onSelectHashtag, 
  onNavigate,
  onOpenReturnPolicy,
  onOpenMeasurementGuide
}) => {
  const t = getTranslation(language);
  const currentAddress = language === 'ti' ? STORE_INFO.addressTi : (language === 'am' ? STORE_INFO.addressAm : STORE_INFO.addressEn);

  const socialLinks = [
    {
      name: 'TikTok',
      url: STORE_INFO.socialLinks.tiktok,
      icon: TikTokIcon,
      color: 'hover:bg-[#000000] hover:text-[#00f2fe]',
    },
    {
      name: 'Telegram Channel',
      url: STORE_INFO.telegramChannel,
      icon: Send,
      color: 'hover:bg-[#29b6f6]',
    },
    {
      name: 'WhatsApp',
      url: STORE_INFO.whatsappUrl,
      icon: MessageCircle,
      color: 'hover:bg-[#25D366]',
    },
    {
      name: 'Instagram',
      url: STORE_INFO.socialLinks.instagram,
      icon: Instagram,
      color: 'hover:bg-[#E1306C]',
    },
    {
      name: 'Facebook',
      url: STORE_INFO.socialLinks.facebook,
      icon: Facebook,
      color: 'hover:bg-[#1877F2]',
    },
    {
      name: 'YouTube',
      url: STORE_INFO.socialLinks.youtube,
      icon: Youtube,
      color: 'hover:bg-[#FF0000]',
    },
    {
      name: 'Email',
      url: STORE_INFO.emailUrl,
      icon: Mail,
      color: 'hover:bg-[#8B0000]',
    },
  ];

  const categoryTags = [
    { tag: '#የሰርግ', nameTi: 'ናይ መርዓ', nameAm: 'የሰርግ አልባሳት', nameEn: 'Wedding' },
    { tag: '#የመልስ', nameTi: 'ናይ መልሲ', nameAm: 'የመልስ አልባሳት', nameEn: 'Meles' },
    { tag: '#የካፕል', nameTi: 'ናይ ጥንዲ (ካፕል)', nameAm: 'የጥንዶች (Couple)', nameEn: 'Couples' },
    { tag: '#የወንድ', nameTi: 'ናይ ደቂ-ተባዕትዮ', nameAm: 'የወንዶች ባህላዊ', nameEn: "Men's" },
    { tag: '#የኣክሱም_ፈትል', nameTi: 'ናይ ኣክሱም ፈትሊ', nameAm: 'የኣክሱም ፈትልና ማግ', nameEn: 'Axum Fetil' },
    { tag: '#የራያ_ልብስ', nameTi: 'ናይ ራያ ባህሊ', nameAm: 'የራያ ባህል', nameEn: 'Raya' },
    { tag: '#የሳባጨርቅ_ልብስ', nameTi: 'ናይ ሳባ ጨርቂ', nameAm: 'የሳባ ጨርቅ', nameEn: 'Saba Fabric' },
    { tag: '#የሽፎን_ቀሚስ', nameTi: 'ናይ ሺፎን ክዳን', nameAm: 'የሽፎን ቀሚስ (Chiffon)', nameEn: 'Chiffon' },
    { tag: '#የቻይናጨርቅ_ልብስ', nameTi: 'ናይ ቻይና ጨርቂ', nameAm: 'የቻይና ጨርቅ', nameEn: 'China Fabric' },
    { tag: '#የኣሸንዳ', nameTi: 'ናይ ኣሸንዳ ክዳን', nameAm: 'የአሸንዳ ልብስ', nameEn: 'Ashenda' },
    { tag: '#የቡና', nameTi: 'ናይ ቡን ስርዓት', nameAm: 'የቡና ሥነ-ሥርዓት', nameEn: 'Coffee Set' },
  ];

  return (
    <footer className="bg-[#2D241E] text-[#FDFCF8] pt-14 pb-8 border-t-4 border-[#8B0000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <AbelHabeshaLogo variant="gold" size="lg" showPhone={true} />
            </div>

            <p className="text-xs sm:text-sm text-[#FDFCF8]/80 leading-relaxed font-light">
              {language === 'ti'
                ? 'ንዝተፈላለዩ በዓላት ዝኾኑ ሓደሽቲ ዝተዳለዉ ባህላዊ ሓበሻ ክዳውንትን ሺፎናትን ብተመጣጣኒ ዋጋ ኣዳልና ኣለና። ከምኡውን ብዝመረፅዎ ዲዛይን ኣብ ሓፂር ግዜ ቆፀሮ ነዳሉ ኢና።'
                : language === 'am' 
                ? 'ለተለያዩ ዝግጅቶች የሚሆኑ ኣዳዲስ የተዘጋጁ ሓበሻ ቀሚሶች እና ሽፎኖችን በተመጣጣኝ ዋጋ ኣዘጋጅተናል። እንዲሁም በፈለጉት ዲዛይን በኣጭር ግዜ ቀጠሮ እናዘጋጃለን።'
                : 'Finest handcrafted Ethiopian traditional gowns and lightweight modern chiffon dresses. Crafted with authentic Axum fetel and Saba fabric in Shiromeda.'}
            </p>

            <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl space-y-2">
              <p className="text-xs font-bold text-[#C5A059] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>
                  {language === 'am' ? '👉 በብዛት ለሚያሰሩ ታላቅ ቅናሽ!' : '👉 Special discounts for bulk orders!'}
                </span>
              </p>
              <p className="text-[11px] text-[#FDFCF8]/80 leading-normal">
                {language === 'am'
                  ? 'ለሰርግ ሚዜዎች፦ ለቡድን እና ለቤተሰብ አልባሳት ታላቅ ቅናሽ እናደርጋለን።'
                  : 'Bridal parties: Great bulk savings for groups and families.'}
              </p>
            </div>
          </div>

          {/* Quick Category Catalog Links */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/70 mb-2">
              {t.popularCategoriesFooter}
            </h4>
            <div className="flex flex-wrap gap-2">
              {categoryTags.map((item) => {
                const label = language === 'ti' ? item.nameTi : (language === 'am' ? item.nameAm : item.nameEn);
                return (
                  <button
                    key={item.tag}
                    onClick={() => {
                      onSelectHashtag(item.tag);
                      const el = document.getElementById('category-catalog') || document.getElementById('hashtag-catalog');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#8B0000] hover:text-white border border-white/10 text-xs text-[#FDFCF8]/90 transition-colors cursor-pointer"
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Guides & Customer Policy Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              {onOpenMeasurementGuide && (
                <button
                  type="button"
                  onClick={onOpenMeasurementGuide}
                  className="flex items-center gap-2 text-xs font-bold text-[#C5A059] hover:text-white transition-colors text-left cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{language === 'am' ? 'የልኬት አወሳሰድ መመሪያ (Measurement Guide)' : 'Measurement Guide'}</span>
                </button>
              )}
              {onOpenReturnPolicy && (
                <button
                  type="button"
                  onClick={onOpenReturnPolicy}
                  className="flex items-center gap-2 text-xs font-bold text-[#C5A059] hover:text-white transition-colors text-left cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{language === 'am' ? 'የመመለሻ እና የትዕዛዝ ደንብ (Return Policy)' : 'Return & Order Policy'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Store Location & Direct Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/70 mb-4">
              {t.visitOurBoutique}
            </h4>

            <div className="flex items-start gap-2.5 text-xs text-[#FDFCF8]/90">
              <MapPin className="w-4 h-4 text-[#8B0000] shrink-0 mt-0.5" />
              <span>
                <strong>{t.addressLabel}</strong> {currentAddress}
              </span>
            </div>

            <div className="pt-2">
              <p className="text-[10px] opacity-60 uppercase tracking-widest mb-1">
                {t.directLineLabel}
              </p>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <a href={`tel:${STORE_INFO.phone}`} className="text-lg font-bold text-[#C5A059] hover:underline">
                  {STORE_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-[#FDFCF8]/90">
              <Send className="w-4 h-4 text-[#29b6f6] shrink-0" />
              <a 
                href={STORE_INFO.telegramChannel} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-[#29b6f6] transition-colors"
              >
                Telegram Channel: @{STORE_INFO.telegramChannelUser}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-[#FDFCF8]/90">
              <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
              <a 
                href={STORE_INFO.emailUrl} 
                className="hover:text-[#C5A059] transition-colors"
              >
                {STORE_INFO.email}
              </a>
            </div>

            {/* Social Media Link Buttons with Authentic Icons */}
            <div className="pt-2">
              <p className="text-[10px] opacity-60 uppercase tracking-widest mb-2">
                {t.socialFollow} (TikTok • Telegram • WhatsApp • Instagram • Facebook)
              </p>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-85 hover:opacity-100 text-white transition-all shadow-xs ${s.color}`}
                      title={s.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Navigation Quick Links */}
        <div className="py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-6 text-xs font-semibold text-[#FDFCF8]/90">
            <button
              onClick={() => {
                if (onNavigate) onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              {t.navHome}
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => {
                if (onNavigate) onNavigate('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              {t.navProducts}
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => {
                if (onNavigate) onNavigate('blogs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              {t.navBlogs}
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => {
                if (onNavigate) onNavigate('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              {t.navAbout}
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => {
                if (onNavigate) onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              {t.navContact}
            </button>
          </div>

          <div className="text-xs text-[#FDFCF8]/60">
            Shiromeda Blatena Building 4th Fl. Office 110, Addis Ababa
          </div>
        </div>

        {/* Bottom copyright & slogan */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FDFCF8]/60">
          <p>
            © {new Date().getFullYear()} Abel Habesha ({language === 'ti' ? 'ኣቤል ሓበሻ ባህላዊ ክዳውንቲ' : 'አቤል ሓበሻ አልባሳት'}). {t.allRightsReserved}
          </p>

          <p className="flex items-center gap-1.5 font-medium text-[#C5A059]">
            <span>Abel Habesha — የጥበብ ጥራት፣ የባህል ኩራት!</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

