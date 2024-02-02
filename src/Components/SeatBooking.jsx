// SeatBooking.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Styles/SeatBooking.css'; // Import your CSS file

const SeatBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedSeats, setBookedSeats] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Reset booked seats when the date changes (you might fetch booked seats for the selected date here)
    setBookedSeats([]);
  };

  const handleSeatSelect = (seatIndex) => {
    // Toggle seat booking status
    const updatedSeats = [...bookedSeats];
    updatedSeats[seatIndex] = !updatedSeats[seatIndex];
    setBookedSeats(updatedSeats);
  };

  // Mock data for the number of seats available (you can replace this with your actual data)
  const totalSeats = 20;

  return (
    <div className="seat-booking-container">
      <h1>Seat Booking</h1>
      <div className="date-picker-container">
        <h2>Select a Date</h2>
        <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="dd/MM/yyyy" />
      </div>
      <div className="seats-container">
        <h2>Available Seats for {selectedDate.toDateString()}</h2>
        <ul>
          {[...Array(totalSeats)].map((_, index) => (
            <li
              key={index}
              onClick={() => handleSeatSelect(index)}
              className={bookedSeats[index] ? 'booked' : 'available'}
            >
              {bookedSeats[index] ? 'Booked' : 'Available'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SeatBooking;

