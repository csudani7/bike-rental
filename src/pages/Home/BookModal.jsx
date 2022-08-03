import React, { useContext, useEffect, useState } from "react";
import db from "../../Firebase";
import { enumerateDaysBetweenDates } from "../../utils";
import DatePicker from "react-datepicker";
import moment from "moment";
import { ApplicationProcessContext } from "../../Context";
function BookModal(props) {
  const [trip, setTrip] = useState([]);
  const [value, setValue] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [disabledDate, setDisabledDate] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { user } = useContext(ApplicationProcessContext);
  useEffect(() => {
    db.collection("trip")
      .where("bid", "==", props.data.id)
      .where("isRideCompleted", "==", false)
      .onSnapshot((snapshot) =>
        setTrip(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      );

    // db.collection("trip")
    //   .where("bid", "in", [props.data.id, "KGLl0DsnXI3ne1fQUvCZ"])
    //   .where("isRideCompleted", "==", false)
    //   .onSnapshot((snapshot) =>
    //     console.log(
    //       snapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         ...doc.data(),
    //       }))
    //     )
    //   );
  }, []);
  useEffect(() => {
    let reservedDate = [];
    trip.forEach((t) => {
      reservedDate = [
        ...reservedDate,
        ...enumerateDaysBetweenDates(
          t.start_date.toDate(),
          t.end_date.toDate()
        ),
      ];
    });
    // console.log(reservedDate);
    setDisabledDate(reservedDate);
  }, [trip]);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    // let intersectionDate = dateToString(
    //   enumerateDaysBetweenDates(start, end)
    // ).filter((element) => dateToString(disabledDate).includes(element));
    // // console.log(moment("08/04/2022") >= moment("08/08/2022"));
    let startDisabledDate = trip.map((t) => t.start_date.toDate());
    let co = startDisabledDate
      .map(
        (p) =>
          moment(p) >= moment(start) && moment(p) <= moment(end ? end : start)
      )
      .every((element) => element === false);
    setIsButtonDisabled(co);
  };
  const bookTrip = () => {
    db.collection("trip")
      .add({
        bid: props.data.id,
        uid: user.uid,
        start_date: startDate,
        end_date: endDate,
        rating: 0,
        isRideCompleted: false,
      })
      .then(() => props.closeModal(false));
  };
  return (
    <div className="">
      {props.data.id}
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        excludeDates={disabledDate?.map((d) => new Date(d))}
        selectsRange
        inline
      />
      {!isButtonDisabled && (
        <p className="text-red-700">
          You can not select range between selected range
        </p>
      )}
      <div className="flex justify-between">
        <button
          type="submit"
          disabled={!isButtonDisabled}
          onClick={bookTrip}
          className=" disabled:cursor-not-allowed disabled:bg-slate-400 inline-flex items-center justify-center w-full px-6 py-3 mt-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
        >
          Book
        </button>

        <button
          type="button"
          onClick={() => {
            props.closeModal(false);
          }}
          className="inline-flex items-center justify-center w-full px-6 py-3 mt-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto"
        >
          Cancle
        </button>
      </div>
    </div>
  );
}

export default BookModal;
