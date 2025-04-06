import React from 'react'
import Navbarr from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Slider from '../components/Slider/Slider'
import Categories from '../components/Categories/Categories'

const Home = () => {
  return (
    <div className='home-page'>
        <Navbarr/>
        <Slider/>
        <Categories/>
        <Footer/>
    </div>
  )
}

export default Home
