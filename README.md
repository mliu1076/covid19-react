## **COVID-19 Map Project**
This project was created to show yearly statistics for different countries around the world. The database was previously used and cleaned by me for a SQL project. Therefore, the data is not strictly up to date and covers COVID-19 data from January 4, 2020 to November 09, 2023. 
The original, updated and uncleaned data source: https://ourworldindata.org/grapher/cumulative-deaths-and-cases-covid-19?tab=table&time=earliest..latest

Jump to the [Developer Manual](#developer-manual)

**Target Browsers and Platforms**

This application is designed exclusively for desktop use. While this application render on mobile devices, the layout and interactive features may not be fully optimized for mobile devices.  

**SPECIAL NOTE: ANY CORS BROWSER EXTENSION(S) WILL INTERFERE WITH THE GOOGLE MAP API, DO NOT USE THEM WHILE RUNNING THIS APPLICATION.**  

**Supported Desktop Browsers**  
Browser	Version  
Google Chrome	- Latest version  
Mozilla Firefox	- Latest version  
Microsoft Edge	- Latest version  
Safari - Latest version  

Note: Mobile browsers are not officially supported and may produce layout or interaction issues.

Proper browser usage is necessary so that the application runs smoothly and to ensure all parts(including the Google Map interface) have proper screen space and display values.

## **Getting Started**
Clone this repository using:
```bash
git clone
```
To load a local react server to host this code, use:
```bash
npm start
```


## **Developer Manual**
Developer Manual: COVID-19 Web Application

This document provides step-by-step instructions for installing and running the COVID-19 Web Application, including setting up dependencies, environment variables, and running the local development server.  
  
Project Overview  

This application displays yearly global COVID-19 statistics(2020-2023) using:

    React for the front-end

    Google Maps API for geographic interaction

    BigDataCloud API for reverse geocoding

    REST Countries API for country metadata

    IP-API for geolocating the visiting user's IP address

    Supabase to display and find values in database

Prerequisites

Before you begin, ensure you have the following installed on your development machine:

    Node.js (version ≥ 14)

    npm 

    Git

## **Installation Steps**
1. Clone the Repository using:

```bash
git clone
```

2. Install Dependencies

Install all project dependencies(APIs and routing) using npm:
```bash
npm install react-router-dom  
npm install @react-google-maps/api  
npm install @supabase/supabase-js  
```

3. Set Up Environment Variables

Create a .env file in the root directory of the project:
```bash
touch .env  
```
Then add your Google Maps API and Supabase Keys to the file:
```bash
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key  
REACT_APP_SUPABASE_URL=your_url  
REACT_APP_SUPABASE_KEY =your_api_key  
```
Reminder: environment variables in React must start with REACT_APP_.

4. Run the Development Server

Start the React development server:
```bash
npm start  
```
The app will be available at:
http://localhost:3000

5. APIs used
As mentioned before, only 2 of the 4 used APIs need to be installed as project dependencies through npm.

External APIs Used

    Google Maps JavaScript API (Project Dependency)

    BigDataCloud Reverse Geocoding API

    REST Countries API

    ipapi.co

    Supabase API (Project Dependency)

    All of these APIs use GET endpoints. Supabase gets specific COVID-19 data from the database based on user input (year and country). BigDataCloud API interprets the longitude and latitude coordinates from the user-placed Google Map Marker and
    translates it to a location. REST Countries API fetches the flag and currency details of that location's country. IP-API fetches the visting users geolocation and displays it in the bottom left-hand corner of the browser in a box.

    Ensure you stay within each API's rate limits when testing out code(I recommend caching data).

There are no tests written for this application. You are free to use can use console.log to check for proper API output and usage though.



## **Bugs**
Due to using multiple APIs to determine location details, there are conflicting data points and some special interpretations for countries. One special interpretation I used is that there is no "country" value for Antarctica from using the BigDataCloud API, but the continent is listed as "Antarctica", so I check for that value if no country is given when a map marker is placed on Antarctica. 

As mentioned previously, there are also conflicting data points between the database and the resulting country from the API. Some examples are that "Russian Federation" API result is listed as "Russia" in the database and "Turkiye" is listed as "Turkey". 

I have not tested enough to see if cases like this have all been covered for all countries. 

Future development of this app may involve analyzing COVID-19 monthly rather than yearly, and to use up-to-date COVID-19 databases. The Google Map Marker class used in this project has also been deprecated, and the AdvancedMarkerElement class may have to replace that element instead.

Back to [top](#covid-19-map-project)