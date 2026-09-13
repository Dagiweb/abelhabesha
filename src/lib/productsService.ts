import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  getDocs
} from 'firebase/firestore';
import { db } from './firebase';
import { Product } from '../types';

const PRODUCTS_COLLECTION = 'products';

/**
 * Subscribe to real-time updates from Firestore products collection.
 * Triggers onEveryUpdate callback with live Product array.
 */
export function subscribeToProducts(
  onUpdate: (products: Product[]) => void,
  onError?: (err: Error) => void
) {
  const productsRef = collection(db, PRODUCTS_COLLECTION);
  const q = query(productsRef);

  return onSnapshot(
    q,
    (snapshot) => {
      const prods: Product[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as Product;
        prods.push({
          ...data,
          id: docSnap.id
        });
      });
      onUpdate(prods);
    },
    (error) => {
      console.error('Firestore subscription error:', error);
      if (onError) onError(error);
    }
  );
}

/**
 * Save or update a product in Firestore.
 */
export async function saveProductToFirestore(product: Product): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, product.id);
  // Sanitize undefined fields for Firestore
  const cleanData = JSON.parse(JSON.stringify(product));
  await setDoc(docRef, cleanData, { merge: true });
}

/**
 * Update partial fields of a product in Firestore.
 */
export async function updateProductInFirestore(
  productId: string,
  partial: Partial<Product>
): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, productId);
  const cleanData = JSON.parse(JSON.stringify(partial));
  await updateDoc(docRef, cleanData);
}

/**
 * Delete a product from Firestore.
 */
export async function deleteProductFromFirestore(productId: string): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, productId);
  await deleteDoc(docRef);
}

/**
 * Remove all products from Firestore (clean slate).
 */
export async function clearAllProductsFromFirestore(): Promise<void> {
  const productsRef = collection(db, PRODUCTS_COLLECTION);
  const snapshot = await getDocs(productsRef);
  const deletePromises = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
  await Promise.all(deletePromises);
}
