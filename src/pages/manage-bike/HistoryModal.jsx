//#Global Imports
import React from "react";
import { StarIcon, LocationMarkerIcon } from "@heroicons/react/solid";

//#Local Imports
import db from "../../firebase";
import { classNames } from "../../utils";

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
    <div className="flex flex-col justify-start max-h-[40rem] overflow-y-scroll pb-8 mx-auto pr-4 space-y-8">
      <div className="flex items-center space-x-4">
        <span className="text-base font-extrabold">BID : </span>
        <span className="font-semibold text-normal">{}</span>
      </div>
      <div className="grid w-full grid-cols-1 gap-12 border-l border-gray-200 sm:mx-0 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3">
        {/* <div className="flex flex-wrap max-h-1/2"> */}
        {bikeHistory.map((items) => {
          return (
            <div
              key={items.id}
              className="w-full bg-white shadow-sm cursor-pointer"
            >
              <div className="mx-auto overflow-hidden">
                <div className="relative p-2 border">
                  <div className="py-4 text-center hover:bg-indigo-50">
                    <div className="flex items-center justify-between mx-8 space-x-8">
                      <p className="flex items-center text-base font-medium text-gray-900">
                        <span className="text-lg font-bold text-black">
                          {items.fullName}
                        </span>
                      </p>
                      <p className="flex items-center text-base font-medium text-gray-900">
                        {items.email}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mx-8">
                      <h4 className="text-xl font-bold tracking-tight text-gray-900">
                        {selectedBikeData.modalName}
                      </h4>
                      <div className="justify-start focus:outline-none">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {items.start_date.toDate().toLocaleDateString()} -{" "}
                          {items.end_date.toDate().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mx-8 mt-3">
                      <div
                        className="flex items-center justify-center w-8 h-8 border-2 rounded-full"
                        style={{ borderColor: selectedBikeData.color }}
                      >
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ background: selectedBikeData.color }}
                        />
                      </div>
                      <p className="flex items-center text-base font-medium text-gray-900">
                        <LocationMarkerIcon className="flex-shrink-0 w-4 h-4 text-gray-900" />
                        <span className="ml-2 text-lg font-bold text-black">
                          {selectedBikeData?.location}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center justify-center mt-3">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              selectedBikeData.rating > rating
                                ? "text-yellow-400"
                                : "text-gray-200",
                              "flex-shrink-0 h-5 w-5"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">
                        &nbsp; ({items.rating} Ratings)
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
  );
}

export default HistoryModal;
