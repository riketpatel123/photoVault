import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Title = () => {
  const { currentUser, logout } = useAuth();
  return (
    <div className="title">
      <div className='header'>
        <h1>PhotoBooth</h1>
        <div className="header-controls">
          {currentUser && <p>Welcome, {currentUser.displayName || currentUser.email}</p>}
          {currentUser && (
            <button className="primaryButton" onClick={logout}>Log Out</button>
          )}
        </div>
      </div>
      <h2>Your Pictures</h2>
      <p>Live life take pictures relive memories repeat</p>
    </div>
  );
};

export default Title;