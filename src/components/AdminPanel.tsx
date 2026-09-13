import React, { useState, useId } from 'react';
import { User } from 'firebase/auth';
import { Product, Language, CategoryGroupId } from '../types';
import { CATEGORIES } from '../data/categories';
import { IMAGE_PRESETS } from '../data/products';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Upload, 
  Image as ImageIcon, 
  Sparkles, 
  Search, 
  ArrowLeft, 
  RotateCcw,
  Tag, 
  CheckCircle2,
  AlertCircle,
  Eye,
  Sliders,
  DollarSign,
  Boxes,
  FileText,
  CloudCheck,
  Cloud,
  Smartphone,
  CheckCircle,
  Loader2
} from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (product: Product) => Promise<void> | void;
  onUpdateProduct: (product: Product) => Promise<void> | void;
  onDeleteProduct: (productId: string) => Promise<void> | void;
  onResetCatalog: () => Promise<void> | void;
  onBackToStore: () => void;
  language: Language;
  adminUser?: User;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetCatalog,
  onBackToStore,
  language,
  adminUser
}) => {
  const isAm = language === 'am';
  const isTi = language === 'ti';

  // Form mode: 'inventory', 'create', 'edit'
  const [activeTab, setActiveTab] = useState<'inventory' | 'create'>('inventory');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Search & Filter in Admin
  const [adminSearch, setAdminSearch] = useState('');
  const [adminGroupFilter, setAdminGroupFilter] = useState<string>('all');

  // Form state
  const [formData, setFormData] = useState<Partial<Product>>({
    code: `AH-${Math.floor(1000 + Math.random() * 9000)}`,
    nameAm: '',
    nameEn: '',
    nameTi: '',
    categoryGroup: 'events',
    hashtags: ['#ለተለያዩ_ዝግጅቶች_የሚለበሱ_ልብሶች'],
    fabricAm: 'የኣክሱም ፈትል ንጹህ ጥጥ ከነነጠላው',
    fabricEn: 'Pure Handspun Cotton with Netela',
    fabricTi: 'ናይ ኣኽሱም ፈትሊ ጽሩይ ጡጥ ምስ ነጸላኡ',
    priceETB: 18000,
    originalPriceETB: 21000,
    image: IMAGE_PRESETS[0].image,
    descriptionAm: 'ለተለያዩ ዝግጅቶች የሚሆን በሽሮሜዳ በባህላዊ እደ-ጥበብ የተዘጋጀ የሓበሻ አልባሳት።',
    descriptionEn: 'Authentic handcrafted Habesha traditional attire tailored with pure cotton and royal tibeb.',
    descriptionTi: 'ንዝተፈላለዩ በዓላት ዝኸውን ብባህላዊ ኢደ-ጥበብ ዝተዳለወ ናይ ሓበሻ ክዳን።',
    inStock: true,
    tailoringDays: 3,
    featured: false,
    bestSeller: false,
  });

  const [customTagInput, setCustomTagInput] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resetForm = () => {
    setFormData({
      code: `AH-${Math.floor(1000 + Math.random() * 9000)}`,
      nameAm: '',
      nameEn: '',
      nameTi: '',
      categoryGroup: 'events',
      hashtags: ['#ለተለያዩ_ዝግጅቶች_የሚለበሱ_ልብሶች'],
      fabricAm: 'የኣክሱም ፈትል ንጹህ ጥጥ ከነነጠላው',
      fabricEn: 'Pure Handspun Cotton with Netela',
      fabricTi: 'ናይ ኣኽሱም ፈትሊ ጽሩይ ጡጥ ምስ ነጸላኡ',
      priceETB: 18000,
      originalPriceETB: 21000,
      image: IMAGE_PRESETS[0].image,
      descriptionAm: 'ለተለያዩ ዝግጅቶች የሚሆን በሽሮሜዳ በባህላዊ እደ-ጥበብ የተዘጋጀ የሓበሻ አልባሳት።',
      descriptionEn: 'Authentic handcrafted Habesha traditional attire tailored with pure cotton and royal tibeb.',
      descriptionTi: 'ንዝተፈላለዩ በዓላት ዝኸውን ብባህላዊ ኢደ-ጥበብ ዝተዳለወ ናይ ሓበሻ ክዳን።',
      inStock: true,
      tailoringDays: 3,
      featured: false,
      bestSeller: false,
    });
    setEditingProduct(null);
    setCustomImageUrl('');
    setCustomTagInput('');
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setActiveTab('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Helper function to compress images uploaded via Mobile camera / photo gallery
   * Keeps Firestore documents tiny (< 100KB) and snappy on mobile 3G/4G.
   */
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Max dimension 800px for high definition yet ultra-compact footprint
          const maxDim = 800;
          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to clean JPEG
          const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('Image decode error'));
        img.src = event.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file);
        setFormData((prev) => ({ ...prev, image: compressed }));
        setSuccessMessage(isAm ? 'የስልክ ፎቶ በተሳካ ሁኔታ ተመርጧል!' : 'Photo loaded and optimized for fast mobile saving!');
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err) {
        console.error('Failed to process image:', err);
        setErrorMessage(isAm ? 'ፎቶውን ማስገባት አልተቻለም። እባክዎ እንደገና ይሞክሩ።' : 'Could not process photo file.');
      }
    }
  };

  const handleApplyCustomUrl = () => {
    if (customImageUrl.trim()) {
      setFormData((prev) => ({ ...prev, image: customImageUrl.trim() }));
      setCustomImageUrl('');
    }
  };

  const handleToggleTag = (tag: string) => {
    setFormData((prev) => {
      const currentTags = prev.hashtags || [];
      if (currentTags.includes(tag)) {
        return { ...prev, hashtags: currentTags.filter((t) => t !== tag) };
      } else {
        return { ...prev, hashtags: [...currentTags, tag] };
      }
    });
  };

  const handleAddCustomTag = () => {
    if (customTagInput.trim()) {
      let tag = customTagInput.trim();
      if (!tag.startsWith('#')) tag = `#${tag}`;
      if (!formData.hashtags?.includes(tag)) {
        setFormData((prev) => ({
          ...prev,
          hashtags: [...(prev.hashtags || []), tag]
        }));
      }
      setCustomTagInput('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.nameAm || !formData.nameEn) {
      setErrorMessage(isAm ? 'እባክዎ የአልባሳቱን ስም በአማርኛ እና በእንግሊዝኛ ያስገቡ።' : 'Please provide the dress name in both Amharic and English.');
      return;
    }

    if (!formData.priceETB || formData.priceETB <= 0) {
      setErrorMessage(isAm ? 'እባክዎ ትክክለኛ ዋጋ ያስገቡ።' : 'Please enter a valid price.');
      return;
    }

    if (!formData.image) {
      setErrorMessage(isAm ? 'እባክዎ ፎቶ ይምረጡ ወይም ያስገቡ።' : 'Please select or upload an image.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingProduct) {
        // Update existing
        const updated: Product = {
          ...editingProduct,
          ...(formData as Product),
          id: editingProduct.id,
        };
        await onUpdateProduct(updated);
        setSuccessMessage(isAm ? 'አልባሳቱ በ Firebase ዳታቤዝ ላይ ተሻሽሏል!' : 'Product successfully updated in Firebase Firestore!');
      } else {
        // Create new
        const newProduct: Product = {
          id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          code: formData.code || `AH-${Math.floor(1000 + Math.random() * 9000)}`,
          nameAm: formData.nameAm || 'አዲስ የሓበሻ አልባሳት',
          nameEn: formData.nameEn || 'New Habesha Attire',
          nameTi: formData.nameTi || formData.nameAm || 'ሓዱሽ ናይ ሓበሻ ክዳን',
          categoryGroup: (formData.categoryGroup as Product['categoryGroup']) || 'events',
          hashtags: formData.hashtags && formData.hashtags.length > 0 ? formData.hashtags : ['#ለተለያዩ_ዝግጅቶች_የሚለበሱ_ልብሶች'],
          fabricAm: formData.fabricAm || 'የኣክሱም ፈትል ንጹህ ጥጥ ከነነጠላው',
          fabricEn: formData.fabricEn || 'Pure Handspun Cotton with Netela',
          fabricTi: formData.fabricTi || 'ናይ ኣኽሱም ፈትሊ ጽሩይ ጡጥ ምስ ነጸላኡ',
          priceETB: Number(formData.priceETB),
          originalPriceETB: formData.originalPriceETB ? Number(formData.originalPriceETB) : undefined,
          image: formData.image || IMAGE_PRESETS[0].image,
          descriptionAm: formData.descriptionAm || '',
          descriptionEn: formData.descriptionEn || '',
          descriptionTi: formData.descriptionTi || '',
          inStock: formData.inStock ?? true,
          tailoringDays: Number(formData.tailoringDays) || 3,
          featured: Boolean(formData.featured),
          bestSeller: Boolean(formData.bestSeller),
        };
        await onAddProduct(newProduct);
        setSuccessMessage(isAm ? 'አዲሱ አልባሳት በ Firebase ዳታቤዝ ላይ በቋሚነት ተቀምጧል!' : 'New attire successfully saved to Firebase Firestore!');
      }

      resetForm();
      setTimeout(() => {
        setSuccessMessage(null);
        setActiveTab('inventory');
      }, 1500);
    } catch (err) {
      console.error('Error submitting product:', err);
      setErrorMessage(isAm ? 'ዳታቤዝ ላይ ማስቀመጥ አልተቻለም። እባክዎ እንደገና ይሞክሩ።' : 'Failed to save product to database. Please check connection and retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered products inside admin
  const filteredProducts = products.filter((p) => {
    if (adminGroupFilter !== 'all' && p.categoryGroup !== adminGroupFilter) return false;
    if (adminSearch.trim()) {
      const q = adminSearch.toLowerCase();
      return p.nameAm.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.hashtags.some((t) => t.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="bg-[#FDFCF8] min-h-screen text-[#2D241E] pb-24 sm:pb-12">
      {/* Top Admin Header Bar - Specially Optimized for Mobile */}
      <div className="bg-linear-to-r from-[#2D241E] to-[#1F1713] text-[#FDFCF8] border-b border-[#C5A059]/40 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-2">
            
            {/* Store & Title */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                onClick={onBackToStore}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#FDFCF8] transition-colors shrink-0"
                title="Return to Storefront"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm sm:text-lg font-serif font-bold text-[#C5A059] truncate">
                    Abel Habesha Admin
                  </span>
                  <span className="text-[9px] sm:text-[10px] px-2 py-0.5 bg-emerald-700 text-white rounded-full font-bold uppercase tracking-wider flex items-center gap-1 shrink-0">
                    <Cloud className="w-3 h-3" />
                    <span>Firebase Live</span>
                  </span>
                  {adminUser?.email && (
                    <span className="hidden md:inline-block text-[10px] text-stone-300 bg-white/10 px-2 py-0.5 rounded-full truncate max-w-xs font-mono">
                      👤 {adminUser.email}
                    </span>
                  )}
                </div>
                <div className="text-[10px] sm:text-[11px] text-stone-300 truncate">
                  {products.length} {isAm ? 'አልባሳት በ Firebase ውስጥ አሉ' : 'Items in live database'}
                </div>
              </div>
            </div>

            {/* Top Quick Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  setActiveTab('inventory');
                  setEditingProduct(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  activeTab === 'inventory' 
                    ? 'bg-[#C5A059] text-[#2D241E] shadow-2xs' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Boxes className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">{isAm ? 'ዝርዝር' : 'Inventory'}</span>
                <span>({products.length})</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('create');
                  resetForm();
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-2xs ${
                  activeTab === 'create' && !editingProduct
                    ? 'bg-[#8B0000] text-white ring-2 ring-amber-400' 
                    : 'bg-[#8B0000] text-white hover:bg-[#a01818]'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>{isAm ? 'አዲስ' : 'Add'}</span>
              </button>

              <button
                onClick={onBackToStore}
                className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{isAm ? 'መደብሩን ይመልከቱ' : 'Store'}</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        {/* Mobile Info Strip */}
        <div className="mb-4 sm:hidden bg-[#F9F4EC] border border-[#EAD8C0] p-2.5 rounded-2xl flex items-center justify-between text-[11px] text-[#2D241E]/80">
          <div className="flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-[#8B0000]" />
            <span className="font-semibold">{isAm ? 'የሞባይል አድሚን ዝግጁ ነው' : 'Mobile Admin Active'}</span>
          </div>
          <span className="text-[10px] text-emerald-800 bg-emerald-100 font-bold px-2 py-0.5 rounded-md">
            Firestore Database
          </span>
        </div>

        {/* Success / Error Alerts */}
        {successMessage && (
          <div className="mb-4 sm:mb-6 p-3.5 sm:p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 shadow-xs animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs sm:text-sm font-bold">{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 sm:mb-6 p-3.5 sm:p-4 rounded-2xl bg-red-50 border border-red-300 text-red-900 flex items-center gap-3 shadow-xs animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span className="text-xs sm:text-sm font-bold">{errorMessage}</span>
          </div>
        )}

        {/* TAB 1: CREATE OR EDIT PRODUCT FORM (OPTIMIZED FOR MOBILE SCREENS) */}
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Form Column */}
            <div className="lg:col-span-8 bg-white p-4 sm:p-8 rounded-3xl border border-[#EAD8C0] shadow-xs">
              <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 sm:mb-6 border-b border-[#EAD8C0]">
                <div>
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-[#8B0000]">
                    {editingProduct 
                      ? (isAm ? `አልባሳትን ማስተካከል (${editingProduct.code})` : `Edit Attire (${editingProduct.code})`)
                      : (isAm ? 'አዲስ የሓበሻ አልባሳት መጨመር (Save to Database)' : 'Add New Attire (Save to Firebase)')}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-[#2D241E]/70 mt-0.5">
                    {isAm 
                      ? 'እዚህ የሚጨምሩት አልባሳት በቀጥታ በ Firebase Cloud Firestore ዳታቤዝ ላይ በቋሚነት ይቀመጣል።' 
                      : 'Every product you add will be immediately saved to Firebase Firestore for permanent access.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setActiveTab('inventory');
                  }}
                  className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* 1. Basic Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8B0000]">
                      1. {isAm ? 'የአልባሳት ስም እና መለያ' : 'Basic Identification'}
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono">
                      {formData.code}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2D241E] mb-1">
                        {isAm ? 'የአልባሳት ስም (በአማርኛ)' : 'Dress Name (Amharic)'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nameAm || ''}
                        onChange={(e) => setFormData((p) => ({ ...p, nameAm: e.target.value }))}
                        placeholder="ለምሳሌ፡ ሮያል ወርቃማ ጥልፍ የሰርግ ቀሚስ"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D241E] mb-1">
                        {isAm ? 'የአልባሳት ስም (በእንግሊዝኛ)' : 'Dress Name (English)'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nameEn || ''}
                        onChange={(e) => setFormData((p) => ({ ...p, nameEn: e.target.value }))}
                        placeholder="e.g. Royal Gold Embroidered Wedding Kemis"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2D241E] mb-1">
                        {isAm ? 'የአልባሳት ስም (በትግርኛ - ካለ)' : 'Dress Name (Tigrigna - Optional)'}
                      </label>
                      <input
                        type="text"
                        value={formData.nameTi || ''}
                        onChange={(e) => setFormData((p) => ({ ...p, nameTi: e.target.value }))}
                        placeholder="ንኣብነት፡ ሮያል ወርቃማ ጥልፊ ናይ መርዓ ቀሚሽ"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D241E] mb-1">
                        {isAm ? 'የእቃ ኮድ (Product Code)' : 'Product Code'}
                      </label>
                      <input
                        type="text"
                        value={formData.code || ''}
                        onChange={(e) => setFormData((p) => ({ ...p, code: e.target.value }))}
                        placeholder="AH-9821"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] font-mono text-[#2D241E]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Category & Group */}
                <div className="space-y-3 pt-3 border-t border-[#EAD8C0]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8B0000] block">
                    2. {isAm ? 'ምድብ እና የፍለጋ ታጎች' : 'Category & Hashtag Filtering'}
                  </span>

                  <div>
                    <label className="block text-xs font-bold text-[#2D241E] mb-1">
                      {isAm ? 'ዋና ምድብ (Category Group)' : 'Primary Category Group'}
                    </label>
                    <select
                      value={formData.categoryGroup || 'events'}
                      onChange={(e) => setFormData((p) => ({ ...p, categoryGroup: e.target.value as CategoryGroupId }))}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl text-[#2D241E] focus:outline-none focus:border-[#8B0000]"
                    >
                      <option value="events">{isAm ? '🎉 ለተለያዩ ዝግጅቶች (ሰርግ፣ መልስ፣ በዓላት፣ ልደት፣ ክርስትና)' : '🎉 Events & Ceremonies'}</option>
                      <option value="men_couples">{isAm ? '👑 የጥንዶችና የወንዶች አልባሳት' : '👑 Couples & Mens Attire'}</option>
                      <option value="heritage_fabrics">{isAm ? '✨ ባህላዊ ጨርቆች፣ የኣክሱም ፈትልና ሽፎን' : '✨ Heritage Fabrics & Silk Chiffon'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D241E] mb-1.5">
                      {isAm ? 'ተዛማጅ ታጎች (ለመምረጥ ይጫኑ)' : 'Select Relevant Tags:'}
                    </label>
                    <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-[#F9F4EC] rounded-xl border border-[#EAD8C0]">
                      {CATEGORIES.map((cat) => {
                        const isSelected = formData.hashtags?.includes(cat.tag);
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => handleToggleTag(cat.tag)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                              isSelected
                                ? 'bg-[#8B0000] text-white shadow-2xs'
                                : 'bg-white text-[#2D241E] border border-[#EAD8C0] hover:border-[#8B0000]'
                            }`}
                          >
                            {cat.tag}
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Tag Add */}
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="text"
                        value={customTagInput}
                        onChange={(e) => setCustomTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCustomTag();
                          }
                        }}
                        placeholder="#የአዲስ_ዓመት..."
                        className="flex-1 px-3 py-2 text-xs bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E]"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomTag}
                        className="px-3.5 py-2 bg-[#2D241E] text-white rounded-xl text-xs font-bold hover:bg-[#8B0000] transition-colors"
                      >
                        + {isAm ? 'ታግ' : 'Add'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Pricing & Turnaround */}
                <div className="space-y-3 pt-3 border-t border-[#EAD8C0]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8B0000] flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>3. {isAm ? 'ዋጋ እና የቀጠሮ ግዜ' : 'Pricing & Tailoring'}</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2D241E] mb-1">
                        {isAm ? 'የሽያጭ ዋጋ (ETB)' : 'Selling Price (ETB)'} *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={formData.priceETB || ''}
                        onChange={(e) => setFormData((p) => ({ ...p, priceETB: Number(e.target.value) }))}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] font-bold text-[#8B0000]"
                        placeholder="32000"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D241E] mb-1">
                        {isAm ? 'የነበረው ዋጋ (ETB - ለቅናሽ)' : 'Original Price (ETB)'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.originalPriceETB || ''}
                        onChange={(e) => setFormData((p) => ({ ...p, originalPriceETB: e.target.value ? Number(e.target.value) : undefined }))}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E]"
                        placeholder="36000"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D241E] mb-1">
                        {isAm ? 'የቀጠሮ ቀናት (Tailoring Days)' : 'Tailoring Days'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={formData.tailoringDays || 3}
                        onChange={(e) => setFormData((p) => ({ ...p, tailoringDays: Number(e.target.value) }))}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E]"
                        placeholder="3"
                      />
                    </div>
                  </div>

                  {/* Stock and Featured Toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                    <label className="flex items-center gap-2 p-2.5 bg-[#F9F4EC] rounded-xl cursor-pointer text-xs font-bold text-[#2D241E] border border-[#EAD8C0]">
                      <input
                        type="checkbox"
                        checked={formData.inStock ?? true}
                        onChange={(e) => setFormData((p) => ({ ...p, inStock: e.target.checked }))}
                        className="w-4 h-4 rounded text-[#8B0000] focus:ring-[#8B0000]"
                      />
                      <span>{isAm ? 'በሱቅ ውስጥ አለ (In Stock)' : 'In Stock'}</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 bg-[#F9F4EC] rounded-xl cursor-pointer text-xs font-bold text-[#2D241E] border border-[#EAD8C0]">
                      <input
                        type="checkbox"
                        checked={formData.featured ?? false}
                        onChange={(e) => setFormData((p) => ({ ...p, featured: e.target.checked }))}
                        className="w-4 h-4 rounded text-[#8B0000] focus:ring-[#8B0000]"
                      />
                      <span>{isAm ? 'ምርጥ አልባሳት (Featured)' : 'Featured Item'}</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 bg-[#F9F4EC] rounded-xl cursor-pointer text-xs font-bold text-[#2D241E] border border-[#EAD8C0]">
                      <input
                        type="checkbox"
                        checked={formData.bestSeller ?? false}
                        onChange={(e) => setFormData((p) => ({ ...p, bestSeller: e.target.checked }))}
                        className="w-4 h-4 rounded text-[#8B0000] focus:ring-[#8B0000]"
                      />
                      <span>{isAm ? 'ተወዳጅ (Best Seller)' : 'Best Seller'}</span>
                    </label>
                  </div>
                </div>

                {/* 4. Fabric Details */}
                <div className="space-y-3 pt-3 border-t border-[#EAD8C0]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8B0000] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>4. {isAm ? 'የጨርቅ አይነትና ጥራት' : 'Fabric Details'}</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2D241E] mb-1">
                        {isAm ? 'የጨርቅ አይነት (በአማርኛ)' : 'Fabric (Amharic)'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fabricAm || ''}
                        onChange={(e) => setFormData((p) => ({ ...p, fabricAm: e.target.value }))}
                        placeholder="የኣክሱም ፈትል ንጹህ ጥጥ ከነነጠላው"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D241E] mb-1">
                        {isAm ? 'የጨርቅ አይነት (በእንግሊዝኛ)' : 'Fabric (English)'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fabricEn || ''}
                        onChange={(e) => setFormData((p) => ({ ...p, fabricEn: e.target.value }))}
                        placeholder="Pure Handspun Axum Cotton with Netela"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E]"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Mobile Image Selection & Camera Upload */}
                <div className="space-y-3 pt-3 border-t border-[#EAD8C0]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8B0000] flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>5. {isAm ? 'የአልባሳት ፎቶ መምረጫ / ማስገቢያ' : 'Attire Photography'}</span>
                  </span>

                  {/* Direct Mobile Upload / Camera Button */}
                  <div className="bg-[#F9F4EC] p-3.5 rounded-2xl border border-dashed border-[#8B0000]/50">
                    <label className="block text-xs font-bold text-[#2D241E] mb-1.5">
                      {isAm ? 'ሀ. ከስልክ ካሜራ ፎቶ አንሱ ወይም ከጋለሪ ይምረጡ' : 'A. Take Photo with Camera or Pick from Gallery'}
                    </label>
                    <label className="flex items-center justify-center gap-2.5 py-3 px-4 bg-white hover:bg-[#EAD8C0]/30 border border-[#8B0000] rounded-xl cursor-pointer text-xs font-bold text-[#8B0000] transition-colors shadow-2xs">
                      <Upload className="w-4 h-4" />
                      <span>{isAm ? '📷 ፎቶ አንሳ / ፋይል ምረጥ' : '📷 Take Photo / Choose File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[10px] text-stone-500 mt-1 text-center">
                      {isAm ? 'ፎቶው ለፈጣን ኢንተርኔት በራስ-ሰር ይቀነሳል (Auto-optimized for mobile)' : 'Photo is automatically compressed for snappy mobile uploads'}
                    </p>
                  </div>

                  {/* Or Preset Photography */}
                  <div>
                    <label className="block text-xs font-bold text-[#2D241E] mb-2">
                      {isAm ? 'ለ. ወይም ከተዘጋጁት 11 እውነተኛ የሓበሻ ፎቶዎች አንዱን ይምረጡ፦' : 'B. Or Select an Authentic Habesha Preset Image:'}
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {IMAGE_PRESETS.map((preset) => {
                        const isSelected = formData.image === preset.image;
                        return (
                          <div
                            key={preset.id}
                            onClick={() => setFormData((p) => ({ ...p, image: preset.image }))}
                            className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all group relative aspect-3/4 ${
                              isSelected
                                ? 'border-[#8B0000] ring-2 ring-[#8B0000]/30 shadow-xs'
                                : 'border-[#EAD8C0] opacity-85 hover:opacity-100'
                            }`}
                          >
                            <img src={preset.image} alt={preset.nameEn} className="w-full h-full object-cover" />
                            {isSelected && (
                              <div className="absolute top-1 right-1 bg-[#8B0000] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                                ✓
                              </div>
                            )}
                            <div className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] sm:text-[9px] text-white p-0.5 text-center truncate">
                              {isAm ? preset.nameAm : preset.nameEn}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Or Web Image URL */}
                  <div>
                    <label className="block text-xs font-bold text-[#2D241E] mb-1">
                      {isAm ? 'ሐ. ወይም የፎቶ ሊንክ (Web Image URL) ያስገቡ' : 'C. Or Paste Web Image URL'}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={customImageUrl}
                        onChange={(e) => setCustomImageUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 px-3 py-2 text-xs bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E]"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCustomUrl}
                        className="px-3 py-2 bg-[#2D241E] text-white rounded-xl text-xs font-bold hover:bg-[#8B0000] transition-colors shrink-0"
                      >
                        {isAm ? 'ተግብር' : 'Apply'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 6. Description */}
                <div className="space-y-3 pt-3 border-t border-[#EAD8C0]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8B0000] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>6. {isAm ? 'መግለጫ (Description)' : 'Description'}</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2D241E] mb-1">
                        {isAm ? 'መግለጫ (በአማርኛ)' : 'Description (Amharic)'}
                      </label>
                      <textarea
                        rows={2}
                        value={formData.descriptionAm || ''}
                        onChange={(e) => setFormData((p) => ({ ...p, descriptionAm: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E]"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D241E] mb-1">
                        {isAm ? 'መግለጫ (በእንግሊዝኛ)' : 'Description (English)'}
                      </label>
                      <textarea
                        rows={2}
                        value={formData.descriptionEn || ''}
                        onChange={(e) => setFormData((p) => ({ ...p, descriptionEn: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E]"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#8B0000] hover:bg-[#6e0000] disabled:bg-stone-400 text-white text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{isAm ? 'Firebase ላይ በመመዝገብ ላይ...' : 'Saving to Database...'}</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>
                          {editingProduct 
                            ? (isAm ? 'ለውጦችን በ Firebase መዝግብ' : 'Save Changes to Firebase')
                            : (isAm ? 'አልባሳቱን በ Firebase መዝግብ' : 'Save Attire to Firebase')}
                        </span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setActiveTab('inventory');
                    }}
                    className="w-full sm:w-auto px-5 py-3 bg-white border border-[#EAD8C0] text-[#2D241E] hover:bg-[#F9F4EC] text-xs sm:text-sm font-bold rounded-xl transition-colors text-center"
                  >
                    {isAm ? 'ተው' : 'Cancel'}
                  </button>
                </div>

              </form>
            </div>

            {/* Live Preview Card Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="sticky top-20">
                <div className="text-xs font-bold text-[#8B0000] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>{isAm ? 'የቀጥታ ቅድመ-እይታ (Live Preview)' : 'Live Customer Preview'}</span>
                </div>

                <div className="bg-white rounded-2xl border border-[#EAD8C0] overflow-hidden shadow-xs max-w-sm mx-auto">
                  {/* Image */}
                  <div className="relative aspect-3/4 bg-[#F9F4EC]">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                        No Image Selected
                      </div>
                    )}
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {formData.originalPriceETB && formData.priceETB && formData.originalPriceETB > formData.priceETB && (
                        <span className="bg-[#8B0000] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                          {Math.round(((formData.originalPriceETB - formData.priceETB) / formData.originalPriceETB) * 100)}% {isAm ? 'ቅናሽ' : 'OFF'}
                        </span>
                      )}
                      {formData.featured && (
                        <span className="bg-[#C5A059] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>{isAm ? 'ምርጥ' : 'Featured'}</span>
                        </span>
                      )}
                    </div>

                    <div className="absolute top-2 right-2">
                      <span className="bg-black/60 backdrop-blur-xs text-white text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded">
                        {formData.code || 'AH-0000'}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-3 space-y-1.5">
                    <div className="flex flex-wrap gap-1">
                      {formData.hashtags?.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="text-[9px] text-[#8B0000] font-semibold bg-[#8B0000]/10 px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>

                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#2D241E] line-clamp-1">
                      {isAm ? formData.nameAm || 'የአልባሳት ስም' : formData.nameEn || 'Attire Name'}
                    </h4>

                    <p className="text-[10px] sm:text-[11px] text-[#2D241E]/70 line-clamp-1">
                      {formData.fabricAm || 'የኣክሱም ፈትል ጥጥ'}
                    </p>

                    <div className="flex items-baseline justify-between pt-1 border-t border-[#EAD8C0]">
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-[#8B0000]">
                          {(formData.priceETB || 0).toLocaleString()} ETB
                        </span>
                        {formData.originalPriceETB && formData.originalPriceETB > (formData.priceETB || 0) && (
                          <span className="text-[10px] text-stone-400 line-through ml-1.5">
                            {formData.originalPriceETB.toLocaleString()} ETB
                          </span>
                        )}
                      </div>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        formData.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {formData.inStock ? (isAm ? 'በክምችት አለ' : 'In Stock') : (isAm ? 'በትዕዛዝ' : 'Custom')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 p-3 rounded-2xl bg-[#F9F4EC] border border-[#EAD8C0] text-[11px] text-[#2D241E]/75">
                  <span className="font-bold text-[#8B0000] block mb-0.5">
                    🔥 Firebase Firestore:
                  </span>
                  {isAm 
                    ? 'አዲስ የተጨመሩ አልባሳት ወዲያውኑ በሁሉም ደንበኞች ስልክና ኮምፒውተር ላይ በቀጥታ ይታያሉ።'
                    : 'Every saved product syncs in real-time across all visitor devices and phones.'}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: INVENTORY LIST TABLE & MOBILE CARDS */}
        {activeTab === 'inventory' && (
          <div className="space-y-4 sm:space-y-6">
            
            {/* Inventory Controls */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#EAD8C0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                    placeholder={isAm ? 'በስም ወይም በኮድ ፈልግ...' : 'Search by name or code...'}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E]"
                  />
                  <Search className="w-3.5 h-3.5 text-[#8B0000]/60 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>

                <select
                  value={adminGroupFilter}
                  onChange={(e) => setAdminGroupFilter(e.target.value)}
                  className="text-xs py-2 px-3 bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl text-[#2D241E] focus:outline-none focus:border-[#8B0000]"
                >
                  <option value="all">{isAm ? 'ሁሉም ምድቦች' : 'All Groups'}</option>
                  <option value="events">{isAm ? 'ለተለያዩ ዝግጅቶች' : 'Events & Weddings'}</option>
                  <option value="men_couples">{isAm ? 'የጥንዶችና ወንዶች' : 'Couples & Men'}</option>
                  <option value="heritage_fabrics">{isAm ? 'ጨርቆችና ሽፎን' : 'Fabrics & Chiffon'}</option>
                </select>
              </div>

              <div className="flex items-center gap-2 justify-between sm:justify-end">
                <button
                  onClick={() => {
                    setActiveTab('create');
                    resetForm();
                  }}
                  className="flex-1 sm:flex-none px-4 py-2 bg-[#8B0000] hover:bg-[#6e0000] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAm ? 'አዲስ አልባሳት ጨምር' : 'Add New Attire'}</span>
                </button>

                {products.length > 0 && (
                  <button
                    onClick={async () => {
                      if (window.confirm(isAm ? 'ሁሉንም የተመዘገቡ አልባሳት ከ Firebase ዳታቤዝ ላይ ሙሉ በሙሉ ማጥፋት ይፈልጋሉ?' : 'Are you sure you want to completely clear all products from the Firebase database?')) {
                        await onResetCatalog();
                        setSuccessMessage(isAm ? 'ካታሎጉ ሙሉ በሙሉ ጸድቷል!' : 'Database cleared.');
                        setTimeout(() => setSuccessMessage(null), 2000);
                      }
                    }}
                    className="p-2 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-stone-200"
                    title="Clear database"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* EMPTY STATE */}
            {products.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#EAD8C0] p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs">
                <div className="w-16 h-16 rounded-full bg-[#F9F4EC] border border-[#EAD8C0] flex items-center justify-center mx-auto mb-4 text-[#8B0000]">
                  <Boxes className="w-8 h-8" />
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#2D241E] mb-2">
                  {isAm ? 'በካታሎጉ ውስጥ እስካሁን ምንም አልባሳት አልተጨመረም' : 'No Products in Database'}
                </h3>
                <p className="text-xs text-[#2D241E]/70 mb-6 leading-relaxed">
                  {isAm 
                    ? 'ሁሉም የ AI ናሙና አልባሳት ተሰርዘዋል። አሁን ከሞባይልዎ በቀላሉ ፎቶ በማንሳት እውነተኛ አልባሳትን ወደ Firebase ዳታቤዝ ማከል ይችላሉ።' 
                    : 'All artificial mock products have been cleared. Tap "Add New Attire" below to upload your real Habesha dresses directly into Firebase.'}
                </p>
                <button
                  onClick={() => {
                    setActiveTab('create');
                    resetForm();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B0000] hover:bg-[#6e0000] text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAm ? 'የመጀመሪያውን አልባሳት አሁን ይጨምሩ' : 'Add Your First Attire Now'}</span>
                </button>
              </div>
            ) : (
              <>
                {/* 1. Mobile Cards View (Visible on screens < md) */}
                <div className="block md:hidden space-y-3">
                  {filteredProducts.map((p) => (
                    <div key={p.id} className="bg-white p-3.5 rounded-2xl border border-[#EAD8C0] shadow-xs flex gap-3">
                      <div className="w-18 h-24 rounded-xl overflow-hidden border border-[#EAD8C0] bg-stone-100 shrink-0">
                        <img src={p.image} alt={p.nameEn} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[10px] font-mono font-bold text-[#8B0000] bg-[#8B0000]/10 px-1.5 py-0.2 rounded">
                              {p.code}
                            </span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                              p.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {p.inStock ? (isAm ? 'በክምችት አለ' : 'In Stock') : (isAm ? 'በትዕዛዝ' : 'Custom')}
                            </span>
                          </div>

                          <h4 className="font-bold text-xs text-[#2D241E] truncate">
                            {isAm ? p.nameAm : p.nameEn}
                          </h4>
                          <p className="text-[10px] text-[#2D241E]/60 truncate">
                            {isAm ? p.fabricAm : p.fabricEn}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[#EAD8C0]/60">
                          <span className="text-xs font-bold text-[#8B0000]">
                            {p.priceETB.toLocaleString()} ETB
                          </span>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleEditClick(p)}
                              className="p-1.5 text-stone-600 hover:text-[#8B0000] bg-[#F9F4EC] rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={async () => {
                                if (window.confirm(isAm ? `እርግጠኛ ኖት? "${p.nameAm}" ከ Firebase ዳታቤዝ ይሰረዝ?` : `Remove "${p.nameEn}" from Firebase?`)) {
                                  await onDeleteProduct(p.id);
                                  setSuccessMessage(isAm ? 'አልባሳቱ ተሰርዟል!' : 'Product removed from database.');
                                  setTimeout(() => setSuccessMessage(null), 1500);
                                }
                              }}
                              className="p-1.5 text-stone-400 hover:text-red-600 bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 2. Desktop Table View (Visible on screens >= md) */}
                <div className="hidden md:block bg-white rounded-2xl border border-[#EAD8C0] overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F9F4EC] border-b border-[#EAD8C0] text-[#2D241E] font-bold uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="py-3 px-4">{isAm ? 'ፎቶ' : 'Image'}</th>
                          <th className="py-3 px-4">{isAm ? 'ኮድ' : 'Code'}</th>
                          <th className="py-3 px-4">{isAm ? 'የአልባሳት ስም' : 'Dress Name'}</th>
                          <th className="py-3 px-4">{isAm ? 'ምድብ' : 'Group'}</th>
                          <th className="py-3 px-4">{isAm ? 'ዋጋ (ETB)' : 'Price (ETB)'}</th>
                          <th className="py-3 px-4">{isAm ? 'ሁኔታ' : 'Stock Status'}</th>
                          <th className="py-3 px-4 text-right">{isAm ? 'ድርጊት' : 'Actions'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EAD8C0]/60">
                        {filteredProducts.map((p) => (
                          <tr key={p.id} className="hover:bg-[#F9F4EC]/40 transition-colors">
                            <td className="py-2.5 px-4">
                              <div className="w-10 h-13 rounded-lg overflow-hidden border border-[#EAD8C0] bg-stone-100 shrink-0">
                                <img src={p.image} alt={p.nameEn} className="w-full h-full object-cover" />
                              </div>
                            </td>
                            <td className="py-2.5 px-4 font-mono font-bold text-[#8B0000]">
                              {p.code}
                            </td>
                            <td className="py-2.5 px-4">
                              <div className="font-bold text-[#2D241E] text-xs">
                                {isAm ? p.nameAm : p.nameEn}
                              </div>
                              <div className="text-[11px] text-[#2D241E]/60 truncate max-w-xs">
                                {isAm ? p.fabricAm : p.fabricEn}
                              </div>
                              <span className="inline-block mt-0.5 text-[9px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-semibold">
                                Firebase Synced
                              </span>
                            </td>
                            <td className="py-2.5 px-4">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F9F4EC] border border-[#EAD8C0] text-[#2D241E]">
                                {p.categoryGroup === 'events' ? '🎉 Events' : p.categoryGroup === 'men_couples' ? '👑 Couples/Men' : '✨ Fabrics'}
                              </span>
                            </td>
                            <td className="py-2.5 px-4 font-bold text-[#2D241E]">
                              {p.priceETB.toLocaleString()} ETB
                            </td>
                            <td className="py-2.5 px-4">
                              <button
                                onClick={async () => {
                                  await onUpdateProduct({ ...p, inStock: !p.inStock });
                                }}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                                  p.inStock
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                }`}
                                title="Click to toggle stock status"
                              >
                                {p.inStock ? (isAm ? 'በክምችት አለ' : 'In Stock') : (isAm ? 'በትዕዛዝ' : 'Made to Order')}
                              </button>
                            </td>
                            <td className="py-2.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleEditClick(p)}
                                  className="p-1.5 text-stone-600 hover:text-[#8B0000] hover:bg-stone-100 rounded-lg transition-colors"
                                  title="Edit product"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={async () => {
                                    if (window.confirm(isAm ? `እርግጠኛ ኖት? "${p.nameAm}" ከ Firebase ዳታቤዝ ይሰረዝ?` : `Are you sure you want to remove "${p.nameEn}" from database?`)) {
                                      await onDeleteProduct(p.id);
                                      setSuccessMessage(isAm ? 'አልባሳቱ ተሰርዟል!' : 'Product deleted.');
                                      setTimeout(() => setSuccessMessage(null), 1500);
                                    }
                                  }}
                                  className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete product"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
