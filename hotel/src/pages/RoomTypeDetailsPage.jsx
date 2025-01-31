import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import style from '../style/RoomTypeDetails.module.scss'

export const RoomTypeDetailsPage = () => {
  const { roomTitle } = useParams(); 
  const [roomData, setRoomData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchRoomDetails = async () => {
      const url = `http://localhost:4000/destinations/danmark/aalborg/overlook-aalborg-city`; 
      try {
        const response = await fetch(url); 
        if (!response.ok) {
          throw new Error("Failed to fetch room details"); 
        }
        const data = await response.json();
        //filter rooms after Title 
        const room = data.cities[0].hotels[0].rooms.find(
          (room) => room.title === roomTitle 
        );
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

    fetchRoomDetails(); 
  }, [roomTitle]); 

  if (loading) return <p>Loading room details...</p>; 
  if (error) return <p style={{ color: "red" }}>{error}</p>; 

  return (
    <div className={style.roomDetails}>
      <Breadcrumbs />
      <h2 className={style.title}>{roomData.title}</h2> 
      <div className={style.imageContainer}>
      {roomData.images?.slice(0,2).map((image, index) => (
          <img
            key={index}
            src={`/images/${image.filename}`} 
            alt={image.title}
            className={style.img}
          />
        ))}
      </div>
      <p className={style.description}>{roomData.description}</p> 
      <p className={style.area}>{roomData.area}. Plads til {roomData.num_persons} personer.</p> 
      <p className={style.price}><strong>Price (Normal):</strong> {roomData.day_price_normal} DKK/night</p> 
      <p className={style.price}><strong>Price (Flex):</strong> {roomData.day_price_flex} DKK/night</p> 
    
    </div>
  );
};
