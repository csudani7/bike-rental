//#Global Imports
import React from "react";
import { toast } from "react-toastify";

//#Local Imports
import db from "../../firebase";
import Modal from "../../components/modal";
import CancelRideModal from "./CancelRideModal";
import CompleteRideModal from "./CompleteRideModal";
import { UserConfigContext } from "../../context";

const MyBike = () => {
  const { user } = React.useContext(UserConfigContext);
  const [tripData, setTripDate] = React.useState([]);
  const [actionType, setActionType] = React.useState("");
  const [selectedTrip, setSelectedTrip] = React.useState(null);

  const handleCompleteRide = (rate) => {
    db.collection("trip")
      .doc(selectedTrip.id)
      .update({ rating: rate, isRideCompleted: true })
      .then(() => {
        db.collection("trip")
          .where("bid", "==", selectedTrip.bid)
          .where("isRideCompleted", "==", true)
          .onSnapshot((snapshot) => {
            let totalRating = snapshot.docs
              .map((doc) => doc.data().rating)
              .reduce((a, b) => a + b, 0);
            let avgRating = Number(
              (totalRating / snapshot.docs.length).toFixed(2)
            );
            db.collection("bikes")
              .doc(selectedTrip.bid)
              .update({ rating: avgRating })
              .then(() => {
                setActionType("");
              })
              .catch((error) => {
                toast.error(error.data.message);
              });
          });
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  const handleDeleteTrip = () => {
    db.collection("trip")
      .doc(selectedTrip.id)
      .delete()
      .then(() => {
        setActionType("");
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  const fetchBikes = (bike) => {
    return new Promise((resolve) => {
      db.collection("bikes")
        .doc(bike.bid)
        .onSnapshot((doc) => {
          resolve({ ...bike, ...doc.data() });
        });
    });
  };

  React.useEffect(() => {
    db.collection("trip")
      .where("uid", "==", user.uid)
      .where("isRideCompleted", "==", false)
      .onSnapshot((snapshot) => {
        Promise.all(
          snapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .map((item) => fetchBikes(item))
        )
          .then((response) => {
            setTripDate(response);
          })
          .catch((error) => {
            toast.error(error.data.message);
          });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {tripData.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center w-2/3 gap-4 mt-8"
          >
            <div className="relative flex items-center justify-between w-full px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <div className="flex items-center justify-between w-full gap-8">
                <div className="flex items-center justify-between gap-44">
                  <div className="justify-start focus:outline-none">
                    <p className="text-sm font-medium text-gray-900">
                      <span>
                        <strong>Modal: </strong>
                      </span>
                      {item.modalName}
                    </p>
                    <p className="mt-6 text-sm font-medium text-gray-900">
                      <span>
                        <strong>Color: </strong>
                      </span>
                      {item.color}
                    </p>
                  </div>

                  <div className="justify-end focus:outline-none">
                    <p className="text-sm font-medium text-gray-900">
                      <span>
                        <strong>Location: </strong>
                      </span>
                      {item.location}
                    </p>
                    <p className="mt-6 text-sm font-medium text-gray-900">
                      <span>
                        <strong>Rating: </strong>
                      </span>
                      {item.rating}
                    </p>
                  </div>
                  <div className="justify-start focus:outline-none">
                    <p className="text-sm font-medium text-gray-900">
                      <span>
                        <strong>Start Date: </strong>
                      </span>
                      {item.start_date.toDate().toLocaleDateString()}
                    </p>
                    <p className="mt-6 text-sm font-medium text-gray-900">
                      <span>
                        <strong>End Date: </strong>
                      </span>
                      {item.end_date.toDate().toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col focus:outline-none">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 mb-4 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setActionType("complete_ride");
                      setSelectedTrip(item);
                    }}
                  >
                    Done
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setActionType("cancel_ride");
                      setSelectedTrip(item);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            <Modal
              isModalOpen={
                actionType === "cancel_ride" || actionType === "complete_ride"
              }
              setIsModalOpen={() => setActionType("")}
              isConfirmation={false}
            >
              {actionType === "cancel_ride" && (
                <CancelRideModal
                  selectedTrip={selectedTrip}
                  handleDeleteTrip={handleDeleteTrip}
                />
              )}
              {actionType === "complete_ride" && (
                <CompleteRideModal handleCompleteRide={handleCompleteRide} />
              )}
            </Modal>
          </div>
        );
      })}
    </>
  );
};

export default MyBike;
