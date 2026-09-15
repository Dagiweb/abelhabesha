import React, { useState } from 'react';
import { Language } from '../types';
import { 
  BookOpen, 
  Sparkles, 
  Clock, 
  Tag, 
  ArrowRight, 
  ChevronRight, 
  Scissors, 
  Share2, 
  Check, 
  ShoppingBag,
  Ruler,
  FileText
} from 'lucide-react';
import { 
  imgWedding, 
  imgMeles, 
  imgAxum, 
  imgCoffee, 
  imgRaya, 
  imgCouple 
} from '../data/products';

interface BlogArticle {
  id: string;
  slug: string;
  categoryAm: string;
  categoryEn: string;
  categoryTi: string;
  readTimeAm: string;
  readTimeEn: string;
  readTimeTi: string;
  date: string;
  titleAm: string;
  titleEn: string;
  titleTi: string;
  summaryAm: string;
  summaryEn: string;
  summaryTi: string;
  image: string;
  contentAm: string[];
  contentEn: string[];
  contentTi: string[];
}

const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'blog-chiffon-vs-china',
    slug: 'chiffon-vs-china-fabric',
    categoryAm: 'የጨርቅ እውቀት',
    categoryEn: 'Fabric Knowledge',
    categoryTi: 'ናይ ጨርቂ ፍልጠት',
    readTimeAm: '4 ደቂቃ ንባብ',
    readTimeEn: '4 min read',
    readTimeTi: '4 ደቒቓ ንባብ',
    date: '2026',
    titleAm: 'የሺፎን እና የቻይና ጨርቅ ልዩነት — የትኛውን ለዝግጅትዎ መምረጥ አለብዎት?',
    titleEn: 'Chiffon vs. China Fabric: Which Should You Choose for Your Event?',
    titleTi: 'ፍልልይ ሺፎንን ቻይና ጨርቅን — ኣየናይ ንበዓልኹም ክትመርፁ ኣለኩም?',
    summaryAm: 'ቀላልና ተወዛዋዥ ሺፎን ወይስ ወፍራምና ቅርጽ ይዞ የሚቆም ቻይና ጨርቅ? ጥቅሞቻቸውንና ለየትኛው ዝግጅት እንደሚስማሙ በዝርዝር ይመልከቱ።',
    summaryEn: 'Lightweight flowy chiffon or structured, opaque China fabric? Learn the key differences and which suits your upcoming event best.',
    summaryTi: 'ቀሊልን ተወዛዋዝን ሺፎን ወይስ ርጉድን ቅርፂ ሒዙ ዝፀንሕ ቻይና ጨርቂ? ጥቕሞታቶምን ዝስማምዕዎም በዓላትን ይርከቡ።',
    image: imgMeles,
    contentAm: [
      'የሓበሻ አልባሳት ዲዛይን ሲታሰብ የጨርቁ አይነትና ባህሪ ትልቁን ሚና ይጫወታል። በቅርብ ዓመታት በስፋት ተወዳጅ ከሆኑት መካከል "ንጹህ ሺፎን (Chiffon)" እና "ቻይና ጨርቅ (China Fabric)" ግንባር ቀደሞቹ ናቸው። ሁለቱም የየራሳቸው ማራኪ ባህሪያት አሏቸው።',
      '፩. ንጹህ ሺፎን (Pure Silk Chiffon)፦ ሺፎን እጅግ በጣም ቀላል፣ አየር የሚያሳልፍ እና በሰውነት ላይ ውብ ሆኖ የሚወዛወዝ (flowy) ጨርቅ ነው። በተለይ በሞቃታማ የአየር ጠባይ ለሚደረጉ ዝግጅቶች፣ ለሽኝት፣ ለመልስ እና ለቀን በዓላት ፍጹም ምርጫ ነው። ከስር ሽፋን (lining) ጋር የሚሰፋ በመሆኑ የተሟላ ግርማ ሞገስ ይሰጣል።',
      '፪. ቻይና ጨርቅ (Structured China Fabric)፦ ቻይና ጨርቅ ደግሞ ከሺፎን የበለጠ ወፍራም፣ ጠንካራ እና ቅርጹን ጠብቆ የሚቆም ጨርቅ ነው። ውስጡ የማይታይ (opaque) በመሆኑ እና ጠንካራ የጥልፍ ስራዎችን በደንብ ስለሚሸከም ለዋና ሰርግ እና ለደመቁ የምሽት ፕሮግራሞች ከፍተኛ ተመራጭ ነው።',
      '💡 የአቤል ሓበሻ ምክር፦ በቀን ዝግጅት ለመወዛወዝ እና ለቀላል እንቅስቃሴ ሺፎን ይመረጣል፤ ግርማ ሞገስ ያለው እና ጥልፉ ጎልቶ እንዲታይ ለሚፈለግ የሰርግ ቀሚስ ደግሞ ቻይና ጨርቅ ምርጥ ውሳኔ ነው።'
    ],
    contentEn: [
      'When choosing traditional Habesha attire, the choice of fabric fundamentally defines how the garment feels, drapes, and breathes. The two most sought-after modern choices in our boutique are Pure Chiffon and Structured China Fabric.',
      '1. Pure Chiffon: Extremely airy, lightweight, and fluid. Chiffon offers an ethereal drape that moves gracefully with every step. Tailored with a smooth internal lining, it is the premier choice for summer receptions, daytime Meles gatherings, and celebratory parties.',
      '2. China Fabric: Heavier, firmer, and completely opaque. China fabric retains structural lines flawlessly, creating majestic royal gowns that hold intricate gold and silver tibeb embroidery without sagging.',
      '💡 Boutique Recommendation: Choose Chiffon for fluid elegance and warm weather comfort; choose China Fabric for regal ceremony gowns with rich, structured embroidery.'
    ],
    contentTi: [
      'ባህላዊ ክዳውንቲ ሓበሻ ክንመርፅ እንከለና እቲ ዓይነት ጨርቂ ወሳኒ ግደ ኣለዎ። ሺፎንን ቻይና ጨርቅን ነናቶም ፍሉይ ባህርያት ኣለዎም።',
      '፩. ንጹህ ሺፎን፦ ቀሊል፣ ንፋስ ዘሕልፍን ብውቁብ ዝወዛወዝን ጨርቂ እዩ። ንቀሊል ምንቅስቓስን ናይ ቀትሪ በዓላትን ኣዝዩ ዝመረፀ እዩ።',
      '፪. ቻይና ጨርቂ፦ ርጉድ፣ ቅርፁ ዝሕሉን ፅኑዕ ጥልፊ ዝስከምን እዩ። ንዓበይቲ መርዓታትን ውቁብ ምሸታዊ ፕሮግራማትን መተካእታ የብሉን።'
    ]
  },
  {
    id: 'blog-baptism-vs-communion',
    slug: 'baptism-vs-communion-attire',
    categoryAm: 'ባህልና ሥርዓት',
    categoryEn: 'Spiritual Heritage',
    categoryTi: 'ባህልን መንፈሳዊ ስርዓትን',
    readTimeAm: '5 ደቂቃ ንባብ',
    readTimeEn: '5 min read',
    readTimeTi: '5 ደቒቓ ንባብ',
    date: '2026',
    titleAm: 'የክርስትና እና የቁርባን አልባሳት — ባህላዊ እና መንፈሳዊ ሕግጋቶች',
    titleEn: 'Baptism vs. Holy Communion: Traditional Rules and Spiritual Meaning',
    titleTi: 'ናይ ጥምቀትን ቍርባንን ክዳውንቲ — ባህላውን መንፈሳውን ስርዓት',
    summaryAm: 'የክርስትና ልብስ እና የቁርባን ልብስ ያላቸው ልዩነት፣ የሚመረጡ የጥጥ ጥራቶች እና የጥልፍ ቀለሞች ምን መሆን አለባቸው?',
    summaryEn: 'The traditional differences between Christian baptism and holy communion attire, suitable cotton grades, and proper embroidery colors.',
    summaryTi: 'ናይ ክርስትናን ቁርባንን ክዳውንቲ ዘለዎም ፍልልያት፣ ዝምረፁ ዓይነት ጡጥን ሕብርታት ጥልፍን።',
    image: imgAxum,
    contentAm: [
      'በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን እምነትና ባህል መሰረት የክርስትና (ጥምቀት) እና የቁርባን (የጋብቻ ወይም የመጀመሪያ ቁርባን) አልባሳት ጥልቅ መንፈሳዊ ትርጉም አላቸው። ሁለቱም ንጹህ ነጭ ጥጥን መሰረት ያደረጉ ቢሆኑም የሚከተሉት ዋና ልዩነቶች አሏቸው፦',
      '፩. የክርስትና አልባሳት (Baptismal Attire)፦ ለህጻናትም ሆነ ለአዋቂዎች ንጹህ ነጭ የኣክሱም ፈትል ጥጥ ይጠቀማል። ጥልፉ ቀለል ያለ ሆኖ በብዛት መስቀል፣ ርግቦች እና ሰማያዊ ወይም ወርቃማ ስስ ጥበብ ይኖረዋል። ዋናው ትኩረት የነፍስን ንጽሕና እና ዳግም ልደትን ማሳየት ነው። እንዲሁም አብሮ የሚዘጋጀው ነጠላ ንጹህ ማግ ያለው መሆን አለበት።',
      '፪. የቁርባን አልባሳት (Holy Communion / Matrimony)፦ የቁርባን አልባሳት ደግሞ ይበልጥ ረጅም፣ ሙሉ በሙሉ ገላን የሚሸፍን፣ እና ክቡር የሆነ የእጅ ጥልፍ ያካተተ ነው። ቀለማቱ በዋናነት ነጭ፣ ቢጫ/ወርቃማ ወይም ሰማያዊ ጥበብ ሲሆን፣ የደመቁ ወይም ዓለማዊ ምስሎችና ጌጦች አይገቡበትም።',
      '💡 የአቤል ሓበሻ አሰራር፦ በቤተክርስቲያን ቀኖና መሰረት የተቀደሱ መስቀሎችን በጥንቃቄ ከወገብ በላይ ብቻ እንጠልፋለን፤ የክርስትና ቀሚሶችም ከንጹህ የተፈጥሮ ጥጥ በእጅ ይፈተላሉ።'
    ],
    contentEn: [
      'In Ethiopian Orthodox spiritual tradition, garments worn for Baptism and Holy Communion symbolize purity, devotion, and sacred rebirth. Both honor handspun white cotton, but observe precise ecclesiastical guidelines.',
      '1. Baptism Attire: Crafted from untreated, handspun white cotton. The embroidery is intentionally understated, showcasing delicate crosses, olive branches, and sky-blue or golden-yellow accents. Emphasizes purity and spiritual renewal.',
      '2. Holy Communion Attire: Dignified, full-length silhouette providing modest coverage. All sacred cross motifs are strictly embroidered above the waistline with regal restraint, avoiding secular adornment.',
      '💡 Abel Habesha Craft: We weave all sacramental attires with pure handspun Axum cotton, strictly honoring church heritage.'
    ],
    contentTi: [
      'ኣብ መንፈሳዊ ባህልና ናይ ጥምቀትን ቁርባንን ክዳውንቲ ንጽህናን መንፈሳዊ ክብሪን ዘመልክቱ እዮም። ክልቲኦም ብጽሩይ ፃዕዳ ጡጥ ዝስርሑ ኮይኖም፣ ፍሉይ ሕጊ ስርዓት ኣለዎም።'
    ]
  },
  {
    id: 'blog-fetel-and-mag',
    slug: 'fetel-and-mag-handloom-art',
    categoryAm: 'የሽሮሜዳ ጥበብ',
    categoryEn: 'Shiromeda Craft',
    categoryTi: 'ናይ ሽሮሜዳ ጥበብ',
    readTimeAm: '6 ደቂቃ ንባብ',
    readTimeEn: '6 min read',
    readTimeTi: '6 ደቒቓ ንባብ',
    date: '2026',
    titleAm: 'ፈትል እና ማግ — በሽሮሜዳ የሚፈተለው የሺህ ዓመታት የሸማ ጥበብ ሚስጥር',
    titleEn: 'Fetel and Mag: The Thousand-Year Heritage of Shiromeda Handloom Weaving',
    titleTi: 'ፈትልን ማግን — ኣብ ሽሮሜዳ ዝስራሕ ናይ ሽሕ ዓመታት ናይ ሸማ ጥበብ',
    summaryAm: 'ፈትል (Warp) ምንድን ነው? ማግ (Weft)ስ? እውነተኛ የሓበሻ ሸማ ልብስ እንዴት እንደሚሰራ ደረጃ በደረጃ ይረዱ።',
    summaryEn: 'What is fetel (warp) and mag (weft)? Discover how master artisans in Shiromeda weave pure cotton threads into heirloom royal garments.',
    summaryTi: 'ፈትልን ማግን እንታይ እዮም? ሓቀኛ ባህላዊ ሸማ ብኸመይ ከምዝስራሕ ደረጃ ብደረጃ ይረዱ።',
    image: imgWedding,
    contentAm: [
      'በአዲስ አበባ የሽሮሜዳ ገበያ ውስጥ ሲገቡ የሚሰማው የሸማ ማገሪያ እንጨት ድምፅ ("ክላክ-ክላክ") የዘመናት የኢትዮጵያ ስልጣኔ ህያው መገለጫ ነው። የባህላዊ ጨርቅ አሰራር በሁለት ዋና ክፍሎች ይዋቀራል፦',
      '፩. ፈትል (The Warp)፦ ፈትል ማለት በሸማው ርዝመት (ቁመት) የሚወጠሩ ጠንካራ የጥጥ ክሮች ናቸው። የጨርቁን መሰረትና ጥንካሬ ይወስናሉ። የአክሱም እና የጎንደር ጥጥ ለፈትል እጅግ ተወዳጅ ነው ምክንያቱም ክሩ ረጅም እና የማይበጠስ በመሆኑ ነው።',
      '፪. ማግ (The Weft)፦ ማግ ደግሞ በማመላለሻ (መወርወሪያ) አማካኝነት በፈትሎቹ መካከል ወደ ግራና ቀኝ የሚገባው ክር ነው። የጨርቁን ልስላሴ እና ውፍረት የሚሰጠው ማግ ነው።',
      '፫. ጥበብ (Tibeb / Pattern)፦ የጥበብ ክሮች ከማግ ጋር ተቀናጅተው በጣቶች እየተቆጠሩ የሚሰፉ ባለቀለም የወርቅ፣ የብር እና የሐር ክሮች ናቸው። እያንዳንዱ የጥበብ ዲዛይን የራሱ ስም አለው — ለምሳሌ "የንግሥት ጥበብ"፣ "የአክሱም ሐውልት"፣ "የዓይነ-ርግብ"።',
      'አቤል ሓበሻ ይህንን ትክክለኛ የሽሮሜዳ ሸማ ከዘመናዊ የልኬት ቅንጦት ጋር አዋህዶ ለዓለም ያቀርባል።'
    ],
    contentEn: [
      'The rhythmic tap of the wooden handloom in Shiromeda is the living heartbeat of Ethiopian textile heritage. Every genuine Habesha gown is born from the harmonious marriage of two elements: Fetel and Mag.',
      '1. Fetel (The Warp): The vertical threads stretched tight along the length of the loom. Sourced from high-grade Axum and Gonder natural cotton, these threads provide structural resilience and drape.',
      '2. Mag (The Weft): The horizontal threads carried swiftly back and forth across the warp through the shuttle. Mag imbues the woven cotton with breathability and cloud-like softness.',
      '3. Tibeb (Decorative Motifs): Metallic gold, silver, and vibrant colored silk threads painstakingly hand-counted between the weft to generate timeless geometrical motifs like "Royal Saba", "Axum Obelisk", and "Dove Eye".'
    ],
    contentTi: [
      'ኣብ ሽሮሜዳ ዝስራሕ ናይ ሸማ ስራሕ ናይ ብዙሓት ዘመናት ታሪኽ ኣለዎ። ፈትሊ ማለት እቲ ቁመታዊ ጽኑዕ ክዳን ዘረጋግጽ ክር እንትኸውን፣ ማግ ድማ እቲ ልስላሰ ዝህብ ኣግድማዊ ክር እዩ።'
    ]
  },
  {
    id: 'blog-wedding-guide',
    slug: 'habesha-wedding-and-meles-guide',
    categoryAm: 'የሰርግ መመሪያ',
    categoryEn: 'Wedding Guide',
    categoryTi: 'ናይ መርዓ መምርሒ',
    readTimeAm: '5 ደቂቃ ንባብ',
    readTimeEn: '5 min read',
    readTimeTi: '5 ደቒቓ ንባብ',
    date: '2026',
    titleAm: 'የሰርግ እና የመልስ አልባሳት ሙሉ መመሪያ — ለሙሽራና ለሚዜዎች',
    titleEn: 'Complete Habesha Wedding & Meles Style Guide for Brides & Grooms',
    titleTi: 'ምሉእ መምርሒ ናይ መርዓን መልስን ክዳውንቲ — ንመርዓውትን ሚዜታትን',
    summaryAm: 'የሰርግ እና የመልስ አልባሳትን እንዴት ማጣመር ይቻላል? ለቡድን ትዕዛዝ የሚሰጡ ታላላቅ ቅናሾች እና የቀጠሮ ግዜ አያያዝ።',
    summaryEn: 'How to coordinate wedding and Meles dresses, groom matching attire, bridal party group discounts, and scheduling advice.',
    summaryTi: 'ናይ መርዓን መልስን ክዳውንቲ ብኸመይ ከምዝተሓባበር፣ ናይ ጉጅለ ቅናሻትን ናይ ቆፀሮ ምሕደራን።',
    image: imgCouple,
    contentAm: [
      'የኢትዮጵያ ሰርግ በዓለም ላይ ካሉ ደማቅና ባህላዊ ውበት ከተላበሱ ክስተቶች አንዱ ነው። ሙሽሮች እና ሚዜዎች ውብ ሆነው እንዲታዩ የሚከተሉትን ዋና ነጥቦች ማወቅ ይገባል፦',
      '፩. የሰርግ ቀን እና የመልስ ቀን ልዩነት፦ በዋናው የሰርግ ቀን ወርቃማ ወይም የብር ጥበብ ያለው ንጹህ ነጭ ጥጥ ቀሚስና የካፕል ልብስ ተመራጭ ነው። በመልስ ቀን ደግሞ ይበልጥ ደማቅ ቀለማት (ደማቅ ቀይ፣ ጥልቅ አረንጓዴ፣ ሮያል ሰማያዊ) እና የራያ/ሳባ ጨርቆች ከፍተኛ ግርማ ይሰጣሉ።',
      '፪. የሚዜዎች ማጣመር (Bridesmaids & Groomsmen)፦ የሚዜዎች ልብስ የሙሽሮችን ቀለም የሚደግፍ እንጂ የሚጋርድ መሆን የለበትም። አቤል ሓበሻ ከ 5 በላይ ለሆኑ የሰርግ ቡድኖች ከፍተኛ የጅምላ ቅናሽ ያደርጋል።',
      '፫. የቀጠሮ ግዜ አያያዝ፦ ለሰርግ አልባሳት ቢያንስ ከ 2 እስከ 3 ሳምንታት አስቀድሞ ማዘዝ ይመከራል። ሆኖም በአስቸኳይ ለደረሱ ትዕዛዞች በ 3 ቀናት ውስጥ የማጠናቀቅ ልዩ ችሎታ አለን።'
    ],
    contentEn: [
      'An Ethiopian wedding is a breathtaking tapestry of culture, regal colors, and spiritual celebration. Here is how to create a harmonious wedding wardrobe:',
      '1. Wedding Day vs. Meles: The primary wedding day traditionally highlights pristine white Axum cotton with royal gold or silver tibeb embroidery. The Meles celebration, by contrast, embraces rich jewel tones—royal emerald, deep scarlet, and Saba textiles.',
      '2. Bridal Party Coordination: Bridesmaids and groomsmen garments should complement the newlyweds with balanced accents. We offer specialized bulk rates for wedding parties of 4 or more.',
      '3. Turnaround Scheduling: While we advise ordering 2-3 weeks in advance for large wedding parties, our workshop reliably provides 3-day express tailoring for urgent requests.'
    ],
    contentTi: [
      'ናይ ሓበሻ መርዓ ብውቁብ ባህላዊ ክዳውንቲ ዝማዕረገ እዩ። ኣብ መርዓ ፃዕዳ ምስ ወርቃማ ጥልፊ ዝበለፀ እንትኸውን፣ ኣብ መልሲ ድማ ደማቕ ሕብርታት ይምረፁ።'
    ]
  },
  {
    id: 'blog-garment-care',
    slug: 'how-to-care-habesha-kemis',
    categoryAm: 'የአያያዝ ጥበብ',
    categoryEn: 'Garment Care',
    categoryTi: 'ናይ ኣተሓሕዛ ጥበብ',
    readTimeAm: '3 ደቂቃ ንባብ',
    readTimeEn: '3 min read',
    readTimeTi: '3 ደቒቓ ንባብ',
    date: '2026',
    titleAm: 'የሓበሻ ቀሚስ አጠባበቅ እና እንክብካቤ — የጥበቡን ወርቅ ሳያደበዝዙ እንዴት ይያዛል?',
    titleEn: 'How to Care for and Preserve Your Habesha Kemis & Gold Tibeb',
    titleTi: 'ኣተሓሕዛን ክንክንን ናይ ሓበሻ ቀሚሽ — ጥልፉ ከይሃሰሰ ብኸመይ ንዕቅቦ?',
    summaryAm: 'የተፈተለ ንጹህ ጥጥ እና የወርቅ ጥልፍ እንዳይበላሽ በቤት ውስጥ የሚደረጉ ጥንቃቄዎች፣ እጥበት እና የካውያ አጠቃቀም።',
    summaryEn: 'Home care guidelines, gentle hand-washing, and iron temperatures to keep pure cotton and gold threads brilliant for decades.',
    summaryTi: 'ፃዕዳ ጡጥን ወርቃማ ጥልፍን ከይበላሸው ኣብ ገዛ ዝግበሩ ጥንቃቐታት፣ ምሕጻብን ካውያን።',
    image: imgCoffee,
    contentAm: [
      'የሓበሻ አልባሳት ከትውልድ ወደ ትውልድ የሚተላለፉ ውድ ቅርሶች ናቸው። ተገቢውን እንክብካቤ ካደረጉላቸው ለዓመታት እንደ አዲስ ደምቀው ይኖራሉ፦',
      '፩. እጥበት (Washing)፦ ፈጽሞ በልብስ ማጠቢያ ማሽን (Machine Wash) አያጥቡ። ለብ ባለ ውሃ እና ለስላሳ ሳሙና በእጅ በቀስታ ማጠብ ይመረጣል። ጥልፉ ያለበትን ቦታ በኃይል አያሹ።',
      '፪. ማድረቅ (Drying)፦ በቀጥታ በበረታ ፀሐይ ስር ከማድረቅ በጥላ ስር በንፋስ እንዲደርቅ ማድረግ ቀለሙ እንዳይደበዝዝ ይረዳል።',
      '፫. ካውያ (Ironing)፦ የጥበብ ጥልፉን በካውያ በቀጥታ አይንኩ። ቀሚሱን ገልብጠው ከስር መተኮስ ወይም ቀጭን ነጭ ጨርቅ በጥበቡ ላይ ጣል አድርገው በዝቅተኛ ሙቀት መተኮስ ወርቃማው ክር እንዳይቃጠል ያደርጋል።'
    ],
    contentEn: [
      'Habesha garments are treasured heirlooms. With thoughtful care, your cotton gown and gold tibeb will stay radiant for generations:',
      '1. Hand Washing Only: Never machine wash handcrafted garments. Submerge gently in lukewarm water using mild detergent. Avoid rigorous scrubbing over embroidered sections.',
      '2. Shaded Drying: Dry naturally in gentle shade rather than under scorching direct sunlight to preserve cotton luster and thread richness.',
      '3. Ironing Precaution: Never place a hot iron directly onto metallic tibeb threads. Iron inside-out or place a thin white cotton cloth over the embroidery using low to medium steam.'
    ],
    contentTi: [
      'ባህላዊ ክዳውንቲ ብጥንቃቐ እንተተታሒዞም ንነዊሕ ዓመታት ጽባቐኦም ይሕልዉ። ብማሽን ዘይኮነስ ብኢድ ብልስሉስ ማይ ምሕጻብን፣ ብውሽጢ ገጹ ምትኳስን የድሊ።'
    ]
  }
];

