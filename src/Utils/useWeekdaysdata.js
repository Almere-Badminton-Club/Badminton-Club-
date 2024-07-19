const useWeekdaysdata = (date) => {
    return [
        {
          name: "Monday",
          date: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - date.getDay() + 1
          ),
          timing: "8.30-10pm",
        },
        {
          name: "Tuesday",
          date: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - date.getDay() + 2
          ),
          timing: "9-10.30pm",
        },
        {
          name: "Wednesday",
          date: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - date.getDay() + 3
          ),
          timing: "8.30-10pm",
        },
        {
          name: "Friday",
          date: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - date.getDay() + 5
          ),
          timing: "9.30-11pm",
        },
      ];
}


export default useWeekdaysdata;