import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./RoomsCard.module.scss";

export const RoomsCard = () => {
  const [rooms, setRooms] = useState([]);
  const [showRoom, setShowRoom] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const url = `http://localhost:4000/destinations/danmark/aalborg/overlook-aalborg-city`;

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        const roomsData = data.cities[0]?.hotels[0]?.rooms || [];
        if (roomsData.length === 0) {
          throw new Error("No rooms found");
        }
        setRooms(roomsData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={style.error}>{error}</p>;

  return (
    <section className={style.cardRoom}>
      {rooms.slice(0,3).map((room) => (
        <article
          key={room.room_id}
          className={style.roomItem}
          onMouseOver={() => setShowRoom(room.room_id)}
          onMouseOut={() => setShowRoom(null)}
          onClick={() => navigate(`/rooms/${room.title}`)} 
        >
          <img
            className={style.roomImg}
            src={`/images/${room.images?.[0]?.filename}`}
            alt={room.title}
          />
          <h2 className={style.title}>{room.title}</h2>
          {showRoom === room.room_id && <p className={style.desc}>{room.description}</p>}
        </article>
      ))}
    </section>
  );
};
