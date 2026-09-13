import { Category, Language } from '../types';

export const CATEGORY_GROUPS = [
  {
    id: 'all',
    nameAm: 'ሁሉም አልባሳት',
    nameTi: 'ኩሎም ክዳውንቲ',
    nameEn: 'All Attire',
    shortAm: 'ሁሉም',
    shortTi: 'ኩሉ',
    shortEn: 'All',
  },
  {
    id: 'events',
    nameAm: 'ሰርግና ዝግጅቶች',
    nameTi: 'መርዓን በዓላትን',
    nameEn: 'Weddings & Events',
    shortAm: 'ዝግጅቶች',
    shortTi: 'በዓላት',
    shortEn: 'Events',
  },
  {
    id: 'men_couples',
    nameAm: 'የጥንዶችና ወንዶች',
    nameTi: 'ናይ መጻምድትን ደቂ-ተባዕትዮን',
    nameEn: 'Couples & Men',
    shortAm: 'ጥንዶች/ወንድ',
    shortTi: 'መጻምድቲ/ወዲ',
    shortEn: 'Couples/Men',
  },
  {
    id: 'heritage_fabrics',
    nameAm: 'ባህላዊ ጨርቆችና ሽፎን',
    nameTi: 'ባህላዊ ጨርቅታትን ሺፎንን',
    nameEn: 'Traditional Fabrics & Chiffon',
    shortAm: 'ጨርቆች/ሽፎን',
    shortTi: 'ጨርቅታት/ሺፎን',
    shortEn: 'Fabrics',
  },
] as const;

