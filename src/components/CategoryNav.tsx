import React, { useState, useRef } from 'react';
import { CATEGORIES, CATEGORY_GROUPS } from '../data/categories';
import { getTranslation } from '../data/translations';
import { Language, CategoryGroupId } from '../types';
import { Sparkles, Users, Scissors, Check, X, Layers, PartyPopper, ChevronLeft, ChevronRight, Grid } from 'lucide-react';

interface CategoryNavProps {
  language: Language;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  selectedGroup: CategoryGroupId;
  onSelectGroup: (group: CategoryGroupId) => void;
  productCountByTag: Record<string, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  language,
  selectedTag,
  onSelectTag,
  selectedGroup,
  onSelectGroup,
  productCountByTag,
}) => {
  const t = getTranslation(language);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const groupIcons: Record<string, any> = {
    all: Layers,
    events: PartyPopper,
    men_couples: Users,
    heritage_fabrics: Scissors,
  };

  const filteredCategories = CATEGORIES.filter(
    (cat) => selectedGroup === 'all' || cat.group === selectedGroup
  );

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };

  return (
    <div id="category-catalog" className="w-full bg-[#FDFCF8] rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-[#EAD8C0] shadow-xs mb-4 sm:mb-8">
      
      {/* Category Section Header - Compact on mobile */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 sm:pb-3 border-b border-[#EAD8C0]/80">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000] shrink-0">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-serif font-bold text-[#2D241E] leading-tight">
              {t.categoriesHeader}
            </h2>
            <p className="hidden sm:block text-xs text-[#2D241E]/75 mt-0.5">
              {t.categoriesSub}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Mobile view toggle (Horizontal rail vs Expand all) */}
          <button
            onClick={() => setMobileExpanded(!mobileExpanded)}
            className="sm:hidden flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EAD8C0] rounded-lg text-[11px] font-bold text-[#2D241E] hover:border-[#8B0000] transition-colors"
            title={mobileExpanded ? 'Collapse' : 'Expand all'}
          >
            <Grid className="w-3 h-3 text-[#8B0000]" />
            <span>{mobileExpanded ? t.collapseView : t.expandView}</span>
          </button>

          {selectedTag && (
            <button
              onClick={() => onSelectTag(null)}
              className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#F9F4EC] hover:bg-[#EAD8C0] text-[#8B0000] rounded-full text-[11px] sm:text-xs font-bold transition-colors border border-[#EAD8C0] shadow-2xs shrink-0"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{t.allCategories}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Category Groups (Horizontal Carousel on Mobile) */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-2 mb-2.5 -mx-1 px-1">
        {CATEGORY_GROUPS.map((tab) => {
          const isActive = selectedGroup === tab.id;
          const IconComponent = groupIcons[tab.id] || Sparkles;
          const groupName = language === 'ti' ? (tab.nameTi || tab.nameAm) : (language === 'am' ? tab.nameAm : tab.nameEn);

          return (
            <button
              key={tab.id}
              onClick={() => {
                onSelectGroup(tab.id as CategoryGroupId);
              }}
              className={`whitespace-nowrap px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? 'bg-[#8B0000] text-white shadow-xs ring-2 ring-[#8B0000]/20'
                  : 'bg-white border border-[#EAD8C0] text-[#2D241E] hover:border-[#8B0000] hover:bg-[#F9F4EC]'
              }`}
            >
              <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#8B0000]'}`} />
              <span>{groupName}</span>
            </button>
          );
        })}
      </div>

      {/* Subcategory Pills: Horizontally Scrollable on Mobile by default */}
      <div className="relative group/scroll">
        {/* Desktop scroll arrows for convenience */}
        <button
          onClick={scrollLeft}
          className="hidden sm:flex group-hover/scroll:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-[#EAD8C0] items-center justify-center text-[#2D241E] hover:text-[#8B0000] hover:bg-[#F9F4EC] shadow-md transition-opacity"
          aria-label="Scroll categories left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={scrollContainerRef}
          className={`${
            mobileExpanded
              ? 'flex flex-wrap gap-1.5 sm:gap-2'
              : 'flex sm:flex-wrap items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5 -mx-1 px-1'
          }`}
        >
          {/* "All" button */}
          <button
            onClick={() => onSelectTag(null)}
            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap min-h-[34px] sm:min-h-[38px] ${
              selectedTag === null
                ? 'bg-[#C5A059] text-white shadow-xs'
                : 'bg-white border border-[#EAD8C0] text-[#2D241E] hover:border-[#C5A059] hover:bg-[#F9F4EC]'
            }`}
          >
            {selectedTag === null && <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />}
            <span>{t.allCategories}</span>
          </button>

          {filteredCategories.map((cat) => {
            const isSelected = selectedTag === cat.tag;
            const count = productCountByTag[cat.tag] || 0;
            const categoryName = language === 'ti' ? (cat.nameTi || cat.nameAm) : (language === 'am' ? cat.nameAm : cat.nameEn);

            return (
              <button
                key={cat.id}
                onClick={() => onSelectTag(isSelected ? null : cat.tag)}
                className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 font-medium shrink-0 whitespace-nowrap min-h-[34px] sm:min-h-[38px] ${
                  isSelected
                    ? 'bg-[#8B0000] text-white font-bold shadow-xs ring-2 ring-[#8B0000]/20'
                    : 'bg-white border border-[#EAD8C0] text-[#2D241E] hover:border-[#8B0000] hover:bg-[#F9F4EC]'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3] text-white" />}
                <span>{categoryName}</span>
                
                {count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-white/25 text-white' : 'bg-[#F9F4EC] text-[#8B0000]'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={scrollRight}
          className="hidden sm:flex group-hover/scroll:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-[#EAD8C0] items-center justify-center text-[#2D241E] hover:text-[#8B0000] hover:bg-[#F9F4EC] shadow-md transition-opacity"
          aria-label="Scroll categories right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

