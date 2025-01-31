import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Title } from "../components/Title/Title";
import { CityHotels } from "../components/CityHotels/CityHotels";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";


export const CityandHotelsPage = () => {
  const { countrySlug, citySlug } = useParams(); 
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCityData = async () => {
      const url = `http://localhost:4000/destinations/${countrySlug}/${citySlug}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch city data");
        }

        const data = await response.json();
        setCityData(data.cities[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [countrySlug, citySlug]);

  if (loading) return <p>Loading city data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const cityDescription = cityData?.cities;
  const hotels = cityData?.hotels || [];

  return (
    <div >
      <Breadcrumbs />
      <Title title={`Vores hoteller i ${cityData?.name}`} />
     <CityHotels hotels={hotels}
                 countryData={countrySlug}
                 citySlug={citySlug}/>
    </div>
  );
};
