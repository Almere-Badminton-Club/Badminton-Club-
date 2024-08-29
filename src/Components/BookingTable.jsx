// BookingTable.js
import React, { useEffect, useState, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { AuthContext } from "../Context/auth.context";
import { useNavigate } from "react-router-dom";
import "../Styles/BookingTable.css";
import { useBookingContext } from "../Context/BookingContext";
import calculateWeekdays from "../Utils/calculateWeekDays";
import { fetchMultipleDaysBookings } from "../Utils/bookingUtils"; // Import utility function
import { handlePrevWeek, handleNextWeek } from "../Utils/weekNavigation"; // Import navigation functions
import generateObjectId from "../Utils/generateObjectId";
import axios from "axios";

const BookingTable = () => {
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);
  const {
    bookedSeats,
    setBookedSeats,
    bookingId,
    setBookingId,
    error,
    setError,
    resetBookingState,
  } = useBookingContext();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();

  const weekdays = calculateWeekdays(selectedDate);
  const slots = Array.from({ length: 25 }, (_, index) =>
    index < 20 ? (index + 1).toString() : `W${index - 19}`
  );

  // Function to fetch bookings for multiple days
  const fetchAllBookings = async (startDate) => {
    const numberOfDays = 5; // Fetch bookings for 5 days
    try {
      const bookings = await fetchMultipleDaysBookings(startDate, numberOfDays);

      const updatedSeats = Array.from({ length: weekdays.length }, () =>
        Array(slots.length).fill(null)
      );

      bookings.forEach((booking) => {
        const {
          dayIndex,
          slotIndex,
          seatId,
          bookingId,
          userId,
          userName,
          bookingDate,
        } = booking;
        updatedSeats[dayIndex] = updatedSeats[dayIndex] || [];
        updatedSeats[dayIndex][slotIndex] = {
          seatId,
          bookingId,
          userId,
          userName,
          bookingDate,
        };
      });

      setBookedSeats(updatedSeats);
      console.log("Updated bookedSeats:", updatedSeats);
    } catch (error) {
      // console.error("Error fetching bookings:", error);
    }
  };

  // Fetch bookings on component mount and whenever isLoggedIn or selectedDate changes
  useEffect(() => {
    if (isLoggedIn) {
      fetchAllBookings(selectedDate);
    } 
  }, [isLoggedIn, selectedDate]);


  const handleSeatSelect = (dayIndex, slotIndex) => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (!isLoggedIn) {
      console.log("User not logged in or user ID not available.");
      setShowLoginPopup(true);
      return;
    }

    // Check if the user has already booked a slot on the same day
    for (let i = 0; i < bookedSeats[dayIndex].length; i++) {
      if (
        bookedSeats[dayIndex][i] &&
        bookedSeats[dayIndex][i].userId === user.user._id
      ) {
        setError("You can only book one slot per day.");
        return;
      }
    }

    // Generate a unique ObjectId-like value for seatId
    const seatId = generateObjectId();

    // Check if the seat is available before making a booking
    if (bookedSeats[dayIndex] && bookedSeats[dayIndex][slotIndex]) {
      console.log("Seat is already booked.");
      setError("Seat is already booked.");
      return;
    }

    // Function to get the booking date based on the dayIndex and the start of the week
    function getBookingDate(dayIndex, startDate) {
      if (dayIndex === 4) {
        dayIndex += 1;
      }

      const date = new Date(startDate);
      date.setDate(date.getDate() + dayIndex);

      if (date.getDay() === 4) {
        date.setDate(date.getDate() + 1);
      }
      console.log("Date:", date);
      return date;
    }

    const startDate = new Date(selectedDate);
    startDate.setDate(selectedDate.getDate() - selectedDate.getDay() + 1);

    const requestBody = {
      userId: user.user._id,
      seatId,
      bookingDate: getBookingDate(dayIndex, startDate).toISOString(),
      dayIndex,
      slotIndex,
      userName: user.user.name,
    };
    console.log("Request Body", requestBody);

    axios.post(`${import.meta.env.VITE_API_URL}/bookings`, requestBody)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          const updatedSeats = [...bookedSeats];
          updatedSeats[dayIndex] = updatedSeats[dayIndex] || [];
          updatedSeats[dayIndex][slotIndex] = {
            seatId,
            bookingId: response.data.booking.bookingId, // Update with correct booking ID
            userId: user.user._id, // Add user's ID to the booking information
            userName: user.user.name, // Add user's name to the booking information
            bookingDate: getBookingDate(dayIndex, startDate).toISOString(),
          };
          setBookedSeats(updatedSeats);
          console.log("Updated bookedSeats after booking:", updatedSeats);
          setBookingId(response.data.booking.bookingId); // Set booking ID from response
          console.log("Booking successful.");
          // alert("You have successfully booked your slot. Enjoy your game!")
          setError(null);

          const bookingDate =
            requestBody.bookingDate || new Date().toISOString().split("T")[0];
          fetchAllBookings(new Date(bookingDate)); // Fetch updated bookings after successful booking
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
      Array(slots.length).fill(null)
    );
    setBookedSeats(initialBookedSeats);
  }, [selectedDate]); 

  const totalSeats = 20;

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const currentWeekNumber = getWeekNumber(selectedDate);

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const chunkedSlots = chunkArray(slots, 4);

  return (
    <div className="seat-booking-container">
      <h1 className="fade-in-title">Reserve your Spot</h1>
      <div className="date-picker-container">
        <h2>Week Number: {currentWeekNumber}</h2>
        <div className="date-navigation">
          <button onClick={() => handlePrevWeek(selectedDate, setSelectedDate, setBookedSeats, setError, fetchAllBookings)}>
            <BsArrowLeft />
          </button>
          <button onClick={() => handleNextWeek(selectedDate, setSelectedDate, setBookedSeats, setError, fetchAllBookings)}>
            <BsArrowRight />
          </button>
        </div>
      </div>
      {showLoginPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Please Log In</h2>
            <p>You need to log in to book a slot.</p>
            <button onClick={() => setShowLoginPopup(false)}>Close</button>
          </div>
        </div>
      )}
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Close</button>
        </div>
      )}
      <div className="slots-container">
        <table>
          <thead>
            <tr>
              <th></th>
              {weekdays.map((day, index) => (
                <th key={index}>
                  {day.name} - {day.date.toLocaleDateString()} <br />
                  {day.timing}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chunkedSlots.map((chunk, chunkIndex) => (
              <React.Fragment key={chunkIndex}>
                {chunk.map((slot, slotIndex) => (
                  <tr key={slotIndex}>
                    <td>{slot}</td>
                    {weekdays.map((day, dayIndex) => (
                      <td
                        key={`${dayIndex}-${chunkIndex * 4 + slotIndex}`}
                        onClick={() =>
                          handleSeatSelect(dayIndex, chunkIndex * 4 + slotIndex)
                        }
                        className={
                          bookedSeats[dayIndex] &&
                          bookedSeats[dayIndex][chunkIndex * 4 + slotIndex]
                            ? "booked"
                            : "available"
                        }
                      >
                        {bookedSeats[dayIndex] &&
                        bookedSeats[dayIndex][chunkIndex * 4 + slotIndex]
                          ? bookedSeats[dayIndex][chunkIndex * 4 + slotIndex]
                              .userName // Display user's name
                          : "Available"}
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <form>
          <button type="submit">Book Slot</button>
        </form>
      </div>
    </div>
  );
};

export default BookingTable;
