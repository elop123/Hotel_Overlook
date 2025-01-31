import React from 'react'
import { useState, useEffect } from 'react';
import img1 from '../../../public/images/frankfurt-skyline-germany.jpg';
import img2 from '../../../public/images/seljalandvoss-iceland.jpg';
import img3 from '../../../public/images/harbour-gothenburg.jpg';
import img4 from '../../../public/images/overlook-grand-hotel.jpg';
import style from './Slider.module.scss'


export const Slider = () => {
    const imgArray = [img1, img2, img3, img4];
    const[currentIndex, setCurrentIndex] = useState(0)

    function nextIndex (){
        if(currentIndex === imgArray.length-1){
            setCurrentIndex(0);
        }else{
            setCurrentIndex(currentIndex+1)
        } 
    }
    function previousIndex(){
        if(currentIndex===0){
            setCurrentIndex(imgArray.length-1)
        }else{
            setCurrentIndex(currentIndex-1)
        }
    }
    useEffect(() => {
        const timeout = setInterval(() => {
          nextIndex();
        }, 5000);
      
        return () => clearInterval(timeout);
      }, [currentIndex]);

  return (
    <div className={style.slider}>
        <img src={imgArray[currentIndex]} alt="slider-img" 
        style={{ width: '100%', height: '400px', objectFit: 'cover', margin:'auto' }}/>
    </div>
    
  )
}
