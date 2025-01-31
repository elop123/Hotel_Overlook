import React from 'react'
import { Title } from '../components/Title/Title'
import { NewsCard } from '../components/NewsCard/NewsCard'
import { RoomsCard } from '../components/RoomsCard/RoomsCard'

export const HomePage = () => {
  return (
   
    <>
    <Title title="Sidste nyt" />
    <NewsCard />
    <Title title="Se vores udvagte værelser" />
    <RoomsCard />
    </>
  )
}
