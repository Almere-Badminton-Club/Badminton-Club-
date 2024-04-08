import React, { useEffect, useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import "../Styles/SeatBooking.css";
import axios from "axios";
import { AuthContext } from "../Context/auth.context";

const BookingTable = () => {
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookingId, setBookingId] = useState("");
  const [error, setError] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
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

  const generateObjectId = () => {
    const characters = "0123456789abcdef";
    let objectId = "";
    for (let i = 0; i < 24; i++) {
      objectId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return objectId;
  };

  const handleSeatSelect = (dayIndex, slotIndex) => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (!isLoggedIn) {
      console.log("User not logged in or user ID not available.");
      return;
    }

    // Generate a unique ObjectId-like value for seatId
    const seatId = generateObjectId();
    console.log("seatId:", seatId);

    // Check if the seat is available before making a booking
    if (bookedSeats[dayIndex] && bookedSeats[dayIndex][slotIndex]) {
      console.log("Seat is already booked.");
      return;
    }

    const requestBody = {
      userId: user.user._id,
      seatId,
      bookingDate: selectedDate.toISOString(),
    };
    console.log(requestBody);
    axios
      .post(`${import.meta.env.VITE_API_URL}/bookings`, requestBody)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          const updatedSeats = [...bookedSeats];
          updatedSeats[dayIndex] = updatedSeats[dayIndex] || [];
          updatedSeats[dayIndex][slotIndex] = true;
          setBookedSeats(updatedSeats);
          setBookingId(response.data.bookingId);
          console.log("Booking successful.");
        } else {
          console.error("Error booking seat. Status:", response.status);
          setError("Error booking seat. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error booking seat:", error);
        setError("Error booking seat. Please try again.");
      });
  };

  useEffect(() => {
    const initialBookedSeats = Array.from({ length: weekdays.length }, () =>
      Array(slots.length).fill(false)
    );
    setBookedSeats(initialBookedSeats);
  }, [selectedDate]); // Update booked seats when selected date changes

  const totalSeats = 20;
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const slots = ["08:00 PM", "09:00 PM", "10:00 PM"];

  return (
    <div className="seat-booking-container">
      <h1>Seat Booking</h1>
      <div className="date-picker-container">
        <h2>Select a Date</h2>
        <div className="date-navigation">
          <button onClick={handlePrevDay}>
            <BsArrowLeft />
          </button>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
          />
          <button onClick={handleNextDay}>
            <BsArrowRight />
          </button>
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
                    className={
                      bookedSeats[dayIndex] && bookedSeats[dayIndex][slotIndex]
                        ? "booked"
                        : "available"
                    }
                  >
                    {bookedSeats[dayIndex] && bookedSeats[dayIndex][slotIndex]
                      ? "Booked"
                      : "Available"}
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

export default BookingTable;
