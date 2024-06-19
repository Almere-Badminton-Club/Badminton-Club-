import React from 'react'
import BookingTable from '../Components/BookingTable';

const HomePage = () => {
  return (
    <>
    <h1 className='color-change-title '>Welcome to Smashers Connect Club</h1>
    <img className="image" src="https://cdn.pixabay.com/photo/2016/05/31/23/21/badminton-1428047_640.jpg" alt="badminton" />
    
     <BookingTable/>
     </>
  )
}

export default HomePage;