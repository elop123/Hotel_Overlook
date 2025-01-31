import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";
import { Title } from "../components/Title/Title";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import style from '../style/HoteRoomPage.module.scss'

export const HotelRoomPage = () => {
  const { countrySlug, citySlug, hotelSlug } = useParams();
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRooms, setExpandedRooms] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotelData = async () => {
      const url = `http://localhost:4000/destinations/${countrySlug}/${citySlug}/${hotelSlug}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch hotel data");
        }

        const data = await response.json();

        const hotel = data.cities[0]?.hotels.find((hotel) => hotel.slug === hotelSlug);
        if (!hotel) {
          throw new Error("Hotel not found");
        }

        setHotelData(hotel);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [countrySlug, citySlug, hotelSlug]);

  const toggleRoomDetails = (roomId) => {
    setExpandedRooms((prev) => ({
      ...prev,
      [roomId]: !prev[roomId],
    }));
  };

  if (loading) return <p>Loading hotel details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={style.hotelContainer}>
      <Breadcrumbs />
      <Title title={hotelData.title} />
      <p className={style.description}>
        {hotelData.description.slice(0, 125)}...
      </p>
      <h2 className={style.title}>Vores værelser</h2>
      <div className={style.hotelInfo}>
        {hotelData?.rooms && hotelData?.rooms.length > 0 ? (
          hotelData?.rooms.map((room) => (
            <div
              key={room.room_id}
              className={style.hotelSection}
              onClick={() =>
              navigate(`/hotels/${countrySlug}/${citySlug}/${hotelSlug}/${room.room_id}`)
              }
            >
              <img
                src={`/images/${room.images?.[0]?.filename}`}
                alt={room.title}
                className={style.hotelImg}
              />
              <div className={style.hotelDetail}>
                <h4 className={style.roomTitle}>{room.title}</h4>
                <p className={style.area}>{room.area}. Plads til {room.num_persons} personer.</p>
                <p className={style.text}>
                  Giv din ferie et ekstra pift ved at bo i vores smukke superior
                  plus-værelser. Nogle af værelserne har egen terrasse og udsigt
                  til havet.
                </p>
                <p className={style.price}>
                  <strong>FRA {room.day_price_normal},00 DKK</strong>
                </p>
                <button className={style.expandButton}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation
                    toggleRoomDetails(room.room_id);
                  }}
                >
                  {expandedRooms[room.room_id] ? (
                    <FiArrowUpCircle size={44} color="#555" />
                  ) : (
                    <FiArrowDownCircle size={44} color="#555" />
                  )}
                </button>
                
                {expandedRooms[room.room_id] && (
                  <div className={style.roomDetails}>
                    <p className={style.roomDescription}>{room.description}</p>
                    <p>
                      <strong>Faciliteter:</strong>
                    </p>
                    <ul className={style.facilitiesList}>
                    {hotelData?.hotel_facilities?.map((facility, index) => (
                      <li key={index} className={style.facility}>
                        {facility.title}
                      </li>
                    ))}
                  </ul>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No rooms available.</p>
        )}
      </div>
    </div>
  );
};

