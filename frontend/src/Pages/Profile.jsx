import React, { useState, useEffect } from 'react';
import './CSS/Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    username: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      // Handle when the user is not logged in
      return;
    }

    fetch('http://localhost:4000/webuser/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setUserData({
          name: data.user.name,
          email: data.user.email,
          contactNumber: data.user.contactNumber,
          address: data.user.address,
          username: data.user.username
        });
      } else {
        // Handle error
      }
    })
    .catch(error => console.error('Error:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('auth-token');
    if (!token) {
      // Handle when the user is not logged in
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/webuser/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (data.success) {
        setIsEditing(false);
        // Optionally, show a success message
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-header">Welcome, {userData.name}!</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-photo">
          {/* Display profile photo */}
        </div>
        <div className="profile-details">
          <label>
            Full Name:
            {isEditing ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className="profile-input"
              />
            ) : (
              <b className="profile-data">{userData.name}</b>
            )}
          </label>

          <label>
            Email:
            <b className="profile-data">{userData.email}</b>
          </label>

          <label>
            Contact Number:
            {isEditing ? (
              <input
                type="tel"
                value={userData.contactNumber}
                onChange={(e) => setUserData({ ...userData, contactNumber: e.target.value })}
                className="profile-input"
              />
            ) : (
              <b className="profile-data">{userData.contactNumber}</b>
            )}
          </label>

          <label>
            Address:
            {isEditing ? (
              <textarea
                value={userData.address}
                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                className="profile-input"
              />
            ) : (
              <b className="profile-data">{userData.address}</b>
            )}
          </label>

        
        </div>

        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="profile-btn">Edit Profile</button>
        )}
        {isEditing && (
          <button type="submit" className="profile-btn">Save Profile</button>
        )}

        <p>
          <i>
            Hello, {userData.name}! We are happy to see that you've enjoyed Rajarata Fire Service!
          </i>
        </p>
      </form>
    </div>
  );
}

export default Profile;
