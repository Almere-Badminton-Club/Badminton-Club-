import axios from "axios";

export const handleCancelBooking = async (
  bookedSeats,
  setBookedSeats,
  user,
  dayIndex,
  slotIndex,
  setError,
  cancelQueue,
  setCancelQueue
) => {
  const booking = bookedSeats[dayIndex][slotIndex];

  // Check if the booking belongs to the current user
  if (booking && booking.userId === user.user._id) {
    const cancelConfirmation = window.confirm("Do you want to request to cancel your booking?");

    if (cancelConfirmation) {
      // Get the booking date and current time
      const bookingDate = new Date(booking.bookingDate);
      const currentDate = new Date();

     
      // Generate a unique cancellation ID for the queue
      const cancelQueueForDay = cancelQueue.filter(entry => entry.dayIndex === dayIndex);
      const cancelSuffix = cancelQueueForDay.length + 1;
      const cancelId = `C${cancelSuffix}`;
      console.log("BookingId:", booking.bookingId);

      try {
        // Make the API request to cancel the booking
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/bookings/${booking.bookingId}/cancel`,
          { isCanceled: true } // Payload indicating cancellation
        );

        if (response.status === 200) {
          // Update the booking status to canceled in the UI
          const updatedSeats = [...bookedSeats];
          updatedSeats[dayIndex][slotIndex] = {
            ...booking,
            isCanceled: true, // Mark as canceled
            userName: `${booking.userName} `, // Update name to indicate cancellation
          };
          setBookedSeats(updatedSeats);

          // Add the cancellation to the queue
          const newCancelQueue = [
            ...cancelQueue,
            { userName: booking.userName, slotIndex, dayIndex, cancelId },
          ];
          setCancelQueue(newCancelQueue);
          console.log("new cancel queue: ",newCancelQueue);

          // Clear any errors
          setError(null);
        } else {
          setError("Failed to cancel the booking. Please try again.");
        }
      } catch (error) {
        setError("An error occurred while processing your cancellation request.");
        console.error("Cancel booking error:", error);
      }
    }
  } else {
    setError("You cannot cancel a booking that is not yours.");
  }
};
