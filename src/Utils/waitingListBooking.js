import generateObjectId from "./generateObjectId";

export const handleWaitingListBooking = (bookedSeats, setBookedSeats, user, dayIndex, slotIndex, setError) => {
    const totalSeats = 20;
    const regularSlots = bookedSeats[dayIndex].slice(0, totalSeats);
    const allSlotsBooked = regularSlots.every(slot => slot !== null);
  
    if (allSlotsBooked) {
      // Allow booking for waiting list slot
      const seatId = generateObjectId(); // Assuming you have this utility
      if (!bookedSeats[dayIndex][slotIndex]) {
        const updatedSeats = [...bookedSeats];
        updatedSeats[dayIndex][slotIndex] = {
          seatId,
          userId: user.user._id,
          userName: user.user.name,
        };
        setBookedSeats(updatedSeats);
        console.log("Booked in waiting list:", updatedSeats);
      } else {
        setError("Waiting list slot is already booked.");
      }
    } else {
      window.confirm("Regular slots are still available. Please book a regular slot.");
    }
  };
  