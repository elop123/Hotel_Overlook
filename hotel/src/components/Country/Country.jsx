import React from "react";
import { useNavigate } from "react-router-dom";
import style from './Country.module.scss'

export const Country = ({ countryData}) => {
    const navigate = useNavigate();
    
  if (!countryData) {
    return <p style={{marginLeft:'-1rem'}}>Vælg et land for at se mere info.</p>;
  }
  const handleCityClick = (citySlug) => {
    navigate(`/hotels/${countryData.slug}/${citySlug}`);
  };

  return (
    <article className={style.countryDetails}>
          <p className={style.countryDescription}>{countryData.cities.description}</p>
          <div  key={countryData.id} className={style.citiesContainer}>
            {countryData.cities?.length > 0 ? (
              countryData.cities.map((city) => (
                <div className={style.cityCard} key={city.id}
                onClick={() => handleCityClick(city.slug)}>
                   <img
                    src={`/images/${city.CityImage?.city_image_filename}`}
                    alt={city.CityImage?.city_image_title}
                    className={style.cityImage}></img>
                  <h3 className={style.cityName}>{city.name}</h3>
                  <p className={style.cityDescription}>{city.description}</p>
                </div>
              ))
            ) : (
              <p>Ingen byer fundet.</p>
            )}
          </div>
          <div className={style.rightColumn}></div>
        </article>
  );
};
