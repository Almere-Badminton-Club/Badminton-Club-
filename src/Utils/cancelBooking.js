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
  if (bookedSeats[dayIndex][slotIndex] && bookedSeats[dayIndex][slotIndex].userId === user.user._id) {
    const cancelConfirmation = window.confirm("Do you want to request to cancel your booking?");

    if (cancelConfirmation) {
      // Get the booking date and time
      const bookingDate = new Date(bookedSeats[dayIndex][slotIndex].bookingDate);
      console.log(bookingDate);
      const currentDate = new Date();

      // Check if the cancellation is within 2 hours of the booking time
      const timeDifference = bookingDate - currentDate;
      const hoursDifference = timeDifference / (1000 * 60 * 60);

      if (hoursDifference <= 2) {
        setError("You cannot cancel your booking less than 2 hours before the booked time.");
        return;
      }




      // Filter the cancellation queue for the current day
      const cancelQueueForDay = cancelQueue.filter(entry => entry.dayIndex === dayIndex);
      const cancelSuffix = cancelQueueForDay.length + 1; // Reset suffix for each day
      const cancelId = `C${cancelSuffix}`;

      // Update the booking to indicate cancellation
      const updatedSeats = [...bookedSeats];
      updatedSeats[dayIndex][slotIndex] = {
        ...updatedSeats[dayIndex][slotIndex],
        seatId: cancelId,
        userName: `${user.user.name} ${cancelId}`
      };
      setBookedSeats(updatedSeats);

      // Add to cancelQueue, including the day index
      const newCancelQueue = [...cancelQueue, { userName: user.user.name, slotIndex: slotIndex, dayIndex }];
      setCancelQueue(newCancelQueue);

      // Make API request to save the cancellatiom request in the database
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/cancel`, {
          userId: user.user._id,
          dayIndex,
          slotIndex,
          cancelId
        });
        console.log("Cancellation Request has been saved succesfully.");
      } catch (error) {
        setError("An error occured while processing your cancellation request.");
      }
    }
  } else {
    setError("You can only cancel your own booking.");
  }
};
