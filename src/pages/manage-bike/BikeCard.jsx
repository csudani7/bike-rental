//#Global Imports
import React from "react";
import { StarIcon, LocationMarkerIcon } from "@heroicons/react/solid";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

//#Local Imports
import { classNames } from "../../utils";

function BikeCard(props) {
  const {
    bikeData,
    setIsBikeHistoryModal,
    setSelectedBikeData,
    handleBikeHistory,
    handleEditAction,
  } = props;
  console.log(bikeData, "bikeData-inside-component");
  return (
    <>
      <div
        key={bikeData.id}
        className="w-full bg-white shadow-sm cursor-pointer"
      >
        <div className="max-w-md mx-auto overflow-hidden">
          <div className="relative border">
            <div
              className="py-4 text-center hover:bg-indigo-50"
              onClick={() => {
                handleBikeHistory(bikeData);
                setIsBikeHistoryModal(true);
                setSelectedBikeData(bikeData);
              }}
            >
              <div className="flex items-center justify-around">
                <h4 className="text-xl font-bold tracking-tight text-gray-900">
                  {bikeData.modalName}
                </h4>
              </div>
              <div className="flex items-center justify-around mt-3">
                <div
                  className="flex items-center justify-center w-6 h-6 border-2 rounded-full"
                  style={{ borderColor: bikeData.color }}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ background: bikeData.color }}
                  />
                </div>
                <p className="flex items-center text-base font-medium text-gray-900">
                  <LocationMarkerIcon className="flex-shrink-0 w-4 h-4 text-gray-900" />
                  <span className="ml-2 text-lg font-bold text-black">
                    {bikeData?.location}
                  </span>
                </p>
              </div>

              <div className="flex items-center justify-center mt-3">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        bikeData.rating > rating
                          ? "text-yellow-400"
                          : "text-gray-200",
                        "flex-shrink-0 h-5 w-5"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  &nbsp; ({bikeData.rating} Ratings)
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center text-center">
              <button
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-700 border border-transparent shadow-sm hover:bg-indigo-800 focus:outline-none sm:w-auto sm:text-sm"
                onClick={() => {
                  handleEditAction(bikeData);
                }}
              >
                <PencilIcon className="w-5 h-5" aria-hidden="true" />
                <span className="ml-2">Edit</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent shadow-sm hover:bg-red-700 sm:w-auto sm:text-sm"
              >
                <TrashIcon className="w-5 h-5 cursor" aria-hidden="true" />
                <span className="ml-2">Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BikeCard;
