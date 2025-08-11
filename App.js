import React, { useState } from 'react';
import Footer from './comps/Footer';
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import { useAuth } from './contexts/AuthContext';
import SignUp from './comps/SignUp';
import Login from './comps/Login';

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const { currentUser } = useAuth();
  const [showLogin, setShowLogin] = useState(true);


  return (
    <div className="App">
      <Title />
      {currentUser ? (
        <>
          <UploadForm />
          <ImageGrid setSelectedImg={setSelectedImg} />
          {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
        </>
      ) : (
        <div className="auth-container">
          {showLogin ? (
            <>
              <Login />
              <p>
                Need an account?{' '}
                <button className="link-button" onClick={() => setShowLogin(false)}>
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              <SignUp />
              <p>
                Already have an account?{' '}
                <button className="link-button" onClick={() => setShowLogin(true)}>
                  Login
                </button>
              </p>
            </>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
