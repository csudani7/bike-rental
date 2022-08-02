//#Global Imports
import React from "react";

//#Local Imports
import Modal from "../../Components/Modal";
import { myBikeData } from "../../utils";
import CompleteRideModal from "./CompleteRideModal";

const MyBike = () => {
  const [isModalOpen, setIsModalOpen] = React.useState("");
  const [ratings, setRatings] = React.useState(0);
  return (
    <>
      {myBikeData.map((item, i) => {
        return (
          <div className="flex flex-col items-center w-2/3 gap-4 mt-8" key={i}>
            <div className="relative flex items-center justify-between w-full px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <div className="flex items-center justify-between w-full gap-8">
                <div className="flex items-center justify-between gap-44">
                  <div className="justify-start focus:outline-none">
                    <p className="text-sm font-medium text-gray-900">
                      <span>
                        <strong>Modal: </strong>
                      </span>
                      {item.Modal}
                    </p>
                    <p className="mt-6 text-sm font-medium text-gray-900">
                      <span>
                        <strong>Color: </strong>
                      </span>
                      {item.Color}
                    </p>
                  </div>

                  <div className="justify-end focus:outline-none">
                    <p className="text-sm font-medium text-gray-900">
                      <span>
                        <strong>Location: </strong>
                      </span>
                      {item.Location}
                    </p>
                    <p className="mt-6 text-sm font-medium text-gray-900">
                      <span>
                        <strong>Rating: </strong>
                      </span>
                      {item.Rating}
                    </p>
                  </div>
                  <div className="justify-start focus:outline-none">
                    <p className="text-sm font-medium text-gray-900">
                      <span>
                        <strong>Start Date: </strong>
                      </span>
                      {item.StartDate}
                    </p>
                    <p className="mt-6 text-sm font-medium text-gray-900">
                      <span>
                        <strong>End Date: </strong>
                      </span>
                      {item.EndDate}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col focus:outline-none">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 mb-4 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsModalOpen("done")}
                  >
                    Done
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsModalOpen("cancel")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            <Modal
              isModalOpen={isModalOpen === "cancel" || isModalOpen === "done"}
              setIsModalOpen={() => setIsModalOpen("")}
              isConfirmation={isModalOpen === "cancel" ? true : false}
            >
              {isModalOpen === "cancel" && (
                <div className="mb-8 text-lg font-bold">
                  Are you sure to cancel the ride ?
                </div>
              )}
              {isModalOpen === "done" && (
                <CompleteRideModal ratings={ratings} setRatings={setRatings} />
              )}
            </Modal>
          </div>
        );
      })}
    </>
  );
};

export default MyBike;
