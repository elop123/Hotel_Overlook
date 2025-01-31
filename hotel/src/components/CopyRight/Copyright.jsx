import React from 'react'
import style from './Copyright.module.scss'

export const Copyright = ({copyright}) => {
   const currentYear=()=>{
    return new Date().getFullYear()
   } 

  return (
 <p className={style.copyright}>{copyright}</p>
  )
}
