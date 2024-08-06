import axios from "axios";

// Helper function to get the Monday of the current week for a given date
const getMondayOfCurrentWeek = (date) => {
  const day = date.getDay();
  const diff = date.getDate() - (day === 0 ? 6 : day - 1); // Adjust when day is Sunday (0) to previous Monday
  const monday = new Date(date.setDate(diff));
  return new Date(monday.setHours(0, 0, 0, 0)); // Set time to the start of the day
};

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
  const mondayOfCurrentWeek = getMondayOfCurrentWeek(new Date(startDate));
  const daysToFetch = [ 1, 2, 3, 5]; // Offsets for Monday, Tuesday, Wednesday, and Friday
  const promises = [];

  for (let i = 0; i < numberOfDays && i < daysToFetch.length; i++) {
    const date = new Date(mondayOfCurrentWeek);
    date.setDate(mondayOfCurrentWeek.getDate() + daysToFetch[i]);
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
