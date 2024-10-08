import axios from "axios";

export const handleCancelBooking = async (
  bookedSeats,
  setBookedSeats,
  user,
  dayIndex,
  slotIndex,
  setError,
  cancelQueue,
  setCancelQueue) => {
  const booking = bookedSeats[dayIndex][slotIndex];

  if (booking && booking.userId === user.user._id) {
    const cancelConfirmation = window.confirm("Do you want to request to cancel your booking?");


    if (cancelConfirmation) {
      // Generate a unique cancellation ID for the queue
      const cancelQueueForDay = cancelQueue.filter(entry => entry.dayIndex === dayIndex);
      const cancelSuffix = cancelQueueForDay.length + 1;
      const cancelId = `C${cancelSuffix}`;
      console.log("BookingId:", booking.bookingId);

      try {
        // Update the booking document with a new cancelRequest
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/bookings/${booking.bookingId}/cancel`, {
          isCanceled: true,
          cancelRequest: {
            cancelId,
            isCanceled: true
          },
          userName: `${booking.userName} ${cancelId}`
        });

        if (response.status === 200) {
          const updatedSeats = [...bookedSeats];
          updatedSeats[dayIndex][slotIndex] = {
            ...booking,
            isCanceled: true,
            userName: `${booking.userName} ${cancelId}`

          };
          setBookedSeats(updatedSeats);
          console.log(updatedSeats);

          // Add the cancellation to the queue
          const newCancelQueue = [...cancelQueue, { cancelId, dayIndex, slotIndex }];
          setCancelQueue(newCancelQueue);
          setError(null);
        } else {
          setError("Failed to cancel booking. Please try again.");
        }
      } catch (error) {
        setError("An error occurred while processing your cancellation request.");
      }
    }
  }
};
