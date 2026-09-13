import { Language } from '../types';

export interface TranslationDictionary {
  // Navigation & Top Bar
  saleTag: string;
  announcement: string;
  callUs: string;
  telegramContact: string;
  customOrderBtn: string;
  searchPlaceholder: string;
  cart: string;
  emptyCart: string;

  // Hero
  welcomeTag: string;
  brandName: string;
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroTitle3: string;
  heroSubtitle: string;
  heroDesc: string;
  bulkDiscountTitle: string;
  bulkDiscountDesc: string;
  viewCatalog: string;
  fastTurnaround: string;
  pureCottonFetel: string;
  newCollectionTag: string;
  weddingCollection: string;
  melsCollection: string;
  heroCardTitle: string;
  tailoredToSize: string;
  heroFabricBadge: string;
  heroNetelaSub: string;
  heroOrderWhatsApp: string;
  heroCustomDesign: string;
  heroFeature1Title: string;
  heroFeature1Desc: string;
  heroFeature2Title: string;
  heroFeature2Desc: string;
  heroFeature3Title: string;
  heroFeature3Desc: string;
  heroHeroTag: string;
  heroHeroTagSub: string;

  // Categories & Filters
  categoriesHeader: string;
  categoriesSub: string;
  collapseView: string;
  expandView: string;
  allCategories: string;
  collectionsHeader: string;
  expandAll: string;
  collapse: string;
  clearFilter: string;
  allPill: string;
  activeFilterPrefix: string;
  showingItems: string;

  // Product Card & Badges
  bestSeller: string;
  viewFullDetails: string;
  bulkDiscountAvailable: string;
  inStock: string;
  tailoringBadge: string;
  viewDetails: string;
  orderWhatsAppShort: string;
  bestSellerBadge: string;
  featuredBadge: string;
  discountBadge: string;

  // Product Detail Page & Modal
  backToCollection: string;
  home: string;
  bespokeReady: string;
  step1ScreenshotTitle: string;
  step1ScreenshotDesc: string;
  copiedNotice: string;
  copyInfoBtn: string;
  specialPriceTag: string;
  productDescHeader: string;
  fabricTypeLabel: string;
  deliveryLabel: string;
  selectSizeLabel: string;
  needCustomFit: string;
  customFitHelp: string;
  viewDetailsShort: string;
  backToCatalog: string;
  homeBreadcrumb: string;
  share: string;
  copied: string;
  copyDressInfo: string;
  screenshotTip: string;
  productDescriptionHeader: string;
  traditionalFabric: string;
  deliveryTailoring: string;
  withinDays: string;
  selectSize: string;
  customFitPrompt: string;
  switchToStandardSize: string;
  lengthPlaceholder: string;
  chestPlaceholder: string;
  waistPlaceholder: string;
  hipsPlaceholder: string;
  notesPlaceholder: string;
  orderWhatsAppDirect: string;
  orderTelegramInbox: string;
  addToBag: string;
  addedToBag: string;
  callShopDirect: string;
  showroomAddressHeader: string;
  openEveryDay: string;
  relatedAttireHeader: string;
  relatedAttireSub: string;
  viewAllSimilar: string;
  priceLabel: string;
  handcraftedShiromeda: string;
  traditionalCraft: string;
  quickTurnaround: string;
  qualityGuarantee: string;
  premiumFabricNote: string;

  // Cart Modal
  orderBagTitle: string;
  itemsCount: string;
  clearCart: string;
  sizeLabel: string;
  customMeasurementsLabel: string;
  totalEstimated: string;
  freeConsultationNote: string;
  sendOrderWhatsApp: string;
  sendOrderTelegram: string;
  callToOrder: string;
  emptyBagPrompt: string;
  browseCatalogBtn: string;

  // Custom Tailoring Modal
  customModalTitle: string;
  customModalSubtitle: string;
  yourName: string;
  yourPhone: string;
  attireType: string;
  eventDate: string;
  preferredFabric: string;
  additionalDetails: string;
  submitCustomOrder: string;
  cancelBtn: string;

  // How to Order
  howToOrderTitle: string;
  howToOrderSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  orderNoteTitle: string;
  orderNoteDesc: string;

  // Footer
  footerAboutTitle: string;
  footerAboutDesc: string;
  popularCategoriesHeader: string;
  popularCategoriesFooter: string;
  visitOurBoutique: string;
  visitShowroomHeader: string;
  addressLabel: string;
  directLineLabel: string;
  followSocialHeader: string;
  socialFollow: string;
  allRightsReserved: string;
  thankYouNote: string;
  thankYouFooter: string;

  // Navigation Links
  navHome: string;
  navCatalog: string;
  navProducts: string;
  navAbout: string;
  navContact: string;
  navAdmin: string;

  // Ecommerce Homepage
  shopNow: string;
  shopByCategory: string;
  bestSellersTitle: string;
  newArrivalsTitle: string;
  trendingTitle: string;
  viewAllProductsBtn: string;
  bridalSpecialTitle: string;
  bridalSpecialSubtitle: string;
  shopByOccasionTitle: string;

  // About Us Page
  aboutUsTitle: string;
  aboutUsSubtitle: string;

  // Contact Us Page
  contactUsTitle: string;
  contactUsSubtitle: string;

