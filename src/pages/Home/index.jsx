//#Global Imports
import React from "react";
import Moment from "moment";
import DatePicker from "react-datepicker";
import { extendMoment } from "moment-range";

//#Local Imports
import db from "../../firebse";
import Bike from "./Bike";

const Home = () => {
  const moment = extendMoment(Moment);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(null);
  const [filterColor, setFilterColor] = React.useState("");
  const [filterLocation, setFilterLocation] = React.useState("");
  const [filterRating, setFilterRating] = React.useState(0);
  const [filterModal, setFilterModal] = React.useState("");
  const [filterdBikeData, setFilteredBikeData] = React.useState([]);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

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

  React.useEffect(() => {
    var query = db.collection("bikes");
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
            bike.modalName.toLowerCase().includes(filterModal.toLowerCase())
          )
          .map((m) => temp(m))
      ).then((d) => {
        setFilteredBikeData(d.filter((p) => p !== null));
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            className="block w-full px-4 py-2.5 border border-gray-900 rounded-md shadow-sm appearance-none focus:outline-none  sm:text-sm"
          />
        </div>
        <div className="flex space-x-4">
          <div>
            <DatePicker
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              minDate={moment().toDate()}
              selectsRange
              customInput={
                <input
                  className="block w-[240px] outline-none mt-1 border border-gray-900 px-4 py-2 text-gray-900 rounded-md shadow-sm"
                  value={`${startDate} - ${endDate ? endDate : startDate}`}
                />
              }
            />
          </div>
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
      <div className="flex items-center justify-center w-full mx-auto my-12 lg:w-1/2">
        <div className="flex flex-col items-center w-full gap-4 px-4 lg:px-0">
          {filterdBikeData.map((bike, index) => (
            <Bike data={bike} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
