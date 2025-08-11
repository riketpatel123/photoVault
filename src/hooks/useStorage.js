
import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { projectStorage, projectFirestore, serverTimestamp } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    // We only want to run this if we have a file and a user.
    if (!file || !currentUser) {
      return;
    }
    // Create a storage reference
    // Storing images in a user-specific folder is good practice
    const storageRef = ref(projectStorage, `${currentUser.uid}/${file.name}`);
    // Create a collection reference
    const collectionRef = collection(projectFirestore, 'images');

    const uploadTask = uploadBytesResumable(storageRef, file);

    const unsubscribe = uploadTask.on('state_changed',
      (snapshot) => {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const createdAt = serverTimestamp();
          // Add userId to the document
          await addDoc(collectionRef, { url: downloadURL, createdAt, userId: currentUser.uid });
          setUrl(downloadURL);
        } catch (e) {
          setError(e);
        }
      }
    );

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [file, currentUser]);

  return { progress, url, error };
};

export default useStorage;