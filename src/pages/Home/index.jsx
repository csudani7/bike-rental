//#Global Imports
import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
import { enumerateDaysBetweenDates } from "../../utils";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

//#Local Imports

const Home = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [value, setValue] = useState([]);
  const dt = enumerateDaysBetweenDates("08/03/2022", "08/08/2022");
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  useEffect(() => {
    console.log(value.map((v) => console.log(v.toString())));
  }, [startDate, endDate, value]);
  return (
    <div>
      Welcome to Home Page
      <DatePicker
        multiple
        value={value}
        format="MM/DD/YYYY"
        onChange={setValue}
        plugins={[<DatePanel sort="date" />]}
        mapDays={({ date }) => {
          let isWeekend = dt.includes(date.toString());

          if (isWeekend)
            return {
              disabled: true,
              style: { color: "#ccc" },
            };
        }}
      />
      ;
      {/* <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        excludeDates={enumerateDaysBetweenDates("08/02/2022","08/06/2022")}
        selectsRange
        inline
      /> */}
    </div>
  );
};

export default Home;