  // Admin Panel
  adminPanelTitle: string;
  adminPanelSubtitle: string;
  addProductBtn: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  am: {
    welcomeTag: '✨ የእደ-ጥበብ ሓበሻ አልባሳት',
    brandName: 'አቤል ሓበሻ',
    saleTag: 'ቅናሽ',
    announcement: '👉 በብዛት ለሚያሰሩ ታላቅ ቅናሽ! በፈለጉት ዲዛይን በኣጭር ግዜ ቀጠሮ',
    callUs: 'ይደውሉልን',
    telegramContact: 'ቴሌግራም',
    customOrderBtn: 'በፈለጉት ዲዛይን ያሰሩ',
    searchPlaceholder: 'በስም፣ በጨርቅ አይነት ወይም በኮድ (ለምሳሌ፡ #የሰርግ፣ ንክር፣ AH-01) ይፈልጉ...',
    cart: 'ትዕዛዝ',
    emptyCart: 'ምንም አልተመረጠም',

    heroBadge: '✨ እውነተኛ የሽሮሜዳ ሓበሻ አልባሳት እደ-ጥበብ',
    heroTitle1: 'የኢትዮጵያ ውበትና ቅርስ',
    heroTitle2: 'በጥበብ እጆች',
    heroTitle3: 'የተሰሩ አልባሳት',
    heroSubtitle: 'ለተለያዩ ዝግጅቶች የሚሆኑ ኣዳዲስ የተዘጋጁ ሓበሻ ቀሚሶች እና ሽፎኖች በተመጣጣኝ ዋጋ! በፈለጉት ዲዛይን በኣጭር ግዜ ቀጠሮ እናዘጋጃለን።',
    heroDesc: 'ለተለያዩ ዝግጅቶች የሚሆኑ ኣዳዲስ የተዘጋጁ ሓበሻ ቀሚሶች እና ሽፎኖች በተመጣጣኝ ዋጋ! በፈለጉት ዲዛይን በኣጭር ግዜ ቀጠሮ እናዘጋጃለን።',
    bulkDiscountTitle: '👉 በብዛት ለሚያሰሩ ታላቅ ቅናሽ!',
    bulkDiscountDesc: 'ለሰርግ ሚዜዎች፣ ለቡድን እና ለቤተሰብ አልባሳት ታላቅ ቅናሽ እናደርጋለን።',
    viewCatalog: 'ካታሎግ ይመልከቱ',
    fastTurnaround: 'በኣጭር ግዜ ቀጠሮ',
    pureCottonFetel: 'ንጹህ የፈትል ጥጥ',
    newCollectionTag: 'አዲስ ስብስብ',
    weddingCollection: 'የሰርግ 2024',
    melsCollection: 'የመልስ ዲዛይን',
    heroCardTitle: 'የሰርግ ዘውዳዊ የወርቅ ጥልፍ ቀሚስ',
    tailoredToSize: 'በልክዎ የሚሰፋ • ከነጠላ ጋር',
    heroFabricBadge: 'እውነተኛ ሽሮሜዳ ፈትል',
    heroNetelaSub: 'ባህላዊ ጥበብና ነጠላ',
    heroOrderWhatsApp: 'በ WhatsApp በቀጥታ እዘዙ',
    heroCustomDesign: 'በፈለጉት ዲዛይን ማሰሪያ',
    heroFeature1Title: 'በኣጭር ግዜ ቀጠሮ',
    heroFeature1Desc: 'በፍጥነት በታዘዘው ልክ ተሰርቶ ይደርሳል',
    heroFeature2Title: 'የጅምላና የሰርግ ቅናሽ',
    heroFeature2Desc: 'ለሚዜዎችና ለቡድን ታላቅ ቅናሽ',
    heroFeature3Title: 'እውነተኛ ንጹህ ፈትል',
    heroFeature3Desc: 'ከኣክሱምና ጎጃም እደ-ጥበበኞች',
    heroHeroTag: 'አቤል ሓበሻ አልባሳት',
    heroHeroTagSub: 'ሽሮሜዳ ብላቴና ህንፃ • አዲስ አበባ',

    categoriesHeader: 'የአልባሳት ምድቦች',
    categoriesSub: 'በሚፈልጉት ዝግጅት ወይም የጨርቅ አይነት ይምረጡ',
    collapseView: 'አሳንስ',
    expandView: 'ሁሉንም ዘርጋ',
    allCategories: 'ሁሉም አልባሳት',
    collectionsHeader: 'የአልባሳት ምድቦች',
    expandAll: 'ሁሉንም ዘርጋ',
    collapse: 'አሳንስ',
    clearFilter: 'ሁሉንም',
    allPill: 'ሁሉንም',
    activeFilterPrefix: 'የተመረጠው፦',
    showingItems: 'አልባሳት ተገኝተዋል',

    bestSeller: 'ተወዳጅ',
    viewFullDetails: 'ዝርዝር እይ',
    bulkDiscountAvailable: 'የጅምላ ቅናሽ አለው',
    inStock: 'በመደብር ያለ',
    tailoringBadge: 'በቀጠሮ',
    viewDetails: 'ዝርዝር እይ',
    orderWhatsAppShort: 'በ WhatsApp',
    bestSellerBadge: 'ተወዳጅ',
    featuredBadge: 'ልዩ ምርጫ',
    discountBadge: 'ቅናሽ',

    backToCollection: 'ወደ ካታሎግ ተመለስ',
    home: 'መነሻ',
    bespokeReady: 'በቀጠሮ የሚሰፋ ወይም ዝግጁ',
    step1ScreenshotTitle: 'ደረጃ 1፦ ይህንን አልባሳት Screenshot ያድርጉ',
    step1ScreenshotDesc: 'የመረጡትን ልብስ ፎቶ Screenshot በማንሳት ወይም መረጃውን በመቅዳት በ WhatsApp ወይም Telegram ይላኩልን።',
    copiedNotice: 'ተገልብጧል!',
    copyInfoBtn: 'መረጃውን ቅዳ',
    specialPriceTag: 'ልዩ ዋጋ',
    productDescHeader: 'ስለ አልባሳቱ ማብራሪያ',
    fabricTypeLabel: 'የጨርቅ አይነት',
    deliveryLabel: 'የቀጠሮ ግዜ',
    selectSizeLabel: 'መጠን / ልክ ይምረጡ',
    needCustomFit: 'በልክዎ ማሰራት ይፈልጋሉ?',
    customFitHelp: 'የሰውነት ልክዎን (ቁመት፣ ደረት፣ ወገብ) ያስገቡ፤ በልክዎ በጥንቃቄ ሰርተን እናስረክባለን።',
    viewDetailsShort: 'ዝርዝር እይ',
    backToCatalog: 'ወደ ካታሎግ ተመለስ',
    homeBreadcrumb: 'መነሻ',
    share: 'አጋራ',
    copied: 'ተገልብጧል!',
    copyDressInfo: 'መረጃውን ቅዳ',
    screenshotTip: 'ደረጃ 1፦ ይህንን አልባሳት Screenshot ያድርጉ',
    productDescriptionHeader: 'ስለ አልባሳቱ ማብራሪያ',
    traditionalFabric: 'የጨርቅ አይነት',
    deliveryTailoring: 'የቀጠሮ ግዜ',
    withinDays: 'ቀናት ውስጥ',
    selectSize: 'መጠን / ልክ ይምረጡ',
    customFitPrompt: 'በልክዎ ማሰራት ይፈልጋሉ?',
    switchToStandardSize: 'ወደ መደበኛ መጠን ተመለስ',
    lengthPlaceholder: 'ቁመት (cm)',
    chestPlaceholder: 'ደረት (cm)',
    waistPlaceholder: 'ወገብ (cm)',
    hipsPlaceholder: 'ዳሌ (cm)',
    notesPlaceholder: 'ተጨማሪ ማስታወሻ (የቀለም ምርጫ ወይም ልዩ ፍላጎት)...',
    orderWhatsAppDirect: 'በ WhatsApp እዘዝ',
    orderTelegramInbox: 'በ Telegram Inbox',
    addToBag: 'ወደ ትዕዛዝ ቅርጫት ጨምር',
    addedToBag: 'ወደ ትዕዛዝ ቅርጫት ገብቷል!',
    callShopDirect: 'በስልክ በቀጥታ ይደውሉ',
    showroomAddressHeader: 'የመደብር አድራሻችን፦',
    openEveryDay: 'ከሰኞ - እሑድ ክፍት ነው',
    relatedAttireHeader: 'ተመሳሳይ ተወዳጅ የሓበሻ አልባሳት',
    relatedAttireSub: 'ተመሳሳይ ዲዛይን እና የጨርቅ አይነት ያላቸው',
    viewAllSimilar: 'ሁሉንም እይ',
    priceLabel: 'ዋጋ',
    handcraftedShiromeda: 'እውነተኛ ሽሮሜዳ ጥበብ',
    traditionalCraft: 'በባህላዊ እደ-ጥበብ',
    quickTurnaround: 'ፈጣን ቀጠሮ',
    qualityGuarantee: 'የጥራት ዋስትና',
    premiumFabricNote: 'የጨርቅ ጥራት',

    orderBagTitle: 'የመረጧቸው አልባሳት',
    itemsCount: 'አልባሳት',
    clearCart: 'ሁሉንም አውጣ',
    sizeLabel: 'መጠን፦',
    customMeasurementsLabel: 'የተሰጠ ልክ፦',
    totalEstimated: 'ጠቅላላ ግምት፦',
    freeConsultationNote: '💡 በብዛት ወይም ለሰርግ ሚዜዎች ለሚታዘዝ ልዩ ቅናሽ ይደረጋል!',
    sendOrderWhatsApp: 'ትዕዛዙን በ WhatsApp ላክ',
    sendOrderTelegram: 'ትዕዛዙን በ Telegram ላክ',
    callToOrder: 'በቀጥታ በስልክ ደውለው ያረጋግጡ',
    emptyBagPrompt: 'እስካሁን የመረጡት ልብስ የለም።',
    browseCatalogBtn: 'ካታሎጉን ይመልከቱ',

    customModalTitle: 'በፈለጉት ዲዛይን እና ልክ ማሰሪያ',
    customModalSubtitle: 'የሚፈልጉትን አይነት የጥበብ ዲዛይን፣ ቀለምና ልክ ይንገሩን፤ በኣጭር ግዜ ሰርተን እናስረክባለን።',
    yourName: 'ሙሉ ስም',
    yourPhone: 'ስልክ ቁጥር',
    attireType: 'የአልባሳት አይነት (ለምሳሌ፡ የሰርግ ቀሚስ፣ የጥንዶች፣ የወንድ...)',
    eventDate: 'የዝግጅቱ ቀን (የሚፈለግበት ግዜ)',
    preferredFabric: 'የሚመርጡት የጨርቅ አይነት (ፈትል፣ ሳባ፣ ንክር፣ ሽፎን)',
    additionalDetails: 'ተጨማሪ ማብራሪያ (የጥልፍ አይነት፣ ቀለም፣ የሰውነት ልክ)',
    submitCustomOrder: 'ትዕዛዙን በ WhatsApp ላክ',
    cancelBtn: 'ተው',

    howToOrderTitle: 'እንዴት ማዘዝ ይችላሉ?',
    howToOrderSubtitle: 'በቀላል እና ፈጣን 4 ደረጃዎች የፈለጉትን ባህላዊ አልባሳት ያግኙ',
    step1Title: '1. አልባሳቱን ይምረጡ',
    step1Desc: 'ከካታሎጋችን የሚወዱትን የሓበሻ ቀሚስ ወይም ባህላዊ ልብስ ይምረጡ።',
    step2Title: '2. ፎቶውን Screenshot ያንሱ',
    step2Desc: 'የመረጡትን ልብስ ፎቶ Screenshot ያድርጉ ወይም መረጃውን ይቅዱ።',
    step3Title: '3. በ WhatsApp ወይም Telegram ይላኩልን',
    step3Desc: 'በ +251 913 312 314 በ WhatsApp ወይም በቴሌግራም @AbelDesignChat ፎቶውን ይላኩልን።',
    step4Title: '4. በኣጭር ግዜ ተሰርቶ ይረከቡ',
    step4Desc: 'በልክዎና በፍላጎትዎ መሰረት በጥንቃቄ ተሰርቶ በአጭር ቀናት ውስጥ ይረከባሉ።',
    orderNoteTitle: 'ለጅምላና ለሰርግ ትዕዛዞች',
    orderNoteDesc: 'ለሙሽራ፣ ለሚዜዎችና ለቡድን አልባሳት ልዩ ቅናሽ ስላለን በቀጥታ ይደውሉልን!',

    footerAboutTitle: 'ስለ አቤል ሓበሻ (Abel Habesha)',
    footerAboutDesc: 'አቤል ሓበሻ አልባሳት በኢትዮጵያ ባህላዊ አልባሳት እደ-ጥበብ እምብርት በሆነው በሽሮሜዳ የሚገኝ፣ ለሰርግ፣ ለመልስ፣ ለጥንዶች፣ ለሽምግልናና ለበዓላት የሚሆኑ ምርጥ ጥበቦችን በታማኝነት የሚያቀርብ መደብር ነው።',
    popularCategoriesHeader: 'ተወዳጅ የአልባሳት ምድቦች',
    popularCategoriesFooter: 'ተወዳጅ የአልባሳት ምድቦች',
    visitOurBoutique: 'አድራሻ እና ግንኙነት',
    visitShowroomHeader: 'አድራሻ እና ግንኙነት',
    addressLabel: 'አድራሻችን፦',
    directLineLabel: 'ስልክ መስመር / ዋትስአፕ',
    followSocialHeader: 'ማህበራዊ ገጾቻችንን ይከተሉ፦',
    socialFollow: 'ማህበራዊ ገጾቻችንን ይከተሉ፦',
    allRightsReserved: 'መብቱ በህግ የተጠበቀ ነው።',
    thankYouNote: 'እኛን ስለ መረጡ እናመሰግናለን!',
    thankYouFooter: 'እኛን ስለ መረጡ እናመሰግናለን! 💛 Abel Habesha',

    // Navigation Links
    navHome: 'መነሻ',
    navCatalog: 'ካታሎግ',
    navProducts: 'ምርቶች',
    navAbout: 'ስለ እኛ',
    navContact: 'ያግኙን',
    navAdmin: 'አድሚን',

    // Ecommerce Homepage
    shopNow: 'አሁን ይሸምቱ',
    shopByCategory: 'በምድብ ይሸምቱ',
    bestSellersTitle: 'ተወዳጅ አልባሳት',
    newArrivalsTitle: 'አዳዲስ የገቡ አልባሳት',
    trendingTitle: 'ወቅታዊ ምርጫዎች',
    viewAllProductsBtn: 'ሁሉንም ምርቶች ይመልከቱ',
    bridalSpecialTitle: 'የሰርግና የጅምላ ልዩ ቅናሽ',
    bridalSpecialSubtitle: 'ለሙሽራ፣ ለሚዜዎችና ለቡድን አልባሳት ልዩ ቅናሽ እና ፈጣን ስፌት',
    shopByOccasionTitle: 'በዝግጅት አይነት ይግዙ',

    // About Us Page
    aboutUsTitle: 'ስለ አቤል ሓበሻ ባህላዊ አልባሳት',
    aboutUsSubtitle: 'በሽሮሜዳ እምብርት የሚገኝ የኢትዮጵያ ጥንታዊና ዘመናዊ የእደ-ጥበብ ጥበብ መፍለቂያ',

    // Contact Us Page
    contactUsTitle: 'ያግኙን እና ይዘዙ',
    contactUsSubtitle: 'ወደ ሱቃችን ይምጡ፣ በስልክ ይደውሉ ወይም በዋትስአፕና በቴሌግራም ያግኙን',

    // Admin Panel
    adminPanelTitle: 'የአልባሳት አስተዳዳሪ ክፍል (Admin Panel)',
    adminPanelSubtitle: 'አዳዲስ የሓበሻ አልባሳትን ያክሉ፣ ዋጋና መረጃዎችን ያስተዳድሩ',
    addProductBtn: 'አዲስ አልባሳት ጨምር',
  },