export const CATEGORIES: Category[] = [
  // ✨ ለተለያዩ ዝግጅቶች (Events & Celebrations)
  {
    id: 'wedding',
    tag: '#የሰርግ',
    nameAm: 'የሰርግ አልባሳት',
    nameTi: 'ናይ መርዓ ክዳውንቲ',
    nameEn: 'Wedding Dresses',
    shortAm: 'የሰርግ',
    shortTi: 'መርዓ',
    shortEn: 'Wedding',
    group: 'events',
  },
  {
    id: 'meles',
    tag: '#የመልስ',
    nameAm: 'የመልስ አልባሳት',
    nameTi: 'ናይ መልሲ ክዳውንቲ',
    nameEn: 'Meles Attire',
    shortAm: 'የመልስ',
    shortTi: 'መልሲ',
    shortEn: 'Meles',
    group: 'events',
  },
  {
    id: 'shimgilina',
    tag: '#የሸምግልና',
    nameAm: 'የሽምግልና ልብሶች',
    nameTi: 'ናይ ሽምግልና ክዳውንቲ',
    nameEn: 'Shimgilina Attire',
    shortAm: 'የሽምግልና',
    shortTi: 'ሽምግልና',
    shortEn: 'Shimgilina',
    group: 'events',
  },
  {
    id: 'kristna',
    tag: '#የክርስትና',
    nameAm: 'የክርስትና አልባሳት',
    nameTi: 'ናይ ጥምቀት ክዳውንቲ',
    nameEn: 'Christening & Baptism',
    shortAm: 'የክርስትና',
    shortTi: 'ጥምቀት',
    shortEn: 'Baptism',
    group: 'events',
  },
  {
    id: 'qurban',
    tag: '#የቁርባን',
    nameAm: 'የቁርባን አልባሳት',
    nameTi: 'ናይ ቁርባን ክዳውንቲ',
    nameEn: 'Holy Communion',
    shortAm: 'የቁርባን',
    shortTi: 'ቁርባን',
    shortEn: 'Communion',
    group: 'events',
  },
  {
    id: 'graduation',
    tag: '#የምርቃት',
    nameAm: 'የምርቃት አልባሳት',
    nameTi: 'ናይ ምረቓ ክዳውንቲ',
    nameEn: 'Graduation Attire',
    shortAm: 'የምርቃት',
    shortTi: 'ምረቓ',
    shortEn: 'Graduation',
    group: 'events',
  },
  {
    id: 'birthday',
    tag: '#የልደት',
    nameAm: 'የልደት አልባሳት',
    nameTi: 'ናይ ልደት ክዳውንቲ',
    nameEn: 'Birthday Celebration',
    shortAm: 'የልደት',
    shortTi: 'ልደት',
    shortEn: 'Birthday',
    group: 'events',
  },
  {
    id: 'new_year',
    tag: '#የኣዲስ_ኣመት',
    nameAm: 'የአዲስ ዓመት አልባሳት',
    nameTi: 'ናይ ሓዱሽ ዓመት (ዕንቁጣጣሽ) ክዳውንቲ',
    nameEn: 'New Year / Enkutatash',
    shortAm: 'አዲስ ዓመት',
    shortTi: 'ሓዱሽ ዓመት',
    shortEn: 'New Year',
    group: 'events',
  },
  {
    id: 'ashenda',
    tag: '#የኣሸንዳ',
    nameAm: 'የአሸንዳ / ሻደይ አልባሳት',
    nameTi: 'ናይ ኣሸንዳ / ማርያ / ሻደይ ክዳውንቲ',
    nameEn: 'Ashenda / Shadey',
    shortAm: 'አሸንዳ',
    shortTi: 'ኣሸንዳ',
    shortEn: 'Ashenda',
    group: 'events',
  },
  {
    id: 'coffee_ceremony',
    tag: '#የቡና',
    nameAm: 'የቡና ሥነ-ሥርዓት ልብስ',
    nameTi: 'ናይ ቡን ስነ-ስርዓት ክዳውንቲ',
    nameEn: 'Coffee Ceremony Dress',
    shortAm: 'የቡና',
    shortTi: 'ቡን',
    shortEn: 'Coffee Set',
    group: 'events',
  },
  {
    id: 'special_occasions',
    tag: '#ለተለያዩ_ዝግጅቶች_የሚለበሱ_ልብሶች',
    nameAm: 'ለልዩ ልዩ ዝግጅቶች',
    nameTi: 'ንዝተፈላለዩ በዓላት',
    nameEn: 'Special Celebrations',
    shortAm: 'ልዩ ዝግጅቶች',
    shortTi: 'ፍሉይ በዓላት',
    shortEn: 'Celebrations',
    group: 'events',
  },

  // 👥 ለጥንዶች እና ለወንዶች (Couples & Men)
  {
    id: 'couples',
    tag: '#የካፕል',
    nameAm: 'የጥንዶች (Couple) አልባሳት',
    nameTi: 'ናይ መጻምድቲ (ካፕል) ክዳውንቲ',
    nameEn: 'Matching Couple Sets',
    shortAm: 'የጥንዶች',
    shortTi: 'መጻምድቲ',
    shortEn: 'Couples',
    group: 'men_couples',
  },
  {
    id: 'men',
    tag: '#የወንድ',
    nameAm: 'የወንዶች ባህላዊ አልባሳት',
    nameTi: 'ናይ ደቂ ተባዕትዮ ባህላዊ ክዳውንቲ',
    nameEn: "Men's Traditional Attire",
    shortAm: 'የወንድ',
    shortTi: 'ደቂ ተባዕትዮ',
    shortEn: "Men's",
    group: 'men_couples',
  },

  // 🧵 የብሔረ-ብሔረሰዎች ባህል እና የጨርቅ ዓይነቶች (Heritage & Fabrics)
  {
    id: 'axum_fetel',
    tag: '#የኣክሱም_ፈትል',
    nameAm: 'የኣክሱም ፈትል (ንጹህ ጥጥ)',
    nameTi: 'ናይ ኣኽሱም ፈትሊ (ጽሩይ ጡጥ)',
    nameEn: 'Axum Pure Handspun (Fetil)',
    shortAm: 'የኣክሱም ፈትል',
    shortTi: 'ኣኽሱም ፈትሊ',
    shortEn: 'Axum Fetil',
    group: 'heritage_fabrics',
  },
  {
    id: 'saba',
    tag: '#የሳባጨርቅ_ልብስ',
    nameAm: 'የሳባ ጨርቅ አልባሳት',
    nameTi: 'ናይ ሳባ ጨርቂ ክዳውንቲ',
    nameEn: 'Queen Saba Fabric',
    shortAm: 'የሳባ ጨርቅ',
    shortTi: 'ሳባ ጨርቂ',
    shortEn: 'Saba Fabric',
    group: 'heritage_fabrics',
  },
  {
    id: 'chiffon',
    tag: '#የቻይናጨርቅ_ልብስ',
    nameAm: 'የቻይና ጨርቅ እና ሽፎን',
    nameTi: 'ናይ ቻይና ጨርቅን ሺፎንን',
    nameEn: 'Chiffon & China Fabric',
    shortAm: 'ሽፎን/ቻይና ጨርቅ',
    shortTi: 'ሺፎን/ቻይና ጨርቂ',
    shortEn: 'Chiffon',
    group: 'heritage_fabrics',
  },
  {
    id: 'nkr',
    tag: '#የንክር_ልብስ',
    nameAm: 'የንክር ጥጥ ጨርቅ',
    nameTi: 'ናይ ንክር ጡጥ ጨርቂ',
    nameEn: 'Nkr Quality Cotton',
    shortAm: 'የንክር ጨርቅ',
    shortTi: 'ንክር ጨርቂ',
    shortEn: 'Nkr Cotton',
    group: 'heritage_fabrics',
  },
  {
    id: 'raya',
    tag: '#የራያ_ልብስ',
    nameAm: 'የራያ ባህላዊ አልባሳት',
    nameTi: 'ናይ ራያ ባህላዊ ክዳውንቲ',
    nameEn: 'Raya Traditional Attire',
    shortAm: 'የራያ ባህል',
    shortTi: 'ራያ ባህሊ',
    shortEn: 'Raya Style',
    group: 'heritage_fabrics',
  },
  {
    id: 'gondar',
    tag: '#የጎንደር_ልብስ',
    nameAm: 'የጎንደር ጥልፍ አልባሳት',
    nameTi: 'ናይ ጎንደር ጥልፊ ክዳውንቲ',
    nameEn: 'Gondar Royal Embroidery',
    shortAm: 'የጎንደር ጥልፍ',
    shortTi: 'ጎንደር ጥልፊ',
    shortEn: 'Gondar Style',
    group: 'heritage_fabrics',
  },
  {
    id: 'wollo',
    tag: '#የወሎ_ልብስ',
    nameAm: 'የወሎ ባህላዊ አልባሳት',
    nameTi: 'ናይ ወሎ ባህላዊ ክዳውንቲ',
    nameEn: 'Wollo Traditional Dress',
    shortAm: 'የወሎ ባህል',
    shortTi: 'ወሎ ባህሊ',
    shortEn: 'Wollo Style',
    group: 'heritage_fabrics',
  },
  {
    id: 'gojjam',
    tag: '#የጎጃም_ልብስ',
    nameAm: 'የጎጃም ባህላዊ አልባሳት',
    nameTi: 'ናይ ጎጃም ባህላዊ ክዳውንቲ',
    nameEn: 'Gojjam Traditional Dress',
    shortAm: 'የጎጃም ባህል',
    shortTi: 'ጎጃም ባህሊ',
    shortEn: 'Gojjam Style',
    group: 'heritage_fabrics',
  },
  {
    id: 'nations',
    tag: '#የተለያዩ_የብሔረብሔረሰዎች_ልብስ',
    nameAm: 'የብሔር ብሔረሰቦች አልባሳት',
    nameTi: 'ናይ ብሄረ-ብሄረሰባት ባህላዊ ክዳውንቲ',
    nameEn: 'Cultural & Nationalities',
    shortAm: 'ብሔረሰቦች',
    shortTi: 'ብሄረሰባት',
    shortEn: 'Cultural',
    group: 'heritage_fabrics',
  },
];