interface BlogPageProps {
  language: Language;
  onNavigateToProducts: () => void;
  onOpenCustomOrder: () => void;
  onOpenMeasurementGuide?: () => void;
  onOpenReturnPolicy?: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  language,
  onNavigateToProducts,
  onOpenCustomOrder,
  onOpenMeasurementGuide,
  onOpenReturnPolicy,
}) => {
  const isAm = language === 'am';
  const isTi = language === 'ti';

  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const categories = [
    { id: 'all', nameAm: 'ሁሉም ብሎጎች', nameEn: 'All Articles', nameTi: 'ኩሎም ብሎጋት' },
    { id: 'fabric', nameAm: 'የጨርቅ እውቀት', nameEn: 'Fabric Knowledge', nameTi: 'ናይ ጨርቂ ፍልጠት' },
    { id: 'heritage', nameAm: 'ባህልና ጥበብ', nameEn: 'Heritage & Craft', nameTi: 'ባህልን ጥበብን' },
    { id: 'wedding', nameAm: 'የሰርግ መመሪያ', nameEn: 'Wedding Guides', nameTi: 'ናይ መርዓ መምርሒ' },
  ];

  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    if (activeCategory === 'fabric') return article.id.includes('chiffon') || article.id.includes('care');
    if (activeCategory === 'heritage') return article.id.includes('baptism') || article.id.includes('fetel');
    if (activeCategory === 'wedding') return article.id.includes('wedding');
    return true;
  });

  const handleShare = (article: BlogArticle) => {
    const title = isTi ? article.titleTi : isAm ? article.titleAm : article.titleEn;
    if (navigator.share) {
      navigator.share({
        title,
        text: `${title} - Abel Habesha Blogs`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedSlug(article.id);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  };

  return (
    <div className="bg-[#FDFCF8] min-h-screen text-[#2D241E] pb-24 sm:pb-16">
      
      {/* Blog Hero Header */}
      <div className="bg-linear-to-b from-[#2D241E] via-[#241B16] to-[#1F1713] text-[#FDFCF8] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B0000]/80 border border-[#C5A059]/40 text-xs font-bold text-[#FDFCF8] uppercase tracking-wider shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{isTi ? 'ናይ ኣቤል ሓበሻ ብሎግን የባህል መረጃን' : isAm ? 'የአቤል ሓበሻ ብሎጎች እና የባህል መረጃ' : 'Abel Habesha Heritage & Fashion Blog'}</span>
          </span>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FDFCF8] tracking-tight">
            {isTi 
              ? 'ናይ ሓበሻ አልባሳት ሚስጢራት፣ ጨርቅታትን ናይ ዲዛይን ጥበብን' 
              : isAm 
              ? 'የሓበሻ አልባሳት ሚስጥሮች፣ የጨርቅ አይነቶችና የዲዛይን ጥበብ' 
              : 'The Art of Habesha Fashion, Textiles & Heritage'}
          </h1>

          <p className="text-xs sm:text-base text-[#FDFCF8]/80 max-w-2xl mx-auto font-light leading-relaxed">
            {isTi
              ? 'ብዛዕባ ሺፎን፣ ናይ ቻይና ጨርቂ፣ ናይ ጥምቀትን ቁርባንን ሕጊ፣ ከምኡውን ናይ ሰርግ ምድላው ዝምልከቱ ዝተመረፁ ጽሑፋት።'
              : isAm
              ? 'ስለ ሺፎን እና ቻይና ጨርቅ ልዩነት፣ ስለ ክርስትና እና ቁርባን አልባሳት፣ ስለ ሰርግ ዝግጅት እና ስለ ሸማ ጥበብ የተሰናዱ ጠቃሚ እውቀቶች።'
              : 'Curated articles on Ethiopian handloom traditions, fabric comparisons, sacramental dress codes, and wedding styling tips directly from our Shiromeda master tailors.'}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCategory(c.id);
                  setSelectedArticle(null);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === c.id
                    ? 'bg-[#C5A059] text-[#2D241E] shadow-sm'
                    : 'bg-white/10 text-stone-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {isTi ? c.nameTi : isAm ? c.nameAm : c.nameEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* If viewing a single article in detail */}
        {selectedArticle ? (
          <div className="bg-white rounded-3xl border border-[#EAD8C0] p-6 sm:p-10 shadow-xs space-y-8 animate-in fade-in">
            {/* Back to articles */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#8B0000] hover:text-[#630000] transition-colors py-1 px-3 rounded-xl bg-[#F9F4EC] border border-[#EAD8C0]"
            >
              ← {isTi ? 'ናብ ኩሎም ብሎጋት ተመለስ' : isAm ? 'ወደ ሁሉም ብሎጎች ተመለስ' : 'Back to All Articles'}
            </button>

            {/* Article Header */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                <span className="px-2.5 py-0.5 rounded-md bg-[#8B0000]/10 text-[#8B0000] font-bold">
                  {isTi ? selectedArticle.categoryTi : isAm ? selectedArticle.categoryAm : selectedArticle.categoryEn}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{isTi ? selectedArticle.readTimeTi : isAm ? selectedArticle.readTimeAm : selectedArticle.readTimeEn}</span>
                </span>
                <span>• {selectedArticle.date}</span>
              </div>

              <h1 className="text-xl sm:text-3xl font-serif font-bold text-[#2D241E]">
                {isTi ? selectedArticle.titleTi : isAm ? selectedArticle.titleAm : selectedArticle.titleEn}
              </h1>
            </div>

            {/* Article Hero Image */}
            <div className="aspect-16/9 sm:aspect-21/9 rounded-2xl overflow-hidden bg-[#F9F4EC] border border-[#EAD8C0]">
              <img
                src={selectedArticle.image}
                alt="Blog Cover"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Paragraphs */}
            <div className="space-y-4 text-xs sm:text-base leading-relaxed text-[#2D241E]/90 max-w-3xl">
              {(isTi && selectedArticle.contentTi.length > 0
                ? selectedArticle.contentTi
                : isAm
                ? selectedArticle.contentAm
                : selectedArticle.contentEn
              ).map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#EAD8C0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(selectedArticle)}
                  className="px-4 py-2 rounded-xl bg-[#F9F4EC] border border-[#EAD8C0] text-xs font-bold flex items-center gap-2 text-[#2D241E] hover:bg-[#EAD8C0]/30 transition-colors"
                >
                  {copiedSlug === selectedArticle.id ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span>{isAm ? 'ሊንኩ ተገልብጧል' : 'Link Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-[#8B0000]" />
                      <span>{isAm ? 'አጋራ (Share)' : 'Share Article'}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onNavigateToProducts}
                  className="px-5 py-2.5 rounded-xl bg-[#8B0000] text-white text-xs sm:text-sm font-bold hover:bg-[#6e0000] transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAm ? 'ተዛማጅ አልባሳትን ይመልከቱ' : 'Explore Related Attires'}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Grid of Blog Articles */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => {
              const title = isTi ? article.titleTi : isAm ? article.titleAm : article.titleEn;
              const summary = isTi ? article.summaryTi : isAm ? article.summaryAm : article.summaryEn;
              const category = isTi ? article.categoryTi : isAm ? article.categoryAm : article.categoryEn;
              const readTime = isTi ? article.readTimeTi : isAm ? article.readTimeAm : article.readTimeEn;

              return (
                <div
                  key={article.id}
                  onClick={() => {
                    setSelectedArticle(article);
                    window.scrollTo({ top: 200, behavior: 'smooth' });
                  }}
                  className="group bg-white rounded-3xl border border-[#EAD8C0] overflow-hidden hover:shadow-md hover:border-[#8B0000]/40 transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative aspect-16/10 overflow-hidden bg-[#F9F4EC]">
                    <img
                      src={article.image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#2D241E]/85 backdrop-blur-xs text-[#FDFCF8] text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] text-stone-500 font-medium">
                        <Clock className="w-3 h-3 text-[#8B0000]" />
                        <span>{readTime}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>

                      <h3 className="text-base font-serif font-bold text-[#2D241E] group-hover:text-[#8B0000] transition-colors line-clamp-2">
                        {title}
                      </h3>

                      <p className="text-xs text-[#2D241E]/75 line-clamp-3 leading-relaxed font-light">
                        {summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#EAD8C0] flex items-center justify-between text-xs font-bold text-[#8B0000] group-hover:translate-x-0.5 transition-transform">
                      <span>{isAm ? 'ሙሉውን አንብብ' : 'Read Article'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Bottom Resources Bar */}
        <div className="mt-12 p-6 rounded-3xl bg-[#F9F4EC] border border-[#EAD8C0] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#2D241E]">
                {isAm ? 'ለዝግጅትዎ ልዩ ዲዛይን ማሰራት ይፈልጋሉ?' : 'Need Bespoke Cultural Tailoring for Your Event?'}
              </h4>
              <p className="text-xs text-[#2D241E]/70 mt-0.5">
                {isAm 
                  ? 'በሽሮሜዳ ባሉ ምርጥ የጥበብ ሰሪዎች በፈለጉት ጨርቅና ልኬት በ 3 ቀናት ውስጥ እናዘጋጃለን።' 
                  : 'Shiromeda master weavers and tailors ready to craft your custom garment in 3 days.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {onOpenMeasurementGuide && (
              <button
                onClick={onOpenMeasurementGuide}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#EAD8C0] text-xs font-bold text-[#2D241E] hover:border-[#8B0000] transition-colors flex items-center gap-1.5"
              >
                <Ruler className="w-3.5 h-3.5 text-[#8B0000]" />
                <span>{isAm ? 'የልኬት መመሪያ' : 'Measurement Guide'}</span>
              </button>
            )}

            {onOpenReturnPolicy && (
              <button
                onClick={onOpenReturnPolicy}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#EAD8C0] text-xs font-bold text-[#2D241E] hover:border-[#8B0000] transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-[#8B0000]" />
                <span>{isAm ? 'የመመለሻ ደንብ' : 'Return Policy'}</span>
              </button>
            )}

            <button
              onClick={onOpenCustomOrder}
              className="px-4 py-2 rounded-xl bg-[#8B0000] text-white text-xs font-bold hover:bg-[#6e0000] transition-colors shadow-xs flex items-center gap-1.5"
            >
              <span>{isAm ? 'በልክ ማዘዣ' : 'Order Bespoke'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
