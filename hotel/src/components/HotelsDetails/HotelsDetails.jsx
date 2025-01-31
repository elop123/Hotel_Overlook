import React from "react";
import style from "./HotelsDetails.module.scss";

export const HotelsDetails = ({ hotelData, hotel }) => {
  const rooms = hotelData?.rooms || []; 

  if (!hotelData) {
    return <p>Hotel details are not available.</p>;
  }

  if (!rooms || rooms.length === 0) {
    return <p>No rooms found in this hotel.</p>;
  }

  return (
    <div className={style.hotelDetailsContainer}>
      <h2 className={style.hotelTitle}>{hotel.title}</h2>
      <p className={style.hotelDescription}>{hotel.description}</p>

      <div className={style.roomsContainer}>
        {rooms.map((room) => (
          <div key={room.id} className={style.roomCard}>
            <img
              className={style.roomImage}
              src={`/images/${room.room_image_filename}`}
              alt={room.title}
            />
            <h3 className={style.roomTitle}>{room.title}</h3>
            <p> {room.slug}</p>
            <p> {room.description}</p>
            <p>{room.area} m²</p>
            <p>${room.day_price_normal}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
