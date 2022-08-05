//#Global Imports
import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

//#Local Imports
import db from "../../firebse";
import { enumerateDaysBetweenDates } from "../../utils";
import { ApplicationProcessContext } from "../../context";

function BookModal(props) {
  const [trip, setTrip] = React.useState([]);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [disabledDate, setDisabledDate] = React.useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const { user } = React.useContext(ApplicationProcessContext);

  React.useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
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
    setDisabledDate(reservedDate);
  }, [trip]);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
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
          className="inline-flex items-center justify-center w-full px-6 py-3 mt-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm disabled:cursor-not-allowed disabled:bg-slate-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
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
