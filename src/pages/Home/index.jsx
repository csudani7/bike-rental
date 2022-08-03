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
  // eslint-disable-next-line no-unused-vars
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
      <div className="flex items-center justify-center w-full mx-auto my-12 lg:w-1/2">
        <div className="flex flex-col items-center w-full gap-4 px-4 lg:px-0">
          {bikeData.map((bike) => (
            <div
              key={bike.id}
              className="relative flex items-center justify-between w-full px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:border-indigo-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div className="flex items-center justify-between w-full gap-8">
                <div className="flex items-center gap-8 md:gap-20">
                  <div className="justify-start focus:outline-none">
                    <p className="text-sm font-medium text-gray-900">
                      <span>
                        <strong>Modal: </strong>
                      </span>
                      {bike.modal}
                    </p>
                    <p className="mt-2 text-sm font-medium text-gray-900">
                      <span>
                        <strong>Color: </strong>
                      </span>
                      {bike.color}
                    </p>
                  </div>

                  <div className="justify-end focus:outline-none">
                    <p className="text-sm font-medium text-gray-900">
                      <span>
                        <strong>Location: </strong>
                      </span>{" "}
                      {bike.location}
                    </p>
                    <p className="mt-2 text-sm font-medium text-gray-900">
                      <span>
                        <strong>Rating: </strong>
                      </span>{" "}
                      {bike.rating}
                    </p>
                  </div>
                </div>

                <div className="flex items-center focus:outline-none">
                  <div className="text-sm font-medium text-gray-900 lg:mr-20">
                    Datepicker
                  </div>

                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
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
