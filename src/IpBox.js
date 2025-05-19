// src/IpBox.js
import React, { useContext } from 'react';
import { UserLocationContext } from './UserLocation';

function IpBox() {
  const userLocation = useContext(UserLocationContext);

  return userLocation ? (
    <div className="ipapi-box" style={{ fontSize: '22px' }}>
      📍 <strong>{userLocation.city}</strong>, {userLocation.region}, {userLocation.country}
    </div>
  ) : null;
}

export default IpBox;