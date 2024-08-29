// Handle navigation to previous week
export const handlePrevWeek = (selectedDate, setSelectedDate, setBookedSeats, setError, fetchAllBookings) => {
    const prevWeek = new Date(selectedDate);
    prevWeek.setDate(selectedDate.getDate() - 7);
    setSelectedDate(prevWeek);
    setBookedSeats([]);
    setError(null);
    fetchAllBookings(prevWeek);
  };

  // Handle navigation to next week
  export const handleNextWeek = (selectedDate, setSelectedDate, setBookedSeats, setError, fetchAllBookings) => {
    const nextWeek = new Date(selectedDate);
    nextWeek.setDate(selectedDate.getDate() + 7);
    setSelectedDate(nextWeek);
    setBookedSeats([]);
    setError(null);
    fetchAllBookings(nextWeek);
  };
  