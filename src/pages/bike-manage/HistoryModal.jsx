//#Global Imports
import React from "react";

//#Local Imports
import db from "../../firebase";

function HistoryModal(props) {
  const { selectedBikeData } = props;
  const [bikeHistory, setBikeHistory] = React.useState([]);

  const fetchUserFromTrip = (trip) => {
    return new Promise((resolve) => {
      db.collection("users")
        .where("uid", "==", trip.uid)
        .onSnapshot((snapshot) => {
          resolve({ ...snapshot.docs[0].data(), ...trip });
        });
    });
  };

  React.useEffect(() => {
    db.collection("trip")
      .where("bid", "==", selectedBikeData.id)
      .where("isRideCompleted", "==", false)
      .onSnapshot((snapshot) => {
        Promise.all(
          snapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .map((item) => fetchUserFromTrip(item))
        ).then((history) => {
          setBikeHistory(history);
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-between h-[40rem] overflow-scroll pb-8">
        <div className="flex items-center space-x-4">
          <span className="text-base font-extrabold">BID : </span>
          <span className="font-semibold text-normal">{}</span>
        </div>
        <div className="flex flex-wrap max-h-1/2">
          {bikeHistory.map((items, index) => {
            return (
              <div
                className="flex flex-col items-center w-full gap-4 mt-8 mr-4"
                key={index}
              >
                <div className="relative flex items-center justify-between w-full px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <div className="flex items-center w-full space-x-4">
                    <div className="flex flex-col w-full space-y-1">
                      <div className="flex space-x-2 text-sm font-medium text-gray-900">
                        <strong>Full Name: </strong>
                        <div>{items.fullName}</div>
                      </div>
                      <div className="flex space-x-2 text-sm font-medium text-gray-900">
                        <strong>Email: </strong>
                        <div>{items.email}</div>
                      </div>
                      <div className="flex space-x-2 text-sm font-medium text-gray-900">
                        <strong>Start Date: </strong>
                        <div>
                          {items.start_date.toDate().toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex space-x-2 text-sm font-medium text-gray-900">
                        <strong>End Date: </strong>
                        <div>
                          {items.end_date.toDate().toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <div className="flex space-x-2 text-sm font-medium text-gray-900">
                        <strong>Location: </strong>
                        <div>{selectedBikeData.location}</div>
                      </div>
                      <div className="flex space-x-2 text-sm font-medium text-gray-900">
                        <strong>Rating: </strong>
                        <div>{selectedBikeData.rating}</div>
                      </div>
                      <div className="flex space-x-2 text-sm font-medium text-gray-900">
                        <strong>Modal: </strong>
                        <div>{selectedBikeData.modalName}</div>
                      </div>
                      <div className="flex space-x-2 text-sm font-medium text-gray-900">
                        <strong>Color: </strong>
                        <div>{selectedBikeData.color}</div>
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