  ti: {
    welcomeTag: '✨ ናይ ኢደ-ጥበብ ሓበሻ ክዳውንቲ',
    brandName: 'ኣቤል ሓበሻ',
    saleTag: 'ቅናሽ',
    announcement: '👉 ብብዝሒ ንዘስርሑ ዓቢ ቅናሽ! ብዝደለይዎ ዲዛይን ብሓጺር ግዜ ቆጸራ',
    callUs: 'ደውሉልና',
    telegramContact: 'ቴሌግራም',
    customOrderBtn: 'ብዝደለይዎ ዲዛይን ኣስርሑ',
    searchPlaceholder: 'ብሽም፣ ብዓይነት ጨርቂ ወይ ብኮድ (ንኣብነት፡ #መርዓ፣ ንክር፣ AH-01) ድለዩ...',
    cart: 'ትእዛዝ',
    emptyCart: 'ዝተመረጸ የለን',

    heroBadge: '✨ ናይ ሓቂ ሽሮሜዳ ሓበሻ ክዳውንቲ ኢደ-ጥበብ',
    heroTitle1: 'ጽባቐን ቅርስን ሃገርና',
    heroTitle2: 'ብኢደ-ጥበበኛታት',
    heroTitle3: 'ዝተሰርሑ ክዳውንቲ',
    heroSubtitle: 'ንዝተፈላለዩ በዓላት ዝኾኑ ሓደሽቲ ዝተዳለዉ ሓበሻ ቀሚሻትን ሺፎናትን ብፍትሓዊ ዋጋ! ብዝደለይዎ ዲዛይን ብሓጺር ግዜ ቆጸራ ነዳልወልኩም።',
    heroDesc: 'ንዝተፈላለዩ በዓላት ዝኾኑ ሓደሽቲ ዝተዳለዉ ሓበሻ ቀሚሻትን ሺፎናትን ብፍትሓዊ ዋጋ! ብዝደለይዎ ዲዛይን ብሓጺር ግዜ ቆጸራ ነዳልወልኩም።',
    bulkDiscountTitle: '👉 ብብዝሒ ንዘስርሑ ዓቢ ቅናሽ!',
    bulkDiscountDesc: 'ንመርዓ ሚዜታት፣ ንጉጅለን ንስድራቤትን ክዳውንቲ ዓቢ ቅናሽ ንገብር።',
    viewCatalog: 'ካታሎግ ርአ',
    fastTurnaround: 'ብሓጺር ግዜ ቆጸራ',
    pureCottonFetel: 'ጽሩይ ናይ ፈትሊ ጡጥ',
    newCollectionTag: 'ሓዱሽ ስብስብ',
    weddingCollection: 'ናይ መርዓ 2024',
    melsCollection: 'ናይ መልሲ ዲዛይን',
    heroCardTitle: 'ናይ መርዓ ዘውዳዊ ወርቂ ጥልፊ ቀሚሽ',
    tailoredToSize: 'ብልክዕኩም ዝስራሕ • ምስ ነጸላ',
    heroFabricBadge: 'ናይ ሓቂ ሽሮሜዳ ፈትሊ',
    heroNetelaSub: 'ባህላዊ ጥበብን ነጸላን',
    heroOrderWhatsApp: 'ብ WhatsApp ቀጥታ እዘዙ',
    heroCustomDesign: 'ብዝደለይዎ ዲዛይን ምእዛዝ',
    heroFeature1Title: 'ብሓጺር ግዜ ቆጸራ',
    heroFeature1Desc: 'ብቕልጡፍ ብዝተኣዘዞ ዓቐን ተሰሪሑ ይበጽሕ',
    heroFeature2Title: 'ናይ ጅምላን መርዓን ቅናሽ',
    heroFeature2Desc: 'ንሚዜታትን ንጉጅለን ዓቢ ቅናሽ',
    heroFeature3Title: 'ናይ ሓቂ ጽሩይ ፈትሊ',
    heroFeature3Desc: 'ካብ ኣኽሱምን ጎጃምን ኢደ-ጥበበኛታት',
    heroHeroTag: 'ኣቤል ሓበሻ ክዳውንቲ',
    heroHeroTagSub: 'ሽሮሜዳ ብላቴና ህንጻ • ኣዲስ ኣበባ',

    categoriesHeader: 'ምድባት ክዳውንቲ',
    categoriesSub: 'ብዝደለይዎ በዓል ወይ ዓይነት ጨርቂ ምረጹ',
    collapseView: 'ኣዕጽው',
    expandView: 'ኩሉ ዘርግሕ',
    allCategories: 'ኩሎም ክዳውንቲ',
    collectionsHeader: 'ምድባት ክዳውንቲ',
    expandAll: 'ኩሉ ዘርግሕ',
    collapse: 'ኣዕጽው',
    clearFilter: 'ኩሉ',
    allPill: 'ኩሉ',
    activeFilterPrefix: 'ዝተመረጸ፦',
    showingItems: 'ክዳውንቲ ተረኺቦም',

    bestSeller: 'ተፈታዊ',
    viewFullDetails: 'ዝርዝር ርአ',
    bulkDiscountAvailable: 'ናይ ጅምላ ቅናሽ ኣለዎ',
    inStock: 'ኣብ መኽዘን ዘሎ',
    tailoringBadge: 'ብቆጸራ',
    viewDetails: 'ዝርዝር ርአ',
    orderWhatsAppShort: 'ብ WhatsApp',
    bestSellerBadge: 'ተፈታዊ',
    featuredBadge: 'ፍሉይ ምርጫ',
    discountBadge: 'ቅናሽ',

    backToCollection: 'ናብ ዝርዝር ተመለስ',
    home: 'መበገሲ',
    bespokeReady: 'ብቆጸራ ዝስራሕ ወይ ድሉው',
    step1ScreenshotTitle: 'ደረጃ 1፦ ነዚ ክዳን Screenshot ግበሩ',
    step1ScreenshotDesc: 'ዝመረጽክምዎ ክዳን ስእሊ Screenshot ብምልዓል ወይ ሓበሬታ ብምቕዳሕ ብ WhatsApp ወይ Telegram ስደዱልና።',
    copiedNotice: 'ተቐዲሑ!',
    copyInfoBtn: 'ሓበሬታ ቅዳሕ',
    specialPriceTag: 'ፍሉይ ዋጋ',
    productDescHeader: 'ብዛዕባ እዚ ክዳን መብርሂ',
    fabricTypeLabel: 'ዓይነት ጨርቂ',
    deliveryLabel: 'ናይ ቆጸራ ግዜ',
    selectSizeLabel: 'ዓቐን / ልክዕ ምረጹ',
    needCustomFit: 'ብልክዕኩም ክስራሕ ትደልዩዶ?',
    customFitHelp: 'ናይ ሰብነት ዓቐንኩም (ቁመት፣ ደረት፣ ወገብ) ኣእትዉ፤ ብልክዕኩም ብጥንቃቐ ሰሪሕና ነረክበኩም።',
    viewDetailsShort: 'ዝርዝር ርአ',
    backToCatalog: 'ናብ ዝርዝር ተመለስ',
    homeBreadcrumb: 'መበገሲ',
    share: 'ኣካፍል',
    copied: 'ተቐዲሑ!',
    copyDressInfo: 'ሓበሬታ ቅዳሕ',
    screenshotTip: 'ደረጃ 1፦ ነዚ ክዳን Screenshot ግበሩ',
    productDescriptionHeader: 'ብዛዕባ እዚ ክዳን መብርሂ',
    traditionalFabric: 'ዓይነት ጨርቂ',
    deliveryTailoring: 'ናይ ቆጸራ ግዜ',
    withinDays: 'መዓልትታት ውሽጢ',
    selectSize: 'ዓቐን / ልክዕ ምረጹ',
    customFitPrompt: 'ብልክዕኩም ክስራሕ ትደልዩዶ?',
    switchToStandardSize: 'ናብ ስሩዕ ዓቐን ተመለስ',
    lengthPlaceholder: 'ቁመት (cm)',
    chestPlaceholder: 'ደረት (cm)',
    waistPlaceholder: 'ሕቖ/ወገብ (cm)',
    hipsPlaceholder: 'ዳሌ (cm)',
    notesPlaceholder: 'ተወሳኺ ሓሳብ (ናይ ሕብሪ ምርጫ ወይ ፍሉይ ድሌት)...',
    orderWhatsAppDirect: 'ብ WhatsApp እዘዝ',
    orderTelegramInbox: 'ብ Telegram Inbox',
    addToBag: 'ናብ ሳንጣ ትእዛዝ ወስኽ',
    addedToBag: 'ናብ ሳንጣ ትእዛዝ ኣትዩ!',
    callShopDirect: 'ብቐጥታ ብስልኪ ደውሉ',
    showroomAddressHeader: 'ናይ ድኳንና ኣድራሻ፦',
    openEveryDay: 'ካብ ሰኑይ - ሰንበት ክፉት እዩ',
    relatedAttireHeader: 'ተመሳሰልቲ ተፈተውቲ ሓበሻ ክዳውንቲ',
    relatedAttireSub: 'ተመሳሳሊ ዲዛይንን ዓይነት ጨርቅን ዘለዎም',
    viewAllSimilar: 'ኩሉ ርአ',
    priceLabel: 'ዋጋ',
    handcraftedShiromeda: 'ናይ ሓቂ ሽሮሜዳ ጥበብ',
    traditionalCraft: 'ብባህላዊ ኢደ-ጥበብ',
    quickTurnaround: 'ቅልጡፍ ቆጸራ',
    qualityGuarantee: 'ናይ ጽሬት ዋሕስ',
    premiumFabricNote: 'ናይ ጨርቂ ጽሬት',

    orderBagTitle: 'ዝመረጽክምዎም ክዳውንቲ',
    itemsCount: 'ክዳውንቲ',
    clearCart: 'ኩሉ ኣውጽእ',
    sizeLabel: 'ዓቐን፦',
    customMeasurementsLabel: 'ዝተዋህበ ልክዕ፦',
    totalEstimated: 'ጠቕላላ ግምት፦',
    freeConsultationNote: '💡 ብብዝሒ ወይ ንመርዓ ሚዜታት ንዝእዘዝ ፍሉይ ቅናሽ ይግበር!',
    sendOrderWhatsApp: 'ትእዛዝ ብ WhatsApp ስደድ',
    sendOrderTelegram: 'ትእዛዝ ብ Telegram ስደድ',
    callToOrder: 'ብቐጥታ ብስልኪ ደዊልኩም ኣረጋግጹ',
    emptyBagPrompt: 'ክሳብ ሕጂ ዝመረጽክምዎ ክዳን የለን።',
    browseCatalogBtn: 'ካታሎግ ርአ',

    customModalTitle: 'ብዝደለይዎ ዲዛይንን ልክዕን ምእዛዝ',
    customModalSubtitle: 'እትደልይዎ ዓይነት ጥበብ ዲዛይን፣ ሕብርን ዓቐንን ንገሩና፤ ብሓጺር ግዜ ሰሪሕና ነረክበኩም።',
    yourName: 'ምሉእ ስም',
    yourPhone: 'ቁጽሪ ስልኪ',
    attireType: 'ዓይነት ክዳን (ንኣብነት፡ ናይ መርዓ ቀሚሽ፣ ናይ መጻምድቲ፣ ናይ ወዲ ተባዕታይ...)',
    eventDate: 'መዓልቲ በዓል (ዝድለየሉ ግዜ)',
    preferredFabric: 'እትመርጽዎ ዓይነት ጨርቂ (ፈትሊ፣ ሳባ፣ ንክር፣ ሺፎን)',
    additionalDetails: 'ተወሳኺ መብርሂ (ዓይነት ጥልፊ፣ ሕብሪ፣ ናይ ሰብነት ዓቐን)',
    submitCustomOrder: 'ትእዛዝ ብ WhatsApp ስደድ',
    cancelBtn: 'ሕደጎ',

    howToOrderTitle: 'ከመይ ጌርኩም ክተእዝዙ ትኽእሉ?',
    howToOrderSubtitle: 'ብቐሊልን ቅልጡፍን 4 ደረጃታት ዝደለይክምዎ ባህላዊ ክዳውንቲ ርከቡ',
    step1Title: '1. ክዳንኩም ምረጹ',
    step1Desc: 'ካብ ካታሎግና እትፈትውዎ ናይ ሓበሻ ቀሚሽ ወይ ባህላዊ ክዳን ምረጹ።',
    step2Title: '2. ነቲ ስእሊ Screenshot ግበሩ',
    step2Desc: 'ዝመረጽክምዎ ክዳን ስእሊ Screenshot ግበሩ ወይ ሓበሬታኡ ቅድሑ።',
    step3Title: '3. ብ WhatsApp ወይ Telegram ስደዱልና',
    step3Desc: 'ብቁጽሪ +251 913 312 314 ብ WhatsApp ወይ ብቴሌግራም @AbelDesignChat ነቲ ስእሊ ስደዱልና።',
    step4Title: '4. ብሓጺር ግዜ ተሰሪሑ ተረከቡ',
    step4Desc: 'ብልክዕኩምን ብድሌትኩምን መሰረት ብጥንቃቐ ተሰሪሑ ብሓጺር መዓልትታት ይረከብ።',
    orderNoteTitle: 'ንጅምላን ንመርዓን ትእዛዛት',
    orderNoteDesc: 'ንመርዓ፣ ንሚዜታትን ንጉጅለን ክዳውንቲ ፍሉይ ቅናሽ ስለዘሎና ብቐጥታ ደውሉልና!',

    footerAboutTitle: 'ብዛዕባ ኣቤል ሓበሻ (Abel Habesha)',
    footerAboutDesc: 'ኣቤል ሓበሻ ክዳውንቲ ኣብ ማእከል ኢትዮጵያዊ ባህላዊ ክዳውንቲ ኢደ-ጥበብ ዝኾነ ሽሮሜዳ ዝርከብ፣ ንመርዓ፣ ንመልሲ፣ ንመጻምድቲ፣ ንሽምግልናን ንበዓላትን ዝኾኑ ብሉጻት ጥበባዊ ክዳውንቲ ብተኣማንነት ዘቕርብ ድኳን እዩ።',
    popularCategoriesHeader: 'ተፈተውቲ ምድባት ክዳውንቲ',
    popularCategoriesFooter: 'ተፈተውቲ ምድባት ክዳውንቲ',
    visitOurBoutique: 'ኣድራሻን ርክብን',
    visitShowroomHeader: 'ኣድራሻን ርክብን',
    addressLabel: 'ኣድራሻና፦',
    directLineLabel: 'መስመር ስልኪ / ዋትስኣፕ',
    followSocialHeader: 'ማሕበራዊ ገጻትና ተኸተሉ፦',
    socialFollow: 'ማሕበራዊ ገጻትና ተኸተሉ፦',
    allRightsReserved: 'መሰሉ ብሕጊ ዝተሓለወ እዩ።',
    thankYouNote: 'ንዓና ስለዝመረጽኩም ነመስግን!',
    thankYouFooter: 'ንዓና ስለ ዝመረጽኩም የቐንየልና! 💛 Abel Habesha',

    // Navigation Links
    navHome: 'መበገሲ',
    navCatalog: 'ካታሎግ',
    navProducts: 'ምህርቲ',
    navAbout: 'ብዛዕባና',
    navContact: 'ርኸቡና',
    navAdmin: 'ኣድሚን',

    // Ecommerce Homepage
    shopNow: 'ሕጂ ይሸምቱ',
    shopByCategory: 'ብምድብ ይሸምቱ',
    bestSellersTitle: 'ተፈተውቲ ክዳውንቲ',
    newArrivalsTitle: 'ሓደሽቲ ዝኣተዉ ክዳውንቲ',
    trendingTitle: 'ናይ ሕጂ ምርጫታት',
    viewAllProductsBtn: 'ኩሎም ምህርትታት ርአ',
    bridalSpecialTitle: 'ናይ መርዓን ጅምላን ፍሉይ ቅናሽ',
    bridalSpecialSubtitle: 'ንመርዓ ሚዜታትን ንጉጅለን ፍሉይ ቅናሽን ቅልጡፍ ስፌትን',
    shopByOccasionTitle: 'ብዓይነት በዓል ግዝኡ',

    // About Us Page
    aboutUsTitle: 'ብዛዕባ ኣቤል ሓበሻ ባህላዊ ክዳውንቲ',
    aboutUsSubtitle: 'ኣብ ማእከል ሽሮሜዳ ዝርከብ ናይ ሃገርና ጥንታዊን ዘመናዊን ናይ ኢደ-ጥበብ መፍለቒ',

    // Contact Us Page
    contactUsTitle: 'ርኸቡናን እዘዙን',
    contactUsSubtitle: 'ናብ ድኳንና ምጹ፣ ብስልኪ ደውሉ ወይ ብዋትስኣፕን ቴሌግራምን ርኸቡና',

    // Admin Panel
    adminPanelTitle: 'ናይ ክዳውንቲ መመሓደሪ ክፍሊ (Admin Panel)',
    adminPanelSubtitle: 'ሓደሽቲ ናይ ሓበሻ ክዳውንቲ ወስኹ፣ ዋጋታትን ሓበሬታን ኣመሓድሩ',
    addProductBtn: 'ሓዱሽ ክዳን ወስኽ',
  },

