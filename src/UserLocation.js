// src/UserLocation.js
import React, { createContext, useEffect, useState } from 'react';

export const UserLocationContext = createContext(null);

export function UserLocationProvider({ children }) {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchUserLocation = async () => {
      const cachedLocation = localStorage.getItem('userLocation');

      if (cachedLocation) {
        setUserLocation(JSON.parse(cachedLocation));
        return; // Uses cached data to stop excessively calling the API after each reload(used during debugging)
      }

      try {
        const res = await fetch('https://ipapi.co/json/');
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error ${res.status}: ${errorText}`);
        }
        const data = await res.json();

        const location = {
          city: data.city,
          region: data.region,
          country: data.country_name,
        };

        localStorage.setItem('userLocation', JSON.stringify(location)); // Caches data
        setUserLocation(location);
      } catch (err) {
        console.error('Failed to fetch user location:', err.message);
      }
    };

    fetchUserLocation();
  }, []);

  return (
    <UserLocationContext.Provider value={userLocation}>
      {children}
    </UserLocationContext.Provider>
  );
}