import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./CityHotels.module.scss";

export const CityHotels = ({ hotels, countryData, citySlug }) => {
  const navigate = useNavigate();

  const handleHotelClick = (hotelSlug) => {
    navigate(`/hotels/${countryData}/${citySlug}/${hotelSlug}`);
  }; 

  if (!hotels || hotels.length === 0) {
    return <p>No hotels found in this city.</p>;
  }

 return (
    <div className={style.hotelsContainer}>
      {hotels.map((hotel) => (
        <div
          key={hotel.id}
          className={style.hotelCard}
          onClick={() => handleHotelClick(hotel.slug)} 
        >
          <img
            className={style.hotelImage}
            src={`/images/${hotel.HotelImage?.hotel_image_filename}`}
            alt={hotel.name}
          />
          <h3 className={style.hotelTitle}>{hotel.title}</h3>
          <p>{hotel.description}</p>
        </div>
      ))}
    </div>
  );
};