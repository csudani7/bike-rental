//#Global Imports
import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { toast } from "react-toastify";

//#Local Imports
import db from "../../firebse";
import { UserConfigContext } from "../../context";
import { enumerateDaysBetweenDates } from "../../utils";

function BookModal(props) {
  const { bikeData, handleCloseModal } = props;
  const { user } = React.useContext(UserConfigContext);
  const [tripData, setTripData] = React.useState([]);
  const [tripStartDate, setTripStartDate] = React.useState(new Date());
  const [tripEndDate, setTripEndDate] = React.useState(new Date());
  const [disableBookedBikeDate, setDisableBookedDate] = React.useState([]);
  const [isBookBikeButtonDisable, setBookBikeButtonDisable] =
    React.useState(true);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setTripStartDate(start);
    setTripEndDate(end);
    let disableStartDate = tripData.map((item) => item.start_date.toDate());
    let disableBookButton = disableStartDate
      .map(
        (item) =>
          moment(item) >= moment(start) &&
          moment(item) <= moment(end ? end : start)
      )
      .every((element) => element === false);
    setBookBikeButtonDisable(disableBookButton);
  };

  const handleBookBikeTrip = () => {
    db.collection("trip")
      .add({
        bid: bikeData.id,
        uid: user.uid,
        start_date: tripStartDate,
        end_date: tripEndDate,
        rating: 0,
        isRideCompleted: false,
      })
      .then(() => handleCloseModal(false))
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  React.useEffect(() => {
    db.collection("trip")
      .where("bid", "==", bikeData.id)
      .where("isRideCompleted", "==", false)
      .onSnapshot((snapshot) =>
        setTripData(
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
    tripData.forEach((t) => {
      reservedDate = [
        ...reservedDate,
        ...enumerateDaysBetweenDates(
          t.start_date.toDate(),
          t.end_date.toDate()
        ),
      ];
    });
    setDisableBookedDate(reservedDate);
  }, [tripData]);

  return (
    <div>
      {bikeData.id}
      <DatePicker
        inline
        selectsRange
        selected={tripStartDate}
        onChange={handleDateChange}
        startDate={tripStartDate}
        endDate={tripEndDate}
        excludeDates={disableBookedBikeDate?.map((date) => new Date(date))}
      />
      {!isBookBikeButtonDisable && (
        <p className="text-red-700">
          You can not select range between selected range
        </p>
      )}
      <div className="flex justify-between">
        <button
          type="submit"
          disabled={!isBookBikeButtonDisable}
          onClick={handleBookBikeTrip}
          className="inline-flex items-center justify-center w-full px-6 py-3 mt-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm disabled:cursor-not-allowed disabled:bg-slate-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
        >
          Book
        </button>
        <button
          type="button"
          onClick={() => {
            handleCloseModal(false);
          }}
          className="inline-flex items-center justify-center w-full px-6 py-3 mt-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default BookModal;
