import React from 'react';
import './Home.css'; 

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the COVID-19 Mapping App</h1>
      <p>This project was created to show yearly COVID-19 statistics for different countries around the world. 
        The database was previously used and cleaned by me for a SQL project. Therefore,  
        <strong> the data is not strictly up to date and covers the COVID-19 data range from January 4, 2020 to November 09, 2023. </strong>
        The <strong>original, updated and uncleaned </strong>data source can be accessed <a href="https://ourworldindata.org/grapher/cumulative-deaths-and-cases-covid-19?tab=table&time=earliest..latest" target="_blank" rel="noopener noreferrer">here</a>.
        The database I used can be accessed by clicking the "Data" button on the navigation menu above.</p>
      <p>This app uses the following APIs:</p>

      <div className="api-logos">
        <div className="api-logo">
        <a
            href="https://developers.google.com/maps/documentation"
            target="_blank"
            rel="noreferrer"
          >
          <img
            src="/googlemaps.png"
            alt="Google Maps API"
            height="120"
            width="120"
          />
          </a>
          <p>Google Maps API</p>
        </div>

        <div className="api-logo">
            <a
            href="https://www.bigdatacloud.com/geocoding-apis"
            target="_blank"
            rel="noreferrer"
          >
          <img
            src="/bdg.png"
            alt="BigDataCloud"
            height="120"
          />
          </a>
          <p>BigDataCloud API</p>
        </div>

        <div className="api-logo">
            <a
            href="https://restcountries.com/"
            target="_blank"
            rel="noreferrer"
          >
          <img
            src="/rest.png"
            alt="REST Countries API"
            height="120"
          />
          </a>
          <p>REST Countries API</p>
        </div>

        <div className="api-logo">
            <a
            href="https://ipapi.co/api/"
            target="_blank"
            rel="noreferrer"
          >
          <img
            src="/ipapi.png"
            alt="IP-API"
            height="60"
          />
          </a>
          <p>IP-API</p>
        </div>
      </div>
    </div>
  );
}

export default Home;