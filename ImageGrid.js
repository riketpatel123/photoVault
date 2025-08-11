import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import { projectStorage, projectFirestore } from '../firebase/config';
import { ref, deleteObject } from 'firebase/storage';
import { doc, deleteDoc } from 'firebase/firestore';

const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore('images');

  const handleDelete = async (e, docId, url) => {
    e.stopPropagation(); // This stops the modal from opening when the delete button is clicked.

    const documentRef = doc(projectFirestore, 'images', docId);
    const storageRef = ref(projectStorage, url);

    try {
      // Delete the document from Firestore first.
      await deleteDoc(documentRef);
      // Then, delete the file from Storage.
      await deleteObject(storageRef);
    } catch (err) {
      console.error("Error deleting image: ", err);
      // Here you could add some user-facing error handling, like a toast notification.
    }
  };

  return (
    <div className="img-grid">
      {docs && docs.map(doc => (
        <motion.div className="img-wrap" key={doc.id}
          layout
          whileHover={{ opacity: 1 }}
          onClick={() => setSelectedImg(doc.url)}
        >
          <motion.img src={doc.url} alt="uploaded pic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
          <button className="delete-button" onClick={(e) => handleDelete(e, doc.id, doc.url)}>
            &times;
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGrid;