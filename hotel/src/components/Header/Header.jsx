import React from 'react'
import headerImg from '../../assets/img/frankfurt-skyline-germany.jpg'
import style from './Header.module.scss'
import { Slider } from '../Slider/Slider'


export const Header = () => {
  return (
   <header className={style.headerStyle}>
    <Slider />
    <h2 className={style.title}>Velkommen til Hotel Overlook Online<span className={style.redLine}></span></h2>
   </header>
  )
}
