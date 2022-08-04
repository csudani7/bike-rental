//#Global Imports
import React, { useState } from "react";
import clsx from "clsx";
// import { StarIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";

//#Local Imports

export default function CompleteRideModal({ trip, onConfirm }) {
  const [rating, setRating] = useState(0);
  return (
    <div>
      <div className="flex items-center gap-4 pb-8 ">
        <div className="text-base font-bold">Satisfied</div>
        {[...Array(5)].map((_items, index) => {
          return (
            <StarIcon
              className={clsx(
                rating > index ? "text-yellow-300" : "text-gray-400",
                "w-10 h-10 cursor-pointer"
              )}
              aria-hidden="true"
              onClick={() => setRating(index + 1)}
            />
          );
        })}
        <div className="text-base font-bold ">Very Satisfied</div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={rating === 0}
            onClick={() => {
              onConfirm(rating);
            }}
            className=" disabled:cursor-not-allowed disabled:bg-slate-400 inline-flex items-center justify-center w-full px-6 py-3 mt-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
}
