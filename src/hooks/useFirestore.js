import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) { // 3. Don't query if there's no user
      setDocs([]);
      return;
    }
    // Create a reference to the collection
    const collRef = collection(projectFirestore, collectionName);

    // Create a query against the collection, ordering by 'createdAt'
    const q = query(collRef, where('userId', '==', currentUser.uid), orderBy('createdAt', 'desc'));

    // Set up the real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const documents = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setDocs(documents);
    });

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();

  }, [collectionName, currentUser]);

  return { docs };
};

export default useFirestore;