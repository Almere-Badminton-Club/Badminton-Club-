const calculateWeekDays = (date) => {
  const startDate = new Date(date);
  const day = startDate.getDay();
  const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
  startDate.setDate(diff);

  const days = [
    {
      name: "Monday",
      timing: "8.30-10pm",
      dayIndex: 1
    },
    {
      name: "Tuesday",
      timing: "9-10.30pm",
      dayIndex: 2
    },
    {
      name: "Wednesday",
      timing: "8.30-10pm",
      dayIndex: 3
    },
    {
      name: "Friday",
      timing: "9.30-11pm",
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