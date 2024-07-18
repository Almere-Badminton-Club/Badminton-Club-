import axios from "axios";
import { apiUrl } from "../config/constants";

// Function to fetch bookings
export const fetchBookings = async (date) => {
  try {
    const formattedDate = date.toISOString().split("T")[0];
    const response = await axios.get(
      `${apiUrl}/bookings?date=${formattedDate}`,
      {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
    return response.data.bookings;
  } catch (error) {
    throw new Error("Error fetching bookings");
  }
};

// create bookings - post  call
export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${apiUrl}/bookings`, bookingData);
    return response.data.booking;
  } catch (error) {
    throw new Error("Error creating booking");
  }
};
