import { Product } from '../types';

// Authentic Handcrafted Ethiopian Traditional Attire Images
import imgWedding from '../assets/images/ethiopian_wedding_kemis_1788732209665.jpg';
import imgCouple from '../assets/images/ethiopian_couple_attire_1788732224471.jpg';
import imgMeles from '../assets/images/ethiopian_meles_dress_1788732239682.jpg';
import imgAshenda from '../assets/images/ethiopian_ashenda_dress_1788732253732.jpg';
import imgMens from '../assets/images/ethiopian_mens_attire_1788732266539.jpg';
import imgGondar from '../assets/images/ethiopian_gondar_dress_1788732285990.jpg';
import imgChiffon from '../assets/images/ethiopian_chiffon_kemis_1788732300464.jpg';
import imgRaya from '../assets/images/ethiopian_raya_kemis_1788732912052.jpg';
import imgCoffee from '../assets/images/ethiopian_coffee_kemis_1788732926566.jpg';
import imgAxum from '../assets/images/ethiopian_axum_kemis_1788732944239.jpg';
import imgSaba from '../assets/images/ethiopian_saba_kemis_1788732960404.jpg';

export {
  imgWedding,
  imgCouple,
  imgMeles,
  imgAshenda,
  imgMens,
  imgGondar,
  imgChiffon,
  imgRaya,
  imgCoffee,
  imgAxum,
  imgSaba
};

export interface ImagePreset {
  id: string;
  nameAm: string;
  nameEn: string;
  image: string;
}

export const IMAGE_PRESETS: ImagePreset[] = [
  { id: 'wedding', nameAm: 'የሰርግ ሓበሻ ቀሚስ', nameEn: 'Wedding Habesha Kemis', image: imgWedding },
  { id: 'meles', nameAm: 'የመልስ ሮያል ቀሚስ', nameEn: 'Royal Meles Traditional Dress', image: imgMeles },
  { id: 'couple', nameAm: 'የጥንዶች አልባሳት', nameEn: 'Matching Couple Set', image: imgCouple },
  { id: 'mens', nameAm: 'የወንዶች ባህላዊ ልብስ', nameEn: "Men's Cultural Attire", image: imgMens },
  { id: 'chiffon', nameAm: 'ዘመናዊ የሽፎን ቀሚስ', nameEn: 'Modern Chiffon Kemis', image: imgChiffon },
  { id: 'raya', nameAm: 'የራያ ቆቦ ቀሚስ', nameEn: 'Raya Kobo Cultural Kemis', image: imgRaya },
  { id: 'gondar', nameAm: 'የጎንደር ዙፋን ቀሚስ', nameEn: 'Gondar Heritage Royal Kemis', image: imgGondar },
  { id: 'coffee', nameAm: 'የቡና ቁርስ ቀሚስ', nameEn: 'Coffee Ceremony Kemis', image: imgCoffee },
  { id: 'axum', nameAm: 'የኣክሱም ፈትል ቀሚስ', nameEn: 'Axum Pure Handspun Fetel', image: imgAxum },
  { id: 'saba', nameAm: 'የሳባ ጨርቅ ቀሚስ', nameEn: 'Saba Heritage Kemis', image: imgSaba },
  { id: 'ashenda', nameAm: 'የኣሸንዳ ባህላዊ ቀሚስ', nameEn: 'Ashenda Cultural Kemis', image: imgAshenda },
];

/**
 * Clean catalog by default with 0 mock products.
 * Real products added via Admin will be stored permanently in Firebase Firestore.
 */
export const PRODUCTS: Product[] = [];
