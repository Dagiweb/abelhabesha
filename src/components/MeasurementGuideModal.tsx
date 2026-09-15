import React, { useState } from 'react';
import { Language } from '../types';
import { 
  X, 
  Ruler, 
  Sparkles, 
  CheckCircle2, 
  Video, 
  Info, 
  Globe, 
  Scissors, 
  HeartHandshake, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface MeasurementGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const MeasurementGuideModal: React.FC<MeasurementGuideModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  const isAm = language === 'am';
  const isTi = language === 'ti';
  const [activeGender, setActiveGender] = useState<'women' | 'men'>('women');
  const [activeMenPart, setActiveMenPart] = useState<'shirt' | 'pants'>('shirt');
  const [unit, setUnit] = useState<'cm' | 'inch'>('cm');

  const womenMeasurements = [
    {
      id: 'seder',
      titleAm: 'ሠደር (Seder)',
      titleEn: 'Upper Chest / Front Yoke (Seder)',
      descAm: 'ከግራ ትከሻ እስከ ቀኝ ትከሻ ያለው የፊት ደረት ስፋት። በጥልፍና በስፌት ጊዜ የቀሚሱ የፊት ክፍል እንዳይጠብ ይረዳል።',
      descEn: 'Front upper chest width between shoulder roots. Essential for the bodice and tibeb pattern alignment.',
      tipAm: 'የልኬት ቴፑን ሳይወጥሩ በተመቻቸ አቋቋም ይለኩ።',
      badge: 'የፊት ጥልፍ'
    },
    {
      id: 'height',
      titleAm: 'ቁመት (Full Dress Length)',
      titleEn: 'Full Length',
      descAm: 'ከትከሻ አናት ጀምሮ በጡት ጫፍ በኩል አሳልፈው እስከሚፈልጉት ጫማ ወይም መሬት ድረስ ያለው ቁመት።',
      descEn: 'From high point of shoulder down across the bust point straight to desired hemline or floor.',
      tipAm: 'ለዝግጅቱ የሚለብሱትን ተረከዝ (Heels) ግምት ውስጥ ያስገቡ።',
      badge: 'መሰረታዊ'
    },
    {
      id: 'bust',
      titleAm: 'ጡት ዙሪያ (Bust Circumference)',
      titleEn: 'Bust Circumference',
      descAm: 'በጡት ጫፍ ከፍተኛው ቦታ ዙሪያ የልኬት ቴፑን በሙሉ ዙሪያ በማሳለፍ የሚለካ።',
      descEn: 'Measure around the fullest part of the bust, keeping the measuring tape parallel to the floor.',
      tipAm: 'ቴፑ ከኋላና ከፊት እኩል አግድም መሆኑን ያረጋግጡ።',
      badge: 'ዙሪያ'
    },
    {
      id: 'waist',
      titleAm: 'ወገብ ዙሪያ (Waist Circumference)',
      titleEn: 'Waist Circumference',
      descAm: 'ከእምብርት ጥቂት ከፍ ብሎ በጣም ቀጭኑ የወገብ ክፍል ዙሪያ የሚለካ።',
      descEn: 'Measure around the natural narrowest part of the waist.',
      tipAm: 'ሆድን ሳያስገቡ በተፈጥሯዊ አተነፋፈስ ይለኩ።',
      badge: 'ዙሪያ'
    },
    {
      id: 'shoulder',
      titleAm: 'ትከሻ (Shoulder to Shoulder)',
      titleEn: 'Shoulder Width',
      descAm: 'ከግራ ትከሻ ጫፍ አጥንት ጀምሮ በጀርባ አንገት በኩል እስከ ቀኝ ትከሻ ጫፍ አጥንት ድረስ።',
      descEn: 'Across the back from edge of left shoulder bone to right shoulder bone.',
      tipAm: 'ቀጥ ብለው ይቁሙ፣ ትከሻዎ ዘና ይበል።',
      badge: 'አግድም'
    },
    {
      id: 'sleeve',
      titleAm: 'እጅጌ (Sleeve Length)',
      titleEn: 'Sleeve Length',
      descAm: 'ከትከሻው አጥንት ጀምሮ እስከ የእጅ አንጓ ወይም እስከሚፈልጉት ርዝመት ድረስ።',
      descEn: 'From the top of shoulder down over elbow to the wrist bone or desired cuff level.',
      tipAm: 'ረጅም እጅጌ ከሆነ እጅን በትንሹ አጥፈው ይለኩ።',
      badge: 'እጅ'
    }
  ];

  const menShirtMeasurements = [
    {
      id: 'shirt_len',
      titleAm: 'ቁመት (Shirt Length)',
      titleEn: 'Length',
      descAm: 'ከትከሻና ከአንገት መገናኛ ጀምሮ እስከ ዳሌ አጋማሽ ወይም እስከሚፈልጉት የሸሚዝ ርዝመት።',
      descEn: 'From base of collar down front to desired hem length.',
    },
    {
      id: 'chest',
      titleAm: 'ደረት ዙሪያ (Chest Circumference)',
      titleEn: 'Chest Circumference',
      descAm: 'በደረት ከፍተኛው ክፍል ዙሪያ የልኬት ቴፑን በብብት ስር አሳልፈው ይለኩ።',
      descEn: 'Around fullest part of chest, under armpits, tape snug but comfortable.',
    },
    {
      id: 'abdomen',
      titleAm: 'ሆድ ዙሪያ (Abdomen / Belly Circumference)',
      titleEn: 'Abdomen / Stomach Circumference',
      descAm: 'በሆድ ሰፊው ክፍል ዙሪያ የሚወሰድ ልክ። ሸሚዙ ቁጭ ሲሉ እንዳይወጠር ይረዳል።',
      descEn: 'Around fullest part of stomach to ensure comfortable fit when sitting.',
    },
    {
      id: 'shoulder',
      titleAm: 'ትከሻ (Shoulder Width)',
      titleEn: 'Shoulder Width',
      descAm: 'ከጀርባ በኩል ከአንድ የትከሻ ጫፍ አጥንት እስከ ሌላኛው ጫፍ።',
      descEn: 'Across the back between the outer edges of the shoulders.',
    },
    {
      id: 'arm',
      titleAm: 'እጅ (Sleeve Length)',
      titleEn: 'Sleeve Length',
      descAm: 'ከትከሻ ጫፍ ጀምሮ እስከ እጅ አንጓ ድረስ።',
      descEn: 'From shoulder seam down to wrist bone.',
    },
    {
      id: 'wrist',
      titleAm: 'እጅ ዙሪያ (Wrist / Arm Circumference)',
      titleEn: 'Wrist / Arm Circumference',
      descAm: 'በእጅ አንጓ እና በጡንቻ ሰፊው ክፍል ዙሪያ።',
      descEn: 'Around wrist and biceps for exact cuff and sleeve width.',
    }
  ];

  const menPantsMeasurements = [
    {
      id: 'pants_waist',
      titleAm: 'ወገብ ዙሪያ (Pants Waist)',
      titleEn: 'Waist Circumference',
      descAm: 'ቀበቶ በሚታሰርበት ወይም ሱሪ በሚለብሱበት ቦታ ዙሪያ።',
      descEn: 'Around where you normally wear your trousers and belt.',
    },
    {
      id: 'hip',
      titleAm: 'ዳሌ/ቂጥ (Hip / Seat)',
      titleEn: 'Hip / Seat Circumference',
      descAm: 'በዳሌ እና በቂጥ ሰፊው ክፍል ዙሪያ የሚለካ።',
      descEn: 'Around the fullest part of hips and buttocks.',
    },
    {
      id: 'crotch',
      titleAm: 'ፓትሌት/ፊንታ (Inseam / Crotch)',
      titleEn: 'Crotch / Inseam',
      descAm: 'ከፊንታ ስር ጀምሮ እስከ ቁርጭምጭሚት ድረስ ያለው ርዝመት።',
      descEn: 'From crotch seam down inside leg to bottom hem.',
    },
    {
      id: 'pants_len',
      titleAm: 'ቁመት (Outseam / Full Pants Length)',
      titleEn: 'Outseam Length',
      descAm: 'ከወገብ ጀምሮ በውጭ በኩል እስከ ጫማ የላይኛው ክፍል ድረስ።',
      descEn: 'From waistline down outer seam to top of shoes.',
    },
    {
      id: 'thigh',
      titleAm: 'ታፋ (Thigh Circumference)',
      titleEn: 'Thigh Circumference',
      descAm: 'በታፋ ሰፊው የላይኛው ክፍል ዙሪያ።',
      descEn: 'Around fullest part of upper thigh.',
    },
    {
      id: 'ankle',
      titleAm: 'እግር ዙሪያ (Bottom / Ankle Width)',
      titleEn: 'Leg Opening / Ankle Width',
      descAm: 'በቁርጭምጭሚት ዙሪያ የሚፈለገው የሱሪ የታችኛው ስፋት።',
      descEn: 'Desired circumference of pants cuff around ankle.',
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#EAD8C0] my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B0000] via-[#750000] to-[#2D241E] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059] text-[#2D241E] text-xs font-bold mb-2 shadow-xs">
            <Ruler className="w-3.5 h-3.5 text-[#2D241E]" />
            <span>{isAm ? 'የልኬት አወሳሰድ መመሪያ' : 'Measurement Guide'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white">
            {isAm ? 'ትክክለኛ የልብስ ልኬት እንዴት ይወሰዳል?' : 'How to Take Accurate Measurements'}
          </h2>
          <p className="text-xs sm:text-sm text-white/85 mt-1 max-w-xl">
            {isAm 
              ? 'ይህ ገጽ በተለይ ለዳያስፖራ ደንበኞች እጅግ ጠቃሚ ነው። በፎቶ እና ቪድዮ እያንዳንዱ ልኬት በትክክል እንዲወሰድ የሚረዳ ዝርዝር መመሪያ።'
              : 'Designed especially for diaspora and overseas clients. Measure with precision for a custom-tailored royal fit.'}
          </p>

          {/* Unit Toggle */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs text-white/80 font-medium">የመለኪያ አሃድ (Unit):</span>
            <div className="inline-flex rounded-lg bg-black/30 p-0.5 border border-white/15 text-xs font-bold">
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${unit === 'cm' ? 'bg-[#C5A059] text-[#2D241E]' : 'text-white/80 hover:text-white'}`}
              >
                ሴንቲሜትር (CM)
              </button>
              <button
                type="button"
                onClick={() => setUnit('inch')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${unit === 'inch' ? 'bg-[#C5A059] text-[#2D241E]' : 'text-white/80 hover:text-white'}`}
              >
                ኢንች (Inches)
              </button>
            </div>
          </div>
        </div>

        {/* Gender Tabs */}
        <div className="border-b border-[#EAD8C0] bg-[#F9F4EC] px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveGender('women')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeGender === 'women'
                  ? 'bg-[#8B0000] text-white shadow-xs'
                  : 'bg-white text-[#2D241E] border border-[#EAD8C0] hover:border-[#8B0000]'
              }`}
            >
              {isAm ? '👗 የሴቶች ልኬት' : "👗 Women's Attire"}
            </button>
            <button
              type="button"
              onClick={() => setActiveGender('men')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeGender === 'men'
                  ? 'bg-[#8B0000] text-white shadow-xs'
                  : 'bg-white text-[#2D241E] border border-[#EAD8C0] hover:border-[#8B0000]'
              }`}
            >
              {isAm ? '👔 የወንዶች ልኬት' : "👔 Men's Attire"}
            </button>
          </div>

          {activeGender === 'men' && (
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-[#EAD8C0]">
              <button
                type="button"
                onClick={() => setActiveMenPart('shirt')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                  activeMenPart === 'shirt' ? 'bg-[#8B0000] text-white' : 'text-[#2D241E] hover:text-[#8B0000]'
                }`}
              >
                {isAm ? 'ሸሚዝ' : 'Shirt'}
              </button>
              <button
                type="button"
                onClick={() => setActiveMenPart('pants')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                  activeMenPart === 'pants' ? 'bg-[#8B0000] text-white' : 'text-[#2D241E] hover:text-[#8B0000]'
                }`}
              >
                {isAm ? 'ሱሪ' : 'Trousers'}
              </button>
            </div>
          )}
        </div>

        {/* Diaspora Video & Photo Tips Banner */}
        <div className="p-4 sm:p-5 bg-amber-50/70 border-b border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-950">
          <div className="flex items-start gap-2.5">
            <Video className="w-5 h-5 text-[#8B0000] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#8B0000] block text-xs sm:text-sm">
                {isAm ? 'የቪድዮ እና የፎቶ እገዛ' : 'Video & Photo Measurement Guide'}
              </span>
              <p className="text-[11px] text-amber-900/90 mt-0.5">
                {isAm 
                  ? 'በቴሌግራም ወይም WhatsApp ላይ ቪድዮ በመላክ ባለሙያዎቻችን በቪድዮ ጥሪ ልኬትዎን አብረው እንዲወስዱ ማድረግ ይችላሉ።'
                  : 'You can request live video assistance via WhatsApp or Telegram for our master tailors to guide you step-by-step.'}
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/251913312314?text=%E1%88%B0%E1%88%8B%E1%89%9d%20%E1%8A%A0%E1%89%A4%E1%88%8D%20%E1%88%93%E1%89%A0%E1%88%83!%20%E1%8B%A8%E1%88%8D%E1%8A%AB%E1%89%B5%20%E1%8A%A5%E1%8C%88%E1%8B%B3%20%E1%8A%A5%E1%8D%88%E1%88%8D%E1%8C%8B%E1%88%88%E1%88%81"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-bold text-xs shrink-0 shadow-2xs hover:bg-[#1EBE5D] transition-colors"
          >
            <span>{isAm ? 'የቪድዮ እገዛ ጠይቅ' : 'Request Video Help'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Content List */}
        <div className="p-5 sm:p-6 max-h-[58vh] overflow-y-auto space-y-4">
          {activeGender === 'women' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {womenMeasurements.map((m, idx) => (
                <div key={m.id} className="p-4 rounded-2xl bg-[#FDFCF8] border border-[#EAD8C0] hover:border-[#8B0000]/60 transition-all shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#8B0000] text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-sm text-[#2D241E]">{isAm ? m.titleAm : m.titleEn}</h4>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#C5A059]/20 text-[#8B0000]">
                        {m.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#2D241E]/80 leading-relaxed mb-2">
                      {isAm ? m.descAm : m.descEn}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#EAD8C0]/60 flex items-center gap-1.5 text-[11px] text-[#8B0000]">
                    <Info className="w-3.5 h-3.5 shrink-0" />
                    <span>{m.tipAm}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {(activeMenPart === 'shirt' ? menShirtMeasurements : menPantsMeasurements).map((m, idx) => (
                <div key={m.id} className="p-4 rounded-2xl bg-[#FDFCF8] border border-[#EAD8C0] hover:border-[#8B0000]/60 transition-all shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#8B0000] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="font-bold text-sm text-[#2D241E]">{isAm ? m.titleAm : m.titleEn}</h4>
                    </div>
                    <p className="text-xs text-[#2D241E]/80 leading-relaxed">
                      {isAm ? m.descAm : m.descEn}
                    </p>
                  </div>
                  <div className="pt-2 mt-2 border-t border-[#EAD8C0]/60 text-[11px] text-stone-500">
                    <span>{isAm ? 'ትክክለኛውን ልክ በ' : 'Measure in '} {unit === 'cm' ? 'ሴ.ሜ (cm)' : 'ኢንች (inches)'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F9F4EC] border-t border-[#EAD8C0] flex items-center justify-between">
          <span className="text-xs text-[#2D241E]/80 font-medium">
            {isAm ? 'ጥያቄ አለዎት? በቀጥታ ይደውሉልን፦ +251 913 31 23 14' : 'Questions? Call our master tailors: +251 913 31 23 14'}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#8B0000] hover:bg-[#6E0000] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            {isAm ? 'ተረድቻለሁ / ዝጋ' : 'Understood / Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
