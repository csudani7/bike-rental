//#Global Imports
import React from "react";
import Moment from "moment";
import DatePicker from "react-datepicker";
import { extendMoment } from "moment-range";

//#Local Imports
import db from "../../firebase";
import BikeCard from "./BikeCard";

const HomePage = () => {
  const moment = extendMoment(Moment);
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(null);
  const [filterColor, setFilterColor] = React.useState("");
  const [filterLocation, setFilterLocation] = React.useState("");
  const [filterRating, setFilterRating] = React.useState(0);
  const [filterBikeModal, setFilterBikeModal] = React.useState("");
  const [filteredBikeData, setFilteredBikeData] = React.useState([]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setSelectedStartDate(start);
    setSelectedEndDate(end);
  };

  const fetchBikesFromTrip = (bike) => {
    return new Promise((resolve) => {
      db.collection("trip")
        .where("bid", "==", bike.id)
        .where("isRideCompleted", "==", false)
        .onSnapshot((snapshot) => {
          let response = snapshot.docs.map((doc) => {
            let date_range_one = moment.range(
              selectedStartDate.toLocaleDateString(),
              selectedEndDate
                ? selectedEndDate.toLocaleDateString()
                : selectedStartDate.toLocaleDateString()
            );
            let date_range_two = moment.range(
              doc.data().start_date.toDate().toLocaleDateString(),
              doc.data().end_date.toDate().toLocaleDateString()
            );
            return date_range_one.overlaps(date_range_two, { adjacent: true });
          });
          if (response.every((item) => item === false)) {
            resolve(bike);
          } else {
            resolve(null);
          }
        });
    });
  };

  React.useEffect(() => {
    let query = db.collection("bikes");
    query = query.where("isBikeAvailable", "==", true);
    if (filterColor) {
      query = query.where("color", "==", filterColor);
    }
    if (filterLocation) {
      query = query.where("location", "==", filterLocation);
    }
    if (Number(filterRating) > 0) {
      query = query.where("rating", ">=", Number(filterRating));
    }
    query.onSnapshot((snapshot) => {
      Promise.all(
        snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((bike) =>
            bike.modalName.toLowerCase().includes(filterBikeModal.toLowerCase())
          )
          .map((item) => fetchBikesFromTrip(item))
      ).then((response) => {
        setFilteredBikeData(response.filter((item) => item !== null));
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterRating,
    filterColor,
    filterLocation,
    filterBikeModal,
    selectedStartDate,
    selectedEndDate,
  ]);

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="mt-1">
          <input
            id="modalName"
            name="modalName"
            type="text"
            placeholder="Search by Modal Name eg. Ducati"
            className="block w-full px-4 py-2.5 border border-gray-900 rounded-md shadow-sm appearance-none focus:outline-none  sm:text-sm"
            value={filterBikeModal}
            onChange={(e) => {
              setFilterBikeModal(e.target.value);
            }}
          />
        </div>
        <div className="flex space-x-4">
          <div>
            <DatePicker
              onChange={handleDateChange}
              startDate={selectedStartDate}
              endDate={selectedEndDate}
              minDate={moment().toDate()}
              selectsRange
              customInput={
                <input
                  className="block w-[240px] outline-none mt-1 border border-gray-900 px-4 py-2 text-gray-900 rounded-md shadow-sm"
                  value={`${selectedStartDate} - ${
                    selectedEndDate ? selectedEndDate : selectedStartDate
                  }`}
                />
              }
            />
          </div>
          <div className="mt-1">
            <select
              id="color"
              name="color"
              className={
                "block w-40 px-4 py-2 text-gray-900 rounded-md shadow-sm "
              }
              value={filterColor}
              onChange={(v) => {
                setFilterColor(v.target.value);
              }}
            >
              <option>Select Color</option>
              <option>Black</option>
              <option>Blue</option>
              <option>Red</option>
              <option>Gray</option>
              <option>Orange</option>
              <option>Yellow</option>
            </select>
          </div>
          <div className="mt-1">
            <select
              id="location"
              name="location"
              className={
                "block w-40 px-4 py-2 text-gray-900 rounded-md shadow-sm "
              }
              value={filterLocation}
              onChange={(v) => {
                setFilterLocation(v.target.value);
              }}
            >
              <option>Select Location</option>
              <option>Suart</option>
              <option>Baroda</option>
              <option>Gandhinagar</option>
              <option>Ahemdabad</option>
            </select>
          </div>
          <div className="mt-1">
            <select
              id="rating"
              name="rating"
              className={
                "block w-40 px-4 py-2 text-gray-900 rounded-md shadow-sm "
              }
              value={filterRating}
              onChange={(v) => {
                setFilterRating(v.target.value);
              }}
            >
              <option>Select Rating</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full mx-auto my-12 lg:w-1/2">
        <div className="flex flex-col items-center w-full gap-4 px-4 lg:px-0">
          {filteredBikeData.map((bikeData, index) => (
            <BikeCard bikeData={bikeData} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
