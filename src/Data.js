import React, { useEffect, useState }  from 'react';
import { createClient } from '@supabase/supabase-js';

//database setup
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

function Data() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data, error } = await supabase
        .from('covid19_data')  // table name from Supabase
        .select('*'); //displays all rows and columns from database
        console.log('Supabase data:', data);
      if (error) {
        setError(error.message);
      } else {
        setData(data);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading data…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '2rem', backgroundColor: '#CAE9F5'}}>
      <h1>COVID-19 Data</h1>
      <p>This page displays global COVID-19 stats from 2020 to 2023 through a Supabase database.</p>
      <h1>COVID Data by Country and Year</h1>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Country</th>
            <th>Year</th>
            <th>Deaths</th>
            <th>Cases</th>
            <th>Death Percentage</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ country, the_year, deaths, cases, fatality_percentage_yearly }) => (
            <tr key={`${country}-${the_year}`}>
              <td>{country}</td>
              <td>{the_year}</td>
              <td>{deaths}</td>
              <td>{cases}</td>
              <td>{fatality_percentage_yearly}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Data;