  en: {
    welcomeTag: '✨ Mastercrafted Habesha Attire',
    brandName: 'Abel Habesha',
    saleTag: 'SALE',
    announcement: '👉 Great discounts for bulk & wedding orders! Fast bespoke tailoring to your exact fit',
    callUs: 'Call Us',
    telegramContact: 'Telegram',
    customOrderBtn: 'Custom Tailoring',
    searchPlaceholder: 'Search by dress name, fabric, or tag (e.g., #Wedding, Chiffon, AH-01)...',
    cart: 'Order Bag',
    emptyCart: 'Bag is empty',

    heroBadge: '✨ Authentic Shiromeda Habesha Craftsmanship',
    heroTitle1: 'Timeless Ethiopian Grace',
    heroTitle2: 'Masterfully Woven',
    heroTitle3: 'Traditional Attire',
    heroSubtitle: 'Handcrafted Habesha Kemis, flowing Chiffon dresses & bespoke traditional wear made in Shiromeda. Custom measurements with fast delivery.',
    heroDesc: 'Handcrafted Habesha Kemis, flowing Chiffon dresses & bespoke traditional wear made in Shiromeda. Custom measurements with fast delivery.',
    bulkDiscountTitle: '👉 Special discounts for bulk & bridal orders!',
    bulkDiscountDesc: 'Exclusive package pricing for wedding parties, maid of honors and families.',
    viewCatalog: 'View Catalog',
    fastTurnaround: 'Fast Turnaround',
    pureCottonFetel: '100% Pure Handspun Fetel',
    newCollectionTag: 'New Collection',
    weddingCollection: 'Wedding 2024',
    melsCollection: 'Meles Design',
    heroCardTitle: 'Royal Golden Bridal Habesha Kemis',
    tailoredToSize: 'Custom Tailored • Matching Netela',
    heroFabricBadge: 'Authentic Shiromeda Fetel',
    heroNetelaSub: 'Handwoven Tibeb & Netela',
    heroOrderWhatsApp: 'Order via WhatsApp',
    heroCustomDesign: 'Request Custom Fit',
    heroFeature1Title: 'Fast Turnaround',
    heroFeature1Desc: 'Handcrafted quickly to your timeline',
    heroFeature2Title: 'Bulk & Bridal Discounts',
    heroFeature2Desc: 'Special rates for wedding parties',
    heroFeature3Title: '100% Handspun Cotton',
    heroFeature3Desc: 'Direct from Axum & Gojjam weavers',
    heroHeroTag: 'Abel Habesha Traditional Attire',
    heroHeroTagSub: 'Shiromeda Blatena Building • Addis Ababa',

    categoriesHeader: 'Collections & Categories',
    categoriesSub: 'Browse by occasion, fabric, or heritage style',
    collapseView: 'Collapse',
    expandView: 'Expand All',
    allCategories: 'All Collections',
    collectionsHeader: 'Collections & Categories',
    expandAll: 'Expand All',
    collapse: 'Collapse',
    clearFilter: 'All Attire',
    allPill: 'All',
    activeFilterPrefix: 'Filtering by:',
    showingItems: 'styles available',

    bestSeller: 'Bestseller',
    viewFullDetails: 'View Details',
    bulkDiscountAvailable: 'Bulk discount available',
    inStock: 'In Showroom',
    tailoringBadge: 'Bespoke Fit',
    viewDetails: 'View Details',
    orderWhatsAppShort: 'WhatsApp',
    bestSellerBadge: 'Bestseller',
    featuredBadge: 'Featured',
    discountBadge: 'Special Offer',

    backToCollection: 'Back to Collection',
    home: 'Home',
    bespokeReady: 'Bespoke Tailored or Ready-to-Wear',
    step1ScreenshotTitle: 'Step 1: Take a screenshot of this dress',
    step1ScreenshotDesc: 'Capture a screenshot or copy the item code, then message our team on WhatsApp or Telegram.',
    copiedNotice: 'Copied!',
    copyInfoBtn: 'Copy Details',
    specialPriceTag: 'Special Price',
    productDescHeader: 'Product Description & Craftsmanship',
    fabricTypeLabel: 'Fabric Type',
    deliveryLabel: 'Tailoring & Delivery',
    selectSizeLabel: 'Select Size or Fit',
    needCustomFit: 'Need custom measurements?',
    customFitHelp: 'Enter your body measurements (length, chest, waist); we tailor it to your exact silhouette.',
    viewDetailsShort: 'View Details',
    backToCatalog: 'Back to Collection',
    homeBreadcrumb: 'Home',
    share: 'Share',
    copied: 'Copied!',
    copyDressInfo: 'Copy Dress Info',
    screenshotTip: 'Step 1: Take a screenshot of this dress',
    productDescriptionHeader: 'Product Description & Craftsmanship',
    traditionalFabric: 'Traditional Fabric',
    deliveryTailoring: 'Delivery / Tailoring',
    withinDays: 'days',
    selectSize: 'Select Size or Custom Fit',
    customFitPrompt: 'Need custom measurements?',
    switchToStandardSize: 'Switch to Standard Size',
    lengthPlaceholder: 'Length (cm)',
    chestPlaceholder: 'Chest (cm)',
    waistPlaceholder: 'Waist (cm)',
    hipsPlaceholder: 'Hips (cm)',
    notesPlaceholder: 'Additional requests (colors, embroidery changes, notes)...',
    orderWhatsAppDirect: 'Order on WhatsApp',
    orderTelegramInbox: 'Order on Telegram',
    addToBag: 'Add to Order Bag',
    addedToBag: 'Added to Order Bag!',
    callShopDirect: 'Call Showroom Directly',
    showroomAddressHeader: 'Store Showroom Address:',
    openEveryDay: 'Open Mon - Sun: 8:30 AM - 8:00 PM',
    relatedAttireHeader: 'You May Also Like',
    relatedAttireSub: 'Similar traditional attire handcrafted in Shiromeda',
    viewAllSimilar: 'View all',
    priceLabel: 'Price',
    handcraftedShiromeda: 'Shiromeda Handcrafted',
    traditionalCraft: '100% Authentic Heritage',
    quickTurnaround: 'Quick Turnaround',
    qualityGuarantee: 'Quality Assured',
    premiumFabricNote: 'Premium Fabric',

    orderBagTitle: 'Selected Attire',
    itemsCount: 'items',
    clearCart: 'Clear All',
    sizeLabel: 'Size:',
    customMeasurementsLabel: 'Custom Fit:',
    totalEstimated: 'Estimated Total:',
    freeConsultationNote: '💡 Special group discounts apply for bridal parties and bulk orders!',
    sendOrderWhatsApp: 'Send Order via WhatsApp',
    sendOrderTelegram: 'Send Order via Telegram',
    callToOrder: 'Call Store Directly to Confirm',
    emptyBagPrompt: 'Your order bag is currently empty.',
    browseCatalogBtn: 'Browse Collection',

    customModalTitle: 'Bespoke Custom Tailoring Order',
    customModalSubtitle: 'Tell us your dream design, colors, and body measurements. Our master tailors will create your dress to perfection.',
    yourName: 'Full Name',
    yourPhone: 'Phone Number',
    attireType: 'Attire Type (e.g., Wedding Kemis, Couple Set, Mens Tunic)',
    eventDate: 'Occasion Date (When do you need it?)',
    preferredFabric: 'Preferred Fabric (Handspun Fetil, Saba, Nkr, Chiffon)',
    additionalDetails: 'Design details, embroidery style, and measurements',
    submitCustomOrder: 'Send Request via WhatsApp',
    cancelBtn: 'Cancel',

    howToOrderTitle: 'How to Order in 4 Easy Steps',
    howToOrderSubtitle: 'Fast, secure and personalized traditional attire shopping',
    step1Title: '1. Choose Your Attire',
    step1Desc: 'Browse our catalog and pick your favorite Habesha Kemis or outfit.',
    step2Title: '2. Screenshot or Copy Details',
    step2Desc: 'Take a screenshot of the dress or copy the item code.',
    step3Title: '3. Message us on WhatsApp or Telegram',
    step3Desc: 'Send the photo to +251 913 312 314 on WhatsApp or @AbelDesignChat on Telegram.',
    step4Title: '4. Tailored & Delivered',
    step4Desc: 'Crafted to your exact size and delivered within quick turnaround days.',
    orderNoteTitle: 'For Bulk & Bridal Orders',
    orderNoteDesc: 'We offer special volume discounts for wedding parties, maid of honors and cultural groups. Call us directly!',

    footerAboutTitle: 'About Abel Habesha (አቤል ሓበሻ)',
    footerAboutDesc: 'Abel Habesha is a premier traditional clothing boutique based in Shiromeda, Addis Ababa. We specialize in authentic handwoven Habesha Kemis, Meles, couple sets, and bespoke embroidery crafted by master Ethiopian artisans.',
    popularCategoriesHeader: 'Popular Collections',
    popularCategoriesFooter: 'Popular Collections',
    visitOurBoutique: 'Showroom & Contact',
    visitShowroomHeader: 'Showroom & Contact',
    addressLabel: 'Address:',
    directLineLabel: 'Direct Line / WhatsApp',
    followSocialHeader: 'Official Social Channels:',
    socialFollow: 'Official Social Channels:',
    allRightsReserved: 'All rights reserved.',
    thankYouNote: 'Thank you for choosing Abel Habesha!',
    thankYouFooter: 'Thank you for choosing Abel Habesha! 💛',

    // Navigation Links
    navHome: 'Home',
    navCatalog: 'Catalog',
    navProducts: 'Products',
    navAbout: 'About Us',
    navContact: 'Contact Us',
    navAdmin: 'Admin Panel',

    // Ecommerce Homepage
    shopNow: 'Shop Now',
    shopByCategory: 'Shop by Category',
    bestSellersTitle: 'Best Sellers',
    newArrivalsTitle: 'New Arrivals',
    trendingTitle: 'Trending Styles',
    viewAllProductsBtn: 'View All Products',
    bridalSpecialTitle: 'Bridal & Group Specials',
    bridalSpecialSubtitle: 'Coordinated wedding party packages, bridesmaid discounts & express tailoring',
    shopByOccasionTitle: 'Shop by Occasion',

    // About Us Page
    aboutUsTitle: 'About Abel Habesha Traditional Attire',
    aboutUsSubtitle: 'Preserving timeless Ethiopian weaving heritage in the heart of Shiromeda, Addis Ababa',

    // Contact Us Page
    contactUsTitle: 'Contact & Visit Us',
    contactUsSubtitle: 'Visit our Shiromeda showroom, call directly, or reach out via WhatsApp & Telegram',

    // Admin Panel
    adminPanelTitle: 'Product Management (Admin Panel)',
    adminPanelSubtitle: 'Add new Habesha attire, update stock and manage your catalog',
    addProductBtn: 'Add New Attire',
  },
};

export function getTranslation(lang: Language = 'en'): TranslationDictionary {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}

export function getProductName(product: { nameAm: string; nameEn: string; nameTi?: string }, lang: Language): string {
  if (lang === 'ti') return product.nameTi || product.nameAm;
  if (lang === 'en') return product.nameEn;
  return product.nameAm;
}

export function getProductFabric(product: { fabricAm: string; fabricEn: string; fabricTi?: string }, lang: Language): string {
  if (lang === 'ti') return product.fabricTi || product.fabricAm;
  if (lang === 'en') return product.fabricEn;
  return product.fabricAm;
}

export function getProductDescription(product: { descriptionAm: string; descriptionEn: string; descriptionTi?: string }, lang: Language): string {
  if (lang === 'ti') return product.descriptionTi || product.descriptionAm;
  if (lang === 'en') return product.descriptionEn;
  return product.descriptionAm;
}
