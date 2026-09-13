import React from 'react';
import { Language } from '../types';
import { STORE_INFO } from '../data/categories';
import { 
  Sparkles, 
  Scissors, 
  HeartHandshake, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ArrowRight,
  Send,
  MessageCircle,
  Gem,
  Award,
  CheckCircle2,
  Tag,
  PhoneCall
} from 'lucide-react';
import { HowToOrderSection } from './HowToOrderSection';
import {
  imgWedding,
  imgMeles,
  imgCouple,
  imgAxum,
  imgCoffee,
  imgRaya
} from '../data/products';

interface AboutUsPageProps {
  language: Language;
  onExploreCatalog: () => void;
  onOpenCustomOrder: () => void;
  onContactClick: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  language,
  onExploreCatalog,
  onOpenCustomOrder,
  onContactClick
}) => {
  const isAm = language === 'am';
  const isTi = language === 'ti';

  const storyContent = {
    badge: isTi ? '✨ ብዛዕባ ኣቤል ሓበሻ' : isAm ? '✨ ስለ አቤል ሓበሻ' : '✨ Heritage & Craftsmanship',
    headline: isTi 
      ? 'ኣብ ማእከል ሽሮሜዳ ዝተተከለ ናይ ኢትዮጵያ ባህላዊ አልባሳት መፍለቒ' 
      : isAm 
      ? 'በሽሮሜዳ እምብርት የሚገኝ እውነተኛ የኢትዮጵያ ባህላዊ አልባሳት መፍለቂያ' 
      : 'Rooted in the Historic Weaving Heart of Shiromeda, Addis Ababa',
    subheadline: isTi
      ? 'ኣቤል ሓበሻ ንናይ ኣቦታትን ኣዴታትን ጥንታዊ ናይ ኢደ-ጥበብ ውርሻ ምስ ዘመናዊ ዲዛይን ብምውህሃድ ንመርዓ፣ ንመልሲ፣ ንበዓላት ፍሉይ ውበት ዘለዎም ክዳውንቲ ብፍቕርን ብጥንቃቐን የዳልወልኩም።'
      : isAm
      ? 'አቤል ሓበሻ የአባቶቻችንንና የእናቶቻችንን ጥንታዊ የእጅ እደ-ጥበብ ቅርስ ከዘመናዊ ፋሽን ጋር በማዋሃድ ለሰርግ፣ ለመልስና ለተለያዩ ክቡር ዝግጅቶች እጅግ ውብ የሆኑ አልባሳትን በፍቅርና በጥንቃቄ ያዘጋጃል።'
      : 'Abel Habesha unites generations of traditional Ethiopian handloom artistry with refined modern tailoring, creating regal wedding gowns, Meles attire, and custom holiday dresses in Shiromeda.',
  };

  const pillars = [
    {
      icon: Gem,
      titleAm: 'ንጹህ የፈትል ጥጥ (100% Pure Fetel)',
      titleTi: 'ጽሩይ ናይ ፈትሊ ጡጥ (100% Fetel)',
      titleEn: '100% Pure Handspun Cotton',
      descAm: 'በጥንታዊ የእንዝርት እደ-ጥበብ በባህላዊ መንገድ የተፈተለ፣ ለሰውነት ምቾት የሚሰጥ እውነተኛ የኢትዮጵያ የተፈጥሮ ጥጥ እንጠቀማለን።',
      descTi: 'ብጥንታዊ ናይ እንዝርት ኢደ-ጥበብ ብባህላዊ መንገዲ ዝተፈትለ፣ ንሰብነት ምቹእ ዝኾነ ናይ ሓቂ ባህላዊ ጡጥ ንጥቀም።',
      descEn: 'Spun using traditional spindles by heritage artisans, our handspun cotton offers unparalleled softness, breathability, and authentic texture.',
    },
    {
      icon: Scissors,
      titleAm: 'የተዋጣለት ጥልፍና ጥበብ (Master Tibeb)',
      titleTi: 'ብሉጽ ጥልፍን ጥበብን (Master Tibeb)',
      titleEn: 'Master Artisan Hand-Woven Tibeb',
      descAm: 'የወርቅ፣ የብር እና የሐር ፈትል ጥልፎች በእጅ ሸማ በታላቅ ጥንቃቄ ተሰርተው በየቀሚሱ ጠርዝና ደረት ላይ በግርማ ሞገስ ያርፋሉ።',
      descTi: 'ናይ ወርቂ፣ ብሩርን ሓርን ጥልፍታት ብኢደ-ሸማ ብዓቢ ጥንቃቐ ተሰሪሖም ኣብ ነፍሲ ወከፍ ክዳን ብግርማ ይቐርቡ።',
      descEn: 'Intricate geometric patterns woven thread by thread using gold, silver, and vibrant silk threads, representing Ethiopia’s royal court tradition.',
    },
    {
      icon: Clock,
      titleAm: 'በኣጭር ግዜ ቀጠሮ (Fast Bespoke Turnaround)',
      titleTi: 'ብሓጺር ግዜ ቆጸራ (Fast Bespoke Turnaround)',
      titleEn: 'Rapid Custom Fit & Delivery',
      descAm: 'የዝግጅትዎ ቀን ሳይደርስ በፈለጉት መጠንና ዲዛይን በኣጭር ግዜ ሰርተን እናስረክባለን፤ ለሰርግ ሚዜዎችና ለቡድን ታላቅ ቅናሽ እናደርጋለን።',
      descTi: 'ናይ ዝግጅትኩም መዓልቲ ከይኣኸለ ብዝደለይዎ ዓቐንን ዲዛይንን ብሓጺር ግዜ ሰሪሕና ነረክብ፤ ንመርዓ ሚዜታትን ንጉጅለን ዓቢ ቅናሽ ንገብር።',
      descEn: 'Precision tailoring made to your silhouette with swift turnarounds, dedicated bulk pricing for bridal parties, and worldwide shipping.',
    },
    {
      icon: ShieldCheck,
      titleAm: 'የጥራትና የታማኝነት ዋስትና (Guaranteed Quality)',
      titleTi: 'ናይ ጽሬትን ተኣማንነትን ውሕስነት (Guaranteed Quality)',
      titleEn: 'Shiromeda Authentic Authenticity',
      descAm: 'በሽሮሜዳ ብላቴና ህንፃ በግንባር በመምጣት ጨርቁንና ጥበቡን አይተው መርጠው በሙሉ እምነት ማሰራት ይችላሉ።',
      descTi: 'ኣብ ሽሮሜዳ ብላቴና ህንጻ ብኣካል ብምምጻእ ጨርቁን ጥበቡን ርኢኹም መሪጽኩም ብሙሉእ እምነት ክተስርሑ ትኽእሉ።',
      descEn: 'Based in Blatena Building, Shiromeda, our showroom invites you to inspect fabrics, feel the cotton, and customize your attire in person.',
    },
  ];

  const milestones = [
    {
      count: '10+',
      labelAm: 'የእደ-ጥበብ አመታት',
      labelTi: 'ናይ ኢደ-ጥበብ ዓመታት',
      labelEn: 'Years of Weaving Mastery',
    },
    {
      count: '5,000+',
      labelAm: 'የተመረቁ ደንበኞች',
      labelTi: 'ሕጉሳት ደንበኛታት',
      labelEn: 'Happy Weddings & Clients',
    },
    {
      count: '50+',
      labelAm: 'ባህላዊ ሸማኔዎችና ባለሙያዎች',
      labelTi: 'ባህላዊ ሸማነታትን ሞያውያንን',
      labelEn: 'Master Weavers & Tailors',
    },
    {
      count: '100%',
      labelAm: 'እውነተኛ የኢትዮጵያ ጥጥ',
      labelTi: 'ናይ ሓቂ ኢትዮጵያዊ ጡጥ',
      labelEn: 'Authentic Heritage Craft',
    },
  ];

  const galleryItems = [
    { img: imgWedding, tag: isAm ? 'የሰርግ ዘውዳዊ ቀሚስ' : isTi ? 'ናይ መርዓ ዘውዳዊ ቀሚሽ' : 'Royal Bridal Kemis' },
    { img: imgMeles, tag: isAm ? 'የመልስ ሮያል ዲዛይን' : isTi ? 'ናይ መልሲ ሮያል ዲዛይን' : 'Royal Meles Ceremony' },
    { img: imgCouple, tag: isAm ? 'የጥንዶች አልባሳት' : isTi ? 'ናይ መጻምድቲ ክዳውንቲ' : 'Couples Matching Set' },
    { img: imgAxum, tag: isAm ? 'የኣክሱም ፈትል' : isTi ? 'ናይ ኣኽሱም ፈትሊ' : 'Axum Handspun Fetel' },
    { img: imgCoffee, tag: isAm ? 'የቡና ቁርስ ቀሚስ' : isTi ? 'ናይ ቡና ቁርሲ ቀሚሽ' : 'Coffee Ceremony Kemis' },
    { img: imgRaya, tag: isAm ? 'የራያ ባህላዊ ጥበብ' : isTi ? 'ናይ ራያ ባህላዊ ጥበብ' : 'Raya Cultural Heritage' },
  ];

  return (
    <div className="bg-[#FDFCF8] min-h-screen text-[#2D241E]">
      {/* Top Breadcrumb & Hero */}
      <div className="bg-linear-to-b from-[#F9F4EC] to-[#FDFCF8] border-b border-[#EAD8C0]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#EAD8C0] text-[#8B0000] text-xs font-bold rounded-full mb-4 shadow-2xs">
              <span>{storyContent.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#8B0000] tracking-tight leading-tight mb-4">
              {storyContent.headline}
            </h1>
            <p className="text-xl font-serif text-[#8B0000] mb-3">
              {isTi 
                ? 'ንዝተፈላለዩ በዓላት ዝኾኑ ሓደሽቲ ዝተዳለዉ ሓበሻ ቀሚሻትን ሺፎናትን ብፍትሓዊ ዋጋ!'
                : isAm 
                ? 'ለተለያዩ ዝግጅቶች የሚሆኑ ኣዳዲስ የተዘጋጁ ሓበሻ ቀሚሶች እና ሽፎኖች በተመጣጣኝ ዋጋ!'
                : 'Handcrafted Habesha Kemis, Chiffon dresses & bespoke traditional wear made in Shiromeda.'}
            </p>
            <p className="text-base sm:text-lg text-[#2D241E]/80 leading-relaxed font-sans mb-6">
              {isTi
                ? 'ኣብ ሽሮሜዳ ብላቴና ህንጻ 4ይ ደብሪ ቢሮ ቁጽሪ 110 ዝርከብ፣ ንመርዓን ንዝተፈላለዩ በዓላትን ዝኸውን ፍሉይ ናይ ሓበሻ ቀሚሻትን ናይ ፈትሊ ክዳውንትን ብዓቢ ጥንቃቐ ዘዳልው።'
                : isAm
                ? 'በሽሮሜዳ ብላቴና ህንፃ 4ኛ ፎቅ ቢሮ ቁጥር 110 የሚገኝ፣ ለሰርግና ለተለያዩ ዝግጅቶች እጅግ ውብ የሆኑ የሓበሻ ቀሚሶችን እና የፈትል አልባሳትን በታላቅ ጥንቃቄ የሚያዘጋጅ ታማኝ መደብር።'
                : 'Located at Shiromeda Blatena Building, 4th Floor, Office 110, Addis Ababa. Crafting breathtaking traditional bridal gowns, Meles attire, and bespoke Axum handspun cotton dresses with utmost care.'}
            </p>

            {/* Prominent Bulk Discount Banner from Homepage */}
            <div className="w-full mb-8 p-4 sm:p-5 bg-white border-2 border-[#EAD8C0] rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#8B0000] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Tag className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-[#8B0000]">
                  {isTi ? '👉 ብብዝሒ ንዘስርሑ ዓቢ ቅናሽ!' : isAm ? '👉 በብዛት ለሚያሰሩ ታላቅ ቅናሽ!' : '👉 Special Discounts for Bulk & Wedding Orders!'}
                </p>
                <p className="text-xs sm:text-sm text-[#2D241E]/75 mt-0.5">
                  {isTi
                    ? 'ንመርዓ ሚዜታት፣ ንጉጅለን ንስድራቤትን ክዳውንቲ ፍሉይ ቅናሽ ንገብር።'
                    : isAm
                    ? 'ለሰርግ ሚዜዎች፣ ለቡድን እና ለቤተሰብ አልባሳት ታላቅ ቅናሽ እናደርጋለን።'
                    : 'Exclusive package pricing for wedding parties, bridesmaids, and coordinating family sets.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#8B0000] text-white hover:bg-[#6e0000] text-sm font-bold rounded-xl shadow-sm transition-all"
              >
                <span>{isTi ? 'ምህርቲ ርአ (Products)' : isAm ? 'ምርቶችን ይመልከቱ' : 'Explore All Products'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenCustomOrder}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border-2 border-[#8B0000] text-[#8B0000] hover:bg-[#F9F4EC] text-sm font-bold rounded-xl transition-all shadow-2xs"
              >
                <Scissors className="w-4 h-4 text-[#8B0000]" />
                <span>{isTi ? 'ብዝደለይዎ ዲዛይን ኣስርሑ' : isAm ? 'በፈለጉት ዲዛይን ያሰሩ' : 'Request Custom Order'}</span>
              </button>
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#2E4739] text-white hover:bg-[#203328] text-sm font-bold rounded-xl shadow-2xs transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#C5A059]" />
                <span>{STORE_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* Key Trust Signals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#EAD8C0] w-full text-xs text-[#2D241E]/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8B0000] shrink-0" />
                <span>{language === 'ti' ? STORE_INFO.addressTi : language === 'am' ? STORE_INFO.addressAm : STORE_INFO.addressEn}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2E4739] shrink-0" />
                <span>{isTi ? 'ብሓጺር ግዜ ቆጸራ' : isAm ? 'በኣጭር ግዜ ቀጠሮ' : 'Fast Bespoke Turnaround'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{isTi ? 'ጽሩይ ናይ ፈትሊ ጡጥ' : isAm ? 'ንጹህ የፈትል ጥጥ ከነነጠላው' : '100% Pure Handspun Fetel'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics / Milestones Ribbon */}
      <div className="border-b border-[#EAD8C0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {milestones.map((m, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#F9F4EC]/60 border border-[#EAD8C0]/60">
                <div className="text-3xl sm:text-4xl font-serif font-bold text-[#8B0000] mb-1">
                  {m.count}
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#2D241E]/75">
                  {isTi ? m.labelTi : isAm ? m.labelAm : m.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Story Section with Shiromeda Context */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B0000] font-bold">
              <Award className="w-4 h-4 text-[#C5A059]" />
              <span>{isTi ? 'ናይ ሽሮሜዳ ባህላዊ መንፈስ' : isAm ? 'የሽሮሜዳ እውነተኛ ባህላዊ መንፈስ' : 'Authentic Shiromeda Spirit'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241E] leading-snug">
              {isTi 
                ? 'ካብ ባህላዊ ፈትሊ ክሳብ ዘውዳዊ ናይ መርዓ ቀሚሽ ዝበጽሕ ናይ ፍቕሪ ጉዕዞ'
                : isAm 
                ? 'ከተፈጥሮ የፈትል ጥጥ እስከ ዘውዳዊ የሰርግ ቀሚስ የሚዘልቅ የፍቅርና የታታሪነት ጉዞ'
                : 'From Pure Handspun Fetel to Royal Ceremonial Attire'}
            </h2>

            <p className="text-sm sm:text-base text-[#2D241E]/85 leading-relaxed">
              {isTi 
                ? 'ሽሮሜዳ ኣብ ኣዲስ ኣበባ ካብ ቀደም ጀሚሩ ናይ ባህላዊ ክዳውንቲ ኢደ-ጥበብ እምብርት እዩ። ኣብ ኣቤል ሓበሻ፣ ነፍሲ ወከፍ ቀሚሽ ብልዑል ጥበብ ዝተሰርሐ እዩ። ካብ ምፍታል ጥጥ ጀሚሩ ክሳብ መወዳእታ ጥልፍን ስፌትን፣ ኩሉ ብባህላዊ መገዲ ብክቡራት ኢደ-ጥበበኛታትና ይካየድ።'
                : isAm 
                ? 'ሽሮሜዳ በአዲስ አበባ ከጥንት ጀምሮ የኢትዮጵያ ባህላዊ አልባሳት እደ-ጥበብ ዋና መናኸሪያ ነው። በአቤል ሓበሻ የምናዘጋጀው እያንዳንዱ ቀሚስ በታላቅ ሙያዊ ጥበብና ፍቅር የሚሰራ ነው። ጥጡ ከተፈተለበት ጊዜ አንስቶ ሸማው እስከተሸመነበትና ውስብስብ የወርቅ ጥልፍ ጥበቡ እስካረፈበት ድረስ በከፍተኛ ጥንቃቄ ይሰፋል።'
                : 'Shiromeda has long stood as the beating heart of Ethiopian traditional weaving. At Abel Habesha, every dress tells a story of patience, cultural devotion, and generational mastery—from spinning raw local cotton to hand-weaving the iconic Tibeb borders on timber pit-looms.'}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8B0000] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#2D241E]/90">
                  {isTi 
                    ? 'ንመርዓ፣ ንመልሲ፣ ንጥምቀት፣ ንልደት፣ ንምርቓትን ንዝተፈላለዩ በዓላትን ዝኸውን ፍሉይ ስራሕ።' 
                    : isAm 
                    ? 'ለሰርግ፣ ለመልስ፣ ለጥምቀት፣ ለገና፣ ለፋሲካ፣ ለልደትና ለምርቃት የሚሆኑ ልዩ የተሰሩ አልባሳት።' 
                    : 'Bespoke designs crafted for Weddings, Meles, Timket, Enkutatash, and formal family galas.'}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8B0000] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#2D241E]/90">
                  {isTi 
                    ? 'ምስ ነጸላ ወይ ጋቢ ምሉእ ስብስብ ኮይኑ ዝቐርብ ናይ ሓቂ ባህላዊ ቅርጺ።' 
                    : isAm 
                    ? 'ከነጠላ ወይም ከጋቢ ጋር የተሟላ ሆኖ የሚቀርብ ጥንታዊና ዘመናዊ ውህደት።' 
                    : 'Complete bridal and ceremonial packages with hand-finished matching Netela scarves.'}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8B0000] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#2D241E]/90">
                  {isTi 
                    ? 'ብብዝሒ ንዘስርሑ ስድራቤታትን ሚዜታትን ፍሉይ ናይ ጅምላ ቅናሽ።' 
                    : isAm 
                    ? 'በብዛት ለሚያሰሩ የሰርግ ሚዜዎችና ቤተሰቦች ታላቅ የጥቅል ቅናሽ።' 
                    : 'Special bulk rates for wedding parties, maid-of-honors, and coordinated diaspora celebrations.'}
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onContactClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B0000] text-white text-xs font-bold rounded-xl hover:bg-[#6e0000] transition-colors shadow-2xs"
              >
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span>{isTi ? 'ኣድራሻና ርኸቡ' : isAm ? 'አድራሻችንን ይመልከቱ' : 'Visit Our Boutique'}</span>
              </button>
              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366]/10 text-[#17853f] border border-[#25D366]/30 text-xs font-bold rounded-xl hover:bg-[#25D366]/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp (+251 913 312 314)</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-3 sm:space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-3/4 border border-[#EAD8C0]">
                <img src={imgWedding} alt="Wedding Kemis" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-2 text-[11px] font-bold text-white px-2 py-0.5 bg-black/40 rounded backdrop-blur-xs">
                  {isAm ? 'የሰርግ ሮያል' : isTi ? 'ናይ መርዓ' : 'Royal Wedding'}
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-4/3 border border-[#EAD8C0]">
                <img src={imgCoffee} alt="Coffee Kemis" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-2 text-[11px] font-bold text-white px-2 py-0.5 bg-black/40 rounded backdrop-blur-xs">
                  {isAm ? 'የቡና ቁርስ' : isTi ? 'ናይ ቡና' : 'Coffee Ceremony'}
                </div>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4 pt-6">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-4/3 border border-[#EAD8C0]">
                <img src={imgCouple} alt="Couple Attire" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-2 text-[11px] font-bold text-white px-2 py-0.5 bg-black/40 rounded backdrop-blur-xs">
                  {isAm ? 'የጥንዶች' : isTi ? 'ናይ መጻምድቲ' : 'Couples Set'}
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-3/4 border border-[#EAD8C0]">
                <img src={imgMeles} alt="Meles Dress" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-2 text-[11px] font-bold text-white px-2 py-0.5 bg-black/40 rounded backdrop-blur-xs">
                  {isAm ? 'የመልስ ዲዛይን' : isTi ? 'ናይ መልሲ' : 'Meles Elegance'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Craftsmanship */}
      <div className="bg-[#F9F4EC] border-y border-[#EAD8C0] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#8B0000] mb-3">
              {isTi ? 'ናይ ኢደ-ጥበብ መሰረታትና' : isAm ? 'የእደ-ጥበብ መሰረቶቻችን' : 'Our Craftsmanship Commitments'}
            </h2>
            <p className="text-xs sm:text-sm text-[#2D241E]/75">
              {isTi 
                ? 'ነፍሲ ወከፍ ክዳን ብልዑል ጥንቃቐ፣ ጽሬትን ታሪካዊ ክብርን ዝተሰርሐ እዩ።'
                : isAm 
                ? 'እያንዳንዱ ልብስ በእውነተኛ የጥጥ ጥራት፣ በባህላዊ ጥበብና በዘመናዊ ስፌት የተመረቀ ነው።'
                : 'Every single garment represents dedication to authentic fabric, pristine tailoring, and Ethiopian heritage.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white p-6 rounded-2xl border border-[#EAD8C0] shadow-xs flex flex-col hover:border-[#8B0000]/40 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#8B0000]/10 text-[#8B0000] flex items-center justify-center mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#2D241E] mb-2">
                    {isTi ? p.titleTi : isAm ? p.titleAm : p.titleEn}
                  </h3>
                  <p className="text-xs text-[#2D241E]/75 leading-relaxed flex-1">
                    {isTi ? p.descTi : isAm ? p.descAm : p.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Complete How To Order & Custom Sizing Process (Moved from Homepage) */}
      <HowToOrderSection language={language} />

      {/* Gallery Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241E] mb-2">
            {isTi ? 'ናይ ክዳውንትና ስብስብ' : isAm ? 'የተመረጡ የአልባሳት ስብስቦች' : 'Curated Atelier Gallery'}
          </h2>
          <p className="text-xs sm:text-sm text-[#2D241E]/75">
            {isTi 
              ? 'ንዝተፈላለዩ በዓላት ብፍሉይ ዝተዳለዉ ባህላዊ ቀሚሻትን ሺፎናትን'
              : isAm 
              ? 'ለተለያዩ ዝግጅቶች በልዩ ጥበብ የተዘጋጁ ሓበሻ ቀሚሶች እና ሽፎኖች'
              : 'Handcrafted Habesha Kemis, Meles, couples attire and flowing chiffon gowns.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {galleryItems.map((item, index) => (
            <div 
              key={index}
              onClick={onExploreCatalog}
              className="group relative rounded-2xl overflow-hidden aspect-3/4 border border-[#EAD8C0] cursor-pointer shadow-xs hover:shadow-md transition-all"
            >
              <img 
                src={item.img} 
                alt={item.tag} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent flex items-end p-2.5">
                <span className="text-[11px] font-bold text-white drop-shadow-xs">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-12 bg-linear-to-r from-[#8B0000] to-[#5a0000] text-white p-8 sm:p-12 rounded-3xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-xl sm:text-2xl font-serif font-bold mb-2 text-[#FDFCF8]">
              {isTi 
                ? 'ንዝግጅትኩም ፍሉይ ክዳን ክተስርሑ ትደልዩዶ?' 
                : isAm 
                ? 'ለዝግጅትዎ ልዩ አልባሳት በልክዎ ማሰራት ይፈልጋሉ?' 
                : 'Ready to create your dream bespoke Habesha attire?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#FDFCF8]/85 leading-relaxed">
              {isTi 
                ? 'ናይ ሰብነትኩም ዓቐን ስደዱልና ወይ ናብ ድኳንና ሽሮሜዳ ብላቴና ህንጻ ምጹ፤ ብሓጺር ግዜ ቆጸራ ሰሪሕና ነረክበኩም።'
                : isAm 
                ? 'የሰውነት ልክዎን ያስገቡ ወይም በሽሮሜዳ ብላቴና ህንፃ ሱቃችን በአካል ይጎብኙን፤ በኣጭር ግዜ ሰርተን እናስረክባለን።'
                : 'Share your measurements online or visit our boutique in Shiromeda Blatena Building for custom tailoring.'}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCustomOrder}
              className="px-6 py-3 bg-[#C5A059] hover:bg-[#b08b43] text-[#2D241E] text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors"
            >
              {isTi ? 'ብዝደለይዎ ዲዛይን ኣስርሑ' : isAm ? 'በፈለጉት ዲዛይን ያሰሩ' : 'Request Custom Tailoring'}
            </button>
            <button
              onClick={onContactClick}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs sm:text-sm font-bold rounded-xl transition-colors"
            >
              {isTi ? 'ርኸቡና' : isAm ? 'ያግኙን' : 'Contact Us'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
