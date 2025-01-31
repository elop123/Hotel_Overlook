import React from 'react'
import style from './Title.module.scss'

export const Title = ({title}) => {
  return (
    <h3 className={style.title}>{title}</h3>
  )
}
