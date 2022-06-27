import React from 'react'
import Header from '../component/fragment/Header'
import Footer from '../component/fragment/Footer'
import CitiesSlider from '../component/fragment/Slider'

const HomeLayout = (props) => {
  return (
    <>
    <Header />
      {props.children}
    <Footer/>
    </>
  )
}

export default HomeLayout