export const HASHTAG_CATEGORIES = CATEGORIES;

export function getCategoryDisplay(tagOrCategory: string, language: Language = 'en'): string {
  const clean = tagOrCategory.startsWith('#') ? tagOrCategory : `#${tagOrCategory}`;
  const found = CATEGORIES.find(
    (c) => c.tag === clean || c.tag === tagOrCategory || c.id === tagOrCategory || c.nameAm === tagOrCategory || c.nameEn === tagOrCategory || c.nameTi === tagOrCategory
  );
  if (found) {
    if (language === 'ti') return found.nameTi || found.nameAm;
    if (language === 'en') return found.nameEn;
    return found.nameAm;
  }
  // Fallback: strip # and replace _ with space
  const fallback = tagOrCategory.replace(/^#/, '').replace(/_/g, ' ');
  return fallback;
}

export function getCategoryShortDisplay(tagOrCategory: string, language: Language = 'en'): string {
  const clean = tagOrCategory.startsWith('#') ? tagOrCategory : `#${tagOrCategory}`;
  const found = CATEGORIES.find(
    (c) => c.tag === clean || c.tag === tagOrCategory || c.id === tagOrCategory
  );
  if (found) {
    if (language === 'ti') return found.shortTi || found.nameTi || found.shortAm || found.nameAm;
    if (language === 'en') return found.shortEn || found.nameEn;
    return found.shortAm || found.nameAm;
  }
  return tagOrCategory.replace(/^#/, '').replace(/_/g, ' ');
}

export const STORE_INFO = {
  name: 'Abel Habesha (አቤል ሓበሻ)',
  taglineAm: 'ለተለያዩ ዝግጅቶች የሚሆኑ ኣዳዲስ የተዘጋጁ ሓበሻ ቀሚሶች እና ሽፎኖች በተመጣጣኝ ዋጋ!',
  taglineTi: 'ንዝተፈላለዩ በዓላት ዝኾኑ ሓደሽቲ ዝተዳለዉ ሓበሻ ቀሚሻትን ሺፎናትን ብፍትሓዊ ዋጋ!',
  taglineEn: 'Finest handwoven Habesha Kemis, Chiffon dresses & bespoke traditional attire crafted in Shiromeda.',
  phone: '+251913312314',
  phoneDisplay: '+251 913 312 314',
  email: 'info@abelhabesha.com.et',
  emailUrl: 'mailto:info@abelhabesha.com.et?subject=Inquiry%20-%20Abel%20Habesha%20Traditional%20Attire',
  telegramUser: 'AbelDesignChat',
  telegramUrl: 'https://t.me/AbelDesignChat',
  whatsappUrl: 'https://wa.me/251913312314',
  website: 'https://abelhabesha.com.et/',
  addressAm: 'ሽሮሜዳ ብላቴና ህንፃ 4ኛ ፎቅ 110 ቁጥር፣ አዲስ አበባ',
  addressTi: 'ሽሮሜዳ ብላቴና ህንጻ 4ይ ደረጀ 110 ቁጽሪ፣ ኣዲስ ኣበባ',
  addressEn: 'Shiromeda Blatena Building, 4th Floor, Office 110, Addis Ababa, Ethiopia',
  socialLinks: {
    website: 'https://abelhabesha.com.et/',
    email: 'mailto:info@abelhabesha.com.et?subject=Inquiry%20-%20Abel%20Habesha%20Traditional%20Attire',
    facebook: 'https://www.facebook.com/profile.php?id=61591538005028',
    instagram: 'https://www.instagram.com/abelhabesha27?igsh=a3Uwemc4cDB0bnVh',
    tiktok: 'https://vm.tiktok.com/ZS96S6pdDs2Jt-yHWIR/',
    youtube: 'https://youtube.com/@abelhabesha14?si=nM3KbA74kqws_EHB',
    whatsapp: 'https://wa.me/251913312314',
    telegram: 'https://t.me/AbelDesignChat',
  },
};
