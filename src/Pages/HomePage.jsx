import React from 'react'
import BookingTable from '../Components/BookingTable';
import CarouselComponent from '../Components/CarouselComponent';

const HomePage = () => {
  return (
    <>
    <h1 className='color-change-title '>Welcome to Smashers Connect Club</h1>
    <CarouselComponent/>
    <BookingTable/>
     </>
  )
}

export default HomePage;

