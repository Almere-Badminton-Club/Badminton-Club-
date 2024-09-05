export const handleWaitingListReplacement = (
    bookedSeats,
    setBookedSeats,
    cancelQueue,
    setCancelQueue,
    waitingListUser,
    setError
  ) => {
    if (cancelQueue.length > 0 && waitingListUser) {
      const cancelSlot = cancelQueue[0]; // C1
      const slotIndex = cancelSlot.slotIndex;
  
      // Update the booking with W1's details
      const updatedSeats = [...bookedSeats];
      updatedSeats[cancelSlot.dayIndex][slotIndex] = {
        seatId: generateObjectId(),
        userId: waitingListUser.userId,
        userName: waitingListUser.userName,
      };
      setBookedSeats(updatedSeats);
  
      // Remove C1 from cancelQueue
      const newCancelQueue = cancelQueue.slice(1);
      setCancelQueue(newCancelQueue);
      console.log("Booking updated with W1's details:", updatedSeats);
      console.log("Updated cancel queue:", newCancelQueue);
    } else {
      setError("No cancellation available or waiting list is empty.");
    }
  };
  