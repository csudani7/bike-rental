//#Global Imports
import React from "react";
import { toast } from "react-toastify";

//#Local Imports
import db from "../../firebase";

function HistoryModal(props) {
  const { selectedUserHistory } = props;
  const [userHistory, setUserHistory] = React.useState([]);

  const fetchBikes = (trip) => {
    return new Promise((resolve) => {
      db.collection("bikes")
        .doc(trip.bid)
        .onSnapshot((doc) => {
          resolve({ ...doc.data(), ...trip });
        });
    });
  };

  React.useEffect(() => {
    db.collection("trip")
      .where("uid", "==", selectedUserHistory.uid)
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
            setUserHistory(response);
          })
          .catch((error) => {
            toast.error(error.data.message);
          });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-between pb-8 overflow-scroll">
        <div className="flex items-center space-x-4">
          <span className="text-base font-extrabold">UID : </span>
          <span className="font-semibold text-normal">
            {selectedUserHistory.uid}
          </span>
        </div>
        <div className="flex flex-wrap max-h-1/2">
          {userHistory.map((item, index) => {
            return (
              <div
                className="flex flex-col items-center w-full gap-4 mt-8 mr-4"
                key={index}
              >
                <div className="relative flex items-center justify-between w-full px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <div className="flex items-center justify-between w-full gap-8">
                    <div className="flex items-center justify-between w-full">
                      <div className="justify-start focus:outline-none">
                        <p className="text-sm font-medium text-gray-600">
                          <span>
                            <strong>Modal: </strong>
                          </span>
                          {item.modalName}
                        </p>
                        <p className="mt-6 text-sm font-medium text-gray-600">
                          <span>
                            <strong>Color: </strong>
                          </span>
                          {item.color}
                        </p>
                      </div>
                      <div className="justify-end focus:outline-none">
                        <p className="text-sm font-medium text-gray-600">
                          <span>
                            <strong>Location: </strong>
                          </span>
                          {item.location}
                        </p>
                        <p className="mt-6 text-sm font-medium text-gray-600">
                          <span>
                            <strong>Rating: </strong>
                          </span>
                          {item.rating}
                        </p>
                      </div>
                      <div className="justify-start focus:outline-none">
                        <p className="text-sm font-medium text-gray-600">
                          <span>
                            <strong>Start Date: </strong>
                          </span>
                          {item.start_date.toDate().toLocaleDateString()}
                        </p>
                        <p className="mt-6 text-sm font-medium text-gray-600">
                          <span>
                            <strong>End Date: </strong>
                          </span>
                          {item.end_date.toDate().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HistoryModal;
