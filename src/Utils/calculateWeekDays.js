 const calculateWeekDays = (date) => {
  const startDate = new Date(date);
  const day = startDate.getDay();
  const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
  startDate.setDate(diff);

  const days = [
    {
      name: "Monday",
      timing: "8:30 PM - 10:00 PM",
      dayIndex: 1
    },
    {
      name: "Tuesday",
      timing: "9:00 PM - 10:30 PM",
      dayIndex: 2
    },
    {
      name: "Wednesday",
      timing: "8:30 PM - 10:00 PM",
      dayIndex: 3
    },
    {
      name: "Friday",
      timing: "9.30 PM - 11:00 PM",
      dayIndex: 5
    },
  ]
  return days.map(day => {
    const currentDate = new Date(startDate);
    const currentDay = currentDate.getDay();
    const dayDifference = (day.dayIndex - currentDay + 7) % 7;
    currentDate.setDate(startDate.getDate() + dayDifference);
    return { ...day, date: currentDate };
  });
};


export default calculateWeekDays;