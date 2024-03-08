import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'; // Import arrow icons from react-icons library
import '../Styles/SeatBooking.css'; // Import your CSS file
import axios from 'axios';

const SeatBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedSeats, setBookedSeats] = useState([]);
  const [userId, setUserId] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Reset booked seats when the date changes (you might fetch booked seats for the selected date here)
    setBookedSeats([]);
  };

  const handlePrevDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(selectedDate.getDate() - 1);
    setSelectedDate(prevDay);
    setBookedSeats([]);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    setSelectedDate(nextDay);
    setBookedSeats([]);
  };

  const handleSeatSelect = (dayIndex, slotIndex) => {
    const updatedSeats = [...bookedSeats];
    updatedSeats[dayIndex] = updatedSeats[dayIndex] || [];
    // Toggle booking status
    updatedSeats[dayIndex][slotIndex] = !updatedSeats[dayIndex][slotIndex];
    setBookedSeats(updatedSeats);

    // Make API call to book or cancel the seat
    const bookingDate = selectedDate.toISOString().split('T')[0]; // Convert selected date to yyyy-mm-dd format
    const seatId = `${dayIndex}-${slotIndex}`; // Generate a unique seat ID based on day and slot index
    if (updatedSeats[dayIndex][slotIndex]) {
      // If seat is booked, make API call to book the seat
      axios.post('http://localhost:5005/api/book', { userId, seatId, bookingDate })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      // If seat is canceled, make API call to cancel the seat
      axios.delete(`http://localhost:5005/api/cancel/${seatId}`)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const totalSeats = 20;

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const slots = ['08:00 PM', '09:00 PM', '10:00 PM'];

  const initialBookedSeats = Array.from({ length: weekdays.length }, () => Array(slots.length).fill(false));

  useState(() => {
    setBookedSeats(initialBookedSeats);
  }, []);

  return (
    <div className="seat-booking-container">
      <h1>Seat Booking</h1>
      <div className="date-picker-container">
        <h2>Select a Date</h2>
        <div className="date-navigation">
          <button onClick={handlePrevDay}><BsArrowLeft /></button> {/* Left arrow */}
          <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="dd/MM/yyyy" />
          <button onClick={handleNextDay}><BsArrowRight /></button> {/* Right arrow */}
        </div>
      </div>
      <div className="slots-container">
        <table>
          <thead>
            <tr>
              <th></th>
              {slots.map((slot, index) => (
                <th key={index}>{slot}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weekdays.map((day, dayIndex) => (
              <tr key={dayIndex}>
                <td>{day}</td>
                {slots.map((slot, slotIndex) => (
                  <td
                    key={slotIndex}
                    onClick={() => handleSeatSelect(dayIndex, slotIndex)}
                    className={bookedSeats[dayIndex] && bookedSeats[dayIndex][slotIndex] ? 'booked' : 'available'}
                  >
                    {bookedSeats[dayIndex] && bookedSeats[dayIndex][slotIndex] ? 'Booked' : 'Available'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeatBooking;
