import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from '../components/Navbar/NavBar'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs'


export const MainLayout = () => {
  return (
  <>
  <NavBar />
  <Header />
 
  <Outlet />
  <Footer />
  </>
  )
}
