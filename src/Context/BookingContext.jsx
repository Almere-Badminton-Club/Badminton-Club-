import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookingId, setBookingId] = useState("");
  const [error, setError] = useState(null);

  const resetBookingState = () => {
    setBookedSeats([]);
    setBookingId("");
    setError(null);
  };

  return (
    <BookingContext.Provider
      value={{
        bookedSeats,
        setBookedSeats,
        bookingId,
        setBookingId,
        error,
        setError,
        resetBookingState,
      }}
    >
      {" "}
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => useContext(BookingContext);
