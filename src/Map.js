import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import { createClient } from '@supabase/supabase-js';
import './App.css';

// supabase API keys/setup
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// map styling
const containerStyle = { width: '100vw', height: '70vh' };
const center = { lat: 0, lng: 0 };
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

export default function Map() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [worldTotals, setWorldTotals] = useState(null);  // ← ADDED
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: GOOGLE_MAPS_API_KEY });
  const mapRef = useRef(null);
  const onMapLoad = useCallback(map => (mapRef.current = map), []);


//checks if user has selected year
  useEffect(() => {
    if (!selectedYear) {
      setWorldTotals(null);
      return;
    }

    //gets World/Cumulative data based on user's year selection from dropdown menu
    supabase
      .from('covid19_data')
      .select('deaths, cases')
      .eq('country', 'World')
      .eq('the_year', selectedYear)
      .single()
      .then(({ data, error }) => {
        if (error && error.code !== 'PGRST116') console.error(error);
        else setWorldTotals(data);
      });
  }, [selectedYear]);

  // reverse-geocoding from long/lat coordinates to get country name, flag, currency
  const fetchLocality = async (lat, lng) => {
    const geoRes = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    const geo = await geoRes.json();
    let countryName = geo.countryName?.trim() || geo.continent || 'Unknown';
    countryName = countryName.replace(/\s*\(the\)$/i, '');

    const countryRes = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`
    );
    const countryData = await countryRes.json();
    const country = Array.isArray(countryData) ? countryData[0] : {};

    return {
      location: `${geo.locality || ''}, ${geo.principalSubdivision || ''}, ${countryName}`,
      flag: country.flags?.png || null,
      currency: country.currencies
        ? Object.values(country.currencies)[0]
        : null,
      countryName
    };
  };

  const handleMapClick = async event => {
    if (!selectedYear) {
      alert('Please select a year first.');
      return;
    }

    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    // revises different country names from Bigdatacloud API to match database country names search
    const { location, flag, currency, countryName } = await fetchLocality(lat, lng);

    const countryMap = {
      'Iran (Islamic Republic of)': 'Iran',
      'United States of America': 'United States',
      'Russian Federation': 'Russia',
      'Turkiye': 'Turkey'
    };

    const lookupCountry =
      countryMap[countryName] ?? countryName;
    // database search for that country & year after year is selected
    const { data, error } = await supabase
      .from('covid19_data')
      .select('deaths, cases')
      .eq('country', lookupCountry)
      .eq('the_year', selectedYear)
      .single();
    console.log('+++++++++++++++Searching for:' + countryName + selectedYear);

    if (error && error.code !== 'PGRST116') {
      console.error('Supabase fetch error:', error);
    }

    // creates google map marker and info
    const newMarker = {
      lat,
      lng,
      location,
      flag,
      currency,
      year: selectedYear,
      deaths: data?.deaths ?? 'N/A',
      cases: data?.cases ?? 'N/A'
    };

    setMarkers(prev => [...prev, newMarker]);
    setSelectedMarker(newMarker);
  };

  const handleRemoveMarker = () => {
    setMarkers(prev =>
      prev.filter(m =>
        m.lat !== selectedMarker.lat || m.lng !== selectedMarker.lng
      )
    );
    setSelectedMarker(null);
  };

  if (!isLoaded) return <div>Loading Map…</div>;


  return (
    <div className="map-container">
      <div style={{ padding: '2rem', backgroundColor: '#CAE9F5' }}>
        <div
          className="year-dropdown"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <button className="year-dropdown__button">
            {selectedYear ? `Year: ${selectedYear}` : 'Select Year'}
            <i
              className="year-dropdown__arrow"
              style={{ transform: open ? 'rotate(-135deg)' : undefined }}
            />
          </button>

          <ul
            className={
              open
                ? 'year-dropdown__menu year-dropdown__menu--visible'
                : 'year-dropdown__menu'
            }
          >
            {[2020, 2021, 2022, 2023].map((y) => (
              <li
                key={y}
                className="year-dropdown__item"
                onClick={() => {
                  setSelectedYear(y);
                  setOpen(false);
                }}
              >
                {y}
              </li>
            ))}
          </ul>
        </div>

        {selectedYear && (
          <div style={{ marginTop: '1rem' }}>
            <p>
              You selected: <strong>{selectedYear}</strong>
            </p>
            {worldTotals && (
              <p>
                <i>Global totals for {selectedYear}:</i>
                <br />
                Deaths: {worldTotals.deaths}, Cases: {worldTotals.cases}
                <br />
                <h3>Click anywhere/scroll into the map to create a marker and display COVID-19 stats of that country</h3>
              </p>
            )}
          </div>
        )}

        <div className="inner-map">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={2}
            onClick={handleMapClick}
            onLoad={onMapLoad}
          >
            {markers.map((m, idx) => (
              <Marker
                key={idx}
                position={{ lat: m.lat, lng: m.lng }}
                onClick={() => setSelectedMarker(m)}
              />
            ))}
            
            {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div>
                  <strong>Location:</strong> {selectedMarker.location}
                  <br />
                  <strong>Year:</strong> {selectedMarker.year}
                  <br />
                  <strong>Deaths(based on country):</strong> {selectedMarker.deaths}
                  <br />
                  <strong>Cases(based on country):</strong> {selectedMarker.cases}
                  <br />
                  {selectedMarker.flag && (
                    <div style={{ marginTop: 8 }}>
                      <img src={selectedMarker.flag} alt="Flag" width={50} />
                    </div>
                  )}
                  {selectedMarker.currency && (
                    <div style={{ marginTop: 8 }}>
                      <strong>Currency:</strong>{' '}
                      {selectedMarker.currency.name} (
                      {selectedMarker.currency.symbol})
                    </div>
                  )}
                  <br />
                  <button onClick={handleRemoveMarker}>Remove Marker</button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}