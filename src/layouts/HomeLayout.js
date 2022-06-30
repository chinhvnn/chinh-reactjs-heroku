import React from 'react'
import Header from '../component/partial/Header'
import Footer from '../component/partial/Footer'

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