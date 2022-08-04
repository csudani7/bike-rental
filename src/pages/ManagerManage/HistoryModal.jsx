import React, { useEffect, useState } from "react";
import db from "../../Firebase";
import { userReservedBikeHiostory } from "../../utils";

function HistoryModal({ user }) {
  const [history, setHistory] = useState([]);
  const temp = (trip) => {
    return new Promise((resolve, reject) => {
      db.collection("bikes")
        .doc(trip.bid)
        .onSnapshot((doc) => {
          resolve({ ...doc.data(), ...trip });
        });
    });
  };
  useEffect(() => {
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
            .map((m) => temp(m))
        ).then((d) => {
          setHistory(d);
        });
      });
  }, []);
  return (
    <div>
      <div className="flex flex-col justify-between  overflow-scroll pb-8">
        <div className="flex items-center space-x-4">
          <span className="text-base font-extrabold">UID : </span>
          <span className="font-semibold text-normal">{user.uid}</span>
        </div>
        <div className="flex flex-wrap max-h-1/2">
          {history.map((item, index) => {
            return (
              <div
                className="flex flex-col items-center w-full gap-4 mt-8 mr-4"
                key={index}
              >
                <div className="relative flex items-center justify-between w-full px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <div className="flex items-center justify-between w-full gap-8">
                    <div className="flex items-center justify-between w-full">
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
