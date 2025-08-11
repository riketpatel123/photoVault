import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import { useAuth } from '../contexts/AuthContext';

const UploadForm = () => {
  const { currentUser } = useAuth();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ['image/png', 'image/jpeg'];

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError(" ");
    } else {
      setFile(null);
      setError('Please select an image file (png or jpeg)');

    }
  };

  return (
    <>
      {currentUser ? ( // Conditionally render the form
        <form>
          <label className='file-label'>
            <input className='file-input' type="file" onChange={changeHandler} />
            <span>+</span>
          </label>
          <div className='output'>
            {error && <div className='error'>{error}</div>}
            {file && <div>{file.name}</div>}
            {file && <ProgressBar file={file} setFile={setFile} />}
          </div>
        </form>
      ) : (
        <p>Please log in to upload an image.</p>
      )}
    </>

  );
};

export default UploadForm;