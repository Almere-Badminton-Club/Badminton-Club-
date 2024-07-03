import React, { useEffect, useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import axios from "axios";
import { AuthContext } from "../Context/auth.context";
import { useNavigate } from "react-router-dom";
import "../Styles/BookingTable.css";

const BookingTable = () => {
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookingId, setBookingId] = useState("");
  const [error, setError] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setBookedSeats([]);
    setError(null); // Clear any previous error messages
  };

  const handlePrevDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(selectedDate.getDate() - 1);
    setSelectedDate(prevDay);
    setBookedSeats([]);
    setError(null); // Clear any previous error messages
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    setSelectedDate(nextDay);
    setBookedSeats([]);
    setError(null); // Clear any previous error messages
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

    const requestBody = {
      userId: user.user._id,
      seatId,
      bookingDate: new Date().toISOString(),
      dayIndex,
      slotIndex
    };
    console.log("Request Body", requestBody);

    axios
      .post(`${import.meta.env.VITE_API_URL}/bookings`, requestBody)
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
          };
          setBookedSeats(updatedSeats);
          setBookingId(response.data.booking.bookingId); // Set booking ID from response
          console.log("Booking successful.");
          setError(null); // Clear any previous error messages
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
  }, [selectedDate]); // Update booked seats when selected date changes

  const totalSeats = 20;
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const regularSlots = Array.from({ length: 20 }, (_, index) =>
    (index + 1).toString()
  );
  const waitingListSlots = Array.from(
    { length: 5 },
    (_, index) => `W${index + 1}`
  );
  const slots = [...regularSlots, ...waitingListSlots];

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
              {weekdays.map((day, index) => (
                <th key={index}>{day}</th>
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
    </div>
  );
};

export default BookingTable;
