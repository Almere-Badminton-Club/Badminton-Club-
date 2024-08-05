import axios from "axios";

export const fetchBookingsForDate = async (date) => {

  const formattedDate = date.toISOString().split("T")[0];
  console.log("fetching bookings for date:", formattedDate);

  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookings?date=${formattedDate}`, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    console.log("fetched Bookings", response.data);
    return response.data.bookings;
  } catch (error) {
    // console.error("Error fetching bookings:", error);
    throw new Error("Error fetching bookings. Please try again.");
  }
};

export const fetchMultipleDaysBookings = async (startDate, numberOfDays) => {
  const daysToFetch = [0, 1, 2, 4]; // Offsets for Monday, Tuesday, Wednesday, and Friday
  const promises = [];

  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + daysToFetch[i]);
    promises.push(fetchBookingsForDate(date));
  }

  try {
    const results = await Promise.all(promises);
    return results.flat(); // Flatten the array of arrays into a single array of bookings
  } catch (error) {
    // console.error("Error fetching multiple days bookings:", error);
    throw new Error("Error fetching bookings. Please try again.");
  }
};