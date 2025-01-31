import React, { useState, useEffect } from 'react';
import { CountryBar } from '../components/CountryBar/CountryBar';
import { Title } from '../components/Title/Title';
import { Country } from '../components/Country/Country';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';

export const HotelsandDestinationsPage = () => {
 
  const [selectedCountry, setSelectedCountry] = useState(''); 
  const [countryData, setCountryData] = useState(); 
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 

  // Fetch country details when a country is selected
  useEffect(() => {
    if (!selectedCountry) return; 

    const fetchCountryData = async () => {
      setLoading(true);
      setError('');

      const url = `http://localhost:4000/destinations/${selectedCountry}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch country data');
        }

        const data = await response.json();
        setCountryData(data);
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchCountryData();
  }, [selectedCountry]);

  return (
    <div className="hotels-page">
      <CountryBar countrySelect={setSelectedCountry} />
      <Breadcrumbs />
      <Title title={`Vores hoteller i ${selectedCountry || "..."}`} />
      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Country Data */}
      {!loading && !error && countryData && 
      <Country countryData={countryData} />}
      
      {!loading && !error && !countryData && (
        <p style={{marginLeft:'5.5rem', marginBottom:'2rem'}}>Vælg et land for at se mere info.</p>
      )}
    </div>
  );
};