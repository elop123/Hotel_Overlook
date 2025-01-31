import React from 'react'
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/hotel-overlook-logo.png'
import style from './NavBar.module.scss'

export const NavBar = () => {
  return (
   <nav className={style.navbar}>
    <NavLink to="/"><img src={logo}  className={style.logoStyle} alt="logoImg" /></NavLink>
    <ul className={style.navList}>
       <NavLink to="/"><li className={style.list}>FORSIDE</li></NavLink>
        <li className={style.line}>|</li>
        <NavLink to="/hotels"><li className={style.list}>HOTELLER&DESTINATIONER</li></NavLink>
        <li className={style.line}>|</li>
        <NavLink to="/room"><li className={style.list}>VÆRELSER</li></NavLink>
        <li className={style.line}>|</li>
        <NavLink to="/reservation"><li className={style.list}>RESERVATION</li></NavLink>
        <li className={style.line}>|</li>
        <NavLink to="/login"><li className={style.list}>LOGIN</li></NavLink>
    </ul>
   </nav>
  )
}
