//#Global Imports
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import db from "../../Firebase";
// import DatePicker from "react-datepicker";
import Bike from "./Bike";
import Moment from "moment";
import { extendMoment } from "moment-range";

//#Local Imports

const Home = () => {
  const moment = extendMoment(Moment);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [filterColor, setFilterColor] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterRating, setFilterRating] = useState(0);
  const [filterModal, setFilterModal] = useState("");
  const [bikeData, setBikeData] = useState([]);
  const [filterdBikeData, setFilteredBikeData] = useState([]);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  useEffect(() => {
    console.log(filterdBikeData, "filterdBikeData");
  }, [filterdBikeData]);

  const temp = (bike) => {
    return new Promise((resolve, reject) => {
      db.collection("trip")
        .where("bid", "==", bike.id)
        .where("isRideCompleted", "==", false)
        .onSnapshot((snapshot) => {
          let d = snapshot.docs.map((doc) => {
            let a = moment.range(
              startDate.toLocaleDateString(),
              endDate
                ? endDate.toLocaleDateString()
                : startDate.toLocaleDateString()
            );
            let b = moment.range(
              doc.data().start_date.toDate().toLocaleDateString(),
              doc.data().end_date.toDate().toLocaleDateString()
            );
            return a.overlaps(b, { adjacent: true });
          });

          if (d.every((element) => element === false)) {
            resolve(bike);
          } else {
            resolve(null);
          }
        });
    });
  };

  useEffect(() => {
    console.log(filterRating, filterLocation, filterColor, filterModal);
    var query = db.collection("bikes");
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
            bike.modalName.toLowerCase().includes(filterModal.toLowerCase())
          )
          .map((m) => temp(m))
      ).then((d) => {
        console.log(d);
        let x = d.filter((p) => p !== null);
        setFilteredBikeData(x);
      });
    });
  }, [
    filterRating,
    filterColor,
    filterLocation,
    filterModal,
    startDate,
    endDate,
  ]);
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="mt-1">
          <input
            value={filterModal}
            onChange={(e) => {
              setFilterModal(e.target.value);
            }}
            placeholder="Search by Modal Name"
            type="modal"
            name="modal"
            id="modal"
            className="block w-full px-3 py-2 border border-gray-900 rounded-md shadow-sm appearance-none focus:outline-none  sm:text-sm"
          />
        </div>
        <div className="flex space-x-4">
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            minDate={moment().toDate()}
            selectsRange
          />
          <div className="mt-1">
            <select
              id={"color"}
              name={"color"}
              className={
                "block w-40 px-4 py-2 text-gray-900 rounded-md shadow-sm "
              }
              value={filterColor}
              onChange={(v) => {
                setFilterColor(v.target.value);
              }}
            >
              <option></option>
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
              id={"location"}
              name={"location"}
              className={
                "block w-40 px-4 py-2 text-gray-900 rounded-md shadow-sm "
              }
              value={filterLocation}
              onChange={(v) => {
                setFilterLocation(v.target.value);
              }}
            >
              <option></option>
              <option>Suart</option>
              <option>Baroda</option>
              <option>Gandhinagar</option>
              <option>Ahemdabad</option>
            </select>
          </div>
          <div className="mt-1">
            <select
              id={"rating"}
              name={"rating"}
              className={
                "block w-40 px-4 py-2 text-gray-900 rounded-md shadow-sm "
              }
              value={filterRating}
              onChange={(v) => {
                setFilterRating(v.target.value);
              }}
            >
              <option></option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full lg:w-1/2 mx-auto my-12">
        <div className="gap-4 flex items-center flex-col w-full px-4 lg:px-0">
          {filterdBikeData.map((bike) => (
            <Bike data={bike} key={bike.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
