import React from 'react';
import { Language } from '../types';
import { 
  X, 
  ShieldCheck, 
  RotateCcw, 
  Scissors, 
  Truck, 
  AlertTriangle, 
  CheckCircle2, 
  FileText,
  Phone,
  Sparkles
} from 'lucide-react';
import { STORE_INFO } from '../data/categories';

interface ReturnPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ReturnPolicyModal: React.FC<ReturnPolicyModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  const isAm = language === 'am';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#EAD8C0] my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B0000] via-[#700000] to-[#2D241E] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059] text-[#2D241E] text-xs font-bold mb-2 shadow-xs">
            <FileText className="w-3.5 h-3.5 text-[#2D241E]" />
            <span>{isAm ? 'የመመለሻ እና የትዕዛዝ ደንብ' : 'Return & Order Policy'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white">
            {isAm ? 'የትዕዛዝ፣ የመመለሻ እና የጉምሩክ ደንቦች' : 'Order & Return Terms of Service'}
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            {isAm 
              ? 'አቤል ሓበሻ — የጥበብ ጥራት፣ የባህል ኩራት!' 
              : 'Abel Habesha — Quality of Craft, Pride of Culture!'}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 max-h-[62vh] overflow-y-auto space-y-4 text-xs sm:text-sm text-[#2D241E]/90 leading-relaxed">
          
          {/* Section 1: ትዕዛዝ ስለማረጋገጥ */}
          <div className="p-4 rounded-2xl bg-[#FDFCF8] border border-[#EAD8C0] space-y-2">
            <div className="flex items-center gap-2 text-[#8B0000] font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <h4 className="text-sm">1. ትዕዛዝ ስለማረጋገጥ (Order Confirmation & Cancellation)</h4>
            </div>
            <p>
              ትዕዛዝዎ የሚጸናው የልብስ ልክ (Measurement) ሰጥተው አስፈላጊውን ቅድመ ክፍያ ሲፈጽሙ ብቻ ነው።
            </p>
            <p className="text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200/60 font-medium">
              ⚠️ ምርቱ ወደ ማምረት ከተገባ ትእዛዙ አንዴ ከታዘዘ በኋላ መሰረዝ ኣይቻልም። ከታዘዘ ማለት፦ ዲዛይን (Design)፣ የጥልፍ ቅርፅ ዲዛይን (Embroidery pattern)፣ ቀለም (Color)፣ ጨርቅ (Fabric)፣ ዘይቤ (Style) እና ሌሎች የምርት ዝርዝሮች ተረጋግጠው ስራ ከተጀመረ በኋላ ነው።
            </p>
          </div>

          {/* Section 2: ዕቃ የመመለስ/ የመለወጥ ሁኔታ */}
          <div className="p-4 rounded-2xl bg-[#FDFCF8] border border-[#EAD8C0] space-y-2">
            <div className="flex items-center gap-2 text-[#8B0000] font-bold">
              <RotateCcw className="w-4 h-4 shrink-0" />
              <h4 className="text-sm">2. ዕቃ የመመለስ/ የመለወጥ ሁኔታ (Returns & Exchanges)</h4>
            </div>
            <p>
              ልብሶቹ በርስዎ ልዩ ትዕዛዝ እና ልክ (Custom-made) ብቻ የሚዘጋጁ በመሆናቸው፣ ከተሰፉ በኋላ መመለስ ወይም በሌላ መለወጥ አይቻልም።
            </p>
          </div>

          {/* Section 3: ማስተካከያ */}
          <div className="p-4 rounded-2xl bg-[#FDFCF8] border border-[#EAD8C0] space-y-2">
            <div className="flex items-center gap-2 text-[#2E4739] font-bold">
              <Scissors className="w-4 h-4 shrink-0" />
              <h4 className="text-sm text-[#2E4739]">3. የ14 ቀናት ነፃ ማስተካከያ (Free Alterations)</h4>
            </div>
            <p>
              ከልክ ጋር የተያያዘ ክፍተት ካለ ከተረከቡበት ቀን ጀምሮ በ14 ቀናት ውስጥ ካመጡልን በነፃ ማስተካከያ እናደርጋለን።
            </p>
          </div>

          {/* Section 4: የትራንስፖርት/መጓጓዣ ወጪ */}
          <div className="p-4 rounded-2xl bg-[#FDFCF8] border border-[#EAD8C0] space-y-2">
            <div className="flex items-center gap-2 text-[#8B0000] font-bold">
              <Truck className="w-4 h-4 shrink-0" />
              <h4 className="text-sm">4. የትራንስፖርት/መጓጓዣ ወጪ (Shipping Costs)</h4>
            </div>
            <p>
              ዕቃውን ለመላኪያ/ለመውሰድ/ እና ለመመለስ የሚወጣውን ማንኛውንም የመጓጓዣ ወጪ ደንበኛው ይሸፍናል።
            </p>
          </div>

          {/* Section 5: የገቢ ዕቃ ቀረጥ፣ ታክስ እና የጉምሩክ ክፍያዎች */}
          <div className="p-4 rounded-2xl bg-[#FDFCF8] border border-[#EAD8C0] space-y-2">
            <div className="flex items-center gap-2 text-[#8B0000] font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <h4 className="text-sm">5. የገቢ ዕቃ ቀረጥ፣ ታክስ እና የጉምሩክ ክፍያዎች (Customs & Import Duties)</h4>
            </div>
            <p>
              ምርቱ በሚደርስበት ሀገር የሚጣሉ ማናቸውንም የገቢ ዕቃ ቀረጦች፣ የጉምሩክ ክፍያዎች፣ ታክሶች ወይም ሌሎች ክፍያዎችን የመክፈል ሙሉ ኃላፊነት የገዢው (የደንበኛው) ነው።
            </p>
            <p className="text-[#8B0000] font-semibold">
              ገዢው ክፍያዎቹን ለመክፈል ፈቃደኛ ባለመሆኑ ወይም የጉምሩክ ሂደቱን ሳያጠናቅቅ በመቅረቱ ምክንያት ዕቃው ተመልሶ ቢመጣ ምንም ዓይነት ገንዘብ ተመላሽ (Refund) አናደርግም።
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F9F4EC] border-t border-[#EAD8C0] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#2D241E]/70 font-medium">
            <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{STORE_INFO.phoneDisplay}</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#8B0000] hover:bg-[#6E0000] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            {isAm ? 'ተረድቻለሁ' : 'I Understand'}
          </button>
        </div>

      </div>
    </div>
  );
};
