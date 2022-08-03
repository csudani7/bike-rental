//#Global Imports
import React from "react";
import clsx from "clsx";
// import { StarIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";

//#Local Imports

export default function CompleteRideModal({ ratings, setRatings }) {
  return (
    <div>
      <div className="flex items-center gap-4 pb-8 ">
        <div className="text-base font-bold">Satisfied</div>
        {[...Array(5)].map((_items, index) => {
          return (
            <StarIcon
              className={clsx(
                ratings > index ? "text-yellow-300" : "text-gray-400",
                "w-10 h-10 cursor-pointer"
              )}
              aria-hidden="true"
              onClick={() => setRatings(index + 1)}
            />
          );
        })}
        <div className="text-base font-bold ">Very Satisfied</div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => ""} //TODO: Need to handle Confirm
        >
          Ride Completed
        </button>
      </div>
    </div>
  );
}
