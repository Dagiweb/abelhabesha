import React from 'react';
import { STORE_INFO } from '../data/categories';
import { getTranslation } from '../data/translations';
import { Language } from '../types';
import { 
  Phone, 
  MapPin, 
  Globe, 
  Send, 
  MessageCircle, 
  Video,
  Instagram,
  Facebook,
  Youtube,
  Sparkles,
  Mail
} from 'lucide-react';

interface FooterProps {
  language: Language;
  onSelectHashtag: (tag: string) => void;
  onNavigate?: (view: 'home' | 'products' | 'about' | 'contact' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onSelectHashtag, onNavigate }) => {
  const t = getTranslation(language);
  const currentAddress = language === 'ti' ? STORE_INFO.addressTi : (language === 'am' ? STORE_INFO.addressAm : STORE_INFO.addressEn);

  const socialLinks = [
    {
      name: 'WhatsApp',
      url: STORE_INFO.whatsappUrl,
      icon: MessageCircle,
      color: 'hover:bg-[#25D366]',
    },
    {
      name: 'Telegram',
      url: STORE_INFO.telegramUrl,
      icon: Send,
      color: 'hover:bg-[#29b6f6]',
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
      name: 'TikTok',
      url: STORE_INFO.socialLinks.tiktok,
      icon: Video,
      color: 'hover:bg-[#000000]',
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
    { tag: '#የኣክሱም_ፈትል', nameTi: 'ናይ ኣክሱም ፈትሊ', nameAm: 'የኣክሱም ፈትል', nameEn: 'Axum Fetil' },
    { tag: '#የራያ_ልብስ', nameTi: 'ናይ ራያ ባህሊ', nameAm: 'የራያ ባህል', nameEn: 'Raya' },
    { tag: '#የሳባጨርቅ_ልብስ', nameTi: 'ናይ ሳባ ጨርቂ', nameAm: 'የሳባ ጨርቅ', nameEn: 'Saba Fabric' },
    { tag: '#የቻይናጨርቅ_ልብስ', nameTi: 'ናይ ቻይና ጨርቂ/ሺፎን', nameAm: 'የቻይና ጨርቅ/ሽፎን', nameEn: 'Chiffon' },
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
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8B0000] to-[#C5A059] p-0.5">
                <div className="w-full h-full rounded-full bg-[#2D241E] flex items-center justify-center text-white font-serif font-bold text-xl">
                  AH
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif tracking-tight text-white">
                  ABEL HABESHA
                </h3>
                <p className="text-xs text-[#C5A059] font-bold tracking-widest uppercase">
                  {language === 'ti' ? 'ኣቤል ሓበሻ ባህላዊ ክዳውንቲ & ሺፎናት' : 'አቤል ሓበሻ አልባሳት & ሽፎኖች'}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#FDFCF8]/80 leading-relaxed font-light">
              {language === 'ti'
                ? 'ንዝተፈላለዩ በዓላት ዝኾኑ ሓደሽቲ ዝተዳለዉ ባህላዊ ሓበሻ ክዳውንትን ሺፎናትን ብተመጣጣኒ ዋጋ ኣዳልና ኣለና። ከምኡውን ብዝመረፅዎ ዲዛይን ኣብ ሓፂር ግዜ ቆፀሮ ነዳሉ ኢና።'
                : language === 'am' 
                ? 'ለተለያዩ ዝግጅቶች የሚሆኑ ኣዳዲስ የተዘጋጁ ሓበሻ ቀሚሶች እና ሽፎኖችን በተመጣጣኝ ዋጋ ኣዘጋጅተናል። እንዲሁም በፈለጉት ዲዛይን በኣጭር ግዜ ቀጠሮ እናዘጋጃለን።'
                : 'Finest handcrafted Ethiopian traditional gowns and lightweight modern chiffon dresses. Crafted with authentic Axum fetel and Saba fabric in Shiromeda.'}
            </p>

            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-xs font-bold text-[#C5A059] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>
                  {language === 'ti' 
                    ? '👉 ብብዝሒ ንዘስርሑ ዓቢ ቅናሽ ንገብር ኢና!' 
                    : language === 'am' 
                    ? '👉 በብዛት ለሚያሰሩ ታላቅ ቅናሽ እናደርጋለን!' 
                    : '👉 Special discounts for bulk and wedding party orders!'}
                </span>
              </p>
            </div>
          </div>

          {/* Quick Category Catalog Links */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/70 mb-4">
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
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#8B0000] hover:text-white border border-white/10 text-xs text-[#FDFCF8]/90 transition-colors"
                  >
                    {label}
                  </button>
                );
              })}
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
              <Globe className="w-4 h-4 text-[#C5A059] shrink-0" />
              <a 
                href={STORE_INFO.website} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-[#C5A059] transition-colors"
              >
                abelhabesha.com.et
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

            {/* Social Media Link Buttons */}
            <div className="pt-2">
              <p className="text-[10px] opacity-60 uppercase tracking-widest mb-2">
                {t.socialFollow}
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
                      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-80 hover:opacity-100 hover:border-[#8B0000] hover:bg-[#8B0000] text-white transition-all shadow-xs"
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
              className="hover:text-[#C5A059] transition-colors"
            >
              {t.navHome}
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => {
                if (onNavigate) onNavigate('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#C5A059] transition-colors"
            >
              {t.navProducts}
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => {
                if (onNavigate) onNavigate('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#C5A059] transition-colors"
            >
              {t.navAbout}
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => {
                if (onNavigate) onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#C5A059] transition-colors"
            >
              {t.navContact}
            </button>
          </div>

          <div className="text-xs text-[#FDFCF8]/60">
            Shiromeda Blatena Building 4th Fl. Office 110, Addis Ababa
          </div>
        </div>

        {/* Bottom copyright & appreciation */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FDFCF8]/60">
          <p>
            © {new Date().getFullYear()} Abel Habesha ({language === 'ti' ? 'ኣቤል ሓበሻ ባህላዊ ክዳውንቲ' : 'አቤል ሓበሻ አልባሳት'}). {t.allRightsReserved}
          </p>

          <p className="flex items-center gap-1.5 font-medium text-[#FDFCF8]">
            <span>{t.thankYouFooter}</span>
            <span className="text-[#C5A059]">💛</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

