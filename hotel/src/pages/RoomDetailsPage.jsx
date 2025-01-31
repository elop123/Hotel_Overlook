import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import style from '../style/RoomDetailsPage.module.scss'


export const RoomDetailsPage = () => {
  const { countrySlug, citySlug, hotelSlug, roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomData = async () => {
      const url = `http://localhost:4000/destinations/${countrySlug}/${citySlug}/${hotelSlug}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch room data");
        }

        const data = await response.json();

        const hotel = data.cities[0]?.hotels.find((hotel) => hotel.slug === hotelSlug);
        if (!hotel) {
          throw new Error("Hotel not found");
        }

        const room = hotel.rooms.find((room) => room.room_id.toString() === roomId);
        if (!room) {
          throw new Error("Room not found");
        }

        setRoomData(room);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [countrySlug, citySlug, hotelSlug, roomId]);

  if (loading) return <p>Loading room details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={style.container}>
      <Breadcrumbs />
      <div className={style.card}>
        <div className={style.imageWrapper}>
          <img
            src={`/images/${roomData.images?.[0]?.filename}`}
            alt={roomData.title}
            className={style.image}
          />
        </div>
        <div className={style.content}>
          <h2 className={style.title}>{roomData.title}</h2>
          <p className={style.area}>{roomData.area} m². Plads til 3 personer.</p>
          <p className={style.description}>{roomData.description}</p>
          <p className={style.price}>
            <strong>Fra {roomData.day_price_normal} DKK</strong>
          </p>
          <div className={style.facilitySection}>
          <h3 className={style.facilitiesHeading}>Værelset er udstyret med:</h3>
          <ul className={style.facilitiesList}>
            {roomData?.room_facilities?.map((facility, index) => (
              <li key={index} className={style.facility}>
                {facility.title}
              </li>
            ))}
          </ul>
          </div>
          <div className={style.priceOptions}>
            <div className={style.priceBox}>
              <p className={style.priceOptionTitle}>NORMAL Pris inkl. morgenmad</p>
              <p className={style.priceOptionText}>Kan ikke ændres eller afbestilles</p>
              <p className={style.priceValue}>1318 DKK/nat</p>
              <button className={style.bookButton}>Book</button>
            </div>
            <div className={style.priceBox}>
              <p className={style.priceOptionTitle}>FLEX Pris inkl. morgenmad</p>
              <p className={style.priceOptionText}>Kan ændres eller afbestilles</p>
              <p className={style.priceValue}>1647 DKK/nat</p>
              <button className={style.bookButton}>Book</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

