//#Global Imports
import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
// import DatePicker from "react-datepicker";
import { enumerateDaysBetweenDates, bikeData } from "../../utils";

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
    <div className="w-full">
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
      <div className="flex items-center justify-center w-full lg:w-1/2 mx-auto my-12">
        <div className="gap-4 flex items-center flex-col w-full px-4 lg:px-0">
          {bikeData.map((bike) => (
            <div
              key={bike.id}
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center justify-between space-x-3 hover:border-indigo-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 w-full cursor-pointer"
            >
              <div className="flex items-center justify-between gap-8 w-full">
                <div className="flex items-center gap-8 md:gap-20">
                  <div className="focus:outline-none justify-start">
                    <p className="text-sm font-medium text-gray-900">
                      <span>
                        <strong>Modal: </strong>
                      </span>
                      {bike.modal}
                    </p>
                    <p className="text-sm font-medium text-gray-900 mt-2">
                      <span>
                        <strong>Color: </strong>
                      </span>
                      {bike.color}
                    </p>
                  </div>

                  <div className="focus:outline-none justify-end">
                    <p className="text-sm font-medium text-gray-900">
                      <span>
                        <strong>Location: </strong>
                      </span>{" "}
                      {bike.location}
                    </p>
                    <p className="text-sm font-medium text-gray-900 mt-2">
                      <span>
                        <strong>Rating: </strong>
                      </span>{" "}
                      {bike.rating}
                    </p>
                  </div>
                </div>

                <div className="focus:outline-none flex items-center">
                  <div className="text-sm font-medium text-gray-900 lg:mr-20">
                    Datepicker
                  </div>

                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
