// cancelBooking.js
export const handleCancelBooking = (
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
      const cancelConfirmation = window.confirm("Do you want to cancel your booking?");
      
      if (cancelConfirmation) {
          // Get the booking date and time
          const bookingDate = new Date(bookedSeats[dayIndex][slotIndex].bookingDate);
          const currentDate = new Date();

          // Check if the cancellation is within 2 hours of the booking time
          const timeDifference = bookingDate - currentDate;
          const hoursDifference = timeDifference / (1000 * 60 * 60);

          if (hoursDifference <= 2) {
              setError("You cannot cancel your booking less than 2 hours before the booked time.");
              return;
          }

          // Create a unique cancellation suffix
          const cancelSuffix = cancelQueue.filter(entry => entry.slotIndex === slotIndex).length + 1;
          const cancelId = `C${cancelSuffix}`;

          // Update the booking to indicate cancellation
          const updatedSeats = [...bookedSeats];
          updatedSeats[dayIndex][slotIndex] = {
              ...updatedSeats[dayIndex][slotIndex],
              seatId: cancelId,
              userName: `${user.user.name} ${cancelId}`
          };
          setBookedSeats(updatedSeats);

          // Add to cancelQueue
          const newCancelQueue = [...cancelQueue, { userName: user.user.name, slotIndex: slotIndex }];
          setCancelQueue(newCancelQueue);
          console.log("Updated cancel queue:", newCancelQueue);
      }
  } else {
      setError("You can only cancel your own booking.");
  }
};
