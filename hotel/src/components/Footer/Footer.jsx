import React from 'react'
import { Copyright } from '../CopyRight/Copyright'
import {FaFacebook, FaTwitterSquare} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import style from './Footer.module.scss'

export const Footer = () => {
  return (
   <footer className={style.footerStyle}>
    <Copyright copyright={"© 2021 Hotel Overlook.Alle rettigheder forbeholdt"} style={{marginLeft:'4rem'}}/>
    <div className={style.iconSection}>
    <FaTwitterSquare className={style.icon} />
    <FaFacebook  className={style.icon} /> 
    </div>
    <div className={style.navFooter}>
        <ul className={style.lists}>
            <Link to="/"><li>Forside</li></Link>
            <Link to="/hotels"><li>Hoteller&Destinationer</li></Link>
            <Link to="/rooms"><li>Værelser</li></Link>
            <Link to="/reservation"><li>Reservation</li></Link>
            <Link to="/login"><li>Login</li></Link>
        </ul>
    </div>
   </footer>
  )
}
