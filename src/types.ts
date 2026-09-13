export type Language = 'am' | 'en' | 'ti';

export type ViewType = 'home' | 'products' | 'detail' | 'about' | 'contact' | 'admin' | 'catalog';

export type CategoryGroupId = 'all' | 'events' | 'men_couples' | 'heritage_fabrics';

export interface Category {
  id: string;
  tag: string;
  nameAm: string;
  nameEn: string;
  nameTi?: string;
  shortAm?: string;
  shortEn?: string;
  shortTi?: string;
  group: 'events' | 'men_couples' | 'heritage_fabrics';
  iconName?: string;
}

export type HashtagCategory = Category;

export interface Product {
  id: string;
  code: string;
  nameAm: string;
  nameEn: string;
  nameTi?: string;
  categoryGroup: 'events' | 'men_couples' | 'heritage_fabrics';
  hashtags: string[];
  fabricAm: string;
  fabricEn: string;
  fabricTi?: string;
  priceETB: number;
  originalPriceETB?: number;
  image: string;
  secondaryImages?: string[];
  descriptionAm: string;
  descriptionEn: string;
  descriptionTi?: string;
  inStock: boolean;
  tailoringDays: number; // በኣጭር ግዜ ቀጠሮ / ብሓጺር ግዜ ቆጸራ
  featured?: boolean;
  bestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  customMeasurements?: {
    bustChest?: string;
    waist?: string;
    hips?: string;
    length?: string;
  };
  quantity: number;
  notes?: string;
}
