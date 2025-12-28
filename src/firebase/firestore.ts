import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  QueryConstraint,
  DocumentData,
} from 'firebase/firestore';
import { db } from './config';

// Add a document to a collection
export const addDocument = <T extends DocumentData>(
  collectionName: string,
  data: T
) => {
  return addDoc(collection(db, collectionName), data);
};

// Get a single document by ID
export const getDocument = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

// Get all documents from a collection
export const getDocuments = async (
  collectionName: string,
  ...queryConstraints: QueryConstraint[]
) => {
  const q = query(collection(db, collectionName), ...queryConstraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Update a document
export const updateDocument = (
  collectionName: string,
  docId: string,
  data: Partial<DocumentData>
) => {
  const docRef = doc(db, collectionName, docId);
  return updateDoc(docRef, data);
};

// Delete a document
export const deleteDocument = (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId);
  return deleteDoc(docRef);
};

// Re-export query helpers
export { where, orderBy };
